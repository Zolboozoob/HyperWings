// src/app/api/auth/verify-email/route.ts
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db/prisma'
import { sendWelcomeEmail } from '@/lib/auth/email'

export async function POST(req: Request) {
  try {
    const { token } = await req.json()
    const record = await prisma.verificationToken.findUnique({ where: { token } })

    if (!record || record.expires < new Date()) {
      return NextResponse.json({ error: 'Токен хүчингүй эсвэл хугацаа дууссан' }, { status: 400 })
    }

    const user = await prisma.user.update({
      where: { id: record.userId },
      data: { emailVerified: new Date(), status: 'ACTIVE' },
    })

    await prisma.verificationToken.delete({ where: { token } })
    await sendWelcomeEmail(user.email, user.name || 'Хэрэглэгч')

    return NextResponse.json({ message: 'И-мэйл амжилттай баталгаажлаа' })
  } catch (error) {
    return NextResponse.json({ error: 'Серверийн алдаа' }, { status: 500 })
  }
}
