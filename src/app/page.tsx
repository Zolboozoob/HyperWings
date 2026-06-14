// src/app/page.tsx
import Link from 'next/link'
import Image from 'next/image'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth/auth.config'
import {
  ArrowRight, Globe2, MapPin, Truck, Fuel, Gauge, Box, Route,
  BarChart3, Package, Mountain, HardHat, Landmark, Activity, Layers,
  ShieldCheck, Rocket, Headset, Quote,
} from 'lucide-react'

export default async function HomePage() {
  const session = await getServerSession(authOptions)

  const products = [
    { icon: MapPin, name: 'GPS хяналт', desc: 'Бодит цагийн байршил, маршрут, түүх' },
    { icon: Truck, name: 'Флот удирдлага', desc: 'Бүх тээврийн хэрэгслийг нэг дороос' },
    { icon: Fuel, name: 'Түлшний хяналт', desc: 'Зарцуулалт, дүүргэлт, хэлбэлзэл' },
    { icon: Gauge, name: 'Жолоочийн дүн', desc: 'Хурд, түрхэлт, эрсдэлтэй зам' },
    { icon: Box, name: 'Хөрөнгийн хяналт', desc: 'Тоног төхөөрөмж, ачаа хяналт' },
    { icon: Route, name: 'Маршрут оптимчлол', desc: 'Хамгийн хэмнэлттэй зам' },
    { icon: BarChart3, name: 'Телематик анализ', desc: 'Дэлгэрэнгүй тайлан, дата' },
    { icon: Globe2, name: 'Глобал SIM', desc: 'Дэлхийн хаана ч холболт' },
  ]

  const industries = [
    { icon: Package, name: 'Ложистик' },
    { icon: Mountain, name: 'Уул уурхай' },
    { icon: Truck, name: 'Тээвэр' },
    { icon: HardHat, name: 'Барилга' },
    { icon: Landmark, name: 'Засгийн газар' },
  ]

  const stats = [
    { value: '12,400+', label: 'Хянагдаж буй тээврийн хэрэгсэл' },
    { value: '40+', label: 'Орон бүрхэлт' },
    { value: '2.8B+', label: 'Сараар боловсруулсан дата цэг' },
    { value: '99.98%', label: 'Системийн ажиллагаа' },
  ]

  const why = [
    { icon: Globe2, title: 'Глобал бүрхэлт', desc: 'Дэлхийн хаана ч ажиллагаатай сүлжээ' },
    { icon: Activity, title: 'Бодит цагийн харагдац', desc: 'Секунд тутамд шинэчлэгдэх дата' },
    { icon: Layers, title: 'Өргөтгөх боломжтой бүтэц', desc: 'Олон мянган төхөөрөмжийг дэмжинэ' },
    { icon: ShieldCheck, title: 'Enterprise аюулгүй байдал', desc: 'Шифрлэгдсэн дамжуулалт, эрхийн хяналт' },
    { icon: Rocket, title: 'Хурдан нэвтрүүлэлт', desc: 'Хэдхэн өдрийн дотор бэлэн болно' },
    { icon: Headset, title: '24/7 дэмжлэг', desc: 'Тасралтгүй техникийн тусламж' },
  ]

  return (
    <div className="min-h-screen bg-white text-[#0A0F1E] antialiased">
      {/* Ambient background glow */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[1200px] h-[700px] rounded-full bg-gradient-to-b from-[#E8F6FF] to-transparent blur-3xl opacity-70" />
        <div className="absolute top-[40%] -right-60 w-[700px] h-[700px] rounded-full bg-gradient-to-bl from-[#EAFBFF] to-transparent blur-3xl opacity-60" />
      </div>

      {/* Nav */}
      <nav className="relative z-20 sticky top-0">
        <div className="max-w-[1280px] mx-auto px-6 sm:px-10">
          <div className="flex items-center justify-between h-20 px-6 mt-4 rounded-2xl bg-white/70 backdrop-blur-xl border border-[#0A0F1E]/[0.06] shadow-[0_8px_30px_-12px_rgba(10,15,30,0.08)]">
            <div className="flex items-center gap-2.5">
              <Image src="/images/logo.png" alt="HyperWings" width={52} height={52} className="w-15 h-15 object-contain" />
              <span className="font-display font-semibold text-[17px] tracking-tight">HyperWings</span>
            </div>
            <div className="hidden lg:flex items-center gap-9 text-[14px] font-medium text-[#475569]">
              <a href="#products" className="hover:text-[#0A0F1E] transition-colors">Бүтээгдэхүүн</a>
              <a href="#dashboard" className="hover:text-[#0A0F1E] transition-colors">Дашбоард</a>
              <a href="#industries" className="hover:text-[#0A0F1E] transition-colors">Салбарууд</a>
              <a href="#contact" className="hover:text-[#0A0F1E] transition-colors">Холбоо барих</a>
            </div>
            <div className="flex items-center gap-3">
              {session ? (
                <Link href="/dashboard" className="text-[14px] font-semibold px-5 py-2.5 rounded-full bg-[#0A0F1E] text-white hover:bg-[#1E293B] transition-colors">
                  Хяналтын самбар
                </Link>
              ) : (
                <>
                  <Link href="/login" className="hidden sm:block text-[14px] font-semibold text-[#0A0F1E] hover:text-[#0EA5E9] transition-colors">
                    Нэвтрэх
                  </Link>
                  <Link href="/register" className="text-[14px] font-semibold px-5 py-2.5 rounded-full bg-[#0A0F1E] text-white hover:bg-[#1E293B] transition-colors flex items-center gap-1.5">
                    Demo хүсэх
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative z-10 max-w-[1280px] mx-auto px-6 sm:px-10 pt-20 sm:pt-28 pb-16">
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0EA5E9]/[0.07] border border-[#0EA5E9]/15 text-[#0284C7] text-[13px] font-medium mb-8">
            <Globe2 className="w-3.5 h-3.5" />
            Мэндээ Мөөгий vs Ганзо Зооб үзээ бна уу?
          </div>
          <h1 className="font-display font-semibold text-[2.75rem] sm:text-[4.25rem] leading-[1.05] tracking-tight">
            Дэлхийд өрсөлдөх
            <br />
            <span className="bg-gradient-to-r from-[#0EA5E9] to-[#22D3EE] bg-clip-text text-transparent">GPS хяналтын систем</span>
          </h1>
          <p className="text-[#475569] text-lg sm:text-xl leading-relaxed mt-6 max-w-xl mx-auto">
            Тээврийн хэрэгсэл, техник хэрэгслээ хаанаас ч бодит цагт хянаж, бүх мэдээллээ нэг платформоос удирдаарай.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-10">
            <Link href="/register" className="w-full sm:w-auto text-[15px] font-semibold px-7 py-3.5 rounded-full bg-[#0A0F1E] text-white hover:bg-[#1E293B] transition-colors flex items-center justify-center gap-2">
              Demo хүсэх <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/login" className="w-full sm:w-auto text-[15px] font-semibold px-7 py-3.5 rounded-full bg-white border border-[#0A0F1E]/10 hover:border-[#0A0F1E]/20 transition-colors flex items-center justify-center gap-2">
              <Headset className="w-4 h-4" /> Борлуулалттай холбогдох
            </Link>
          </div>
        </div>

        {/* Hero visual: dashboard floating over network */}
        <div className="relative mt-20 sm:mt-28">
          <div className="relative rounded-[28px] bg-gradient-to-b from-[#0A0F1E] to-[#1E293B] aspect-[16/9] sm:aspect-[16/7] overflow-hidden shadow-[0_30px_80px_-30px_rgba(10,15,30,0.4)]">
            {/* Network grid */}
            <div
              className="absolute inset-0 opacity-[0.18]"
              style={{
                backgroundImage:
                  'linear-gradient(rgba(94,234,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(94,234,255,0.5) 1px, transparent 1px)',
                backgroundSize: '40px 40px',
              }}
            />
            {/* Connection lines + moving vehicles (SVG) */}
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1200 600" preserveAspectRatio="none" fill="none">
              <path id="route1" d="M120,420 C300,250 480,500 660,300 C820,140 980,380 1120,180" stroke="#22D3EE" strokeOpacity="0.35" strokeWidth="1.5" fill="none" />
              <path id="route2" d="M60,180 C260,360 420,120 620,260 C800,380 960,150 1140,340" stroke="#0EA5E9" strokeOpacity="0.25" strokeWidth="1.5" fill="none" />

              <circle r="6" fill="#22D3EE">
                <animateMotion dur="9s" repeatCount="indefinite" rotate="auto">
                  <mpath href="#route1" />
                </animateMotion>
              </circle>
              <circle r="6" fill="#0EA5E9">
                <animateMotion dur="12s" repeatCount="indefinite" rotate="auto">
                  <mpath href="#route2" />
                </animateMotion>
              </circle>
            </svg>
            {/* Network nodes */}
            {[
              { top: '32%', left: '12%' },
              { top: '58%', left: '34%' },
              { top: '24%', left: '52%' },
              { top: '66%', left: '64%' },
              { top: '38%', left: '82%' },
              { top: '20%', left: '92%' },
            ].map((pos, i) => (
              <span key={i} className="absolute w-2 h-2 rounded-full bg-[#22D3EE]" style={{ top: pos.top, left: pos.left }}>
                <span className="absolute inset-0 rounded-full bg-[#22D3EE] animate-ping opacity-50" />
              </span>
            ))}

            {/* Floating dashboard card */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-[92%] sm:w-[78%] bg-white/95 backdrop-blur-xl rounded-2xl border border-white/40 shadow-2xl px-5 sm:px-7 py-4 sm:py-5">
              <div className="flex items-center justify-between mb-4">
                <span className="font-display font-semibold text-sm sm:text-base">Флотын хяналт</span>
                <span className="flex items-center gap-1.5 text-[12px] font-medium text-[#0EA5E9]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0EA5E9] animate-pulse" />
                  Шууд дамжуулалт
                </span>
              </div>
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 sm:gap-4">
                {[
                  { label: 'Идэвхтэй', value: '8,214' },
                  { label: 'Дундаж хурд', value: '54 км/ц' },
                  { label: 'Маршрутууд', value: '1,902' },
                  { label: 'Анхааруулга', value: '12' },
                ].map((m) => (
                  <div key={m.label} className="hidden sm:block first:block">
                    <p className="font-display font-semibold text-lg sm:text-2xl">{m.value}</p>
                    <p className="text-[11px] sm:text-[12px] text-[#64748B]">{m.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust / stats */}
      <section className="relative z-10 max-w-[1280px] mx-auto px-6 sm:px-10 py-20 sm:py-24">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-px rounded-2xl overflow-hidden bg-[#0A0F1E]/[0.06]">
          {stats.map((s) => (
            <div key={s.label} className="bg-white px-6 py-8 sm:py-10">
              <p className="font-display font-semibold text-2xl sm:text-3xl tracking-tight">{s.value}</p>
              <p className="text-[13px] text-[#64748B] mt-1.5 leading-snug">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Products */}
      <section id="products" className="relative z-10 max-w-[1280px] mx-auto px-6 sm:px-10 py-12 sm:py-16">
        <div className="text-center max-w-xl mx-auto mb-14">
          <p className="text-[13px] font-semibold uppercase tracking-[0.15em] text-[#0EA5E9] mb-3">Бүтээгдэхүүн</p>
          <h2 className="font-display font-semibold text-3xl sm:text-4xl tracking-tight">Бүх төрлийн телематик нэг platform-д</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {products.map((p) => (
            <div
              key={p.name}
              className="group rounded-2xl bg-white border border-[#0A0F1E]/[0.06] p-6 hover:border-[#0EA5E9]/30 hover:shadow-[0_12px_40px_-16px_rgba(14,165,233,0.25)] transition-all duration-300"
            >
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#E8F6FF] to-[#EAFBFF] flex items-center justify-center mb-4 group-hover:from-[#0EA5E9] group-hover:to-[#22D3EE] transition-colors duration-300">
                <p.icon className="w-5 h-5 text-[#0284C7] group-hover:text-white transition-colors duration-300" strokeWidth={1.75} />
              </div>
              <h3 className="font-display font-semibold text-[15px] mb-1.5">{p.name}</h3>
              <p className="text-[13px] text-[#64748B] leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Dashboard showcase */}
      <section id="dashboard" className="relative z-10 max-w-[1280px] mx-auto px-6 sm:px-10 py-20 sm:py-28">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-[13px] font-semibold uppercase tracking-[0.15em] text-[#0EA5E9] mb-3">Дашбоард</p>
            <h2 className="font-display font-semibold text-3xl sm:text-4xl tracking-tight leading-tight mb-5">
              Бодит цагийн харагдац, дэлгэрэнгүй тайлан
            </h2>
            <p className="text-[#475569] text-base leading-relaxed mb-8">
              Байршил, маршрутын түүх, хурдны хэлбэлзэл, түлшний аналитик болон автомат
              анхааруулгыг нэг дороос — enterprise-grade интерфэйс дотор.
            </p>
            <div className="space-y-4">
              {[
                { icon: Activity, text: 'Машин бүрийн байршил, хурд секунд тутамд шинэчлэгдэнэ' },
                { icon: BarChart3, text: 'Түлш, маршрут, ажиллах цагийн дэлгэрэнгүй тайлан' },
                { icon: ShieldCheck, text: 'Эрхийн түвшинд тохирсон хандалтын хяналт' },
              ].map((f) => (
                <div key={f.text} className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-lg bg-[#E8F6FF] flex items-center justify-center shrink-0">
                    <f.icon className="w-4 h-4 text-[#0284C7]" strokeWidth={1.75} />
                  </div>
                  <p className="text-[14px] text-[#334155] pt-1.5 leading-relaxed">{f.text}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-2xl bg-gradient-to-b from-[#0A0F1E] to-[#1E293B] p-6 sm:p-8 shadow-[0_30px_80px_-30px_rgba(10,15,30,0.4)]">
            <div className="flex items-center justify-between mb-6">
              <span className="text-white font-display font-semibold text-sm">Жилийн ачаалал</span>
              <span className="text-[#7DD3FC] text-[12px] font-medium">2026</span>
            </div>
            <div className="flex items-end gap-2 h-40">
              {[40, 65, 50, 80, 60, 95, 70, 88, 55, 92, 75, 100].map((h, i) => (
                <div key={i} className="flex-1 rounded-t-md bg-gradient-to-t from-[#0EA5E9]/40 to-[#22D3EE]" style={{ height: `${h}%` }} />
              ))}
            </div>
            <div className="grid grid-cols-3 gap-4 mt-8 pt-6 border-t border-white/10">
              <div>
                <p className="text-white font-display font-semibold text-xl">2.8B</p>
                <p className="text-[#7DD3FC] text-[11px]">дата цэг/сар</p>
              </div>
              <div>
                <p className="text-white font-display font-semibold text-xl">99.98%</p>
                <p className="text-[#7DD3FC] text-[11px]">ажиллагаа</p>
              </div>
              <div>
                <p className="text-white font-display font-semibold text-xl">&lt;5с</p>
                <p className="text-[#7DD3FC] text-[11px]">шинэчлэлт</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Industries */}
      <section id="industries" className="relative z-10 max-w-[1280px] mx-auto px-6 sm:px-10 py-12 sm:py-16">
        <div className="text-center max-w-xl mx-auto mb-12">
          <p className="text-[13px] font-semibold uppercase tracking-[0.15em] text-[#0EA5E9] mb-3">Салбарууд</p>
          <h2 className="font-display font-semibold text-3xl sm:text-4xl tracking-tight">Аль ч салбарт нийцнэ</h2>
        </div>
        <div className="flex flex-wrap justify-center gap-3">
          {industries.map((ind) => (
            <div
              key={ind.name}
              className="flex items-center gap-2.5 rounded-full bg-white border border-[#0A0F1E]/[0.06] px-5 py-3 hover:border-[#0EA5E9]/30 hover:shadow-[0_8px_24px_-12px_rgba(14,165,233,0.2)] transition-all"
            >
              <ind.icon className="w-4 h-4 text-[#0284C7]" strokeWidth={1.75} />
              <span className="text-[14px] font-medium">{ind.name}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Why HyperWings */}
      <section className="relative z-10 max-w-[1280px] mx-auto px-6 sm:px-10 py-20 sm:py-28">
        <div className="text-center max-w-xl mx-auto mb-14">
          <p className="text-[13px] font-semibold uppercase tracking-[0.15em] text-[#0EA5E9] mb-3">Яагаад HyperWings</p>
          <h2 className="font-display font-semibold text-3xl sm:text-4xl tracking-tight">Enterprise-д зориулсан найдвартай байдал</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {why.map((w) => (
            <div key={w.title} className="rounded-2xl bg-gradient-to-b from-[#F8FBFF] to-white border border-[#0A0F1E]/[0.05] p-6">
              <div className="w-10 h-10 rounded-lg bg-white border border-[#0A0F1E]/[0.06] flex items-center justify-center mb-4">
                <w.icon className="w-5 h-5 text-[#0284C7]" strokeWidth={1.75} />
              </div>
              <h3 className="font-display font-semibold text-[15px] mb-1.5">{w.title}</h3>
              <p className="text-[13px] text-[#64748B] leading-relaxed">{w.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonial */}
      <section className="relative z-10 max-w-[1280px] mx-auto px-6 sm:px-10 py-12 sm:py-16">
        <div className="rounded-3xl bg-gradient-to-br from-[#0A0F1E] to-[#1E293B] px-8 sm:px-16 py-14 sm:py-20 text-center">
          <Quote className="w-8 h-8 text-[#22D3EE] mx-auto mb-6" strokeWidth={1.5} />
          <p className="font-display text-white text-xl sm:text-2xl leading-relaxed max-w-2xl mx-auto">
            HyperWings бидний 600 гаруй тээврийн хэрэгслийг бодит цагт хянах боломжтой болгож,
            ажиллагааны зардлыг 18% бууруулсан.
          </p>
          <p className="text-[#7DD3FC] text-[14px] font-medium mt-6">Флотын удирдлагын захирал · Ложистикийн компани</p>
        </div>
      </section>

      {/* Contact / CTA */}
      <section id="contact" className="relative z-10 max-w-[1280px] mx-auto px-6 sm:px-10 py-12 sm:py-20">
        <div className="rounded-3xl bg-white border border-[#0A0F1E]/[0.06] shadow-[0_20px_60px_-20px_rgba(10,15,30,0.1)] px-8 sm:px-16 py-14 sm:py-20 text-center">
          <h2 className="font-display font-semibold text-3xl sm:text-5xl tracking-tight mb-5">
            Флотоо өнөөдрөөс
            <br className="hidden sm:block" /> хянаж эхэл
          </h2>
          <p className="text-[#475569] text-base sm:text-lg max-w-md mx-auto mb-10">
            Манай борлуулалтын баг 24 цагийн дотор тантай холбогдож, тохирох шийдлийг санал болгоно.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link href="/register" className="w-full sm:w-auto text-[15px] font-semibold px-7 py-3.5 rounded-full bg-[#0A0F1E] text-white hover:bg-[#1E293B] transition-colors flex items-center justify-center gap-2">
              Demo хүсэх <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/login" className="w-full sm:w-auto text-[15px] font-semibold px-7 py-3.5 rounded-full bg-white border border-[#0A0F1E]/10 hover:border-[#0A0F1E]/20 transition-colors">
              Борлуулалттай холбогдох
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 max-w-[1280px] mx-auto px-6 sm:px-10 py-10 border-t border-[#0A0F1E]/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2.5">
          <Image src="/images/logo.png" alt="HyperWings" width={28} height={28} className="w-7 h-7 object-contain" />
          <span className="font-display font-semibold text-[15px]">HyperWings</span>
        </div>
        <p className="text-[13px] text-[#94A3B8]">© 2026 HyperWings LLC. Бүх эрх хуулиар хамгаалагдсан.</p>
      </footer>
    </div>
  )
}