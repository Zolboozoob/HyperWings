// src/app/api/auth/reset-password/route.ts
import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { prisma } from '@/lib/db/prisma'
import { ResetPasswordSchema } from '@/lib/validations/auth'

export async function POST(req: Request) {
  try {
    const { token, ...body } = await req.json()
    const parsed = ResetPasswordSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.errors[0].message }, { status: 400 })
    }

    const reset = await prisma.passwordReset.findUnique({ where: { token } })
    if (!reset || reset.used || reset.expires < new Date()) {
      return NextResponse.json({ error: 'Холбоос хүчингүй эсвэл хугацаа дууссан' }, { status: 400 })
    }

    const hashedPassword = await bcrypt.hash(parsed.data.password, 12)
    await prisma.user.update({
      where: { id: reset.userId },
      data: { password: hashedPassword },
    })
    await prisma.passwordReset.update({ where: { token }, data: { used: true } })

    return NextResponse.json({ message: 'Нууц үг амжилттай солигдлоо' })
  } catch (error) {
    return NextResponse.json({ error: 'Серверийн алдаа' }, { status: 500 })
  }
}
