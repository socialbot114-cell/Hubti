'use client'

import { useState } from 'react'
import { Youtube, Download, Loader2, AlertCircle, CheckCircle } from 'lucide-react'

interface VideoInfo {
  title: string
  thumbnail: string
  duration: string
  author: string
}

export default function YouTubeDownloader() {
  const [url, setUrl] = useState('')
  const [videoInfo, setVideoInfo] = useState<VideoInfo | null>(null)
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleGetInfo = async () => {
    if (!url.trim()) {
      setError('Por favor, insira uma URL do YouTube')
      return
    }

    if (!url.includes('youtube.com') && !url.includes('youtu.be')) {
      setError('URL inválida. Por favor, insira uma URL válida do YouTube')
      return
    }

    setLoading(true)
    setError(null)
    setVideoInfo(null)
    setDownloadUrl(null)

    try {
      const response = await fetch('/api/youtube/info', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url }),
      })

      const data = await response.json()

      if (data.success) {
        setVideoInfo(data.info)
      } else {
        setError(data.error || 'Erro ao buscar informações do vídeo')
      }
    } catch (error) {
      console.error('Erro:', error)
      setError('Erro ao conectar com a API')
    } finally {
      setLoading(false)
    }
  }

  const handleDownload = async () => {
    setLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/youtube/download', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url }),
      })

      const data = await response.json()

      if (data.success) {
        setDownloadUrl(data.downloadUrl)
      } else {
        setError(data.error || 'Erro ao processar download')
      }
    } catch (error) {
      console.error('Erro:', error)
      setError('Erro ao conectar com a API')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-red-400 to-pink-400 bg-clip-text text-transparent">
            YouTube Downloader
          </h1>

          <p className="text-gray-400 max-w-2xl mx-auto mb-6">
            Download de vídeos do YouTube de forma rápida e eficiente.
            Cole a URL do vídeo e baixe em diversos formatos.
          </p>

          <div className="inline-flex items-center gap-2 bg-yellow-500/10 border border-yellow-500/30 rounded-lg px-4 py-2 text-yellow-400 text-sm">
            <AlertCircle className="w-4 h-4" />
            <span>Use apenas para conteúdo que você tem direito de baixar</span>
          </div>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Input Section */}
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-8 border border-red-500/30 mb-8">
            <div className="flex items-center gap-3 mb-6">
              <Youtube className="w-6 h-6 text-red-400" />
              <h2 className="text-2xl font-bold text-white">Buscar Vídeo</h2>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">
                  URL do YouTube
                </label>
                <input
                  type="text"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="https://www.youtube.com/watch?v=..."
                  className="w-full px-4 py-3 bg-slate-900/50 border border-red-500/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/20"
                  onKeyPress={(e) => e.key === 'Enter' && handleGetInfo()}
                />
              </div>

              {error && (
                <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/30 rounded-lg px-4 py-3 text-red-400">
                  <AlertCircle className="w-5 h-5 flex-shrink-0" />
                  <span className="text-sm">{error}</span>
                </div>
              )}

              <button
                onClick={handleGetInfo}
                disabled={loading || !url.trim()}
                className="w-full px-6 py-4 bg-gradient-to-r from-red-500 to-pink-600 text-white font-bold rounded-lg hover:shadow-lg hover:shadow-red-500/50 transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Processando...
                  </>
                ) : (
                  <>
                    <Youtube className="w-5 h-5" />
                    Buscar Vídeo
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Video Info */}
          {videoInfo && (
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-8 border border-red-500/30 mb-8">
              <h3 className="text-xl font-bold text-white mb-6">Informações do Vídeo</h3>

              <div className="flex flex-col md:flex-row gap-6">
                <img
                  src={videoInfo.thumbnail}
                  alt={videoInfo.title}
                  className="w-full md:w-64 rounded-lg"
                />

                <div className="flex-1">
                  <h4 className="text-lg font-bold text-white mb-3">{videoInfo.title}</h4>
                  <div className="space-y-2 text-sm text-gray-400">
                    <p>
                      <span className="text-gray-500">Canal:</span> {videoInfo.author}
                    </p>
                    <p>
                      <span className="text-gray-500">Duração:</span> {videoInfo.duration}
                    </p>
                  </div>

                  <button
                    onClick={handleDownload}
                    disabled={loading}
                    className="mt-6 w-full md:w-auto px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-lg hover:shadow-lg hover:shadow-green-500/50 transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Preparando...
                      </>
                    ) : (
                      <>
                        <Download className="w-5 h-5" />
                        Baixar Vídeo
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Download Link */}
          {downloadUrl && (
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-8 border border-green-500/30 mb-8">
              <div className="flex items-center gap-2 text-green-400 mb-4">
                <CheckCircle className="w-6 h-6" />
                <h3 className="text-xl font-bold">Pronto para Download!</h3>
              </div>

              <p className="text-gray-400 mb-6">
                Seu vídeo está pronto. Clique no botão abaixo para iniciar o download.
              </p>

              <a
                href={downloadUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-lg hover:shadow-lg hover:shadow-green-500/50 transition-all hover:scale-105"
              >
                <Download className="w-5 h-5" />
                Iniciar Download
              </a>
            </div>
          )}

          {/* Features */}
          <div className="bg-slate-800/30 backdrop-blur rounded-xl p-6 border border-red-500/20">
            <h3 className="text-lg font-bold text-white mb-4">Recursos</h3>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-green-400 mt-1 flex-shrink-0" />
                <span>Download rápido e sem limite de tamanho</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-green-400 mt-1 flex-shrink-0" />
                <span>Suporte a vídeos em alta qualidade (HD, Full HD, 4K)</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-green-400 mt-1 flex-shrink-0" />
                <span>Opção de baixar apenas áudio (MP3)</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-green-400 mt-1 flex-shrink-0" />
                <span>Sem necessidade de registro</span>
              </li>
            </ul>
          </div>

          {/* Enterprise CTA */}
          <div className="mt-8 bg-gradient-to-r from-red-900/50 to-pink-900/50 backdrop-blur rounded-xl p-8 border border-red-500/30 text-center">
            <h3 className="text-2xl font-bold text-white mb-4">
              Precisa de soluções de processamento de mídia?
            </h3>
            <p className="text-gray-300 mb-6">
              Oferecemos serviços de processamento de vídeo, conversão de formatos,
              streaming e integrações com plataformas de vídeo.
            </p>
            <a
              href="#contato"
              className="inline-block px-8 py-3 bg-gradient-to-r from-red-500 to-pink-600 text-white font-bold rounded-lg hover:shadow-lg hover:shadow-red-500/50 transition-all hover:scale-105"
            >
              Fale com nossa equipe
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
