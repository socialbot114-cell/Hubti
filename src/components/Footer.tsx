import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="border-t border-white/[0.04] mt-8">
      <div className="container mx-auto px-4 max-w-5xl py-12 md:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 mb-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="text-base font-bold text-white tracking-tight mb-3">HUBTI</div>
            <p className="text-sm text-zinc-600 leading-relaxed max-w-[200px]">
              Infraestrutura de APIs para empresas modernas.
            </p>
          </div>

          {/* Servicos */}
          <div>
            <h3 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-4">Servicos</h3>
            <ul className="space-y-2.5">
              {[
                { label: 'IA Studio', href: '/ai' },
                { label: 'PIX QR Code', href: '/pix' },
                { label: 'Football API', href: '/football' },
                { label: 'Transporte', href: '/transport' },
                { label: 'YouTube Tools', href: '/youtube' },
              ].map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-sm text-zinc-600 hover:text-zinc-300 transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Empresa */}
          <div>
            <h3 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-4">Empresa</h3>
            <ul className="space-y-2.5">
              <li><span className="text-sm text-zinc-600">Integracoes customizadas</span></li>
              <li><span className="text-sm text-zinc-600">Automacoes inteligentes</span></li>
              <li><span className="text-sm text-zinc-600">Consultoria tecnica</span></li>
            </ul>
          </div>

          {/* Contato */}
          <div>
            <h3 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-4">Contato</h3>
            <ul className="space-y-2.5">
              <li>
                <a href="mailto:contato@hubti.com" className="text-sm text-zinc-600 hover:text-zinc-300 transition-colors">
                  contato@hubti.com
                </a>
              </li>
              <li><span className="text-sm text-zinc-600">www.hubti.com</span></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/[0.04] pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-zinc-700">
            &copy; {new Date().getFullYear()} HUBTI. Todos os direitos reservados.
          </p>
          <p className="text-xs text-zinc-800">
            Sao Paulo, Brasil
          </p>
        </div>
      </div>
    </footer>
  )
}
