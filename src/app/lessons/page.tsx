'use client'

import { useState } from 'react'
import Link from 'next/link'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { Search, SlidersHorizontal, Calendar, Clock, Users } from 'lucide-react'

const MOCK_LESSONS = [
  { id: '1', title: '朝ヨガ', type: 'yoga', day: '月', time: '07:00', duration: 60, teacher: '田中 さくら', booked: 8, cap: 12, level: '初級〜中級', bookingOpenDay: { gold: 10, regular: 15 } },
  { id: '2', title: 'ピラティス基礎', type: 'pilates', day: '火', time: '19:00', duration: 60, teacher: '山本 リナ', booked: 12, cap: 12, level: '初級', bookingOpenDay: { gold: 10, regular: 15 } },
  { id: '3', title: '骨盤ヨガ', type: 'yoga', day: '水', time: '10:00', duration: 75, teacher: '田中 さくら', booked: 6, cap: 12, level: '全レベル', bookingOpenDay: { gold: 10, regular: 15 } },
  { id: '4', title: 'フローヨガ', type: 'yoga', day: '木', time: '19:00', duration: 60, teacher: '鈴木 ハル', booked: 10, cap: 15, level: '中級', bookingOpenDay: { gold: 10, regular: 15 } },
  { id: '5', title: 'ランチヨガ', type: 'yoga', day: '金', time: '12:00', duration: 45, teacher: '山本 リナ', booked: 5, cap: 10, level: '初級', bookingOpenDay: { gold: 10, regular: 15 } },
  { id: '6', title: '週末瞑想', type: 'meditation', day: '土', time: '09:00', duration: 60, teacher: '鈴木 ハル', booked: 7, cap: 10, level: '全レベル', bookingOpenDay: { gold: 10, regular: 15 } },
  { id: '7', title: 'パワーヨガ', type: 'yoga', day: '土', time: '11:00', duration: 75, teacher: '田中 さくら', booked: 3, cap: 15, level: '中〜上級', bookingOpenDay: { gold: 10, regular: 15 } },
  { id: '8', title: 'コアピラティス', type: 'pilates', day: '日', time: '10:00', duration: 60, teacher: '山本 リナ', booked: 9, cap: 12, level: '初〜中級', bookingOpenDay: { gold: 10, regular: 15 } },
]

const TYPE_LABELS: Record<string, { ja: string; color: string; bg: string }> = {
  yoga:      { ja: 'ヨガ',         color: 'text-teal-700',   bg: 'bg-teal-100' },
  pilates:   { ja: 'ピラティス',   color: 'text-purple-700', bg: 'bg-purple-100' },
  meditation:{ ja: '瞑想',        color: 'text-green-700',  bg: 'bg-green-100' },
  workshop:  { ja: 'ワークショップ', color: 'text-amber-700', bg: 'bg-amber-100' },
}

const DAY_ORDER = ['月', '火', '水', '木', '金', '土', '日']

export default function LessonsPage() {
  const [search, setSearch] = useState('')
  const [filterType, setFilterType] = useState('all')
  const [filterDay, setFilterDay] = useState('all')
  const [showFilter, setShowFilter] = useState(false)

  const filtered = MOCK_LESSONS.filter(l => {
    if (search && !l.title.includes(search) && !l.teacher.includes(search)) return false
    if (filterType !== 'all' && l.type !== filterType) return false
    if (filterDay !== 'all' && l.day !== filterDay) return false
    return true
  })

  return (
    <>
      <Header />
      <div className="min-h-screen bg-slate-50">
        {/* Page header */}
        <div className="bg-white border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <h1 className="text-2xl font-bold text-slate-900 mb-1">クラス一覧</h1>
            <p className="text-slate-500 text-sm">定期開催クラスの一覧です。ログインして予約できます。</p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Search & Filter */}
          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            <div className="relative flex-1">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text" value={search} onChange={e => setSearch(e.target.value)}
                placeholder="クラス名・講師名で検索..."
                className="w-full pl-9 pr-4 py-2.5 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-400 bg-white"
              />
            </div>
            <button onClick={() => setShowFilter(!showFilter)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border text-sm font-medium transition-colors ${showFilter ? 'bg-teal-600 text-white border-teal-600' : 'bg-white border-slate-300 text-slate-700 hover:border-teal-400'}`}>
              <SlidersHorizontal size={15} />絞り込み
            </button>
          </div>

          {/* Filters */}
          {showFilter && (
            <div className="bg-white border border-slate-200 rounded-xl p-4 mb-6 flex flex-wrap gap-4">
              <div>
                <p className="text-xs font-semibold text-slate-500 mb-2">クラスタイプ</p>
                <div className="flex flex-wrap gap-2">
                  {['all', 'yoga', 'pilates', 'meditation', 'workshop'].map(t => (
                    <button key={t} onClick={() => setFilterType(t)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${filterType === t ? 'bg-teal-600 text-white border-teal-600' : 'bg-white border-slate-200 text-slate-600 hover:border-teal-400'}`}>
                      {t === 'all' ? 'すべて' : TYPE_LABELS[t]?.ja ?? t}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-500 mb-2">曜日</p>
                <div className="flex flex-wrap gap-2">
                  {['all', ...DAY_ORDER].map(d => (
                    <button key={d} onClick={() => setFilterDay(d)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${filterDay === d ? 'bg-teal-600 text-white border-teal-600' : 'bg-white border-slate-200 text-slate-600 hover:border-teal-400'}`}>
                      {d === 'all' ? 'すべて' : `${d}曜`}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Booking opening notice */}
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6 text-sm">
            <p className="font-semibold text-amber-800 mb-1">📅 予約開始日について</p>
            <p className="text-amber-700">ゴールド会員：毎月 <strong>10日</strong>から予約可能　／　レギュラー会員：毎月 <strong>15日</strong>から予約可能</p>
          </div>

          {/* Results */}
          <p className="text-sm text-slate-500 mb-4">{filtered.length}件のクラス</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map(lesson => {
              const ratio = lesson.booked / lesson.cap
              const full = ratio >= 1
              const typeInfo = TYPE_LABELS[lesson.type] ?? { ja: lesson.type, color: 'text-slate-600', bg: 'bg-slate-100' }
              return (
                <div key={lesson.id} className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5">
                  <div className="flex items-start justify-between mb-3">
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${typeInfo.bg} ${typeInfo.color}`}>{typeInfo.ja}</span>
                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                      full ? 'bg-red-100 text-red-600' :
                      ratio >= 0.8 ? 'bg-amber-100 text-amber-700' :
                      'bg-teal-100 text-teal-700'
                    }`}>
                      {full ? '満席' : ratio >= 0.8 ? `残${lesson.cap - lesson.booked}席` : '予約可'}
                    </span>
                  </div>
                  <h3 className="font-bold text-lg text-slate-800 mb-1">{lesson.title}</h3>
                  <p className="text-sm text-slate-500 mb-3">{lesson.teacher} 講師</p>
                  <div className="space-y-1.5 mb-4">
                    <div className="flex items-center gap-2 text-xs text-slate-600">
                      <Calendar size={13} className="text-slate-400" />
                      <span>毎週{lesson.day}曜日</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-slate-600">
                      <Clock size={13} className="text-slate-400" />
                      <span>{lesson.time}〜（{lesson.duration}分）</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-slate-600">
                      <Users size={13} className="text-slate-400" />
                      <span>{lesson.booked}/{lesson.cap}人 ／ {lesson.level}</span>
                    </div>
                  </div>
                  <div className="mb-4">
                    <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                      <span>空き状況</span><span>{lesson.booked}/{lesson.cap}</span>
                    </div>
                    <div className="bg-slate-100 rounded-full h-1.5">
                      <div className={`h-1.5 rounded-full ${full ? 'bg-red-400' : ratio >= 0.8 ? 'bg-amber-400' : 'bg-teal-500'}`}
                        style={{ width: `${Math.min(ratio * 100, 100)}%` }} />
                    </div>
                  </div>
                  {full ? (
                    <button className="w-full py-2.5 border border-slate-300 text-slate-500 text-sm rounded-xl hover:bg-slate-50">
                      キャンセル待ちに登録
                    </button>
                  ) : (
                    <Link href="/auth/login" className="block w-full text-center py-2.5 bg-teal-600 text-white text-sm font-medium rounded-xl hover:bg-teal-700">
                      予約する
                    </Link>
                  )}
                </div>
              )
            })}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-16 text-slate-400">
              <p className="text-3xl mb-3">🔍</p>
              <p className="font-medium">条件に合うクラスが見つかりませんでした</p>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  )
}
