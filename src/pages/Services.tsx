import { useEffect } from "react";
import { Truck, Ship, Plane, Train, Package, FileCheck, Warehouse, Shield, ArrowRight, ChevronRight, Sparkles, Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import SEO from "@/components/SEO";
import { organizationSchema } from "@/lib/schema";
import { useApplicationModal } from "@/contexts/ApplicationModalContext";

const Services = () => {
  const { openApplicationModal } = useApplicationModal();

  const services = [
    {
      id: "sea",
      icon: Ship,
      title: "Морские перевозки",
      subtitle: "из Азии и Турции",
      description: "Организуем полный цикл морской перевозки: забор груза, документация, подбор линий, контроль на каждом этапе.",
      features: ["FCL и LCL контейнеры", "Мультимодальные перевозки", "Консолидация грузов"],
      stats: { value: "35-45", label: "дней" },
      image: "/images/service-images/sea-service.webp",
      color: "from-blue-600 to-cyan-500",
      hoverBorder: "hover:border-blue-500/30",
    },
    {
      id: "aviation",
      icon: Plane,
      title: "Авиаперевозки",
      subtitle: "грузов по всему миру",
      description: "Полная организация воздушной логистики: приём груза, подготовка документов, контроль расписаний.",
      features: ["Проверенные авиалинии", "Точные сроки", "Экспресс-доставка"],
      stats: { value: "3-7", label: "дней" },
      image: "/images/service-images/air-service.webp",
      color: "from-sky-500 to-blue-600",
      hoverBorder: "hover:border-sky-500/30",
    },
    {
      id: "auto",
      icon: Truck,
      title: "Автоперевозки",
      subtitle: "из Азии, Турции и Европы",
      description: "Гибкость маршрутов и оптимальное сочетание стоимости и скорости. Доставка «до двери».",
      features: ["FTL и LTL", "GPS-мониторинг", "Доставка до двери"],
      stats: { value: "14-21", label: "дней" },
      image: "/images/truck.webp",
      color: "from-orange-500 to-amber-500",
      hoverBorder: "hover:border-orange-500/30",
    },
    {
      id: "railway",
      icon: Train,
      title: "ЖД перевозки",
      subtitle: "из Китая",
      description: "Сбалансированное решение по срокам и стоимости. Регулярные отправки через 3 погранперехода.",
      features: ["Сроки 28–35 дней", "Высокая надёжность", "Еженедельные рейсы"],
      stats: { value: "28-35", label: "дней" },
      image: "/images/service-images/train-service.webp",
      color: "from-amber-500 to-yellow-500",
      hoverBorder: "hover:border-amber-500/30",
    },
    {
      id: "consolidated",
      icon: Package,
      title: "Сборные грузы",
      subtitle: "из любой точки мира",
      description: "Консолидация грузов от 1 коробки до нескольких паллет. До 40% экономии на логистике.",
      features: ["От 1 коробки", "Склады в Китае и Турции", "Регулярные отправки"],
      stats: { value: "40%", label: "экономия" },
      image: "/images/service-images/sbor-service.webp",
      color: "from-rose-500 to-pink-500",
      hoverBorder: "hover:border-rose-500/30",
    },
    {
      id: "customs",
      icon: FileCheck,
      title: "Таможенное оформление",
      subtitle: "«под ключ»",
      description: "Готовим декларации, подбираем коды ТН ВЭД, рассчитываем платежи, представляем ваши интересы.",
      features: ["Выпуск за 1-2 дня", "99% без замечаний", "15+ лет опыта"],
      stats: { value: "1-2", label: "дня" },
      image: "/images/customs.png",
      color: "from-emerald-500 to-teal-500",
      hoverBorder: "hover:border-emerald-500/30",
    },
    {
      id: "warehouse",
      icon: Warehouse,
      title: "Ответственное хранение",
      subtitle: "грузов в СПб",
      description: "Современный складской комплекс: приёмка, хранение, комплектация, переупаковка, таможенный склад.",
      features: ["5000+ м² площадь", "WMS-система", "24/7 работа"],
      stats: { value: "5000+", label: "м²" },
      image: "/images/service-images/sklad1-service.webp",
      color: "from-indigo-500 to-violet-500",
      hoverBorder: "hover:border-indigo-500/30",
    },
    {
      id: "insurance",
      icon: Shield,
      title: "Страхование грузов",
      subtitle: "полное покрытие",
      description: "Страховое покрытие от утраты и повреждения груза. Работаем с топ-10 страховщиков России.",
      features: ["От 0.1% стоимости", "100% покрытие", "Быстрые выплаты"],
      stats: { value: "0.1%", label: "от стоимости" },
      image: "/images/service-images/safe1-service.webp",
      color: "from-cyan-500 to-sky-500",
      hoverBorder: "hover:border-cyan-500/30",
    },
  ];

  // Предзагрузка изображений
  useEffect(() => {
    services.forEach(service => {
      const img = new Image();
      img.src = service.image;
    });
  }, []);

  return (
    <>
      <SEO
        title="Наши услуги"
        description="Комплексные логистические услуги: международные автоперевозки, морские контейнерные перевозки, авиадоставка грузов, таможенное оформление."
        keywords="автоперевозки, морские перевозки, авиадоставка, таможенное оформление, FTL, LTL, FCL, контейнерные перевозки"
        canonicalUrl="/services"
        structuredData={organizationSchema}
      />

      <div className="min-h-screen bg-[#0B0F18]">
        {/* Hero Section */}
        <section className="relative py-24 lg:py-32 overflow-hidden">
          {/* Background effects */}
          <div className="absolute inset-0 bg-[url('/images/port-by-air.webp')] bg-cover bg-right opacity-30 rotate-180" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0B0F18] via-[#0B0F18]/80 to-transparent" />
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#F34D1B]/15 rounded-full blur-[150px]" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#F34D1B]/10 rounded-full blur-[150px]" />
          
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
        </section>

        {/* Services Grid */}
        <section className="py-20 lg:py-28 bg-background">
          <div className="container mx-auto px-6 lg:px-8">
            {/* Section header */}
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 text-sm font-medium text-accent bg-accent/10 rounded-full border border-accent/20">
                Наши услуги
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 tracking-tight">
                Выберите направление
              </h2>
              <p className="text-lg text-muted-foreground font-light">
                Каждая услуга — это комплексное решение с полным сопровождением
              </p>
            </div>

            {/* Main services - Featured cards */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 mb-8">
              {services.slice(0, 2).map((service, index) => (
                <Link
                  key={service.id}
                  to={`/services/${service.id}`}
                  className={`group relative overflow-hidden rounded-3xl bg-card border border-border/50 ${service.hoverBorder} transition-all duration-500 hover:shadow-large hover:-translate-y-1`}
                >
                  {/* Background image */}
                  <div className="absolute inset-0">
                    <img 
                      src={service.image} 
                      alt={service.title}
                      className="w-full h-full object-cover opacity-20 group-hover:opacity-30 group-hover:scale-105 transition-all duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-card via-card/95 to-card/80" />
                  </div>

                  <div className="relative p-8 lg:p-10">
                    <div className="flex items-start justify-between mb-6">
                      <div className={`p-4 rounded-2xl bg-gradient-to-br ${service.color} shadow-lg`}>
                        <service.icon className="h-7 w-7 text-white" strokeWidth={1.5} />
                      </div>
                      <div className="text-right">
                        <div className={`text-2xl lg:text-3xl font-bold bg-gradient-to-r ${service.color} bg-clip-text text-transparent`}>
                          {service.stats.value}
                        </div>
                        <div className="text-sm text-muted-foreground">{service.stats.label}</div>
                      </div>
                    </div>

                    <h3 className="text-2xl lg:text-3xl font-bold text-foreground mb-2 group-hover:text-accent transition-colors">
                      {service.title}
                    </h3>
                    <p className={`text-lg font-medium bg-gradient-to-r ${service.color} bg-clip-text text-transparent mb-4`}>
                      {service.subtitle}
                    </p>
                    <p className="text-muted-foreground mb-6 leading-relaxed">
                      {service.description}
                    </p>

                    {/* Features */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {service.features.map((feature, idx) => (
                        <span 
                          key={idx}
                          className="px-3 py-1.5 text-sm bg-secondary/80 text-foreground rounded-lg"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center text-accent font-medium group-hover:translate-x-2 transition-transform">
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
                  className={`group relative p-6 lg:p-8 rounded-2xl bg-card border border-border/50 ${service.hoverBorder} transition-all duration-500 hover:shadow-large hover:-translate-y-1 overflow-hidden`}
                >
                  {/* Subtle gradient on hover */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-[0.03] transition-opacity duration-500`} />
                  
                  <div className="relative">
                    <div className="flex items-start justify-between mb-5">
                      <div className={`p-3 rounded-xl bg-gradient-to-br ${service.color}`}>
                        <service.icon className="h-6 w-6 text-white" strokeWidth={1.5} />
                      </div>
                      <div className="text-right">
                        <div className={`text-xl font-bold bg-gradient-to-r ${service.color} bg-clip-text text-transparent`}>
                          {service.stats.value}
                        </div>
                        <div className="text-xs text-muted-foreground">{service.stats.label}</div>
                      </div>
                    </div>

                    <h3 className="text-xl font-bold text-foreground mb-1 group-hover:text-accent transition-colors">
                      {service.title}
                    </h3>
                    <p className={`text-sm font-medium bg-gradient-to-r ${service.color} bg-clip-text text-transparent mb-3`}>
                      {service.subtitle}
                    </p>
                    <p className="text-sm text-muted-foreground mb-5 line-clamp-2">
                      {service.description}
                    </p>

                    <div className="flex items-center text-sm text-accent font-medium group-hover:translate-x-1 transition-transform">
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
          {/* Background effects */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-gradient-to-r from-accent/[0.04] via-orange-500/[0.02] to-accent/[0.04] rounded-full blur-[150px]" />
          
          <div className="container mx-auto px-6 lg:px-8 relative z-10">
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                {/* Content */}
                <div>
                  <span className="inline-flex items-center gap-2 px-4 py-2 mb-6 text-sm font-medium bg-white/[0.04] backdrop-blur-sm rounded-xl border border-white/[0.06]">
                    <Sparkles className="h-4 w-4 text-accent" />
                    <span className="text-zinc-300">Почему мы</span>
                  </span>
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 tracking-tight">
                    <span className="text-white">Комплексный подход </span>
                    <span className="bg-gradient-to-r from-accent via-orange-400 to-accent bg-clip-text text-transparent">
                      к каждой перевозке
                    </span>
                  </h2>
                  <p className="text-lg text-zinc-400 font-light leading-relaxed mb-8">
                    Мы не просто доставляем грузы — мы выстраиваем надёжные цепочки поставок, которые работают как часы.
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
                    { value: "15+", label: "лет на рынке", color: "from-accent to-orange-500" },
                    { value: "99%", label: "доставок вовремя", color: "from-emerald-500 to-teal-500" },
                    { value: "20+", label: "стран партнёров", color: "from-blue-500 to-cyan-500" },
                    { value: "24/7", label: "поддержка", color: "from-violet-500 to-purple-500" },
                  ].map((stat, index) => (
                    <div
                      key={index}
                      className="group p-6 lg:p-8 rounded-2xl bg-white/[0.02] border border-white/[0.05] hover:border-white/[0.1] transition-all duration-500 text-center"
                    >
                      <div className={`text-3xl lg:text-4xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform`}>
                        {stat.value}
                      </div>
                      <div className="text-sm text-zinc-400 group-hover:text-zinc-300 transition-colors">
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
        <section className="py-20 lg:py-24 bg-background">
          <div className="container mx-auto px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="relative p-12 lg:p-16 rounded-3xl bg-gradient-to-br from-primary via-primary to-primary-dark overflow-hidden">
                {/* Decorative elements */}
                <div className="absolute top-0 right-0 w-80 h-80 bg-accent/20 rounded-full blur-[100px]" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/10 rounded-full blur-[80px]" />
                
                <div className="relative text-center">
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 tracking-tight">
                    Не нашли нужную услугу?
                  </h2>
                  <p className="text-xl text-white/70 font-light mb-10 max-w-2xl mx-auto">
                    Расскажите о вашей задаче — мы подберём оптимальное решение
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button
                      size="lg"
                      className="bg-accent hover:bg-accent-hover text-white text-lg px-10 py-7 h-auto group shadow-glow"
                      onClick={openApplicationModal}
                    >
                      Получить консультацию
                      <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                    </Button>
                    <Button
                      asChild
                      size="lg"
                      variant="outline"
                      className="bg-white/5 border-2 border-white/20 text-white hover:bg-white hover:text-primary text-lg px-10 py-7 h-auto"
                    >
                      <a href="tel:+78126440291">
                        Позвонить нам
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Services;
