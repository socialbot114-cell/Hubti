'use client'

import { useState } from 'react'
import BentoCard from '@/components/BentoCard'
import BentoModal from '@/components/BentoModal'
import {
  QrCode,
  Trophy,
  Bike,
  Youtube,
  Zap,
  Shield,
  Rocket,
  Brain,
  Video,
  ArrowRight,
  Globe,
  Code2,
  Terminal,
  Lock,
  Gauge,
  Headphones,
} from 'lucide-react'

type ModalId = 'ai' | 'pix' | 'football' | 'transport' | 'youtube' | null

const services = {
  ai: {
    title: 'IA Studio',
    subtitle: 'Inteligencia Artificial',
    description: 'Plataforma completa de inteligencia artificial para geracao de conteudo. Crie imagens em alta definicao, videos, audio sintetizado e textos avancados utilizando os modelos mais recentes da Minimax.',
    icon: Brain,
    label: 'AAA+++',
    href: '/ai',
    features: [
      'Geracao de imagens em alta definicao',
      'Criacao de videos com inteligencia artificial',
      'Sintese de voz e geracao de audio',
      'Geracao avancada de textos',
      'Modelos Minimax de ultima geracao',
      'API REST com documentacao completa',
    ],
    highlights: [
      { value: '4', label: 'Modalidades' },
      { value: '<2s', label: 'Latencia' },
      { value: '99.9%', label: 'Uptime' },
    ],
  },
  pix: {
    title: 'PIX QR Code',
    subtitle: 'Pagamentos',
    description: 'Solucao empresarial para geracao de QR Codes PIX. Integre pagamentos instantaneos ao seu sistema com nossa API segura e de alta disponibilidade.',
    icon: QrCode,
    label: 'AA++',
    href: '/pix',
    features: [
      'QR Code estatico e dinamico',
      'Codigo copia e cola automatico',
      'Integracao com plataformas de e-commerce',
      'Validacao completa de dados PIX',
      'Export em PNG e SVG',
      'Alta disponibilidade garantida',
    ],
    highlights: [
      { value: '100ms', label: 'Geracao' },
      { value: '2', label: 'Formatos' },
      { value: '100%', label: 'Seguro' },
    ],
  },
  football: {
    title: 'Football API',
    subtitle: 'Dados Esportivos',
    description: 'Acesso a dados esportivos em tempo real. Competicoes internacionais, resultados ao vivo, estatisticas detalhadas e historico completo de partidas das principais ligas mundiais.',
    icon: Trophy,
    label: 'LIVE',
    href: '/football',
    features: [
      'Cobertura de competicoes internacionais',
      'Resultados e placar ao vivo',
      'Estatisticas detalhadas de partidas',
      'Historico completo de resultados',
      'Classificacoes atualizadas em tempo real',
      'Dados completos de times e jogadores',
    ],
    highlights: [
      { value: '50+', label: 'Ligas' },
      { value: 'Real-time', label: 'Dados' },
      { value: '10K+', label: 'Times' },
    ],
  },
  transport: {
    title: 'Transporte Urbano',
    subtitle: 'Mobilidade',
    description: 'Dados atualizados de sistemas de bicicletas compartilhadas em cidades ao redor do mundo. Localizacao de estacoes, disponibilidade em tempo real e integracao com servicos de mapeamento.',
    icon: Bike,
    href: '/transport',
    features: [
      'Redes de bikes em cidades globais',
      'Localizacao precisa de estacoes',
      'Disponibilidade atualizada em tempo real',
      'Cobertura de cidades em todos os continentes',
      'Busca por proximidade geografica',
      'Integracao nativa com servicos de mapas',
    ],
    highlights: [
      { value: '400+', label: 'Cidades' },
      { value: 'Global', label: 'Cobertura' },
      { value: '5min', label: 'Atualizacao' },
    ],
  },
  youtube: {
    title: 'YouTube Tools',
    subtitle: 'Midia Digital',
    description: 'Ferramentas profissionais para download e extracao de conteudo do YouTube. Suporte a multiplos formatos, resolucoes e extracao de audio em alta qualidade.',
    icon: Youtube,
    href: '/youtube',
    features: [
      'Download em multiplas resolucoes',
      'Suporte a diversos formatos de video',
      'Extracao de audio em MP3',
      'Metadados completos do video',
      'Processamento de alta velocidade',
      'Interface profissional simplificada',
    ],
    highlights: [
      { value: '4K', label: 'Resolucao' },
      { value: '6+', label: 'Formatos' },
      { value: 'Fast', label: 'Download' },
    ],
  },
}

export default function Home() {
  const [activeModal, setActiveModal] = useState<ModalId>(null)

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative pt-20 pb-24 md:pt-32 md:pb-36">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="max-w-3xl">
            {/* Eyebrow */}
            <div className="flex items-center gap-3 mb-8">
              <div className="h-px w-8 bg-gradient-to-r from-accent/60 to-transparent" />
              <span className="text-xs font-semibold tracking-[0.2em] uppercase text-zinc-500">
                Plataforma de APIs Empresarial
              </span>
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.08] mb-6">
              Infraestrutura de APIs para empresas modernas
            </h1>

            <p className="text-lg md:text-xl text-zinc-500 leading-relaxed mb-10 max-w-2xl">
              Automacao, inteligencia artificial e integracoes de alta performance.
              Eliminamos a complexidade tecnica para que sua equipe foque no que importa.
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href="#servicos"
                className="group inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-[#06050e] text-sm font-semibold rounded-lg hover:bg-zinc-200 transition-colors"
              >
                Explorar servicos
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </a>
              <a
                href="mailto:contato@hubti.com"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 text-zinc-400 text-sm font-medium rounded-lg border border-white/[0.08] hover:border-white/[0.14] hover:text-zinc-300 transition-all"
              >
                Falar com especialista
              </a>
            </div>
          </div>
        </div>

        {/* Subtle line separator */}
        <div className="absolute bottom-0 left-0 right-0 h-px line-glow" />
      </section>

      {/* Numbers */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            {[
              { value: '5+', label: 'APIs disponiveis' },
              { value: '99.9%', label: 'Disponibilidade' },
              { value: '<100ms', label: 'Tempo de resposta' },
              { value: '24/7', label: 'Suporte tecnico' },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-zinc-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bento Grid */}
      <section id="servicos" className="py-16 md:py-24">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-3">
              Servicos
            </h2>
            <p className="text-zinc-500 text-base max-w-lg">
              Selecione um servico para explorar recursos, metricas e documentacao.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[minmax(220px,auto)]">
            {/* IA Studio - Featured */}
            <BentoCard
              title={services.ai.title}
              subtitle={services.ai.subtitle}
              description={services.ai.description}
              icon={services.ai.icon}
              label={services.ai.label}
              size="featured"
              onClick={() => setActiveModal('ai')}
              metric={{ value: 'AAA+++', label: 'Classificacao de performance' }}
            />

            {/* PIX */}
            <BentoCard
              title={services.pix.title}
              subtitle={services.pix.subtitle}
              description={services.pix.description}
              icon={services.pix.icon}
              label={services.pix.label}
              size="standard"
              onClick={() => setActiveModal('pix')}
            />

            {/* Football */}
            <BentoCard
              title={services.football.title}
              subtitle={services.football.subtitle}
              description={services.football.description}
              icon={services.football.icon}
              label={services.football.label}
              size="standard"
              onClick={() => setActiveModal('football')}
            />

            {/* Transport */}
            <BentoCard
              title={services.transport.title}
              subtitle={services.transport.subtitle}
              description={services.transport.description}
              icon={services.transport.icon}
              size="standard"
              onClick={() => setActiveModal('transport')}
            />

            {/* YouTube - Wide */}
            <BentoCard
              title={services.youtube.title}
              subtitle={services.youtube.subtitle}
              description={services.youtube.description}
              icon={services.youtube.icon}
              size="wide"
              onClick={() => setActiveModal('youtube')}
            />
          </div>
        </div>
      </section>

      {/* Why HUBTI */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-3">
              Vantagens
            </h2>
            <p className="text-zinc-500 text-base max-w-lg">
              Construido para equipes que exigem confiabilidade e performance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                icon: Gauge,
                title: 'Alta Performance',
                description: 'APIs otimizadas com latencia minima. Integracoes que reduzem semanas de desenvolvimento para horas.',
              },
              {
                icon: Lock,
                title: 'Seguranca Enterprise',
                description: 'Autenticacao robusta, criptografia em transito e em repouso. Conformidade com padroes de seguranca.',
              },
              {
                icon: Headphones,
                title: 'Suporte Dedicado',
                description: 'Equipe tecnica especializada disponivel para auxiliar na integracao, customizacao e resolucao de problemas.',
              },
            ].map((feature) => (
              <div
                key={feature.title}
                className="rounded-2xl bg-[#0c0b16] border border-white/[0.06] p-8 hover:border-white/[0.10] transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/[0.06] flex items-center justify-center mb-6">
                  <feature.icon className="w-[18px] h-[18px] text-zinc-400" />
                </div>
                <h3 className="text-base font-semibold text-zinc-100 mb-2 tracking-tight">{feature.title}</h3>
                <p className="text-sm text-zinc-500 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enterprise CTA */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="rounded-2xl bg-[#0c0b16] border border-white/[0.06] p-8 md:p-12 lg:p-16">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr,auto] gap-12 items-center">
              <div>
                <span className="text-xs font-semibold tracking-[0.2em] uppercase text-zinc-500 mb-4 block">
                  Solucoes Corporativas
                </span>
                <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight mb-4">
                  Integracoes sob medida para sua operacao
                </h2>
                <p className="text-zinc-500 text-[15px] leading-relaxed mb-8 max-w-xl">
                  Alem das APIs padrao, desenvolvemos solucoes personalizadas que se conectam
                  diretamente aos processos da sua empresa. Da arquitetura ao deploy, cuidamos de tudo.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-8 mb-8">
                  {[
                    'Arquitetura de integracoes sob demanda',
                    'Eliminacao de barreiras tecnicas',
                    'Suporte continuo e monitoramento',
                    'Solucoes em IA e automacao',
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-2.5 text-sm text-zinc-400">
                      <div className="w-1 h-1 rounded-full bg-zinc-600 flex-shrink-0" />
                      {item}
                    </div>
                  ))}
                </div>
                <a
                  href="mailto:contato@hubti.com"
                  className="group inline-flex items-center gap-2 px-6 py-3 bg-white text-[#06050e] text-sm font-semibold rounded-lg hover:bg-zinc-200 transition-colors"
                >
                  Solicitar proposta
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </a>
              </div>

              {/* Code preview decoration */}
              <div className="hidden lg:block w-64">
                <div className="rounded-xl bg-white/[0.02] border border-white/[0.06] p-5 font-mono text-xs text-zinc-600 leading-6">
                  <div className="flex items-center gap-2 mb-4 text-zinc-500">
                    <Terminal className="w-3.5 h-3.5" />
                    <span className="text-[11px] tracking-wider uppercase">Integracao</span>
                  </div>
                  <div><span className="text-zinc-500">const</span> <span className="text-zinc-400">hubti</span> <span className="text-zinc-600">=</span></div>
                  <div className="pl-2"><span className="text-zinc-500">new</span> <span className="text-zinc-400">HubtiClient</span><span className="text-zinc-600">(&#123;</span></div>
                  <div className="pl-4"><span className="text-zinc-500">apiKey</span><span className="text-zinc-600">:</span> <span className="text-zinc-500">env.KEY</span></div>
                  <div className="pl-2"><span className="text-zinc-600">&#125;)</span></div>
                  <div className="mt-2"><span className="text-zinc-500">await</span> <span className="text-zinc-400">hubti</span><span className="text-zinc-600">.</span><span className="text-zinc-400">ai</span></div>
                  <div className="pl-2"><span className="text-zinc-600">.</span><span className="text-zinc-400">generate</span><span className="text-zinc-600">(&#123; ... &#125;)</span></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 max-w-5xl text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight mb-3">
            Comece a integrar agora
          </h2>
          <p className="text-zinc-500 text-base mb-8 max-w-md mx-auto">
            Teste nossas APIs gratuitamente. Sem compromisso, sem cartao de credito.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-3">
            <a
              href="/ai"
              className="group inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-[#06050e] text-sm font-semibold rounded-lg hover:bg-zinc-200 transition-colors"
            >
              Testar IA Studio
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </a>
            <a
              href="#servicos"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 text-zinc-400 text-sm font-medium rounded-lg border border-white/[0.08] hover:border-white/[0.14] hover:text-zinc-300 transition-all"
            >
              Ver todos os servicos
            </a>
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
            subtitle={s.subtitle}
            description={s.description}
            icon={s.icon}
            label={'label' in s ? s.label : undefined}
            features={s.features}
            highlights={s.highlights}
            href={s.href}
          />
        )
      })}
    </div>
  )
}
