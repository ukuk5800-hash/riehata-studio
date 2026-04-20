import { NextResponse } from 'next/server'
import { z } from 'zod'
import { interpretCommand } from '@/lib/assistant/parser'
import { executeInterpretedAction } from '@/lib/assistant/executor'

const requestSchema = z.object({
  command: z.string().min(1),
  execute: z.boolean().optional().default(false),
})

export async function POST(req: Request) {
  try {
    const json = await req.json()
    const body = requestSchema.parse(json)
    const interpretation = interpretCommand(body.command)

    if (!body.execute) {
      return NextResponse.json({
        ok: true,
        mode: 'interpret',
        interpretation,
      })
    }

    const result = await executeInterpretedAction(interpretation)

    return NextResponse.json({
      ok: result.ok,
      mode: 'execute',
      interpretation,
      result,
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ ok: false, error: error.flatten() }, { status: 400 })
    }

    return NextResponse.json(
      { ok: false, error: 'Failed to process assistant command.' },
      { status: 500 },
    )
  }
}
