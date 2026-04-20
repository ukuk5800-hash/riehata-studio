# Studio App (予約・会員・体験導線 SaaS)

個人教室・小規模スクール向けの、予約・会員管理・体験申込・売上/流入分析サービスです。  
管理画面は「フォーム入力中心」ではなく、`AI業務アシスタント` の自然文操作を主役にしています。

## 実装済みハイライト

- Next.js + TypeScript + Tailwind CSS
- Prisma + PostgreSQL データモデル
- NextAuth (Credentials) によるログイン基盤
- 日英対応 (next-intl)
- 顧客画面: トップ、レッスン、カレンダー、体験LP、プラン、ログイン/登録、マイページ
- 管理画面: ダッシュボード、クラス管理、定期設定、イベント、予約、会員、講師、変更申請、分析、設定
- AI業務アシスタント:
  - チャット入力
  - 解釈結果
  - 実行候補
  - 実行確認
  - 実行ログ
- 定期クラス自動生成ロジック（曜日繰り返し、休講、代行、祝日スキップ対応）

## 業務ルール

- ゴールド会員: 毎月10日予約開始
- 一般会員: 毎月15日予約開始
- 講師はスケジュールを直接確定変更不可（変更申請フロー前提）
- 体験レッスン価格: 3,300円
- 当日入会キャッシュバック導線あり
- 電話番号は任意（必須ではない）

## セットアップ

### 1. 依存インストール

```bash
npm install
```

### 2. 環境変数

`.env` を作成し、以下を設定してください。

```bash
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/studio_app"
NEXTAUTH_SECRET="replace-with-random-secret"
NEXTAUTH_URL="http://localhost:3000"
```

### 3. DB反映とシード

```bash
npm run db:generate
npm run db:push
npm run db:seed
```

### 4. 起動

```bash
npm run dev
```

`http://localhost:3000` で利用できます。

## テスト用アカウント（seed）

- Owner: `owner@aura.example` / `password123`
- Staff: `staff@aura.example` / `password123`
- Teacher: `teacher@aura.example` / `password123`
- Member: `member@aura.example` / `password123`

## AI業務アシスタントMVP

`/admin/assistant` で以下のような命令を高精度ルールベースで処理します。

- 来月の木曜19時クラスを増やして
- 4月15日のリエさんクラスを休講にして振替候補を出して
- ゴールド会員向けに先行予約を3日早めて
- ワークショップを5月3日15時で追加して

将来は `src/lib/assistant/parser.ts` を置き換えることで OpenAI/Anthropic API に接続できます。

## ドキュメント

- `docs/requirements.md`
- `docs/screen-list.md`
- `docs/data-model.md`
# Studio App — 予約・会員管理・体験申込・売上管理 SaaS

ハコモノ代替を目指す、スタジオ向け統合管理システム。

## 技術スタック

| 区分 | 技術 |
|---|---|
| フレームワーク | Next.js 15 (App Router) |
| 言語 | TypeScript |
| スタイリング | Tailwind CSS v4 |
| DB | PostgreSQL + Prisma ORM |
| 認証 | NextAuth.js v5 (Email + Google OAuth) |
| 決済 | Stripe（モック → 本番切替可能） |
| i18n | next-intl (日本語・英語) |
| メール | Nodemailer / Resend |

## セットアップ

```bash
# 依存インストール
npm install

# 環境変数設定
cp .env.example .env.local
# .env.local を編集

# DBセットアップ
npm run db:push
npm run db:seed  # サンプルデータ投入

# 開発サーバー起動
npm run dev
```

## ページ構成

### 顧客向け
| パス | 説明 |
|---|---|
| `/` | トップページ（LP・コンバージョン重視） |
| `/lessons` | クラス一覧（フィルタ・検索） |
| `/calendar` | カレンダー予約画面 |
| `/trial` | 体験レッスン申込LP |
| `/workshops` | ワークショップ一覧 |
| `/plans` | 会員プラン比較 |
| `/auth/login` | ログイン |
| `/auth/register` | 新規登録（電話番号任意） |
| `/mypage` | マイページ |
| `/mypage/bookings` | 予約一覧・キャンセル |

### 管理画面 `/admin/*`
| パス | 説明 |
|---|---|
| `/admin` | ダッシュボード（KPI・今日のスケジュール） |
| `/admin/classes` | クラス管理 |
| `/admin/recurring` | 定期クラス設定・自動生成 |
| `/admin/events` | ワークショップ・イベント管理 |
| `/admin/bookings` | 予約管理 |
| `/admin/members` | 会員管理 |
| `/admin/teachers` | 講師管理 |
| `/admin/requests` | 変更申請審査 |
| `/admin/campaigns` | キャンペーン管理 |
| `/admin/analytics` | 流入元分析・転換率 |
| `/admin/assistant` | AIアシスタント（チャット） |
| `/admin/settings` | 設定（予約ルール等） |

## 権限モデル

| ロール | 権限 |
|---|---|
| OWNER | 全操作 |
| STAFF | 管理業務全般 |
| TEACHER | 担当クラス確認・変更申請のみ |
| MEMBER | 予約・マイページ |
| GUEST | 閲覧・体験申込 |

> 講師は直接クラス変更不可。変更申請→Owner/Staff承認のフロー。

## 業務ルール

- ゴールド会員: 毎月 **10日** から翌月分を予約可能
- レギュラー会員: 毎月 **15日** から予約可能
- ライト会員: 毎月 **20日** から予約可能
- 体験レッスン: **¥3,300**（当日入会でキャッシュバック）
- 電話番号: 一切不要（メールのみで登録・予約可能）
- 定期クラス: 毎月25日に翌月分を自動生成

## 多言語対応

`messages/ja.json` と `messages/en.json` で全UIテキストを管理。  
ヘッダーの JA/EN ボタン、またはクッキー `locale` で切替。

## UTM分析

URLパラメータ `?utm_source=instagram&utm_medium=bio&utm_campaign=spring` を付与することで、  
初回来訪→体験申込→入会の全経路が分析画面で可視化されます。

## 今後の拡張

- [ ] AI アシスタントの Claude API 接続
- [ ] Stripe Webhook による自動決済確認
- [ ] Google OAuth ソーシャルログイン
- [ ] Push通知 / LINE連携
- [ ] 月次レポート自動メール配信
- [ ] Zoom/Google Meet 連携（オンラインクラス対応）
