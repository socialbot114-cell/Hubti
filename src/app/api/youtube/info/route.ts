import { NextRequest, NextResponse } from 'next/server'

function log(level: 'info' | 'warn' | 'error', message: string, data?: unknown) {
  const timestamp = new Date().toISOString()
  const prefix = `[${timestamp}] [YouTube/info]`
  const payload = data !== undefined ? ` | ${JSON.stringify(data)}` : ''

  switch (level) {
    case 'info': console.log(`${prefix} ${message}${payload}`); break
    case 'warn': console.warn(`${prefix} ⚠ ${message}${payload}`); break
    case 'error': console.error(`${prefix} ✗ ${message}${payload}`); break
  }
}

function extractVideoId(url: string): string | null {
  try {
    const urlObj = new URL(url)
    if (urlObj.hostname.includes('youtube.com')) {
      return urlObj.searchParams.get('v') || null
    }
    if (urlObj.hostname.includes('youtu.be')) {
      return urlObj.pathname.substring(1).split('/')[0] || null
    }
    return null
  } catch {
    return null
  }
}

export async function POST(request: NextRequest) {
  try {
    const { url } = await request.json()

    if (!url) {
      return NextResponse.json(
        { success: false, error: 'URL e obrigatoria' },
        { status: 400 }
      )
    }

    log('info', `Buscando info para: ${url}`)

    const videoId = extractVideoId(url)
    if (!videoId) {
      log('warn', 'Video ID nao encontrado', { url })
      return NextResponse.json(
        { success: false, error: 'URL do YouTube invalida. Use formato: youtube.com/watch?v=ID ou youtu.be/ID' },
        { status: 400 }
      )
    }

    log('info', `Video ID extraido: ${videoId}`)

    // Usar YouTube oEmbed API (publica, sem necessidade de API key)
    const oembedUrl = `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`

    const startTime = Date.now()
    const oembedResponse = await fetch(oembedUrl)
    const duration = Date.now() - startTime

    log('info', `oEmbed resposta: status=${oembedResponse.status} | ${duration}ms`)

    if (!oembedResponse.ok) {
      if (oembedResponse.status === 401 || oembedResponse.status === 403) {
        log('error', 'Video privado ou restrito', { videoId, status: oembedResponse.status })
        return NextResponse.json(
          { success: false, error: 'Este video e privado ou restrito' },
          { status: 403 }
        )
      }
      if (oembedResponse.status === 404) {
        log('error', 'Video nao encontrado', { videoId })
        return NextResponse.json(
          { success: false, error: 'Video nao encontrado. Verifique a URL.' },
          { status: 404 }
        )
      }

      log('error', `Erro oEmbed: ${oembedResponse.status}`)
      return NextResponse.json(
        { success: false, error: `Erro ao buscar informacoes do video (HTTP ${oembedResponse.status})` },
        { status: 502 }
      )
    }

    const oembed = await oembedResponse.json()

    log('info', `Video encontrado: "${oembed.title}" por ${oembed.author_name}`)

    const videoInfo = {
      title: oembed.title || `Video ${videoId}`,
      thumbnail: `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
      thumbnailFallback: `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`,
      author: oembed.author_name || 'Desconhecido',
      authorUrl: oembed.author_url || '',
      videoId,
      embedWidth: oembed.width,
      embedHeight: oembed.height,
    }

    return NextResponse.json({
      success: true,
      info: videoInfo,
    })

  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error)
    log('error', `Erro nao tratado: ${message}`)
    return NextResponse.json(
      { success: false, error: 'Erro interno ao buscar informacoes do video', details: message },
      { status: 500 }
    )
  }
}
