'use client'

import { useEffect, useRef } from 'react'
import { X } from 'lucide-react'
import { LucideIcon } from 'lucide-react'

interface BentoModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  description: string
  icon: LucideIcon
  gradient: string
  badge?: string
  badgeColor?: string
  features?: string[]
  href: string
  children?: React.ReactNode
}

export default function BentoModal({
  isOpen,
  onClose,
  title,
  description,
  icon: Icon,
  gradient,
  badge,
  badgeColor = 'from-blue-500 to-cyan-500',
  features = [],
  href,
  children,
}: BentoModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null)
  const modalRef = useRef<HTMLDivElement>(null)

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
    if (isOpen) {
      window.addEventListener('keydown', handleEsc)
    }
    return () => window.removeEventListener('keydown', handleEsc)
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 animate-modal-overlay"
      onClick={(e) => {
        if (e.target === overlayRef.current) onClose()
      }}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-md" />

      {/* Modal */}
      <div
        ref={modalRef}
        className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto animate-modal-enter rounded-3xl"
      >
        {/* Glow effect */}
        <div className={`absolute -inset-[1px] bg-gradient-to-br ${gradient} rounded-3xl opacity-50 blur-sm`} />

        <div className="relative bg-slate-900/95 backdrop-blur-xl rounded-3xl border border-white/10 overflow-hidden">
          {/* Header gradient bar */}
          <div className={`h-1.5 bg-gradient-to-r ${gradient}`} />

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 z-10 w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-all hover:scale-110"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Content */}
          <div className="p-8 md:p-10">
            {/* Icon + Badge */}
            <div className="flex items-start gap-5 mb-6">
              <div className={`w-16 h-16 bg-gradient-to-br ${gradient} rounded-2xl flex items-center justify-center shadow-lg flex-shrink-0`}>
                <Icon className="w-8 h-8 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-2 flex-wrap">
                  <h2 className="text-2xl md:text-3xl font-bold text-white">{title}</h2>
                  {badge && (
                    <span className={`inline-block bg-gradient-to-r ${badgeColor} text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg`}>
                      {badge}
                    </span>
                  )}
                </div>
                <p className="text-gray-400 text-base leading-relaxed">{description}</p>
              </div>
            </div>

            {/* Features */}
            {features.length > 0 && (
              <div className="mb-8">
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">Recursos</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {features.map((feature, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.06] transition-colors"
                    >
                      <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${gradient} flex-shrink-0`} />
                      <span className="text-gray-300 text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Custom children content */}
            {children}

            {/* CTA */}
            <a
              href={href}
              className={`inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r ${gradient} text-white font-bold rounded-xl hover:shadow-lg hover:shadow-purple-500/30 transition-all hover:scale-[1.03] active:scale-[0.98]`}
            >
              <span>Acessar Servico</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
