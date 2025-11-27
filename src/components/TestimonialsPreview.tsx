import { Star, Quote, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const testimonials = [
  {
    id: 1,
    author: "Алексей Петров",
    role: "Директор по закупкам",
    company: "ТехноИмпорт",
    content: "Работаем с Armax уже 5 лет. Надёжность на высшем уровне — ни одной потерянной поставки. Ребята реально помогают оптимизировать логистику.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
  },
  {
    id: 2,
    author: "Мария Козлова",
    role: "Руководитель ВЭД",
    company: "ФудЛогистик",
    content: "Отличная команда! Таможенное оформление проходит без задержек. Персональный менеджер всегда на связи и решает вопросы оперативно.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
  },
  {
    id: 3,
    author: "Дмитрий Соколов",
    role: "Генеральный директор",
    company: "АвтоПартс",
    content: "Перешли к Armax от другого логиста — небо и земля. Прозрачные цены, точные сроки, профессиональный подход к каждой поставке.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
  },
];

const TestimonialsPreview = () => {
  return (
    <section className="py-20 lg:py-28 bg-secondary/30 relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_120%,hsl(var(--accent)/0.05),transparent)]" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      
      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        {/* Section header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-16">
          <div className="max-w-2xl">
            <span className="inline-block px-4 py-1.5 mb-6 text-sm font-medium text-accent bg-accent/10 rounded-full border border-accent/20">
              Отзывы клиентов
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 tracking-tight">
              Нам доверяют
            </h2>
            <p className="text-lg text-muted-foreground font-light leading-relaxed">
              Более 500 компаний выбрали нас в качестве надёжного<br />логистического партнёра
            </p>
          </div>
          <Button asChild variant="outline" size="lg" className="group w-fit">
            <Link to="/reviews">
              Все отзывы
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>

        {/* Testimonials grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              className="group relative bg-card rounded-3xl border border-border/50 p-8 hover:border-accent/30 hover:shadow-large transition-all duration-500 animate-fade-in"
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
              <p className="text-foreground/80 leading-relaxed mb-8 text-[15px]">
                "{testimonial.content}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-4">
                <img
                  src={testimonial.image}
                  alt={testimonial.author}
                  className="w-12 h-12 rounded-full object-cover ring-2 ring-border group-hover:ring-accent/30 transition-all"
                />
                <div>
                  <div className="font-semibold text-foreground">
                    {testimonial.author}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {testimonial.role}, {testimonial.company}
                  </div>
                </div>
              </div>

              {/* Hover gradient */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-accent/0 via-transparent to-accent/0 group-hover:from-accent/5 group-hover:to-accent/5 transition-all duration-500 pointer-events-none" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsPreview;

