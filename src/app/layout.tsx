// src/app/layout.tsx
import type { Metadata } from 'next'
import { DM_Sans, Syne } from 'next/font/google'
import './globals.css'
import { Providers } from '@/components/shared/Providers'

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
})

const syne = Syne({
  subsets: ['latin'],
  variable: '--font-syne',
})

export const metadata: Metadata = {
  title: { default: 'HyperWings', template: '%s | HyperWings' },
  description: 'Монголын GPS Tracking & Fleet Management платформ',
  icons: { icon: '/icons/favicon.ico' },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="mn" suppressHydrationWarning>
      <body className={`${dmSans.variable} ${syne.variable} font-sans`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
