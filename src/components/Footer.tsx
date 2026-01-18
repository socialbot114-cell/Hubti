import { Github, Mail, Globe } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-slate-900/80 backdrop-blur-lg border-t border-purple-500/20 mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Sobre a HUBTI */}
          <div>
            <h3 className="text-xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent mb-4">
              HUBTI
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Empresa focada em automações, IA e APIs de alta qualidade.
              Oferecemos serviços de integração para eliminar fricções na adoção de novas tecnologias.
            </p>
          </div>

          {/* Serviços */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Nossos Serviços</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>• Integrações de APIs Customizadas</li>
              <li>• Automações Inteligentes</li>
              <li>• Soluções em IA (AAA+++)</li>
              <li>• Geração de PIX QR Code (AA++)</li>
              <li>• Consultoria Técnica</li>
            </ul>
          </div>

          {/* Contato */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Contato</h3>
            <div className="space-y-3">
              <a href="mailto:contato@hubti.com" className="flex items-center gap-2 text-gray-400 hover:text-purple-400 transition-colors">
                <Mail size={18} />
                <span className="text-sm">contato@hubti.com</span>
              </a>
              <a href="#" className="flex items-center gap-2 text-gray-400 hover:text-purple-400 transition-colors">
                <Globe size={18} />
                <span className="text-sm">www.hubti.com</span>
              </a>
              <a href="#" className="flex items-center gap-2 text-gray-400 hover:text-purple-400 transition-colors">
                <Github size={18} />
                <span className="text-sm">github.com/hubti</span>
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-purple-500/20 mt-8 pt-8 text-center">
          <p className="text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} HUBTI. Todos os direitos reservados.
          </p>
          <p className="text-gray-600 text-xs mt-2">
            Simplificando a adoção de tecnologia através de integrações de alta qualidade
          </p>
        </div>
      </div>
    </footer>
  )
}
