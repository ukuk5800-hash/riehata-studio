import type { Metadata } from 'next'
import { NextIntlClientProvider } from 'next-intl'
import { getLocale, getMessages } from 'next-intl/server'
import './globals.css'

export const metadata: Metadata = {
  title: {
    default: '__スタジオ — 予約・会員管理',
    template: '%s | __スタジオ',
  },
  description: '身体と心を整える、あなただけの時間。体験レッスン ¥3,300から。',
  openGraph: {
    type: 'website',
    locale: 'ja_JP',
    siteName: '__スタジオ',
  },
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const locale = await getLocale()
  const messages = await getMessages()

  return (
    <html lang={locale} suppressHydrationWarning>
      <body>
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
