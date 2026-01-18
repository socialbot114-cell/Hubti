'use client'

import { useState } from 'react'
import { Brain, Image as ImageIcon, Video, Music, FileText, Sparkles, Wand2, Loader2 } from 'lucide-react'

export default function AIStudio() {
  const [selectedService, setSelectedService] = useState<'text' | 'image' | 'video' | 'audio'>('text')
  const [prompt, setPrompt] = useState('')
  const [result, setResult] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const services = [
    {
      id: 'text' as const,
      name: 'Geração de Texto',
      icon: FileText,
      description: 'Crie textos, artigos e conteúdo com IA avançada',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      id: 'image' as const,
      name: 'Geração de Imagem',
      icon: ImageIcon,
      description: 'Transforme ideias em imagens incríveis',
      color: 'from-purple-500 to-pink-500'
    },
    {
      id: 'video' as const,
      name: 'Geração de Vídeo',
      icon: Video,
      description: 'Crie vídeos profissionais com IA',
      color: 'from-orange-500 to-red-500'
    },
    {
      id: 'audio' as const,
      name: 'Geração de Áudio',
      icon: Music,
      description: 'Sintetize voz e crie áudio de alta qualidade',
      color: 'from-green-500 to-emerald-500'
    }
  ]

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      alert('Por favor, insira um prompt')
      return
    }

    setLoading(true)
    setResult(null)

    try {
      const response = await fetch('/api/ai/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: selectedService,
          prompt: prompt,
        }),
      })

      const data = await response.json()
      console.log('Resposta da API:', data)

      if (data.success) {
        setResult(data.result)
      } else {
        const errorMsg = `Erro ao gerar conteúdo:\n${data.error || 'Erro desconhecido'}\n\nDetalhes: ${JSON.stringify(data.details || {}, null, 2)}`
        console.error('Erro da API:', data)
        alert(errorMsg)
      }
    } catch (error) {
      console.error('Erro:', error)
      alert(`Erro ao conectar com a API: ${error instanceof Error ? error.message : 'Erro desconhecido'}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-block mb-4">
            <span className="bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 text-white text-sm font-bold px-4 py-2 rounded-full animate-pulse">
              AAA+++ PREMIUM
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 bg-clip-text text-transparent">
            IA Studio
          </h1>

          <p className="text-xl text-gray-300 mb-4">
            Powered by <span className="font-bold text-purple-400">Minimax</span>
          </p>

          <p className="text-gray-400 max-w-2xl mx-auto">
            Experimente o futuro da criação de conteúdo com nossa plataforma de IA mais avançada.
            Gere texto, imagens, vídeos e áudio com tecnologia de ponta.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12 max-w-6xl mx-auto">
          {services.map((service) => {
            const Icon = service.icon
            const isSelected = selectedService === service.id

            return (
              <button
                key={service.id}
                onClick={() => setSelectedService(service.id)}
                className={`relative p-6 rounded-xl border-2 transition-all duration-300 text-left ${
                  isSelected
                    ? 'border-purple-500 bg-gradient-to-br from-slate-800 to-slate-900 scale-105 shadow-lg shadow-purple-500/30'
                    : 'border-purple-500/20 bg-slate-800/50 hover:border-purple-500/50 hover:scale-102'
                }`}
              >
                {isSelected && (
                  <div className="absolute -top-2 -right-2">
                    <Sparkles className="w-6 h-6 text-yellow-400 animate-pulse" />
                  </div>
                )}

                <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${service.color} flex items-center justify-center mb-4`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>

                <h3 className="text-lg font-bold text-white mb-2">{service.name}</h3>
                <p className="text-sm text-gray-400">{service.description}</p>
              </button>
            )
          })}
        </div>

        {/* Generator Interface */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-8 border border-purple-500/30 shadow-2xl">
            <div className="flex items-center gap-3 mb-6">
              <Wand2 className="w-6 h-6 text-purple-400" />
              <h2 className="text-2xl font-bold text-white">
                {services.find(s => s.id === selectedService)?.name}
              </h2>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">
                  Descreva o que você quer criar:
                </label>
                <textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder={`Exemplo: ${
                    selectedService === 'text' ? 'Escreva um artigo sobre IA...' :
                    selectedService === 'image' ? 'Uma paisagem futurista com...' :
                    selectedService === 'video' ? 'Um vídeo mostrando...' :
                    'Uma narração profissional sobre...'
                  }`}
                  rows={5}
                  className="w-full px-4 py-3 bg-slate-900/50 border border-purple-500/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20"
                />
              </div>

              <button
                onClick={handleGenerate}
                disabled={loading || !prompt.trim()}
                className="w-full px-6 py-4 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-bold rounded-lg hover:shadow-lg hover:shadow-purple-500/50 transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Gerando...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5" />
                    Gerar com IA
                  </>
                )}
              </button>
            </div>

            {/* Result Display */}
            {result && (
              <div className="mt-8 p-6 bg-slate-900/50 rounded-lg border border-purple-500/30">
                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-yellow-400" />
                  Resultado:
                </h3>
                <div className="text-gray-300">
                  {selectedService === 'image' && (
                    <img src={result} alt="Generated" className="w-full rounded-lg" />
                  )}
                  {selectedService === 'video' && (
                    <video src={result} controls className="w-full rounded-lg" />
                  )}
                  {selectedService === 'audio' && (
                    <audio src={result} controls className="w-full" />
                  )}
                  {selectedService === 'text' && (
                    <div className="whitespace-pre-wrap">{result}</div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* API Info */}
          <div className="mt-8 bg-slate-800/30 backdrop-blur rounded-xl p-6 border border-purple-500/20">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <Brain className="w-5 h-5 text-purple-400" />
              Sobre a tecnologia Minimax
            </h3>
            <p className="text-gray-400 mb-4">
              A Minimax é uma das plataformas de IA mais avançadas do mercado, oferecendo modelos
              multimodais de última geração para geração de conteúdo. Nossa integração premium
              garante acesso aos melhores recursos disponíveis.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-400">4K+</div>
                <div className="text-xs text-gray-500">Resolução</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-400">60fps</div>
                <div className="text-xs text-gray-500">Vídeos</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-400">48kHz</div>
                <div className="text-xs text-gray-500">Áudio</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-400">GPT-4</div>
                <div className="text-xs text-gray-500">Level</div>
              </div>
            </div>
          </div>

          {/* Enterprise CTA */}
          <div className="mt-8 bg-gradient-to-r from-indigo-900/50 to-purple-900/50 backdrop-blur rounded-xl p-8 border border-purple-500/30 text-center">
            <h3 className="text-2xl font-bold text-white mb-4">
              Quer integrar IA no seu negócio?
            </h3>
            <p className="text-gray-300 mb-6">
              Nossa equipe pode implementar soluções customizadas de IA para sua empresa,
              eliminando toda a complexidade técnica.
            </p>
            <a
              href="#contato"
              className="inline-block px-8 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-bold rounded-lg hover:shadow-lg hover:shadow-purple-500/50 transition-all hover:scale-105"
            >
              Fale com nossa equipe
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
