'use client'

import { useState } from 'react'
import { Youtube, Download, Loader2, AlertCircle, Check, ArrowRight, ExternalLink } from 'lucide-react'

interface VideoInfo {
  title: string
  thumbnail: string
  thumbnailFallback?: string
  author: string
  authorUrl?: string
  videoId: string
}

interface DownloadFormat {
  quality: string
  mimeType: string
  url: string
}

interface DownloadResult {
  downloadUrl: string
  fallback: boolean
  videoTitle?: string
  selectedFormat?: { quality: string; mimeType: string }
  formats?: DownloadFormat[]
  message?: string
}

export default function YouTubeDownloader() {
  const [url, setUrl] = useState('')
  const [videoInfo, setVideoInfo] = useState<VideoInfo | null>(null)
  const [downloadResult, setDownloadResult] = useState<DownloadResult | null>(null)
  const [loading, setLoading] = useState(false)
  const [downloading, setDownloading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleGetInfo = async () => {
    if (!url.trim()) {
      setError('Insira uma URL do YouTube')
      return
    }

    if (!url.includes('youtube.com') && !url.includes('youtu.be')) {
      setError('URL invalida. Use uma URL do YouTube (youtube.com ou youtu.be)')
      return
    }

    setLoading(true)
    setError(null)
    setVideoInfo(null)
    setDownloadResult(null)

    try {
      const response = await fetch('/api/youtube/info', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url }),
      })

      const data = await response.json()
      console.log('[YouTube] Info:', data)

      if (data.success) {
        setVideoInfo(data.info)
      } else {
        setError(data.error || 'Erro ao buscar informacoes do video')
      }
    } catch (err) {
      console.error('[YouTube] Erro:', err)
      setError('Erro ao conectar com a API')
    } finally {
      setLoading(false)
    }
  }

  const handleDownload = async (format: string = 'video') => {
    setDownloading(true)
    setError(null)

    try {
      const response = await fetch('/api/youtube/download', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url, format }),
      })

      const data = await response.json()
      console.log('[YouTube] Download:', data)

      if (data.success) {
        setDownloadResult(data)
      } else {
        setError(data.error || 'Erro ao processar download')
      }
    } catch (err) {
      console.error('[YouTube] Erro:', err)
      setError('Erro ao conectar com a API')
    } finally {
      setDownloading(false)
    }
  }

  const handleThumbnailError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const img = e.currentTarget
    if (videoInfo?.thumbnailFallback && img.src !== videoInfo.thumbnailFallback) {
      img.src = videoInfo.thumbnailFallback
    }
  }

  return (
    <div className="min-h-screen py-12 md:py-20">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px w-8 bg-gradient-to-r from-accent/60 to-transparent" />
            <span className="text-xs font-semibold tracking-[0.2em] uppercase text-zinc-500">
              Midia Digital
            </span>
          </div>

          <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-4">
            YouTube Tools
          </h1>
          <p className="text-zinc-500 text-base max-w-xl">
            Busque informacoes e faca download de videos do YouTube.
            Cole a URL e obtenha os dados do video em segundos.
          </p>
        </div>

        {/* Legal notice */}
        <div className="flex items-center gap-3 rounded-xl bg-white/[0.02] border border-white/[0.06] px-4 py-3 mb-8">
          <AlertCircle className="w-4 h-4 text-zinc-600 flex-shrink-0" />
          <span className="text-xs text-zinc-600">Use apenas para conteudo que voce tem direito de baixar</span>
        </div>

        {/* Search */}
        <div className="rounded-2xl bg-[#0c0b16] border border-white/[0.06] p-6 md:p-8 mb-6">
          <label className="block text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-3">
            URL do YouTube
          </label>
          <div className="flex gap-3">
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://www.youtube.com/watch?v=..."
              className="flex-1 px-4 py-3 bg-white/[0.02] border border-white/[0.06] rounded-xl text-zinc-200 text-sm placeholder-zinc-700 focus:outline-none focus:border-white/[0.14] transition-colors"
              onKeyDown={(e) => e.key === 'Enter' && handleGetInfo()}
            />
            <button
              onClick={handleGetInfo}
              disabled={loading || !url.trim()}
              className="px-6 py-3 bg-white text-[#06050e] text-sm font-semibold rounded-lg hover:bg-zinc-200 transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-2 flex-shrink-0"
            >
              {loading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Youtube className="w-4 h-4" />
              )}
              Buscar
            </button>
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="rounded-xl bg-red-500/5 border border-red-500/10 p-4 mb-6">
            <div className="flex items-center gap-3">
              <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
              <span className="text-sm text-red-400">{error}</span>
            </div>
          </div>
        )}

        {/* Video Info */}
        {videoInfo && (
          <div className="rounded-2xl bg-[#0c0b16] border border-white/[0.06] p-6 md:p-8 mb-6">
            <h3 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-5">
              Informacoes do Video
            </h3>

            <div className="flex flex-col md:flex-row gap-6">
              <div className="md:w-72 flex-shrink-0">
                <img
                  src={videoInfo.thumbnail}
                  alt={videoInfo.title}
                  className="w-full rounded-xl bg-white/[0.02]"
                  onError={handleThumbnailError}
                />
              </div>

              <div className="flex-1 min-w-0">
                <h4 className="text-lg font-semibold text-white mb-3 tracking-tight">
                  {videoInfo.title}
                </h4>
                <div className="space-y-1.5 mb-6">
                  <div className="text-sm text-zinc-500">
                    <span className="text-zinc-600">Canal:</span>{' '}
                    {videoInfo.authorUrl ? (
                      <a href={videoInfo.authorUrl} target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-white transition-colors">
                        {videoInfo.author}
                      </a>
                    ) : (
                      <span className="text-zinc-400">{videoInfo.author}</span>
                    )}
                  </div>
                  <div className="text-sm text-zinc-500">
                    <span className="text-zinc-600">ID:</span>{' '}
                    <span className="text-zinc-400 font-mono text-xs">{videoInfo.videoId}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={() => handleDownload('video')}
                    disabled={downloading}
                    className="group inline-flex items-center gap-2 px-5 py-2.5 bg-white text-[#06050e] text-sm font-semibold rounded-lg hover:bg-zinc-200 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    {downloading ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Download className="w-4 h-4" />
                    )}
                    Download Video
                  </button>
                  <button
                    onClick={() => handleDownload('audio')}
                    disabled={downloading}
                    className="inline-flex items-center gap-2 px-5 py-2.5 text-zinc-400 text-sm font-medium rounded-lg border border-white/[0.08] hover:border-white/[0.14] hover:text-zinc-300 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    Download Audio (MP3)
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Download Result */}
        {downloadResult && (
          <div className="rounded-2xl bg-[#0c0b16] border border-white/[0.06] p-6 md:p-8 mb-6">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-8 h-8 rounded-lg bg-green-500/10 border border-green-500/20 flex items-center justify-center">
                <Check className="w-4 h-4 text-green-400" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-white">
                  {downloadResult.fallback ? 'Link alternativo disponivel' : 'Download pronto'}
                </h3>
                {downloadResult.selectedFormat && (
                  <p className="text-xs text-zinc-600">
                    {downloadResult.selectedFormat.quality} &middot; {downloadResult.selectedFormat.mimeType}
                  </p>
                )}
              </div>
            </div>

            {downloadResult.fallback && downloadResult.message && (
              <p className="text-xs text-zinc-500 mb-4 p-3 rounded-lg bg-white/[0.02] border border-white/[0.04]">
                {downloadResult.message}
              </p>
            )}

            <a
              href={downloadResult.downloadUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 px-6 py-3 bg-white text-[#06050e] text-sm font-semibold rounded-lg hover:bg-zinc-200 transition-colors"
            >
              <Download className="w-4 h-4" />
              {downloadResult.fallback ? 'Abrir no YouTube' : 'Iniciar Download'}
              <ExternalLink className="w-3 h-3 opacity-50" />
            </a>

            {/* Other formats */}
            {downloadResult.formats && downloadResult.formats.length > 1 && (
              <div className="mt-6 pt-6 border-t border-white/[0.04]">
                <h4 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-3">
                  Outros formatos disponiveis
                </h4>
                <div className="space-y-2">
                  {downloadResult.formats.slice(1).map((fmt, i) => (
                    <a
                      key={i}
                      href={fmt.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-3 rounded-lg bg-white/[0.02] border border-white/[0.04] hover:border-white/[0.08] transition-colors group"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-sm text-zinc-400">{fmt.quality}</span>
                        <span className="text-xs text-zinc-600">{fmt.mimeType}</span>
                      </div>
                      <Download className="w-3.5 h-3.5 text-zinc-600 group-hover:text-zinc-400 transition-colors" />
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Features */}
        <div className="rounded-2xl bg-[#0c0b16] border border-white/[0.06] p-6 md:p-8 mb-6">
          <h3 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-5">Recursos</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              'Download em multiplas qualidades',
              'Suporte a HD, Full HD e 4K',
              'Extracao de audio (MP3)',
              'Informacoes reais do video via oEmbed',
              'Processamento server-side seguro',
              'Sem necessidade de registro',
            ].map((feature) => (
              <div key={feature} className="flex items-center gap-2.5 text-sm text-zinc-400">
                <div className="w-5 h-5 rounded-md bg-white/[0.03] border border-white/[0.06] flex items-center justify-center flex-shrink-0">
                  <Check className="w-3 h-3 text-zinc-500" />
                </div>
                {feature}
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="rounded-2xl bg-[#0c0b16] border border-white/[0.06] p-8 text-center">
          <h3 className="text-xl font-bold text-white mb-3 tracking-tight">
            Precisa de processamento de midia em escala?
          </h3>
          <p className="text-sm text-zinc-500 mb-6 max-w-md mx-auto">
            Oferecemos servicos de processamento de video, conversao de formatos e integracoes com plataformas de streaming.
          </p>
          <a
            href="mailto:contato@hubti.com"
            className="group inline-flex items-center gap-2 px-6 py-3 bg-white text-[#06050e] text-sm font-semibold rounded-lg hover:bg-zinc-200 transition-colors"
          >
            Falar com especialista
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </a>
        </div>
      </div>
    </div>
  )
}
