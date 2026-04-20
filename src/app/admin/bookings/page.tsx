'use client'

import { useState } from 'react'
import { Search, Download, Calendar, Filter } from 'lucide-react'

const BOOKINGS = [
  { id: 'b1', user: '田中 花子', email: 'hanako@ex.com', class: 'フローヨガ', date: '2025-05-08', time: '19:00', teacher: '鈴木 ハル', status: 'CONFIRMED', type: 'regular', utm: 'instagram' },
  { id: 'b2', user: '佐藤 美咲', email: 'misaki@ex.com', class: '朝ヨガ', date: '2025-05-08', time: '07:00', teacher: '田中 さくら', status: 'CONFIRMED', type: 'regular', utm: 'google' },
  { id: 'b3', user: '中村 拓也', email: 'takuya@ex.com', class: '体験レッスン', date: '2025-05-10', time: '10:00', teacher: '田中 さくら', status: 'CONFIRMED', type: 'trial', utm: 'instagram' },
  { id: 'b4', user: '山田 雅子', email: 'masako@ex.com', class: 'ピラティス基礎', date: '2025-05-09', time: '19:00', teacher: '山本 リナ', status: 'WAITLIST', type: 'regular', utm: 'direct' },
  { id: 'b5', user: '高橋 綾', email: 'aya@ex.com', class: '春のワークショップ', date: '2025-05-17', time: '14:00', teacher: '鈴木 ハル', status: 'CONFIRMED', type: 'event', utm: 'instagram' },
  { id: 'b6', user: '伊藤 健', email: 'ken@ex.com', class: '朝ヨガ', date: '2025-05-08', time: '07:00', teacher: '田中 さくら', status: 'CANCELLED', type: 'regular', utm: 'direct' },
]

const STATUS_STYLES: Record<string, string> = {
  CONFIRMED: 'bg-teal-100 text-teal-700',
  WAITLIST:  'bg-amber-100 text-amber-700',
  CANCELLED: 'bg-red-100 text-red-500',
  ATTENDED:  'bg-slate-100 text-slate-600',
}
const STATUS_LABELS: Record<string, string> = { CONFIRMED: '確定', WAITLIST: '待機中', CANCELLED: 'キャンセル', ATTENDED: '受講済' }
const TYPE_LABELS: Record<string, { l: string; cls: string }> = {
  regular: { l: '定期', cls: 'bg-teal-50 text-teal-700' },
  trial:   { l: '体験', cls: 'bg-amber-50 text-amber-700' },
  event:   { l: 'イベント', cls: 'bg-purple-50 text-purple-700' },
}

export default function BookingsAdminPage() {
  const [search, setSearch] = useState('')
  const [statusF, setStatusF] = useState('all')

  const filtered = BOOKINGS.filter(b => {
    if (search && !b.user.includes(search) && !b.class.includes(search)) return false
    if (statusF !== 'all' && b.status !== statusF) return false
    return true
  })

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-slate-900">予約管理</h1>
          <p className="text-sm text-slate-500">全{BOOKINGS.length}件の予約</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 border border-slate-300 text-slate-700 rounded-xl text-sm hover:bg-slate-50">
          <Download size={14} />CSV出力
        </button>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl p-4 mb-4 flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-48">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="氏名・クラス名で検索..."
            className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-400" />
        </div>
        <select value={statusF} onChange={e => setStatusF(e.target.value)}
          className="border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400">
          <option value="all">全ステータス</option>
          <option value="CONFIRMED">確定</option>
          <option value="WAITLIST">待機中</option>
          <option value="CANCELLED">キャンセル</option>
        </select>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              {['予約者', 'クラス', '日時', '講師', '種別', 'ステータス', '流入元'].map(h => (
                <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filtered.map(b => {
              const typeInfo = TYPE_LABELS[b.type] ?? { l: b.type, cls: 'bg-slate-100 text-slate-600' }
              return (
                <tr key={b.id} className="hover:bg-slate-50">
                  <td className="px-4 py-3.5">
                    <p className="font-medium text-sm text-slate-800">{b.user}</p>
                    <p className="text-xs text-slate-400">{b.email}</p>
                  </td>
                  <td className="px-4 py-3.5 text-sm font-medium text-slate-700">{b.class}</td>
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-1.5 text-xs text-slate-600">
                      <Calendar size={12} className="text-slate-400" />
                      {b.date} {b.time}
                    </div>
                  </td>
                  <td className="px-4 py-3.5 text-sm text-slate-600">{b.teacher}</td>
                  <td className="px-4 py-3.5">
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${typeInfo.cls}`}>{typeInfo.l}</span>
                  </td>
                  <td className="px-4 py-3.5">
                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${STATUS_STYLES[b.status] ?? ''}`}>
                      {STATUS_LABELS[b.status] ?? b.status}
                    </span>
                  </td>
                  <td className="px-4 py-3.5">
                    <span className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded">{b.utm}</span>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
