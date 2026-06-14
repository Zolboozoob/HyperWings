'use client'
// src/components/admin/AdminSidebar.tsx
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard, Users, FileText, Settings,
  Image, Activity, ChevronRight, Zap
} from 'lucide-react'
import { cn } from '@/lib/utils/cn'

const navItems = [
  { href: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/users',     label: 'Хэрэглэгчид', icon: Users },
  { href: '/admin/content',   label: 'Контент', icon: FileText },
  { href: '/admin/media',     label: 'Медиа', icon: Image },
  { href: '/admin/settings',  label: 'Тохиргоо', icon: Settings },
]

export function AdminSidebar() {
  const pathname = usePathname()

  return (
    <aside className="fixed left-0 top-0 bottom-0 w-64 bg-[#0d0d0d] border-r border-white/5 flex flex-col z-40 hidden lg:flex">
      {/* Logo */}
      <div className="h-16 flex items-center gap-2.5 px-6 border-b border-white/5">
        <Zap className="w-6 h-6 text-brand-500" />
        <span className="font-display font-black text-white text-lg">HyperWings</span>
        <span className="ml-auto text-[10px] bg-brand-500/20 text-brand-400 border border-brand-500/30 rounded px-1.5 py-0.5">Admin</span>
      </div>

      {/* Nav */}
      <nav className="flex-1 py-6 px-3 space-y-1">
        {navItems.map(({ href, label, icon: Icon }) => {
          const active = pathname.startsWith(href)
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all group',
                active
                  ? 'bg-brand-500/15 text-white border border-brand-500/20'
                  : 'text-gray-500 hover:text-white hover:bg-white/5'
              )}
            >
              <Icon className={cn('w-4 h-4', active ? 'text-brand-500' : 'text-gray-600 group-hover:text-gray-400')} />
              {label}
              {active && <ChevronRight className="w-3 h-3 ml-auto text-brand-500" />}
            </Link>
          )
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-white/5">
        <Link href="/" className="text-xs text-gray-600 hover:text-gray-400 transition-colors">
          ← Нүүр хуудас руу буцах
        </Link>
      </div>
    </aside>
  )
}
