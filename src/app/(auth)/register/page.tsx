'use client'
// src/app/(auth)/register/page.tsx
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { RegisterSchema, type RegisterInput } from '@/lib/validations/auth'
import { toast } from 'react-toastify'
import axios from 'axios'

export default function RegisterPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)

  const { register, handleSubmit, formState: { errors } } = useForm<RegisterInput>({
    resolver: zodResolver(RegisterSchema),
  })

  const onSubmit = async (data: RegisterInput) => {
    setLoading(true)
    try {
      await axios.post('/api/auth/register', data)
      setDone(true)
      toast.success('Бүртгэл амжилттай! И-мэйлээ шалгана уу.')
    } catch (err: any) {
      toast.error(err.response?.data?.error || 'Бүртгэлд алдаа гарлаа')
    } finally {
      setLoading(false)
    }
  }

  if (done) {
    return (
      <div className="min-h-screen bg-[#080808] flex items-center justify-center p-4">
        <div className="text-center">
          <div className="text-6xl mb-4">📧</div>
          <h2 className="text-2xl font-display font-bold text-white mb-2">И-мэйлээ шалгана уу</h2>
          <p className="text-gray-500 max-w-sm">
            Таны и-мэйл хаягт баталгаажуулах холбоос илгээлээ. И-мэйлээ нээж баталгаажуулна уу.
          </p>
          <Link href="/login" className="inline-block mt-6 btn-primary">
            Нэвтрэх хуудас руу буцах
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#080808] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-6">
            <div className="text-3xl">⚡</div>
            <span className="font-display font-black text-2xl text-white">HyperWings</span>
          </div>
          <h1 className="text-2xl font-display font-bold text-white">Бүртгүүлэх</h1>
          <p className="text-sm text-gray-500 mt-1">Шинэ бүртгэл үүсгэх</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm text-gray-400 mb-1.5">Нэр</label>
            <input {...register('name')} type="text" placeholder="Овог Нэр" className="input-field dark" />
            {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name.message}</p>}
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-1.5">И-мэйл</label>
            <input {...register('email')} type="email" placeholder="name@example.com" className="input-field dark" />
            {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>}
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-1.5">Нууц үг</label>
            <input {...register('password')} type="password" placeholder="Хамгийн багадаа 8 тэмдэгт" className="input-field dark" />
            {errors.password && <p className="text-red-400 text-xs mt-1">{errors.password.message}</p>}
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-1.5">Нууц үг давтах</label>
            <input {...register('confirmPassword')} type="password" placeholder="Нууц үгийг давтана уу" className="input-field dark" />
            {errors.confirmPassword && <p className="text-red-400 text-xs mt-1">{errors.confirmPassword.message}</p>}
          </div>

          <button type="submit" disabled={loading} className="w-full btn-primary disabled:opacity-50">
            {loading ? 'Бүртгэж байна...' : 'Бүртгүүлэх'}
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-6">
          Бүртгэлтэй юу?{' '}
          <Link href="/login" className="text-brand-500 hover:text-brand-400 font-medium">Нэвтрэх</Link>
        </p>
      </div>
    </div>
  )
}
