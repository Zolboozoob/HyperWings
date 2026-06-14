// src/app/api/auth/register/route.ts
import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { prisma } from '@/lib/db/prisma'
import { RegisterSchema } from '@/lib/validations/auth'
import { sendVerificationEmail } from '@/lib/auth/email'
import crypto from 'crypto'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const parsed = RegisterSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.errors[0].message }, { status: 400 })
    }

    const { name, email, password } = parsed.data

    const existing = await prisma.user.findUnique({ where: { email } })
    if (existing) {
      return NextResponse.json({ error: 'И-мэйл хаяг бүртгэлтэй байна' }, { status: 400 })
    }

    const hashedPassword = await bcrypt.hash(password, 12)

    const user = await prisma.user.create({
      data: { name, email, password: hashedPassword, status: 'PENDING' },
    })

    // Create verification token
    const token = crypto.randomBytes(32).toString('hex')
    await prisma.verificationToken.create({
      data: {
        token,
        userId: user.id,
        expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24h
      },
    })

    await sendVerificationEmail(email, token)

    return NextResponse.json({ message: 'Бүртгэл амжилттай. И-мэйлээ шалгана уу.' }, { status: 201 })
  } catch (error) {
    console.error('[REGISTER]', error)
    return NextResponse.json({ error: 'Серверийн алдаа гарлаа' }, { status: 500 })
  }
}
