'use client'

import { useState } from 'react'
import BentoCard from '@/components/BentoCard'
import BentoModal from '@/components/BentoModal'
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
  Video,
  ArrowRight,
  Globe,
  Code2,
  Cpu,
  BarChart3,
  Layers,
} from 'lucide-react'

type ModalId = 'ai' | 'pix' | 'football' | 'transport' | 'youtube' | null

const services = {
  ai: {
    title: 'IA Studio',
    subtitle: 'Powered by Minimax',
    description: 'Nossa plataforma de IA mais avancada. Gere imagens, videos, audio e texto com tecnologia de ponta. Experimente o futuro da criacao de conteudo com IA.',
    icon: Brain,
    gradient: 'from-violet-600 via-purple-600 to-fuchsia-600',
    badge: 'AAA+++',
    badgeColor: 'from-yellow-500 via-orange-500 to-red-500',
    href: '/ai',
    accentIcon: Sparkles,
    features: [
      'Geracao de imagens HD',
      'Criacao de videos com IA',
      'Sintese de voz e audio',
      'Geracao de textos avancados',
      'Modelos Minimax de ponta',
      'API REST documentada',
    ],
  },
  pix: {
    title: 'PIX QR Code',
    subtitle: 'Pagamentos Instantaneos',
    description: 'Gere QR Codes PIX instantaneamente para pagamentos. Solucao completa e segura para integrar pagamentos PIX em seus sistemas.',
    icon: QrCode,
    gradient: 'from-emerald-500 via-green-500 to-teal-500',
    badge: 'AA++',
    badgeColor: 'from-green-500 to-emerald-500',
    href: '/pix',
    accentIcon: Shield,
    features: [
      'QR Code estatico e dinamico',
      'Copia e cola automatico',
      'Integracao com e-commerce',
      'Validacao de dados PIX',
      'Download em PNG/SVG',
      'API de alta disponibilidade',
    ],
  },
  football: {
    title: 'Football API',
    subtitle: 'Dados em Tempo Real',
    description: 'Dados em tempo real de competicoes, times e partidas de futebol do mundo todo. Cobertura completa das principais ligas.',
    icon: Trophy,
    gradient: 'from-amber-500 via-orange-500 to-yellow-500',
    badge: 'LIVE',
    badgeColor: 'from-red-500 to-rose-500',
    href: '/football',
    accentIcon: BarChart3,
    features: [
      'Competicoes internacionais',
      'Resultados ao vivo',
      'Estatisticas detalhadas',
      'Historico de partidas',
      'Classificacoes atualizadas',
      'Dados de times e jogadores',
    ],
  },
  transport: {
    title: 'Transporte Publico',
    subtitle: 'Bikes Compartilhadas',
    description: 'Informacoes sobre sistemas de bicicletas compartilhadas em cidades globais. Dados atualizados de estacoes e disponibilidade.',
    icon: Bike,
    gradient: 'from-cyan-500 via-blue-500 to-indigo-500',
    href: '/transport',
    accentIcon: Globe,
    features: [
      'Redes de bikes globais',
      'Localizacao de estacoes',
      'Disponibilidade em tempo real',
      'Dados de cidades mundiais',
      'Busca por proximidade',
      'Integracao com mapas',
    ],
  },
  youtube: {
    title: 'YouTube Downloader',
    subtitle: 'Download Rapido',
    description: 'Download de videos do YouTube de forma rapida e eficiente. Suporte a multiplos formatos e resolucoes.',
    icon: Youtube,
    gradient: 'from-red-500 via-rose-500 to-pink-500',
    href: '/youtube',
    accentIcon: Video,
    features: [
      'Download em alta qualidade',
      'Multiplos formatos',
      'Extracao de audio MP3',
      'Informacoes do video',
      'Download rapido',
      'Interface simplificada',
    ],
  },
}

export default function Home() {
  const [activeModal, setActiveModal] = useState<ModalId>(null)

  return (
    <div className="min-h-screen relative noise-bg">
      {/* Background mesh */}
      <div className="fixed inset-0 mesh-gradient pointer-events-none" />

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-8 pb-20 md:pt-16 md:pb-32">
        {/* Floating orbs */}
        <div className="absolute top-20 left-[10%] w-72 h-72 bg-indigo-500/10 rounded-full blur-[100px] animate-float pointer-events-none" />
        <div className="absolute top-40 right-[15%] w-56 h-56 bg-purple-500/10 rounded-full blur-[80px] animate-float-delayed pointer-events-none" />
        <div className="absolute bottom-20 left-[40%] w-64 h-64 bg-fuchsia-500/8 rounded-full blur-[90px] animate-float-slow pointer-events-none" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            {/* Tag */}
            <div className="inline-flex items-center gap-2 mb-8 px-4 py-2 rounded-full bg-white/[0.04] border border-white/[0.08] backdrop-blur-sm">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-sm text-gray-400 font-medium">Portal de APIs Empresarial</span>
            </div>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-6 tracking-tight">
              <span className="bg-gradient-to-b from-white via-white to-gray-500 bg-clip-text text-transparent">
                Bem-vindo a
              </span>
              <br />
              <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-fuchsia-400 bg-clip-text text-transparent">
                HUBTI
              </span>
            </h1>

            <p className="text-lg md:text-xl text-gray-500 mb-4 max-w-2xl mx-auto leading-relaxed">
              Automacoes, IA e APIs de{' '}
              <span className="text-purple-400 font-semibold">Alta Qualidade</span>
            </p>

            <p className="text-base text-gray-600 mb-12 max-w-xl mx-auto">
              Eliminamos friccoes na adocao de novas tecnologias.
              Conectamos sua empresa ao futuro.
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="#servicos"
                className="group inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-bold rounded-xl hover:shadow-xl hover:shadow-purple-500/25 transition-all hover:scale-[1.03] active:scale-[0.98]"
              >
                Explorar Servicos
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </a>
              <a
                href="#sobre"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white/[0.04] text-gray-300 font-semibold rounded-xl border border-white/[0.08] hover:bg-white/[0.08] hover:border-white/[0.16] transition-all hover:scale-[1.03] active:scale-[0.98]"
              >
                Sobre a HUBTI
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Stats - Minimal bento row */}
      <section className="relative z-10 -mt-6 md:-mt-10 mb-16 md:mb-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {[
              { value: '5+', label: 'APIs Integradas', gradient: 'from-indigo-500 to-purple-500' },
              { value: 'AAA+++', label: 'IA de Ponta', gradient: 'from-purple-500 to-fuchsia-500' },
              { value: '100%', label: 'Suporte Dedicado', gradient: 'from-fuchsia-500 to-pink-500' },
            ].map((stat) => (
              <div
                key={stat.label}
                className="relative overflow-hidden rounded-2xl bg-white/[0.02] border border-white/[0.06] p-6 text-center hover:bg-white/[0.04] hover:border-white/[0.1] transition-all duration-300"
              >
                <div className={`text-3xl md:text-4xl font-black bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent mb-1`}>
                  {stat.value}
                </div>
                <div className="text-sm text-gray-500">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bento Grid - Main Services */}
      <section id="servicos" className="relative z-10 py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-5xl font-black mb-4 bg-gradient-to-b from-white to-gray-500 bg-clip-text text-transparent">
              Nossos Servicos
            </h2>
            <p className="text-gray-500 text-base max-w-lg mx-auto">
              Clique em qualquer servico para ver mais detalhes
            </p>
          </div>

          {/* Bento Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5 max-w-6xl mx-auto auto-rows-[minmax(180px,auto)] md:auto-rows-[minmax(200px,auto)]">
            {/* IA Studio - Large card */}
            <BentoCard
              title={services.ai.title}
              description={services.ai.description}
              icon={services.ai.icon}
              gradient={services.ai.gradient}
              badge={services.ai.badge}
              badgeColor={services.ai.badgeColor}
              size="large"
              onClick={() => setActiveModal('ai')}
              stats={{ value: 'AAA+++', label: 'Inteligencia Artificial Avancada' }}
              accentIcon={services.ai.accentIcon}
            />

            {/* PIX - Tall card */}
            <BentoCard
              title={services.pix.title}
              description={services.pix.description}
              icon={services.pix.icon}
              gradient={services.pix.gradient}
              badge={services.pix.badge}
              badgeColor={services.pix.badgeColor}
              size="tall"
              onClick={() => setActiveModal('pix')}
              stats={{ value: 'AA++', label: 'Pagamentos Instantaneos' }}
              accentIcon={services.pix.accentIcon}
            />

            {/* Football - Small */}
            <BentoCard
              title={services.football.title}
              description={services.football.description}
              icon={services.football.icon}
              gradient={services.football.gradient}
              badge={services.football.badge}
              badgeColor={services.football.badgeColor}
              size="small"
              onClick={() => setActiveModal('football')}
              accentIcon={services.football.accentIcon}
            />

            {/* Transport - Small */}
            <BentoCard
              title={services.transport.title}
              description={services.transport.description}
              icon={services.transport.icon}
              gradient={services.transport.gradient}
              size="small"
              onClick={() => setActiveModal('transport')}
              accentIcon={services.transport.accentIcon}
            />

            {/* YouTube - Wide */}
            <BentoCard
              title={services.youtube.title}
              description={services.youtube.description}
              icon={services.youtube.icon}
              gradient={services.youtube.gradient}
              size="wide"
              onClick={() => setActiveModal('youtube')}
              accentIcon={services.youtube.accentIcon}
            />
          </div>
        </div>
      </section>

      {/* Why HUBTI - Bento features */}
      <section id="sobre" className="relative z-10 py-20 md:py-28">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12 md:mb-16">
              <h2 className="text-3xl md:text-5xl font-black mb-4 bg-gradient-to-b from-white to-gray-500 bg-clip-text text-transparent">
                Por que escolher a HUBTI?
              </h2>
              <p className="text-gray-500 text-base max-w-lg mx-auto">
                Tecnologia de ponta com suporte dedicado para sua empresa
              </p>
            </div>

            {/* Mini bento grid for features */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5 mb-16">
              {[
                {
                  icon: Zap,
                  title: 'Rapida Implementacao',
                  description: 'Integracoes prontas para uso. Reduza semanas de desenvolvimento para minutos.',
                  gradient: 'from-indigo-500 to-violet-500',
                },
                {
                  icon: Shield,
                  title: 'Seguranca Garantida',
                  description: 'Todas as APIs sao testadas e seguem os mais altos padroes de seguranca.',
                  gradient: 'from-purple-500 to-fuchsia-500',
                },
                {
                  icon: Rocket,
                  title: 'Suporte Completo',
                  description: 'Nossa equipe esta pronta para ajudar na integracao e customizacao.',
                  gradient: 'from-fuchsia-500 to-pink-500',
                },
              ].map((feature) => (
                <div
                  key={feature.title}
                  className="group relative overflow-hidden rounded-2xl md:rounded-3xl bg-white/[0.02] border border-white/[0.06] p-8 hover:bg-white/[0.04] hover:border-white/[0.12] transition-all duration-500"
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-[0.06] transition-opacity duration-500`} />
                  <div className="relative">
                    <div className={`w-12 h-12 bg-gradient-to-br ${feature.gradient} rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-500 shadow-lg`}>
                      <feature.icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2">{feature.title}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Enterprise CTA */}
            <div className="relative overflow-hidden rounded-3xl bg-white/[0.02] border border-white/[0.06]">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-purple-500/5 to-fuchsia-500/5" />
              <div className="relative p-8 md:p-14">
                <div className="flex flex-col md:flex-row md:items-center gap-8">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center">
                        <Layers className="w-5 h-5 text-white" />
                      </div>
                      <h3 className="text-2xl md:text-3xl font-bold text-white">
                        Integracoes Personalizadas
                      </h3>
                    </div>
                    <p className="text-gray-400 leading-relaxed mb-6 max-w-xl">
                      Na HUBTI, nao apenas fornecemos APIs - oferecemos solucoes completas de integracao.
                      Nossa equipe trabalha diretamente com sua empresa para eliminar barreiras tecnicas.
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                      {[
                        'Integracoes customizadas',
                        'Eliminacao de barreiras tecnicas',
                        'Suporte continuo',
                        'Solucoes em IA e automacao',
                      ].map((item) => (
                        <div key={item} className="flex items-center gap-2.5 text-gray-400 text-sm">
                          <div className="w-1.5 h-1.5 rounded-full bg-purple-500 flex-shrink-0" />
                          {item}
                        </div>
                      ))}
                    </div>
                    <a
                      href="mailto:contato@hubti.com"
                      className="inline-flex items-center gap-2 px-7 py-3.5 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-bold rounded-xl hover:shadow-xl hover:shadow-purple-500/25 transition-all hover:scale-[1.03] active:scale-[0.98]"
                    >
                      Fale com nossa equipe
                      <ArrowRight className="w-4 h-4" />
                    </a>
                  </div>
                  {/* Decorative side */}
                  <div className="hidden md:flex flex-col items-center gap-3 opacity-[0.15]">
                    <Code2 className="w-16 h-16" />
                    <Cpu className="w-12 h-12" />
                    <Globe className="w-10 h-10" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="relative z-10 py-20 md:py-28">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center relative overflow-hidden rounded-3xl bg-white/[0.02] border border-white/[0.06] p-12 md:p-16">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-purple-500/5" />
            <div className="relative">
              <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
                Pronto para transformar seu negocio?
              </h2>
              <p className="text-gray-500 text-base mb-8 max-w-md mx-auto">
                Descubra como nossas APIs e servicos de integracao podem acelerar sua inovacao
              </p>
              <a
                href="/ai"
                className="group inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-bold rounded-xl hover:shadow-xl hover:shadow-purple-500/25 transition-all hover:scale-[1.03] active:scale-[0.98]"
              >
                Comece Agora - Teste nossa IA
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Modals */}
      {(Object.keys(services) as Array<keyof typeof services>).map((key) => {
        const s = services[key]
        return (
          <BentoModal
            key={key}
            isOpen={activeModal === key}
            onClose={() => setActiveModal(null)}
            title={s.title}
            description={s.description}
            icon={s.icon}
            gradient={s.gradient}
            badge={'badge' in s ? s.badge : undefined}
            badgeColor={'badgeColor' in s ? s.badgeColor : undefined}
            features={s.features}
            href={s.href}
          >
            {/* Extra modal content - tech stack info */}
            <div className="mb-8 p-4 rounded-xl bg-white/[0.03] border border-white/[0.06]">
              <div className="flex items-center gap-2 mb-2">
                <Code2 className="w-4 h-4 text-gray-500" />
                <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Integracao</span>
              </div>
              <p className="text-gray-400 text-sm">
                API REST com documentacao completa. Integracao rapida via HTTP com autenticacao por token.
              </p>
            </div>
          </BentoModal>
        )
      })}
    </div>
  )
}
