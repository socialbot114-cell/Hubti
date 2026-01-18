import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { url } = await request.json()

    if (!url) {
      return NextResponse.json(
        { success: false, error: 'URL é obrigatória' },
        { status: 400 }
      )
    }

    // Extrair ID do vídeo
    let videoId = ''
    try {
      const urlObj = new URL(url)
      if (urlObj.hostname.includes('youtube.com')) {
        videoId = urlObj.searchParams.get('v') || ''
      } else if (urlObj.hostname.includes('youtu.be')) {
        videoId = urlObj.pathname.substring(1)
      }
    } catch (e) {
      return NextResponse.json(
        { success: false, error: 'URL inválida' },
        { status: 400 }
      )
    }

    if (!videoId) {
      return NextResponse.json(
        { success: false, error: 'ID do vídeo não encontrado' },
        { status: 400 }
      )
    }

    // Simular resposta de API (em produção, usar ytdl-core ou API do YouTube)
    // Para implementação real, você precisaria de uma biblioteca como ytdl-core no backend
    const mockInfo = {
      title: `Vídeo do YouTube - ${videoId}`,
      thumbnail: `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
      duration: '5:30',
      author: 'Canal do YouTube',
    }

    return NextResponse.json({
      success: true,
      info: mockInfo,
    })

  } catch (error) {
    console.error('Erro no servidor:', error)
    return NextResponse.json(
      { success: false, error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}
