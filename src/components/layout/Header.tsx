'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X, Globe, ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import { STUDIO_NAME } from '@/lib/constants'

const navLinks = [
  { href: '/lessons', label: 'クラス一覧', labelEn: 'Classes' },
  { href: '/calendar', label: 'カレンダー', labelEn: 'Calendar' },
  { href: '/trial', label: '体験レッスン', labelEn: 'Trial' },
  { href: '/workshops', label: 'ワークショップ', labelEn: 'Workshops' },
  { href: '/plans', label: '会員プラン', labelEn: 'Plans' },
]

interface HeaderProps {
  locale?: string
  isLoggedIn?: boolean
  userName?: string
}

export default function Header({ locale = 'ja', isLoggedIn = false, userName }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [langOpen, setLangOpen] = useState(false)
  const isJa = locale === 'ja'

  function setLocale(l: string) {
    document.cookie = `locale=${l};path=/;max-age=31536000`
    window.location.reload()
  }

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-slate-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 font-bold text-xl text-teal-700 tracking-tight">
            <span className="w-8 h-8 bg-teal-600 rounded-lg flex items-center justify-center text-white text-sm font-bold">A</span>
            {STUDIO_NAME}
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className="px-3 py-2 text-sm text-slate-600 hover:text-teal-700 hover:bg-teal-50 rounded-lg transition-colors"
              >
                {isJa ? link.label : link.labelEn}
              </Link>
            ))}
          </nav>

          {/* Right side */}
          <div className="hidden md:flex items-center gap-2">
            {/* Language switcher */}
            <div className="relative">
              <button
                onClick={() => setLangOpen(!langOpen)}
                className="flex items-center gap-1 px-3 py-2 text-sm text-slate-500 hover:text-slate-700 rounded-lg hover:bg-slate-50"
              >
                <Globe size={15} />
                <span>{isJa ? '日本語' : 'English'}</span>
                <ChevronDown size={13} />
              </button>
              {langOpen && (
                <div className="absolute right-0 top-full mt-1 bg-white border border-slate-200 rounded-xl shadow-lg py-1 min-w-[120px]">
                  <button onClick={() => setLocale('ja')} className={cn('w-full text-left px-4 py-2 text-sm hover:bg-slate-50', locale === 'ja' && 'text-teal-700 font-medium')}>
                    🇯🇵 日本語
                  </button>
                  <button onClick={() => setLocale('en')} className={cn('w-full text-left px-4 py-2 text-sm hover:bg-slate-50', locale === 'en' && 'text-teal-700 font-medium')}>
                    🇺🇸 English
                  </button>
                </div>
              )}
            </div>

            {isLoggedIn ? (
              <div className="flex items-center gap-2">
                <Link href="/mypage" className="flex items-center gap-2 px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 rounded-lg">
                  <span className="w-7 h-7 bg-teal-100 text-teal-700 rounded-full flex items-center justify-center text-xs font-bold">
                    {userName?.[0] ?? 'U'}
                  </span>
                  <span>{userName ?? 'マイページ'}</span>
                </Link>
              </div>
            ) : (
              <>
                <Link href="/auth/login" className="px-4 py-2 text-sm text-slate-600 hover:text-teal-700 rounded-lg hover:bg-slate-50">
                  {isJa ? 'ログイン' : 'Login'}
                </Link>
                <Link href="/trial" className="px-4 py-2 bg-teal-600 text-white text-sm font-medium rounded-lg hover:bg-teal-700">
                  {isJa ? '体験予約' : 'Book Trial'}
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-50"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-slate-100 bg-white px-4 py-3 space-y-1 animate-slide-up">
          {navLinks.map(link => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="block px-3 py-2.5 text-sm text-slate-700 hover:bg-teal-50 hover:text-teal-700 rounded-lg"
            >
              {isJa ? link.label : link.labelEn}
            </Link>
          ))}
          <div className="pt-2 border-t border-slate-100 flex gap-2">
            <button onClick={() => setLocale('ja')} className={cn('flex-1 py-2 text-sm rounded-lg border', locale === 'ja' ? 'border-teal-500 text-teal-700' : 'border-slate-200 text-slate-600')}>
              🇯🇵 日本語
            </button>
            <button onClick={() => setLocale('en')} className={cn('flex-1 py-2 text-sm rounded-lg border', locale === 'en' ? 'border-teal-500 text-teal-700' : 'border-slate-200 text-slate-600')}>
              🇺🇸 English
            </button>
          </div>
          {!isLoggedIn && (
            <Link href="/trial" onClick={() => setMenuOpen(false)} className="block w-full text-center px-4 py-2.5 bg-teal-600 text-white text-sm font-medium rounded-lg hover:bg-teal-700 mt-2">
              {isJa ? '体験レッスンを予約する' : 'Book a Trial Lesson'}
            </Link>
          )}
        </div>
      )}
    </header>
  )
}
