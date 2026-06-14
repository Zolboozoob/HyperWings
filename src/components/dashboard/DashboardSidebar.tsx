'use client'
// src/components/dashboard/DashboardSidebar.tsx
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, Map, Settings, User, Shield, Zap, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils/cn'

interface Props { role?: string }

export function DashboardSidebar({ role }: Props) {
  const pathname = usePathname()

  const navItems = [
    { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard, exact: true },
    { href: '/dashboard/devices', label: 'GPS Төхөөрөмж', icon: Map },
    { href: '/dashboard/profile', label: 'Профайл', icon: User },
    { href: '/dashboard/settings', label: 'Тохиргоо', icon: Settings },
    ...(role === 'ADMIN' || role === 'SUPER_ADMIN'
      ? [{ href: '/admin/dashboard', label: 'Admin Panel', icon: Shield }]
      : []),
  ]

  return (
    <aside className="fixed left-0 top-0 bottom-0 w-64 bg-[#0d0d0d] border-r border-white/5 flex flex-col z-40 hidden lg:flex">
      <div className="h-16 flex items-center gap-2.5 px-6 border-b border-white/5">
        <Zap className="w-6 h-6 text-brand-500" />
        <span className="font-display font-black text-white text-lg">HyperWings</span>
      </div>
      <nav className="flex-1 py-6 px-3 space-y-1">
        {navItems.map(({ href, label, icon: Icon, exact }) => {
          const active = exact ? pathname === href : pathname.startsWith(href)
          return (
            <Link key={href} href={href}
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all group',
                active ? 'bg-brand-500/15 text-white border border-brand-500/20' : 'text-gray-500 hover:text-white hover:bg-white/5'
              )}
            >
              <Icon className={cn('w-4 h-4', active ? 'text-brand-500' : 'text-gray-600 group-hover:text-gray-400')} />
              {label}
              {active && <ChevronRight className="w-3 h-3 ml-auto text-brand-500" />}
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}
