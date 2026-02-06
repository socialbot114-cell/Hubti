import type { Metadata } from 'next'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'HUBTI - Infraestrutura de APIs para Empresas',
  description: 'Plataforma empresarial de APIs, automacao e inteligencia artificial. Integracoes de alta performance para empresas modernas.',
  keywords: ['APIs', 'Automacao', 'IA', 'Integracoes', 'HUBTI', 'PIX', 'Enterprise', 'Platform'],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className="min-h-screen bg-[#06050e] text-zinc-300 font-sans antialiased">
        <Header />
        <main className="min-h-screen pt-14">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
