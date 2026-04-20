import Link from 'next/link'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { getLocale } from 'next-intl/server'
import { MEMBERSHIP_PLANS } from '@/lib/constants'
import { Check, X } from 'lucide-react'

const COMPARE_ROWS = [
  { feature: '月間クラス数', featureEn: 'Monthly Classes', values: ['無制限', '月8回', '月4回'] },
  { feature: '予約開始日', featureEn: 'Booking Opens', values: ['毎月10日', '毎月15日', '毎月20日'] },
  { feature: 'キャンセル待ち', featureEn: 'Waitlist', values: [true, true, false] },
  { feature: '優先キャンセル待ち', featureEn: 'Priority Waitlist', values: [true, false, false] },
  { feature: 'ワークショップ割引', featureEn: 'Workshop Discount', values: ['10%OFF', '5%OFF', false] },
  { feature: '専属サポート', featureEn: 'Dedicated Support', values: [true, false, false] },
  { feature: '振替制度', featureEn: 'Class Transfer', values: [true, true, false] },
  { feature: '体験から入会', featureEn: 'Trial to Join', values: [true, true, true] },
]

export default async function PlansPage() {
  const locale = await getLocale()
  const isJa = locale === 'ja'

  return (
    <>
      <Header locale={locale} />
      <div className="min-h-screen bg-slate-50">
        {/* Header */}
        <div className="bg-gradient-to-br from-teal-50 to-white py-16">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-3xl font-bold text-slate-900 mb-3">
              {isJa ? '会員プランを選ぶ' : 'Choose Your Plan'}
            </h1>
            <p className="text-slate-600 max-w-xl mx-auto">
              {isJa
                ? 'まずは体験レッスン（¥3,300）から。当日入会でキャッシュバック対象です。'
                : 'Start with a trial lesson (¥3,300). Cashback when you join on the same day.'}
            </p>
            <div className="mt-4">
              <Link href="/trial" className="inline-block px-6 py-2.5 bg-amber-500 text-white font-semibold rounded-xl hover:bg-amber-600 text-sm">
                🎁 {isJa ? 'まず体験レッスンを予約する' : 'Book a Trial Lesson First'}
              </Link>
            </div>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Plan cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-12">
            {MEMBERSHIP_PLANS.map((plan, i) => (
              <div key={plan.id} className={`bg-white rounded-2xl border-2 p-6 relative ${i === 0 ? 'border-teal-500 shadow-lg shadow-teal-100' : 'border-slate-200'}`}>
                {i === 0 && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-teal-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                    {isJa ? '人気No.1' : 'Most Popular'}
                  </span>
                )}
                <div className="mb-4">
                  <div className="w-10 h-10 rounded-xl mb-3 flex items-center justify-center text-white font-bold text-sm"
                    style={{ backgroundColor: plan.color }}>
                    {isJa ? plan.name[0] : plan.nameEn?.[0] ?? plan.name[0]}
                  </div>
                  <h2 className="text-xl font-bold text-slate-900">{isJa ? plan.name : plan.nameEn}</h2>
                  <div className="flex items-baseline gap-1 mt-1">
                    <span className="text-3xl font-bold text-slate-900">¥{plan.price.toLocaleString()}</span>
                    <span className="text-slate-500 text-sm">/{isJa ? '月' : 'mo'}</span>
                  </div>
                  <p className="text-xs text-slate-500 mt-1">
                    {isJa ? `毎月${plan.bookingOpenDay}日から予約開始` : `Booking opens on the ${plan.bookingOpenDay}th`}
                  </p>
                </div>
                <ul className="space-y-2.5 mb-6">
                  {(isJa ? plan.features : plan.featuresEn ?? plan.features).map((f, j) => (
                    <li key={j} className="flex items-start gap-2 text-sm text-slate-700">
                      <Check size={15} className="text-teal-600 shrink-0 mt-0.5" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link href="/auth/register" className={`block text-center py-3 rounded-xl font-semibold text-sm transition-all ${
                  i === 0 ? 'bg-teal-600 text-white hover:bg-teal-700' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}>
                  {isJa ? 'このプランで始める' : 'Get Started'}
                </Link>
              </div>
            ))}
          </div>

          {/* Comparison table */}
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-200">
              <h2 className="font-bold text-lg text-slate-900">{isJa ? '詳細比較' : 'Detailed Comparison'}</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50">
                    <th className="text-left px-6 py-3 text-sm font-semibold text-slate-600 w-2/5">{isJa ? '機能' : 'Feature'}</th>
                    {MEMBERSHIP_PLANS.map(plan => (
                      <th key={plan.id} className="text-center px-4 py-3 text-sm font-semibold" style={{ color: plan.color }}>
                        {isJa ? plan.name : plan.nameEn}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {COMPARE_ROWS.map((row, i) => (
                    <tr key={i} className={`border-b border-slate-100 ${i % 2 === 0 ? '' : 'bg-slate-50/50'}`}>
                      <td className="px-6 py-3.5 text-sm text-slate-700">{isJa ? row.feature : row.featureEn}</td>
                      {row.values.map((v, j) => (
                        <td key={j} className="px-4 py-3.5 text-center">
                          {typeof v === 'boolean' ? (
                            v ? <Check size={18} className="text-teal-600 mx-auto" /> : <X size={15} className="text-slate-300 mx-auto" />
                          ) : (
                            <span className="text-sm font-medium text-slate-700">{v}</span>
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Trial CTA */}
          <div className="mt-10 bg-gradient-to-r from-teal-600 to-teal-700 rounded-2xl p-8 text-white text-center">
            <h3 className="text-2xl font-bold mb-2">{isJa ? 'まずは体験から' : 'Start with a Trial'}</h3>
            <p className="text-teal-100 mb-4 text-sm">
              {isJa ? '¥3,300の体験レッスンを受けて、当日入会でキャッシュバック！' : '¥3,300 trial lesson — cashback if you join the same day!'}
            </p>
            <Link href="/trial" className="inline-block px-8 py-3 bg-white text-teal-700 font-bold rounded-xl hover:bg-teal-50">
              {isJa ? '体験レッスンを予約する →' : 'Book Trial Lesson →'}
            </Link>
          </div>
        </div>
      </div>
      <Footer locale={locale} />
    </>
  )
}
