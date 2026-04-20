'use client'

import { useState } from 'react'
import { Search, Download, Filter, Star, MoreVertical, Mail } from 'lucide-react'

const MEMBERS = [
  { id: 'm1', name: '田中 花子', email: 'hanako@example.com', plan: 'ゴールド', planColor: '#D4AF37', status: 'ACTIVE', since: '2025-01-15', attended: 24, lastAttended: '2025-05-06', utm: 'instagram' },
  { id: 'm2', name: '佐藤 美咲', email: 'misaki@example.com', plan: 'レギュラー', planColor: '#0d9488', status: 'ACTIVE', since: '2025-02-01', attended: 12, lastAttended: '2025-05-07', utm: 'google' },
  { id: 'm3', name: '中村 拓也', email: 'takuya@example.com', plan: 'ゴールド', planColor: '#D4AF37', status: 'ACTIVE', since: '2025-03-10', attended: 18, lastAttended: '2025-05-05', utm: 'referral' },
  { id: 'm4', name: '山田 雅子', email: 'masako@example.com', plan: 'ライト', planColor: '#6366f1', status: 'ACTIVE', since: '2025-04-01', attended: 6, lastAttended: '2025-04-28', utm: 'instagram' },
  { id: 'm5', name: '鈴木 一郎', email: 'ichiro@example.com', plan: 'レギュラー', planColor: '#0d9488', status: 'INACTIVE', since: '2024-11-01', attended: 30, lastAttended: '2025-03-15', utm: 'direct' },
  { id: 'm6', name: '高橋 綾', email: 'aya@example.com', plan: 'ゴールド', planColor: '#D4AF37', status: 'TRIAL', since: '2025-05-07', attended: 0, lastAttended: '—', utm: 'instagram' },
]

const STATUS_STYLES: Record<string, { label: string; cls: string }> = {
  ACTIVE:   { label: '有効', cls: 'bg-teal-100 text-teal-700' },
  INACTIVE: { label: '退会', cls: 'bg-slate-100 text-slate-500' },
  TRIAL:    { label: '体験中', cls: 'bg-amber-100 text-amber-700' },
  SUSPENDED:{ label: '停止中', cls: 'bg-red-100 text-red-600' },
}

export default function MembersPage() {
  const [search, setSearch] = useState('')
  const [planFilter, setPlanFilter] = useState('all')
  const [statusFilter, setStatusFilter] = useState('all')

  const filtered = MEMBERS.filter(m => {
    if (search && !m.name.includes(search) && !m.email.includes(search)) return false
    if (planFilter !== 'all' && m.plan !== planFilter) return false
    if (statusFilter !== 'all' && m.status !== statusFilter) return false
    return true
  })

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-slate-900">会員管理</h1>
          <p className="text-sm text-slate-500">全{MEMBERS.length}名の会員</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 border border-slate-300 text-slate-700 rounded-xl text-sm hover:bg-slate-50">
          <Download size={14} />CSV出力
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white border border-slate-200 rounded-xl p-4 mb-4 flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-48">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="名前・メールで検索..."
            className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-400" />
        </div>
        <select value={planFilter} onChange={e => setPlanFilter(e.target.value)}
          className="border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400">
          <option value="all">全プラン</option>
          <option value="ゴールド">ゴールド</option>
          <option value="レギュラー">レギュラー</option>
          <option value="ライト">ライト</option>
        </select>
        <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)}
          className="border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400">
          <option value="all">全ステータス</option>
          <option value="ACTIVE">有効</option>
          <option value="TRIAL">体験中</option>
          <option value="INACTIVE">退会</option>
        </select>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              {['会員名', 'プラン', 'ステータス', '入会日', '受講回数', '最終受講', '流入元', ''].map(h => (
                <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filtered.map(m => {
              const st = STATUS_STYLES[m.status] ?? { label: m.status, cls: 'bg-slate-100 text-slate-600' }
              return (
                <tr key={m.id} className="hover:bg-slate-50 cursor-pointer">
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold shrink-0"
                        style={{ backgroundColor: m.planColor }}>
                        {m.name[0]}
                      </div>
                      <div>
                        <p className="font-medium text-sm text-slate-800">{m.name}</p>
                        <p className="text-xs text-slate-400">{m.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3.5">
                    <span className="flex items-center gap-1 text-xs font-semibold text-white px-2 py-0.5 rounded-full w-fit"
                      style={{ backgroundColor: m.planColor }}>
                      <Star size={10} />{m.plan}
                    </span>
                  </td>
                  <td className="px-4 py-3.5">
                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${st.cls}`}>{st.label}</span>
                  </td>
                  <td className="px-4 py-3.5 text-sm text-slate-600">{m.since}</td>
                  <td className="px-4 py-3.5 text-sm font-semibold text-slate-700">{m.attended}回</td>
                  <td className="px-4 py-3.5 text-sm text-slate-500">{m.lastAttended}</td>
                  <td className="px-4 py-3.5">
                    <span className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded">{m.utm}</span>
                  </td>
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-1">
                      <button className="p-1.5 text-slate-400 hover:text-teal-600 hover:bg-teal-50 rounded-lg"><Mail size={14} /></button>
                      <button className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg"><MoreVertical size={14} /></button>
                    </div>
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
