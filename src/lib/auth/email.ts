// src/lib/auth/email.ts
import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
})

const baseTemplate = (content: string) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, sans-serif; background: #0a0a0a; color: #fff; margin: 0; padding: 0; }
    .container { max-width: 560px; margin: 40px auto; padding: 40px; background: #111; border-radius: 12px; border: 1px solid rgba(255,255,255,0.08); }
    .logo { text-align: center; margin-bottom: 32px; }
    .logo span { font-size: 24px; font-weight: 800; color: #CC1A1A; }
    .btn { display: inline-block; background: #CC1A1A; color: #fff; text-decoration: none; padding: 12px 28px; border-radius: 8px; font-weight: 600; margin: 24px 0; }
    .footer { margin-top: 32px; font-size: 12px; color: rgba(255,255,255,0.3); text-align: center; }
    p { color: rgba(255,255,255,0.7); line-height: 1.6; }
    h2 { color: #fff; }
  </style>
</head>
<body>
  <div class="container">
    <div class="logo"><span>⚡ HyperWings</span></div>
    ${content}
    <div class="footer">© ${new Date().getFullYear()} HyperWings Mongolia. All rights reserved.</div>
  </div>
</body>
</html>
`

export async function sendVerificationEmail(email: string, token: string) {
  const url = `${process.env.NEXT_PUBLIC_APP_URL}/verify-email?token=${token}`
  await transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to: email,
    subject: 'HyperWings - И-мэйл хаягаа баталгаажуулна уу',
    html: baseTemplate(`
      <h2>И-мэйл хаягаа баталгаажуулна уу</h2>
      <p>HyperWings платформд бүртгүүлсэн танд баярлалаа. Доорх товчийг дарж и-мэйл хаягаа баталгаажуулна уу.</p>
      <a href="${url}" class="btn">И-мэйл баталгаажуулах</a>
      <p style="font-size:13px; color:rgba(255,255,255,0.4)">Холбоос 24 цагийн дараа хүчингүй болно.</p>
    `),
  })
}

export async function sendPasswordResetEmail(email: string, token: string) {
  const url = `${process.env.NEXT_PUBLIC_APP_URL}/reset-password?token=${token}`
  await transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to: email,
    subject: 'HyperWings - Нууц үг сэргээх',
    html: baseTemplate(`
      <h2>Нууц үг сэргээх</h2>
      <p>Таны бүртгэлд нууц үг сэргээх хүсэлт ирсэн байна. Хэрэв та хүсэлт гаргаагүй бол энэ имэйлийг үл тоомсорлоно уу.</p>
      <a href="${url}" class="btn">Нууц үг сэргээх</a>
      <p style="font-size:13px; color:rgba(255,255,255,0.4)">Холбоос 1 цагийн дараа хүчингүй болно.</p>
    `),
  })
}

export async function sendWelcomeEmail(email: string, name: string) {
  await transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to: email,
    subject: 'HyperWings платформд тавтай морил 🚀',
    html: baseTemplate(`
      <h2>Тавтай морил, ${name}!</h2>
      <p>Та HyperWings GPS tracking платформд амжилттай бүртгүүллээ. Одоо та флотоо хянаж эхлэх боломжтой.</p>
      <a href="${process.env.NEXT_PUBLIC_APP_URL}/dashboard" class="btn">Dashboard руу орох</a>
    `),
  })
}
