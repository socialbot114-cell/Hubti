'use client'

import { useState } from 'react'
import { QrCode, Download, Copy, Check, Sparkles } from 'lucide-react'

export default function PixQRCode() {
  const [pixKey, setPixKey] = useState('')
  const [name, setName] = useState('')
  const [city, setCity] = useState('')
  const [amount, setAmount] = useState('')
  const [description, setDescription] = useState('')
  const [qrCodeUrl, setQrCodeUrl] = useState<string | null>(null)
  const [pixCopyPaste, setPixCopyPaste] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [copied, setCopied] = useState(false)

  const handleGenerate = async () => {
    if (!pixKey || !name || !city) {
      alert('Por favor, preencha todos os campos obrigatórios')
      return
    }

    setLoading(true)
    setQrCodeUrl(null)
    setPixCopyPaste(null)

    try {
      const response = await fetch('/api/pix/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          pixKey,
          name,
          city,
          amount: amount ? parseFloat(amount) : undefined,
          description,
        }),
      })

      const data = await response.json()

      if (data.success) {
        setQrCodeUrl(data.qrCode)
        setPixCopyPaste(data.pixCopyPaste)
      } else {
        alert('Erro ao gerar QR Code: ' + data.error)
      }
    } catch (error) {
      console.error('Erro:', error)
      alert('Erro ao conectar com a API')
    } finally {
      setLoading(false)
    }
  }

  const handleCopy = () => {
    if (pixCopyPaste) {
      navigator.clipboard.writeText(pixCopyPaste)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const handleDownload = () => {
    if (qrCodeUrl) {
      const link = document.createElement('a')
      link.href = qrCodeUrl
      link.download = 'qrcode-pix.png'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }
  }

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-block mb-4">
            <span className="bg-gradient-to-r from-green-500 to-emerald-500 text-white text-sm font-bold px-4 py-2 rounded-full animate-pulse">
              AA++ PREMIUM
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
            Gerador de PIX QR Code
          </h1>

          <p className="text-gray-400 max-w-2xl mx-auto">
            Gere QR Codes PIX instantaneamente para pagamentos. Solução completa, segura e fácil de integrar.
          </p>
        </div>

        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form */}
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-8 border border-green-500/30 shadow-2xl">
            <div className="flex items-center gap-3 mb-6">
              <QrCode className="w-6 h-6 text-green-400" />
              <h2 className="text-2xl font-bold text-white">Dados do PIX</h2>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">
                  Chave PIX <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  value={pixKey}
                  onChange={(e) => setPixKey(e.target.value)}
                  placeholder="CPF, CNPJ, email, telefone ou chave aleatória"
                  className="w-full px-4 py-3 bg-slate-900/50 border border-green-500/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">
                  Nome do Beneficiário <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Nome completo ou razão social"
                  className="w-full px-4 py-3 bg-slate-900/50 border border-green-500/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">
                  Cidade <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="Ex: São Paulo"
                  className="w-full px-4 py-3 bg-slate-900/50 border border-green-500/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">
                  Valor (R$)
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="0.00 (opcional)"
                  className="w-full px-4 py-3 bg-slate-900/50 border border-green-500/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">
                  Descrição
                </label>
                <input
                  type="text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Opcional"
                  className="w-full px-4 py-3 bg-slate-900/50 border border-green-500/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20"
                />
              </div>

              <button
                onClick={handleGenerate}
                disabled={loading || !pixKey || !name || !city}
                className="w-full px-6 py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-lg hover:shadow-lg hover:shadow-green-500/50 transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Gerando...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5" />
                    Gerar QR Code
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Result */}
          <div className="space-y-6">
            {qrCodeUrl ? (
              <>
                {/* QR Code Display */}
                <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-8 border border-green-500/30 shadow-2xl">
                  <h3 className="text-xl font-bold text-white mb-6 text-center">
                    Seu QR Code PIX
                  </h3>

                  <div className="bg-white p-6 rounded-lg mb-6">
                    <img
                      src={qrCodeUrl}
                      alt="QR Code PIX"
                      className="w-full h-auto"
                    />
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={handleDownload}
                      className="flex-1 px-4 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-colors flex items-center justify-center gap-2"
                    >
                      <Download className="w-4 h-4" />
                      Download
                    </button>
                    <button
                      onClick={handleCopy}
                      className="flex-1 px-4 py-3 bg-slate-700 hover:bg-slate-600 text-white font-semibold rounded-lg transition-colors flex items-center justify-center gap-2"
                    >
                      {copied ? (
                        <>
                          <Check className="w-4 h-4" />
                          Copiado!
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4" />
                          Copiar
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* PIX Copy and Paste */}
                {pixCopyPaste && (
                  <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-8 border border-green-500/30 shadow-2xl">
                    <h3 className="text-xl font-bold text-white mb-4">
                      PIX Copia e Cola
                    </h3>
                    <div className="bg-slate-900/50 p-4 rounded-lg mb-4 border border-green-500/30">
                      <code className="text-green-400 text-xs break-all font-mono">
                        {pixCopyPaste}
                      </code>
                    </div>
                    <button
                      onClick={handleCopy}
                      className="w-full px-4 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-colors flex items-center justify-center gap-2"
                    >
                      {copied ? (
                        <>
                          <Check className="w-4 h-4" />
                          Código Copiado!
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4" />
                          Copiar Código
                        </>
                      )}
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-8 border border-green-500/30 shadow-2xl h-full flex items-center justify-center">
                <div className="text-center">
                  <QrCode className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                  <p className="text-gray-500">
                    Preencha os dados e clique em "Gerar QR Code" para visualizar
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Features */}
        <div className="mt-12 max-w-5xl mx-auto">
          <div className="bg-slate-800/30 backdrop-blur rounded-xl p-8 border border-green-500/20">
            <h3 className="text-2xl font-bold text-white mb-6 text-center">
              Por que usar nossa solução PIX?
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <h4 className="font-bold text-white mb-2">Instantâneo</h4>
                <p className="text-gray-400 text-sm">
                  Gere QR Codes em segundos, sem complicação
                </p>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Check className="w-6 h-6 text-white" />
                </div>
                <h4 className="font-bold text-white mb-2">Padrão BACEN</h4>
                <p className="text-gray-400 text-sm">
                  100% compatível com as normas do Banco Central
                </p>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-3">
                  <QrCode className="w-6 h-6 text-white" />
                </div>
                <h4 className="font-bold text-white mb-2">Fácil Integração</h4>
                <p className="text-gray-400 text-sm">
                  API simples para integrar em seu sistema
                </p>
              </div>
            </div>
          </div>

          {/* Enterprise CTA */}
          <div className="mt-8 bg-gradient-to-r from-green-900/50 to-emerald-900/50 backdrop-blur rounded-xl p-8 border border-green-500/30 text-center">
            <h3 className="text-2xl font-bold text-white mb-4">
              Quer integrar pagamentos PIX no seu sistema?
            </h3>
            <p className="text-gray-300 mb-6">
              Nossa equipe pode implementar uma solução completa de pagamentos PIX,
              incluindo geração de QR Code, webhooks e conciliação automática.
            </p>
            <a
              href="#contato"
              className="inline-block px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-lg hover:shadow-lg hover:shadow-green-500/50 transition-all hover:scale-105"
            >
              Fale com nossa equipe
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
