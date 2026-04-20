'use client'

import { useState } from 'react'
import { Plus, Calendar, Users, Edit2, Eye, Trash2 } from 'lucide-react'

const EVENTS = [
  { id: 'e1', title: '春の癒しワークショップ〜呼吸と瞑想〜', date: '2025-05-17', time: '14:00〜17:00', teacher: '鈴木 ハル', capacity: 20, booked: 15, price: 6600, published: true, category: 'meditation' },
  { id: 'e2', title: 'アーユルヴェーダ入門講座', date: '2025-05-24', time: '13:00〜16:00', teacher: '田中 さくら', capacity: 15, booked: 8, price: 8800, published: true, category: 'workshop' },
  { id: 'e3', title: 'ビギナー向けピラティス集中講座', date: '2025-06-01', time: '10:00〜13:00', teacher: '山本 リナ', capacity: 12, booked: 6, price: 7700, published: true, category: 'pilates' },
  { id: 'e4', title: '夏のリトリート〜自然の中のヨガ〜', date: '2025-07-12', time: '09:00〜16:00', teacher: '田中 さくら', capacity: 15, booked: 0, price: 22000, published: false, category: 'yoga' },
]

export default function EventsPage() {
  const [events, setEvents] = useState(EVENTS)
  const [showAdd, setShowAdd] = useState(false)
  const [form, setForm] = useState({ title: '', date: '', time: '', teacher: '', capacity: 15, price: 6600, description: '' })

  function togglePublish(id: string) {
    setEvents(e => e.map(x => x.id === id ? { ...x, published: !x.published } : x))
  }

  function set(k: string) { return (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setForm(f => ({ ...f, [k]: e.target.value })) }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-slate-900">イベント・ワークショップ管理</h1>
          <p className="text-sm text-slate-500">単発イベントの作成・公開管理</p>
        </div>
        <button onClick={() => setShowAdd(true)} className="flex items-center gap-2 px-4 py-2 bg-teal-600 text-white rounded-xl text-sm font-medium hover:bg-teal-700">
          <Plus size={16} />イベントを追加
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {events.map(ev => {
          const ratio = ev.booked / ev.capacity
          return (
            <div key={ev.id} className={`bg-white rounded-xl border shadow-sm ${ev.published ? 'border-slate-200' : 'border-dashed border-slate-300'}`}>
              <div className="p-5">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1 min-w-0 pr-3">
                    <h3 className="font-bold text-slate-800 leading-snug">{ev.title}</h3>
                    <p className="text-sm text-slate-500 mt-0.5">{ev.teacher} 講師</p>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full font-medium shrink-0 ${ev.published ? 'bg-teal-100 text-teal-700' : 'bg-slate-100 text-slate-500'}`}>
                    {ev.published ? '公開中' : '下書き'}
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2 mb-3">
                  <div className="text-center bg-slate-50 rounded-lg p-2">
                    <Calendar size={13} className="text-slate-400 mx-auto mb-0.5" />
                    <p className="text-xs font-medium text-slate-700">{ev.date}</p>
                  </div>
                  <div className="text-center bg-slate-50 rounded-lg p-2">
                    <Users size={13} className="text-slate-400 mx-auto mb-0.5" />
                    <p className="text-xs font-medium text-slate-700">{ev.booked}/{ev.capacity}名</p>
                  </div>
                  <div className="text-center bg-slate-50 rounded-lg p-2">
                    <p className="text-xs text-slate-400 mb-0.5">料金</p>
                    <p className="text-xs font-bold text-slate-700">¥{ev.price.toLocaleString()}</p>
                  </div>
                </div>

                <div className="mb-3">
                  <div className="flex justify-between text-xs text-slate-400 mb-1">
                    <span>予約状況</span><span>{Math.round(ratio * 100)}%</span>
                  </div>
                  <div className="bg-slate-100 rounded-full h-1.5">
                    <div className={`h-1.5 rounded-full ${ratio >= 1 ? 'bg-red-400' : ratio >= 0.8 ? 'bg-amber-400' : 'bg-teal-500'}`}
                      style={{ width: `${Math.min(ratio * 100, 100)}%` }} />
                  </div>
                </div>

                <div className="flex gap-2">
                  <button onClick={() => togglePublish(ev.id)}
                    className={`flex-1 py-2 text-xs font-medium rounded-lg border transition-colors ${
                      ev.published
                        ? 'border-slate-300 text-slate-600 hover:bg-slate-50'
                        : 'border-teal-500 text-teal-700 bg-teal-50 hover:bg-teal-100'
                    }`}>
                    {ev.published ? '非公開にする' : '公開する'}
                  </button>
                  <button className="px-3 py-2 border border-slate-200 rounded-lg hover:bg-slate-50 text-slate-500"><Edit2 size={13} /></button>
                  <button className="px-3 py-2 border border-slate-200 rounded-lg hover:bg-red-50 hover:border-red-200 text-slate-400 hover:text-red-500"><Trash2 size={13} /></button>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Add modal */}
      {showAdd && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-6 max-h-[90vh] overflow-y-auto">
            <h3 className="font-bold text-slate-900 text-lg mb-4">イベントを追加</h3>
            <div className="space-y-3">
              <div>
                <label className="text-xs font-medium text-slate-600 block mb-1">タイトル</label>
                <input type="text" value={form.title} onChange={set('title')}
                  className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400" placeholder="ワークショップ名" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-medium text-slate-600 block mb-1">日付</label>
                  <input type="date" value={form.date} onChange={set('date')}
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400" />
                </div>
                <div>
                  <label className="text-xs font-medium text-slate-600 block mb-1">時間</label>
                  <input type="text" value={form.time} onChange={set('time')}
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400" placeholder="14:00〜17:00" />
                </div>
                <div>
                  <label className="text-xs font-medium text-slate-600 block mb-1">講師</label>
                  <input type="text" value={form.teacher} onChange={set('teacher')}
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400" />
                </div>
                <div>
                  <label className="text-xs font-medium text-slate-600 block mb-1">定員</label>
                  <input type="number" value={form.capacity} onChange={e => setForm(f => ({ ...f, capacity: +e.target.value }))}
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400" />
                </div>
                <div>
                  <label className="text-xs font-medium text-slate-600 block mb-1">料金（円）</label>
                  <input type="number" value={form.price} onChange={e => setForm(f => ({ ...f, price: +e.target.value }))}
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400" />
                </div>
              </div>
              <div>
                <label className="text-xs font-medium text-slate-600 block mb-1">説明</label>
                <textarea value={form.description} onChange={set('description')} rows={3}
                  className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400" placeholder="イベントの詳細..." />
              </div>
            </div>
            <div className="flex gap-2 mt-5">
              <button onClick={() => setShowAdd(false)} className="flex-1 py-2.5 border border-slate-300 rounded-xl text-sm">キャンセル</button>
              <button onClick={() => setShowAdd(false)} className="flex-1 py-2.5 bg-teal-600 text-white rounded-xl text-sm font-medium">下書き保存</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
