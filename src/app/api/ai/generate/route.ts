import { NextRequest, NextResponse } from 'next/server'

const MINIMAX_API_KEY = 'sk-api-JLi0lsuXeMdydK-sF2HfXLxLp_gixvK4ZJUU81VqRNjlD8ON-XIUjKK__esefyElntMk7x24bBc0Lt209Q79QSadKcpYnOlutHdXPTV-YAp1Liy1140lkJo'
const MINIMAX_BASE_URL = 'https://api.minimax.chat/v1'

export async function POST(request: NextRequest) {
  try {
    const { type, prompt } = await request.json()

    if (!prompt || !type) {
      return NextResponse.json(
        { success: false, error: 'Prompt e tipo são obrigatórios' },
        { status: 400 }
      )
    }

    let endpoint = ''
    let requestBody: any = {}

    switch (type) {
      case 'text':
        endpoint = `${MINIMAX_BASE_URL}/text/chatcompletion_v2`
        requestBody = {
          model: 'abab6.5s-chat',
          messages: [
            {
              role: 'user',
              content: prompt
            }
          ],
          temperature: 0.7,
          top_p: 0.95
        }
        break

      case 'image':
        endpoint = `${MINIMAX_BASE_URL}/text_to_image`
        requestBody = {
          model: 'text-to-image-v2',
          prompt: prompt,
          n: 1,
          size: '1024x1024'
        }
        break

      case 'video':
        endpoint = `${MINIMAX_BASE_URL}/video/generation`
        requestBody = {
          model: 'video-01',
          prompt: prompt
        }
        break

      case 'audio':
        endpoint = `${MINIMAX_BASE_URL}/tts`
        requestBody = {
          model: 'speech-01',
          text: prompt,
          voice: 'male-qn-qingse'
        }
        break

      default:
        return NextResponse.json(
          { success: false, error: 'Tipo inválido' },
          { status: 400 }
        )
    }

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${MINIMAX_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    })

    const data = await response.json()

    if (!response.ok) {
      console.error('Erro da API Minimax:', data)
      return NextResponse.json(
        { success: false, error: data.message || 'Erro ao gerar conteúdo' },
        { status: response.status }
      )
    }

    // Processar resposta baseado no tipo
    let result = ''
    switch (type) {
      case 'text':
        result = data.choices?.[0]?.message?.content || data.reply || 'Texto gerado com sucesso!'
        break
      case 'image':
        result = data.data?.[0]?.url || data.url || '/placeholder-image.jpg'
        break
      case 'video':
        result = data.video_url || '/placeholder-video.mp4'
        break
      case 'audio':
        result = data.audio_url || '/placeholder-audio.mp3'
        break
    }

    return NextResponse.json({
      success: true,
      result: result,
      type: type
    })

  } catch (error) {
    console.error('Erro no servidor:', error)
    return NextResponse.json(
      { success: false, error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}
