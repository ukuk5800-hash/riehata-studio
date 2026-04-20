'use client'

import { useState } from 'react'
import Link from 'next/link'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { TRIAL_PRICE, CASHBACK_AMOUNT } from '@/lib/constants'

const TRIAL_SLOTS = [
  { date: '2025年5月12日(月)', time: '10:00〜11:00', spots: 3 },
  { date: '2025年5月13日(火)', time: '19:00〜20:00', spots: 2 },
  { date: '2025年5月14日(水)', time: '10:00〜11:00', spots: 4 },
  { date: '2025年5月15日(木)', time: '19:00〜20:00', spots: 1 },
  { date: '2025年5月17日(土)', time: '09:00〜10:00', spots: 3 },
  { date: '2025年5月18日(日)', time: '10:00〜11:00', spots: 5 },
]

const STEPS = [
  { icon: '📋', title: '申し込み', desc: 'フォームから希望日時を選んで予約。メールアドレスだけでOK。電話番号は不要です。' },
  { icon: '🧘', title: '体験レッスン', desc: 'スタジオへお越しください。動きやすい服装でどうぞ。マットはこちらで用意します。' },
  { icon: '💬', title: '入会相談', desc: 'レッスン後に講師・スタッフにご相談を。当日ご入会で体験料¥3,300をキャッシュバック！' },
]

const FAQ = [
  { q: '体験レッスンとは何ですか？', a: '実際のクラスを体験できるレッスンです。初めての方でも安心してご参加いただけます。' },
  { q: '持ち物は何が必要ですか？', a: '動きやすい服装でお越しください。ヨガマット・タオルはスタジオで無料貸し出しします。' },
  { q: 'キャッシュバックはいつ適用されますか？', a: '体験当日にスタッフへお申し出の上、入会手続きを完了した方が対象です。' },
  { q: '電話番号は必須ですか？', a: 'いいえ。電話番号は一切不要です。メールアドレスだけで予約・登録できます。' },
  { q: '海外在住でも参加できますか？', a: 'もちろんです。国籍・居住地を問わず参加いただけます。英語での対応も可能です。' },
]

export default function TrialPage() {
  const [selected, setSelected] = useState<number | null>(null)
  const [step, setStep] = useState<'select' | 'form' | 'done'>('select')
  const [form, setForm] = useState({ name: '', email: '', note: '' })
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStep('done')
  }

  return (
    <>
      <Header />
      {/* Hero */}
      <section className="bg-gradient-to-br from-amber-50 via-white to-teal-50 py-16 lg:py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block bg-amber-100 text-amber-700 text-xs font-bold px-4 py-1.5 rounded-full mb-5 tracking-wide">
            🎁 期間限定キャンペーン
          </span>
          <h1 className="text-4xl lg:text-5xl font-bold text-slate-900 leading-tight mb-5">
            まずは体験から<br />
            <span className="text-teal-600">始めませんか？</span>
          </h1>
          <p className="text-lg text-slate-600 mb-6 max-w-xl mx-auto leading-relaxed">
            初めての方でも安心。経験豊富な講師と、自分のペースで体験できます。
          </p>

          {/* Price highlight */}
          <div className="inline-flex flex-col items-center bg-white rounded-2xl shadow-lg border border-amber-200 px-10 py-6 mb-8">
            <p className="text-slate-500 text-sm mb-1">体験レッスン料金</p>
            <p className="text-5xl font-bold text-slate-900 mb-2">
              ¥{TRIAL_PRICE.toLocaleString()}<span className="text-xl text-slate-400">（税込）</span>
            </p>
            <div className="bg-amber-500 text-white text-sm font-bold px-4 py-2 rounded-xl">
              🎁 当日入会で ¥{CASHBACK_AMOUNT.toLocaleString()} キャッシュバック！
            </div>
            <p className="text-xs text-slate-400 mt-2">※電話番号不要 ／ メールアドレスだけで予約OK</p>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-slate-900 text-center mb-10">体験の流れ</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {STEPS.map((s, i) => (
              <div key={i} className="text-center">
                <div className="relative inline-flex items-center justify-center w-16 h-16 bg-teal-50 rounded-full text-3xl mb-4">
                  {s.icon}
                  <span className="absolute -top-1 -right-1 w-6 h-6 bg-teal-600 text-white text-xs rounded-full flex items-center justify-center font-bold">
                    {i + 1}
                  </span>
                </div>
                <h3 className="font-bold text-slate-800 mb-2">{s.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Booking */}
      <section className="py-16 bg-slate-50" id="booking">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-slate-900 text-center mb-8">体験レッスンを予約する</h2>

          {step === 'done' ? (
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-10 text-center">
              <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center text-3xl mx-auto mb-4">✅</div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">予約が完了しました！</h3>
              <p className="text-slate-600 mb-6">確認メールをお送りしました。ご来館をお待ちしております。</p>
              <Link href="/" className="px-6 py-3 bg-teal-600 text-white rounded-xl font-medium hover:bg-teal-700">
                トップへ戻る
              </Link>
            </div>
          ) : step === 'form' && selected !== null ? (
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
              <button onClick={() => setStep('select')} className="flex items-center gap-1 text-sm text-slate-500 hover:text-slate-700 mb-6">
                ← 日時を選び直す
              </button>
              <div className="bg-teal-50 rounded-xl p-4 mb-6">
                <p className="text-sm font-semibold text-teal-800">選択中の日時</p>
                <p className="text-teal-700">{TRIAL_SLOTS[selected].date} {TRIAL_SLOTS[selected].time}</p>
              </div>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">お名前 <span className="text-red-500">*</span></label>
                  <input required type="text" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
                    className="w-full border border-slate-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400" placeholder="山田 太郎" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">メールアドレス <span className="text-red-500">*</span></label>
                  <input required type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })}
                    className="w-full border border-slate-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400" placeholder="your@email.com" />
                  <p className="text-xs text-slate-400 mt-1">電話番号は不要です</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">ご要望・ご質問（任意）</label>
                  <textarea value={form.note} onChange={e => setForm({ ...form, note: e.target.value })}
                    rows={3} className="w-full border border-slate-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400" placeholder="気になることがあればお書きください..." />
                </div>
                <button type="submit" className="w-full py-3.5 bg-teal-600 text-white font-semibold rounded-xl hover:bg-teal-700 text-sm">
                  予約を確定する（¥{TRIAL_PRICE.toLocaleString()}）
                </button>
                <p className="text-xs text-slate-400 text-center">※決済はモックです。実運用時はStripeで対応します。</p>
              </form>
            </div>
          ) : (
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
              <p className="text-sm font-semibold text-slate-700 mb-4">ご希望の日時を選んでください</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                {TRIAL_SLOTS.map((slot, i) => (
                  <button
                    key={i}
                    onClick={() => setSelected(i)}
                    className={`p-4 rounded-xl border text-left transition-all ${selected === i ? 'border-teal-500 bg-teal-50 ring-2 ring-teal-300' : 'border-slate-200 hover:border-teal-300 hover:bg-teal-50'}`}
                  >
                    <p className="font-semibold text-slate-800 text-sm">{slot.date}</p>
                    <p className="text-teal-600 text-sm">{slot.time}</p>
                    <p className="text-xs text-slate-400 mt-1">残{slot.spots}席</p>
                  </button>
                ))}
              </div>
              <button
                onClick={() => selected !== null && setStep('form')}
                disabled={selected === null}
                className="w-full py-3.5 bg-teal-600 text-white font-semibold rounded-xl hover:bg-teal-700 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                この日時で申し込む →
              </button>
            </div>
          )}
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-slate-900 text-center mb-8">よくある質問</h2>
          <div className="space-y-2">
            {FAQ.map((f, i) => (
              <div key={i} className="border border-slate-200 rounded-xl overflow-hidden">
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-slate-50">
                  <span className="font-medium text-slate-800 text-sm">{f.q}</span>
                  <span className="text-slate-400 ml-2 shrink-0">{openFaq === i ? '▲' : '▼'}</span>
                </button>
                {openFaq === i && (
                  <div className="px-5 pb-4 text-sm text-slate-600 leading-relaxed bg-slate-50">{f.a}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
