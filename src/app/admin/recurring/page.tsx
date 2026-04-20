'use client'

import { useState } from 'react'
import { Plus, RefreshCw, Edit2, Trash2, ChevronDown } from 'lucide-react'
import { DAY_NAMES_JA } from '@/lib/utils'

const RULES = [
  { id: 'r1', name: '朝ヨガ', dayOfWeek: 1, startTime: '07:00', endTime: '08:00', teacher: '田中 さくら', capacity: 12, isActive: true, startDate: '2025-01-01', color: 'bg-teal-500' },
  { id: 'r2', name: 'ピラティス基礎', dayOfWeek: 2, startTime: '19:00', endTime: '20:00', teacher: '山本 リナ', capacity: 12, isActive: true, startDate: '2025-01-01', color: 'bg-purple-500' },
  { id: 'r3', name: '骨盤ヨガ', dayOfWeek: 3, startTime: '10:00', endTime: '11:15', teacher: '田中 さくら', capacity: 12, isActive: true, startDate: '2025-01-01', color: 'bg-teal-500' },
  { id: 'r4', name: 'フローヨガ', dayOfWeek: 4, startTime: '19:00', endTime: '20:00', teacher: '鈴木 ハル', capacity: 15, isActive: true, startDate: '2025-01-01', color: 'bg-blue-500' },
  { id: 'r5', name: 'ランチヨガ', dayOfWeek: 5, startTime: '12:00', endTime: '12:45', teacher: '山本 リナ', capacity: 10, isActive: true, startDate: '2025-02-01', color: 'bg-teal-500' },
  { id: 'r6', name: '週末瞑想', dayOfWeek: 6, startTime: '09:00', endTime: '10:00', teacher: '鈴木 ハル', capacity: 10, isActive: false, startDate: '2025-01-01', color: 'bg-green-500' },
]

export default function RecurringPage() {
  const [rules, setRules] = useState(RULES)
  const [showAdd, setShowAdd] = useState(false)
  const [newRule, setNewRule] = useState({ name: '', dayOfWeek: 1, startTime: '10:00', endTime: '11:00', teacher: '', capacity: 12 })

  function toggleActive(id: string) {
    setRules(r => r.map(x => x.id === id ? { ...x, isActive: !x.isActive } : x))
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-slate-900">定期クラス設定</h1>
          <p className="text-sm text-slate-500">毎週繰り返すクラスのルールを管理します。変更は翌月から自動反映されます。</p>
        </div>
        <button onClick={() => setShowAdd(true)} className="flex items-center gap-2 px-4 py-2 bg-teal-600 text-white rounded-xl text-sm font-medium hover:bg-teal-700">
          <Plus size={16} />ルールを追加
        </button>
      </div>

      {/* Info banner */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6 text-sm text-blue-800">
        <p className="font-semibold mb-1">⚙️ 自動生成ルール</p>
        <p>毎月25日に翌月分のセッションが自動生成されます。ルールを変更した場合は「今すぐ生成」ボタンで手動実行できます。</p>
        <button className="mt-2 px-4 py-1.5 bg-blue-600 text-white rounded-lg text-xs font-medium hover:bg-blue-700 flex items-center gap-1">
          <RefreshCw size={12} />今すぐ来月分を生成
        </button>
      </div>

      {/* Rule cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {rules.map(rule => (
          <div key={rule.id} className={`bg-white rounded-xl border-2 shadow-sm overflow-hidden ${rule.isActive ? 'border-slate-200' : 'border-slate-100 opacity-60'}`}>
            <div className={`${rule.color} h-2`} />
            <div className="p-5">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-bold text-slate-800">{rule.name}</h3>
                  <p className="text-sm text-slate-500">{rule.teacher} 講師</p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => toggleActive(rule.id)}
                    className={`relative w-10 h-5 rounded-full transition-colors ${rule.isActive ? 'bg-teal-500' : 'bg-slate-300'}`}>
                    <span className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${rule.isActive ? 'translate-x-5' : 'translate-x-0.5'}`} />
                  </button>
                  <button className="p-1.5 text-slate-400 hover:text-teal-600 hover:bg-teal-50 rounded-lg"><Edit2 size={14} /></button>
                  <button className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg"><Trash2 size={14} /></button>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="bg-slate-50 rounded-lg p-2 text-center">
                  <p className="text-xs text-slate-400 mb-0.5">曜日</p>
                  <p className="font-bold text-slate-700">{DAY_NAMES_JA[rule.dayOfWeek]}曜日</p>
                </div>
                <div className="bg-slate-50 rounded-lg p-2 text-center">
                  <p className="text-xs text-slate-400 mb-0.5">時間</p>
                  <p className="font-bold text-slate-700 text-sm">{rule.startTime}〜{rule.endTime}</p>
                </div>
                <div className="bg-slate-50 rounded-lg p-2 text-center">
                  <p className="text-xs text-slate-400 mb-0.5">定員</p>
                  <p className="font-bold text-slate-700">{rule.capacity}名</p>
                </div>
              </div>

              <p className="text-xs text-slate-400 mt-3">開始日: {rule.startDate} ／ {rule.isActive ? '有効' : '無効（一時停止中）'}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Add modal */}
      {showAdd && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-6">
            <h3 className="font-bold text-slate-900 text-lg mb-4">定期クラスを追加</h3>
            <div className="space-y-3">
              <div>
                <label className="text-xs font-medium text-slate-600 block mb-1">クラス名</label>
                <input type="text" value={newRule.name} onChange={e => setNewRule({ ...newRule, name: e.target.value })}
                  className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400" placeholder="ヨガクラス" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-medium text-slate-600 block mb-1">曜日</label>
                  <select value={newRule.dayOfWeek} onChange={e => setNewRule({ ...newRule, dayOfWeek: +e.target.value })}
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400">
                    {DAY_NAMES_JA.map((d, i) => <option key={i} value={i}>{d}曜日</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-xs font-medium text-slate-600 block mb-1">講師</label>
                  <input type="text" value={newRule.teacher} onChange={e => setNewRule({ ...newRule, teacher: e.target.value })}
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400" placeholder="田中 さくら" />
                </div>
                <div>
                  <label className="text-xs font-medium text-slate-600 block mb-1">開始時間</label>
                  <input type="time" value={newRule.startTime} onChange={e => setNewRule({ ...newRule, startTime: e.target.value })}
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400" />
                </div>
                <div>
                  <label className="text-xs font-medium text-slate-600 block mb-1">終了時間</label>
                  <input type="time" value={newRule.endTime} onChange={e => setNewRule({ ...newRule, endTime: e.target.value })}
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400" />
                </div>
                <div>
                  <label className="text-xs font-medium text-slate-600 block mb-1">定員</label>
                  <input type="number" value={newRule.capacity} onChange={e => setNewRule({ ...newRule, capacity: +e.target.value })}
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400" />
                </div>
              </div>
            </div>
            <div className="flex gap-2 mt-5">
              <button onClick={() => setShowAdd(false)} className="flex-1 py-2.5 border border-slate-300 rounded-xl text-sm">キャンセル</button>
              <button onClick={() => { setRules(r => [...r, { ...newRule, id: `r${Date.now()}`, isActive: true, startDate: new Date().toISOString().split('T')[0], color: 'bg-teal-500' }]); setShowAdd(false) }}
                className="flex-1 py-2.5 bg-teal-600 text-white rounded-xl text-sm font-medium">追加する</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
