import { NextRequest, NextResponse } from 'next/server'
import QRCode from 'qrcode'

// Função para gerar o código PIX no formato EMV
function generatePixCode(data: {
  pixKey: string
  name: string
  city: string
  amount?: number
  description?: string
}) {
  const { pixKey, name, city, amount, description } = data

  // IDs dos campos do padrão EMV
  const ID_PAYLOAD_FORMAT_INDICATOR = '00'
  const ID_MERCHANT_ACCOUNT_INFORMATION = '26'
  const ID_MERCHANT_CATEGORY_CODE = '52'
  const ID_TRANSACTION_CURRENCY = '53'
  const ID_TRANSACTION_AMOUNT = '54'
  const ID_COUNTRY_CODE = '58'
  const ID_MERCHANT_NAME = '59'
  const ID_MERCHANT_CITY = '60'
  const ID_ADDITIONAL_DATA_FIELD = '62'
  const ID_CRC16 = '63'

  // Sub-IDs para Merchant Account Information
  const ID_GUI = '00'
  const ID_PIX_KEY = '01'

  // Sub-IDs para Additional Data Field
  const ID_TXID = '05'

  // Função auxiliar para formatar campos
  const format = (id: string, value: string) => {
    const length = value.length.toString().padStart(2, '0')
    return `${id}${length}${value}`
  }

  // Construir o código PIX
  let pixCode = ''

  // Payload Format Indicator
  pixCode += format(ID_PAYLOAD_FORMAT_INDICATOR, '01')

  // Merchant Account Information
  const gui = format(ID_GUI, 'br.gov.bcb.pix')
  const key = format(ID_PIX_KEY, pixKey)
  const merchantAccount = gui + key
  pixCode += format(ID_MERCHANT_ACCOUNT_INFORMATION, merchantAccount)

  // Merchant Category Code (0000 = não especificado)
  pixCode += format(ID_MERCHANT_CATEGORY_CODE, '0000')

  // Transaction Currency (986 = BRL)
  pixCode += format(ID_TRANSACTION_CURRENCY, '986')

  // Transaction Amount (opcional)
  if (amount && amount > 0) {
    pixCode += format(ID_TRANSACTION_AMOUNT, amount.toFixed(2))
  }

  // Country Code
  pixCode += format(ID_COUNTRY_CODE, 'BR')

  // Merchant Name
  pixCode += format(ID_MERCHANT_NAME, name.substring(0, 25))

  // Merchant City
  pixCode += format(ID_MERCHANT_CITY, city.substring(0, 15))

  // Additional Data Field (opcional)
  if (description) {
    const txid = format(ID_TXID, description.substring(0, 25))
    pixCode += format(ID_ADDITIONAL_DATA_FIELD, txid)
  }

  // CRC16 (placeholder, será calculado)
  pixCode += ID_CRC16 + '04'

  // Calcular CRC16
  const crc = calculateCRC16(pixCode)
  pixCode += crc

  return pixCode
}

// Função para calcular CRC16-CCITT
function calculateCRC16(str: string): string {
  let crc = 0xFFFF

  for (let i = 0; i < str.length; i++) {
    crc ^= str.charCodeAt(i) << 8

    for (let j = 0; j < 8; j++) {
      if ((crc & 0x8000) !== 0) {
        crc = (crc << 1) ^ 0x1021
      } else {
        crc = crc << 1
      }
    }
  }

  crc = crc & 0xFFFF
  return crc.toString(16).toUpperCase().padStart(4, '0')
}

export async function POST(request: NextRequest) {
  try {
    const { pixKey, name, city, amount, description } = await request.json()

    if (!pixKey || !name || !city) {
      return NextResponse.json(
        { success: false, error: 'pixKey, name e city são obrigatórios' },
        { status: 400 }
      )
    }

    // Gerar código PIX
    const pixCopyPaste = generatePixCode({
      pixKey,
      name,
      city,
      amount,
      description,
    })

    // Gerar QR Code
    const qrCodeDataUrl = await QRCode.toDataURL(pixCopyPaste, {
      errorCorrectionLevel: 'M',
      margin: 2,
      width: 400,
      color: {
        dark: '#000000',
        light: '#FFFFFF',
      },
    })

    return NextResponse.json({
      success: true,
      qrCode: qrCodeDataUrl,
      pixCopyPaste: pixCopyPaste,
    })

  } catch (error) {
    console.error('Erro ao gerar PIX:', error)
    return NextResponse.json(
      { success: false, error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}
