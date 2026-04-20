import Link from 'next/link'
import { Users, CalendarDays, TrendingUp, AlertCircle, Clock, CheckCircle, XCircle } from 'lucide-react'

const KPI = [
  { label: '今日の予約', value: '18', sub: '定員24名中', icon: CalendarDays, color: 'text-teal-600', bg: 'bg-teal-50', trend: '+3', up: true },
  { label: '今月売上', value: '¥2,184,000', sub: '前月比 +12%', icon: TrendingUp, color: 'text-green-600', bg: 'bg-green-50', trend: '+12%', up: true },
  { label: '今月新規会員', value: '14名', sub: '体験転換8名含む', icon: Users, color: 'text-indigo-600', bg: 'bg-indigo-50', trend: '+5', up: true },
  { label: '未対応申請', value: '3件', sub: '変更申請が待機中', icon: AlertCircle, color: 'text-amber-600', bg: 'bg-amber-50', trend: '要対応', up: false },
]

const TODAY_CLASSES = [
  { time: '07:00', title: '朝ヨガ', teacher: '田中 さくら', booked: 8, cap: 12, status: 'scheduled' },
  { time: '10:00', title: '骨盤ヨガ', teacher: '田中 さくら', booked: 12, cap: 12, status: 'scheduled' },
  { time: '12:00', title: 'ランチヨガ', teacher: '山本 リナ', booked: 5, cap: 10, status: 'scheduled' },
  { time: '19:00', title: 'フローヨガ', teacher: '鈴木 ハル', booked: 10, cap: 15, status: 'scheduled' },
]

const RECENT_BOOKINGS = [
  { name: '佐藤 美咲', class: '朝ヨガ', date: '5/8', time: '5分前', type: 'booking' },
  { name: '中村 拓也', class: '体験レッスン', date: '5/10', time: '23分前', type: 'trial' },
  { name: '山田 雅子', class: 'ピラティス基礎', date: '5/9', time: '1時間前', type: 'booking' },
  { name: '鈴木 一郎', class: '春のワークショップ', date: '5/17', time: '2時間前', type: 'event' },
]

const PENDING_REQUESTS = [
  { teacher: '田中 さくら', type: 'CANCEL', session: '5月15日 フローヨガ', reason: '体調不良のため' },
  { teacher: '山本 リナ', type: 'RESCHEDULE', session: '5月20日 ピラティス', reason: '別件と重複' },
  { teacher: '鈴木 ハル', type: 'SUBSTITUTE', session: '5月22日 瞑想', reason: '出張のため代行希望' },
]

// Simple bar chart using CSS
function BarChart({ data }: { data: { label: string; value: number; max?: number }[] }) {
  const max = Math.max(...data.map(d => d.value))
  return (
    <div className="flex items-end gap-2 h-24">
      {data.map((d, i) => (
        <div key={i} className="flex-1 flex flex-col items-center gap-1">
          <span className="text-[10px] text-slate-500">{d.value}</span>
          <div className="w-full bg-teal-500 rounded-t transition-all" style={{ height: `${(d.value / max) * 72}px` }} />
          <span className="text-[10px] text-slate-400">{d.label}</span>
        </div>
      ))}
    </div>
  )
}

const WEEKLY_BOOKINGS = [
  { label: '月', value: 42 }, { label: '火', value: 38 }, { label: '水', value: 55 },
  { label: '木', value: 47 }, { label: '金', value: 60 }, { label: '土', value: 72 }, { label: '日', value: 65 },
]

export default function AdminDashboard() {
  const today = new Date()
  const dateStr = today.toLocaleDateString('ja-JP', { year: 'numeric', month: 'long', day: 'numeric', weekday: 'short' })

  return (
    <div className="p-6 space-y-6">
      {/* Page title */}
      <div>
        <h1 className="text-xl font-bold text-slate-900">ダッシュボード</h1>
        <p className="text-sm text-slate-500">{dateStr}</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {KPI.map(k => (
          <div key={k.label} className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
            <div className="flex items-center justify-between mb-3">
              <div className={`w-10 h-10 ${k.bg} rounded-lg flex items-center justify-center`}>
                <k.icon size={18} className={k.color} />
              </div>
              <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${k.up ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
                {k.trend}
              </span>
            </div>
            <p className="text-2xl font-bold text-slate-900 mb-0.5">{k.value}</p>
            <p className="text-xs text-slate-500">{k.label}</p>
            <p className="text-xs text-slate-400 mt-0.5">{k.sub}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Today's schedule */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between px-5 py-4 border-b border-slate-200">
            <h2 className="font-bold text-slate-900">本日のスケジュール</h2>
            <Link href="/admin/classes" className="text-sm text-teal-600 hover:underline">全て見る →</Link>
          </div>
          <div className="divide-y divide-slate-100">
            {TODAY_CLASSES.map((c, i) => {
              const ratio = c.booked / c.cap
              const full = ratio >= 1
              return (
                <div key={i} className="flex items-center gap-4 px-5 py-3.5">
                  <span className="font-mono text-sm text-slate-600 w-12 shrink-0">{c.time}</span>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm text-slate-800 truncate">{c.title}</p>
                    <p className="text-xs text-slate-500">{c.teacher}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1.5">
                      <div className="w-16 bg-slate-100 rounded-full h-1.5">
                        <div className={`h-1.5 rounded-full ${full ? 'bg-red-400' : ratio >= 0.8 ? 'bg-amber-400' : 'bg-teal-500'}`}
                          style={{ width: `${Math.min(ratio * 100, 100)}%` }} />
                      </div>
                      <span className="text-xs text-slate-500 w-10">{c.booked}/{c.cap}</span>
                    </div>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${full ? 'bg-red-100 text-red-600' : 'bg-teal-100 text-teal-700'}`}>
                      {full ? '満席' : '受付中'}
                    </span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Weekly bookings chart */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
          <h2 className="font-bold text-slate-900 mb-1">今週の予約数</h2>
          <p className="text-xs text-slate-400 mb-4">日別の予約件数</p>
          <BarChart data={WEEKLY_BOOKINGS} />
          <div className="mt-3 pt-3 border-t border-slate-100">
            <p className="text-xs text-slate-500">今週合計</p>
            <p className="text-xl font-bold text-teal-700">{WEEKLY_BOOKINGS.reduce((a, b) => a + b.value, 0)}件</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent activity */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between px-5 py-4 border-b border-slate-200">
            <h2 className="font-bold text-slate-900">最近の予約・申込</h2>
            <Link href="/admin/bookings" className="text-sm text-teal-600 hover:underline">全て見る →</Link>
          </div>
          <div className="divide-y divide-slate-100">
            {RECENT_BOOKINGS.map((r, i) => (
              <div key={i} className="flex items-center gap-3 px-5 py-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0 ${
                  r.type === 'trial' ? 'bg-amber-500' : r.type === 'event' ? 'bg-purple-500' : 'bg-teal-500'
                }`}>
                  {r.name[0]}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-slate-800">{r.name}</p>
                  <p className="text-xs text-slate-500">{r.class}（{r.date}）</p>
                </div>
                <span className="text-xs text-slate-400 shrink-0">{r.time}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Pending requests */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between px-5 py-4 border-b border-slate-200">
            <div className="flex items-center gap-2">
              <h2 className="font-bold text-slate-900">変更申請（要対応）</h2>
              <span className="w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold">
                {PENDING_REQUESTS.length}
              </span>
            </div>
            <Link href="/admin/requests" className="text-sm text-teal-600 hover:underline">全て見る →</Link>
          </div>
          <div className="divide-y divide-slate-100">
            {PENDING_REQUESTS.map((r, i) => (
              <div key={i} className="px-5 py-3">
                <div className="flex items-center justify-between mb-1">
                  <p className="text-sm font-semibold text-slate-800">{r.teacher}</p>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                    r.type === 'CANCEL' ? 'bg-red-100 text-red-600' :
                    r.type === 'RESCHEDULE' ? 'bg-amber-100 text-amber-700' :
                    'bg-blue-100 text-blue-700'
                  }`}>
                    {r.type === 'CANCEL' ? '休講申請' : r.type === 'RESCHEDULE' ? '日程変更' : '代行依頼'}
                  </span>
                </div>
                <p className="text-xs text-slate-600 mb-1">{r.session}</p>
                <p className="text-xs text-slate-400 mb-2">{r.reason}</p>
                <div className="flex gap-2">
                  <button className="flex items-center gap-1 px-3 py-1 bg-teal-600 text-white text-xs rounded-lg hover:bg-teal-700">
                    <CheckCircle size={12} />承認
                  </button>
                  <button className="flex items-center gap-1 px-3 py-1 bg-white border border-red-300 text-red-500 text-xs rounded-lg hover:bg-red-50">
                    <XCircle size={12} />却下
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Membership distribution */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
        <h2 className="font-bold text-slate-900 mb-4">会員プラン分布</h2>
        <div className="flex items-center gap-6">
          <div className="flex gap-1 h-6 flex-1 rounded-full overflow-hidden">
            <div className="bg-yellow-500 h-full" style={{ width: '38%' }} />
            <div className="bg-teal-500 h-full" style={{ width: '45%' }} />
            <div className="bg-indigo-400 h-full" style={{ width: '17%' }} />
          </div>
          <div className="flex gap-4 shrink-0">
            {[['#D4AF37', 'ゴールド', '38%', '192名'], ['#0d9488', 'レギュラー', '45%', '228名'], ['#6366f1', 'ライト', '17%', '86名']].map(([c, l, p, n]) => (
              <div key={l} className="flex items-center gap-1.5 text-xs text-slate-600">
                <span className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: c }} />
                <span>{l}</span>
                <span className="text-slate-400">{p}（{n}）</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
