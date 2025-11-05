import { Truck, Ship, Plane, FileCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Services = () => {
  const services = [
    {
      icon: Truck,
      title: "Международные автоперевозки",
      description: "Надёжная доставка грузов автотранспортом по Европе и Азии. Собственный парк современных грузовиков с GPS-мониторингом.",
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
      image: "https://images.unsplash.com/photo-1554224311-beee2c231576?q=80&w=2070",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 animate-fade-in">
              Наши логистические решения
            </h1>
            <p className="text-xl text-primary-foreground/90 animate-fade-in" style={{ animationDelay: '0.2s' }}>
              Комплексные услуги международной логистики для вашего бизнеса
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="space-y-20">
            {services.map((service, index) => (
              <div
                key={index}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                  index % 2 === 1 ? "lg:flex-row-reverse" : ""
                }`}
              >
                <div className={`${index % 2 === 1 ? "lg:order-2" : ""}`}>
                  <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-xl">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                </div>

                <div className={`space-y-6 ${index % 2 === 1 ? "lg:order-1" : ""}`}>
                  <div className="inline-flex p-4 rounded-lg bg-primary/10 text-primary">
                    <service.icon className="h-10 w-10" />
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                    {service.title}
                  </h2>
                  <p className="text-lg text-muted-foreground">
                    {service.description}
                  </p>
                  <ul className="grid grid-cols-2 gap-3">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-foreground">
                        <div className="h-1.5 w-1.5 rounded-full bg-accent" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button
                    asChild
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
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Почему выбирают нас
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              { title: "Надёжность", description: "Гарантия сохранности груза и соблюдения сроков" },
              { title: "Скорость", description: "Оптимальные маршруты и быстрая обработка заказов" },
              { title: "Прозрачность", description: "Онлайн-отслеживание и полная отчётность" },
            ].map((item, index) => (
              <div key={index} className="text-center p-6">
                <h3 className="text-xl font-semibold text-foreground mb-3">{item.title}</h3>
                <p className="text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;
