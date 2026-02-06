'use client'

import { useState } from 'react'
import { Brain, Image as ImageIcon, Video, Music, FileText, Loader2, ArrowRight, AlertCircle } from 'lucide-react'

type ServiceType = 'text' | 'image' | 'video' | 'audio'

const services: { id: ServiceType; name: string; icon: typeof FileText; description: string }[] = [
  { id: 'text', name: 'Texto', icon: FileText, description: 'Artigos, conteudo e textos com IA' },
  { id: 'image', name: 'Imagem', icon: ImageIcon, description: 'Transforme ideias em imagens HD' },
  { id: 'video', name: 'Video', icon: Video, description: 'Videos profissionais com IA' },
  { id: 'audio', name: 'Audio', icon: Music, description: 'Sintese de voz em alta qualidade' },
]

const placeholders: Record<ServiceType, string> = {
  text: 'Escreva um artigo sobre inteligencia artificial aplicada a negocios...',
  image: 'Uma paisagem futurista com arranha-ceus de cristal ao por do sol...',
  video: 'Um video mostrando a evolucao da tecnologia ao longo dos anos...',
  audio: 'Uma narracao profissional explicando os beneficios da automacao...',
}

export default function AIStudio() {
  const [selectedService, setSelectedService] = useState<ServiceType>('text')
  const [prompt, setPrompt] = useState('')
  const [result, setResult] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleGenerate = async () => {
    if (!prompt.trim()) return

    setLoading(true)
    setResult(null)
    setError(null)

    try {
      const response = await fetch('/api/ai/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: selectedService, prompt }),
      })

      const data = await response.json()
      console.log('[AI Studio] Resposta:', data)

      if (data.success) {
        setResult(data.result)
      } else {
        const details = data.details
          ? typeof data.details === 'object'
            ? JSON.stringify(data.details, null, 2)
            : String(data.details)
          : ''
        setError(`${data.error || 'Erro desconhecido'}${details ? `\n\n${details}` : ''}`)
      }
    } catch (err) {
      console.error('[AI Studio] Erro:', err)
      setError(`Erro ao conectar com a API: ${err instanceof Error ? err.message : 'Erro de rede'}`)
    } finally {
      setLoading(false)
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
              Inteligencia Artificial
            </span>
            <span className="text-[10px] font-semibold tracking-widest uppercase text-accent bg-accent/10 px-2 py-0.5 rounded">
              AAA+++
            </span>
          </div>

          <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-4">
            IA Studio
          </h1>
          <p className="text-zinc-500 text-base max-w-xl">
            Crie conteudo com os modelos mais avancados da Minimax.
            Texto, imagens, video e audio em uma unica plataforma.
          </p>
        </div>

        {/* Service Selector */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
          {services.map((service) => {
            const Icon = service.icon
            const isSelected = selectedService === service.id

            return (
              <button
                key={service.id}
                onClick={() => { setSelectedService(service.id); setResult(null); setError(null) }}
                className={`relative p-4 md:p-5 rounded-xl border text-left transition-all duration-200 ${
                  isSelected
                    ? 'border-white/[0.14] bg-[#12111d]'
                    : 'border-white/[0.06] bg-[#0c0b16] hover:border-white/[0.10]'
                }`}
              >
                <div className={`w-9 h-9 rounded-lg border flex items-center justify-center mb-3 transition-all ${
                  isSelected
                    ? 'bg-white/[0.08] border-white/[0.12]'
                    : 'bg-white/[0.03] border-white/[0.06]'
                }`}>
                  <Icon className={`w-4 h-4 ${isSelected ? 'text-zinc-200' : 'text-zinc-500'}`} />
                </div>
                <h3 className={`text-sm font-semibold mb-0.5 ${isSelected ? 'text-white' : 'text-zinc-400'}`}>
                  {service.name}
                </h3>
                <p className="text-[11px] text-zinc-600 hidden md:block">{service.description}</p>
                {isSelected && (
                  <div className="absolute bottom-0 left-3 right-3 h-[2px] bg-gradient-to-r from-transparent via-accent/40 to-transparent" />
                )}
              </button>
            )
          })}
        </div>

        {/* Generator */}
        <div className="rounded-2xl bg-[#0c0b16] border border-white/[0.06] p-6 md:p-8 mb-6">
          <label className="block text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-3">
            Prompt
          </label>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder={placeholders[selectedService]}
            rows={4}
            className="w-full px-4 py-3 bg-white/[0.02] border border-white/[0.06] rounded-xl text-zinc-200 text-sm placeholder-zinc-700 focus:outline-none focus:border-white/[0.14] resize-none transition-colors"
          />

          <button
            onClick={handleGenerate}
            disabled={loading || !prompt.trim()}
            className="mt-4 w-full group inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-[#06050e] text-sm font-semibold rounded-lg hover:bg-zinc-200 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Gerando...
              </>
            ) : (
              <>
                Gerar com IA
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </>
            )}
          </button>
        </div>

        {/* Error */}
        {error && (
          <div className="rounded-xl bg-red-500/5 border border-red-500/10 p-5 mb-6">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
              <div>
                <div className="text-sm font-medium text-red-400 mb-1">Erro ao gerar conteudo</div>
                <pre className="text-xs text-red-400/70 whitespace-pre-wrap font-mono">{error}</pre>
              </div>
            </div>
          </div>
        )}

        {/* Result */}
        {result && (
          <div className="rounded-2xl bg-[#0c0b16] border border-white/[0.06] p-6 md:p-8 mb-6">
            <h3 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-4">Resultado</h3>
            <div>
              {selectedService === 'image' && (
                <img src={result} alt="Imagem gerada" className="w-full rounded-xl" />
              )}
              {selectedService === 'video' && (
                <video src={result} controls className="w-full rounded-xl" />
              )}
              {selectedService === 'audio' && (
                <audio src={result} controls className="w-full" />
              )}
              {selectedService === 'text' && (
                <div className="text-zinc-300 text-sm leading-relaxed whitespace-pre-wrap">{result}</div>
              )}
            </div>
          </div>
        )}

        {/* Tech Info */}
        <div className="rounded-2xl bg-[#0c0b16] border border-white/[0.06] p-6 md:p-8 mb-6">
          <div className="flex items-center gap-3 mb-5">
            <Brain className="w-4 h-4 text-zinc-500" />
            <h3 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">Tecnologia</h3>
          </div>
          <p className="text-sm text-zinc-500 leading-relaxed mb-6">
            Integrado com a plataforma Minimax, uma das mais avancadas em IA generativa.
            Modelos multimodais de ultima geracao para geracao de conteudo profissional.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { value: '4K+', label: 'Resolucao' },
              { value: '60fps', label: 'Videos' },
              { value: '48kHz', label: 'Audio' },
              { value: 'GPT-4', label: 'Nivel' },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="text-xl font-bold text-white tracking-tight">{stat.value}</div>
                <div className="text-[11px] text-zinc-600 uppercase tracking-wide">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="rounded-2xl bg-[#0c0b16] border border-white/[0.06] p-8 text-center">
          <h3 className="text-xl font-bold text-white mb-3 tracking-tight">
            Precisa de IA integrada ao seu negocio?
          </h3>
          <p className="text-sm text-zinc-500 mb-6 max-w-md mx-auto">
            Nossa equipe implementa solucoes customizadas de IA para sua empresa.
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
