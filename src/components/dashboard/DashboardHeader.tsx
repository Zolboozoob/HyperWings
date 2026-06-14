'use client'
// src/components/dashboard/DashboardHeader.tsx
import { signOut } from 'next-auth/react'
import { Moon, Sun, LogOut, User } from 'lucide-react'
import { useTheme } from 'next-themes'
import Image from 'next/image'

interface Props {
  user: { name?: string | null; email?: string | null; image?: string | null; role?: string }
}

export function DashboardHeader({ user }: Props) {
  const { theme, setTheme } = useTheme()

  return (
    <header className="h-16 border-b border-white/5 flex items-center justify-between px-6 bg-[#080808]/80 backdrop-blur sticky top-0 z-30">
      <div className="text-sm font-medium text-white">Сайн байна уу, {user.name?.split(' ')[0]} 👋</div>
      <div className="flex items-center gap-3">
        <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-500 hover:text-white hover:bg-white/5 transition-colors">
          {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        </button>
        <div className="h-5 w-px bg-white/10" />
        {user.image ? (
          <Image src={user.image} alt={user.name || ''} width={28} height={28} className="rounded-full" />
        ) : (
          <div className="w-7 h-7 rounded-full bg-brand-500/20 border border-brand-500/30 flex items-center justify-center">
            <User className="w-3.5 h-3.5 text-brand-500" />
          </div>
        )}
        <button onClick={() => signOut({ callbackUrl: '/login' })}
          className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-500 hover:text-red-400 hover:bg-red-400/10 transition-colors">
          <LogOut className="w-4 h-4" />
        </button>
      </div>
    </header>
  )
}
