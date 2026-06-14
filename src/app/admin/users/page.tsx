'use client'
// src/app/admin/users/page.tsx
import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { Search, Plus, MoreHorizontal, Shield, Ban, Trash2 } from 'lucide-react'
import { toast } from 'react-toastify'
import { format } from 'date-fns'

export default function AdminUsersPage() {
  const qc = useQueryClient()
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)

  const { data, isLoading } = useQuery({
    queryKey: ['admin-users', search, page],
    queryFn: () => axios.get(`/api/admin/users?search=${search}&page=${page}`).then(r => r.data),
  })

  const updateUser = useMutation({
    mutationFn: ({ id, ...body }: any) => axios.patch(`/api/admin/users/${id}`, body),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['admin-users'] }); toast.success('Хэрэглэгч шинэчлэгдлээ') },
    onError: () => toast.error('Алдаа гарлаа'),
  })

  const deleteUser = useMutation({
    mutationFn: (id: string) => axios.delete(`/api/admin/users/${id}`),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['admin-users'] }); toast.success('Хэрэглэгч устгалаа') },
    onError: () => toast.error('Алдаа гарлаа'),
  })

  const statusColor: Record<string, string> = {
    ACTIVE: 'text-green-400 bg-green-400/10 border-green-400/20',
    SUSPENDED: 'text-red-400 bg-red-400/10 border-red-400/20',
    PENDING: 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20',
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-display font-bold text-white">Хэрэглэгчид</h2>
          <p className="text-gray-500 text-sm mt-1">Нийт {data?.total || 0} хэрэглэгч</p>
        </div>
        <button className="btn-primary flex items-center gap-2 text-sm">
          <Plus className="w-4 h-4" /> Хэрэглэгч нэмэх
        </button>
      </div>

      {/* Search */}
      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
        <input
          value={search}
          onChange={e => { setSearch(e.target.value); setPage(1) }}
          placeholder="Нэр, и-мэйлээр хайх..."
          className="input-field pl-9 text-sm"
        />
      </div>

      {/* Table */}
      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/5 text-left">
                <th className="px-5 py-3 text-xs font-medium text-gray-500">Нэр</th>
                <th className="px-5 py-3 text-xs font-medium text-gray-500">Роль</th>
                <th className="px-5 py-3 text-xs font-medium text-gray-500">Статус</th>
                <th className="px-5 py-3 text-xs font-medium text-gray-500">Огноо</th>
                <th className="px-5 py-3 text-xs font-medium text-gray-500 text-right">Үйлдэл</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {isLoading ? (
                [...Array(5)].map((_, i) => (
                  <tr key={i}>
                    {[...Array(5)].map((_, j) => (
                      <td key={j} className="px-5 py-4">
                        <div className="h-4 bg-white/5 rounded animate-pulse" />
                      </td>
                    ))}
                  </tr>
                ))
              ) : data?.users?.map((u: any) => (
                <tr key={u.id} className="hover:bg-white/2 transition-colors">
                  <td className="px-5 py-4">
                    <div>
                      <p className="text-white font-medium">{u.name || 'Нэргүй'}</p>
                      <p className="text-xs text-gray-500">{u.email}</p>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <span className="flex items-center gap-1 text-gray-400">
                      {u.role === 'SUPER_ADMIN' && <Shield className="w-3.5 h-3.5 text-brand-500" />}
                      <span className="text-xs">{u.role}</span>
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <span className={`text-xs px-2 py-0.5 rounded-full border font-medium ${statusColor[u.status]}`}>
                      {u.status}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-xs text-gray-500">
                    {format(new Date(u.createdAt), 'yyyy/MM/dd')}
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => updateUser.mutate({ id: u.id, status: u.status === 'ACTIVE' ? 'SUSPENDED' : 'ACTIVE' })}
                        className="p-1.5 rounded text-gray-500 hover:text-yellow-400 hover:bg-yellow-400/10 transition-colors"
                        title={u.status === 'ACTIVE' ? 'Хаах' : 'Нээх'}
                      >
                        <Ban className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => { if(confirm('Устгах уу?')) deleteUser.mutate(u.id) }}
                        className="p-1.5 rounded text-gray-500 hover:text-red-400 hover:bg-red-400/10 transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {data?.pages > 1 && (
          <div className="flex items-center justify-between px-5 py-4 border-t border-white/5">
            <span className="text-xs text-gray-500">{page} / {data.pages} хуудас</span>
            <div className="flex gap-2">
              <button onClick={() => setPage(p => Math.max(1, p-1))} disabled={page === 1}
                className="px-3 py-1 rounded text-xs border border-white/10 text-gray-400 hover:border-white/20 disabled:opacity-30">
                ← Өмнөх
              </button>
              <button onClick={() => setPage(p => Math.min(data.pages, p+1))} disabled={page === data.pages}
                className="px-3 py-1 rounded text-xs border border-white/10 text-gray-400 hover:border-white/20 disabled:opacity-30">
                Дараах →
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
