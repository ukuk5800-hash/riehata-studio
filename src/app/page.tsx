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
    <div style={{background:'#fff',color:'#1a1a1a',fontFamily:'system-ui,sans-serif'}}>

      <header style={{position:'fixed',top:0,left:0,right:0,zIndex:50,background:'#fff',borderBottom:'1px solid #eee',boxShadow:'0 1px 4px rgba(0,0,0,0.06)'}}>
        <div style={{maxWidth:1100,margin:'0 auto',padding:'0 24px',height:64,display:'flex',alignItems:'center',justifyContent:'space-between'}}>
          <Link href="/" style={{fontWeight:800,fontSize:18,color:'#1a1a1a',textDecoration:'none'}}>RIEHATA STUDIO</Link>
          <div style={{display:'flex',gap:24,alignItems:'center'}}>
            <Link href="#classes" style={{color:'#555',textDecoration:'none',fontSize:14}}>クラス</Link>
            <Link href="#schedule" style={{color:'#555',textDecoration:'none',fontSize:14}}>スケジュール</Link>
            <Link href="#instructors" style={{color:'#555',textDecoration:'none',fontSize:14}}>講師</Link>
            <Link href="#plans" style={{color:'#555',textDecoration:'none',fontSize:14}}>会員プラン</Link>
            <Link href="/trial" style={{color:'#555',textDecoration:'none',fontSize:14}}>体験レッスン</Link>
            <Link href="/auth/login" style={{color:'#555',textDecoration:'none',fontSize:14}}>ログイン</Link>
            <Link href="/trial" style={{background:'#f97316',color:'#fff',padding:'10px 20px',borderRadius:6,fontWeight:700,fontSize:14,textDecoration:'none'}}>体験予約</Link>
          </div>
        </div>
      </header>

      <main style={{paddingTop:64}}>

        <div style={{background:'#f97316',color:'#fff',textAlign:'center',padding:'12px',fontSize:14,fontWeight:600}}>
          期間限定：体験レッスン ¥3,300 → 当日入会でキャッシュバック！
        </div>

        <section style={{background:'#fff8f5',padding:'80px 24px'}}>
          <div style={{maxWidth:1100,margin:'0 auto'}}>
            <p style={{color:'#f97316',fontWeight:700,fontSize:13,marginBottom:16}}>WELLNESS STUDIO</p>
            <h1 style={{fontSize:52,fontWeight:900,lineHeight:1.2,marginBottom:24}}>
              身体と心を整える、<br />あなただけの時間。
            </h1>
            <p style={{color:'#666',marginBottom:32}}>体験レッスン ¥3,300 → 当日入会でキャッシュバック</p>
            <div style={{display:'flex',gap:16,flexWrap:'wrap'}}>
              <Link href="/trial" style={{background:'#f97316',color:'#fff',padding:'14px 32px',borderRadius:8,fontWeight:700,fontSize:15,textDecoration:'none'}}>体験レッスンを予約する</Link>
              <Link href="#classes" style={{background:'#fff',color:'#1a1a1a',padding:'14px 32px',borderRadius:8,fontWeight:700,fontSize:15,textDecoration:'none',border:'2px solid #e5e7eb'}}>クラスを見る</Link>
            </div>
          </div>
        </section>

        <section id="classes" style={{padding:'80px 24px',background:'#f9fafb'}}>
          <div style={{maxWidth:1100,margin:'0 auto'}}>
            <h2 style={{fontSize:32,fontWeight:800,marginBottom:40}}>クラスの種類</h2>
            <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:24}}>
              {[
                {title:'通常クラス',desc:'目的やレベルに合わせて選べる定番クラス。基礎から丁寧に学べます。',icon:'🎯',href:'/lessons'},
                {title:'ワークショップ',desc:'テーマ別に深く学ぶ特別講座。短期間で集中してスキルアップできます。',icon:'✨',href:'/workshops'},
                {title:'体験レッスン',desc:'初めての方限定。RIEHATA STUDIOの雰囲気を気軽に体験できる入門レッスンです。',icon:'🌟',href:'/trial'},
              ].map(item => (
                <div key={item.title} style={{background:'#fff',borderRadius:12,padding:32,boxShadow:'0 2px 12px rgba(0,0,0,0.06)'}}>
                  <div style={{fontSize:36,marginBottom:16}}>{item.icon}</div>
                  <h3 style={{fontSize:20,fontWeight:700,marginBottom:12}}>{item.title}</h3>
                  <p style={{color:'#666',fontSize:14,lineHeight:1.7,marginBottom:24}}>{item.desc}</p>
                  <Link href={item.href} style={{color:'#f97316',fontWeight:600,fontSize:14,textDecoration:'none'}}>詳しく見る →</Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="schedule" style={{padding:'80px 24px',background:'#fff'}}>
          <div style={{maxWidth:1100,margin:'0 auto'}}>
            <h2 style={{fontSize:32,fontWeight:800,marginBottom:40}}>今週のスケジュール</h2>
            <div style={{overflowX:'auto'}}>
              <table style={{width:'100%',borderCollapse:'collapse',fontSize:14}}>
                <thead>
                  <tr style={{borderBottom:'2px solid #f0f0f0'}}>
                    {['時間','月','火','水','木','金','土','日'].map(d => (
                      <th key={d} style={{padding:'12px 16px',textAlign:'left',color:'#999',fontWeight:600,fontSize:12}}>{d}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {weeklySchedule.map(row => (
                    <tr key={row.time} style={{borderBottom:'1px solid #f5f5f5'}}>
                      <td style={{padding:'12px 16px',fontWeight:700,color:'#f97316'}}>{row.time}</td>
                      <td style={{padding:'12px 16px',color:'#555'}}>{row.mon}</td>
                      <td style={{padding:'12px 16px',color:'#bbb'}}>{row.tue}</td>
                      <td style={{padding:'12px 16px',color:'#555'}}>{row.wed}</td>
                      <td style={{padding:'12px 16px',color:'#555'}}>{row.thu}</td>
                      <td style={{padding:'12px 16px',color:'#555'}}>{row.fri}</td>
                      <td style={{padding:'12px 16px',color:'#555'}}>{row.sat}</td>
                      <td style={{padding:'12px 16px',color:'#555'}}>{row.sun}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div style={{marginTop:24}}>
              <Link href="/calendar" style={{color:'#f97316',fontWeight:600,fontSize:14,textDecoration:'none'}}>全スケジュールを見る →</Link>
            </div>
          </div>
        </section>

        <section id="instructors" style={{padding:'80px 24px',background:'#f9fafb'}}>
          <div style={{maxWidth:1100,margin:'0 auto'}}>
            <h2 style={{fontSize:32,fontWeight:800,marginBottom:40}}>講師紹介</h2>
            <div style={{display:'flex',gap:24,overflowX:'auto',paddingBottom:8}}>
              {instructors.map(t => (
                <div key={t.name} style={{minWidth:280,background:'#fff',borderRadius:12,padding:28,boxShadow:'0 2px 12px rgba(0,0,0,0.06)'}}>
                  <div style={{width:80,height:80,borderRadius:'50%',background:'#ffe4d6',marginBottom:16,display:'flex',alignItems:'center',justifyContent:'center',fontSize:32}}>👩‍🏫</div>
                  <h3 style={{fontSize:18,fontWeight:700,marginBottom:8}}>{t.name}</h3>
                  <p style={{color:'#666',fontSize:14,lineHeight:1.7}}>{t.message}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="plans" style={{padding:'80px 24px',background:'#fff'}}>
          <div style={{maxWidth:1100,margin:'0 auto'}}>
            <h2 style={{fontSize:32,fontWeight:800,marginBottom:40}}>会員プラン</h2>
            <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:24}}>
              <div style={{background:'#fff',borderRadius:12,padding:32,border:'1px solid #f0f0f0'}}>
                <h3 style={{fontSize:13,fontWeight:700,color:'#999',marginBottom:12}}>体験</h3>
                <div style={{marginBottom:24}}><span style={{fontSize:40,fontWeight:900}}>¥3,300</span></div>
                <ul style={{listStyle:'none',padding:0,marginBottom:28}}>
                  {['初回限定1回','RIEHATA STUDIO案内付き','当日入会でキャッシュバック'].map(p => (
                    <li key={p} style={{color:'#555',fontSize:14,padding:'8px 0',borderBottom:'1px solid #f5f5f5'}}>✓ {p}</li>
                  ))}
                </ul>
                <Link href="/trial" style={{display:'block',textAlign:'center',padding:'12px',borderRadius:8,fontWeight:700,fontSize:14,textDecoration:'none',background:'#f97316',color:'#fff'}}>体験を申し込む</Link>
              </div>
              <div style={{background:'#fff',borderRadius:12,padding:32,border:'1px solid #f0f0f0'}}>
                <h3 style={{fontSize:13,fontWeight:700,color:'#999',marginBottom:12}}>一般会員</h3>
                <div style={{marginBottom:24}}><span style={{fontSize:40,fontWeight:900}}>¥12,800</span><span style={{color:'#999',fontSize:14}}> / 月</span></div>
                <ul style={{listStyle:'none',padding:0,marginBottom:28}}>
                  {['通常クラス受け放題','会員向けイベント参加可','オンライン予約対応'].map(p => (
                    <li key={p} style={{color:'#555',fontSize:14,padding:'8px 0',borderBottom:'1px solid #f5f5f5'}}>✓ {p}</li>
                  ))}
                </ul>
                <Link href="/plans" style={{display:'block',textAlign:'center',padding:'12px',borderRadius:8,fontWeight:700,fontSize:14,textDecoration:'none',background:'#f97316',color:'#fff'}}>申し込む</Link>
              </div>
              <div style={{background:'#f97316',borderRadius:12,padding:32,position:'relative'}}>
                <div style={{position:'absolute',top:-12,left:'50%',transform:'translateX(-50%)',background:'#1a1a1a',color:'#fff',padding:'4px 16px',borderRadius:20,fontSize:12,fontWeight:700,whiteSpace:'nowrap'}}>人気No.1</div>
                <h3 style={{fontSize:13,fontWeight:700,color:'rgba(255,255,255,0.8)',marginBottom:12}}>ゴールド会員</h3>
                <div style={{marginBottom:24}}><span style={{fontSize:40,fontWeight:900,color:'#fff'}}>¥18,800</span><span style={{color:'rgba(255,255,255,0.7)',fontSize:14}}> / 月</span></div>
                <ul style={{listStyle:'none',padding:0,marginBottom:28}}>
                  {['全クラス受け放題','ワークショップ優先予約','毎月10日から先行予約'].map(p => (
                    <li key={p} style={{color:'#fff',fontSize:14,padding:'8px 0',borderBottom:'1px solid rgba(255,255,255,0.2)'}}>✓ {p}</li>
                  ))}
                </ul>
                <Link href="/plans" style={{display:'block',textAlign:'center',padding:'12px',borderRadius:8,fontWeight:700,fontSize:14,textDecoration:'none',background:'#fff',color:'#f97316'}}>申し込む</Link>
              </div>
            </div>
          </div>
        </section>

      </main>

      <footer style={{background:'#1a1a1a',color:'#fff',padding:'48px 24px'}}>
        <div style={{maxWidth:1100,margin:'0 auto',display:'flex',flexWrap:'wrap',justifyContent:'space-between',gap:24}}>
          <div>
            <p style={{fontWeight:800,fontSize:18,marginBottom:8}}>RIEHATA STUDIO</p>
            <p style={{color:'#888',fontSize:13}}>身体と心を整える、あなただけの時間。</p>
          </div>
          <nav style={{display:'flex',gap:24,flexWrap:'wrap',alignItems:'center'}}>
            <Link href="#classes" style={{color:'#888',textDecoration:'none',fontSize:13}}>クラス</Link>
            <Link href="#schedule" style={{color:'#888',textDecoration:'none',fontSize:13}}>スケジュール</Link>
            <Link href="#instructors" style={{color:'#888',textDecoration:'none',fontSize:13}}>講師</Link>
            <Link href="#plans" style={{color:'#888',textDecoration:'none',fontSize:13}}>会員プラン</Link>
            <Link href="/trial" style={{color:'#f97316',textDecoration:'none',fontSize:13,fontWeight:600}}>体験レッスン</Link>
            <Link href="/admin" style={{color:'#888',textDecoration:'none',fontSize:13}}>管理画面</Link>
          </nav>
        </div>
        <p style={{maxWidth:1100,margin:'24px auto 0',color:'#555',fontSize:12}}>© 2026 RIEHATA STUDIO All rights reserved.</p>
      </footer>

    </div>
  )
}