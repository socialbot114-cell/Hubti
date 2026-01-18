import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'HUBTI - Portal de APIs e Automações',
  description: 'Portal de APIs da HUBTI - Empresa focada em automações, IA e integrações de alta qualidade. Oferecemos serviços de integração para eliminar fricções na adoção de novas tecnologias.',
  keywords: ['APIs', 'Automação', 'IA', 'Integrações', 'HUBTI', 'PIX', 'Minimax', 'Football API'],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className={`${inter.className} min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900`}>
        <Header />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
