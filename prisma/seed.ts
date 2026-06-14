// prisma/seed.ts
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  // Super Admin
  const hashedPassword = await bcrypt.hash('Admin@123456', 12)

  const admin = await prisma.user.upsert({
    where: { email: 'admin@hyperwings.mn' },
    update: {},
    create: {
      name: 'Super Admin',
      email: 'admin@hyperwings.mn',
      password: hashedPassword,
      role: 'SUPER_ADMIN',
      status: 'ACTIVE',
      emailVerified: new Date(),
    },
  })

  // Default site settings
  const settings = [
    { key: 'site_name', value: 'HyperWings', group: 'general' },
    { key: 'site_description', value: 'Монголын GPS Tracking платформ', group: 'general' },
    { key: 'site_logo', value: '/images/logo.png', group: 'general' },
    { key: 'site_email', value: 'info@hyperwings.mn', group: 'general' },
    { key: 'site_phone', value: '+976 9999-0000', group: 'general' },
    { key: 'hero_title', value: 'Таны бүх тээврийг бодит цагт хянах платформ', group: 'homepage' },
    { key: 'hero_subtitle', value: 'HyperWings GPS тракер ашиглан жолооч, тээврийн хэрэгсэл, түүний маршрутыг дэлхийн хаана ч байсан хянаарай.', group: 'homepage' },
    { key: 'stat_devices', value: '500+', group: 'homepage' },
    { key: 'stat_uptime', value: '99.9%', group: 'homepage' },
    { key: 'primary_color', value: '#CC1A1A', group: 'theme' },
    { key: 'dark_mode_default', value: 'true', group: 'theme' },
  ]

  for (const s of settings) {
    await prisma.siteSettings.upsert({
      where: { key: s.key },
      update: { value: s.value },
      create: s,
    })
  }

  // Default pages
  await prisma.page.upsert({
    where: { slug: 'home' },
    update: {},
    create: {
      title: 'Нүүр хуудас',
      slug: 'home',
      status: 'PUBLISHED',
    },
  })

  await prisma.page.upsert({
    where: { slug: 'about' },
    update: {},
    create: {
      title: 'Бидний тухай',
      slug: 'about',
      content: 'HyperWings бол Монголын анхны GPS tracking платформ юм.',
      status: 'PUBLISHED',
    },
  })

  console.log('✅ Seed completed:', { admin: admin.email })
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
