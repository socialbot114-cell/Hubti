import { NextRequest, NextResponse } from 'next/server'

const MINIMAX_API_KEY = process.env.MINIMAX_API_KEY || 'sk-api-JLi0lsuXeMdydK-sF2HfXLxLp_gixvK4ZJUU81VqRNjlD8ON-XIUjKK__esefyElntMk7x24bBc0Lt209Q79QSadKcpYnOlutHdXPTV-YAp1Liy1140lkJo'
const MINIMAX_GROUP_ID = process.env.MINIMAX_GROUP_ID || ''
const MINIMAX_BASE_URL = 'https://api.minimax.io/v1'

export async function POST(request: NextRequest) {
  try {
    const { type, prompt } = await request.json()

    if (!prompt || !type) {
      return NextResponse.json(
        { success: false, error: 'Prompt e tipo são obrigatórios' },
        { status: 400 }
      )
    }

    // Verificar GroupId para API Minimax
    if (!MINIMAX_GROUP_ID) {
      console.warn('[Minimax API] ⚠️  MINIMAX_GROUP_ID não configurado!')
      console.warn('[Minimax API] Obtenha seu GroupId em: https://platform.minimax.io/')
      console.warn('[Minimax API] Adicione MINIMAX_GROUP_ID no arquivo .env')

      return NextResponse.json(
        {
          success: false,
          error: 'GroupId não configurado. Consulte o TROUBLESHOOTING.md',
          details: {
            message: 'A API Minimax requer um GroupId para funcionar',
            howToFix: [
              '1. Acesse https://platform.minimax.io/',
              '2. Faça login e vá em "Console" ou "Basic Information"',
              '3. Copie o GroupId da sua conta',
              '4. Adicione MINIMAX_GROUP_ID=seu_group_id no arquivo .env',
              '5. Reinicie o servidor'
            ]
          }
        },
        { status: 400 }
      )
    }

    let endpoint = ''
    let requestBody: any = {}
    let headers: any = {
      'Authorization': `Bearer ${MINIMAX_API_KEY}`,
      'Content-Type': 'application/json',
    }

    switch (type) {
      case 'text':
        endpoint = `${MINIMAX_BASE_URL}/text/chatcompletion_v2?GroupId=${MINIMAX_GROUP_ID}`
        requestBody = {
          model: 'abab6.5s-chat',
          messages: [
            {
              role: 'user',
              content: prompt
            }
          ],
          temperature: 0.7,
          tokens_to_generate: 2000
        }
        break

      case 'image':
        endpoint = `${MINIMAX_BASE_URL}/text_to_image?GroupId=${MINIMAX_GROUP_ID}`
        requestBody = {
          model: 'text-to-image-01',
          prompt: prompt
        }
        break

      case 'video':
        endpoint = `${MINIMAX_BASE_URL}/video_generation?GroupId=${MINIMAX_GROUP_ID}`
        requestBody = {
          model: 'video-01',
          prompt: prompt
        }
        break

      case 'audio':
        endpoint = `${MINIMAX_BASE_URL}/t2a_v2?GroupId=${MINIMAX_GROUP_ID}`
        requestBody = {
          model: 'speech-02-hd',
          text: prompt,
          voice_setting: {
            voice_id: 'male-qn-qingse',
            speed: 1.0,
            vol: 1.0,
            pitch: 0
          },
          audio_setting: {
            sample_rate: 32000,
            bitrate: 128000,
            format: 'mp3'
          }
        }
        break

      default:
        return NextResponse.json(
          { success: false, error: 'Tipo inválido' },
          { status: 400 }
        )
    }

    console.log(`[Minimax API] Chamando ${type}:`, endpoint)
    console.log(`[Minimax API] Request body:`, JSON.stringify(requestBody, null, 2))

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(requestBody),
    })

    const contentType = response.headers.get('content-type')
    let data: any

    if (contentType?.includes('application/json')) {
      data = await response.json()
    } else {
      const text = await response.text()
      console.error('[Minimax API] Resposta não-JSON:', text)
      data = { error: 'Resposta inválida da API', raw: text }
    }

    console.log(`[Minimax API] Status: ${response.status}`)
    console.log(`[Minimax API] Response:`, JSON.stringify(data, null, 2))

    if (!response.ok) {
      console.error('[Minimax API] Erro da API:', data)
      return NextResponse.json(
        {
          success: false,
          error: data.error?.message || data.message || 'Erro ao gerar conteúdo',
          details: data.error || data,
          status: response.status
        },
        { status: response.status }
      )
    }

    // Processar resposta baseado no tipo
    let result = ''
    switch (type) {
      case 'text':
        result = data.choices?.[0]?.message?.content || data.reply || 'Texto gerado com sucesso!'
        break
      case 'image':
        result = data.data?.[0]?.url || data.url || data.image_url || ''
        if (!result) {
          console.error('[Minimax API] Nenhuma URL de imagem encontrada:', data)
          return NextResponse.json({
            success: false,
            error: 'Nenhuma imagem gerada',
            debug: data
          }, { status: 500 })
        }
        break
      case 'video':
        result = data.video_url || data.data?.video_url || ''
        if (!result) {
          console.error('[Minimax API] Nenhuma URL de vídeo encontrada:', data)
          return NextResponse.json({
            success: false,
            error: 'Nenhum vídeo gerado',
            debug: data
          }, { status: 500 })
        }
        break
      case 'audio':
        // A API Minimax retorna áudio em hexadecimal no campo 'data'
        if (data.data) {
          // Converter hex para base64
          const hexString = data.data
          const buffer = Buffer.from(hexString, 'hex')
          const base64Audio = buffer.toString('base64')
          result = `data:audio/mp3;base64,${base64Audio}`
        } else if (data.audio_url) {
          result = data.audio_url
        } else if (data.audio) {
          result = data.audio
        }

        if (!result) {
          console.error('[Minimax API] Nenhum áudio encontrado na resposta:', data)
          console.error('[Minimax API] Campos disponíveis:', Object.keys(data))
          return NextResponse.json({
            success: false,
            error: 'Nenhum áudio gerado',
            debug: {
              message: 'Resposta da API não contém áudio',
              availableFields: Object.keys(data),
              sampleData: JSON.stringify(data).substring(0, 500)
            }
          }, { status: 500 })
        }
        break
    }

    return NextResponse.json({
      success: true,
      result: result,
      type: type
    })

  } catch (error: any) {
    console.error('[Minimax API] Erro no servidor:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Erro interno do servidor',
        message: error.message,
        details: error.toString()
      },
      { status: 500 }
    )
  }
}
