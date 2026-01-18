'use client'

import { useState } from 'react'
import { Trophy, Calendar, Users, Target, Loader2 } from 'lucide-react'

interface Match {
  homeTeam: string
  awayTeam: string
  score: string
  status: string
  date: string
}

interface Competition {
  id: number
  name: string
  area: string
}

export default function FootballAPI() {
  const [selectedView, setSelectedView] = useState<'competitions' | 'matches'>('competitions')
  const [competitions, setCompetitions] = useState<Competition[]>([])
  const [matches, setMatches] = useState<Match[]>([])
  const [loading, setLoading] = useState(false)
  const [selectedCompetition, setSelectedCompetition] = useState<number | null>(null)

  const loadCompetitions = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/football/competitions')
      const data = await response.json()

      if (data.success) {
        setCompetitions(data.competitions)
      } else {
        alert('Erro ao carregar competições: ' + data.error)
      }
    } catch (error) {
      console.error('Erro:', error)
      alert('Erro ao conectar com a API')
    } finally {
      setLoading(false)
    }
  }

  const loadMatches = async (competitionId?: number) => {
    setLoading(true)
    try {
      const url = competitionId
        ? `/api/football/matches?competition=${competitionId}`
        : '/api/football/matches'

      const response = await fetch(url)
      const data = await response.json()

      if (data.success) {
        setMatches(data.matches)
      } else {
        alert('Erro ao carregar partidas: ' + data.error)
      }
    } catch (error) {
      console.error('Erro:', error)
      alert('Erro ao conectar com a API')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
            Football API
          </h1>

          <p className="text-gray-400 max-w-2xl mx-auto mb-6">
            Dados em tempo real de competições, times e partidas de futebol do mundo todo.
            Integração com Football-Data.org
          </p>

          <div className="inline-flex rounded-lg bg-slate-800/50 p-1 border border-purple-500/30">
            <button
              onClick={() => setSelectedView('competitions')}
              className={`px-6 py-2 rounded-md transition-all ${
                selectedView === 'competitions'
                  ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <Trophy className="w-4 h-4 inline mr-2" />
              Competições
            </button>
            <button
              onClick={() => setSelectedView('matches')}
              className={`px-6 py-2 rounded-md transition-all ${
                selectedView === 'matches'
                  ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <Target className="w-4 h-4 inline mr-2" />
              Partidas
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-5xl mx-auto">
          {selectedView === 'competitions' ? (
            <div className="space-y-6">
              <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-8 border border-purple-500/30">
                <h2 className="text-2xl font-bold text-white mb-6">Competições Disponíveis</h2>

                {!competitions.length && !loading && (
                  <div className="text-center py-8">
                    <Trophy className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                    <p className="text-gray-500 mb-4">Clique no botão abaixo para carregar as competições</p>
                    <button
                      onClick={loadCompetitions}
                      className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-bold rounded-lg hover:shadow-lg hover:shadow-purple-500/50 transition-all hover:scale-105"
                    >
                      Carregar Competições
                    </button>
                  </div>
                )}

                {loading && (
                  <div className="text-center py-8">
                    <Loader2 className="w-12 h-12 text-purple-400 mx-auto mb-4 animate-spin" />
                    <p className="text-gray-400">Carregando...</p>
                  </div>
                )}

                {competitions.length > 0 && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {competitions.map((comp) => (
                      <div
                        key={comp.id}
                        className="bg-slate-900/50 p-4 rounded-lg border border-purple-500/20 hover:border-purple-500/50 transition-colors cursor-pointer"
                        onClick={() => {
                          setSelectedCompetition(comp.id)
                          setSelectedView('matches')
                          loadMatches(comp.id)
                        }}
                      >
                        <div className="flex items-start gap-3">
                          <Trophy className="w-5 h-5 text-yellow-400 mt-1" />
                          <div>
                            <h3 className="font-bold text-white mb-1">{comp.name}</h3>
                            <p className="text-sm text-gray-400">{comp.area}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-8 border border-purple-500/30">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-white">Partidas</h2>
                  {selectedCompetition && (
                    <button
                      onClick={() => setSelectedCompetition(null)}
                      className="text-sm text-gray-400 hover:text-white"
                    >
                      Ver todas as partidas
                    </button>
                  )}
                </div>

                {!matches.length && !loading && (
                  <div className="text-center py-8">
                    <Target className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                    <p className="text-gray-500 mb-4">Clique no botão abaixo para carregar as partidas</p>
                    <button
                      onClick={() => loadMatches()}
                      className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-bold rounded-lg hover:shadow-lg hover:shadow-purple-500/50 transition-all hover:scale-105"
                    >
                      Carregar Partidas
                    </button>
                  </div>
                )}

                {loading && (
                  <div className="text-center py-8">
                    <Loader2 className="w-12 h-12 text-purple-400 mx-auto mb-4 animate-spin" />
                    <p className="text-gray-400">Carregando...</p>
                  </div>
                )}

                {matches.length > 0 && (
                  <div className="space-y-4">
                    {matches.map((match, index) => (
                      <div
                        key={index}
                        className="bg-slate-900/50 p-4 rounded-lg border border-purple-500/20"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs text-purple-400 font-semibold">{match.status}</span>
                          <span className="text-xs text-gray-500">
                            <Calendar className="w-3 h-3 inline mr-1" />
                            {match.date}
                          </span>
                        </div>
                        <div className="grid grid-cols-3 items-center gap-4">
                          <div className="text-right">
                            <p className="font-bold text-white">{match.homeTeam}</p>
                          </div>
                          <div className="text-center">
                            <p className="text-2xl font-bold text-purple-400">{match.score}</p>
                          </div>
                          <div className="text-left">
                            <p className="font-bold text-white">{match.awayTeam}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* API Info */}
          <div className="mt-8 bg-slate-800/30 backdrop-blur rounded-xl p-6 border border-purple-500/20">
            <h3 className="text-lg font-bold text-white mb-4">Sobre a Football API</h3>
            <p className="text-gray-400 mb-4">
              Integração com Football-Data.org que fornece dados completos sobre:
            </p>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li className="flex items-center gap-2">
                <Trophy className="w-4 h-4 text-yellow-400" />
                Competições de todo o mundo
              </li>
              <li className="flex items-center gap-2">
                <Users className="w-4 h-4 text-blue-400" />
                Informações de times e jogadores
              </li>
              <li className="flex items-center gap-2">
                <Target className="w-4 h-4 text-red-400" />
                Partidas ao vivo e resultados
              </li>
              <li className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-green-400" />
                Calendário e estatísticas
              </li>
            </ul>
          </div>

          {/* Enterprise CTA */}
          <div className="mt-8 bg-gradient-to-r from-indigo-900/50 to-purple-900/50 backdrop-blur rounded-xl p-8 border border-purple-500/30 text-center">
            <h3 className="text-2xl font-bold text-white mb-4">
              Quer integrar dados esportivos no seu app?
            </h3>
            <p className="text-gray-300 mb-6">
              Podemos implementar integrações com diversas APIs esportivas,
              incluindo futebol, basquete, tênis e muito mais.
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
