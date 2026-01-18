'use client'

import { useState } from 'react'
import { Bike, MapPin, Loader2, Navigation } from 'lucide-react'

interface Network {
  id: string
  name: string
  location: string
  company: string[]
  stations: number
}

export default function TransportAPI() {
  const [networks, setNetworks] = useState<Network[]>([])
  const [loading, setLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')

  const loadNetworks = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/transport/networks')
      const data = await response.json()

      if (data.success) {
        setNetworks(data.networks)
      } else {
        alert('Erro ao carregar redes: ' + data.error)
      }
    } catch (error) {
      console.error('Erro:', error)
      alert('Erro ao conectar com a API')
    } finally {
      setLoading(false)
    }
  }

  const filteredNetworks = networks.filter(network =>
    network.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    network.location.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
            Transporte Público
          </h1>

          <p className="text-gray-400 max-w-2xl mx-auto mb-6">
            Informações sobre sistemas de bicicletas compartilhadas em cidades ao redor do mundo.
            Integração com CityBikes API.
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          {/* Controls */}
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-8 border border-cyan-500/30 mb-8">
            <div className="flex flex-col md:flex-row gap-4">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Buscar por cidade ou rede..."
                className="flex-1 px-4 py-3 bg-slate-900/50 border border-cyan-500/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20"
                disabled={networks.length === 0}
              />
              <button
                onClick={loadNetworks}
                disabled={loading}
                className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold rounded-lg hover:shadow-lg hover:shadow-cyan-500/50 transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2 whitespace-nowrap"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Carregando...
                  </>
                ) : (
                  <>
                    <Navigation className="w-5 h-5" />
                    {networks.length > 0 ? 'Atualizar' : 'Buscar Redes'}
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Networks List */}
          {!networks.length && !loading && (
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-12 border border-cyan-500/30 text-center">
              <Bike className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <p className="text-gray-500 mb-4">Clique em "Buscar Redes" para carregar os sistemas de bicicletas</p>
            </div>
          )}

          {loading && (
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-12 border border-cyan-500/30 text-center">
              <Loader2 className="w-12 h-12 text-cyan-400 mx-auto mb-4 animate-spin" />
              <p className="text-gray-400">Carregando redes de transporte...</p>
            </div>
          )}

          {networks.length > 0 && (
            <div className="space-y-4">
              <div className="text-gray-400 text-sm mb-4">
                Mostrando {filteredNetworks.length} de {networks.length} redes
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredNetworks.map((network) => (
                  <div
                    key={network.id}
                    className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 border border-cyan-500/20 hover:border-cyan-500/50 transition-all hover:scale-102"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Bike className="w-6 h-6 text-white" />
                      </div>

                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-white mb-2 truncate">
                          {network.name}
                        </h3>

                        <div className="space-y-1">
                          <p className="text-sm text-gray-400 flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                            <span className="truncate">{network.location}</span>
                          </p>

                          {network.company.length > 0 && (
                            <p className="text-sm text-gray-400">
                              <span className="text-gray-500">Operador:</span> {network.company.join(', ')}
                            </p>
                          )}

                          {network.stations > 0 && (
                            <p className="text-sm text-cyan-400 font-semibold">
                              {network.stations} estações
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {filteredNetworks.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  Nenhuma rede encontrada com "{searchTerm}"
                </div>
              )}
            </div>
          )}

          {/* API Info */}
          <div className="mt-8 bg-slate-800/30 backdrop-blur rounded-xl p-6 border border-cyan-500/20">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <Bike className="w-5 h-5 text-cyan-400" />
              Sobre a CityBikes API
            </h3>
            <p className="text-gray-400 mb-4">
              A CityBikes é uma API aberta que fornece dados sobre sistemas de bicicletas compartilhadas
              em mais de 500 cidades ao redor do mundo. Informações incluem:
            </p>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-cyan-400 mt-1">•</span>
                <span>Localização e informações de estações</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-cyan-400 mt-1">•</span>
                <span>Disponibilidade de bicicletas em tempo real</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-cyan-400 mt-1">•</span>
                <span>Dados de diferentes operadores de bike-sharing</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-cyan-400 mt-1">•</span>
                <span>Cobertura global com atualizações constantes</span>
              </li>
            </ul>
          </div>

          {/* Enterprise CTA */}
          <div className="mt-8 bg-gradient-to-r from-cyan-900/50 to-blue-900/50 backdrop-blur rounded-xl p-8 border border-cyan-500/30 text-center">
            <h3 className="text-2xl font-bold text-white mb-4">
              Precisa de integrações de mobilidade urbana?
            </h3>
            <p className="text-gray-300 mb-6">
              Podemos integrar diversas APIs de transporte público, mapas, rotas e mobilidade
              no seu aplicativo ou sistema.
            </p>
            <a
              href="#contato"
              className="inline-block px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold rounded-lg hover:shadow-lg hover:shadow-cyan-500/50 transition-all hover:scale-105"
            >
              Fale com nossa equipe
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
