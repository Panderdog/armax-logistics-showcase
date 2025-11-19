import { Star, Quote } from "lucide-react";
import SEO from "@/components/SEO";
import { organizationSchema } from "@/lib/schema";

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
    <>
      <SEO
        title="Отзывы клиентов"
        description="Отзывы о работе Armax Logistics от наших клиентов. Реальные кейсы успешных логистических проектов: доставка промышленного оборудования, регулярные поставки. Нам доверяют сотни компаний."
        keywords="отзывы, отзывы клиентов, кейсы, проекты, успешные перевозки, доставка оборудования, надёжная компания"
        canonicalUrl="/reviews"
        structuredData={organizationSchema}
      />
      <div className="min-h-screen">
        {/* Hero Section */}
      <section className="relative py-24 lg:py-32 bg-gradient-to-br from-primary via-primary to-primary-dark text-primary-foreground">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="max-w-4xl">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8 animate-fade-in leading-[1.1] text-balance">
              Отзывы клиентов
            </h1>
            <p className="text-xl md:text-2xl lg:text-3xl text-primary-foreground/85 font-light animate-fade-in leading-relaxed" style={{ animationDelay: '0.15s' }}>
              Нам доверяют сотни компаний по всей России и СНГ
            </p>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 lg:py-32">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10 mb-32">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="group p-8 lg:p-10 rounded-2xl bg-card border border-border/50 hover:border-accent/30 transition-all duration-500 ease-out hover:shadow-large hover:-translate-y-2 hover:scale-[1.02] relative animate-fade-in cursor-default"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <Quote className="absolute top-8 right-8 h-16 w-16 text-accent/10 group-hover:text-accent/20 group-hover:scale-110 transition-all duration-300" strokeWidth={1.5} />
                <div className="flex gap-1.5 mb-6">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-accent text-accent group-hover:scale-110 transition-transform duration-300" strokeWidth={1.5} style={{ transitionDelay: `${i * 50}ms` }} />
                  ))}
                </div>
                <p className="text-foreground group-hover:text-foreground/90 mb-8 relative z-10 text-[15px] leading-relaxed transition-colors duration-300">"{testimonial.text}"</p>
                <div className="border-t border-border/50 group-hover:border-accent/30 pt-6 transition-colors duration-300">
                  <div className="font-bold text-foreground group-hover:text-accent text-base tracking-tight transition-colors duration-300">{testimonial.name}</div>
                  <div className="text-sm text-muted-foreground group-hover:text-foreground font-light mt-1 transition-colors duration-300">{testimonial.company}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Case Studies */}
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-20 max-w-3xl mx-auto">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 text-balance">
                Кейсы наших проектов
              </h2>
              <p className="text-lg md:text-xl text-muted-foreground font-light leading-relaxed">
                Примеры успешно реализованных логистических решений
              </p>
            </div>

            <div className="space-y-10">
              {caseStudies.map((caseStudy, index) => (
                <div
                  key={index}
                  className="group p-10 lg:p-12 rounded-2xl bg-gradient-to-br from-secondary/50 to-background border border-border/50 hover:border-accent/30 transition-all duration-500 ease-out hover:shadow-large hover:scale-[1.01] hover:-translate-y-1 animate-fade-in cursor-default"
                  style={{ animationDelay: `${index * 0.15}s` }}
                >
                  <h3 className="text-3xl lg:text-4xl font-bold text-foreground group-hover:text-accent mb-10 tracking-tight transition-colors duration-300">
                    {caseStudy.title}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
                    <div className="group/item">
                      <div className="text-xs font-bold text-accent group-hover:text-accent group-hover/item:scale-105 mb-4 tracking-wider uppercase transition-transform duration-300">Проблема</div>
                      <p className="text-foreground group-hover:text-foreground/90 text-[15px] leading-relaxed transition-colors duration-300">{caseStudy.problem}</p>
                    </div>
                    <div className="group/item">
                      <div className="text-xs font-bold text-accent group-hover:text-accent group-hover/item:scale-105 mb-4 tracking-wider uppercase transition-transform duration-300">Решение</div>
                      <p className="text-foreground group-hover:text-foreground/90 text-[15px] leading-relaxed transition-colors duration-300">{caseStudy.solution}</p>
                    </div>
                    <div className="group/item">
                      <div className="text-xs font-bold text-accent group-hover:text-accent group-hover/item:scale-105 mb-4 tracking-wider uppercase transition-transform duration-300">Результат</div>
                      <p className="text-foreground group-hover:text-foreground/90 text-[15px] leading-relaxed font-medium transition-colors duration-300">{caseStudy.result}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      </div>
    </>
  );
};

export default Reviews;
