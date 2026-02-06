import { Github, Mail, Globe } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="relative border-t border-white/[0.06] mt-20">
      <div className="container mx-auto px-4 py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-5xl mx-auto">
          {/* About */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-7 h-7 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-md flex items-center justify-center">
                <span className="text-white font-bold text-sm">H</span>
              </div>
              <h3 className="text-lg font-black bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                HUBTI
              </h3>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed">
              Empresa focada em automacoes, IA e APIs de alta qualidade.
              Eliminamos friccoes na adocao de novas tecnologias.
            </p>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">Servicos</h3>
            <ul className="space-y-2.5 text-sm text-gray-600">
              <li className="hover:text-gray-400 transition-colors">Integracoes de APIs Customizadas</li>
              <li className="hover:text-gray-400 transition-colors">Automacoes Inteligentes</li>
              <li className="hover:text-gray-400 transition-colors">Solucoes em IA (AAA+++)</li>
              <li className="hover:text-gray-400 transition-colors">Geracao de PIX QR Code (AA++)</li>
              <li className="hover:text-gray-400 transition-colors">Consultoria Tecnica</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">Contato</h3>
            <div className="space-y-3">
              <a href="mailto:contato@hubti.com" className="flex items-center gap-2.5 text-gray-600 hover:text-purple-400 transition-colors group">
                <Mail size={16} className="group-hover:scale-110 transition-transform" />
                <span className="text-sm">contato@hubti.com</span>
              </a>
              <a href="#" className="flex items-center gap-2.5 text-gray-600 hover:text-purple-400 transition-colors group">
                <Globe size={16} className="group-hover:scale-110 transition-transform" />
                <span className="text-sm">www.hubti.com</span>
              </a>
              <a href="#" className="flex items-center gap-2.5 text-gray-600 hover:text-purple-400 transition-colors group">
                <Github size={16} className="group-hover:scale-110 transition-transform" />
                <span className="text-sm">github.com/hubti</span>
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/[0.04] mt-10 pt-8 text-center">
          <p className="text-gray-700 text-xs">
            &copy; {new Date().getFullYear()} HUBTI. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}
