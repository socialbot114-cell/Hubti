'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/ai', label: 'IA Studio' },
    { href: '/pix', label: 'PIX' },
    { href: '/football', label: 'Football' },
    { href: '/transport', label: 'Transporte' },
    { href: '/youtube', label: 'YouTube' },
  ]

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#06050e]/90 backdrop-blur-xl border-b border-white/[0.04]">
      <nav className="container mx-auto px-4 max-w-5xl">
        <div className="flex items-center justify-between h-14">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <span className="text-base font-bold text-white tracking-tight">HUBTI</span>
            <span className="text-[10px] text-zinc-600 font-medium tracking-wider uppercase hidden sm:inline">API Platform</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-3 py-1.5 text-[13px] text-zinc-500 hover:text-zinc-200 font-medium transition-colors rounded-md hover:bg-white/[0.03]"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden md:block">
            <a
              href="mailto:contato@hubti.com"
              className="text-[13px] text-zinc-400 font-medium hover:text-zinc-200 transition-colors"
            >
              Contato
            </a>
          </div>

          {/* Mobile */}
          <button
            className="md:hidden w-8 h-8 flex items-center justify-center text-zinc-500 hover:text-zinc-300 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>

        {/* Mobile Nav */}
        {isMenuOpen && (
          <div className="md:hidden pb-4 pt-2 border-t border-white/[0.04]">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block py-2.5 px-3 text-sm text-zinc-400 hover:text-white hover:bg-white/[0.03] rounded-lg transition-all"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </nav>
    </header>
  )
}
