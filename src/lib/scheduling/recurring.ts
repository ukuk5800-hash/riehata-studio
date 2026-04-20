import { addDays, endOfMonth, format, isAfter, isBefore, startOfMonth } from 'date-fns'

export type RecurringRuleInput = {
  id: string
  name: string
  dayOfWeek: number
  startTime: string
  endTime: string
  teacherId: string
  capacity: number
  startDate: Date
  endDate?: Date | null
  holidaySkip?: boolean
}

export type SessionException = {
  date: string
  closed?: boolean
  overrideStartTime?: string
  overrideEndTime?: string
  substituteTeacherId?: string
}

export function generateMonthlySessions(params: {
  rule: RecurringRuleInput
  monthDate: Date
  exceptions?: SessionException[]
  holidays?: string[]
}) {
  const { rule, monthDate, exceptions = [], holidays = [] } = params
  const monthStart = startOfMonth(monthDate)
  const monthEnd = endOfMonth(monthDate)
  const list: Array<{
    date: string
    title: string
    startTime: string
    endTime: string
    teacherId: string
    capacity: number
    status: 'SCHEDULED' | 'CANCELLED'
  }> = []

  let cursor = monthStart
  while (!isAfter(cursor, monthEnd)) {
    const isSameWeekday = cursor.getDay() === rule.dayOfWeek
    const isInRuleRange = !isBefore(cursor, rule.startDate) && (!rule.endDate || !isAfter(cursor, rule.endDate))

    if (isSameWeekday && isInRuleRange) {
      const dateKey = format(cursor, 'yyyy-MM-dd')
      const exception = exceptions.find((item) => item.date === dateKey)
      const isHoliday = holidays.includes(dateKey)
      const shouldClose = exception?.closed || (rule.holidaySkip && isHoliday)

      list.push({
        date: dateKey,
        title: rule.name,
        startTime: exception?.overrideStartTime ?? rule.startTime,
        endTime: exception?.overrideEndTime ?? rule.endTime,
        teacherId: exception?.substituteTeacherId ?? rule.teacherId,
        capacity: rule.capacity,
        status: shouldClose ? 'CANCELLED' : 'SCHEDULED',
      })
    }

    cursor = addDays(cursor, 1)
  }

  return list
}
