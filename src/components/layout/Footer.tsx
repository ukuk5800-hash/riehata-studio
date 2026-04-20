import Link from 'next/link'
import { STUDIO_NAME } from '@/lib/constants'

export default function Footer({ locale = 'ja' }: { locale?: string }) {
  const isJa = locale === 'ja'
  return (
    <footer className="bg-slate-900 text-slate-400 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 text-white font-bold text-lg mb-3">
              <span className="w-8 h-8 bg-teal-600 rounded-lg flex items-center justify-center text-sm font-bold">A</span>
              {STUDIO_NAME}
            </div>
            <p className="text-sm leading-relaxed">
              {isJa ? '身体と心を整える場所。経験豊富な講師たちと、あなただけの時間を。' : 'A place to balance body & mind. With our experienced instructors, find your own time.'}
            </p>
          </div>
          <div>
            <p className="text-white font-medium text-sm mb-3">{isJa ? 'メニュー' : 'Menu'}</p>
            <ul className="space-y-2 text-sm">
              {[
                { href: '/lessons', ja: 'クラス一覧', en: 'Classes' },
                { href: '/calendar', ja: 'カレンダー', en: 'Calendar' },
                { href: '/trial', ja: '体験レッスン', en: 'Trial Lesson' },
                { href: '/plans', ja: '会員プラン', en: 'Membership' },
              ].map(l => (
                <li key={l.href}>
                  <Link href={l.href} className="hover:text-white transition-colors">{isJa ? l.ja : l.en}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-white font-medium text-sm mb-3">{isJa ? 'サポート' : 'Support'}</p>
            <ul className="space-y-2 text-sm">
              {[
                { href: '/contact', ja: 'お問い合わせ', en: 'Contact' },
                { href: '/faq', ja: 'よくある質問', en: 'FAQ' },
                { href: '/privacy', ja: 'プライバシーポリシー', en: 'Privacy Policy' },
                { href: '/terms', ja: '利用規約', en: 'Terms of Service' },
              ].map(l => (
                <li key={l.href}>
                  <Link href={l.href} className="hover:text-white transition-colors">{isJa ? l.ja : l.en}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="border-t border-slate-800 pt-6 text-xs text-slate-500">
          © 2025 {STUDIO_NAME}. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
