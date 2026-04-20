import { Mail, Instagram, Star, Calendar } from 'lucide-react'

const TEACHERS = [
  { id: 't1', name: '田中 さくら', role: 'ヨガ / 瞑想', years: 8, sessions: 24, rating: 4.9, email: 'sakura@aura.com', ig: '@sakura_yoga', isActive: true, bio: '全米ヨガアライアンス RYT500取得。ハタヨガと瞑想指導を専門とし、初心者から上級者まで幅広く指導。' },
  { id: 't2', name: '山本 リナ', role: 'ピラティス', years: 5, sessions: 18, rating: 4.8, email: 'rina@aura.com', ig: '@rina_pilates', isActive: true, bio: 'ピラティスメソッドスタジオ BASI Pilates認定。コアトレーニングと姿勢改善を得意とする。' },
  { id: 't3', name: '鈴木 ハル', role: 'ヨガ / ボディワーク', years: 10, sessions: 20, rating: 4.9, email: 'haru@aura.com', ig: '@haru_bodywork', isActive: true, bio: 'アシュタンガヨガとリストラティブヨガ専門。ボディワークと呼吸法を組み合わせた独自スタイル。' },
]

export default function TeachersPage() {
  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-slate-900">講師管理</h1>
          <p className="text-sm text-slate-500">講師プロフィール・担当クラスの管理</p>
        </div>
        <button className="px-4 py-2 bg-teal-600 text-white rounded-xl text-sm font-medium hover:bg-teal-700">
          + 講師を追加
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {TEACHERS.map(t => (
          <div key={t.id} className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="bg-gradient-to-br from-teal-400 to-teal-600 h-20 flex items-end px-5 pb-0 relative">
              <div className="w-16 h-16 bg-white rounded-full border-4 border-white shadow-md flex items-center justify-center text-2xl font-bold text-teal-600 translate-y-8">
                {t.name[0]}
              </div>
            </div>
            <div className="pt-10 px-5 pb-5">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-bold text-slate-900">{t.name}</h3>
                  <p className="text-sm text-teal-600">{t.role}</p>
                </div>
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${t.isActive ? 'bg-teal-100 text-teal-700' : 'bg-slate-100 text-slate-500'}`}>
                  {t.isActive ? '在籍中' : '休職中'}
                </span>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed mb-4">{t.bio}</p>

              <div className="grid grid-cols-3 gap-2 mb-4">
                <div className="bg-slate-50 rounded-lg p-2 text-center">
                  <p className="text-xs text-slate-400">経験</p>
                  <p className="font-bold text-slate-700 text-sm">{t.years}年</p>
                </div>
                <div className="bg-slate-50 rounded-lg p-2 text-center">
                  <p className="text-xs text-slate-400">今月</p>
                  <p className="font-bold text-slate-700 text-sm">{t.sessions}回</p>
                </div>
                <div className="bg-slate-50 rounded-lg p-2 text-center">
                  <p className="text-xs text-slate-400">評価</p>
                  <p className="font-bold text-amber-600 text-sm flex items-center justify-center gap-0.5">
                    <Star size={10} className="fill-amber-400 text-amber-400" />{t.rating}
                  </p>
                </div>
              </div>

              <div className="flex gap-2">
                <a href={`mailto:${t.email}`} className="flex-1 flex items-center justify-center gap-1.5 py-2 border border-slate-200 rounded-lg text-xs text-slate-600 hover:bg-slate-50">
                  <Mail size={13} />メール
                </a>
                <a href={`https://instagram.com/${t.ig.replace('@', '')}`} className="flex-1 flex items-center justify-center gap-1.5 py-2 border border-slate-200 rounded-lg text-xs text-slate-600 hover:bg-slate-50">
                  <Instagram size={13} />Instagram
                </a>
                <button className="flex-1 flex items-center justify-center gap-1.5 py-2 border border-slate-200 rounded-lg text-xs text-slate-600 hover:bg-slate-50">
                  <Calendar size={13} />担当クラス
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
