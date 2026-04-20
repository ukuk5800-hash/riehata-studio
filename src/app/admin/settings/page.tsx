'use client'

import { useState } from 'react'
import { Save, AlertCircle } from 'lucide-react'

export default function SettingsPage() {
  const [saved, setSaved] = useState(false)
  const [studioSettings, setStudioSettings] = useState({
    name: 'RIEHATA Studio',
    email: 'info@RIEHATA-studio.com',
    address: '東京都渋谷区〇〇町1-2-3',
    phone: '03-0000-0000',
    timezone: 'Asia/Tokyo',
    currency: 'JPY',
    locale: 'ja',
  })
  const [bookingSettings, setBookingSettings] = useState({
    goldOpenDay: 10,
    regularOpenDay: 15,
    lightOpenDay: 20,
    cancelDeadlineHours: 24,
    maxWaitlistPerClass: 5,
    trialPrice: 3300,
    cashbackAmount: 3300,
  })

  function save() {
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  function setSS(k: string) { return (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => setStudioSettings(s => ({ ...s, [k]: e.target.value })) }
  function setBS(k: string) { return (e: React.ChangeEvent<HTMLInputElement>) => setBookingSettings(s => ({ ...s, [k]: +e.target.value })) }

  return (
    <div className="p-6 max-w-3xl space-y-6">
      <div>
        <h1 className="text-xl font-bold text-slate-900">設定</h1>
        <p className="text-sm text-slate-500">スタジオ基本情報・予約ルールを設定します</p>
      </div>

      {saved && (
        <div className="bg-teal-50 border border-teal-200 text-teal-800 rounded-xl px-4 py-3 flex items-center gap-2 text-sm">
          <Save size={14} />設定を保存しました
        </div>
      )}

      {/* Studio info */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
        <div className="px-5 py-4 border-b border-slate-200">
          <h2 className="font-bold text-slate-900">スタジオ基本情報</h2>
        </div>
        <div className="p-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            ['スタジオ名', 'name', 'text'],
            ['メールアドレス', 'email', 'email'],
            ['住所', 'address', 'text'],
            ['電話番号（任意）', 'phone', 'tel'],
          ].map(([label, key, type]) => (
            <div key={key}>
              <label className="text-xs font-medium text-slate-600 block mb-1">{label}</label>
              <input type={type} value={studioSettings[key as keyof typeof studioSettings]} onChange={setSS(key)}
                className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400" />
            </div>
          ))}
          <div>
            <label className="text-xs font-medium text-slate-600 block mb-1">タイムゾーン</label>
            <select value={studioSettings.timezone} onChange={setSS('timezone')}
              className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400">
              <option value="Asia/Tokyo">Asia/Tokyo (JST)</option>
              <option value="UTC">UTC</option>
              <option value="America/New_York">America/New_York (EST)</option>
            </select>
          </div>
          <div>
            <label className="text-xs font-medium text-slate-600 block mb-1">デフォルト言語</label>
            <select value={studioSettings.locale} onChange={setSS('locale')}
              className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400">
              <option value="ja">日本語</option>
              <option value="en">English</option>
            </select>
          </div>
        </div>
      </div>

      {/* Booking rules */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
        <div className="px-5 py-4 border-b border-slate-200">
          <h2 className="font-bold text-slate-900">予約ルール設定</h2>
          <p className="text-xs text-slate-500 mt-0.5">各会員プランの予約開始日・ルールを設定します</p>
        </div>
        <div className="p-5 space-y-4">
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
            <div className="flex items-start gap-2">
              <AlertCircle size={15} className="text-amber-600 mt-0.5 shrink-0" />
              <p className="text-xs text-amber-800">予約開始日を変更した場合、次月から反映されます。既存の予約には影響しません。</p>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4">
            {[
              ['ゴールド会員 予約開始日', 'goldOpenDay', '#D4AF37'],
              ['レギュラー会員 予約開始日', 'regularOpenDay', '#0d9488'],
              ['ライト会員 予約開始日', 'lightOpenDay', '#6366f1'],
            ].map(([label, key, color]) => (
              <div key={key}>
                <label className="text-xs font-medium text-slate-600 block mb-1">{label}</label>
                <div className="relative">
                  <input type="number" min={1} max={28} value={bookingSettings[key as keyof typeof bookingSettings]} onChange={setBS(key)}
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 pr-8"
                    style={{ borderColor: color as string }} />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400">日</span>
                </div>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              ['キャンセル受付期限（時間前）', 'cancelDeadlineHours'],
              ['キャンセル待ち最大人数', 'maxWaitlistPerClass'],
            ].map(([label, key]) => (
              <div key={key}>
                <label className="text-xs font-medium text-slate-600 block mb-1">{label}</label>
                <input type="number" value={bookingSettings[key as keyof typeof bookingSettings]} onChange={setBS(key)}
                  className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Trial settings */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
        <div className="px-5 py-4 border-b border-slate-200">
          <h2 className="font-bold text-slate-900">体験レッスン設定</h2>
        </div>
        <div className="p-5 grid grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-medium text-slate-600 block mb-1">体験レッスン料金（円）</label>
            <input type="number" value={bookingSettings.trialPrice} onChange={setBS('trialPrice')}
              className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400" />
          </div>
          <div>
            <label className="text-xs font-medium text-slate-600 block mb-1">当日入会キャッシュバック額（円）</label>
            <input type="number" value={bookingSettings.cashbackAmount} onChange={setBS('cashbackAmount')}
              className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400" />
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button onClick={save} className="flex items-center gap-2 px-6 py-2.5 bg-teal-600 text-white rounded-xl text-sm font-medium hover:bg-teal-700">
          <Save size={14} />設定を保存する
        </button>
      </div>
    </div>
  )
}
