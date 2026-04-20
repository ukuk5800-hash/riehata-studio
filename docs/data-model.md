# データモデル設計書

## ERD概要

```
User (1) ──── (1) Profile
User (1) ──── (0..1) Member ──── (N) MembershipPlan
User (1) ──── (0..1) Teacher
User (1) ──── (N) Booking ──── (1) ClassSession
User (1) ──── (N) EventBooking ──── (1) Event
User (1) ──── (N) TrialLesson

ClassSession (N) ──── (1) Teacher
ClassSession (N) ──── (0..1) RecurringRule
ClassSession (1) ──── (N) Booking
ClassSession (1) ──── (N) Waitlist
ClassSession (1) ──── (N) ScheduleChangeRequest
ClassSession (1) ──── (N) SubstituteAssignment

Campaign (1) ──── (N) Member
Campaign (1) ──── (N) TrialLesson
Campaign (1) ──── (N) Conversion
```

## 主要テーブル説明

### User / Profile
- User: 認証情報・ロール
- Profile: 個人情報・UTMパラメータ（初回来訪保存）
- 電話番号は optional（`phone?: String`）

### MembershipPlan
| フィールド | 説明 |
|---|---|
| `bookingOpenDay` | 毎月何日から予約開始か（ゴールド=10, レギュラー=15, ライト=20） |
| `maxBookingsPerMonth` | 月間上限（null=無制限） |

### RecurringRule → ClassSession
- RecurringRule: 定期クラスのテンプレート（曜日・時間・講師・定員）
- ClassSession: 実際のセッション（特定日時）
- 毎月25日に翌月分の ClassSession を自動生成

### ScheduleChangeRequest
- 講師が申請（type: CANCEL / RESCHEDULE / SUBSTITUTE / TIME_CHANGE）
- Owner/Staff が承認（status: PENDING → APPROVED / REJECTED）
- 承認後に影響する予約者へ通知

### AiOperationLog
- 管理チャットの「解釈」「実行」「成功/失敗」を時系列保存
- 後から監査・再現・改善（ルール/LLMチューニング）に利用

### Campaign / Conversion / LeadSource
- UTMパラメータは Profile に保存
- Conversion: 体験→入会の転換記録（キャンペーン・流入元紐付き）
- LeadSource: instagram, google, referral など

## インデックス戦略

```sql
-- よく使うクエリに対してインデックスを付与
User: email（UNIQUE）
ClassSession: date, teacherId, status
Booking: userId + sessionId（UNIQUE）、sessionId、status
Waitlist: sessionId + position
Campaign: isActive
AuditLog: userId, resource, createdAt
```

## マイグレーション方針

- Prisma migrate dev（開発）
- Prisma migrate deploy（本番）
- Seed データ: `prisma/seed.ts`
