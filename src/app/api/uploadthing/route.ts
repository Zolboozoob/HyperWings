// src/app/api/uploadthing/route.ts
import { createRouteHandler } from 'uploadthing/next'
import { createUploadthing, type FileRouter } from 'uploadthing/next'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth/auth.config'
import { prisma } from '@/lib/db/prisma'

const f = createUploadthing()

export const uploadRouter = {
  imageUploader: f({ image: { maxFileSize: '4MB', maxFileCount: 10 } })
    .middleware(async () => {
      const session = await getServerSession(authOptions)
      if (!session?.user) throw new Error('Unauthorized')
      return { userId: session.user.id }
    })
    .onUploadComplete(async ({ metadata, file }) => {
      await prisma.mediaFile.create({
        data: {
          userId: metadata.userId,
          name: file.name,
          url: file.url,
          type: 'image',
          size: file.size,
        },
      })
      return { url: file.url }
    }),

  documentUploader: f({ pdf: { maxFileSize: '16MB' }, 'text/csv': { maxFileSize: '4MB' } })
    .middleware(async () => {
      const session = await getServerSession(authOptions)
      if (!session?.user) throw new Error('Unauthorized')
      return { userId: session.user.id }
    })
    .onUploadComplete(async ({ metadata, file }) => {
      await prisma.mediaFile.create({
        data: {
          userId: metadata.userId,
          name: file.name,
          url: file.url,
          type: 'document',
          size: file.size,
        },
      })
      return { url: file.url }
    }),
} satisfies FileRouter

export type OurFileRouter = typeof uploadRouter

const { GET, POST } = createRouteHandler({ router: uploadRouter })
export { GET, POST }
