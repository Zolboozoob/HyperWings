// src/app/api/auth/forgot-password/route.ts
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db/prisma'
import { sendPasswordResetEmail } from '@/lib/auth/email'
import crypto from 'crypto'

export async function POST(req: Request) {
  try {
    const { email } = await req.json()
    const user = await prisma.user.findUnique({ where: { email } })

    // Always return success to prevent email enumeration
    if (!user) {
      return NextResponse.json({ message: 'Хэрэв и-мэйл бүртгэлтэй бол имэйл илгээлээ.' })
    }

    const token = crypto.randomBytes(32).toString('hex')
    await prisma.passwordReset.create({
      data: {
        token,
        userId: user.id,
        expires: new Date(Date.now() + 60 * 60 * 1000), // 1h
      },
    })

    await sendPasswordResetEmail(email, token)
    return NextResponse.json({ message: 'Нууц үг сэргээх и-мэйл илгээлээ.' })
  } catch (error) {
    return NextResponse.json({ error: 'Серверийн алдаа' }, { status: 500 })
  }
}
