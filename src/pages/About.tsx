import { Target, Users, Award, TrendingUp, Globe, Shield, Sparkles, MapPin } from "lucide-react";
import SEO from "@/components/SEO";
import { organizationSchema } from "@/lib/schema";
import CTABlock from "@/components/CTABlock";

const About = () => {

  const values = [
    {
      icon: Shield,
      title: "Надёжность",
      description: "Гарантируем сохранность груза и выполнение обязательств в срок",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      icon: TrendingUp,
      title: "Скорость",
      description: "Оптимизированные маршруты и быстрая обработка заявок",
      gradient: "from-[#F34D1B] to-orange-500",
    },
    {
      icon: Users,
      title: "Прозрачность",
      description: "Полная отчётность и контроль на каждом этапе доставки",
      gradient: "from-emerald-500 to-teal-500",
    },
    {
      icon: Award,
      title: "Ответственность",
      description: "Профессиональный подход и индивидуальные решения",
      gradient: "from-violet-500 to-purple-500",
    },
  ];

  return (
    <>
      <SEO
        title="О компании"
        description="Armax Logistics — международная логистическая компания с 15+ летним опытом. 20+ стран партнёров, надёжная сеть перевозок, 99% своевременных доставок."
        keywords="о компании, Armax Logistics, история компании, логистическая компания, опыт перевозок"
        canonicalUrl="/about"
        structuredData={organizationSchema}
      />
      <div className="min-h-screen bg-[#0B0F18]">
        {/* Hero Section */}
        <section className="relative py-24 lg:py-32 overflow-hidden">
          {/* Background effects */}
          <div className="absolute inset-0 bg-[url('/images/tlk.webp')] bg-cover bg-center opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0B0F18] via-[#0B0F18]/90 to-[#0B0F18]/40" />
          
          {/* Grid pattern */}
          <div 
            className="absolute inset-0 opacity-[0.02]"
            style={{
              backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
              backgroundSize: '60px 60px'
            }}
          />
          
          <div className="container mx-auto px-6 lg:px-8 relative z-10">
            <div className="max-w-4xl">
              <div className="inline-flex items-center gap-2 px-4 py-2 mb-8 text-sm font-medium bg-white/[0.04] backdrop-blur-sm rounded-xl border border-white/[0.06] animate-fade-in">
                <Sparkles className="w-4 h-4 text-[#F34D1B]" />
                <span className="text-zinc-300">О компании</span>
              </div>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-8 animate-fade-in leading-[1.05] tracking-tight">
                Надёжный партнёр
                <br />
                <span className="bg-gradient-to-r from-[#F34D1B] via-orange-400 to-[#F34D1B] bg-clip-text text-transparent">и оператор полного цикла</span>
              </h1>
              <p className="text-xl lg:text-2xl text-zinc-400 font-light animate-fade-in leading-relaxed max-w-3xl" style={{ animationDelay: '0.15s' }}>
                Берём на себя организацию международных поставок в РФ —
                <br />
                с таможенным оформлением и контролем на каждом этапе.
              </p>
            </div>
          </div>
          
          {/* Smooth transition to next section */}
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0a0e15] to-transparent" />
        </section>

        {/* Focus Section - Bento Grid */}
        <section className="relative py-20 lg:py-24 overflow-hidden">
          <div className="absolute inset-0 bg-[#0a0e15]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-gradient-to-r from-[#F34D1B]/[0.03] via-orange-500/[0.015] to-[#F34D1B]/[0.03] rounded-full blur-[150px]" />
          
          <div className="container mx-auto px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 lg:gap-6">
              {/* Main story card */}
              <div className="lg:col-span-2 lg:row-span-2 relative rounded-3xl overflow-hidden group">
                <div className="absolute inset-0 bg-[url('/images/tlk.webp')] bg-cover bg-center" style={{ backgroundPosition: '85% center' }} />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F18] via-[#0B0F18]/80 to-[#0B0F18]/40" />
                <div className="relative h-full min-h-[480px] lg:min-h-[540px] p-8 lg:p-12 flex flex-col justify-end">
                  <div className="inline-flex items-center gap-2 w-fit px-3 py-1.5 mb-6 text-xs font-medium text-[#F34D1B] bg-[#F34D1B]/10 rounded-full border border-[#F34D1B]/20">
                    <MapPin className="w-3.5 h-3.5" />
                    Наш фокус
                  </div>
                  <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-white mb-6 tracking-tight leading-[1.1]">
                    Импорт из Азии и поставки
                    <br />
                    через турецкий транзит
                  </h2>
                  <p className="text-zinc-400 text-base lg:text-lg leading-relaxed max-w-xl">
                    Наш основной фокус — импорт из стран азиатского региона, а также поставки из Турции и европейских стран через турецкий транзит. Благодаря собственной сети агентов и глубокому знанию региональной специфики мы выстраиваем оптимальные маршруты и помогаем клиентам сокращать сроки и издержки.
                  </p>
                </div>
              </div>

              {/* Personal manager card */}
              <div className="rounded-2xl bg-gradient-to-br from-[#F34D1B] to-orange-600 p-7 lg:p-8 flex flex-col justify-between min-h-[220px] group hover:shadow-[0_20px_60px_-15px_rgba(243,77,27,0.4)] transition-all duration-500">
                <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                  <Users className="h-6 w-6 text-white" strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="text-xl lg:text-2xl font-bold text-white mb-2">Личный менеджер</h3>
                  <p className="text-white/80 text-sm lg:text-base leading-relaxed">
                    Контролирует движение груза, решает вопросы в режиме реального времени и обеспечивает полную прозрачность
                  </p>
                </div>
              </div>

              {/* Experience card */}
              <div className="rounded-2xl bg-white/[0.03] border border-white/[0.06] p-7 lg:p-8 flex flex-col justify-between min-h-[220px] group hover:border-[#F34D1B]/30 hover:bg-white/[0.05] transition-all duration-500">
                <div className="w-12 h-12 rounded-xl bg-white/[0.06] flex items-center justify-center group-hover:bg-[#F34D1B]/10 transition-all duration-500">
                  <Award className="h-6 w-6 text-[#F34D1B]" strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="text-xl lg:text-2xl font-bold text-white mb-2">15 лет опыта</h3>
                  <p className="text-zinc-500 group-hover:text-zinc-400 text-sm lg:text-base leading-relaxed transition-colors">
                    Репутация партнёра, который берёт на себя ответственность и гарантирует результат
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Expertise Section */}
        <section className="relative py-20 lg:py-24 overflow-hidden">
          <div className="absolute inset-0 bg-[#0B0F18]" />
          
          <div className="container mx-auto px-6 lg:px-8 relative z-10">
            <div className="max-w-5xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
                {/* Left column */}
                <div className="space-y-8">
                  <div className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium bg-white/[0.04] rounded-xl border border-white/[0.06]">
                    <Target className="h-4 w-4 text-[#F34D1B]" />
                    <span className="text-zinc-300">Как мы работаем</span>
                  </div>
                  <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-white tracking-tight leading-[1.1]">
                    Сложные маршруты — 
                    <span className="bg-gradient-to-r from-[#F34D1B] to-orange-400 bg-clip-text text-transparent"> наша специализация</span>
                  </h2>
                  <div className="space-y-6">
                    <p className="text-lg text-zinc-400 leading-relaxed">
                      Мы специализируемся на сложных логистических маршрутах: транзитных поставках, комбинированных схемах и импорте в условиях действующих ограничений.
                    </p>
                    <p className="text-lg text-zinc-400 leading-relaxed">
                      Берём на себя проработку маршрута, контроль сроков, документы и таможенное оформление, снижая риски задержек и простоев.
                    </p>
                  </div>
                </div>

                {/* Right column */}
                <div className="space-y-8">
                  <div className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium bg-white/[0.04] rounded-xl border border-white/[0.06]">
                    <Globe className="h-4 w-4 text-[#F34D1B]" />
                    <span className="text-zinc-300">Наши клиенты</span>
                  </div>
                  <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-white tracking-tight leading-[1.1]">
                    Для компаний с 
                    <span className="bg-gradient-to-r from-[#F34D1B] to-orange-400 bg-clip-text text-transparent"> регулярным импортом</span>
                  </h2>
                  <div className="space-y-6">
                    <p className="text-lg text-zinc-400 leading-relaxed">
                      Наши клиенты — производственные и торговые компании, для которых сбой поставки означает простой, потери и репутационные риски.
                    </p>
                    <p className="text-lg text-zinc-400 leading-relaxed">
                      Мы выстраиваем логистику как управляемый процесс — с понятными сроками, ответственностью и прогнозируемым результатом на каждом этапе.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="relative py-20 lg:py-24 overflow-hidden">
          <div className="absolute inset-0 bg-[#0B0F18]" />
          
          <div className="container mx-auto px-6 lg:px-8 relative z-10">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-2 mb-8 text-sm font-medium bg-white/[0.04] backdrop-blur-sm rounded-xl border border-white/[0.06]">
                <Sparkles className="w-4 h-4 text-[#F34D1B]" />
                <span className="text-zinc-300">Принципы работы</span>
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight">
                <span className="text-white">Наши </span>
                <span className="bg-gradient-to-r from-[#F34D1B] via-orange-400 to-[#F34D1B] bg-clip-text text-transparent">
                  ценности
                </span>
              </h2>
              <p className="text-lg lg:text-xl text-zinc-400 font-light leading-relaxed">
                То, что определяет наш подход к работе
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
              {values.map((value, index) => (
                <div
                  key={index}
                  className="group relative p-7 lg:p-8 rounded-2xl bg-white/[0.02] border border-white/[0.05] hover:border-white/[0.12] transition-all duration-500 hover:-translate-y-2 cursor-default overflow-hidden"
                  style={{ 
                    animationDelay: `${index * 0.1}s`,
                    opacity: 0,
                    animation: 'fade-in 0.6s ease-out forwards',
                  }}
                >
                  {/* Gradient glow on hover */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${value.gradient} opacity-0 group-hover:opacity-[0.06] transition-opacity duration-500`} />
                  
                  <div className={`relative mb-6 inline-flex p-4 rounded-2xl bg-gradient-to-br ${value.gradient} text-white shadow-lg group-hover:scale-110 transition-transform duration-500`}>
                    <value.icon className="h-7 w-7" strokeWidth={1.5} />
                  </div>
                  <h3 className="relative text-xl lg:text-2xl font-bold text-white mb-3 group-hover:text-[#F34D1B] transition-colors">
                    {value.title}
                  </h3>
                  <p className="relative text-zinc-500 group-hover:text-zinc-400 transition-colors leading-relaxed">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="relative py-20 lg:py-24 overflow-hidden">
          <div className="absolute inset-0 bg-[url('/nightport.jpg')] bg-cover bg-center bg-fixed" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0B0F18] via-[#0B0F18]/95 to-[#0B0F18]/85" />

          <div className="container mx-auto px-6 lg:px-8 relative z-10">
            <div className="max-w-4xl mx-auto">
              <CTABlock
                title={
                  <>
                    <span className="text-white">Готовы к </span>
                    <span className="bg-gradient-to-r from-[#F34D1B] via-orange-400 to-[#F34D1B] bg-clip-text text-transparent">
                      сотрудничеству?
                    </span>
                  </>
                }
                subtitle="Расскажите о вашей задаче — мы предложим оптимальное решение"
                buttons={[
                  {
                    text: "Связаться с нами",
                    variant: "primary",
                  },
                ]}
              />
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default About;
