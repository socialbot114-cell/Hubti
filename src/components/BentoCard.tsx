'use client'

import { LucideIcon } from 'lucide-react'

type BentoSize = 'small' | 'medium' | 'large' | 'wide' | 'tall'

interface BentoCardProps {
  title: string
  description: string
  icon: LucideIcon
  gradient: string
  badge?: string
  badgeColor?: string
  size?: BentoSize
  onClick?: () => void
  stats?: { label: string; value: string }
  accentIcon?: LucideIcon
}

const sizeClasses: Record<BentoSize, string> = {
  small: 'col-span-1 row-span-1',
  medium: 'col-span-1 row-span-1 md:col-span-1 md:row-span-2',
  large: 'col-span-1 md:col-span-2 row-span-1 md:row-span-2',
  wide: 'col-span-1 md:col-span-2 row-span-1',
  tall: 'col-span-1 row-span-1 md:row-span-2',
}

export default function BentoCard({
  title,
  description,
  icon: Icon,
  gradient,
  badge,
  badgeColor = 'from-blue-500 to-cyan-500',
  size = 'small',
  onClick,
  stats,
  accentIcon: AccentIcon,
}: BentoCardProps) {
  const isLarge = size === 'large' || size === 'tall' || size === 'medium'

  return (
    <button
      onClick={onClick}
      className={`${sizeClasses[size]} group relative text-left overflow-hidden rounded-2xl md:rounded-3xl border border-white/[0.08] bg-white/[0.02] backdrop-blur-sm transition-all duration-500 hover:border-white/[0.16] hover:bg-white/[0.04] hover:shadow-2xl hover:shadow-purple-500/10 hover:-translate-y-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500/50`}
    >
      {/* Background gradient on hover */}
      <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-[0.08] transition-opacity duration-500`} />

      {/* Subtle grid pattern */}
      <div className="absolute inset-0 opacity-[0.03] group-hover:opacity-[0.06] transition-opacity duration-500"
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
          backgroundSize: '24px 24px',
        }}
      />

      {/* Floating accent icon (decorative) */}
      {AccentIcon && (
        <div className="absolute -bottom-4 -right-4 opacity-[0.04] group-hover:opacity-[0.08] transition-all duration-700 group-hover:scale-110">
          <AccentIcon className={`${isLarge ? 'w-32 h-32' : 'w-24 h-24'} text-white`} />
        </div>
      )}

      <div className={`relative h-full flex flex-col ${isLarge ? 'p-7 md:p-9' : 'p-6 md:p-7'}`}>
        {/* Top Row: Icon + Badge */}
        <div className="flex items-start justify-between mb-auto">
          <div className={`${isLarge ? 'w-14 h-14' : 'w-12 h-12'} bg-gradient-to-br ${gradient} rounded-xl md:rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:shadow-xl transition-all duration-500`}>
            <Icon className={`${isLarge ? 'w-7 h-7' : 'w-6 h-6'} text-white`} />
          </div>

          {badge && (
            <span className={`bg-gradient-to-r ${badgeColor} text-white text-[10px] md:text-xs font-bold px-2.5 py-1 rounded-full shadow-lg`}>
              {badge}
            </span>
          )}
        </div>

        {/* Content */}
        <div className="mt-6">
          {stats && (
            <div className="mb-3">
              <span className={`text-3xl md:text-4xl font-black bg-gradient-to-r ${gradient} bg-clip-text text-transparent`}>
                {stats.value}
              </span>
              <span className="block text-xs text-gray-500 mt-1">{stats.label}</span>
            </div>
          )}

          <h3 className={`${isLarge ? 'text-xl md:text-2xl' : 'text-lg'} font-bold text-white mb-2 group-hover:text-purple-100 transition-colors`}>
            {title}
          </h3>

          <p className={`text-gray-500 ${isLarge ? 'text-sm md:text-base' : 'text-sm'} leading-relaxed line-clamp-3`}>
            {description}
          </p>
        </div>

        {/* Bottom indicator */}
        <div className="mt-5 flex items-center gap-2 text-gray-600 group-hover:text-purple-400 transition-colors">
          <span className="text-xs font-medium tracking-wide uppercase">Saiba mais</span>
          <svg className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </button>
  )
}
