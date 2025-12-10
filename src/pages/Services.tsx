import { useState, useEffect } from "react";
import { Truck, Ship, Plane, Train, Package, FileCheck, Warehouse, Shield, ArrowRight, Check, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useSearchParams, useLocation } from "react-router-dom";
import SEO from "@/components/SEO";
import { organizationSchema } from "@/lib/schema";
import { useApplicationModal } from "@/contexts/ApplicationModalContext";

const Services = () => {
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const [activeService, setActiveService] = useState(0);
  const { openApplicationModal } = useApplicationModal();

  const services = [
    {
      id: "sea",
      icon: Ship,
      title: "Морские перевозки из Азии и Турции",
      shortTitle: "Море",
      subtitle: "Надёжная доставка контейнеров с оптимальными сроками и тарифами.",
      description: "Организуем полный цикл морской перевозки: забор груза, документация, подбор линий, контроль на каждом этапе. Работаем с FCL, LCL и мультимодальными схемами, обеспечивая стабильные сроки и выгодную стоимость доставки.",
      features: [
        "FCL и LCL контейнеры",
        "Мультимодальные перевозки",
        "Консолидация грузов",
        "Подбор оптимальных линий",
        "Контроль на каждом этапе",
      ],
      image: "/images/service-images/sea-service.webp",
      color: "from-blue-700 to-blue-500",
      bgColor: "bg-blue-700/10",
    },
    {
      id: "aviation",
      icon: Plane,
      title: "Авиаперевозки грузов",
      shortTitle: "Авиа",
      subtitle: "Самый быстрый способ международной доставки.",
      description: "Полная организация воздушной логистики: приём груза, подготовка документов, контроль расписаний и отправок. Используем проверенные авиалинии, обеспечиваем точные сроки, безопасность и прозрачный контроль движения.",
      features: [
        "Проверенные авиалинии",
        "Точные сроки доставки",
        "Контроль расписаний",
        "Безопасность груза",
        "Прозрачный мониторинг",
      ],
      image: "/images/service-images/air-service.webp",
      color: "from-sky-500 to-blue-500",
      bgColor: "bg-sky-500/10",
    },
    {
      id: "auto",
      icon: Truck,
      title: "Автоперевозки из Азии, Турции и Европы",
      shortTitle: "Авто",
      subtitle: "Быстрая доставка оптимальным маршрутом «до двери».",
      description: "Автомобильная логистика обеспечивает точные сроки, гибкость маршрутов и оптимальное сочетание стоимости и скорости. Формируем индивидуальные схемы движения, контролируем груз на всех этапах и обеспечиваем стабильный сервис.",
      features: [
        "Гибкость маршрутов",
        "Доставка «до двери»",
        "Индивидуальные схемы",
        "Контроль на всех этапах",
        "Стабильный сервис",
      ],
      image: "/images/truck.webp",
      color: "from-accent to-orange-500",
      bgColor: "bg-accent/10",
    },
    {
      id: "railway",
      icon: Train,
      title: "Железнодорожные перевозки из Китая",
      shortTitle: "ЖД",
      subtitle: "Сбалансированное решение по срокам и стоимости.",
      description: "ЖД-перевозки обеспечивают устойчивые сроки (28–35 дней), высокую надёжность и минимальную зависимость от внешних факторов. Организуем бронирование контейнеров, оформление документов и полное сопровождение до российских терминалов.",
      features: [
        "Сроки 28–35 дней",
        "Высокая надёжность",
        "Бронирование контейнеров",
        "Оформление документов",
        "Сопровождение до терминала",
      ],
      image: "/images/service-images/train-service.webp",
      color: "from-amber-500 to-yellow-500",
      bgColor: "bg-amber-500/10",
    },
    {
      id: "consolidated",
      icon: Package,
      title: "Международные перевозки сборных грузов",
      shortTitle: "Сборные",
      subtitle: "Экономичная доставка небольших партий товаров.",
      description: "Консолидация грузов от 1 коробки до нескольких паллет на зарубежных складах и отправка морем, авто или ЖД. Комплексное документальное сопровождение и оптимизация стоимости без потери сроков и надёжности поставок.",
      features: [
        "От 1 коробки до паллет",
        "Консолидация на складах",
        "Доставка морем, авто, ЖД",
        "Документальное сопровождение",
        "Оптимизация стоимости",
      ],
      image: "/images/service-images/sbor-service.webp",
      color: "from-rose-500 to-pink-500",
      bgColor: "bg-rose-500/10",
    },
    {
      id: "customs",
      icon: FileCheck,
      title: "Таможенное оформление «под ключ»",
      shortTitle: "Таможня",
      subtitle: "Быстрое и безопасное прохождение таможенных процедур.",
      description: "Готовим декларации, подбираем коды ТН ВЭД, рассчитываем платежи, оформляем разрешительные документы и представляем ваши интересы в таможенных органах. Сопровождаем досмотры и экспертизы, минимизируем риски задержек.",
      features: [
        "Подготовка деклараций",
        "Подбор кодов ТН ВЭД",
        "Расчёт платежей",
        "Разрешительные документы",
        "Представительство в органах",
      ],
      image: "/images/customs.png",
      color: "from-emerald-500 to-teal-500",
      bgColor: "bg-emerald-500/10",
    },
    {
      id: "warehouse",
      icon: Warehouse,
      title: "Ответственное хранение грузов",
      shortTitle: "Склад",
      subtitle: "Современный складской комплекс в Санкт-Петербурге.",
      description: "Приёмка, размещение, хранение, ПРР, комплектация, переупаковка и маркировка, включая таможенный склад. Контроль условий хранения, безопасность и оперативная обработка заявок.",
      features: [
        "Приёмка и размещение",
        "Комплектация заказов",
        "Переупаковка и маркировка",
        "Таможенный склад",
        "Контроль условий хранения",
      ],
      image: "/images/service-images/sklad1-service.webp",
      color: "from-indigo-500 to-blue-500",
      bgColor: "bg-indigo-500/10",
    },
    {
      id: "insurance",
      icon: Shield,
      title: "Страхование грузов",
      shortTitle: "Страхование",
      subtitle: "Финансовая защита товаров при перевозке и хранении.",
      description: "Оформляем страховое покрытие от утраты, повреждения и частичной гибели груза при перевозке и складской обработке. Работаем с проверенными страховыми компаниями, предлагаем прозрачные тарифы и подбор оптимального полиса под задачу.",
      features: [
        "Защита от утраты",
        "Защита от повреждения",
        "Проверенные компании",
        "Прозрачные тарифы",
        "Подбор оптимального полиса",
      ],
      image: "/images/service-images/safe1-service.webp",
      color: "from-cyan-500 to-sky-500",
      bgColor: "bg-cyan-500/10",
    },
  ];

  // Предзагрузка всех изображений услуг
  useEffect(() => {
    services.forEach(service => {
      const img = new Image();
      img.src = service.image;
    });
  }, []);

  // Плавная анимация прокрутки с easing
  const smoothScrollTo = (targetPosition: number, duration: number = 1000) => {
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    let start: number | null = null;

    const easeInOutCubic = (t: number): number => {
      return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    };

    const animation = (currentTime: number) => {
      if (start === null) start = currentTime;
      const timeElapsed = currentTime - start;
      const progress = Math.min(timeElapsed / duration, 1);
      const ease = easeInOutCubic(progress);
      
      window.scrollTo(0, startPosition + distance * ease);
      
      if (timeElapsed < duration) {
        requestAnimationFrame(animation);
      }
    };

    requestAnimationFrame(animation);
  };

  // Обработка параметра service из URL (location.key меняется при каждой навигации)
  useEffect(() => {
    const serviceParam = searchParams.get('service');
    if (serviceParam) {
      const serviceIndex = services.findIndex(s => s.id === serviceParam);
      if (serviceIndex !== -1) {
        setActiveService(serviceIndex);
        // Прокручиваем к секции с контентом услуги после загрузки
        setTimeout(() => {
          const serviceSection = document.getElementById('service-content');
          if (serviceSection) {
            const stickyOffset = 250; // header (64) + sticky tabs (~130) + visual gap (56)
            const targetPosition = serviceSection.getBoundingClientRect().top + window.pageYOffset - stickyOffset;
            smoothScrollTo(targetPosition, 800);
          }
        }, 150);
      }
    }
  }, [searchParams, location.key]);

  const handleServiceClick = (index: number) => {
    setActiveService(index);
    // Скроллим только если карточка не полностью видна
    const serviceSection = document.getElementById('service-content');
    if (serviceSection) {
      const rect = serviceSection.getBoundingClientRect();
      const stickyOffset = 250; // header (64) + sticky tabs (~130) + visual gap (56)
      // Если верх карточки выше sticky элементов или карточка ниже viewport
      if (rect.top < stickyOffset || rect.top > window.innerHeight) {
        const targetPosition = serviceSection.getBoundingClientRect().top + window.pageYOffset - stickyOffset;
        smoothScrollTo(targetPosition, 500);
      }
    }
  };

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
          <div className="absolute inset-0 bg-[url('/images/port-by-air.webp')] bg-cover bg-center opacity-30" />
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
                Мы управляем логистикой — вы управляете бизнесом.
              </p>
            </div>
          </div>
        </section>

        {/* Sticky Service Tabs */}
        <div className="sticky top-16 z-40 bg-background/95 backdrop-blur-md border-b border-border/50 shadow-sm">
          <div className="container mx-auto px-6 lg:px-8 py-4">
            <div className="flex flex-wrap gap-2 lg:gap-3">
              {services.map((service, index) => (
                <button
                  key={service.id}
                  onClick={() => handleServiceClick(index)}
                  className={`flex items-center gap-2 lg:gap-3 px-4 lg:px-6 py-3 lg:py-4 rounded-xl lg:rounded-2xl font-medium transition-all duration-300 ${
                    activeService === index
                      ? `bg-gradient-to-r ${service.color} text-white shadow-large`
                      : "bg-card border border-border/50 text-muted-foreground hover:border-accent/30 hover:text-foreground"
                  }`}
                >
                  <service.icon className="h-4 w-4 lg:h-5 lg:w-5" strokeWidth={1.5} />
                  <span className="hidden lg:inline text-sm">{service.title}</span>
                  <span className="lg:hidden text-sm">{service.shortTitle}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Interactive Services Section */}
        <section className="py-6 lg:py-10 bg-background">
          <div className="container mx-auto px-6 lg:px-8">

            {/* Service content - card style */}
            <div id="service-content" className="bg-card rounded-2xl lg:rounded-3xl border border-border/50 shadow-large overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
                {/* Image - compact */}
                <div className="lg:col-span-4 relative">
                  <div className="aspect-[16/10] lg:aspect-auto lg:absolute lg:inset-0">
                    <img
                      src={currentService.image}
                      alt={currentService.title}
                      className="w-full h-full object-cover"
                      style={{ 
                        objectPosition: currentService.id === 'sea' ? 'right' : 
                                        currentService.id === 'customs' ? '35% center' : 'center'
                      }}
                    />
                  </div>
                </div>

                {/* Content */}
                <div className="lg:col-span-8 p-6 lg:p-10 flex flex-col justify-center">
                  {/* Header with icon */}
                  <div className="flex items-start gap-4 mb-4">
                    <div className={`p-3 rounded-xl bg-gradient-to-br ${currentService.color} shadow-md flex-shrink-0`}>
                      <currentService.icon className="h-6 w-6 text-white" strokeWidth={1.5} />
                    </div>
                    <div>
                      <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-foreground tracking-tight">
                        {currentService.title}
                      </h2>
                      <p className="text-base lg:text-lg text-accent font-medium mt-1">
                        {currentService.subtitle}
                      </p>
                    </div>
                  </div>
                  
                  {/* Description */}
                  <p className="text-sm lg:text-base text-muted-foreground font-light leading-relaxed mb-5">
                    {currentService.description}
                  </p>

                  {/* Features - inline compact */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {currentService.features.map((feature, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-2 px-3 py-2 rounded-lg bg-secondary/70 text-sm"
                      >
                        <Check className={`h-4 w-4 text-accent`} strokeWidth={2} />
                        <span className="text-foreground font-medium">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* CTA Button */}
                  <Button size="lg" className="group w-full sm:w-fit" onClick={openApplicationModal}>
                    Заказать услугу
                    <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* All Services Overview */}
        <section className="py-20 lg:py-20 bg-secondary/30">
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

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 lg:gap-8">
              {services.map((service, index) => (
                <div
                  key={service.id}
                  onClick={() => handleServiceClick(index)}
                  className="group relative p-6 lg:p-8 rounded-3xl bg-card border border-border/50 hover:border-accent/30 transition-all duration-500 hover:shadow-large hover:-translate-y-2 cursor-pointer overflow-hidden"
                >
                  {/* Background gradient on hover */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
                  
                  <div className="relative flex flex-col h-full">
                    <div className={`flex-shrink-0 p-4 rounded-2xl bg-gradient-to-br ${service.color} w-fit mb-5`}>
                      <service.icon className="h-7 w-7 text-white" strokeWidth={1.5} />
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-accent transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-3 flex-1">
                      {service.subtitle}
                    </p>
                    <div className="flex items-center text-sm text-accent font-medium group-hover:translate-x-1 transition-transform">
                      Подробнее
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-20 lg:py-20 bg-background">
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
        <section className="py-20 lg:py-20 bg-primary relative overflow-hidden">
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
                size="lg"
                className="bg-white text-primary hover:bg-white/90 text-lg px-10 py-7 h-auto group shadow-glow"
                onClick={openApplicationModal}
              >
                Рассчитать доставку
                <ArrowRight className="ml-3 h-6 w-6 transition-transform group-hover:translate-x-2" />
              </Button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Services;
