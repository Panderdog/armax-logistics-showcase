import { Star, ArrowRight, Building2, TrendingUp, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const testimonials = [
  {
    id: 1,
    author: "Елена Михайлова",
    role: "Директор по закупкам",
    company: "МедТехника Плюс",
    content: "Ввозили оборудование, где важно, чтобы по документам не было ни одного слабого места. Armax взяли на себя ТН ВЭД/пакет документов, заранее прогнали риски по оформлению и держали нас в курсе статусов. Выпуск прошёл спокойно, без «сюрпризов» и лишних затрат. По ощущениям — сервис выше среднего: не просто «оформляют», а реально ведут процесс.",
    rating: 5,
    image: "/avatar/maniken/2.webp",
    highlight: "Полное таможенное сопровождение",
    icon: Package,
  },
  {
    id: 2,
    author: "Андрей Хрусталёв",
    role: "Руководитель отдела логистики",
    company: "СтройМатериалы Про",
    content: "Работаем с Armax третий год. По поставке из Китая сроки «горели», и нам быстро предложили альтернативную схему с понятным планом по датам. В итоге забрали груз без простоев и уложились в дедлайн запуска проекта — минус примерно две недели к исходному сценарию. Для нас это критично, потому что каждый день простоя стоит денег.",
    rating: 5,
    image: "/avatar/monogramm/AX.webp",
    highlight: "Сэкономили 2 недели на поставке",
    icon: TrendingUp,
  },
  {
    id: 3,
    author: "Андрей Волков",
    role: "Основатель",
    company: "TechParts",
    content: "Раньше поставки из Китая были хаосом: сроки прыгали, документы приходили в последний момент. С Armax за несколько месяцев выстроили стабильный поток — сейчас идём 4–5 контейнеров в месяц по понятному графику. Нравится, что менеджер погружается в специфику и предупреждает о рисках заранее, а не постфактум.",
    rating: 5,
    image: "/avatar/maniken/4.webp",
    highlight: "4-5 контейнеров ежемесячно",
    icon: Building2,
  },
];

const TestimonialsPreview = () => {
  return (
    <section className="py-24 lg:py-32 bg-background relative overflow-hidden">
      {/* Subtle decorative elements */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      
      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        {/* Section header */}
        <div className="max-w-3xl mx-auto text-center mb-16 lg:mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 text-sm font-medium text-muted-foreground bg-card rounded-full border border-border/50">
            <div className="flex -space-x-1">
              <div className="w-5 h-5 rounded-full bg-accent/20 flex items-center justify-center">
                <Star className="w-3 h-3 text-accent fill-accent" />
              </div>
            </div>
            <span>Реальные отзывы клиентов</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-[3.5rem] font-bold text-foreground mb-6 tracking-tight leading-[1.1] whitespace-nowrap">
            Истории успешных поставок
          </h2>
          <p className="text-lg text-muted-foreground font-light leading-relaxed max-w-xl mx-auto">
            Каждый проект — это решение конкретной задачи бизнеса. Вот что говорят наши клиенты.
          </p>
        </div>

        {/* Testimonials */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 mb-12">
          {testimonials.map((testimonial, index) => {
            const IconComponent = testimonial.icon;
            return (
              <div
                key={testimonial.id}
                className="group relative bg-card rounded-2xl p-8 lg:p-10 hover:shadow-large transition-all duration-500 animate-fade-in border border-border/50 hover:border-accent/20"
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                {/* Highlight badge */}
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center">
                    <IconComponent className="w-4 h-4 text-accent" />
                  </div>
                  <span className="text-sm font-medium text-accent">
                    {testimonial.highlight}
                  </span>
                </div>

                {/* Content */}
                <p className="text-foreground/80 leading-relaxed mb-8 text-[15px] lg:text-base">
                  «{testimonial.content}»
                </p>

                {/* Rating */}
                <div className="flex gap-0.5 mb-6">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-accent text-accent" />
                  ))}
                </div>

                {/* Author */}
                <div className="flex items-center gap-4 pt-6 border-t border-border">
                  <div className="w-12 h-12 rounded-full overflow-hidden flex items-center justify-center">
                    <img
                      src={testimonial.image}
                      alt={testimonial.author}
                      className="w-full h-full object-cover transition-all duration-500"
                      style={testimonial.image.includes('monogramm') ? {
                        transform: 'scaleX(1.75) scaleY(1.81) translateY(1px)'
                      } as React.CSSProperties : undefined}
                    />
                  </div>
                  <div>
                    <div className="font-semibold text-foreground text-sm">
                      {testimonial.author}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {testimonial.role}
                    </div>
                    <div className="text-xs text-muted-foreground/70 mt-0.5">
                      {testimonial.company}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button asChild variant="outline" size="lg" className="group rounded-full px-8">
            <Link to="/reviews">
              Все отзывы
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
          <p className="text-sm text-muted-foreground">
            Более 500 компаний уже с нами
          </p>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsPreview;

