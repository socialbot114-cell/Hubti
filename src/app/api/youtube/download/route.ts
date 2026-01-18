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

    // NOTA: Em produção, você precisaria:
    // 1. Usar ytdl-core ou biblioteca similar para processar o vídeo
    // 2. Implementar um sistema de fila para downloads grandes
    // 3. Armazenar temporariamente os vídeos processados
    // 4. Retornar URL para download direto

    // Por enquanto, retornar URL do YouTube como fallback
    // Em produção, isso seria substituído pela implementação real
    return NextResponse.json({
      success: true,
      downloadUrl: `https://www.youtube.com/watch?v=${videoId}`,
      message: 'Para implementação completa, é necessário integrar com ytdl-core ou similar no backend'
    })

  } catch (error) {
    console.error('Erro no servidor:', error)
    return NextResponse.json(
      { success: false, error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}
