import type { Metadata } from 'next'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'HUBTI - Portal de APIs e Automacoes',
  description: 'Portal de APIs da HUBTI - Empresa focada em automacoes, IA e integracoes de alta qualidade. Oferecemos servicos de integracao para eliminar friccoes na adocao de novas tecnologias.',
  keywords: ['APIs', 'Automacao', 'IA', 'Integracoes', 'HUBTI', 'PIX', 'Minimax', 'Football API'],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className="min-h-screen bg-[#080614] text-white font-sans">
        <Header />
        <main className="min-h-screen pt-16">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
