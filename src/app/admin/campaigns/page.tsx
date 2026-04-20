'use client'

import { useState } from 'react'
import { Plus, Megaphone, TrendingUp, Users, ToggleLeft, ToggleRight, Edit2 } from 'lucide-react'

const CAMPAIGNS = [
  { id: 'c1', name: '体験¥3,300 当日入会キャッシュバック', type: 'TRIAL_CASHBACK', cashback: 3300, isActive: true, startDate: '2025-01-01', endDate: null, usageCount: 198, conversions: 89, convRate: '44.9%' },
  { id: 'c2', name: '友人紹介キャンペーン', type: 'REFERRAL', cashback: 5000, isActive: true, startDate: '2025-03-01', endDate: '2025-06-30', usageCount: 45, conversions: 28, convRate: '62.2%' },
  { id: 'c3', name: '春の入会割引 2ヶ月無料', type: 'MEMBERSHIP_DISCOUNT', cashback: 0, isActive: false, startDate: '2025-03-15', endDate: '2025-04-30', usageCount: 32, conversions: 14, convRate: '43.8%' },
]

const TYPE_LABELS: Record<string, string> = {
  TRIAL_CASHBACK: '体験キャッシュバック',
  REFERRAL: '友人紹介',
  MEMBERSHIP_DISCOUNT: '会費割引',
  EVENT_DISCOUNT: 'イベント割引',
  SEASONAL: '季節限定',
}

export default function CampaignsPage() {
  const [campaigns, setCampaigns] = useState(CAMPAIGNS)
  const [showAdd, setShowAdd] = useState(false)
  const [form, setForm] = useState({ name: '', type: 'TRIAL_CASHBACK', cashback: 3300, startDate: '', endDate: '' })

  function toggleActive(id: string) {
    setCampaigns(c => c.map(x => x.id === id ? { ...x, isActive: !x.isActive } : x))
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-slate-900">キャンペーン管理</h1>
          <p className="text-sm text-slate-500">体験→入会の転換施策を管理します</p>
        </div>
        <button onClick={() => setShowAdd(true)} className="flex items-center gap-2 px-4 py-2 bg-teal-600 text-white rounded-xl text-sm font-medium hover:bg-teal-700">
          <Plus size={16} />キャンペーンを追加
        </button>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {[
          { label: '有効キャンペーン', val: campaigns.filter(c => c.isActive).length + '件', icon: Megaphone, color: 'text-teal-600', bg: 'bg-teal-50' },
          { label: '合計利用数', val: campaigns.reduce((a, b) => a + b.usageCount, 0) + '件', icon: Users, color: 'text-indigo-600', bg: 'bg-indigo-50' },
          { label: '合計転換数', val: campaigns.reduce((a, b) => a + b.conversions, 0) + '名', icon: TrendingUp, color: 'text-green-600', bg: 'bg-green-50' },
        ].map(s => (
          <div key={s.label} className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 flex items-center gap-3">
            <div className={`w-10 h-10 ${s.bg} rounded-lg flex items-center justify-center shrink-0`}>
              <s.icon size={18} className={s.color} />
            </div>
            <div>
              <p className="text-xl font-bold text-slate-900">{s.val}</p>
              <p className="text-xs text-slate-500">{s.label}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="space-y-4">
        {campaigns.map(c => (
          <div key={c.id} className={`bg-white rounded-xl border shadow-sm ${c.isActive ? 'border-slate-200' : 'border-dashed border-slate-300 opacity-70'}`}>
            <div className="p-5">
              <div className="flex items-start justify-between gap-3 mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${c.isActive ? 'bg-teal-100 text-teal-700' : 'bg-slate-100 text-slate-500'}`}>
                      {c.isActive ? '有効' : '終了'}
                    </span>
                    <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">{TYPE_LABELS[c.type]}</span>
                  </div>
                  <h3 className="font-bold text-slate-900">{c.name}</h3>
                  {c.cashback > 0 && <p className="text-sm text-amber-600 font-medium">キャッシュバック: ¥{c.cashback.toLocaleString()}</p>}
                  <p className="text-xs text-slate-400 mt-0.5">
                    {c.startDate}〜{c.endDate ?? '期限なし'}
                  </p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <button className="p-1.5 text-slate-400 hover:text-teal-600 hover:bg-teal-50 rounded-lg"><Edit2 size={14} /></button>
                  <button onClick={() => toggleActive(c.id)} className={`p-1.5 rounded-lg ${c.isActive ? 'text-teal-500 hover:bg-teal-50' : 'text-slate-400 hover:bg-slate-50'}`}>
                    {c.isActive ? <ToggleRight size={22} /> : <ToggleLeft size={22} />}
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="bg-slate-50 rounded-lg p-3 text-center">
                  <p className="text-xs text-slate-400 mb-1">利用数</p>
                  <p className="font-bold text-slate-700">{c.usageCount}件</p>
                </div>
                <div className="bg-slate-50 rounded-lg p-3 text-center">
                  <p className="text-xs text-slate-400 mb-1">転換数</p>
                  <p className="font-bold text-teal-700">{c.conversions}名</p>
                </div>
                <div className="bg-slate-50 rounded-lg p-3 text-center">
                  <p className="text-xs text-slate-400 mb-1">転換率</p>
                  <p className="font-bold text-green-700">{c.convRate}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showAdd && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-6">
            <h3 className="font-bold text-slate-900 text-lg mb-4">キャンペーンを追加</h3>
            <div className="space-y-3">
              <div>
                <label className="text-xs font-medium text-slate-600 block mb-1">キャンペーン名</label>
                <input type="text" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                  className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-medium text-slate-600 block mb-1">タイプ</label>
                  <select value={form.type} onChange={e => setForm(f => ({ ...f, type: e.target.value }))}
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400">
                    {Object.entries(TYPE_LABELS).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-xs font-medium text-slate-600 block mb-1">キャッシュバック額（円）</label>
                  <input type="number" value={form.cashback} onChange={e => setForm(f => ({ ...f, cashback: +e.target.value }))}
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400" />
                </div>
                <div>
                  <label className="text-xs font-medium text-slate-600 block mb-1">開始日</label>
                  <input type="date" value={form.startDate} onChange={e => setForm(f => ({ ...f, startDate: e.target.value }))}
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400" />
                </div>
                <div>
                  <label className="text-xs font-medium text-slate-600 block mb-1">終了日（任意）</label>
                  <input type="date" value={form.endDate} onChange={e => setForm(f => ({ ...f, endDate: e.target.value }))}
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400" />
                </div>
              </div>
            </div>
            <div className="flex gap-2 mt-5">
              <button onClick={() => setShowAdd(false)} className="flex-1 py-2.5 border border-slate-300 rounded-xl text-sm">キャンセル</button>
              <button onClick={() => setShowAdd(false)} className="flex-1 py-2.5 bg-teal-600 text-white rounded-xl text-sm font-medium">作成する</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
