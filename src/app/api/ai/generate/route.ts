import { NextRequest, NextResponse } from 'next/server'

const MINIMAX_API_KEY = process.env.MINIMAX_API_KEY || ''
const MINIMAX_GROUP_ID = process.env.MINIMAX_GROUP_ID || ''
const MINIMAX_BASE_URL = 'https://api.minimax.io/v1'

// Video polling config
const VIDEO_POLL_INTERVAL_MS = 10000 // 10 seconds
const VIDEO_POLL_MAX_ATTEMPTS = 18   // 3 minutes max

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

async function fetchMinimaxJSON(
  requestId: string,
  url: string,
  options: RequestInit
): Promise<{ ok: boolean; status: number; data: Record<string, unknown> } | { ok: false; error: string }> {
  const response = await fetch(url, options)
  const contentType = response.headers.get('content-type')

  if (!contentType?.includes('application/json')) {
    const raw = await response.text()
    log('error', requestId, 'Resposta nao-JSON da API', { contentType, body: raw.substring(0, 500) })
    return { ok: false, error: `Resposta invalida da API (${contentType}): ${raw.substring(0, 200)}` }
  }

  const data = await response.json()
  return { ok: response.ok, status: response.status, data }
}

function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms))
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

    const headers: Record<string, string> = {
      'Authorization': `Bearer ${MINIMAX_API_KEY}`,
      'Content-Type': 'application/json',
    }

    // ========== TEXT ==========
    if (type === 'text') {
      const endpoint = `${MINIMAX_BASE_URL}/text/chatcompletion_v2?GroupId=${MINIMAX_GROUP_ID}`
      const requestBody = {
        model: 'abab6.5s-chat',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.7,
        tokens_to_generate: 2000
      }

      log('info', requestId, 'Chamando Minimax Text API', { endpoint, model: requestBody.model })

      const startTime = Date.now()
      const res = await fetchMinimaxJSON(requestId, endpoint, {
        method: 'POST',
        headers,
        body: JSON.stringify(requestBody),
      })
      const duration = Date.now() - startTime
      log('info', requestId, `Resposta Text em ${duration}ms`)

      if ('error' in res) {
        return NextResponse.json({ success: false, error: res.error }, { status: 502 })
      }

      if (!res.ok) {
        const errorMessage = (res.data.error as Record<string, unknown>)?.message || res.data.message || `Erro HTTP ${res.status}`
        log('error', requestId, 'Erro Text API', { status: res.status, error: errorMessage })
        return NextResponse.json({ success: false, error: String(errorMessage), details: res.data }, { status: res.status })
      }

      if (res.data.base_resp && (res.data.base_resp as Record<string, unknown>).status_code !== 0) {
        const baseResp = res.data.base_resp as Record<string, unknown>
        log('error', requestId, 'Erro logico Text', { base_resp: baseResp })
        return NextResponse.json({ success: false, error: String(baseResp.status_msg || 'Erro da API'), details: baseResp }, { status: 422 })
      }

      const choices = res.data.choices as Array<{ message?: { content?: string } }> | undefined
      const result = choices?.[0]?.message?.content || String(res.data.reply || '')
      if (!result) {
        log('error', requestId, 'Nenhum texto na resposta', { fields: Object.keys(res.data) })
        return NextResponse.json({ success: false, error: 'Nenhum texto gerado', details: { availableFields: Object.keys(res.data) } }, { status: 502 })
      }

      log('info', requestId, `Sucesso Text | ${result.substring(0, 80)}...`)
      return NextResponse.json({ success: true, result, type })
    }

    // ========== IMAGE ==========
    if (type === 'image') {
      // Endpoint correto: /v1/image_generation (nao /v1/text_to_image)
      const endpoint = `${MINIMAX_BASE_URL}/image_generation?GroupId=${MINIMAX_GROUP_ID}`
      const requestBody = {
        model: 'image-01',
        prompt: prompt,
        aspect_ratio: '16:9',
        response_format: 'url',
        n: 1,
        prompt_optimizer: true,
      }

      log('info', requestId, 'Chamando Minimax Image API', { endpoint, model: requestBody.model })

      const startTime = Date.now()
      const res = await fetchMinimaxJSON(requestId, endpoint, {
        method: 'POST',
        headers,
        body: JSON.stringify(requestBody),
      })
      const duration = Date.now() - startTime
      log('info', requestId, `Resposta Image em ${duration}ms`)

      if ('error' in res) {
        return NextResponse.json({ success: false, error: res.error }, { status: 502 })
      }

      if (!res.ok) {
        const errorMessage = (res.data.error as Record<string, unknown>)?.message || res.data.message || `Erro HTTP ${res.status}`
        log('error', requestId, 'Erro Image API', { status: res.status, error: errorMessage, response: JSON.stringify(res.data).substring(0, 500) })
        return NextResponse.json({ success: false, error: String(errorMessage), details: res.data }, { status: res.status })
      }

      if (res.data.base_resp && (res.data.base_resp as Record<string, unknown>).status_code !== 0) {
        const baseResp = res.data.base_resp as Record<string, unknown>
        log('error', requestId, 'Erro logico Image', { base_resp: baseResp })
        return NextResponse.json({ success: false, error: String(baseResp.status_msg || 'Erro da API'), details: baseResp }, { status: 422 })
      }

      // Resposta: data.image_urls[] (array de URLs)
      const dataObj = res.data.data as { image_urls?: string[] } | undefined
      const imageUrl = dataObj?.image_urls?.[0]
        || (res.data.data as Array<{ url?: string }>)?.[0]?.url
        || String(res.data.url || res.data.image_url || '')

      if (!imageUrl) {
        log('error', requestId, 'Nenhuma URL de imagem', { fields: Object.keys(res.data), data: JSON.stringify(res.data).substring(0, 500) })
        return NextResponse.json({ success: false, error: 'Nenhuma imagem gerada', details: { availableFields: Object.keys(res.data) } }, { status: 502 })
      }

      log('info', requestId, `Sucesso Image | url=${imageUrl.substring(0, 80)}...`)
      return NextResponse.json({ success: true, result: imageUrl, type })
    }

    // ========== VIDEO (async: create task -> poll -> get file) ==========
    if (type === 'video') {
      const endpoint = `${MINIMAX_BASE_URL}/video_generation?GroupId=${MINIMAX_GROUP_ID}`
      const requestBody = {
        model: 'video-01',
        prompt: prompt,
      }

      log('info', requestId, 'Chamando Minimax Video API (async)', { endpoint, model: requestBody.model })

      // Step 1: Create video generation task
      const startTime = Date.now()
      const createRes = await fetchMinimaxJSON(requestId, endpoint, {
        method: 'POST',
        headers,
        body: JSON.stringify(requestBody),
      })
      const createDuration = Date.now() - startTime
      log('info', requestId, `Resposta Video create em ${createDuration}ms`)

      if ('error' in createRes) {
        return NextResponse.json({ success: false, error: createRes.error }, { status: 502 })
      }

      if (!createRes.ok) {
        const errorMessage = (createRes.data.error as Record<string, unknown>)?.message || createRes.data.message || `Erro HTTP ${createRes.status}`
        log('error', requestId, 'Erro Video create', { status: createRes.status, error: errorMessage })
        return NextResponse.json({ success: false, error: String(errorMessage), details: createRes.data }, { status: createRes.status })
      }

      if (createRes.data.base_resp && (createRes.data.base_resp as Record<string, unknown>).status_code !== 0) {
        const baseResp = createRes.data.base_resp as Record<string, unknown>
        log('error', requestId, 'Erro logico Video create', { base_resp: baseResp })
        return NextResponse.json({ success: false, error: String(baseResp.status_msg || 'Erro da API'), details: baseResp }, { status: 422 })
      }

      const taskId = createRes.data.task_id as string
      if (!taskId) {
        log('error', requestId, 'Nenhum task_id recebido', { fields: Object.keys(createRes.data) })
        return NextResponse.json({ success: false, error: 'Nenhum task_id retornado pela API', details: createRes.data }, { status: 502 })
      }

      log('info', requestId, `Video task criada | task_id=${taskId} | Iniciando polling...`)

      // Step 2: Poll for task completion
      const pollUrl = `${MINIMAX_BASE_URL}/query/video_generation?GroupId=${MINIMAX_GROUP_ID}&task_id=${taskId}`
      let fileId = ''

      for (let attempt = 1; attempt <= VIDEO_POLL_MAX_ATTEMPTS; attempt++) {
        await sleep(VIDEO_POLL_INTERVAL_MS)

        log('info', requestId, `Video poll tentativa ${attempt}/${VIDEO_POLL_MAX_ATTEMPTS}`)

        const pollRes = await fetchMinimaxJSON(requestId, pollUrl, {
          method: 'GET',
          headers: { 'Authorization': `Bearer ${MINIMAX_API_KEY}` },
        })

        if ('error' in pollRes) {
          log('warn', requestId, `Poll falhou: ${pollRes.error}`)
          continue
        }

        const status = pollRes.data.status as string
        log('info', requestId, `Video poll status: ${status}`, { task_id: taskId })

        if (status === 'Success' || status === 'Finished') {
          fileId = pollRes.data.file_id as string || ''
          if (!fileId) {
            // Try alternate response structures
            const videoUrl = pollRes.data.video_url as string
              || (pollRes.data.data as Record<string, unknown>)?.video_url as string
              || ''
            if (videoUrl) {
              log('info', requestId, `Video URL direto do poll | url=${videoUrl.substring(0, 80)}...`)
              return NextResponse.json({ success: true, result: videoUrl, type })
            }
            // Check file_id in nested data
            fileId = (pollRes.data.data as Record<string, unknown>)?.file_id as string || ''
          }
          if (fileId) {
            log('info', requestId, `Video concluido | file_id=${fileId}`)
            break
          }
          log('error', requestId, 'Video concluido mas sem file_id ou video_url', { fields: Object.keys(pollRes.data), data: JSON.stringify(pollRes.data).substring(0, 500) })
          return NextResponse.json({ success: false, error: 'Video gerado mas sem URL disponivel', details: pollRes.data }, { status: 502 })
        }

        if (status === 'Failed' || status === 'Error') {
          const errMsg = pollRes.data.error_message || pollRes.data.status_msg || 'Video generation failed'
          log('error', requestId, `Video falhou: ${errMsg}`, pollRes.data)
          return NextResponse.json({ success: false, error: `Geracao de video falhou: ${errMsg}`, details: pollRes.data }, { status: 502 })
        }

        // Status is likely "Processing", "Pending", "Queueing" etc - continue polling
      }

      if (!fileId) {
        log('error', requestId, `Video timeout apos ${VIDEO_POLL_MAX_ATTEMPTS} tentativas`)
        return NextResponse.json({
          success: false,
          error: 'Timeout: video ainda em processamento. Tente novamente em alguns minutos.',
          details: { task_id: taskId, attempts: VIDEO_POLL_MAX_ATTEMPTS }
        }, { status: 504 })
      }

      // Step 3: Retrieve video file URL
      const fileUrl = `${MINIMAX_BASE_URL}/files/retrieve?GroupId=${MINIMAX_GROUP_ID}&file_id=${fileId}`
      log('info', requestId, `Buscando URL do video | file_id=${fileId}`)

      const fileRes = await fetchMinimaxJSON(requestId, fileUrl, {
        method: 'GET',
        headers: { 'Authorization': `Bearer ${MINIMAX_API_KEY}` },
      })

      if ('error' in fileRes) {
        return NextResponse.json({ success: false, error: fileRes.error }, { status: 502 })
      }

      const fileObj = fileRes.data.file as Record<string, unknown> | undefined
      const downloadUrl = fileObj?.download_url
        || fileRes.data.download_url
        || ''

      if (!downloadUrl) {
        log('error', requestId, 'Sem download_url no file retrieve', { fields: Object.keys(fileRes.data), data: JSON.stringify(fileRes.data).substring(0, 500) })
        return NextResponse.json({ success: false, error: 'URL de download do video nao encontrada', details: fileRes.data }, { status: 502 })
      }

      const totalDuration = Date.now() - startTime
      log('info', requestId, `Sucesso Video | ${totalDuration}ms total | url=${String(downloadUrl).substring(0, 80)}...`)
      return NextResponse.json({ success: true, result: String(downloadUrl), type })
    }

    // ========== AUDIO ==========
    if (type === 'audio') {
      const endpoint = `${MINIMAX_BASE_URL}/t2a_v2?GroupId=${MINIMAX_GROUP_ID}`
      const requestBody = {
        model: 'speech-02-hd',
        text: prompt,
        output_format: 'hex',
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

      log('info', requestId, 'Chamando Minimax Audio API', { endpoint, model: requestBody.model })

      const startTime = Date.now()
      const res = await fetchMinimaxJSON(requestId, endpoint, {
        method: 'POST',
        headers,
        body: JSON.stringify(requestBody),
      })
      const duration = Date.now() - startTime
      log('info', requestId, `Resposta Audio em ${duration}ms`)

      if ('error' in res) {
        return NextResponse.json({ success: false, error: res.error }, { status: 502 })
      }

      if (!res.ok) {
        const errorMessage = (res.data.error as Record<string, unknown>)?.message || res.data.message || `Erro HTTP ${res.status}`
        log('error', requestId, 'Erro Audio API', { status: res.status, error: errorMessage })
        return NextResponse.json({ success: false, error: String(errorMessage), details: res.data }, { status: res.status })
      }

      if (res.data.base_resp && (res.data.base_resp as Record<string, unknown>).status_code !== 0) {
        const baseResp = res.data.base_resp as Record<string, unknown>
        log('error', requestId, 'Erro logico Audio', { base_resp: baseResp })
        return NextResponse.json({ success: false, error: String(baseResp.status_msg || 'Erro da API'), details: baseResp }, { status: 422 })
      }

      let result = ''

      // Resposta: data.audio (hex string) - data e um objeto, nao string
      const audioData = res.data.data as { audio?: string; status?: number } | null
      if (audioData && typeof audioData === 'object' && audioData.audio && typeof audioData.audio === 'string') {
        try {
          const buffer = Buffer.from(audioData.audio, 'hex')
          const base64Audio = buffer.toString('base64')
          result = `data:audio/mp3;base64,${base64Audio}`
          log('info', requestId, `Audio convertido hex->base64 | ${buffer.length} bytes`)
        } catch (convError) {
          log('error', requestId, 'Falha ao converter audio hex', { error: String(convError) })
        }
      }

      // Fallback: data pode ser string hex diretamente
      if (!result && typeof res.data.data === 'string') {
        try {
          const buffer = Buffer.from(res.data.data, 'hex')
          const base64Audio = buffer.toString('base64')
          result = `data:audio/mp3;base64,${base64Audio}`
          log('info', requestId, `Audio (string direta) hex->base64 | ${buffer.length} bytes`)
        } catch (convError) {
          log('error', requestId, 'Falha ao converter audio hex (string)', { error: String(convError) })
        }
      }

      // Fallbacks para URL
      if (!result && res.data.audio_url) {
        result = String(res.data.audio_url)
      }
      if (!result) {
        const extraInfo = res.data.extra_info as Record<string, unknown> | undefined
        if (extraInfo?.audio_url) {
          result = String(extraInfo.audio_url)
        }
      }

      if (!result) {
        log('error', requestId, 'Nenhum audio extraido', {
          fields: Object.keys(res.data),
          dataType: typeof res.data.data,
          dataFields: res.data.data && typeof res.data.data === 'object' ? Object.keys(res.data.data as Record<string, unknown>) : 'N/A',
          sample: JSON.stringify(res.data).substring(0, 500)
        })
        return NextResponse.json({
          success: false,
          error: 'Nenhum audio gerado pela API',
          details: {
            availableFields: Object.keys(res.data),
            dataType: typeof res.data.data,
            dataFields: res.data.data && typeof res.data.data === 'object' ? Object.keys(res.data.data as Record<string, unknown>) : 'N/A',
          }
        }, { status: 502 })
      }

      log('info', requestId, `Sucesso Audio | resultado=${result.substring(0, 80)}...`)
      return NextResponse.json({ success: true, result, type })
    }

    // Should not reach here
    return NextResponse.json({ success: false, error: 'Tipo nao implementado' }, { status: 400 })

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
