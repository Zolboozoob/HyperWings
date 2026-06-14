// src/app/admin/dashboard/page.tsx
import { prisma } from '@/lib/db/prisma'
import { Users, Activity, Monitor, FileText } from 'lucide-react'

export const metadata = { title: 'Admin Dashboard' }

async function getStats() {
  const [users, devices, pages, logs] = await Promise.all([
    prisma.user.count(),
    prisma.device.count(),
    prisma.page.count(),
    prisma.activityLog.count(),
  ])
  const newUsersToday = await prisma.user.count({
    where: { createdAt: { gte: new Date(new Date().setHours(0,0,0,0)) } },
  })
  return { users, devices, pages, logs, newUsersToday }
}

async function getRecentUsers() {
  return prisma.user.findMany({
    orderBy: { createdAt: 'desc' },
    take: 5,
    select: { id: true, name: true, email: true, role: true, status: true, createdAt: true },
  })
}

export default async function AdminDashboard() {
  const [stats, recentUsers] = await Promise.all([getStats(), getRecentUsers()])

  const cards = [
    { label: 'Нийт хэрэглэгч', value: stats.users, sub: `+${stats.newUsersToday} өнөөдөр`, icon: Users, color: 'text-blue-400' },
    { label: 'GPS Төхөөрөмж', value: stats.devices, sub: 'Идэвхтэй', icon: Monitor, color: 'text-green-400' },
    { label: 'Хуудасууд', value: stats.pages, sub: 'CMS хуудас', icon: FileText, color: 'text-purple-400' },
    { label: 'Үйл ажиллагаа', value: stats.logs, sub: 'Нийт log', icon: Activity, color: 'text-brand-400' },
  ]

  const statusColor: Record<string, string> = {
    ACTIVE: 'text-green-400 bg-green-400/10',
    SUSPENDED: 'text-red-400 bg-red-400/10',
    PENDING: 'text-yellow-400 bg-yellow-400/10',
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-display font-bold text-white">Dashboard</h2>
        <p className="text-gray-500 text-sm mt-1">HyperWings платформын тойм</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map(({ label, value, sub, icon: Icon, color }) => (
          <div key={label} className="card p-5">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-gray-500 text-xs font-medium">{label}</p>
                <p className="text-3xl font-display font-bold text-white mt-1">{value}</p>
                <p className="text-xs text-gray-600 mt-1">{sub}</p>
              </div>
              <div className={`p-2 rounded-lg bg-white/5 ${color}`}>
                <Icon className="w-5 h-5" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Users */}
      <div className="card">
        <div className="p-5 border-b border-white/5">
          <h3 className="text-sm font-semibold text-white">Сүүлийн хэрэглэгчид</h3>
        </div>
        <div className="divide-y divide-white/5">
          {recentUsers.map((u) => (
            <div key={u.id} className="p-4 flex items-center justify-between">
              <div>
                <p className="text-sm text-white font-medium">{u.name || 'Нэргүй'}</p>
                <p className="text-xs text-gray-500">{u.email}</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs text-gray-600">{u.role}</span>
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${statusColor[u.status]}`}>
                  {u.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
