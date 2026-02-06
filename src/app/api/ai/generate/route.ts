import { NextRequest, NextResponse } from 'next/server'

const MINIMAX_API_KEY = process.env.MINIMAX_API_KEY || ''
const MINIMAX_GROUP_ID = process.env.MINIMAX_GROUP_ID || ''
const MINIMAX_BASE_URL = 'https://api.minimax.io/v1'

function log(level: 'info' | 'warn' | 'error', context: string, message: string, data?: unknown) {
  const timestamp = new Date().toISOString()
  const prefix = `[${timestamp}] [Minimax/${context}]`
  const payload = data !== undefined ? ` | ${JSON.stringify(data, null, 2)}` : ''

  switch (level) {
    case 'info':
      console.log(`${prefix} ${message}${payload}`)
      break
    case 'warn':
      console.warn(`${prefix} ⚠ ${message}${payload}`)
      break
    case 'error':
      console.error(`${prefix} ✗ ${message}${payload}`)
      break
  }
}

export async function POST(request: NextRequest) {
  const requestId = Math.random().toString(36).substring(2, 10)

  try {
    const body = await request.json()
    const { type, prompt } = body

    log('info', requestId, `Requisicao recebida | tipo=${type} | prompt="${prompt?.substring(0, 80)}..."`)

    // Validacao de entrada
    if (!prompt || !type) {
      log('warn', requestId, 'Validacao falhou: prompt ou tipo ausente')
      return NextResponse.json(
        { success: false, error: 'Prompt e tipo sao obrigatorios' },
        { status: 400 }
      )
    }

    if (!['text', 'image', 'video', 'audio'].includes(type)) {
      log('warn', requestId, `Tipo invalido: ${type}`)
      return NextResponse.json(
        { success: false, error: `Tipo invalido: ${type}. Use: text, image, video, audio` },
        { status: 400 }
      )
    }

    // Verificar credenciais
    if (!MINIMAX_API_KEY) {
      log('error', requestId, 'MINIMAX_API_KEY nao configurada')
      return NextResponse.json(
        {
          success: false,
          error: 'API Key nao configurada',
          details: {
            message: 'A variavel MINIMAX_API_KEY nao esta definida no ambiente',
            fix: 'Adicione MINIMAX_API_KEY ao arquivo .env e reinicie o servidor'
          }
        },
        { status: 500 }
      )
    }

    if (!MINIMAX_GROUP_ID) {
      log('error', requestId, 'MINIMAX_GROUP_ID nao configurado')
      return NextResponse.json(
        {
          success: false,
          error: 'GroupId nao configurado',
          details: {
            message: 'A API Minimax requer um GroupId para funcionar',
            fix: [
              '1. Acesse https://platform.minimax.io/',
              '2. Faca login e va em "Console" ou "Basic Information"',
              '3. Copie o GroupId da sua conta',
              '4. Adicione MINIMAX_GROUP_ID=seu_group_id no arquivo .env',
              '5. Reinicie o servidor'
            ]
          }
        },
        { status: 500 }
      )
    }

    // Construir request
    let endpoint = ''
    let requestBody: Record<string, unknown> = {}
    const headers: Record<string, string> = {
      'Authorization': `Bearer ${MINIMAX_API_KEY}`,
      'Content-Type': 'application/json',
    }

    switch (type) {
      case 'text':
        endpoint = `${MINIMAX_BASE_URL}/text/chatcompletion_v2?GroupId=${MINIMAX_GROUP_ID}`
        requestBody = {
          model: 'abab6.5s-chat',
          messages: [{ role: 'user', content: prompt }],
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
    }

    log('info', requestId, `Chamando Minimax API`, {
      endpoint,
      model: requestBody.model,
      type,
    })

    const startTime = Date.now()
    const response = await fetch(endpoint, {
      method: 'POST',
      headers,
      body: JSON.stringify(requestBody),
    })
    const duration = Date.now() - startTime

    log('info', requestId, `Resposta recebida | status=${response.status} | ${duration}ms`)

    // Parse response
    const contentType = response.headers.get('content-type')
    let data: Record<string, unknown>

    if (contentType?.includes('application/json')) {
      data = await response.json()
    } else {
      const raw = await response.text()
      log('error', requestId, 'Resposta nao-JSON da API', { contentType, body: raw.substring(0, 500) })
      return NextResponse.json(
        {
          success: false,
          error: 'Resposta invalida da API Minimax',
          details: { contentType, body: raw.substring(0, 300) }
        },
        { status: 502 }
      )
    }

    // Check API errors
    if (!response.ok) {
      const errorMessage = (data.error as Record<string, unknown>)?.message
        || data.message
        || `Erro HTTP ${response.status}`

      log('error', requestId, `Erro da API Minimax`, {
        status: response.status,
        error: errorMessage,
        response: JSON.stringify(data).substring(0, 500),
      })

      return NextResponse.json(
        {
          success: false,
          error: String(errorMessage),
          details: data.error || data,
          httpStatus: response.status
        },
        { status: response.status }
      )
    }

    // Check Minimax-level errors (API returns 200 but with error)
    if (data.base_resp && (data.base_resp as Record<string, unknown>).status_code !== 0) {
      const baseResp = data.base_resp as Record<string, unknown>
      log('error', requestId, 'Minimax retornou erro logico', { base_resp: baseResp })
      return NextResponse.json(
        {
          success: false,
          error: String(baseResp.status_msg || 'Erro interno da API Minimax'),
          details: baseResp
        },
        { status: 422 }
      )
    }

    // Process result by type
    let result = ''

    switch (type) {
      case 'text': {
        const choices = data.choices as Array<{ message?: { content?: string } }> | undefined
        result = choices?.[0]?.message?.content || String(data.reply || '')
        if (!result) {
          log('error', requestId, 'Nenhum texto na resposta', { fields: Object.keys(data) })
          return NextResponse.json({
            success: false,
            error: 'Nenhum texto gerado pela API',
            details: { availableFields: Object.keys(data) }
          }, { status: 502 })
        }
        break
      }

      case 'image': {
        const imageData = data.data as Array<{ url?: string }> | undefined
        result = imageData?.[0]?.url || String(data.url || data.image_url || '')
        if (!result) {
          log('error', requestId, 'Nenhuma URL de imagem na resposta', { fields: Object.keys(data) })
          return NextResponse.json({
            success: false,
            error: 'Nenhuma imagem gerada pela API',
            details: { availableFields: Object.keys(data) }
          }, { status: 502 })
        }
        break
      }

      case 'video': {
        result = String(data.video_url || (data.data as Record<string, unknown>)?.video_url || '')
        if (!result) {
          log('error', requestId, 'Nenhuma URL de video na resposta', { fields: Object.keys(data) })
          return NextResponse.json({
            success: false,
            error: 'Nenhum video gerado pela API',
            details: { availableFields: Object.keys(data) }
          }, { status: 502 })
        }
        break
      }

      case 'audio': {
        if (data.data && typeof data.data === 'string') {
          // Minimax retorna audio em hexadecimal
          try {
            const buffer = Buffer.from(data.data as string, 'hex')
            const base64Audio = buffer.toString('base64')
            result = `data:audio/mp3;base64,${base64Audio}`
            log('info', requestId, `Audio convertido hex->base64 | ${buffer.length} bytes`)
          } catch (convError) {
            log('error', requestId, 'Falha ao converter audio hex', { error: String(convError) })
          }
        }

        if (!result && data.audio_url) {
          result = String(data.audio_url)
        }
        if (!result && data.audio) {
          result = String(data.audio)
        }

        if (!result) {
          log('error', requestId, 'Nenhum audio na resposta', {
            fields: Object.keys(data),
            sample: JSON.stringify(data).substring(0, 300)
          })
          return NextResponse.json({
            success: false,
            error: 'Nenhum audio gerado pela API',
            details: { availableFields: Object.keys(data) }
          }, { status: 502 })
        }
        break
      }
    }

    log('info', requestId, `Sucesso | tipo=${type} | resultado=${result.substring(0, 100)}...`)

    return NextResponse.json({
      success: true,
      result,
      type,
    })

  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error)
    const stack = error instanceof Error ? error.stack : undefined

    log('error', requestId, `Erro nao tratado: ${message}`, { stack: stack?.substring(0, 500) })

    return NextResponse.json(
      {
        success: false,
        error: 'Erro interno do servidor',
        details: { message, requestId }
      },
      { status: 500 }
    )
  }
}
