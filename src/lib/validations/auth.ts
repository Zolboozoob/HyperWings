// src/lib/validations/auth.ts
import { z } from 'zod'

export const RegisterSchema = z.object({
  name: z.string().min(2, 'Нэр хамгийн багадаа 2 тэмдэгт байна'),
  email: z.string().email('Зөв и-мэйл хаяг оруулна уу'),
  password: z
    .string()
    .min(8, 'Нууц үг хамгийн багадаа 8 тэмдэгт байна')
    .regex(/[A-Z]/, 'Нэг том үсэг агуулсан байна')
    .regex(/[0-9]/, 'Нэг тоо агуулсан байна'),
  confirmPassword: z.string(),
}).refine((d) => d.password === d.confirmPassword, {
  message: 'Нууц үг таарахгүй байна',
  path: ['confirmPassword'],
})

export const LoginSchema = z.object({
  email: z.string().email('Зөв и-мэйл хаяг оруулна уу'),
  password: z.string().min(1, 'Нууц үг оруулна уу'),
})

export const ForgotPasswordSchema = z.object({
  email: z.string().email('Зөв и-мэйл хаяг оруулна уу'),
})

export const ResetPasswordSchema = z.object({
  password: z
    .string()
    .min(8, 'Нууц үг хамгийн багадаа 8 тэмдэгт байна')
    .regex(/[A-Z]/, 'Нэг том үсэг агуулсан байна')
    .regex(/[0-9]/, 'Нэг тоо агуулсан байна'),
  confirmPassword: z.string(),
}).refine((d) => d.password === d.confirmPassword, {
  message: 'Нууц үг таарахгүй байна',
  path: ['confirmPassword'],
})

export const UpdateProfileSchema = z.object({
  name: z.string().min(2),
  phone: z.string().optional(),
  company: z.string().optional(),
  image: z.string().optional(),
})

export const UserManagementSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  role: z.enum(['USER', 'ADMIN', 'SUPER_ADMIN']),
  status: z.enum(['ACTIVE', 'SUSPENDED', 'PENDING']),
})

export type RegisterInput = z.infer<typeof RegisterSchema>
export type LoginInput = z.infer<typeof LoginSchema>
export type ForgotPasswordInput = z.infer<typeof ForgotPasswordSchema>
export type ResetPasswordInput = z.infer<typeof ResetPasswordSchema>
export type UpdateProfileInput = z.infer<typeof UpdateProfileSchema>
export type UserManagementInput = z.infer<typeof UserManagementSchema>
