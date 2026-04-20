import { ChangeType, Role } from '@prisma/client'
import { addMonths, format, set } from 'date-fns'
import { prisma } from '@/lib/prisma'
import { generateMonthlySessions } from '@/lib/scheduling/recurring'
import type { AssistantExecutionResult, AssistantInterpretation } from '@/lib/assistant/types'

function parseAdvanceDays(command: string, fallback = 3) {
  const matched = command.match(/(\d+)\s*日/)
  if (!matched) return fallback
  const days = Number.parseInt(matched[1], 10)
  return Number.isNaN(days) ? fallback : days
}

function parseWorkshopDate(command: string) {
  const dateMatch = command.match(/(\d{1,2})月(\d{1,2})日/)
  const timeMatch = command.match(/(\d{1,2})時/)
  const now = new Date()
  const month = dateMatch ? Number.parseInt(dateMatch[1], 10) : now.getMonth() + 1
  const day = dateMatch ? Number.parseInt(dateMatch[2], 10) : now.getDate()
  const hour = timeMatch ? Number.parseInt(timeMatch[1], 10) : 15
  const date = set(new Date(now.getFullYear(), month - 1, day), {
    hours: hour,
    minutes: 0,
    seconds: 0,
    milliseconds: 0,
  })
  return {
    date,
    startTime: `${hour.toString().padStart(2, '0')}:00`,
    endTime: `${(hour + 1).toString().padStart(2, '0')}:00`,
  }
}

async function resolveActingUserId() {
  const owner = await prisma.user.findFirst({
    where: { role: Role.OWNER },
    orderBy: { createdAt: 'asc' },
  })
  if (owner) return owner.id

  const fallback = await prisma.user.findFirst({ orderBy: { createdAt: 'asc' } })
  if (!fallback) {
    throw new Error('No users found. Run seed first.')
  }
  return fallback.id
}

async function executeAddRecurringClass(command: string) {
  const teacher = await prisma.teacher.findFirst({
    where: { isActive: true },
    orderBy: { createdAt: 'asc' },
  })
  if (!teacher) {
    throw new Error('講師データが見つかりません。先に講師を作成してください。')
  }

  const nextMonth = addMonths(new Date(), 1)
  const recurringRule = await prisma.recurringRule.create({
    data: {
      name: '木曜19時 追加クラス',
      nameEn: 'Thursday 7pm Added Class',
      dayOfWeek: 4,
      startTime: '19:00',
      endTime: '20:00',
      teacherId: teacher.id,
      capacity: 15,
      location: 'Main Studio',
      startDate: new Date(),
      autoGenerate: true,
      description: `AIアシスタント経由で追加: ${command}`,
    },
  })

  const sessions = generateMonthlySessions({
    rule: {
      id: recurringRule.id,
      name: recurringRule.name,
      dayOfWeek: recurringRule.dayOfWeek,
      startTime: recurringRule.startTime,
      endTime: recurringRule.endTime,
      teacherId: recurringRule.teacherId,
      capacity: recurringRule.capacity,
      startDate: recurringRule.startDate,
      endDate: recurringRule.endDate,
      holidaySkip: true,
    },
    monthDate: nextMonth,
    holidays: [],
  })

  const created = await prisma.$transaction(
    sessions.map((session) =>
      prisma.classSession.create({
        data: {
          recurringRuleId: recurringRule.id,
          title: recurringRule.name,
          titleEn: recurringRule.nameEn ?? 'Added Class',
          date: new Date(`${session.date}T00:00:00.000Z`),
          startTime: session.startTime,
          endTime: session.endTime,
          teacherId: session.teacherId,
          capacity: session.capacity,
          location: recurringRule.location,
          status: session.status,
          description: recurringRule.description,
        },
      }),
    ),
  )

  return [
    `recurringRuleId=${recurringRule.id}`,
    `generatedMonth=${format(nextMonth, 'yyyy-MM')}`,
    `createdSessions=${created.length}`,
  ]
}

async function executeCancelRequest(command: string) {
  const teacherNameMatched = command.match(/([ァ-ヶー一-龠a-zA-Z]+)さん/)
  const teacherName = teacherNameMatched?.[1] ?? 'リエ'
  const dateMatch = command.match(/(\d{1,2})月(\d{1,2})日/)

  const teacher = await prisma.teacher.findFirst({
    where: {
      OR: [
        { displayName: { contains: teacherName } },
        { user: { name: { contains: teacherName } } },
      ],
      isActive: true,
    },
  })
  if (!teacher) throw new Error('対象講師が見つかりませんでした。')

  let targetDate: Date | undefined
  if (dateMatch) {
    targetDate = new Date(new Date().getFullYear(), Number.parseInt(dateMatch[1], 10) - 1, Number.parseInt(dateMatch[2], 10))
  }

  const session = await prisma.classSession.findFirst({
    where: {
      teacherId: teacher.id,
      ...(targetDate
        ? {
            date: {
              gte: new Date(targetDate.setHours(0, 0, 0, 0)),
              lt: new Date(targetDate.setHours(23, 59, 59, 999)),
            },
          }
        : {}),
    },
    orderBy: { date: 'asc' },
  })
  if (!session) throw new Error('対象レッスン枠が見つかりませんでした。')

  const request = await prisma.scheduleChangeRequest.create({
    data: {
      sessionId: session.id,
      requestedById: teacher.id,
      type: ChangeType.CANCEL,
      reason: `AIチャットから休講申請: ${command}`,
    },
  })

  const substituteCandidates = await prisma.teacher.findMany({
    where: { isActive: true, id: { not: teacher.id } },
    take: 3,
    select: { id: true, displayName: true, user: { select: { name: true } } },
  })

  return [
    `scheduleChangeRequestId=${request.id}`,
    `targetSessionId=${session.id}`,
    ...substituteCandidates.map((candidate) => `substituteCandidate=${candidate.displayName ?? candidate.user.name ?? candidate.id}`),
  ]
}

async function executeUpdatePlan(command: string) {
  const advanceDays = parseAdvanceDays(command, 3)
  const plan = await prisma.membershipPlan.findFirst({
    where: {
      OR: [{ slug: { contains: 'gold' } }, { name: { contains: 'ゴールド' } }, { nameEn: { contains: 'Gold' } }],
    },
  })
  if (!plan) throw new Error('ゴールド会員プランが見つかりませんでした。')

  const nextOpenDay = Math.max(1, plan.bookingOpenDay - advanceDays)
  const updated = await prisma.membershipPlan.update({
    where: { id: plan.id },
    data: { bookingOpenDay: nextOpenDay },
  })

  return [`planId=${updated.id}`, `bookingOpenDay=${plan.bookingOpenDay}=>${updated.bookingOpenDay}`]
}

async function executeCreateWorkshop(command: string) {
  const parsed = parseWorkshopDate(command)
  const event = await prisma.event.create({
    data: {
      title: 'AI追加ワークショップ',
      titleEn: 'AI Added Workshop',
      description: `AIアシスタントから追加: ${command}`,
      descriptionEn: 'Workshop created from AI assistant command.',
      date: parsed.date,
      startTime: parsed.startTime,
      endTime: parsed.endTime,
      location: 'Main Studio',
      capacity: 20,
      price: 3300,
      category: 'workshop',
      isPublished: false,
    },
  })

  return [`eventId=${event.id}`, `eventDate=${format(event.date, 'yyyy-MM-dd')}`, `startTime=${event.startTime}`]
}

async function executeTrialLpPromotion(command: string) {
  const announcement = await prisma.announcement.create({
    data: {
      title: '体験LP訴求更新タスク',
      titleEn: 'Trial LP Promotion Update Task',
      body: `体験LPのキャッシュバック訴求を強化: ${command}`,
      bodyEn: 'Strengthen cashback appeal on trial LP.',
      targetRoles: [Role.OWNER, Role.STAFF],
      isPublished: false,
    },
  })

  return [`announcementId=${announcement.id}`, 'task=trial_lp_cashback_emphasis']
}

export async function executeInterpretedAction(
  interpretation: AssistantInterpretation,
): Promise<AssistantExecutionResult> {
  const actingUserId = await resolveActingUserId()
  const baseLogs = [
    `[${new Date().toISOString()}] action=${interpretation.actionType}`,
    `[${new Date().toISOString()}] command=${interpretation.command}`,
  ]

  try {
    if (interpretation.actionType === 'UNKNOWN') {
      await prisma.aiOperationLog.create({
        data: {
          userId: actingUserId,
          prompt: interpretation.command,
          response: interpretation.summary,
          action: interpretation.actionType,
          success: false,
        },
      })
      return {
        ok: false,
        message: '解釈が曖昧なため実行を停止しました。',
        logs: [...baseLogs, 'executed=false'],
      }
    }

    let actionLogs: string[] = []
    if (interpretation.actionType === 'ADD_RECURRING_CLASS') {
      actionLogs = await executeAddRecurringClass(interpretation.command)
    } else if (interpretation.actionType === 'REQUEST_CANCEL_AND_SUBSTITUTES') {
      actionLogs = await executeCancelRequest(interpretation.command)
    } else if (interpretation.actionType === 'UPDATE_PLAN_BOOKING_OPEN_DAY') {
      actionLogs = await executeUpdatePlan(interpretation.command)
    } else if (interpretation.actionType === 'CREATE_WORKSHOP') {
      actionLogs = await executeCreateWorkshop(interpretation.command)
    } else if (interpretation.actionType === 'UPDATE_TRIAL_LP_PROMOTION') {
      actionLogs = await executeTrialLpPromotion(interpretation.command)
    }

    await prisma.aiOperationLog.create({
      data: {
        userId: actingUserId,
        prompt: interpretation.command,
        response: JSON.stringify({ summary: interpretation.summary, logs: actionLogs }),
        action: interpretation.actionType,
        success: true,
      },
    })

    await prisma.auditLog.create({
      data: {
        userId: actingUserId,
        action: `AI_${interpretation.actionType}`,
        resource: 'AI_ASSISTANT',
        detail: { command: interpretation.command, logs: actionLogs },
      },
    })

    return {
      ok: true,
      message: 'DBへ反映しました。実行ログを確認してください。',
      logs: [...baseLogs, ...actionLogs, 'executed=true'],
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown execution error'
    await prisma.aiOperationLog.create({
      data: {
        userId: actingUserId,
        prompt: interpretation.command,
        response: message,
        action: interpretation.actionType,
        success: false,
      },
    })
    return {
      ok: false,
      message: `実行に失敗しました: ${message}`,
      logs: [...baseLogs, `error=${message}`, 'executed=false'],
    }
  }
}
