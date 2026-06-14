# ⚡ HyperWings — Full-Stack GPS Tracking Platform

Next.js 14 + TypeScript + PostgreSQL + NextAuth

---

## 🚀 Хурдан эхлүүлэх

### 1. Суулгах
```bash
npm install
```

### 2. Environment тохируулах
```bash
cp .env.example .env.local
# .env.local файлд утгуудаа оруул
```

### 3. Database тохируулах
```bash
# Vercel Postgres эсвэл Neon.tech ашиглах
npm run db:push    # Schema push
npm run db:seed    # Default data
```

### 4. Ажиллуулах
```bash
npm run dev
```

---

## 📁 Бүтэц

```
src/
├── app/
│   ├── (auth)/              # Login, Register, Forgot/Reset password
│   ├── admin/               # Admin dashboard (ADMIN only)
│   ├── dashboard/           # Client dashboard
│   └── api/                 # API routes
│       ├── auth/            # NextAuth + Register/Verify/Reset
│       ├── admin/           # Admin APIs
│       └── uploadthing/     # File upload
├── components/
│   ├── admin/               # Admin UI components
│   ├── dashboard/           # Client dashboard components
│   └── shared/              # Providers, layouts
├── lib/
│   ├── auth/                # NextAuth config + email
│   ├── db/                  # Prisma client
│   ├── validations/         # Zod schemas
│   └── utils/               # Helper functions
├── types/                   # TypeScript type extensions
└── middleware.ts            # Route protection
```

---

## 🔐 Нэвтрэх

| И-мэйл | Нууц үг | Роль |
|--------|---------|------|
| admin@hyperwings.mn | Admin@123456 | SUPER_ADMIN |

---

## ✅ Хийгдсэн зүйлс

- [x] Next.js 14 + TypeScript + Tailwind CSS
- [x] PostgreSQL + Prisma ORM
- [x] NextAuth (Credentials + Google + GitHub)
- [x] Register, Login, Logout
- [x] Email verification
- [x] Forgot/Reset password
- [x] Role-based middleware (USER / ADMIN / SUPER_ADMIN)
- [x] Admin dashboard
- [x] User management (CRUD, suspend, role change)
- [x] CMS settings (site name, colors, content)
- [x] File upload (UploadThing)
- [x] Client dashboard
- [x] Dark/Light mode
- [x] Activity logging
- [x] Vercel deployment config

---

## 🌐 Vercel Deploy

1. GitHub-д push хийх
2. [vercel.com](https://vercel.com) дээр import хийх
3. Environment variables тохируулах
4. Vercel Postgres нэмэх (Storage tab)
5. Deploy!

---

## 📦 Гол dependencies

- `next` — Framework
- `@prisma/client` — Database ORM
- `next-auth` — Authentication
- `uploadthing` — File uploads
- `zod` — Validation
- `react-hook-form` — Forms
- `@tanstack/react-query` — Data fetching
- `next-themes` — Dark mode
- `lucide-react` — Icons
