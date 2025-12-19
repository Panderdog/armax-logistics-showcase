import { Star, Quote, ArrowRight, TrendingUp, CheckCircle, Clock, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import SEO from "@/components/SEO";
import { organizationSchema } from "@/lib/schema";
import { useApplicationModal } from "@/contexts/ApplicationModalContext";

const Reviews = () => {
  const { openApplicationModal } = useApplicationModal();

  const testimonials = [
    {
      name: "Александр Петров",
      role: "Директор по закупкам",
      company: "ТехноСнаб ООО",
      text: "Сотрудничаем с Armax Logistics уже более 3 лет. Всегда чёткое выполнение сроков, профессиональная команда и прозрачная отчётность. Рекомендую!",
      rating: 5,
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
    },
    {
      name: "Мария Иванова",
      role: "Руководитель ВЭД",
      company: "СтройИмпорт",
      text: "Отличный сервис! Быстро организовали доставку крупногабаритного груза из Германии. Груз прибыл в целости и в указанный срок.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
    },
    {
      name: "Дмитрий Соколов",
      role: "Генеральный директор",
      company: "ЕвроТранс",
      text: "Профессиональный подход к каждой перевозке. Особенно ценим оперативную обратную связь и готовность решать нестандартные задачи.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
    },
    {
      name: "Елена Козлова",
      role: "Менеджер по логистике",
      company: "АзияТрейд",
      text: "Работаем по Китаю уже 2 года. Ребята реально понимают специфику азиатского рынка, помогают с консолидацией и таможней. Очень довольны!",
      rating: 5,
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face",
    },
    {
      name: "Сергей Новиков",
      role: "Владелец бизнеса",
      company: "ИмпортПро",
      text: "Перешли от конкурентов и не пожалели. Цены адекватные, сроки соблюдают, менеджер всегда на связи. То, что нужно для бизнеса.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face",
    },
    {
      name: "Анна Белова",
      role: "Директор по развитию",
      company: "ФудЛогистик",
      text: "Отдельное спасибо за работу с рефрижераторными грузами. Температурный режим соблюдается идеально, ни одной порчи за год работы.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face",
    },
  ];

  const caseStudies = [
    {
      title: "Доставка промышленного оборудования из Китая",
      client: "Машиностроительный завод",
      challenge: "Срочная доставка станка ЧПУ весом 12 тонн с завода в Шэньчжэне на производство в Екатеринбург",
      solution: "Организовали мультимодальную перевозку: автотранспорт до порта, морской фрахт до Владивостока, ЖД до Екатеринбурга. Оформили все разрешения на негабарит.",
      result: "Груз доставлен за 28 дней вместо стандартных 40. Экономия клиента — 2 недели простоя производства.",
      metrics: [
        { value: "28", label: "дней доставка" },
        { value: "12", label: "тонн груза" },
        { value: "30%", label: "экономия времени" },
      ],
      color: "from-blue-500 to-cyan-500",
    },
    {
      title: "Регулярные поставки электроники из Кореи",
      client: "Розничная сеть электроники",
      challenge: "Организация еженедельных поставок смартфонов и комплектующих из Сеула с минимальными сроками",
      solution: "Выстроили схему авиа+авто доставки через Инчхон. Договорились о приоритетном таможенном оформлении.",
      result: "Сроки доставки сократились с 14 до 5 дней. Клиент получил конкурентное преимущество в скорости обновления ассортимента.",
      metrics: [
        { value: "5", label: "дней доставка" },
        { value: "52", label: "рейса в год" },
        { value: "65%", label: "быстрее" },
      ],
      color: "from-accent to-orange-500",
    },
  ];

  const stats = [
    { icon: Building2, value: "500+", label: "компаний-клиентов" },
    { icon: Star, value: "4.9", label: "средняя оценка" },
    { icon: Clock, value: "3+", label: "года в среднем работаем" },
    { icon: TrendingUp, value: "95%", label: "возвращаются" },
  ];

  return (
    <>
      <SEO
        title="Отзывы клиентов"
        description="Отзывы о работе Armax Logistics от наших клиентов. Реальные кейсы успешных логистических проектов."
        keywords="отзывы, отзывы клиентов, кейсы, проекты, успешные перевозки"
        canonicalUrl="/reviews"
        structuredData={organizationSchema}
      />
      <div className="min-h-screen bg-[#0B0F18]">
        {/* Hero Section */}
        <section className="relative py-24 lg:py-32 overflow-hidden">
          {/* Background effects */}
          <div className="absolute inset-0 bg-[url('/nightport.jpg')] bg-cover bg-center opacity-30" />
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
                <Star className="w-4 h-4 text-[#F34D1B] fill-[#F34D1B]" />
                <span className="text-zinc-300">Отзывы</span>
              </div>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-8 animate-fade-in leading-[1.05] tracking-tight">
                Нам доверяют
                <br />
                <span className="bg-gradient-to-r from-[#F34D1B] via-orange-400 to-[#F34D1B] bg-clip-text text-transparent">500+ компаний</span>
              </h1>
              <p className="text-xl lg:text-2xl text-zinc-400 font-light animate-fade-in leading-relaxed max-w-2xl" style={{ animationDelay: '0.15s' }}>
                Реальные истории успешного сотрудничества<br />и решённых задач
              </p>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-16 bg-background relative -mt-12 z-20">
          <div className="container mx-auto px-6 lg:px-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="group p-6 lg:p-8 rounded-2xl bg-card border border-border/50 shadow-large hover:border-accent/30 transition-all duration-500 hover:-translate-y-1 text-center"
                >
                  <stat.icon className="h-8 w-8 text-accent mx-auto mb-4 group-hover:scale-110 transition-transform" strokeWidth={1.5} />
                  <div className="text-3xl lg:text-4xl font-bold text-foreground mb-1">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Grid */}
        <section className="py-20 lg:py-20 bg-background">
          <div className="container mx-auto px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="inline-block px-4 py-1.5 mb-6 text-sm font-medium text-accent bg-accent/10 rounded-full border border-accent/20">
                Отзывы клиентов
              </span>
              <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6 tracking-tight">
                Что говорят о нас
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className="group relative p-8 rounded-3xl bg-card border border-border/50 hover:border-accent/30 transition-all duration-500 hover:shadow-large hover:-translate-y-2 animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {/* Quote icon */}
                  <div className="absolute -top-4 -left-4 w-12 h-12 rounded-2xl bg-accent/10 flex items-center justify-center group-hover:bg-accent group-hover:scale-110 transition-all duration-500">
                    <Quote className="h-5 w-5 text-accent group-hover:text-white transition-colors" />
                  </div>

                  {/* Rating */}
                  <div className="flex gap-1 mb-6 pt-2">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-accent text-accent" />
                    ))}
                  </div>

                  {/* Content */}
                  <p className="text-foreground/80 leading-relaxed mb-8">
                    "{testimonial.text}"
                  </p>

                  {/* Author */}
                  <div className="flex items-center gap-4">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full object-cover ring-2 ring-border group-hover:ring-accent/30 transition-all"
                    />
                    <div>
                      <div className="font-semibold text-foreground group-hover:text-accent transition-colors">
                        {testimonial.name}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {testimonial.role}, {testimonial.company}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Case Studies */}
        <section className="py-20 lg:py-20 bg-secondary/30">
          <div className="container mx-auto px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="inline-block px-4 py-1.5 mb-6 text-sm font-medium text-accent bg-accent/10 rounded-full border border-accent/20">
                Кейсы
              </span>
              <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6 tracking-tight">
                Реальные проекты
              </h2>
              <p className="text-lg text-muted-foreground font-light">
                Как мы решаем сложные логистические задачи
              </p>
            </div>

            <div className="space-y-8 max-w-5xl mx-auto">
              {caseStudies.map((caseStudy, index) => (
                <div
                  key={index}
                  className="group rounded-3xl bg-card border border-border/50 hover:border-accent/30 transition-all duration-500 hover:shadow-large overflow-hidden"
                >
                  {/* Header */}
                  <div className={`p-8 lg:p-10 bg-gradient-to-r ${caseStudy.color}`}>
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                      <div>
                        <div className="text-white/70 text-sm mb-2">{caseStudy.client}</div>
                        <h3 className="text-2xl lg:text-3xl font-bold text-white">
                          {caseStudy.title}
                        </h3>
                      </div>
                      <div className="flex gap-4">
                        {caseStudy.metrics.map((metric, idx) => (
                          <div key={idx} className="text-center px-4 py-2 rounded-xl bg-white/10 backdrop-blur-sm">
                            <div className="text-2xl font-bold text-white">{metric.value}</div>
                            <div className="text-xs text-white/70">{metric.label}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-8 lg:p-10">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                      <div>
                        <div className="flex items-center gap-2 mb-3">
                          <div className="w-2 h-2 rounded-full bg-red-500" />
                          <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Задача</span>
                        </div>
                        <p className="text-foreground leading-relaxed">{caseStudy.challenge}</p>
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-3">
                          <div className="w-2 h-2 rounded-full bg-amber-500" />
                          <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Решение</span>
                        </div>
                        <p className="text-foreground leading-relaxed">{caseStudy.solution}</p>
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-3">
                          <div className="w-2 h-2 rounded-full bg-emerald-500" />
                          <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Результат</span>
                        </div>
                        <p className="text-foreground leading-relaxed font-medium">{caseStudy.result}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 lg:py-20 bg-background">
          <div className="container mx-auto px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="relative p-12 lg:p-16 rounded-3xl bg-gradient-to-br from-primary via-primary to-primary-dark overflow-hidden text-center">
                <div className="absolute top-0 right-0 w-64 h-64 bg-accent/20 rounded-full blur-[100px]" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/10 rounded-full blur-[100px]" />
                
                <div className="relative">
                  <CheckCircle className="h-16 w-16 text-accent mx-auto mb-6" strokeWidth={1.5} />
                  <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
                    Станьте нашим клиентом
                  </h2>
                  <p className="text-xl text-white/80 font-light mb-10 max-w-2xl mx-auto">
                    Присоединяйтесь к 500+ компаниям, которые доверяют нам свою логистику
                  </p>
                  <Button
                    size="lg"
                    className="bg-white text-primary hover:bg-white/90 text-lg px-10 py-7 h-auto group"
                    onClick={openApplicationModal}
                  >
                    Получить предложение
                    <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Reviews;
