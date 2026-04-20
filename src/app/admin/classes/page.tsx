'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Plus, Search, CalendarDays, Clock, Users, MoreVertical, RefreshCw } from 'lucide-react'

const SESSIONS = [
  { id: '1', date: '2025-05-08', title: '朝ヨガ', time: '07:00', duration: 60, teacher: '田中 さくら', booked: 8, cap: 12, status: 'scheduled', recurring: true },
  { id: '2', date: '2025-05-08', title: '骨盤ヨガ', time: '10:00', duration: 75, teacher: '田中 さくら', booked: 12, cap: 12, status: 'scheduled', recurring: true },
  { id: '3', date: '2025-05-08', title: 'ランチヨガ', time: '12:00', duration: 45, teacher: '山本 リナ', booked: 5, cap: 10, status: 'scheduled', recurring: true },
  { id: '4', date: '2025-05-08', title: 'フローヨガ', time: '19:00', duration: 60, teacher: '鈴木 ハル', booked: 10, cap: 15, status: 'scheduled', recurring: true },
  { id: '5', date: '2025-05-09', title: 'ピラティス基礎', time: '19:00', duration: 60, teacher: '山本 リナ', booked: 11, cap: 12, status: 'scheduled', recurring: true },
  { id: '6', date: '2025-05-10', title: '週末瞑想', time: '09:00', duration: 60, teacher: '鈴木 ハル', booked: 7, cap: 10, status: 'scheduled', recurring: true },
  { id: '7', date: '2025-05-10', title: 'パワーヨガ', time: '11:00', duration: 75, teacher: '田中 さくら', booked: 3, cap: 15, status: 'scheduled', recurring: true },
  { id: '8', date: '2025-05-15', title: '朝ヨガ', time: '07:00', duration: 60, teacher: '山本 リナ', booked: 0, cap: 12, status: 'cancelled', recurring: true },
]

const STATUS_STYLES: Record<string, { label: string; cls: string }> = {
  scheduled:  { label: '予定', cls: 'bg-teal-100 text-teal-700' },
  cancelled:  { label: '休講', cls: 'bg-red-100 text-red-600' },
  completed:  { label: '完了', cls: 'bg-slate-100 text-slate-600' },
  rescheduled:{ label: '変更済', cls: 'bg-amber-100 text-amber-700' },
}

export default function ClassesPage() {
  const [search, setSearch] = useState('')
  const [showAdd, setShowAdd] = useState(false)

  const filtered = SESSIONS.filter(s => !search || s.title.includes(search) || s.teacher.includes(search))

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-slate-900">クラス管理</h1>
          <p className="text-sm text-slate-500">今後のクラスセッション一覧</p>
        </div>
        <div className="flex gap-2">
          <Link href="/admin/recurring" className="flex items-center gap-2 px-4 py-2 border border-slate-300 text-slate-700 rounded-xl text-sm hover:bg-slate-50">
            <RefreshCw size={14} />定期設定
          </Link>
          <button onClick={() => setShowAdd(true)} className="flex items-center gap-2 px-4 py-2 bg-teal-600 text-white rounded-xl text-sm font-medium hover:bg-teal-700">
            <Plus size={16} />クラスを追加
          </button>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white border border-slate-200 rounded-xl p-4 mb-4 flex gap-3">
        <div className="relative flex-1">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input type="text" value={search} onChange={e => setSearch(e.target.value)}
            placeholder="クラス名・講師名で検索..."
            className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-400" />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              {['日時', 'クラス名', '講師', '予約状況', 'ステータス', ''].map(h => (
                <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filtered.map(s => {
              const ratio = s.booked / s.cap
              const st = STATUS_STYLES[s.status] ?? { label: s.status, cls: 'bg-slate-100 text-slate-600' }
              return (
                <tr key={s.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-2">
                      <CalendarDays size={14} className="text-slate-400 shrink-0" />
                      <div>
                        <p className="text-sm font-medium text-slate-700">{s.date}</p>
                        <p className="text-xs text-slate-400">{s.time}（{s.duration}分）</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-1.5">
                      <span className="font-medium text-sm text-slate-800">{s.title}</span>
                      {s.recurring && <RefreshCw size={11} className="text-slate-400" />}
                    </div>
                  </td>
                  <td className="px-4 py-3.5 text-sm text-slate-600">{s.teacher}</td>
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-2">
                      <div className="w-16 bg-slate-100 rounded-full h-1.5">
                        <div className={`h-1.5 rounded-full ${ratio >= 1 ? 'bg-red-400' : ratio >= 0.8 ? 'bg-amber-400' : 'bg-teal-500'}`}
                          style={{ width: `${Math.min(ratio * 100, 100)}%` }} />
                      </div>
                      <span className="text-xs text-slate-500">{s.booked}/{s.cap}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3.5">
                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${st.cls}`}>{st.label}</span>
                  </td>
                  <td className="px-4 py-3.5">
                    <button className="p-1 text-slate-400 hover:text-slate-600 rounded"><MoreVertical size={16} /></button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {/* Add modal */}
      {showAdd && (
        <div className="fixed inset-0 bg-black/40 flex items-end sm:items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-6 space-y-4">
            <h3 className="font-bold text-slate-900 text-lg">クラスを追加</h3>
            <div className="grid grid-cols-2 gap-3">
              {[['タイトル', 'text', ''], ['講師', 'text', ''], ['日付', 'date', ''], ['開始時間', 'time', '']].map(([l, t, p]) => (
                <div key={l}>
                  <label className="block text-xs font-medium text-slate-600 mb-1">{l}</label>
                  <input type={t} placeholder={p}
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400" />
                </div>
              ))}
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">定員</label>
                <input type="number" defaultValue={12}
                  className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400" />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">時間（分）</label>
                <input type="number" defaultValue={60}
                  className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400" />
              </div>
            </div>
            <div className="flex gap-2 pt-2">
              <button onClick={() => setShowAdd(false)} className="flex-1 py-2.5 border border-slate-300 rounded-xl text-sm text-slate-700">キャンセル</button>
              <button onClick={() => setShowAdd(false)} className="flex-1 py-2.5 bg-teal-600 text-white rounded-xl text-sm font-medium">追加する</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
