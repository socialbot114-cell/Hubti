'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Menu, X, Sparkles } from 'lucide-react'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/ai', label: 'IA Studio', highlight: true },
    { href: '/pix', label: 'PIX QR Code' },
    { href: '/football', label: 'Football API' },
    { href: '/transport', label: 'Transporte' },
    { href: '/youtube', label: 'YouTube DL' },
  ]

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#080614]/80 backdrop-blur-xl border-b border-white/[0.06]">
      <nav className="container mx-auto px-4 py-3.5">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center transform group-hover:scale-110 transition-transform shadow-lg shadow-purple-500/20">
              <span className="text-white font-bold text-lg">H</span>
            </div>
            <div>
              <h1 className="text-xl font-black bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent leading-tight">
                HUBTI
              </h1>
              <p className="text-[10px] text-gray-600 font-medium tracking-wider uppercase">API Portal</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`relative group ${
                  link.highlight
                    ? 'px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg text-white text-sm font-semibold flex items-center gap-1.5 hover:shadow-lg hover:shadow-purple-500/30 transition-all'
                    : 'px-3.5 py-2 text-gray-500 hover:text-gray-200 text-sm font-medium transition-colors rounded-lg hover:bg-white/[0.04]'
                }`}
              >
                {link.highlight && <Sparkles className="w-3.5 h-3.5" />}
                {link.label}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden w-10 h-10 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/[0.08] transition-all"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-3 pb-3 pt-3 border-t border-white/[0.06] space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`block py-2.5 px-4 rounded-xl text-sm ${
                  link.highlight
                    ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold'
                    : 'text-gray-400 hover:bg-white/[0.04] hover:text-white'
                } transition-all`}
                onClick={() => setIsMenuOpen(false)}
              >
                {link.highlight && (
                  <span className="inline-flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    {link.label}
                  </span>
                )}
                {!link.highlight && link.label}
              </Link>
            ))}
          </div>
        )}
      </nav>
    </header>
  )
}
