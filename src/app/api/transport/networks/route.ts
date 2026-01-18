import { NextRequest, NextResponse } from 'next/server'

const CITYBIKES_BASE_URL = 'https://api.citybik.es/v2'

export async function GET(request: NextRequest) {
  try {
    const response = await fetch(`${CITYBIKES_BASE_URL}/networks`)

    const data = await response.json()

    if (!response.ok) {
      console.error('Erro da API CityBikes:', data)
      return NextResponse.json(
        { success: false, error: 'Erro ao buscar redes' },
        { status: response.status }
      )
    }

    const networks = data.networks.map((network: any) => ({
      id: network.id,
      name: network.name,
      location: `${network.location.city}, ${network.location.country}`,
      company: network.company || [],
      stations: network.stations?.length || 0,
    }))

    return NextResponse.json({
      success: true,
      networks: networks,
    })

  } catch (error) {
    console.error('Erro no servidor:', error)
    return NextResponse.json(
      { success: false, error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}
