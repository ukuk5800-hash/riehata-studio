'use client'

import { useState } from 'react'
import { CheckCircle2, Send, Sparkles } from 'lucide-react'

type Interpretation = {
  actionType: string
  confidence: number
  summary: string
  candidates: string[]
  requiresConfirmation: boolean
}

type ExecutionResponse = {
  ok: boolean
  result?: { message: string; logs: string[] }
}

const EXAMPLES = [
  '来月の木曜19時クラスを増やして',
  '4月15日のリエさんクラスを休講にして振替候補を出して',
  'ゴールド会員向けに先行予約を3日早めて',
  '体験レッスンLPにキャッシュバック訴求をもっと大きく表示して',
  'ワークショップを5月3日15時で追加して',
]

export default function AssistantPage() {
  const [input, setInput] = useState('')
  const [busy, setBusy] = useState(false)
  const [interpretation, setInterpretation] = useState<Interpretation | null>(null)
  const [executionMessage, setExecutionMessage] = useState('')
  const [executionLogs, setExecutionLogs] = useState<string[]>([])

  async function interpret() {
    if (!input.trim()) return
    setBusy(true)
    setExecutionMessage('')
    const res = await fetch('/api/admin/assistant', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ command: input }),
    })
    const data = await res.json()
    setInterpretation(data.interpretation ?? null)
    setBusy(false)
  }

  async function execute() {
    if (!input.trim() || !interpretation) return
    setBusy(true)
    const res = await fetch('/api/admin/assistant', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ command: input, execute: true }),
    })
    const data = (await res.json()) as ExecutionResponse
    setExecutionMessage(data.result?.message ?? '実行結果を取得できませんでした。')
    setExecutionLogs(data.result?.logs ?? [])
    setBusy(false)
  }

  return (
    <div className="p-6 space-y-6">
      <section className="bg-white border border-slate-200 rounded-2xl p-5">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white">
            <Sparkles size={18} />
          </div>
          <div>
            <h1 className="font-bold text-slate-900">AI業務アシスタント（チャット主導）</h1>
            <p className="text-sm text-slate-500">自然文を解釈して「実行候補 → 実行確認 → 実行ログ」まで操作できます。</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2 mb-3">
          {EXAMPLES.map((example) => (
            <button
              key={example}
              onClick={() => setInput(example)}
              className="text-xs px-3 py-1.5 rounded-full bg-slate-100 hover:bg-indigo-100 text-slate-700"
            >
              {example}
            </button>
          ))}
        </div>
        <div className="flex gap-2">
          <input
            value={input}
            onChange={(event) => setInput(event.target.value)}
            placeholder="例: 来月の木曜19時クラスを増やして"
            className="flex-1 border border-slate-300 rounded-xl px-4 py-2.5 text-sm"
          />
          <button
            onClick={interpret}
            disabled={busy || !input.trim()}
            className="px-4 py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-semibold disabled:opacity-50 inline-flex items-center gap-2"
          >
            <Send size={14} />
            解釈する
          </button>
        </div>
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <article className="bg-white border border-slate-200 rounded-2xl p-5">
          <h2 className="text-sm font-bold text-slate-800 mb-3">解釈結果</h2>
          {!interpretation && <p className="text-sm text-slate-500">まだ解釈結果がありません。</p>}
          {interpretation && (
            <div className="space-y-2 text-sm">
              <p className="text-slate-700">{interpretation.summary}</p>
              <p className="text-slate-500">コマンド種別: {interpretation.actionType}</p>
              <p className="text-slate-500">信頼度: {(interpretation.confidence * 100).toFixed(0)}%</p>
            </div>
          )}
        </article>
        <article className="bg-white border border-slate-200 rounded-2xl p-5">
          <h2 className="text-sm font-bold text-slate-800 mb-3">実行候補</h2>
          {!interpretation?.candidates?.length && <p className="text-sm text-slate-500">候補はまだありません。</p>}
          <ul className="space-y-2">
            {interpretation?.candidates?.map((candidate) => (
              <li key={candidate} className="text-sm text-slate-700">
                - {candidate}
              </li>
            ))}
          </ul>
          <button
            onClick={execute}
            disabled={busy || !interpretation || interpretation.actionType === 'UNKNOWN'}
            className="mt-4 w-full bg-emerald-600 text-white py-2.5 rounded-xl text-sm font-semibold disabled:opacity-50"
          >
            実行確認して反映する
          </button>
        </article>
      </section>

      <section className="bg-white border border-slate-200 rounded-2xl p-5">
        <h2 className="text-sm font-bold text-slate-800 mb-3">実行ログ</h2>
        {executionMessage && (
          <p className="text-sm text-emerald-700 mb-2 inline-flex items-center gap-1">
            <CheckCircle2 size={14} />
            {executionMessage}
          </p>
        )}
        <div className="bg-slate-50 rounded-xl p-3 text-xs text-slate-600 space-y-1 min-h-24">
          {executionLogs.length === 0 && <p>ログはまだありません。</p>}
          {executionLogs.map((log) => (
            <p key={log}>{log}</p>
          ))}
        </div>
      </section>
    </div>
  )
}
