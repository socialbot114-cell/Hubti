'use client'

import { LucideIcon, ArrowUpRight } from 'lucide-react'

type BentoSize = 'standard' | 'featured' | 'wide'

interface BentoCardProps {
  title: string
  subtitle: string
  description: string
  icon: LucideIcon
  label?: string
  size?: BentoSize
  onClick?: () => void
  metric?: { value: string; label: string }
}

const sizeClasses: Record<BentoSize, string> = {
  standard: 'col-span-1 row-span-1',
  featured: 'col-span-1 md:col-span-2 row-span-1 md:row-span-2',
  wide: 'col-span-1 md:col-span-2 row-span-1',
}

export default function BentoCard({
  title,
  subtitle,
  description,
  icon: Icon,
  label,
  size = 'standard',
  onClick,
  metric,
}: BentoCardProps) {
  const isFeatured = size === 'featured'

  return (
    <button
      onClick={onClick}
      className={`${sizeClasses[size]} group relative text-left overflow-hidden rounded-2xl border border-white/[0.06] bg-[#0c0b16] transition-all duration-300 hover:border-white/[0.12] hover:bg-[#100f1a] focus:outline-none focus-visible:ring-1 focus-visible:ring-accent/40`}
    >
      <div className={`relative h-full flex flex-col ${isFeatured ? 'p-8 md:p-10' : 'p-6 md:p-8'}`}>
        {/* Top: Icon + Label + Arrow */}
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className={`${isFeatured ? 'w-11 h-11' : 'w-10 h-10'} rounded-xl bg-white/[0.04] border border-white/[0.06] flex items-center justify-center group-hover:bg-white/[0.07] group-hover:border-white/[0.10] transition-all duration-300`}>
              <Icon className={`${isFeatured ? 'w-5 h-5' : 'w-[18px] h-[18px]'} text-zinc-400 group-hover:text-zinc-200 transition-colors`} />
            </div>
            {label && (
              <span className="text-[11px] font-semibold tracking-widest uppercase text-zinc-600 bg-white/[0.03] border border-white/[0.06] px-2.5 py-1 rounded-md">
                {label}
              </span>
            )}
          </div>
          <div className="w-8 h-8 rounded-lg flex items-center justify-center text-zinc-700 group-hover:text-zinc-400 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
            <ArrowUpRight className="w-4 h-4" />
          </div>
        </div>

        {/* Metric (for featured) */}
        {metric && isFeatured && (
          <div className="mb-5">
            <span className="text-4xl md:text-5xl font-bold tracking-tight text-white">
              {metric.value}
            </span>
            <span className="block text-xs text-zinc-600 mt-1.5 tracking-wide uppercase">{metric.label}</span>
          </div>
        )}

        {/* Content */}
        <div className="mt-auto">
          <div className="mb-1.5">
            <span className="text-[11px] font-medium text-zinc-600 tracking-wide uppercase">{subtitle}</span>
          </div>
          <h3 className={`${isFeatured ? 'text-xl md:text-2xl' : 'text-lg'} font-semibold text-zinc-100 mb-2.5 tracking-tight`}>
            {title}
          </h3>
          <p className={`text-zinc-500 ${isFeatured ? 'text-[15px]' : 'text-sm'} leading-relaxed ${isFeatured ? 'line-clamp-4' : 'line-clamp-2'}`}>
            {description}
          </p>
        </div>

        {/* Bottom bar on hover */}
        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-accent/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>
    </button>
  )
}
