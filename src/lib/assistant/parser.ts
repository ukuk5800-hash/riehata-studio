import { addMonths, format } from 'date-fns'
import type { AssistantInterpretation } from '@/lib/assistant/types'

function detectAction(command: string): AssistantInterpretation {
  const text = command.toLowerCase()

  if ((text.includes('木曜') || text.includes('thursday')) && text.includes('19') && (text.includes('増や') || text.includes('add'))) {
    const nextMonth = format(addMonths(new Date(), 1), 'M')
    return {
      actionType: 'ADD_RECURRING_CLASS',
      confidence: 0.96,
      summary: `来月(${nextMonth}月)の木曜19:00の定期クラス追加依頼として解釈しました。`,
      candidates: [
        '定期ルール: 毎週木曜 19:00-20:00 を追加',
        '定員15名、公開開始は毎月1日、予約開始は会員プランごとの開始日に従う',
        '担当講師は既存の木曜担当を初期候補にする',
      ],
      requiresConfirmation: true,
      command,
    }
  }

  if ((text.includes('休講') || text.includes('cancel')) && (text.includes('振替') || text.includes('substitute'))) {
    return {
      actionType: 'REQUEST_CANCEL_AND_SUBSTITUTES',
      confidence: 0.93,
      summary: '対象レッスンを休講申請として登録し、振替候補を提示する依頼として解釈しました。',
      candidates: [
        '対象レッスンを「休講申請(PENDING)」で作成',
        '同講師の空き枠・代行可能講師の候補3件を提案',
        '承認前は会員への通知は送らない',
      ],
      requiresConfirmation: true,
      command,
    }
  }

  if ((text.includes('ゴールド') || text.includes('gold')) && (text.includes('先行予約') || text.includes('booking')) && (text.includes('早め') || text.includes('earlier'))) {
    return {
      actionType: 'UPDATE_PLAN_BOOKING_OPEN_DAY',
      confidence: 0.95,
      summary: 'ゴールド会員の予約開始日を前倒しする設定変更として解釈しました。',
      candidates: [
        'ゴールド会員の予約開始日を現在値から3日早める',
        '一般会員の予約開始日は15日のまま維持',
        '監査ログに「プラン設定変更」を記録',
      ],
      requiresConfirmation: true,
      command,
    }
  }

  if ((text.includes('ワークショップ') || text.includes('workshop')) && (text.includes('追加') || text.includes('create'))) {
    return {
      actionType: 'CREATE_WORKSHOP',
      confidence: 0.89,
      summary: '単発イベント(ワークショップ)作成依頼として解釈しました。',
      candidates: [
        '指定日時でイベント下書きを作成',
        '定員・公開範囲・決済要否を初期値でセット',
        'LP形式の公開ページも同時に生成',
      ],
      requiresConfirmation: true,
      command,
    }
  }

  if ((text.includes('体験') || text.includes('trial')) && (text.includes('lp') || text.includes('訴求'))) {
    return {
      actionType: 'UPDATE_TRIAL_LP_PROMOTION',
      confidence: 0.87,
      summary: '体験LPのキャッシュバック訴求を強化するUI変更依頼として解釈しました。',
      candidates: [
        'ヒーロー直下に「当日入会で3,300円キャッシュバック」を強調表示',
        'CTA文言を申込意図が明確なテキストに更新',
        '変更を監査ログに記録',
      ],
      requiresConfirmation: true,
      command,
    }
  }

  return {
    actionType: 'UNKNOWN',
    confidence: 0.3,
    summary: '解釈が曖昧なため、実行前に具体化が必要です。',
    candidates: [
      '対象日付（例: 4/15）',
      '対象レッスン・講師名',
      '反映範囲（単発 / 定期）',
    ],
    requiresConfirmation: false,
    command,
  }
}

export function interpretCommand(command: string): AssistantInterpretation {
  return detectAction(command)
}
