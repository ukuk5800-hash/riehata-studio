export type AssistantActionType =
  | 'ADD_RECURRING_CLASS'
  | 'REQUEST_CANCEL_AND_SUBSTITUTES'
  | 'UPDATE_PLAN_BOOKING_OPEN_DAY'
  | 'CREATE_WORKSHOP'
  | 'UPDATE_TRIAL_LP_PROMOTION'
  | 'UNKNOWN'

export type AssistantInterpretation = {
  actionType: AssistantActionType
  confidence: number
  summary: string
  candidates: string[]
  requiresConfirmation: boolean
  command: string
}

export type AssistantExecutionResult = {
  ok: boolean
  message: string
  logs: string[]
}
