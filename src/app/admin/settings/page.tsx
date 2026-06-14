'use client'
// src/app/admin/settings/page.tsx
import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { toast } from 'react-toastify'
import { Save, Loader2 } from 'lucide-react'

export default function AdminSettingsPage() {
  const qc = useQueryClient()
  const [values, setValues] = useState<Record<string, string>>({})

  const { data: settings, isLoading } = useQuery({
    queryKey: ['site-settings'],
    queryFn: () => axios.get('/api/admin/settings').then(r => {
      const map: Record<string, string> = {}
      r.data.forEach((s: any) => { map[s.key] = s.value })
      setValues(map)
      return r.data
    }),
  })

  const save = useMutation({
    mutationFn: (data: Record<string, string>) => axios.post('/api/admin/settings', data),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['site-settings'] }); toast.success('Тохиргоо хадгалагдлаа') },
    onError: () => toast.error('Алдаа гарлаа'),
  })

  const groups: Record<string, { key: string; label: string; type?: string }[]> = {
    general: [
      { key: 'site_name', label: 'Сайтын нэр' },
      { key: 'site_description', label: 'Тайлбар' },
      { key: 'site_email', label: 'И-мэйл', type: 'email' },
      { key: 'site_phone', label: 'Утас' },
    ],
    homepage: [
      { key: 'hero_title', label: 'Hero гарчиг' },
      { key: 'hero_subtitle', label: 'Hero дэд гарчиг' },
      { key: 'stat_devices', label: 'Төхөөрөмжийн тоо' },
      { key: 'stat_uptime', label: 'Uptime' },
    ],
    theme: [
      { key: 'primary_color', label: 'Үндсэн өнгө', type: 'color' },
    ],
  }

  const groupLabels: Record<string, string> = {
    general: '⚙️ Ерөнхий',
    homepage: '🏠 Нүүр хуудас',
    theme: '🎨 Загвар',
  }

  return (
    <div className="space-y-6 max-w-3xl">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-display font-bold text-white">Сайтын тохиргоо</h2>
          <p className="text-gray-500 text-sm mt-1">Кодгүйгээр вебсайтын контентийг удирдах</p>
        </div>
        <button
          onClick={() => save.mutate(values)}
          disabled={save.isPending}
          className="btn-primary flex items-center gap-2 text-sm"
        >
          {save.isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          Хадгалах
        </button>
      </div>

      {isLoading ? (
        <div className="card p-8 text-center text-gray-500">Ачааллаж байна...</div>
      ) : (
        Object.entries(groups).map(([group, fields]) => (
          <div key={group} className="card p-6 space-y-5">
            <h3 className="text-sm font-semibold text-white border-b border-white/5 pb-3">
              {groupLabels[group]}
            </h3>
            {fields.map(({ key, label, type }) => (
              <div key={key}>
                <label className="block text-xs text-gray-500 mb-1.5 font-medium">{label}</label>
                {type === 'color' ? (
                  <div className="flex items-center gap-3">
                    <input type="color" value={values[key] || '#CC1A1A'}
                      onChange={e => setValues(v => ({ ...v, [key]: e.target.value }))}
                      className="w-10 h-10 rounded cursor-pointer border border-white/10 bg-transparent" />
                    <input value={values[key] || ''} onChange={e => setValues(v => ({ ...v, [key]: e.target.value }))}
                      className="input-field text-sm" placeholder="#CC1A1A" />
                  </div>
                ) : (
                  <input
                    type={type || 'text'}
                    value={values[key] || ''}
                    onChange={e => setValues(v => ({ ...v, [key]: e.target.value }))}
                    className="input-field text-sm"
                  />
                )}
              </div>
            ))}
          </div>
        ))
      )}
    </div>
  )
}
