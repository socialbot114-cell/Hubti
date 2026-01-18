import ApiCard from '@/components/ApiCard'
import {
  Sparkles,
  QrCode,
  Trophy,
  Bike,
  Youtube,
  Zap,
  Shield,
  Rocket,
  Brain,
  Image as ImageIcon,
  Music,
  Video
} from 'lucide-react'

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 animate-gradient"></div>

        <div className="container mx-auto px-4 py-20 relative">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-block mb-4">
              <span className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-sm font-bold px-4 py-2 rounded-full">
                Portal de APIs Empresarial
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
              Bem-vindo à HUBTI
            </h1>

            <p className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed">
              Automações, IA e APIs de <span className="text-purple-400 font-semibold">Alta Qualidade</span>
            </p>

            <p className="text-lg text-gray-400 mb-12 max-w-3xl mx-auto">
              Oferecemos serviços de integração para eliminar todas as fricções na adoção de novas tecnologias.
              Nossa missão é conectar sua empresa ao futuro através de APIs robustas e soluções inteligentes.
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="#apis"
                className="px-8 py-4 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-bold rounded-lg hover:shadow-lg hover:shadow-purple-500/50 transition-all hover:scale-105"
              >
                Explorar APIs
              </a>
              <a
                href="#sobre"
                className="px-8 py-4 bg-slate-800/50 backdrop-blur text-white font-bold rounded-lg border border-purple-500/30 hover:border-purple-500 transition-all hover:scale-105"
              >
                Sobre a HUBTI
              </a>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="container mx-auto px-4 pb-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="bg-slate-800/30 backdrop-blur rounded-xl p-6 border border-purple-500/20 text-center">
              <div className="text-4xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent mb-2">
                5+
              </div>
              <div className="text-gray-400">APIs Integradas</div>
            </div>
            <div className="bg-slate-800/30 backdrop-blur rounded-xl p-6 border border-purple-500/20 text-center">
              <div className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
                AAA+++
              </div>
              <div className="text-gray-400">IA de Ponta</div>
            </div>
            <div className="bg-slate-800/30 backdrop-blur rounded-xl p-6 border border-purple-500/20 text-center">
              <div className="text-4xl font-bold bg-gradient-to-r from-pink-400 to-red-400 bg-clip-text text-transparent mb-2">
                100%
              </div>
              <div className="text-gray-400">Suporte Dedicado</div>
            </div>
          </div>
        </div>
      </section>

      {/* Destaques */}
      <section className="py-12 bg-gradient-to-b from-transparent to-slate-900/50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
            Nossos Destaques
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-12">
            {/* IA Studio - Destaque AAA+++ */}
            <div className="md:col-span-2">
              <ApiCard
                title="IA Studio - Powered by Minimax"
                description="Nossa plataforma de IA mais avançada! Gere imagens, vídeos, áudio e texto com tecnologia de ponta. Experimente o futuro da criação de conteúdo com IA."
                icon={Brain}
                href="/ai"
                badge="AAA+++"
                badgeColor="from-yellow-500 via-orange-500 to-red-500"
                gradient="from-indigo-900 via-purple-900 to-pink-900"
              />
            </div>

            {/* PIX QR Code - Destaque AA++ */}
            <div className="md:col-span-2">
              <ApiCard
                title="Gerador de PIX QR Code"
                description="Gere QR Codes PIX instantaneamente para pagamentos. Solução completa e segura para integrar pagamentos PIX em seus sistemas."
                icon={QrCode}
                href="/pix"
                badge="AA++"
                badgeColor="from-green-500 to-emerald-500"
                gradient="from-slate-800 to-emerald-900"
              />
            </div>
          </div>
        </div>
      </section>

      {/* APIs Section */}
      <section id="apis" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
              Nossas Integrações
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Explore nosso portfólio completo de APIs e serviços de integração
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            <ApiCard
              title="Football API"
              description="Dados em tempo real de competições, times e partidas de futebol do mundo todo."
              icon={Trophy}
              href="/football"
            />

            <ApiCard
              title="Transporte Público"
              description="Informações sobre sistemas de bicicletas compartilhadas em cidades globais."
              icon={Bike}
              href="/transport"
            />

            <ApiCard
              title="YouTube Downloader"
              description="Download de vídeos do YouTube de forma rápida e eficiente."
              icon={Youtube}
              href="/youtube"
            />
          </div>
        </div>
      </section>

      {/* Sobre HUBTI */}
      <section id="sobre" className="py-20 bg-gradient-to-b from-transparent to-slate-900/80">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
              Por que escolher a HUBTI?
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Rápida Implementação</h3>
                <p className="text-gray-400">
                  Integrações prontas para uso. Reduza semanas de desenvolvimento para minutos.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Segurança Garantida</h3>
                <p className="text-gray-400">
                  Todas as APIs são testadas e seguem os mais altos padrões de segurança.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Rocket className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Suporte Completo</h3>
                <p className="text-gray-400">
                  Nossa equipe está pronta para ajudar na integração e customização.
                </p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-8 md:p-12 border border-purple-500/20">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-6">
                Serviços de Integração Personalizados
              </h3>
              <p className="text-gray-300 mb-6 leading-relaxed">
                Na HUBTI, não apenas fornecemos APIs - oferecemos soluções completas de integração.
                Nossa equipe especializada trabalha diretamente com sua empresa para:
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-3 text-gray-300">
                  <span className="text-purple-400 mt-1">✓</span>
                  <span>Implementar integrações customizadas de acordo com suas necessidades</span>
                </li>
                <li className="flex items-start gap-3 text-gray-300">
                  <span className="text-purple-400 mt-1">✓</span>
                  <span>Eliminar barreiras técnicas na adoção de novas tecnologias</span>
                </li>
                <li className="flex items-start gap-3 text-gray-300">
                  <span className="text-purple-400 mt-1">✓</span>
                  <span>Fornecer suporte contínuo e manutenção das integrações</span>
                </li>
                <li className="flex items-start gap-3 text-gray-300">
                  <span className="text-purple-400 mt-1">✓</span>
                  <span>Desenvolver soluções em IA e automação para otimizar seus processos</span>
                </li>
              </ul>
              <a
                href="#contato"
                className="inline-block px-8 py-4 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-bold rounded-lg hover:shadow-lg hover:shadow-purple-500/50 transition-all hover:scale-105"
              >
                Fale com nossa equipe
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center bg-gradient-to-r from-indigo-900/50 to-purple-900/50 backdrop-blur rounded-2xl p-12 border border-purple-500/30">
            <Sparkles className="w-16 h-16 mx-auto mb-6 text-purple-400" />
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Pronto para transformar seu negócio?
            </h2>
            <p className="text-gray-300 text-lg mb-8">
              Descubra como nossas APIs e serviços de integração podem acelerar sua inovação
            </p>
            <a
              href="/ai"
              className="inline-block px-8 py-4 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-bold rounded-lg hover:shadow-lg hover:shadow-purple-500/50 transition-all hover:scale-105"
            >
              Comece Agora - Teste nossa IA
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
