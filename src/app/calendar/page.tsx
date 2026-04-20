'use client'

import { useState } from 'react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { ChevronLeft, ChevronRight, X, Users, Clock } from 'lucide-react'

const DAYS = ['日', '月', '火', '水', '木', '金', '土']

// Mock sessions for May 2025
const SESSIONS: Record<number, Array<{ id: string; title: string; time: string; teacher: string; booked: number; cap: number; type: string }>> = {
  5:  [{ id: 's1', title: '朝ヨガ', time: '07:00', teacher: '田中', booked: 8, cap: 12, type: 'yoga' }],
  6:  [{ id: 's2', title: 'ピラティス', time: '19:00', teacher: '山本', booked: 12, cap: 12, type: 'pilates' }],
  7:  [{ id: 's3', title: '骨盤ヨガ', time: '10:00', teacher: '田中', booked: 6, cap: 12, type: 'yoga' }],
  8:  [{ id: 's4', title: 'フローヨガ', time: '19:00', teacher: '鈴木', booked: 10, cap: 15, type: 'yoga' }],
  9:  [{ id: 's5', title: 'ランチヨガ', time: '12:00', teacher: '山本', booked: 5, cap: 10, type: 'yoga' }],
  10: [{ id: 's6', title: '週末瞑想', time: '09:00', teacher: '鈴木', booked: 7, cap: 10, type: 'meditation' },
       { id: 's7', title: 'パワーヨガ', time: '11:00', teacher: '田中', booked: 3, cap: 15, type: 'yoga' }],
  12: [{ id: 's8', title: '朝ヨガ', time: '07:00', teacher: '田中', booked: 9, cap: 12, type: 'yoga' }],
  13: [{ id: 's9', title: 'コアピラティス', time: '19:00', teacher: '山本', booked: 11, cap: 12, type: 'pilates' }],
  15: [{ id: 's10', title: 'フローヨガ', time: '19:00', teacher: '鈴木', booked: 8, cap: 15, type: 'yoga' }],
  17: [{ id: 's11', title: 'ワークショップ', time: '14:00', teacher: '田中', booked: 15, cap: 20, type: 'workshop' }],
  19: [{ id: 's12', title: '朝ヨガ', time: '07:00', teacher: '田中', booked: 7, cap: 12, type: 'yoga' }],
  20: [{ id: 's13', title: 'ピラティス', time: '19:00', teacher: '山本', booked: 5, cap: 12, type: 'pilates' }],
}

const TYPE_COLORS: Record<string, string> = {
  yoga: 'bg-teal-500',
  pilates: 'bg-purple-500',
  meditation: 'bg-green-500',
  workshop: 'bg-amber-500',
}

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate()
}
function getFirstDay(year: number, month: number) {
  return new Date(year, month, 1).getDay()
}

export default function CalendarPage() {
  const today = new Date()
  const [year, setYear] = useState(2025)
  const [month, setMonth] = useState(4) // May
  const [selected, setSelected] = useState<number | null>(null)
  const [bookingSession, setBookingSession] = useState<string | null>(null)

  const daysInMonth = getDaysInMonth(year, month)
  const firstDay = getFirstDay(year, month)
  const cells = Array(firstDay).fill(null).concat(Array.from({ length: daysInMonth }, (_, i) => i + 1))
  while (cells.length % 7 !== 0) cells.push(null)

  function prevMonth() {
    if (month === 0) { setMonth(11); setYear(y => y - 1) } else { setMonth(m => m - 1) }
    setSelected(null)
  }
  function nextMonth() {
    if (month === 11) { setMonth(0); setYear(y => y + 1) } else { setMonth(m => m + 1) }
    setSelected(null)
  }

  const selectedSessions = selected ? (SESSIONS[selected] ?? []) : []

  return (
    <>
      <Header />
      <div className="min-h-screen bg-slate-50">
        <div className="bg-white border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <h1 className="text-2xl font-bold text-slate-900 mb-1">カレンダー予約</h1>
            <p className="text-slate-500 text-sm">日付をクリックしてクラスを確認・予約できます</p>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Calendar */}
            <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
              {/* Nav */}
              <div className="flex items-center justify-between p-4 border-b border-slate-200">
                <button onClick={prevMonth} className="p-2 hover:bg-slate-100 rounded-lg"><ChevronLeft size={18} /></button>
                <h2 className="font-bold text-slate-900">{year}年{month + 1}月</h2>
                <button onClick={nextMonth} className="p-2 hover:bg-slate-100 rounded-lg"><ChevronRight size={18} /></button>
              </div>
              {/* Day headers */}
              <div className="grid grid-cols-7 border-b border-slate-200">
                {DAYS.map((d, i) => (
                  <div key={d} className={`py-2 text-center text-xs font-semibold ${i === 0 ? 'text-red-400' : i === 6 ? 'text-blue-400' : 'text-slate-500'}`}>{d}</div>
                ))}
              </div>
              {/* Dates */}
              <div className="grid grid-cols-7">
                {cells.map((day, i) => {
                  const hasSessions = day && SESSIONS[day]
                  const isToday = day === today.getDate() && month === today.getMonth() && year === today.getFullYear()
                  const isSelected = day === selected
                  const col = i % 7
                  return (
                    <div
                      key={i}
                      onClick={() => day && setSelected(day === selected ? null : day)}
                      className={`min-h-[72px] p-1.5 border-b border-r border-slate-100 cursor-pointer transition-colors
                        ${!day ? 'bg-slate-50' : ''}
                        ${isSelected ? 'bg-teal-50' : day ? 'hover:bg-slate-50' : ''}
                      `}
                    >
                      {day && (
                        <>
                          <span className={`inline-flex w-7 h-7 items-center justify-center rounded-full text-sm font-medium mb-1
                            ${isToday ? 'bg-teal-600 text-white' : col === 0 ? 'text-red-400' : col === 6 ? 'text-blue-400' : 'text-slate-700'}
                          `}>{day}</span>
                          {hasSessions && (
                            <div className="space-y-0.5">
                              {SESSIONS[day].slice(0, 2).map(s => (
                                <div key={s.id} className={`${TYPE_COLORS[s.type] ?? 'bg-slate-400'} text-white text-[10px] px-1 py-0.5 rounded truncate`}>
                                  {s.time} {s.title}
                                </div>
                              ))}
                              {SESSIONS[day].length > 2 && (
                                <div className="text-[10px] text-slate-400 pl-1">+{SESSIONS[day].length - 2}</div>
                              )}
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  )
                })}
              </div>
              {/* Legend */}
              <div className="flex flex-wrap gap-3 p-4 border-t border-slate-200">
                {[['yoga', 'ヨガ'], ['pilates', 'ピラティス'], ['meditation', '瞑想'], ['workshop', 'ワークショップ']].map(([k, l]) => (
                  <div key={k} className="flex items-center gap-1.5 text-xs text-slate-600">
                    <span className={`w-3 h-3 rounded-sm ${TYPE_COLORS[k]}`} />{l}
                  </div>
                ))}
              </div>
            </div>

            {/* Day detail */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm">
              <div className="p-4 border-b border-slate-200">
                <h3 className="font-bold text-slate-900">
                  {selected ? `${month + 1}月${selected}日のクラス` : 'クラスを選ぶ'}
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">日付をクリックしてください</p>
              </div>
              <div className="p-4">
                {!selected && (
                  <div className="text-center py-10 text-slate-300">
                    <div className="text-4xl mb-2">📅</div>
                    <p className="text-sm">カレンダーから日付を選んでください</p>
                  </div>
                )}
                {selected && selectedSessions.length === 0 && (
                  <div className="text-center py-10 text-slate-300">
                    <div className="text-4xl mb-2">🙅</div>
                    <p className="text-sm">この日はクラスがありません</p>
                  </div>
                )}
                {selected && selectedSessions.length > 0 && (
                  <div className="space-y-3">
                    {selectedSessions.map(s => {
                      const full = s.booked >= s.cap
                      return (
                        <div key={s.id} className="border border-slate-200 rounded-xl p-3">
                          <div className="flex items-center justify-between mb-2">
                            <span className={`text-white text-xs px-2 py-0.5 rounded-full ${TYPE_COLORS[s.type] ?? 'bg-slate-400'}`}>{s.type}</span>
                            <span className={`text-xs font-medium ${full ? 'text-red-600' : 'text-teal-600'}`}>
                              {full ? '満席' : `残${s.cap - s.booked}席`}
                            </span>
                          </div>
                          <p className="font-semibold text-slate-800 text-sm">{s.title}</p>
                          <div className="flex items-center gap-3 mt-1 text-xs text-slate-500">
                            <span className="flex items-center gap-1"><Clock size={11} />{s.time}</span>
                            <span className="flex items-center gap-1"><Users size={11} />{s.booked}/{s.cap}</span>
                          </div>
                          <p className="text-xs text-slate-400 mt-0.5">{s.teacher} 講師</p>
                          {full ? (
                            <button className="mt-2.5 w-full py-2 text-xs border border-slate-300 text-slate-500 rounded-lg hover:bg-slate-50">
                              キャンセル待ちに登録
                            </button>
                          ) : (
                            <button
                              onClick={() => setBookingSession(s.id)}
                              className="mt-2.5 w-full py-2 text-xs bg-teal-600 text-white rounded-lg hover:bg-teal-700 font-medium"
                            >
                              予約する
                            </button>
                          )}
                        </div>
                      )
                    })}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Booking modal */}
      {bookingSession && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-slate-900">予約の確認</h3>
              <button onClick={() => setBookingSession(null)} className="text-slate-400 hover:text-slate-600"><X size={18} /></button>
            </div>
            <p className="text-sm text-slate-600 mb-4">ログインが必要です。ログインして予約を完了してください。</p>
            <div className="space-y-2">
              <a href="/auth/login" className="block w-full text-center py-2.5 bg-teal-600 text-white rounded-xl text-sm font-medium hover:bg-teal-700">
                ログインして予約
              </a>
              <a href="/auth/register" className="block w-full text-center py-2.5 border border-slate-300 text-slate-700 rounded-xl text-sm hover:bg-slate-50">
                新規登録
              </a>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </>
  )
}
