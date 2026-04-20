import Link from 'next/link'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { getLocale } from 'next-intl/server'
import { CalendarDays, Star, Clock, ChevronRight, User, Settings } from 'lucide-react'

const MOCK_USER = {
  name: '田中 花子',
  email: 'hanako@example.com',
  plan: 'ゴールド',
  planColor: '#D4AF37',
  bookingOpenDay: 10,
  startDate: '2025年1月15日',
  upcomingCount: 3,
  attendedCount: 24,
}

const UPCOMING = [
  { id: 'b1', title: 'フローヨガ', date: '5月8日(木)', time: '19:00〜20:00', teacher: '鈴木 ハル', status: 'confirmed' },
  { id: 'b2', title: '朝ヨガ', date: '5月12日(月)', time: '07:00〜08:00', teacher: '田中 さくら', status: 'confirmed' },
  { id: 'b3', title: 'ピラティス基礎', date: '5月13日(火)', time: '19:00〜20:00', teacher: '山本 リナ', status: 'waitlist', waitPos: 2 },
]

export default async function MyPage() {
  const locale = await getLocale()
  const isJa = locale === 'ja'

  return (
    <>
      <Header locale={locale} isLoggedIn userName={MOCK_USER.name} />
      <div className="min-h-screen bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

          {/* Profile card */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 mb-6">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-teal-400 to-teal-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                  {MOCK_USER.name[0]}
                </div>
                <div>
                  <h1 className="text-xl font-bold text-slate-900">{MOCK_USER.name}</h1>
                  <p className="text-slate-500 text-sm">{MOCK_USER.email}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full text-white"
                      style={{ backgroundColor: MOCK_USER.planColor }}>
                      <Star size={10} />{MOCK_USER.plan}会員
                    </span>
                    <span className="text-xs text-slate-400">{MOCK_USER.startDate}〜</span>
                  </div>
                </div>
              </div>
              <Link href="/mypage/settings" className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg">
                <Settings size={18} />
              </Link>
            </div>

            {/* Booking info */}
            <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-xl">
              <p className="text-xs text-amber-700">
                📅 {isJa
                  ? `あなたは${MOCK_USER.bookingOpenDay}日から来月のクラスを予約できます（ゴールド会員特典）`
                  : `You can book next month's classes from the ${MOCK_USER.bookingOpenDay}th (Gold member benefit)`}
              </p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            {[
              { icon: CalendarDays, n: MOCK_USER.upcomingCount, l: isJa ? '予約中' : 'Upcoming', color: 'text-teal-600', bg: 'bg-teal-50' },
              { icon: Clock, n: MOCK_USER.attendedCount, l: isJa ? '受講回数' : 'Attended', color: 'text-indigo-600', bg: 'bg-indigo-50' },
              { icon: Star, n: '¥0', l: isJa ? 'キャッシュバック' : 'Cashback', color: 'text-amber-600', bg: 'bg-amber-50' },
            ].map(s => (
              <div key={s.l} className="bg-white rounded-xl border border-slate-200 p-4 text-center shadow-sm">
                <div className={`w-10 h-10 ${s.bg} rounded-full flex items-center justify-center mx-auto mb-2`}>
                  <s.icon size={18} className={s.color} />
                </div>
                <p className={`text-2xl font-bold ${s.color}`}>{s.n}</p>
                <p className="text-xs text-slate-500 mt-0.5">{s.l}</p>
              </div>
            ))}
          </div>

          {/* Upcoming bookings */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm mb-6">
            <div className="flex items-center justify-between px-5 py-4 border-b border-slate-200">
              <h2 className="font-bold text-slate-900">{isJa ? '次回の予約' : 'Upcoming Bookings'}</h2>
              <Link href="/mypage/bookings" className="text-sm text-teal-600 hover:underline flex items-center gap-1">
                {isJa ? '全て見る' : 'View all'}<ChevronRight size={14} />
              </Link>
            </div>
            <div className="divide-y divide-slate-100">
              {UPCOMING.map(b => (
                <div key={b.id} className="flex items-center justify-between px-5 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-teal-50 rounded-xl flex items-center justify-center">
                      <CalendarDays size={18} className="text-teal-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-slate-800 text-sm">{b.title}</p>
                      <p className="text-xs text-slate-500">{b.date} {b.time}</p>
                      <p className="text-xs text-slate-400">{b.teacher} 講師</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {b.status === 'waitlist' ? (
                      <span className="text-xs bg-amber-100 text-amber-700 px-2 py-1 rounded-full">
                        {isJa ? `待ち${b.waitPos}番` : `Wait #${b.waitPos}`}
                      </span>
                    ) : (
                      <span className="text-xs bg-teal-100 text-teal-700 px-2 py-1 rounded-full">
                        {isJa ? '確定' : 'Confirmed'}
                      </span>
                    )}
                    <button className="text-xs text-slate-400 hover:text-red-500 px-2 py-1 rounded hover:bg-red-50">
                      {isJa ? 'キャンセル' : 'Cancel'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div className="grid grid-cols-2 gap-4">
            {[
              { href: '/lessons', icon: CalendarDays, label: isJa ? 'クラスを予約する' : 'Book a Class', color: 'text-teal-600', bg: 'bg-teal-50' },
              { href: '/mypage/bookings', icon: Clock, label: isJa ? '受講履歴を見る' : 'View History', color: 'text-indigo-600', bg: 'bg-indigo-50' },
              { href: '/trial', icon: Star, label: isJa ? '体験を紹介する' : 'Refer a Friend', color: 'text-amber-600', bg: 'bg-amber-50' },
              { href: '/mypage/profile', icon: User, label: isJa ? 'プロフィール編集' : 'Edit Profile', color: 'text-slate-600', bg: 'bg-slate-100' },
            ].map(l => (
              <Link key={l.href} href={l.href}
                className="bg-white rounded-xl border border-slate-200 p-4 flex items-center gap-3 hover:border-teal-300 hover:bg-teal-50/30 transition-colors shadow-sm">
                <div className={`w-10 h-10 ${l.bg} rounded-lg flex items-center justify-center shrink-0`}>
                  <l.icon size={18} className={l.color} />
                </div>
                <span className="text-sm font-medium text-slate-700">{l.label}</span>
                <ChevronRight size={14} className="text-slate-400 ml-auto" />
              </Link>
            ))}
          </div>
        </div>
      </div>
      <Footer locale={locale} />
    </>
  )
}
