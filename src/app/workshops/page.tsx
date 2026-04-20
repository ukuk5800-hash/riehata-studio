import Link from 'next/link'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { getLocale } from 'next-intl/server'
import { Calendar, Clock, Users, MapPin } from 'lucide-react'

const WORKSHOPS = [
  {
    id: 'ws1',
    title: '春の癒しワークショップ〜呼吸と瞑想〜',
    titleEn: 'Spring Healing Workshop – Breath & Meditation',
    date: '2025年5月17日(土)',
    time: '14:00〜17:00',
    duration: 180,
    teacher: '鈴木 ハル',
    location: 'RIEHATA Studio メインホール',
    capacity: 20,
    booked: 15,
    price: 6600,
    category: 'meditation',
    desc: '3時間かけてじっくりと呼吸法と瞑想を体験。日常の疲れをリセットする特別なワークショップです。初めての方でも安心して参加できます。',
    descEn: 'A 3-hour session to experience breathwork and meditation. Reset your daily fatigue in this special workshop. Beginners welcome.',
    image: '🌸',
  },
  {
    id: 'ws2',
    title: 'アーユルヴェーダ入門講座',
    titleEn: 'Introduction to Ayurveda',
    date: '2025年5月24日(土)',
    time: '13:00〜16:00',
    duration: 180,
    teacher: '田中 さくら',
    location: 'RIEHATA Studio サブホール',
    capacity: 15,
    booked: 8,
    price: 8800,
    category: 'workshop',
    desc: 'インドの伝統医学アーユルヴェーダの基礎を学びます。自分の体質（ドーシャ）を知り、食事・生活習慣を見直すきっかけに。',
    descEn: 'Learn the basics of Ayurveda, India\'s traditional medicine. Discover your dosha type and improve your diet and lifestyle.',
    image: '🌿',
  },
  {
    id: 'ws3',
    title: 'ビギナー向けピラティス集中講座',
    titleEn: 'Intensive Pilates for Beginners',
    date: '2025年6月1日(日)',
    time: '10:00〜13:00',
    duration: 180,
    teacher: '山本 リナ',
    location: 'RIEHATA Studio メインホール',
    capacity: 12,
    booked: 6,
    price: 7700,
    category: 'pilates',
    desc: 'ピラティスの基礎から丁寧に学べる集中講座。正しいフォームと呼吸法を習得することで、より効果的なエクササイズができるようになります。',
    descEn: 'An intensive workshop to learn Pilates from the basics. Master correct form and breathing for more effective exercise.',
    image: '💪',
  },
]

const CAT_STYLES: Record<string, { bg: string; text: string; label: string }> = {
  yoga:      { bg: 'bg-teal-100',   text: 'text-teal-700',   label: 'ヨガ' },
  pilates:   { bg: 'bg-purple-100', text: 'text-purple-700', label: 'ピラティス' },
  meditation:{ bg: 'bg-green-100',  text: 'text-green-700',  label: '瞑想' },
  workshop:  { bg: 'bg-amber-100',  text: 'text-amber-700',  label: 'ワークショップ' },
}

export default async function WorkshopsPage() {
  const locale = await getLocale()
  const isJa = locale === 'ja'

  return (
    <>
      <Header locale={locale} />
      <div className="min-h-screen bg-slate-50">
        <div className="bg-gradient-to-br from-amber-50 to-white border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h1 className="text-3xl font-bold text-slate-900 mb-2">
              {isJa ? 'ワークショップ・イベント' : 'Workshops & Events'}
            </h1>
            <p className="text-slate-500">
              {isJa ? '特別テーマの集中講座や単発イベント。少人数制で深く学べます。' : 'Special theme intensives and one-off events. Small groups for deeper learning.'}
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {WORKSHOPS.map(ws => {
              const ratio = ws.booked / ws.capacity
              const full = ratio >= 1
              const cat = CAT_STYLES[ws.category] ?? CAT_STYLES.workshop
              return (
                <div key={ws.id} className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden hover:shadow-md transition-all">
                  {/* Image area */}
                  <div className="bg-gradient-to-br from-slate-100 to-slate-200 h-36 flex items-center justify-center text-6xl">
                    {ws.image}
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${cat.bg} ${cat.text}`}>
                        {cat.label}
                      </span>
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                        full ? 'bg-red-100 text-red-600' :
                        ratio >= 0.8 ? 'bg-amber-100 text-amber-700' :
                        'bg-teal-100 text-teal-700'
                      }`}>
                        {full ? '満席' : ratio >= 0.8 ? `残${ws.capacity - ws.booked}席` : '受付中'}
                      </span>
                    </div>

                    <h2 className="font-bold text-lg text-slate-900 mb-2 leading-snug">
                      {isJa ? ws.title : ws.titleEn}
                    </h2>
                    <p className="text-sm text-slate-600 leading-relaxed mb-4">
                      {isJa ? ws.desc : ws.descEn}
                    </p>

                    <div className="space-y-1.5 mb-4">
                      {[
                        { icon: Calendar, text: ws.date },
                        { icon: Clock, text: `${ws.time}（${ws.duration / 60}時間）` },
                        { icon: Users, text: `${ws.teacher} 講師 ／ ${ws.booked}/${ws.capacity}人` },
                        { icon: MapPin, text: ws.location },
                      ].map(({ icon: Icon, text }, i) => (
                        <div key={i} className="flex items-center gap-2 text-xs text-slate-600">
                          <Icon size={13} className="text-slate-400 shrink-0" />
                          <span>{text}</span>
                        </div>
                      ))}
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                      <div>
                        <p className="text-2xl font-bold text-slate-900">¥{ws.price.toLocaleString()}</p>
                        <p className="text-xs text-slate-400">税込</p>
                      </div>
                      {full ? (
                        <button className="px-5 py-2.5 border border-slate-300 text-slate-500 text-sm rounded-xl hover:bg-slate-50">
                          {isJa ? 'キャンセル待ち' : 'Join Waitlist'}
                        </button>
                      ) : (
                        <Link href="/auth/login" className="px-5 py-2.5 bg-teal-600 text-white text-sm font-medium rounded-xl hover:bg-teal-700">
                          {isJa ? '申し込む' : 'Register'}
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* CTA */}
          <div className="mt-10 bg-teal-50 border border-teal-200 rounded-2xl p-6 text-center">
            <p className="font-semibold text-teal-800 mb-1">
              {isJa ? '定期クラスも受けたい方は' : 'Want to attend regular classes too?'}
            </p>
            <p className="text-sm text-teal-700 mb-3">
              {isJa ? '会員プランでお得に受講できます。' : 'Join a membership plan for better value.'}
            </p>
            <Link href="/plans" className="inline-block px-5 py-2 bg-teal-600 text-white text-sm font-medium rounded-xl hover:bg-teal-700">
              {isJa ? '会員プランを見る' : 'View Plans'}
            </Link>
          </div>
        </div>
      </div>
      <Footer locale={locale} />
    </>
  )
}
