import { NextRequest, NextResponse } from 'next/server'

const FOOTBALL_API_KEY = '6d1fcb2930e8463982159268393960cd'
const FOOTBALL_BASE_URL = 'https://api.football-data.org/v4'

export async function GET(request: NextRequest) {
  try {
    const response = await fetch(`${FOOTBALL_BASE_URL}/competitions`, {
      headers: {
        'X-Auth-Token': FOOTBALL_API_KEY,
      },
    })

    const data = await response.json()

    if (!response.ok) {
      console.error('Erro da API Football:', data)
      return NextResponse.json(
        { success: false, error: data.message || 'Erro ao buscar competições' },
        { status: response.status }
      )
    }

    const competitions = data.competitions.map((comp: any) => ({
      id: comp.id,
      name: comp.name,
      area: comp.area.name,
      emblem: comp.emblem,
    }))

    return NextResponse.json({
      success: true,
      competitions: competitions,
    })

  } catch (error) {
    console.error('Erro no servidor:', error)
    return NextResponse.json(
      { success: false, error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}
