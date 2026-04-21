import Link from 'next/link'

const weeklySchedule = [
  { time: '10:00', mon: 'ベーシック', tue: '休講', wed: 'ピラティス', thu: 'ストレッチ', fri: '体幹トレ', sat: '入門', sun: 'リラックス' },
  { time: '13:00', mon: '姿勢改善', tue: 'ボディメイク', wed: '休講', thu: 'ワークショップ', fri: 'ベーシック', sat: 'ピラティス', sun: '休講' },
  { time: '19:00', mon: 'ナイトフロー', tue: 'ヒーリング', wed: 'ベーシック', thu: '体験レッスン', fri: 'ナイトフロー', sat: '休講', sun: '姿勢改善' },
]

const instructors = [
  { name: 'あつこ先生', message: '初めてでも安心して楽しめるレッスンを心がけています。' },
  { name: 'リエ先生', message: '一人ひとりの体調に合わせて丁寧にサポートします。' },
]

export default function HomePage() {
  return (
    <div className="bg-white text-gray-900 font-sans">

      {/* ヘッダー */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-[1100px] mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="font-extrabold text-lg text-gray-900 no-underline">RIEHATA STUDIO</Link>
          
          {/* スマホ画面ではメニューが溢れるので一旦非表示(hidden)、PC(md)で表示 */}
          <div className="hidden md:flex gap-6 items-center">
            <Link href="#classes" className="text-gray-600 text-sm no-underline hover:text-orange-500">クラス</Link>
            <Link href="#schedule" className="text-gray-600 text-sm no-underline hover:text-orange-500">スケジュール</Link>
            <Link href="#instructors" className="text-gray-600 text-sm no-underline hover:text-orange-500">講師</Link>
            <Link href="#plans" className="text-gray-600 text-sm no-underline hover:text-orange-500">会員プラン</Link>
            <Link href="/trial" className="text-gray-600 text-sm no-underline hover:text-orange-500">体験レッスン</Link>
            <Link href="/auth/login" className="text-gray-600 text-sm no-underline hover:text-orange-500">ログイン</Link>
            <Link href="/trial" className="bg-orange-500 text-white px-5 py-2.5 rounded-md font-bold text-sm no-underline hover:bg-orange-600">体験予約</Link>
          </div>
        </div>
      </header>

      <main className="pt-16">

        {/* 上部バナー */}
        <div className="bg-orange-500 text-white text-center p-3 text-sm font-semibold">
          期間限定：体験レッスン ¥3,300 → 当日入会でキャッシュバック！
        </div>

        {/* ヒーローセクション（トップ画像部分） */}
        <section className="bg-orange-50 py-20 px-6">
          <div className="max-w-[1100px] mx-auto">
            <p className="text-orange-500 font-bold text-sm mb-4">WELLNESS STUDIO</p>
            <h1 className="text-4xl md:text-5xl font-black leading-tight mb-6">
              身体と心を整える、<br />あなただけの時間。
            </h1>
            <p className="text-gray-500 mb-8">体験レッスン ¥3,300 → 当日入会でキャッシュバック</p>
            
            {/* スマホではボタンを縦積み、PCで横並び */}
            <div className="flex flex-col md:flex-row gap-4">
              <Link href="/trial" className="bg-orange-500 text-white px-8 py-4 rounded-lg font-bold text-center no-underline hover:bg-orange-600">体験レッスンを予約する</Link>
              <Link href="#classes" className="bg-white text-gray-900 px-8 py-4 rounded-lg font-bold text-center no-underline border-2 border-gray-200 hover:bg-gray-50">クラスを見る</Link>
            </div>
          </div>
        </section>

        {/* クラスの種類（3つのカード） */}
        <section id="classes" className="py-20 px-6 bg-gray-50">
          <div className="max-w-[1100px] mx-auto">
            <h2 className="text-3xl font-extrabold mb-10">クラスの種類</h2>
            
            {/* スマホは1列、PCで3列に自動切り替え */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {title:'通常クラス',desc:'目的やレベルに合わせて選べる定番クラス。基礎から丁寧に学べます。',icon:'🎯',href:'/lessons'},
                {title:'ワークショップ',desc:'テーマ別に深く学ぶ特別講座。短期間で集中してスキルアップできます。',icon:'✨',href:'/workshops'},
                {title:'体験レッスン',desc:'初めての方限定。RIEHATA STUDIOの雰囲気を気軽に体験できる入門レッスンです。',icon:'🌟',href:'/trial'},
              ].map(item => (
                <div key={item.title} className="bg-white rounded-xl p-8 shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
                  <div className="text-4xl mb-4">{item.icon}</div>
                  <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed mb-6">{item.desc}</p>
                  <Link href={item.href} className="text-orange-500 font-semibold text-sm no-underline hover:underline">詳しく見る →</Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* スケジュール */}
        <section id="schedule" className="py-20 px-6 bg-white">
          <div className="max-w-[1100px] mx-auto">
            <h2 className="text-3xl font-extrabold mb-10">今週のスケジュール</h2>
            
            {/* 表はスマホで無理に縮めず、ここだけ横スクロールで綺麗に見せる */}
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-sm min-w-[600px]">
                <thead>
                  <tr className="border-b-2 border-gray-100">
                    {['時間','月','火','水','木','金','土','日'].map(d => (
                      <th key={d} className="p-3 text-left text-gray-400 font-semibold text-xs">{d}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {weeklySchedule.map(row => (
                    <tr key={row.time} className="border-b border-gray-50">
                      <td className="p-3 font-bold text-orange-500">{row.time}</td>
                      <td className="p-3 text-gray-600">{row.mon}</td>
                      <td className="p-3 text-gray-300">{row.tue}</td>
                      <td className="p-3 text-gray-600">{row.wed}</td>
                      <td className="p-3 text-gray-600">{row.thu}</td>
                      <td className="p-3 text-gray-600">{row.fri}</td>
                      <td className="p-3 text-gray-600">{row.sat}</td>
                      <td className="p-3 text-gray-600">{row.sun}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-6">
              <Link href="/calendar" className="text-orange-500 font-semibold text-sm no-underline hover:underline">全スケジュールを見る →</Link>
            </div>
          </div>
        </section>

        {/* 講師紹介 */}
        <section id="instructors" className="py-20 px-6 bg-gray-50">
          <div className="max-w-[1100px] mx-auto">
            <h2 className="text-3xl font-extrabold mb-10">講師紹介</h2>
            
            {/* スマホは1列で縦積み、PCは2列 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {instructors.map(t => (
                <div key={t.name} className="bg-white rounded-xl p-7 shadow-[0_2px_12px_rgba(0,0,0,0.06)] flex flex-col items-center md:items-start text-center md:text-left">
                  <div className="w-20 h-20 rounded-full bg-orange-100 mb-4 flex items-center justify-center text-3xl">👩‍🏫</div>
                  <h3 className="text-lg font-bold mb-2">{t.name}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{t.message}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 会員プラン */}
        <section id="plans" className="py-20 px-6 bg-white">
          <div className="max-w-[1100px] mx-auto">
            <h2 className="text-3xl font-extrabold mb-10">会員プラン</h2>
            
            {/* スマホは1列、PCで3列 */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl p-8 border border-gray-100 flex flex-col">
                <h3 className="text-sm font-bold text-gray-400 mb-3">体験</h3>
                <div className="mb-6"><span className="text-4xl font-black">¥3,300</span></div>
                <ul className="list-none p-0 mb-7 flex-1">
                  {['初回限定1回','RIEHATA STUDIO案内付き','当日入会でキャッシュバック'].map(p => (
                    <li key={p} className="text-gray-600 text-sm py-2 border-b border-gray-50">✓ {p}</li>
                  ))}
                </ul>
                <Link href="/trial" className="block text-center p-3 rounded-lg font-bold text-sm bg-orange-500 text-white no-underline hover:bg-orange-600">体験を申し込む</Link>
              </div>

              <div className="bg-white rounded-xl p-8 border border-gray-100 flex flex-col">
                <h3 className="text-sm font-bold text-gray-400 mb-3">一般会員</h3>
                <div className="mb-6"><span className="text-4xl font-black">¥12,800</span><span className="text-gray-400 text-sm"> / 月</span></div>
                <ul className="list-none p-0 mb-7 flex-1">
                  {['通常クラス受け放題','会員向けイベント参加可','オンライン予約対応'].map(p => (
                    <li key={p} className="text-gray-600 text-sm py-2 border-b border-gray-50">✓ {p}</li>
                  ))}
                </ul>
                <Link href="/plans" className="block text-center p-3 rounded-lg font-bold text-sm bg-orange-500 text-white no-underline hover:bg-orange-600">申し込む</Link>
              </div>

              <div className="bg-orange-500 rounded-xl p-8 relative flex flex-col">
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white px-4 py-1 rounded-full text-xs font-bold whitespace-nowrap">人気No.1</div>
                <h3 className="text-sm font-bold text-white/80 mb-3">ゴールド会員</h3>
                <div className="mb-6"><span className="text-4xl font-black text-white">¥18,800</span><span className="text-white/70 text-sm"> / 月</span></div>
                <ul className="list-none p-0 mb-7 flex-1">
                  {['全クラス受け放題','ワークショップ優先予約','毎月10日から先行予約'].map(p => (
                    <li key={p} className="text-white text-sm py-2 border-b border-white/20">✓ {p}</li>
                  ))}
                </ul>
                <Link href="/plans" className="block text-center p-3 rounded-lg font-bold text-sm bg-white text-orange-500 no-underline hover:bg-gray-50">申し込む</Link>
              </div>
            </div>
          </div>
        </section>

      </main>

      {/* フッター */}
      <footer className="bg-gray-900 text-white py-12 px-6">
        <div className="max-w-[1100px] mx-auto flex flex-col md:flex-row justify-between gap-8">
          <div>
            <p className="font-extrabold text-lg mb-2">RIEHATA STUDIO</p>
            <p className="text-gray-400 text-sm">身体と心を整える、あなただけの時間。</p>
          </div>
          <nav className="flex flex-wrap gap-4 md:gap-6 items-center">
            <Link href="#classes" className="text-gray-400 text-sm no-underline hover:text-white">クラス</Link>
            <Link href="#schedule" className="text-gray-400 text-sm no-underline hover:text-white">スケジュール</Link>
            <Link href="#instructors" className="text-gray-400 text-sm no-underline hover:text-white">講師</Link>
            <Link href="#plans" className="text-gray-400 text-sm no-underline hover:text-white">会員プラン</Link>
            <Link href="/trial" className="text-orange-500 text-sm font-semibold no-underline hover:text-orange-400">体験レッスン</Link>
            <Link href="/admin" className="text-gray-400 text-sm no-underline hover:text-white">管理画面</Link>
          </nav>
        </div>
        <p className="max-w-[1100px] mx-auto mt-8 text-gray-500 text-xs">© 2026 RIEHATA STUDIO All rights reserved.</p>
      </footer>

    </div>
  )
}
