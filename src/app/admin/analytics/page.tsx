import { TrendingUp, Users, ShoppingBag, ArrowUpRight } from 'lucide-react'

const UTM_DATA = [
  { source: 'Instagram', count: 148, pct: 38, conversions: 42, rate: '28.4%', revenue: 5040000, color: 'bg-pink-500' },
  { source: 'Google', count: 92, pct: 24, conversions: 31, rate: '33.7%', revenue: 3720000, color: 'bg-blue-500' },
  { source: '友人紹介', count: 67, pct: 17, conversions: 28, rate: '41.8%', revenue: 3360000, color: 'bg-green-500' },
  { source: 'ダイレクト', count: 52, pct: 13, conversions: 15, rate: '28.8%', revenue: 1800000, color: 'bg-slate-400' },
  { source: 'LINE', count: 22, pct: 6, conversions: 6, rate: '27.3%', revenue: 720000, color: 'bg-teal-500' },
  { source: 'その他', count: 7, pct: 2, conversions: 1, rate: '14.3%', revenue: 120000, color: 'bg-slate-300' },
]

const MONTHLY = [
  { month: '12月', trials: 18, conversions: 8, revenue: 960000 },
  { month: '1月', trials: 24, conversions: 12, revenue: 1440000 },
  { month: '2月', trials: 22, conversions: 10, revenue: 1200000 },
  { month: '3月', trials: 31, conversions: 16, revenue: 1920000 },
  { month: '4月', trials: 38, conversions: 19, revenue: 2280000 },
  { month: '5月', trials: 14, conversions: 8, revenue: 960000 },
]

const CAMPAIGN_DATA = [
  { name: '体験¥3,300 当日入会キャッシュバック', trials: 198, conversions: 89, rate: '44.9%', revenue: 10680000 },
  { name: '友人紹介キャンペーン', trials: 45, conversions: 28, rate: '62.2%', revenue: 3360000 },
  { name: '春の特別割引', trials: 32, conversions: 14, rate: '43.8%', revenue: 1680000 },
]

function HBar({ pct, color }: { pct: number; color: string }) {
  return (
    <div className="w-full bg-slate-100 rounded-full h-2">
      <div className={`${color} h-2 rounded-full`} style={{ width: `${pct}%` }} />
    </div>
  )
}

export default function AnalyticsPage() {
  const totalTrials = UTM_DATA.reduce((a, b) => a + b.count, 0)
  const totalConversions = UTM_DATA.reduce((a, b) => a + b.conversions, 0)
  const conversionRate = ((totalConversions / totalTrials) * 100).toFixed(1)
  const totalRevenue = UTM_DATA.reduce((a, b) => a + b.revenue, 0)

  const maxMonthly = Math.max(...MONTHLY.map(m => m.revenue))

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-xl font-bold text-slate-900">流入元分析</h1>
        <p className="text-sm text-slate-500">UTMパラメータ・体験→入会の転換率・キャンペーン成果</p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: '体験申込み合計', value: totalTrials, sub: '直近6ヶ月', icon: Users, color: 'text-indigo-600', bg: 'bg-indigo-50' },
          { label: '体験→入会転換数', value: totalConversions, sub: `転換率 ${conversionRate}%`, icon: ArrowUpRight, color: 'text-teal-600', bg: 'bg-teal-50' },
          { label: '転換率', value: `${conversionRate}%`, sub: '体験→有料会員', icon: TrendingUp, color: 'text-green-600', bg: 'bg-green-50' },
          { label: '流入経由売上', value: `¥${(totalRevenue / 10000).toFixed(0)}万`, sub: '会員費累計', icon: ShoppingBag, color: 'text-amber-600', bg: 'bg-amber-50' },
        ].map(k => (
          <div key={k.label} className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
            <div className={`w-10 h-10 ${k.bg} rounded-lg flex items-center justify-center mb-3`}>
              <k.icon size={18} className={k.color} />
            </div>
            <p className="text-2xl font-bold text-slate-900">{k.value}</p>
            <p className="text-xs text-slate-500 mt-0.5">{k.label}</p>
            <p className="text-xs text-slate-400">{k.sub}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* UTM Sources */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
          <h2 className="font-bold text-slate-900 mb-4">流入元別 体験申込み数</h2>
          <div className="space-y-3">
            {UTM_DATA.map(d => (
              <div key={d.source}>
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <span className={`w-3 h-3 rounded-sm ${d.color}`} />
                    <span className="text-sm font-medium text-slate-700">{d.source}</span>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-slate-500">
                    <span>{d.count}件</span>
                    <span className="text-teal-600 font-medium">転換率 {d.rate}</span>
                  </div>
                </div>
                <HBar pct={d.pct} color={d.color} />
              </div>
            ))}
          </div>
        </div>

        {/* Monthly revenue chart */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
          <h2 className="font-bold text-slate-900 mb-4">月別 体験・転換推移</h2>
          <div className="space-y-2">
            {MONTHLY.map(m => (
              <div key={m.month} className="flex items-center gap-3">
                <span className="text-xs text-slate-500 w-8 shrink-0">{m.month}</span>
                <div className="flex-1">
                  <div className="flex gap-1 mb-0.5">
                    <div className="bg-slate-200 rounded-sm h-4" style={{ width: `${(m.trials / 40) * 100}%` }}>
                      <span className="text-[10px] text-slate-600 px-1">{m.trials}</span>
                    </div>
                    <div className="bg-teal-400 rounded-sm h-4" style={{ width: `${(m.conversions / 40) * 100}%` }}>
                      <span className="text-[10px] text-white px-1">{m.conversions}</span>
                    </div>
                  </div>
                  <div className="bg-amber-400 rounded-sm h-2" style={{ width: `${(m.revenue / maxMonthly) * 100}%` }} />
                </div>
                <span className="text-xs text-slate-500 w-14 text-right">¥{(m.revenue / 10000).toFixed(0)}万</span>
              </div>
            ))}
          </div>
          <div className="flex gap-4 mt-3 pt-3 border-t border-slate-100">
            {[['bg-slate-200', '体験申込'], ['bg-teal-400', '転換'], ['bg-amber-400', '売上']].map(([c, l]) => (
              <div key={l} className="flex items-center gap-1.5 text-xs text-slate-500">
                <span className={`w-3 h-3 rounded-sm ${c}`} />{l}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Campaign performance */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
        <div className="px-5 py-4 border-b border-slate-200">
          <h2 className="font-bold text-slate-900">キャンペーン別成果</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                {['キャンペーン', '体験申込', '転換数', '転換率', '貢献売上'].map(h => (
                  <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {CAMPAIGN_DATA.map((c, i) => (
                <tr key={i} className="hover:bg-slate-50">
                  <td className="px-4 py-3.5 text-sm font-medium text-slate-800">{c.name}</td>
                  <td className="px-4 py-3.5 text-sm text-slate-700">{c.trials}件</td>
                  <td className="px-4 py-3.5 text-sm text-slate-700">{c.conversions}名</td>
                  <td className="px-4 py-3.5">
                    <span className="text-sm font-semibold text-teal-700">{c.rate}</span>
                  </td>
                  <td className="px-4 py-3.5 text-sm font-semibold text-slate-800">
                    ¥{(c.revenue / 10000).toFixed(0)}万
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* How UTM works */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-5">
        <h3 className="font-semibold text-blue-900 mb-2">📊 UTMパラメータの使い方</h3>
        <p className="text-sm text-blue-800 mb-2">
          URLに以下のパラメータを付けることで、どこからの流入かを自動で記録します。
        </p>
        <code className="text-xs bg-white border border-blue-200 rounded px-3 py-2 block text-slate-700 mb-2">
          https://yourstudio.com/trial?utm_source=instagram&utm_medium=bio&utm_campaign=spring2025
        </code>
        <p className="text-xs text-blue-700">
          初回来訪時のパラメータが保存され、体験申込・入会時に紐付けられます。
        </p>
      </div>
    </div>
  )
}
