'use client'

import { useEffect, useRef } from 'react'
import { X, ArrowRight, Check } from 'lucide-react'
import { LucideIcon } from 'lucide-react'

interface BentoModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  subtitle: string
  description: string
  icon: LucideIcon
  label?: string
  features?: string[]
  href: string
  highlights?: { value: string; label: string }[]
  children?: React.ReactNode
}

export default function BentoModal({
  isOpen,
  onClose,
  title,
  subtitle,
  description,
  icon: Icon,
  label,
  features = [],
  href,
  highlights = [],
  children,
}: BentoModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    if (isOpen) window.addEventListener('keydown', handleEsc)
    return () => window.removeEventListener('keydown', handleEsc)
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6 animate-overlay-in"
      onClick={(e) => {
        if (e.target === overlayRef.current) onClose()
      }}
    >
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

      <div className="relative w-full max-w-[640px] max-h-[88vh] overflow-y-auto animate-modal-slide-up rounded-2xl bg-[#0c0b16] border border-white/[0.08] shadow-2xl shadow-black/50">
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-8 h-8 rounded-lg bg-white/[0.04] border border-white/[0.06] flex items-center justify-center text-zinc-500 hover:text-zinc-300 hover:bg-white/[0.08] transition-all"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="p-8 md:p-10">
          {/* Header */}
          <div className="flex items-start gap-4 mb-8">
            <div className="w-12 h-12 rounded-xl bg-white/[0.04] border border-white/[0.06] flex items-center justify-center flex-shrink-0">
              <Icon className="w-5 h-5 text-zinc-400" />
            </div>
            <div className="flex-1 min-w-0 pt-0.5">
              <div className="flex items-center gap-2.5 mb-1.5">
                <span className="text-[11px] font-medium text-zinc-600 tracking-wide uppercase">{subtitle}</span>
                {label && (
                  <span className="text-[10px] font-semibold tracking-widest uppercase text-accent bg-accent/10 px-2 py-0.5 rounded">
                    {label}
                  </span>
                )}
              </div>
              <h2 className="text-2xl font-semibold text-white tracking-tight">{title}</h2>
            </div>
          </div>

          {/* Description */}
          <p className="text-zinc-400 text-[15px] leading-relaxed mb-8">
            {description}
          </p>

          {/* Highlights/Metrics */}
          {highlights.length > 0 && (
            <div className="grid grid-cols-3 gap-3 mb-8">
              {highlights.map((h, i) => (
                <div key={i} className="rounded-xl bg-white/[0.02] border border-white/[0.06] p-4 text-center">
                  <div className="text-xl font-bold text-white tracking-tight">{h.value}</div>
                  <div className="text-[11px] text-zinc-600 mt-1 uppercase tracking-wide">{h.label}</div>
                </div>
              ))}
            </div>
          )}

          {/* Features */}
          {features.length > 0 && (
            <div className="mb-8">
              <h3 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-4">Recursos inclusos</h3>
              <div className="space-y-2.5">
                {features.map((feature, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 text-sm text-zinc-400"
                  >
                    <div className="w-5 h-5 rounded-md bg-white/[0.03] border border-white/[0.06] flex items-center justify-center flex-shrink-0">
                      <Check className="w-3 h-3 text-zinc-500" />
                    </div>
                    {feature}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Custom content */}
          {children}

          {/* Divider */}
          <div className="h-px bg-white/[0.06] my-8" />

          {/* CTA */}
          <div className="flex items-center justify-between">
            <div className="text-xs text-zinc-600">
              API REST &middot; Documentacao completa
            </div>
            <a
              href={href}
              className="group inline-flex items-center gap-2 px-6 py-2.5 bg-white text-[#06050e] text-sm font-semibold rounded-lg hover:bg-zinc-200 transition-colors"
            >
              Acessar
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
