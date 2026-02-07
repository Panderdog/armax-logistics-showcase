import { useEffect } from "react";
import { ArrowRight, ChevronRight, Sparkles, Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import SEO from "@/components/SEO";
import { organizationSchema } from "@/lib/schema";
import { useApplicationModal } from "@/contexts/ApplicationModalContext";
import CTABlock from "@/components/CTABlock";
import { services } from "@/data/services";

const Services = () => {
  const { openApplicationModal } = useApplicationModal();

  // Предзагрузка изображений
  useEffect(() => {
    services.forEach(service => {
      const img = new Image();
      img.src = service.image;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <SEO
        title="Наши услуги"
        description="Комплексные логистические услуги: международные автоперевозки, морские контейнерные перевозки, авиадоставка грузов, таможенное оформление."
        keywords="автоперевозки, морские перевозки, авиадоставка, таможенное оформление, FTL, LTL, FCL, контейнерные перевозки"
        canonicalUrl="/services/"
        structuredData={organizationSchema}
      />

      <div className="min-h-screen bg-[#0B0F18]">
        {/* Hero Section */}
        <section className="relative min-h-[calc(100vh-var(--header-height))] flex items-center overflow-hidden">
          {/* Background effects */}
          <div className="absolute inset-0 bg-[url('/images/port-by-air.webp')] bg-cover bg-right opacity-30 rotate-180" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0B0F18] via-[#0B0F18]/80 to-transparent" />
          
          {/* Grid pattern */}
          <div 
            className="absolute inset-0 opacity-[0.02]"
            style={{
              backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
              backgroundSize: '60px 60px'
            }}
          />
          
          <div className="container mx-auto px-6 lg:px-8 relative z-10 py-24 lg:py-32">
            <div className="max-w-4xl">
              <div className="inline-flex items-center gap-2 px-4 py-2 mb-8 text-sm font-medium bg-white/[0.04] rounded-xl border border-white/[0.06] animate-fade-in">
                <Briefcase className="w-4 h-4 text-[#F34D1B]" />
                <span className="text-zinc-300">Услуги</span>
              </div>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-8 animate-fade-in leading-[1.05] tracking-tight">
                Логистические
                <br />
                <span className="bg-gradient-to-r from-[#F34D1B] via-orange-400 to-[#F34D1B] bg-clip-text text-transparent">решения под ключ</span>
              </h1>
              <p className="text-xl lg:text-2xl text-zinc-400 font-light animate-fade-in leading-relaxed max-w-2xl" style={{ animationDelay: '0.15s' }}>
                Мы управляем логистикой — вы управляете бизнесом.
              </p>
            </div>
          </div>
          
          {/* Smooth transition to next section */}
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0B0F18] to-transparent" />
        </section>

        {/* Services Grid */}
        <section className="py-20 lg:py-28 bg-[#0B0F18] relative overflow-hidden">
          {/* Background effects */}
          <div className="absolute inset-0 opacity-[0.02]"
            style={{
              backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
              backgroundSize: '60px 60px'
            }}
          />
          
          <div className="container mx-auto px-6 lg:px-8 relative z-10">
            {/* Section header */}
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 text-sm font-medium text-accent bg-accent/10 rounded-full border border-accent/20">
                Наши услуги
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 tracking-tight">
                Выберите направление
              </h2>
              <p className="text-lg text-zinc-400 font-light">
                Каждая услуга — это комплексное решение с полным сопровождением
              </p>
            </div>

            {/* Main services - Featured cards */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 mb-8">
              {services.slice(0, 2).map((service, index) => (
                <Link
                  key={service.id}
                  to={`/services/${service.id}`}
                  className={`group relative rounded-3xl bg-white/[0.02] border border-white/[0.06] ${service.hoverBorder} transition-[transform,box-shadow,border-color] duration-500 hover:shadow-large hover:-translate-y-1 overflow-hidden will-change-transform`}
                >
                  {/* Background image */}
                  <div className="absolute inset-0">
                    <img 
                      src={service.image} 
                      alt={service.title}
                      loading="lazy"
                      className="w-full h-full object-cover opacity-35 group-hover:opacity-60 group-hover:scale-105 transition-[opacity,transform] duration-700 will-change-transform"
                      style={{ transform: 'translateZ(0)' }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F18]/85 via-[#0B0F18]/65 to-[#0B0F18]/50" />
                  </div>

                  <div className="relative p-8 lg:p-10 overflow-hidden">
                    <div className="flex items-start justify-between mb-6">
                      <div className={`p-4 rounded-2xl bg-gradient-to-br ${service.color} shadow-lg`}>
                        <service.icon className="h-7 w-7 text-white" strokeWidth={1.5} />
                      </div>
                      <div className="text-right">
                        <div className={`text-2xl lg:text-3xl font-bold bg-gradient-to-r ${service.color} bg-clip-text text-transparent drop-shadow-lg`}>
                          {service.stats.value}
                        </div>
                        <div className="text-sm text-zinc-300 drop-shadow-md">{service.stats.label}</div>
                      </div>
                    </div>

                    <h3 className="text-2xl lg:text-3xl font-bold text-white mb-2 group-hover:text-accent transition-colors duration-300 drop-shadow-lg">
                      {service.title}
                    </h3>
                    <p className={`text-lg font-medium bg-gradient-to-r ${service.color} bg-clip-text text-transparent mb-4 drop-shadow-lg`}>
                      {service.subtitle}
                    </p>
                    <p className="text-zinc-300 mb-6 leading-relaxed drop-shadow-md">
                      {service.description}
                    </p>

                    {/* Features */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {service.features.map((feature, idx) => (
                        <span 
                          key={idx}
                          className="px-3 py-1.5 text-sm bg-white/[0.08] text-zinc-200 rounded-lg border border-white/[0.12] drop-shadow-md whitespace-nowrap"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center text-accent font-medium group-hover:translate-x-2 transition-transform duration-300 drop-shadow-lg">
                      Подробнее об услуге
                      <ArrowRight className="h-5 w-5 ml-2" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* Other services - Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.slice(2).map((service) => (
                <Link
                  key={service.id}
                  to={`/services/${service.id}`}
                  className={`group relative p-6 lg:p-8 rounded-2xl bg-white/[0.02] border border-white/[0.06] ${service.hoverBorder} transition-[transform,box-shadow,border-color] duration-500 hover:shadow-large hover:-translate-y-1 overflow-hidden will-change-transform`}
                >
                  {/* Background image */}
                  <div className="absolute inset-0">
                    <img 
                      src={service.image} 
                      alt={service.title}
                      loading="lazy"
                      className="w-full h-full object-cover opacity-30 group-hover:opacity-55 group-hover:scale-105 transition-[opacity,transform] duration-700 will-change-transform"
                      style={{ transform: 'translateZ(0)' }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-[#0B0F18]/90 via-[#0B0F18]/75 to-[#0B0F18]/85" />
                  </div>
                  
                  <div className="relative overflow-hidden">
                    <div className="flex items-start justify-between mb-5">
                      <div className={`p-3 rounded-xl bg-gradient-to-br ${service.color} shadow-lg`}>
                        <service.icon className="h-6 w-6 text-white" strokeWidth={1.5} />
                      </div>
                      <div className="text-right flex-shrink-0">
                        <div className={`text-xl font-bold bg-gradient-to-r ${service.color} bg-clip-text text-transparent drop-shadow-lg`}>
                          {service.stats.value}
                        </div>
                        <div className="text-xs text-zinc-300 drop-shadow-md whitespace-nowrap">{service.stats.label}</div>
                      </div>
                    </div>

                    <h3 className="text-xl font-bold text-white mb-1 group-hover:text-accent transition-colors duration-300 drop-shadow-lg">
                      {service.title}
                    </h3>
                    <p className={`text-sm font-medium bg-gradient-to-r ${service.color} bg-clip-text text-transparent mb-3 drop-shadow-lg`}>
                      {service.subtitle}
                    </p>
                    <p className="text-sm text-zinc-300 mb-5 line-clamp-2 drop-shadow-md">
                      {service.description}
                    </p>

                    <div className="flex items-center text-sm text-accent font-medium group-hover:translate-x-1 transition-transform duration-300 drop-shadow-lg">
                      Подробнее
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-20 lg:py-24 bg-[#0B0F18] relative overflow-hidden">
          <div className="container mx-auto px-6 lg:px-8 relative z-10">
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                {/* Content */}
                <div>
                  <span className="inline-flex items-center gap-2 px-4 py-2 mb-6 text-sm font-medium bg-white/[0.04] rounded-xl border border-white/[0.06]">
                    <Sparkles className="h-4 w-4 text-accent" />
                    <span className="text-zinc-300">Почему мы</span>
                  </span>
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 tracking-tight">
                    <span className="text-white">Комплексный подход<br /></span>
                    <span className="bg-gradient-to-r from-accent via-orange-400 to-accent bg-clip-text text-transparent">
                      к каждой перевозке
                    </span>
                  </h2>
                  <p className="text-lg text-zinc-400 font-light leading-relaxed mb-8">
                    Берём на себя логистику «под ключ»: перевозка, таможенное оформление, страхование и склад в Санкт-Петербурге.
                  </p>
                  <Button
                    size="lg"
                    className="group"
                    onClick={openApplicationModal}
                  >
                    Обсудить задачу
                    <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </Button>
                </div>

                {/* Stats grid */}
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { value: "16+", label: "лет на рынке", color: "from-accent to-orange-500" },
                    { value: "1×1", label: "персональный менеджер", color: "from-emerald-500 to-teal-500" },
                    { value: "ASIA", label: "вся Азия → РФ", color: "from-blue-500 to-cyan-500" },
                    { value: "EXW–DDP", label: "любые условия поставок", color: "from-violet-500 to-purple-500" },
                  ].map((stat, index) => (
                    <div
                      key={index}
                      className="group p-6 lg:p-8 rounded-2xl bg-white/[0.02] border border-white/[0.05] hover:border-white/[0.1] transition-[border-color] duration-500 text-center"
                    >
                      <div className={`text-3xl lg:text-4xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform duration-300 will-change-transform`}>
                        {stat.value}
                      </div>
                      <div className="text-sm text-zinc-400 group-hover:text-zinc-300 transition-colors duration-300">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 lg:py-24 bg-[#0B0F18] relative overflow-hidden">
          {/* Background effects */}
          <div className="absolute inset-0 opacity-[0.02]"
            style={{
              backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
              backgroundSize: '60px 60px'
            }}
          />
          
          <div className="container mx-auto px-6 lg:px-8 relative z-10">
            <div className="max-w-4xl mx-auto">
              <CTABlock
                title="Не нашли нужную услугу?"
                subtitle="Расскажите о вашей задаче — мы подберём оптимальное решение"
                buttons={[
                  {
                    text: "Получить консультацию",
                    variant: "primary",
                  },
                  {
                    text: "Позвонить нам",
                    variant: "secondary",
                    href: "tel:+79819976636",
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

export default Services;
