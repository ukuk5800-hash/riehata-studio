'use client'

import { useState } from 'react'
import { CheckCircle, XCircle, Clock, AlertTriangle } from 'lucide-react'

type Req = { id: string; teacher: string; type: string; session: string; date: string; reason: string; status: string; proposed?: string }

const INITIAL: Req[] = [
  { id: 'rq1', teacher: '田中 さくら', type: 'CANCEL', session: '5月15日 フローヨガ 07:00', date: '2025-05-05', reason: '体調不良のため休講希望', status: 'PENDING' },
  { id: 'rq2', teacher: '山本 リナ', type: 'RESCHEDULE', session: '5月20日 ピラティス 19:00', date: '2025-05-06', reason: '別件の予定と重複してしまいました', status: 'PENDING', proposed: '5月22日 同時間' },
  { id: 'rq3', teacher: '鈴木 ハル', type: 'SUBSTITUTE', session: '5月22日 瞑想クラス 09:00', date: '2025-05-06', reason: '出張のため代行講師を希望します', status: 'PENDING' },
  { id: 'rq4', teacher: '田中 さくら', type: 'CANCEL', session: '4月28日 朝ヨガ 07:00', date: '2025-04-25', reason: '家族の都合', status: 'APPROVED' },
  { id: 'rq5', teacher: '山本 リナ', type: 'TIME_CHANGE', session: '4月30日 ランチヨガ 12:00', date: '2025-04-26', reason: '12時→13時への変更希望', status: 'REJECTED', proposed: '13:00開始' },
]

const TYPE_INFO: Record<string, { label: string; cls: string }> = {
  CANCEL:      { label: '休講申請', cls: 'bg-red-100 text-red-700' },
  RESCHEDULE:  { label: '日程変更', cls: 'bg-amber-100 text-amber-700' },
  SUBSTITUTE:  { label: '代行依頼', cls: 'bg-blue-100 text-blue-700' },
  TIME_CHANGE: { label: '時間変更', cls: 'bg-purple-100 text-purple-700' },
}

const STATUS_INFO: Record<string, { label: string; icon: React.ReactNode; cls: string }> = {
  PENDING:  { label: '審査中', icon: <Clock size={14} className="text-amber-500" />, cls: 'text-amber-700' },
  APPROVED: { label: '承認済', icon: <CheckCircle size={14} className="text-teal-500" />, cls: 'text-teal-700' },
  REJECTED: { label: '却下', icon: <XCircle size={14} className="text-red-500" />, cls: 'text-red-700' },
}

export default function RequestsPage() {
  const [requests, setRequests] = useState<Req[]>(INITIAL)
  const [tab, setTab] = useState<'PENDING' | 'ALL'>('PENDING')
  const [reviewId, setReviewId] = useState<string | null>(null)
  const [reviewNote, setReviewNote] = useState('')

  function approve(id: string) {
    setRequests(r => r.map(x => x.id === id ? { ...x, status: 'APPROVED' } : x))
    setReviewId(null)
  }
  function reject(id: string) {
    setRequests(r => r.map(x => x.id === id ? { ...x, status: 'REJECTED' } : x))
    setReviewId(null)
  }

  const pending = requests.filter(r => r.status === 'PENDING')
  const list = tab === 'PENDING' ? pending : requests

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-slate-900">変更申請管理</h1>
          <p className="text-sm text-slate-500">講師からの変更申請を審査・承認します</p>
        </div>
        {pending.length > 0 && (
          <div className="flex items-center gap-2 bg-amber-50 border border-amber-200 rounded-xl px-4 py-2">
            <AlertTriangle size={16} className="text-amber-600" />
            <span className="text-sm font-medium text-amber-700">未対応 {pending.length}件</span>
          </div>
        )}
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-slate-100 rounded-xl p-1 mb-6 w-fit">
        {([['PENDING', `未対応（${pending.length}件）`], ['ALL', '全て']] as const).map(([k, l]) => (
          <button key={k} onClick={() => setTab(k)}
            className={`px-5 py-2 rounded-lg text-sm font-medium transition-colors ${tab === k ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500'}`}>
            {l}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {list.map(req => {
          const type = TYPE_INFO[req.type] ?? { label: req.type, cls: 'bg-slate-100 text-slate-600' }
          const st = STATUS_INFO[req.status] ?? { label: req.status, icon: null, cls: 'text-slate-600' }
          return (
            <div key={req.id} className={`bg-white rounded-xl border shadow-sm ${req.status === 'PENDING' ? 'border-amber-200' : 'border-slate-200'}`}>
              <div className="p-5">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 flex-wrap mb-2">
                      <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${type.cls}`}>{type.label}</span>
                      <span className="font-semibold text-slate-800">{req.teacher}</span>
                      <span className="text-xs text-slate-400">申請日: {req.date}</span>
                    </div>
                    <p className="text-sm text-slate-700 mb-1">対象: {req.session}</p>
                    <p className="text-sm text-slate-600 mb-1">理由: {req.reason}</p>
                    {req.proposed && (
                      <p className="text-sm text-teal-700 bg-teal-50 px-2 py-1 rounded-lg inline-block">変更案: {req.proposed}</p>
                    )}
                  </div>
                  <div className="flex items-center gap-1.5 shrink-0">
                    {st.icon}
                    <span className={`text-sm font-medium ${st.cls}`}>{st.label}</span>
                  </div>
                </div>

                {req.status === 'PENDING' && (
                  <div className="flex items-center gap-2 mt-4 pt-3 border-t border-slate-100">
                    <button onClick={() => setReviewId(req.id)}
                      className="flex items-center gap-1.5 px-4 py-2 bg-teal-600 text-white text-sm rounded-xl hover:bg-teal-700 font-medium">
                      <CheckCircle size={14} />承認する
                    </button>
                    <button onClick={() => reject(req.id)}
                      className="flex items-center gap-1.5 px-4 py-2 border border-red-300 text-red-600 text-sm rounded-xl hover:bg-red-50">
                      <XCircle size={14} />却下する
                    </button>
                    <span className="text-xs text-slate-400 ml-2">※ 承認すると講師に通知が送られます</span>
                  </div>
                )}
              </div>
            </div>
          )
        })}

        {list.length === 0 && (
          <div className="text-center py-16 text-slate-400">
            <CheckCircle size={40} className="mx-auto mb-3 opacity-30" />
            <p>未対応の申請はありません</p>
          </div>
        )}
      </div>

      {/* Confirm modal */}
      {reviewId && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6">
            <h3 className="font-bold text-slate-900 mb-3">承認の確認</h3>
            <p className="text-sm text-slate-600 mb-3">この変更申請を承認します。講師・受講者へ自動通知されます。</p>
            <div>
              <label className="text-xs font-medium text-slate-600 block mb-1">コメント（任意）</label>
              <textarea value={reviewNote} onChange={e => setReviewNote(e.target.value)} rows={2}
                className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400"
                placeholder="承認コメント..." />
            </div>
            <div className="flex gap-2 mt-4">
              <button onClick={() => setReviewId(null)} className="flex-1 py-2.5 border border-slate-300 rounded-xl text-sm">戻る</button>
              <button onClick={() => approve(reviewId)} className="flex-1 py-2.5 bg-teal-600 text-white rounded-xl text-sm font-medium">承認する</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
