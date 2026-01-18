import { NextRequest, NextResponse } from 'next/server'

const FOOTBALL_API_KEY = '6d1fcb2930e8463982159268393960cd'
const FOOTBALL_BASE_URL = 'https://api.football-data.org/v4'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const competitionId = searchParams.get('competition')

    let url = `${FOOTBALL_BASE_URL}/matches`
    if (competitionId) {
      url = `${FOOTBALL_BASE_URL}/competitions/${competitionId}/matches`
    }

    const response = await fetch(url, {
      headers: {
        'X-Auth-Token': FOOTBALL_API_KEY,
      },
    })

    const data = await response.json()

    if (!response.ok) {
      console.error('Erro da API Football:', data)
      return NextResponse.json(
        { success: false, error: data.message || 'Erro ao buscar partidas' },
        { status: response.status }
      )
    }

    const matches = data.matches.slice(0, 20).map((match: any) => ({
      homeTeam: match.homeTeam.name,
      awayTeam: match.awayTeam.name,
      score: match.score.fullTime.home !== null
        ? `${match.score.fullTime.home} - ${match.score.fullTime.away}`
        : 'vs',
      status: match.status,
      date: new Date(match.utcDate).toLocaleDateString('pt-BR'),
    }))

    return NextResponse.json({
      success: true,
      matches: matches,
    })

  } catch (error) {
    console.error('Erro no servidor:', error)
    return NextResponse.json(
      { success: false, error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}
