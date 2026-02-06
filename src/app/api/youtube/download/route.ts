import { NextRequest, NextResponse } from 'next/server'
import ytdl from '@distube/ytdl-core'

function log(level: 'info' | 'warn' | 'error', message: string, data?: unknown) {
  const timestamp = new Date().toISOString()
  const prefix = `[${timestamp}] [YouTube/download]`
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
    const { url, format = 'video' } = await request.json()

    if (!url) {
      return NextResponse.json(
        { success: false, error: 'URL e obrigatoria' },
        { status: 400 }
      )
    }

    const videoId = extractVideoId(url)
    if (!videoId) {
      log('warn', 'Video ID nao encontrado', { url })
      return NextResponse.json(
        { success: false, error: 'URL do YouTube invalida' },
        { status: 400 }
      )
    }

    const videoUrl = `https://www.youtube.com/watch?v=${videoId}`
    log('info', `Buscando formatos para: ${videoId} | formato=${format}`)

    const startTime = Date.now()

    // Buscar informacoes do video com ytdl-core
    let info
    try {
      info = await ytdl.getInfo(videoUrl)
    } catch (ytdlError: unknown) {
      const msg = ytdlError instanceof Error ? ytdlError.message : String(ytdlError)
      log('error', `ytdl-core falhou ao obter info`, { error: msg, videoId })

      // Fallback: retornar link direto do YouTube com instrucoes
      return NextResponse.json({
        success: true,
        downloadUrl: videoUrl,
        formats: [],
        fallback: true,
        message: 'Nao foi possivel processar o video diretamente. Link alternativo fornecido.',
        details: msg,
      })
    }

    const duration = Date.now() - startTime
    log('info', `Info obtida em ${duration}ms | titulo="${info.videoDetails.title}" | ${info.formats.length} formatos`)

    // Filtrar formatos relevantes
    const availableFormats = info.formats
      .filter(f => {
        if (format === 'audio') {
          return f.hasAudio && !f.hasVideo
        }
        return f.hasVideo && f.hasAudio
      })
      .map(f => ({
        itag: f.itag,
        quality: f.qualityLabel || f.audioQuality || 'unknown',
        mimeType: f.mimeType?.split(';')[0] || 'unknown',
        contentLength: f.contentLength,
        hasAudio: f.hasAudio,
        hasVideo: f.hasVideo,
        url: f.url,
      }))
      .sort((a, b) => {
        // Ordenar por qualidade (maior primeiro)
        const qualA = parseInt(a.quality) || 0
        const qualB = parseInt(b.quality) || 0
        return qualB - qualA
      })

    if (availableFormats.length === 0) {
      log('warn', 'Nenhum formato compativel encontrado', { videoId, totalFormats: info.formats.length })
      return NextResponse.json({
        success: true,
        downloadUrl: videoUrl,
        formats: [],
        fallback: true,
        message: 'Nenhum formato com video+audio combinado encontrado. Link alternativo fornecido.',
      })
    }

    // Pegar o melhor formato disponivel
    const bestFormat = availableFormats[0]

    log('info', `Melhor formato: ${bestFormat.quality} | ${bestFormat.mimeType} | itag=${bestFormat.itag}`)

    return NextResponse.json({
      success: true,
      downloadUrl: bestFormat.url,
      fallback: false,
      videoTitle: info.videoDetails.title,
      selectedFormat: {
        quality: bestFormat.quality,
        mimeType: bestFormat.mimeType,
      },
      formats: availableFormats.slice(0, 6).map(f => ({
        quality: f.quality,
        mimeType: f.mimeType,
        url: f.url,
      })),
    })

  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error)
    const stack = error instanceof Error ? error.stack : undefined
    log('error', `Erro nao tratado: ${message}`, { stack: stack?.substring(0, 400) })

    return NextResponse.json(
      { success: false, error: 'Erro interno ao processar download', details: message },
      { status: 500 }
    )
  }
}
