import { useState, useEffect, useCallback } from "react";
import { 
  Star, 
  Quote, 
  CheckCircle2, 
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Users,
  Award,
  Zap,
  Ship,
  Plane,
  Train,
  Truck as TruckIcon,
  MessageSquare
} from "lucide-react";
import { Button } from "@/components/ui/button";
import SEO from "@/components/SEO";
import { organizationSchema } from "@/lib/schema";
import { useApplicationModal } from "@/contexts/ApplicationModalContext";
import CTABlock from "@/components/CTABlock";

const Reviews = () => {
  const { openApplicationModal } = useApplicationModal();
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const featuredTestimonials = [
    {
      name: "Елена Михайлова",
      role: "Директор по закупкам",
      company: "МедТехника Плюс",
      text: "Ввозили оборудование, где важно, чтобы по документам не было ни одного слабого места. Armax взяли на себя ТН ВЭД/пакет документов, заранее прогнали риски по оформлению и держали нас в курсе статусов. Выпуск прошёл спокойно, без «сюрпризов» и лишних затрат. По ощущениям — сервис выше среднего: не просто «оформляют», а реально ведут процесс.",
      rating: 5,
      image: "/avatar/maniken/2.webp",
      highlight: "Полное таможенное сопровождение",
      stats: { value: "100%", label: "документов в порядке" },
    },
    {
      name: "Андрей Хрусталёв",
      role: "Руководитель отдела логистики",
      company: "СтройМатериалы Про",
      text: "Работаем с Armax третий год. По поставке из Китая сроки «горели», и нам быстро предложили альтернативную схему с понятным планом по датам. В итоге забрали груз без простоев и уложились в дедлайн запуска проекта — минус примерно две недели к исходному сценарию. Для нас это критично, потому что каждый день простоя стоит денег.",
      rating: 5,
      image: "/avatar/monogramm/AX.webp",
      highlight: "Сэкономили 2 недели на поставке",
      stats: { value: "40+", label: "поставок в год" },
    },
    {
      name: "Андрей Волков",
      role: "Основатель",
      company: "TechParts",
      text: "Раньше поставки из Китая были хаосом: сроки прыгали, документы приходили в последний момент. С Armax за несколько месяцев выстроили стабильный поток — сейчас идём 4–5 контейнеров в месяц по понятному графику. Нравится, что менеджер погружается в специфику и предупреждает о рисках заранее, а не постфактум.",
      rating: 5,
      image: "/avatar/maniken/4.webp",
      highlight: "4-5 контейнеров ежемесячно",
      stats: { value: "60+", label: "контейнеров в год" },
    },
  ];

  const testimonials = [
    {
      name: "Александр Петров",
      role: "Директор по закупкам",
      company: "ТехноСнаб ООО",
      text: "Сотрудничаем с Armax Logistics больше трёх лет. Ценим стабильность: сроки и договорённости соблюдаются, статусы по перевозке понятные, документы оформляются аккуратно. Если возникают отклонения по графику — предупреждают заранее и предлагают варианты, а не ставят перед фактом. Для нас это ключевое, потому что закупки завязаны на производственный план.",
      rating: 5,
      image: "/avatar/monogramm/AP.webp",
    },
    {
      name: "Мария Иванова",
      role: "Руководитель ВЭД",
      company: "СтройИмпорт",
      text: "Нужно было организовать доставку крупногабаритного груза из Германии: негабарит, согласования, контроль упаковки и сроков. Armax быстро собрали схему перевозки, обозначили риски и держали нас в курсе по каждому этапу. Груз пришёл без повреждений и в согласованное окно. По коммуникации — максимально комфортно: коротко, по делу, с ответственностью.",
      rating: 5,
      image: "/avatar/maniken/1.webp",
    },
    {
      name: "Дмитрий Соколов",
      role: "Генеральный директор",
      company: "ЕвроТранс",
      text: "Работаем с Armax по разным направлениям. Нравится профессиональный подход: быстро отвечают, дают ясные сроки и реально помогают с нестандартными задачами — от срочных перезаказов документов до перестройки маршрута при изменении условий. По сути это не «перевозчик по заявке», а партнёр, который ведёт процесс и снимает с нас операционную нагрузку.",
      rating: 5,
      image: "/avatar/monogramm/DS.webp",
    },
    {
      name: "Елена Козлова",
      role: "Менеджер по логистике",
      company: "АзияТрейд",
      text: "По Китаю работаем около двух лет. Ребята хорошо понимают специфику: консолидация, корректные документы, контроль отгрузки и коммуникация с поставщиками. Нам важно, чтобы груз не «зависал» на стыках и не было сюрпризов по таможне — здесь с этим порядок. По факту стали реже возникать простои и вопросы по оформлению.",
      rating: 5,
      image: "/avatar/monogramm/EK.webp",
    },
    {
      name: "Сергей Новиков",
      role: "Владелец бизнеса",
      company: "ИмпортПро",
      text: "Перешли к Armax от конкурентов и не пожалели. Условия прозрачные: по стоимости и срокам всё проговаривается заранее, без внезапных доплат. Менеджер всегда на связи и нормально объясняет, что происходит, если что-то меняется по маршруту. В итоге процесс стал предсказуемым — именно этого и не хватало для бизнеса.",
      rating: 5,
      image: "/avatar/maniken/image7.webp",
    },
    {
      name: "Анна Белова",
      role: "Директор по развитию",
      company: "ФудЛогистик",
      text: "Отдельно отмечу работу с рефрижераторными грузами. Соблюдается температурный режим, есть контроль на этапах и понятная отчётность по перевозке. За год сотрудничества не было потерь по качеству и спорных ситуаций. Когда работаешь с продуктами, это решает всё — поэтому продолжаем на постоянной основе.",
      rating: 5,
      image: "/avatar/monogramm/AB.webp",
    },
  ];

  const caseStudies = [
    {
      title: "Промышленное оборудование из Китая",
      client: "Машиностроительный завод",
      challenge: "Срочная доставка станка ЧПУ весом 12 тонн с завода в Шэньчжэне на производство в Екатеринбург за минимальные сроки",
      solution: "Мультимодальная перевозка: автотранспорт до порта, морской фрахт до Владивостока, ЖД до Екатеринбурга с оформлением разрешений на негабарит",
      result: "Груз доставлен за 28 дней вместо стандартных 40. Экономия — 2 недели простоя производства",
      metrics: [
        { value: "28", label: "дней" },
        { value: "12", label: "тонн" },
        { value: "–30%", label: "времени" },
      ],
      gradient: "from-[#F34D1B] to-orange-500",
      transports: [TruckIcon, Ship, Train],
    },
    {
      title: "Электроника из Кореи",
      client: "Розничная сеть электроники",
      challenge: "Организация еженедельных поставок смартфонов из Сеула с минимальными сроками доставки",
      solution: "Схема авиа+авто доставки через Инчхон с приоритетным таможенным оформлением и фиксированными слотами",
      result: "Сроки доставки сократились с 14 до 5 дней. Конкурентное преимущество в скорости обновления ассортимента",
      metrics: [
        { value: "5", label: "дней" },
        { value: "52", label: "рейса/год" },
        { value: "–65%", label: "времени" },
      ],
      gradient: "from-orange-500 to-amber-500",
      transports: [Plane, TruckIcon],
    },
    {
      title: "Комплектующие из Турции",
      client: "E-commerce ритейлер",
      challenge: "Снижение стоимости логистики в сезон высокой нагрузки при сохранении сроков доставки",
      solution: "Гибкая мультимодальная схема с оптимизацией упаковки и ускоренным таможенным оформлением",
      result: "Доставка за 8 дней даже в пик спроса. Снижение логистических затрат на 18%",
      metrics: [
        { value: "8", label: "дней" },
        { value: "–18%", label: "затрат" },
        { value: "100%", label: "в срок" },
      ],
      gradient: "from-amber-500 to-[#F34D1B]",
      transports: [TruckIcon, Plane, Train],
    },
  ];

  const handlePrevTestimonial = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setActiveTestimonial((prev) => 
      prev === 0 ? featuredTestimonials.length - 1 : prev - 1
    );
    setTimeout(() => setIsAnimating(false), 500);
  }, [isAnimating, featuredTestimonials.length]);

  const handleNextTestimonial = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setActiveTestimonial((prev) => 
      prev === featuredTestimonials.length - 1 ? 0 : prev + 1
    );
    setTimeout(() => setIsAnimating(false), 500);
  }, [isAnimating, featuredTestimonials.length]);

  // Auto-advance testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isAnimating) {
        handleNextTestimonial();
      }
    }, 13200);
    return () => clearInterval(interval);
  }, [isAnimating, handleNextTestimonial]);

  const currentTestimonial = featuredTestimonials[activeTestimonial];

  return (
    <>
      <SEO
        title="Отзывы клиентов"
        description="Отзывы о работе Armax Logistics от наших клиентов. Реальные кейсы успешных логистических проектов."
        keywords="отзывы, отзывы клиентов, кейсы, проекты, успешные перевозки"
        canonicalUrl="/reviews/"
        structuredData={organizationSchema}
      />
      <div className="min-h-screen bg-[#0B0F18]">
        {/* Hero Section */}
        <section className="relative py-24 lg:py-32 overflow-hidden">
          {/* Background effects */}
          <div className="absolute inset-0 bg-[url('/images/feedback-plane-hero.webp')] bg-cover bg-top opacity-50" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0B0F18]/60 via-[#0B0F18]/40 to-[#0B0F18]" />
          
          {/* Grid pattern */}
          <div 
            className="absolute inset-0 opacity-[0.015]"
            style={{
              backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
              backgroundSize: '60px 60px'
            }}
          />
          
          <div className="container mx-auto px-6 lg:px-8 relative z-10">
            <div className="max-w-4xl">
              <div 
                className="inline-flex items-center gap-2 px-4 py-2 mb-8 text-sm font-medium bg-white/[0.04] backdrop-blur-sm rounded-xl border border-white/[0.06] animate-fade-in"
              >
                <MessageSquare className="w-4 h-4 text-[#F34D1B]" />
                <span className="text-zinc-300">Отзывы и кейсы</span>
              </div>
              
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-8 animate-fade-in leading-[1.05] tracking-tight">
                Нам доверяют
                <br />
                <span className="bg-gradient-to-r from-[#F34D1B] via-orange-400 to-[#F34D1B] bg-clip-text text-transparent animate-shimmer-gradient">
                  500+ компаний
                </span>
              </h1>
              
              <p 
                className="text-xl lg:text-2xl text-zinc-400 font-light animate-fade-in leading-relaxed max-w-3xl" 
                style={{ animationDelay: '0.15s' }}
              >
                Реальные истории успешного сотрудничества
                <br />
                и решённых логистических задач
              </p>
            </div>
          </div>

          {/* Smooth section transition */}
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0B0F18] to-transparent" />
        </section>

        {/* Featured Testimonial Carousel */}
        <section className="relative py-20 lg:py-24 overflow-hidden">
          <div className="absolute inset-0 bg-[#0a0e15]" />
          
          {/* Ambient glow following active testimonial */}
          <div 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-gradient-to-r from-[#F34D1B]/[0.04] via-orange-500/[0.02] to-[#F34D1B]/[0.04] rounded-full blur-[150px] transition-all duration-700"
          />
          
          <div className="container mx-auto px-6 lg:px-8 relative z-10">
            <div className="max-w-5xl mx-auto">
              {/* Section header */}
              <div className="text-center mb-12 lg:mb-16">
                <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 text-sm font-medium bg-white/[0.04] rounded-xl border border-white/[0.06]">
                  <Award className="w-4 h-4 text-[#F34D1B]" />
                  <span className="text-zinc-300">Лучшие отзывы</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
                  Истории успеха
                </h2>
              </div>

              {/* Carousel */}
              <div className="relative">
                <div className="relative rounded-3xl bg-white/[0.02] border border-white/[0.05] overflow-hidden p-8 lg:p-12">
                  {/* Quote decoration */}
                  <div className="absolute top-8 right-8 lg:top-12 lg:right-12">
                    <Quote className="w-16 h-16 lg:w-24 lg:h-24 text-[#F34D1B]/10" />
                  </div>

                  <div className={`transition-all duration-500 ease-out ${isAnimating ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`}>
                    <div className="grid grid-cols-1 lg:grid-cols-[1fr,auto] gap-8 lg:gap-12 items-center">
                      {/* Content */}
                      <div>
                        {/* Highlight badge */}
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 mb-6 text-sm font-medium text-[#F34D1B] bg-[#F34D1B]/10 rounded-full border border-[#F34D1B]/20">
                          <Zap className="w-3.5 h-3.5" />
                          {currentTestimonial.highlight}
                        </div>

                        {/* Quote */}
                        <blockquote className="text-xl lg:text-2xl text-white/90 font-light leading-relaxed mb-8">
                          «{currentTestimonial.text}»
                        </blockquote>

                        {/* Rating */}
                        <div className="flex gap-1 mb-6">
                          {Array.from({ length: currentTestimonial.rating }).map((_, i) => (
                            <Star key={i} className="h-5 w-5 fill-[#F34D1B] text-[#F34D1B]" />
                          ))}
                        </div>

                        {/* Author */}
                        <div className="flex items-center gap-4">
                          <div className="w-14 h-14 rounded-full overflow-hidden flex items-center justify-center ring-2 ring-[#F34D1B]/20">
                            <img
                              src={currentTestimonial.image}
                              alt={currentTestimonial.name}
                              className="w-full h-full object-cover"
                              style={currentTestimonial.image.includes('monogramm') ? {
                                transform: 'scaleX(1.75) scaleY(1.81) translateY(1px)'
                              } as React.CSSProperties : undefined}
                            />
                          </div>
                          <div>
                            <div className="font-semibold text-white text-lg">
                              {currentTestimonial.name}
                            </div>
                            <div className="text-sm text-zinc-400">
                              {currentTestimonial.role}
                            </div>
                            <div className="text-sm text-[#F34D1B]">
                              {currentTestimonial.company}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Stats card */}
                      <div className="hidden lg:block">
                        <div className="w-40 p-6 rounded-2xl bg-gradient-to-br from-[#F34D1B] to-orange-500 text-center">
                          <div className="text-4xl font-bold text-white mb-1">
                            {currentTestimonial.stats.value}
                          </div>
                          <div className="text-sm text-white/80">
                            {currentTestimonial.stats.label}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Navigation */}
                <div className="flex items-center justify-between mt-6">
                  <div className="flex gap-2">
                    {featuredTestimonials.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          if (!isAnimating && index !== activeTestimonial) {
                            setIsAnimating(true);
                            setActiveTestimonial(index);
                            setTimeout(() => setIsAnimating(false), 500);
                          }
                        }}
                        className={`h-2 rounded-full transition-all duration-300 ${
                          activeTestimonial === index 
                            ? "w-8 bg-gradient-to-r from-[#F34D1B] to-orange-500" 
                            : "w-2 bg-zinc-700 hover:bg-zinc-600"
                        }`}
                      />
                    ))}
                  </div>
                  
                  <div className="flex gap-2">
                    <button
                      onClick={handlePrevTestimonial}
                      className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/[0.06] flex items-center justify-center text-zinc-400 hover:text-white hover:bg-white/[0.08] transition-all duration-300"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={handleNextTestimonial}
                      className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/[0.06] flex items-center justify-center text-zinc-400 hover:text-white hover:bg-white/[0.08] transition-all duration-300"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Grid */}
        <section className="relative py-20 lg:py-24 overflow-hidden">
          <div className="absolute inset-0 bg-[#0a0e15]" />
          
          {/* Smooth transition gradient to next section */}
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-[#0B0F18]" />
          
          <div className="container mx-auto px-6 lg:px-8 relative z-10">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 text-sm font-medium bg-white/[0.04] rounded-xl border border-white/[0.06]">
                <Users className="w-4 h-4 text-[#F34D1B]" />
                <span className="text-zinc-300">Отзывы клиентов</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
                Что говорят о нас
              </h2>
              <p className="text-lg text-zinc-400 font-light">
                Мнения наших партнёров и постоянных клиентов
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6 max-w-6xl mx-auto">
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className="group relative p-7 lg:p-8 rounded-2xl bg-white/[0.02] border border-white/[0.05] hover:border-[#F34D1B]/20 transition-all duration-500 hover:-translate-y-2 animate-fade-in overflow-hidden"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {/* Gradient overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#F34D1B]/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* Quote icon */}
                  <div className="absolute -top-2 -right-2 w-16 h-16 rounded-full bg-[#F34D1B]/5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:scale-110">
                    <Quote className="h-6 w-6 text-[#F34D1B]/50" />
                  </div>

                  <div className="relative">
                    {/* Rating */}
                    <div className="flex gap-0.5 mb-5">
                      {Array.from({ length: testimonial.rating }).map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-[#F34D1B] text-[#F34D1B]" />
                      ))}
                    </div>

                    {/* Content */}
                    <p className="text-zinc-300 leading-relaxed mb-6 text-[15px]">
                      «{testimonial.text}»
                    </p>

                    {/* Author */}
                    <div className="flex items-center gap-3 pt-5 border-t border-white/[0.05]">
                      <div className="w-10 h-10 rounded-full overflow-hidden flex items-center justify-center">
                        <img
                          src={testimonial.image}
                          alt={testimonial.name}
                          className="w-full h-full object-cover transition-all duration-500"
                          style={testimonial.image.includes('monogramm') ? {
                            transform: 'scaleX(1.75) scaleY(1.81) translateY(1px)'
                          } as React.CSSProperties : undefined}
                        />
                      </div>
                      <div>
                        <div className="font-medium text-white text-sm group-hover:text-[#F34D1B] transition-colors">
                          {testimonial.name}
                        </div>
                        <div className="text-xs text-zinc-500">
                          {testimonial.role}, {testimonial.company}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Case Studies */}
        <section className="relative py-20 lg:py-24 overflow-hidden">
          <div className="absolute inset-0 bg-[#0B0F18]" />
          
          {/* Subtle grid pattern */}
          <div 
            className="absolute inset-0 opacity-[0.015]"
            style={{
              backgroundImage: `linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)`,
              backgroundSize: '80px 80px'
            }}
          />
          
          <div className="container mx-auto px-6 lg:px-8 relative z-10">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 text-sm font-medium bg-white/[0.04] rounded-xl border border-white/[0.06]">
                <Sparkles className="w-4 h-4 text-[#F34D1B]" />
                <span className="text-zinc-300">Реальные результаты</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
                <span className="text-white">Кейсы </span>
                <span className="bg-gradient-to-r from-[#F34D1B] via-orange-400 to-[#F34D1B] bg-clip-text text-transparent">
                  наших проектов
                </span>
              </h2>
              <p className="text-lg text-zinc-400 font-light">
                Как мы решаем сложные логистические задачи
              </p>
            </div>

            <div className="space-y-6 max-w-5xl mx-auto">
              {caseStudies.map((caseStudy, index) => (
                <div
                  key={index}
                  className="group rounded-2xl bg-white/[0.02] border border-white/[0.05] hover:border-[#F34D1B]/20 transition-all duration-500 overflow-hidden animate-fade-in"
                  style={{ animationDelay: `${index * 0.15}s` }}
                >
                  {/* Header */}
                  <div className={`p-6 lg:p-8 bg-gradient-to-r ${caseStudy.gradient} relative overflow-hidden`}>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                    
                    <div className="relative flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                      <div>
                        <div className="text-white/70 text-sm mb-2 font-medium">{caseStudy.client}</div>
                        <h3 className="text-2xl lg:text-3xl font-bold text-white tracking-tight">
                          {caseStudy.title}
                        </h3>
                      </div>
                      
                      {/* Metrics */}
                      <div className="flex gap-3">
                        {caseStudy.metrics.map((metric, idx) => (
                          <div 
                            key={idx} 
                            className="text-center px-4 py-3 rounded-xl bg-white/10 backdrop-blur-sm min-w-[70px]"
                          >
                            <div className="text-xl lg:text-2xl font-bold text-white">{metric.value}</div>
                            <div className="text-xs text-white/70">{metric.label}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 lg:p-8">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
                      {/* Challenge */}
                      <div>
                        <div className="flex items-center gap-2 mb-3">
                          <div className="w-2 h-2 rounded-full bg-red-500" />
                          <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Задача</span>
                        </div>
                        <p className="text-zinc-300 text-sm leading-relaxed">{caseStudy.challenge}</p>
                      </div>
                      
                      {/* Solution */}
                      <div>
                        <div className="flex items-center gap-2 mb-3">
                          <div className="w-2 h-2 rounded-full bg-amber-500" />
                          <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Решение</span>
                        </div>
                        <p className="text-zinc-300 text-sm leading-relaxed">{caseStudy.solution}</p>
                      </div>
                      
                      {/* Result */}
                      <div>
                        <div className="flex items-center gap-2 mb-3">
                          <div className="w-2 h-2 rounded-full bg-emerald-500" />
                          <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Результат</span>
                        </div>
                        <p className="text-white text-sm leading-relaxed font-medium">{caseStudy.result}</p>
                      </div>
                    </div>

                    {/* Transport modes */}
                    <div className="flex items-center gap-3 mt-6 pt-6 border-t border-white/[0.05]">
                      <span className="text-xs text-zinc-500 uppercase tracking-wider">Транспорт:</span>
                      <div className="flex gap-2">
                        {caseStudy.transports.map((Transport, idx) => (
                          <div 
                            key={idx}
                            className="w-8 h-8 rounded-lg bg-white/[0.04] border border-white/[0.06] flex items-center justify-center group-hover:border-[#F34D1B]/20 transition-colors"
                          >
                            <Transport className="w-4 h-4 text-zinc-400 group-hover:text-[#F34D1B] transition-colors" strokeWidth={1.5} />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="relative py-20 lg:py-28 overflow-hidden">
          <div className="absolute inset-0 bg-[url('/nightport.jpg')] bg-cover bg-center bg-fixed" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0B0F18] via-[#0B0F18]/95 to-[#0B0F18]/90" />

          <div className="container mx-auto px-6 lg:px-8 relative z-10">
            <div className="max-w-4xl mx-auto">
              <CTABlock
                icon={CheckCircle2}
                title={
                  <>
                    <span className="text-white">Станьте нашим </span>
                    <span className="bg-gradient-to-r from-[#F34D1B] via-orange-400 to-[#F34D1B] bg-clip-text text-transparent">
                      клиентом
                    </span>
                  </>
                }
                subtitle="Присоединяйтесь к 500+ компаниям, которые уже доверяют нам свою логистику"
                buttons={[
                  {
                    text: "Получить предложение",
                    variant: "primary",
                  },
                ]}
              />
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Reviews;
