import { Star, Quote } from "lucide-react";

const Reviews = () => {
  const testimonials = [
    {
      name: "Александр Петров",
      company: "ТехноСнаб ООО",
      text: "Сотрудничаем с Armax Logistics уже более 3 лет. Всегда чёткое выполнение сроков, профессиональная команда и прозрачная отчётность. Рекомендую!",
      rating: 5,
    },
    {
      name: "Мария Иванова",
      company: "Строй-Импорт",
      text: "Отличный сервис! Быстро организовали доставку крупногабаритного груза из Германии. Груз прибыл в целости и в указанный срок.",
      rating: 5,
    },
    {
      name: "Дмитрий Соколов",
      company: "ЕвроТранс",
      text: "Профессиональный подход к каждой перевозке. Особенно ценим оперативную обратную связь и готовность решать нестандартные задачи.",
      rating: 5,
    },
  ];

  const caseStudies = [
    {
      title: "Доставка промышленного оборудования",
      problem: "Клиенту требовалось доставить крупногабаритное оборудование из Германии в Казахстан в сжатые сроки",
      solution: "Организовали мультимодальную перевозку: автотранспорт + ЖД. Оформили все разрешения на перевозку негабарита",
      result: "Груз доставлен за 12 дней вместо стандартных 18. Клиент сэкономил 2 недели простоя производства",
    },
    {
      title: "Регулярные поставки продуктов питания",
      problem: "Розничная сеть нуждалась в регулярных поставках товаров с соблюдением температурного режима",
      solution: "Организовали еженедельные рейсы с рефрижераторами. Внедрили систему онлайн-мониторинга температуры",
      result: "0% потерь товара за год сотрудничества. Снижение логистических затрат на 15%",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 animate-fade-in">
              Отзывы клиентов
            </h1>
            <p className="text-xl text-primary-foreground/90 animate-fade-in" style={{ animationDelay: '0.2s' }}>
              Нам доверяют сотни компаний по всей России и СНГ
            </p>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="p-8 rounded-xl bg-card border border-border hover:border-primary transition-all duration-300 hover:shadow-lg relative"
              >
                <Quote className="absolute top-6 right-6 h-12 w-12 text-primary/10" />
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-accent text-accent" />
                  ))}
                </div>
                <p className="text-foreground mb-6 relative z-10">"{testimonial.text}"</p>
                <div className="border-t border-border pt-4">
                  <div className="font-semibold text-foreground">{testimonial.name}</div>
                  <div className="text-sm text-muted-foreground">{testimonial.company}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Case Studies */}
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Кейсы наших проектов
              </h2>
              <p className="text-lg text-muted-foreground">
                Примеры успешно реализованных логистических решений
              </p>
            </div>

            <div className="space-y-12">
              {caseStudies.map((caseStudy, index) => (
                <div
                  key={index}
                  className="p-8 rounded-xl bg-secondary border border-border"
                >
                  <h3 className="text-2xl font-bold text-foreground mb-6">
                    {caseStudy.title}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <div className="text-sm font-semibold text-accent mb-2">ПРОБЛЕМА</div>
                      <p className="text-foreground/80">{caseStudy.problem}</p>
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-accent mb-2">РЕШЕНИЕ</div>
                      <p className="text-foreground/80">{caseStudy.solution}</p>
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-accent mb-2">РЕЗУЛЬТАТ</div>
                      <p className="text-foreground/80">{caseStudy.result}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Reviews;
