import { NextResponse } from 'next/server'
import { z } from 'zod'
import bcrypt from 'bcryptjs'
import { Role } from '@prisma/client'
import { prisma } from '@/lib/prisma'

const bodySchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(8),
  phone: z.string().optional(),
  locale: z.enum(['ja', 'en']).optional().default('ja'),
})

export async function POST(req: Request) {
  try {
    const json = await req.json()
    const body = bodySchema.parse(json)
    const existing = await prisma.user.findUnique({ where: { email: body.email } })
    if (existing) {
      return NextResponse.json({ ok: false, error: 'Email already exists' }, { status: 409 })
    }

    const passwordHash = await bcrypt.hash(body.password, 10)
    const user = await prisma.user.create({
      data: {
        name: body.name,
        email: body.email,
        password: passwordHash,
        phone: body.phone || null,
        role: Role.MEMBER,
        locale: body.locale,
      },
    })

    await prisma.profile.create({
      data: {
        userId: user.id,
        firstName: body.name,
      },
    })

    return NextResponse.json({ ok: true })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ ok: false, error: error.flatten() }, { status: 400 })
    }

    return NextResponse.json({ ok: false, error: 'Registration failed' }, { status: 500 })
  }
}
