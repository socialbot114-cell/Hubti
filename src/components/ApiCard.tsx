import Link from 'next/link'
import { LucideIcon } from 'lucide-react'

interface ApiCardProps {
  title: string
  description: string
  icon: LucideIcon
  href: string
  badge?: string
  badgeColor?: string
  gradient?: string
}

export default function ApiCard({
  title,
  description,
  icon: Icon,
  href,
  badge,
  badgeColor = 'from-blue-500 to-cyan-500',
  gradient = 'from-slate-800 to-slate-900'
}: ApiCardProps) {
  return (
    <Link href={href}>
      <div className={`group relative bg-gradient-to-br ${gradient} rounded-xl p-6 border border-purple-500/20 hover:border-purple-500/50 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20 h-full`}>
        {badge && (
          <div className="absolute -top-3 -right-3">
            <span className={`inline-block bg-gradient-to-r ${badgeColor} text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg animate-pulse`}>
              {badge}
            </span>
          </div>
        )}

        <div className="flex items-start gap-4">
          <div className="flex-shrink-0">
            <div className="w-14 h-14 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
              <Icon className="w-7 h-7 text-white" />
            </div>
          </div>

          <div className="flex-1">
            <h3 className="text-xl font-bold text-white mb-2 group-hover:text-purple-300 transition-colors">
              {title}
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              {description}
            </p>
          </div>
        </div>

        <div className="mt-4 flex items-center text-purple-400 text-sm font-semibold group-hover:text-purple-300">
          <span>Acessar</span>
          <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </Link>
  )
}
