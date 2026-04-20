'use client'

import { useState } from 'react'
import Link from 'next/link'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { CalendarDays, ChevronLeft, X } from 'lucide-react'

const UPCOMING = [
  { id: 'b1', title: 'フローヨガ', date: '2025/05/08', time: '19:00〜20:00', teacher: '鈴木 ハル', status: 'confirmed', type: 'yoga' },
  { id: 'b2', title: '朝ヨガ', date: '2025/05/12', time: '07:00〜08:00', teacher: '田中 さくら', status: 'confirmed', type: 'yoga' },
  { id: 'b3', title: 'ピラティス基礎', date: '2025/05/13', time: '19:00〜20:00', teacher: '山本 リナ', status: 'waitlist', waitPos: 2, type: 'pilates' },
]

const HISTORY = [
  { id: 'h1', title: '骨盤ヨガ', date: '2025/04/28', time: '10:00〜11:15', teacher: '田中 さくら', status: 'attended', type: 'yoga' },
  { id: 'h2', title: 'ピラティス基礎', date: '2025/04/22', time: '19:00〜20:00', teacher: '山本 リナ', status: 'attended', type: 'pilates' },
  { id: 'h3', title: '朝ヨガ', date: '2025/04/21', time: '07:00〜08:00', teacher: '田中 さくら', status: 'cancelled', type: 'yoga' },
  { id: 'h4', title: 'フローヨガ', date: '2025/04/17', time: '19:00〜20:00', teacher: '鈴木 ハル', status: 'attended', type: 'yoga' },
]

const TYPE_COLORS: Record<string, string> = {
  yoga: 'bg-teal-100 text-teal-700',
  pilates: 'bg-purple-100 text-purple-700',
  meditation: 'bg-green-100 text-green-700',
  workshop: 'bg-amber-100 text-amber-700',
}

const STATUS_BADGES: Record<string, { label: string; cls: string }> = {
  confirmed: { label: '予約確定', cls: 'bg-teal-100 text-teal-700' },
  waitlist:  { label: 'キャンセル待ち', cls: 'bg-amber-100 text-amber-700' },
  attended:  { label: '受講済', cls: 'bg-slate-100 text-slate-600' },
  cancelled: { label: 'キャンセル済', cls: 'bg-red-100 text-red-500' },
}

export default function BookingsPage() {
  const [tab, setTab] = useState<'upcoming' | 'history'>('upcoming')
  const [cancelId, setCancelId] = useState<string | null>(null)
  const [bookings, setBookings] = useState(UPCOMING)

  function doCancel() {
    setBookings(b => b.filter(x => x.id !== cancelId))
    setCancelId(null)
  }

  const list = tab === 'upcoming' ? bookings : HISTORY

  return (
    <>
      <Header isLoggedIn userName="田中 花子" />
      <div className="min-h-screen bg-slate-50">
        <div className="bg-white border-b border-slate-200">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <Link href="/mypage" className="flex items-center gap-1 text-sm text-slate-500 hover:text-slate-700 mb-4">
              <ChevronLeft size={15} />マイページへ戻る
            </Link>
            <h1 className="text-2xl font-bold text-slate-900">予約一覧</h1>
          </div>
        </div>

        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {/* Tabs */}
          <div className="flex gap-1 bg-slate-100 rounded-xl p-1 mb-6 w-fit">
            {([['upcoming', '予約中'], ['history', '受講履歴']] as const).map(([k, l]) => (
              <button key={k} onClick={() => setTab(k)}
                className={`px-5 py-2 rounded-lg text-sm font-medium transition-colors ${tab === k ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}>
                {l}
              </button>
            ))}
          </div>

          <div className="space-y-3">
            {list.map(b => {
              const badge = STATUS_BADGES[b.status] ?? { label: b.status, cls: 'bg-slate-100 text-slate-600' }
              return (
                <div key={b.id} className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 flex items-center gap-4">
                  <div className="w-12 h-12 bg-teal-50 rounded-xl flex items-center justify-center shrink-0">
                    <CalendarDays size={20} className="text-teal-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-0.5">
                      <p className="font-semibold text-slate-800">{b.title}</p>
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${TYPE_COLORS[b.type] ?? 'bg-slate-100 text-slate-600'}`}>{b.type}</span>
                    </div>
                    <p className="text-sm text-slate-600">{b.date} {b.time}</p>
                    <p className="text-xs text-slate-400">{b.teacher} 講師</p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${badge.cls}`}>
                      {badge.label}
                      {'waitPos' in b && ` (${b.waitPos}番)`}
                    </span>
                    {b.status === 'confirmed' || b.status === 'waitlist' ? (
                      <button onClick={() => setCancelId(b.id)}
                        className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                        <X size={14} />
                      </button>
                    ) : null}
                  </div>
                </div>
              )
            })}

            {list.length === 0 && (
              <div className="text-center py-16 text-slate-400">
                <CalendarDays size={40} className="mx-auto mb-3 opacity-30" />
                <p>{tab === 'upcoming' ? '予約中のクラスはありません' : '受講履歴はありません'}</p>
                {tab === 'upcoming' && (
                  <Link href="/lessons" className="mt-3 inline-block text-sm text-teal-600 hover:underline">クラスを予約する →</Link>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Cancel modal */}
      {cancelId && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6">
            <h3 className="font-bold text-slate-900 mb-2">予約をキャンセルしますか？</h3>
            <p className="text-sm text-slate-600 mb-5">キャンセル後はキャンセル待ちの方に自動的に通知されます。</p>
            <div className="flex gap-2">
              <button onClick={() => setCancelId(null)} className="flex-1 py-2.5 border border-slate-300 rounded-xl text-sm font-medium text-slate-700 hover:bg-slate-50">
                戻る
              </button>
              <button onClick={doCancel} className="flex-1 py-2.5 bg-red-500 text-white rounded-xl text-sm font-medium hover:bg-red-600">
                キャンセルする
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </>
  )
}
