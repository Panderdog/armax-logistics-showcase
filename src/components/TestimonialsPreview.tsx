import { useState, useEffect, useRef } from "react";
import { Star, ArrowRight, Building2, TrendingUp, Package, ChevronLeft, ChevronRight } from "lucide-react";
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
  const [currentSlide, setCurrentSlide] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  // Auto-advance carousel on mobile
  useEffect(() => {
    if (window.innerWidth >= 1024) return;
    
    const interval = setInterval(() => {
      if (!isDragging) {
        setCurrentSlide(prev => {
          const newSlide = prev === testimonials.length - 1 ? 0 : prev + 1;
          scrollToSlide(newSlide);
          return newSlide;
        });
      }
    }, 9000);
    return () => clearInterval(interval);
  }, [isDragging]);

  const handlePrev = () => {
    const newSlide = currentSlide === 0 ? testimonials.length - 1 : currentSlide - 1;
    setCurrentSlide(newSlide);
    scrollToSlide(newSlide);
  };

  const handleNext = () => {
    const newSlide = currentSlide === testimonials.length - 1 ? 0 : currentSlide + 1;
    setCurrentSlide(newSlide);
    scrollToSlide(newSlide);
  };

  const scrollToSlide = (index: number) => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const slideWidth = container.offsetWidth;
      container.scrollTo({
        left: slideWidth * index,
        behavior: 'smooth'
      });
    }
  };

  // Touch/mouse drag handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if (window.innerWidth >= 1024) return;
    setIsDragging(true);
    setStartX(e.pageX - (scrollContainerRef.current?.offsetLeft || 0));
    setScrollLeft(scrollContainerRef.current?.scrollLeft || 0);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (window.innerWidth >= 1024) return;
    setIsDragging(true);
    setStartX(e.touches[0].pageX - (scrollContainerRef.current?.offsetLeft || 0));
    setScrollLeft(scrollContainerRef.current?.scrollLeft || 0);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || window.innerWidth >= 1024) return;
    e.preventDefault();
    const x = e.pageX - (scrollContainerRef.current?.offsetLeft || 0);
    const walk = (x - startX) * 2;
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft = scrollLeft - walk;
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || window.innerWidth >= 1024) return;
    const x = e.touches[0].pageX - (scrollContainerRef.current?.offsetLeft || 0);
    const walk = (x - startX) * 2;
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft = scrollLeft - walk;
    }
  };

  const handleDragEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);
    
    // Snap to nearest slide
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const slideWidth = container.offsetWidth;
      const newSlide = Math.round(container.scrollLeft / slideWidth);
      setCurrentSlide(newSlide);
      scrollToSlide(newSlide);
    }
  };

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
          <h2 className="text-4xl md:text-5xl lg:text-[3.5rem] font-bold text-foreground mb-6 tracking-tight leading-[1.1]">
            Истории успешных поставок
          </h2>
          <p className="text-lg text-muted-foreground font-light leading-relaxed max-w-xl mx-auto">
            Каждый проект — это решение конкретной задачи бизнеса. Вот что говорят наши клиенты.
          </p>
        </div>

        {/* Testimonials Carousel */}
        <div className="relative mb-12">
          {/* Desktop: Grid layout */}
          <div className="hidden lg:grid lg:grid-cols-3 gap-6 lg:gap-8">
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

          {/* Mobile: Carousel layout */}
          <div className="lg:hidden relative">
            <div 
              ref={scrollContainerRef}
              className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide gap-4 cursor-grab active:cursor-grabbing"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleDragEnd}
              onMouseLeave={handleDragEnd}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleDragEnd}
            >
              {testimonials.map((testimonial) => {
                const IconComponent = testimonial.icon;
                return (
                  <div
                    key={testimonial.id}
                    className="flex-shrink-0 w-full snap-center"
                  >
                    <div className="bg-card rounded-2xl p-6 border border-border/50 h-full">
                      {/* Highlight badge */}
                      <div className="flex items-center gap-2 mb-4">
                        <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center">
                          <IconComponent className="w-4 h-4 text-accent" />
                        </div>
                        <span className="text-sm font-medium text-accent">
                          {testimonial.highlight}
                        </span>
                      </div>

                      {/* Content */}
                      <p className="text-foreground/80 leading-relaxed mb-6 text-[15px]">
                        «{testimonial.content}»
                      </p>

                      {/* Rating */}
                      <div className="flex gap-0.5 mb-4">
                        {Array.from({ length: testimonial.rating }).map((_, i) => (
                          <Star key={i} className="h-4 w-4 fill-accent text-accent" />
                        ))}
                      </div>

                      {/* Author */}
                      <div className="flex items-center gap-3 pt-4 border-t border-border">
                        <div className="w-10 h-10 rounded-full overflow-hidden flex items-center justify-center">
                          <img
                            src={testimonial.image}
                            alt={testimonial.author}
                            className="w-full h-full object-cover"
                            style={testimonial.image.includes('monogramm') ? {
                              transform: 'scaleX(1.75) scaleY(1.81) translateY(1px)'
                            } as React.CSSProperties : undefined}
                          />
                        </div>
                        <div>
                          <div className="font-semibold text-foreground text-sm">
                            {testimonial.author}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {testimonial.role}
                          </div>
                          <div className="text-xs text-muted-foreground/70">
                            {testimonial.company}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Navigation controls for mobile */}
            <div className="flex items-center justify-between mt-6">
              {/* Dots indicator */}
              <div className="flex gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setCurrentSlide(index);
                      scrollToSlide(index);
                    }}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      currentSlide === index 
                        ? "w-8 bg-gradient-to-r from-accent to-orange-500" 
                        : "w-2 bg-border hover:bg-border/70"
                    }`}
                    aria-label={`Перейти к отзыву ${index + 1}`}
                  />
                ))}
              </div>
              
              {/* Arrow buttons */}
              <div className="flex gap-2">
                <button
                  onClick={handlePrev}
                  className="w-9 h-9 rounded-lg bg-card border border-border/50 flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-accent/20 transition-all duration-300"
                  aria-label="Предыдущий отзыв"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={handleNext}
                  className="w-9 h-9 rounded-lg bg-card border border-border/50 flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-accent/20 transition-all duration-300"
                  aria-label="Следующий отзыв"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
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

