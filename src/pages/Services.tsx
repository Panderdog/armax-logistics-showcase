import { useState } from "react";
import { Truck, Ship, Plane, FileCheck, ArrowRight, Check, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import SEO from "@/components/SEO";
import { organizationSchema } from "@/lib/schema";

const Services = () => {
  const [activeService, setActiveService] = useState(0);

  const services = [
    {
      icon: Ship,
      title: "Морские перевозки",
      shortTitle: "Море",
      description: "Контейнерные перевозки морем из ключевых портов Азии. Работаем с ведущими мировыми линиями для обеспечения оптимальных ставок и сроков.",
      features: [
        "FCL и LCL контейнеры",
        "Мультимодальные перевозки",
        "Консолидация грузов в Китае",
        "Страхование грузов",
        "Доставка до двери",
      ],
      stats: { time: "от 25 дней", price: "от $1500" },
      image: "/images/port-by-air.webp",
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-blue-500/10",
    },
    {
      icon: Truck,
      title: "Автоперевозки",
      shortTitle: "Авто",
      description: "Надёжная доставка грузов автотранспортом по Европе, СНГ и России. Работаем с проверенными перевозчиками и обеспечиваем полный контроль.",
      features: [
        "FTL и LTL перевозки",
        "Температурный режим",
        "Сборные грузы",
        "Экспресс-доставка",
        "GPS-мониторинг",
      ],
      stats: { time: "от 5 дней", price: "от $800" },
      image: "/images/truck.webp",
      color: "from-accent to-orange-500",
      bgColor: "bg-accent/10",
    },
    {
      icon: Plane,
      title: "Авиадоставка",
      shortTitle: "Авиа",
      description: "Быстрая доставка срочных грузов авиатранспортом из любой точки мира. Идеально для срочных и ценных отправлений.",
      features: [
        "Срочные отправки",
        "Опасные грузы (DGR)",
        "Чартерные рейсы",
        "Door-to-door сервис",
        "Отслеживание 24/7",
      ],
      stats: { time: "от 3 дней", price: "от $3000" },
      image: "/images/airplane.webp",
      color: "from-violet-500 to-purple-500",
      bgColor: "bg-violet-500/10",
    },
    {
      icon: FileCheck,
      title: "Таможенное оформление",
      shortTitle: "Таможня",
      description: "Полное сопровождение грузов через таможню. Наш офис расположен в здании таможенного поста — решаем вопросы оперативно.",
      features: [
        "ВЭД консалтинг",
        "Декларирование",
        "Сертификация товаров",
        "Валютный контроль",
        "Получение разрешений",
      ],
      stats: { time: "от 1 дня", price: "от $200" },
      image: "/images/customs.png",
      color: "from-emerald-500 to-teal-500",
      bgColor: "bg-emerald-500/10",
    },
  ];

  const currentService = services[activeService];

  return (
    <>
      <SEO
        title="Наши услуги"
        description="Комплексные логистические услуги: международные автоперевозки, морские контейнерные перевозки, авиадоставка грузов, таможенное оформление."
        keywords="автоперевозки, морские перевозки, авиадоставка, таможенное оформление, FTL, LTL, FCL, контейнерные перевозки"
        canonicalUrl="/services"
        structuredData={organizationSchema}
      />
      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="relative py-24 lg:py-32 bg-primary overflow-hidden">
          <div className="absolute inset-0 bg-[url('/images/port-by-air.webp')] bg-cover bg-center opacity-15" />
          <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/95 to-primary/80" />
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-[128px]" />
          
          <div className="container mx-auto px-6 lg:px-8 relative z-10">
            <div className="max-w-4xl">
              <span className="inline-block px-4 py-1.5 mb-8 text-sm font-medium text-accent bg-accent/20 rounded-full border border-accent/30 backdrop-blur-sm animate-fade-in">
                Услуги
              </span>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-8 animate-fade-in leading-[1.05] tracking-tight">
                Логистические
                <br />
                <span className="text-accent">решения под ключ</span>
              </h1>
              <p className="text-xl lg:text-2xl text-white/80 font-light animate-fade-in leading-relaxed max-w-2xl" style={{ animationDelay: '0.15s' }}>
                От забора груза до доставки получателю — берём на себя всё
              </p>
            </div>
          </div>
        </section>

        {/* Interactive Services Section */}
        <section className="py-20 lg:py-28 bg-background">
          <div className="container mx-auto px-6 lg:px-8">
            {/* Service tabs */}
            <div className="flex flex-wrap gap-3 mb-12 lg:mb-16">
              {services.map((service, index) => (
                <button
                  key={index}
                  onClick={() => setActiveService(index)}
                  className={`flex items-center gap-3 px-6 py-4 rounded-2xl font-medium transition-all duration-500 ${
                    activeService === index
                      ? `bg-gradient-to-r ${service.color} text-white shadow-large`
                      : "bg-card border border-border/50 text-muted-foreground hover:border-accent/30 hover:text-foreground"
                  }`}
                >
                  <service.icon className="h-5 w-5" strokeWidth={1.5} />
                  <span className="hidden sm:inline">{service.title}</span>
                  <span className="sm:hidden">{service.shortTitle}</span>
                </button>
              ))}
            </div>

            {/* Service content */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              {/* Image */}
              <div className="relative group">
                <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-large">
                  <img
                    src={currentService.image}
                    alt={currentService.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    style={activeService === 0 ? { objectPosition: 'right' } : undefined}
                  />
                </div>
                {/* Floating stats cards */}
                <div className="absolute -bottom-6 -right-6 bg-card rounded-2xl shadow-large border border-border/50 p-6 animate-fade-in">
                  <div className="text-sm text-muted-foreground mb-1">Сроки</div>
                  <div className="text-2xl font-bold text-foreground">{currentService.stats.time}</div>
                </div>
                <div className="absolute -top-6 -left-6 bg-card rounded-2xl shadow-large border border-border/50 p-6 animate-fade-in">
                  <div className="text-sm text-muted-foreground mb-1">Стоимость</div>
                  <div className="text-2xl font-bold text-accent">{currentService.stats.price}</div>
                </div>
              </div>

              {/* Content */}
              <div className="space-y-8">
                <div className={`inline-flex p-5 rounded-2xl ${currentService.bgColor}`}>
                  <currentService.icon className={`h-10 w-10 bg-gradient-to-r ${currentService.color} bg-clip-text text-transparent`} strokeWidth={1.5} style={{ color: 'currentColor' }} />
                </div>
                
                <h2 className="text-4xl md:text-5xl font-bold text-foreground tracking-tight">
                  {currentService.title}
                </h2>
                
                <p className="text-lg text-muted-foreground font-light leading-relaxed">
                  {currentService.description}
                </p>

                {/* Features */}
                <div className="space-y-4">
                  {currentService.features.map((feature, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-4 p-4 rounded-xl bg-secondary/50 hover:bg-secondary transition-colors group cursor-default"
                    >
                      <div className={`p-2 rounded-lg bg-gradient-to-r ${currentService.color}`}>
                        <Check className="h-4 w-4 text-white" strokeWidth={2} />
                      </div>
                      <span className="text-foreground font-medium group-hover:text-accent transition-colors">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>

                <Button asChild size="lg" className="group mt-4">
                  <Link to="/contacts">
                    Заказать услугу
                    <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* All Services Overview */}
        <section className="py-20 lg:py-28 bg-secondary/30">
          <div className="container mx-auto px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="inline-block px-4 py-1.5 mb-6 text-sm font-medium text-accent bg-accent/10 rounded-full border border-accent/20">
                Все услуги
              </span>
              <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6 tracking-tight">
                Полный цикл логистики
              </h2>
              <p className="text-lg text-muted-foreground font-light">
                Комплексный подход к каждой перевозке
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto">
              {services.map((service, index) => (
                <div
                  key={index}
                  onClick={() => setActiveService(index)}
                  className="group relative p-8 lg:p-10 rounded-3xl bg-card border border-border/50 hover:border-accent/30 transition-all duration-500 hover:shadow-large hover:-translate-y-2 cursor-pointer overflow-hidden"
                >
                  {/* Background gradient on hover */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
                  
                  <div className="relative flex items-start gap-6">
                    <div className={`flex-shrink-0 p-4 rounded-2xl bg-gradient-to-br ${service.color}`}>
                      <service.icon className="h-8 w-8 text-white" strokeWidth={1.5} />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-foreground mb-3 group-hover:text-accent transition-colors">
                        {service.title}
                      </h3>
                      <p className="text-muted-foreground mb-4 line-clamp-2">
                        {service.description}
                      </p>
                      <div className="flex items-center gap-4 text-sm">
                        <span className="text-muted-foreground">
                          Сроки: <span className="text-foreground font-medium">{service.stats.time}</span>
                        </span>
                        <span className="text-muted-foreground">
                          От: <span className="text-accent font-medium">{service.stats.price}</span>
                        </span>
                      </div>
                    </div>
                    <ChevronRight className="h-6 w-6 text-muted-foreground group-hover:text-accent group-hover:translate-x-1 transition-all flex-shrink-0" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-20 lg:py-28 bg-background">
          <div className="container mx-auto px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
              <div>
                <span className="inline-block px-4 py-1.5 mb-6 text-sm font-medium text-accent bg-accent/10 rounded-full border border-accent/20">
                  Преимущества
                </span>
                <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6 tracking-tight">
                  Почему выбирают нас
                </h2>
                <p className="text-lg text-muted-foreground font-light mb-8">
                  15+ лет опыта и сотни довольных клиентов
                </p>
                <Button asChild size="lg" className="group">
                  <Link to="/about">
                    Узнать больше о компании
                    <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[
                  { title: "99%", desc: "доставок вовремя" },
                  { title: "24/7", desc: "поддержка клиентов" },
                  { title: "20+", desc: "стран партнёров" },
                  { title: "15+", desc: "лет на рынке" },
                ].map((stat, index) => (
                  <div
                    key={index}
                    className="group p-8 rounded-2xl bg-card border border-border/50 hover:border-accent/30 transition-all duration-500 hover:shadow-large text-center cursor-default"
                  >
                    <div className="text-4xl lg:text-5xl font-bold text-accent mb-2 group-hover:scale-110 transition-transform">
                      {stat.title}
                    </div>
                    <div className="text-muted-foreground group-hover:text-foreground transition-colors">
                      {stat.desc}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 lg:py-28 bg-primary relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('/nightport.jpg')] bg-cover bg-center opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/95 to-primary/80" />
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/20 rounded-full blur-[128px]" />
          
          <div className="container mx-auto px-6 lg:px-8 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight">
                Готовы начать?
              </h2>
              <p className="text-xl text-white/80 font-light mb-10">
                Получите расчёт стоимости доставки за 30 минут
              </p>
              <Button
                asChild
                size="lg"
                className="bg-white text-primary hover:bg-white/90 text-lg px-10 py-7 h-auto group shadow-glow"
              >
                <Link to="/contacts">
                  Рассчитать доставку
                  <ArrowRight className="ml-3 h-6 w-6 transition-transform group-hover:translate-x-2" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Services;
