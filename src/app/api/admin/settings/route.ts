// src/app/api/admin/settings/route.ts
import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth/auth.config'
import { prisma } from '@/lib/db/prisma'

function isAdmin(s: any) {
  return s?.user?.role === 'ADMIN' || s?.user?.role === 'SUPER_ADMIN'
}

export async function GET() {
  const settings = await prisma.siteSettings.findMany({ orderBy: { group: 'asc' } })
  return NextResponse.json(settings)
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions)
  if (!isAdmin(session)) return NextResponse.json({ error: 'Unauthorized' }, { status: 403 })

  const body = await req.json() // { key: value, ... }
  const updates = await Promise.all(
    Object.entries(body).map(([key, value]) =>
      prisma.siteSettings.upsert({
        where: { key },
        update: { value: String(value) },
        create: { key, value: String(value) },
      })
    )
  )

  return NextResponse.json({ updated: updates.length })
}
