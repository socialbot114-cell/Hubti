import { NextRequest, NextResponse } from 'next/server'

const MINIMAX_API_KEY = process.env.MINIMAX_API_KEY || 'sk-api-JLi0lsuXeMdydK-sF2HfXLxLp_gixvK4ZJUU81VqRNjlD8ON-XIUjKK__esefyElntMk7x24bBc0Lt209Q79QSadKcpYnOlutHdXPTV-YAp1Liy1140lkJo'
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

    let endpoint = ''
    let requestBody: any = {}
    let headers: any = {
      'Authorization': `Bearer ${MINIMAX_API_KEY}`,
      'Content-Type': 'application/json',
    }

    switch (type) {
      case 'text':
        endpoint = `${MINIMAX_BASE_URL}/chat/completions`
        requestBody = {
          model: 'abab6.5-chat',
          messages: [
            {
              role: 'user',
              content: prompt
            }
          ],
          temperature: 0.7,
          max_tokens: 2000
        }
        break

      case 'image':
        endpoint = `${MINIMAX_BASE_URL}/text_to_image`
        requestBody = {
          model: 'text-to-image-01',
          prompt: prompt,
          n: 1
        }
        break

      case 'video':
        endpoint = `${MINIMAX_BASE_URL}/video_generation`
        requestBody = {
          model: 'video-01',
          prompt: prompt
        }
        break

      case 'audio':
        endpoint = `${MINIMAX_BASE_URL}/t2a_v2`
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
        // Para áudio, pode retornar base64 ou URL
        result = data.audio_url || data.data?.audio_url || data.audio || ''
        if (!result && data.data?.audio_base64) {
          result = `data:audio/mp3;base64,${data.data.audio_base64}`
        }
        if (!result) {
          console.error('[Minimax API] Nenhuma URL de áudio encontrada:', data)
          return NextResponse.json({
            success: false,
            error: 'Nenhum áudio gerado',
            debug: data
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
