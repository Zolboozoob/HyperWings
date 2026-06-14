// src/app/api/admin/users/[id]/route.ts
import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth/auth.config'
import { prisma } from '@/lib/db/prisma'

function isAdmin(session: any) {
  return session?.user?.role === 'ADMIN' || session?.user?.role === 'SUPER_ADMIN'
}

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions)
  if (!isAdmin(session)) return NextResponse.json({ error: 'Unauthorized' }, { status: 403 })

  const body = await req.json()
  const user = await prisma.user.update({
    where: { id: params.id },
    data: body,
    select: { id: true, name: true, email: true, role: true, status: true },
  })

  await prisma.activityLog.create({
    data: {
      userId: session.user.id,
      action: 'UPDATE_USER',
      entity: 'User',
      entityId: params.id,
      details: JSON.stringify(body),
    },
  })

  return NextResponse.json(user)
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions)
  if (session?.user?.role !== 'SUPER_ADMIN') {
    return NextResponse.json({ error: 'Зөвхөн Super Admin устгах эрхтэй' }, { status: 403 })
  }

  await prisma.user.delete({ where: { id: params.id } })
  return NextResponse.json({ message: 'Хэрэглэгч устгалаа' })
}
