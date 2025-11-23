import { Truck, Ship, Plane, FileCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import SEO from "@/components/SEO";
import { organizationSchema } from "@/lib/schema";

const Services = () => {
  const services = [
    {
      icon: Truck,
      title: "Международные автоперевозки",
      description: "Надёжная доставка грузов автотранспортом по Европе и Азии. Работаем с проверенными перевозчиками и обеспечиваем полный контроль качества.",
      features: ["FTL и LTL перевозки", "Температурный режим", "Сборные грузы", "Экспресс-доставка"],
      image: "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?q=80&w=2070",
    },
    {
      icon: Ship,
      title: "Морские перевозки",
      description: "Контейнерные перевозки морем с использованием ведущих мировых линий. Оптимальные маршруты и конкурентные ставки.",
      features: ["FCL и LCL контейнеры", "Мультимодальные перевозки", "Консолидация грузов", "Страхование"],
      image: "https://images.unsplash.com/photo-1578575437130-527eed3abbec?q=80&w=2070",
    },
    {
      icon: Plane,
      title: "Авиа-доставка",
      description: "Быстрая доставка срочных грузов авиатранспортом. Прямые рейсы и оптимальная логистика для экономии времени.",
      features: ["Срочные отправки", "Опасные грузы", "Чартерные рейсы", "Door-to-door"],
      image: "https://images.unsplash.com/photo-1464037866556-6812c9d1c72e?q=80&w=2070",
    },
    {
      icon: FileCheck,
      title: "Таможенное оформление",
      description: "Полное сопровождение грузов через таможню. Подготовка документов, декларирование, сертификация товаров.",
      features: ["ВЭД консалтинг", "Таможенная очистка", "Сертификация", "Полное сопровождение"],
      image: "/images/customs.png",
    },
  ];

  return (
    <>
      <SEO
        title="Наши услуги"
        description="Комплексные логистические услуги: международные автоперевозки, морские контейнерные перевозки, авиадоставка грузов, таможенное оформление. Надёжная доставка по Европе и Азии."
        keywords="автоперевозки, морские перевозки, авиадоставка, таможенное оформление, FTL, LTL, FCL, контейнерные перевозки, срочная доставка"
        canonicalUrl="/services"
        structuredData={organizationSchema}
      />
      <div className="min-h-screen">
        {/* Hero Section */}
      <section className="relative py-24 lg:py-32 bg-gradient-to-br from-primary via-primary to-primary-dark text-primary-foreground">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="max-w-4xl">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8 animate-fade-in leading-[1.1] text-balance">
              Наши логистические решения
            </h1>
            <p className="text-xl md:text-2xl lg:text-3xl text-primary-foreground/85 font-light animate-fade-in leading-relaxed" style={{ animationDelay: '0.15s' }}>
              Комплексные услуги международной логистики для вашего бизнеса
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24 lg:py-32">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="space-y-32">
            {services.map((service, index) => (
              <div
                key={index}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center ${
                  index % 2 === 1 ? "lg:flex-row-reverse" : ""
                }`}
              >
                <div className={`${index % 2 === 1 ? "lg:order-2" : ""} animate-fade-in group cursor-pointer`}>
                  <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-large group-hover:shadow-glow transition-all duration-500">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                <div className={`space-y-8 ${index % 2 === 1 ? "lg:order-1" : ""} animate-fade-in`} style={{ animationDelay: '0.2s' }}>
                  <div className="group inline-flex p-5 rounded-2xl bg-accent/5 text-accent hover:bg-accent hover:text-white transition-all duration-500 ease-out hover:scale-110 cursor-default">
                    <service.icon className="h-12 w-12 group-hover:scale-110 transition-transform duration-300" strokeWidth={1.5} />
                  </div>
                  <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-[1.1] text-balance">
                    {service.title}
                  </h2>
                  <p className="text-lg md:text-xl text-muted-foreground font-light leading-relaxed">
                    {service.description}
                  </p>
                  <ul className="grid grid-cols-2 gap-4">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-3 text-foreground text-[15px]">
                        <div className="h-2 w-2 rounded-full bg-accent flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button
                    asChild
                    size="lg"
                    className="mt-4"
                  >
                    <Link to="/contacts">Узнать подробнее</Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 lg:py-32 bg-gradient-to-b from-secondary/50 via-secondary/30 to-background">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 text-balance">
              Почему выбирают нас
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 max-w-6xl mx-auto">
            {[
              { title: "Надёжность", description: "Гарантия сохранности груза и соблюдения сроков" },
              { title: "Скорость", description: "Оптимальные маршруты и быстрая обработка заказов" },
              { title: "Прозрачность", description: "Информирование о статусе и полная отчётность" },
            ].map((item, index) => (
              <div key={index} className="group text-center p-8 lg:p-10 rounded-2xl bg-card border border-border/50 hover:border-accent/30 transition-all duration-500 ease-out hover:shadow-large hover:-translate-y-2 hover:scale-105 animate-fade-in cursor-default" style={{ animationDelay: `${index * 0.1}s` }}>
                <h3 className="text-2xl lg:text-3xl font-bold text-foreground group-hover:text-accent mb-4 tracking-tight transition-colors duration-300">{item.title}</h3>
                <p className="text-muted-foreground group-hover:text-foreground text-[15px] md:text-base leading-relaxed font-light transition-colors duration-300">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      </div>
    </>
  );
};

export default Services;
