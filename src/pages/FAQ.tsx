import { useState, useRef, useEffect } from "react";
import { ChevronDown, HelpCircle, Phone, MessageCircle, Search, Sparkles, X, Package, FileText, CreditCard, Truck } from "lucide-react";
import SEO from "@/components/SEO";
import { organizationSchema } from "@/lib/schema";
import CTABlock from "@/components/CTABlock";

interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [visibleItems, setVisibleItems] = useState<Set<number>>(new Set());
  const faqRefs = useRef<(HTMLDivElement | null)[]>([]);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [sectionVisible, setSectionVisible] = useState(false);

  const categories = [
    { id: "all", name: "Все вопросы", icon: HelpCircle },
    { id: "delivery", name: "Доставка", icon: Truck },
    { id: "customs", name: "Таможня", icon: FileText },
    { id: "payment", name: "Оплата", icon: CreditCard },
    { id: "cargo", name: "Грузы", icon: Package },
  ];

  const faqs: FAQItem[] = [
    {
      category: "delivery",
      question: "Как рассчитывается стоимость перевозки?",
      answer: "Стоимость зависит от нескольких факторов: расстояние, вес и объём груза, тип груза (обычный, негабаритный, скоропортящийся), срочность доставки, необходимость дополнительных услуг (страхование, таможенное оформление). Для точного расчёта свяжитесь с нами — менеджер подготовит предложение за 30 минут.",
    },
    {
      category: "delivery",
      question: "Какие сроки доставки из Китая?",
      answer: "Сроки зависят от выбранного транспорта: морем — 25-35 дней, железной дорогой — 18-22 дня, автотранспортом — 12-16 дней, авиа — 3-5 дней. Точные сроки рассчитываются индивидуально с учётом маршрута и особенностей груза.",
    },
    {
      category: "customs",
      question: "Какие документы нужны для таможенного оформления?",
      answer: "Основной пакет: инвойс (счёт-фактура), упаковочный лист (packing list), контракт или договор поставки, транспортные документы (CMR, коносамент или AWB), сертификаты соответствия при необходимости. Наши специалисты помогут подготовить все документы.",
    },
    {
      category: "delivery",
      question: "Как отследить груз?",
      answer: "За каждой доставкой закреплён персональный менеджер, который предоставит актуальную информацию о статусе груза на любом этапе. Связаться можно по телефону, email или в мессенджерах в любое время.",
    },
    {
      category: "cargo",
      question: "Страхуется ли груз?",
      answer: "Да, мы предлагаем страхование грузов. Стоимость обычно составляет 0.1-0.3% от стоимости груза. Страхование покрывает риски повреждения, утраты или хищения груза во время транспортировки.",
    },
    {
      category: "cargo",
      question: "Возможна ли доставка негабаритных грузов?",
      answer: "Да, мы специализируемся на перевозке негабаритных и тяжеловесных грузов. У наших партнёров есть специализированная техника. Оформляем все необходимые разрешения и маршрутную документацию.",
    },
    {
      category: "payment",
      question: "Какие способы оплаты вы принимаете?",
      answer: "Банковский перевод (для юридических лиц), наличные, оплата по картам (для физических лиц). Возможна оплата по факту доставки или предоплата в зависимости от условий. Для постоянных клиентов доступна отсрочка платежа.",
    },
    {
      category: "delivery",
      question: "Работаете ли вы с физическими лицами?",
      answer: "Да, работаем как с юридическими, так и с физическими лицами. Доступны все услуги: международные перевозки, таможенное оформление, страхование. Условия обсуждаются индивидуально.",
    },
    {
      category: "cargo",
      question: "Работаете ли вы с опасными грузами?",
      answer: "Да, имеем все необходимые разрешения и сертификаты для перевозки опасных грузов (ADR). Водители прошли специальное обучение, транспорт соответствует требованиям безопасности.",
    },
    {
      category: "customs",
      question: "Что делать, если груз повреждён при доставке?",
      answer: "Немедленно уведомите водителя и составьте акт о повреждении, сфотографируйте повреждения, свяжитесь с менеджером. Если груз застрахован — поможем оформить страховое возмещение.",
    },
    {
      category: "delivery",
      question: "Предоставляете ли вы складские услуги?",
      answer: "Да, организуем временное хранение груза на складах партнёров в различных городах Европы и Азии. Доступны обычные и температурные склады. Стоимость рассчитывается индивидуально.",
    },
    {
      category: "customs",
      question: "Помогаете ли с сертификацией товаров?",
      answer: "Да, полностью сопровождаем процесс сертификации: консультируем по требованиям, помогаем подготовить документы, взаимодействуем с органами сертификации. Работаем с ЕАС, ГОСТ, СГР и другими.",
    },
  ];

  const filteredFaqs = faqs.filter((faq) => {
    const matchesCategory = activeCategory === "all" || faq.category === activeCategory;
    const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Intersection Observer for section animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setSectionVisible(true);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Intersection Observer for FAQ items
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute('data-index'));
            setVisibleItems((prev) => new Set([...prev, index]));
          }
        });
      },
      { threshold: 0.1, rootMargin: '50px' }
    );

    faqRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, [filteredFaqs]);

  // Reset visible items when filter changes
  useEffect(() => {
    setVisibleItems(new Set());
    setOpenIndex(null);
  }, [activeCategory, searchQuery]);

  const getCategoryIcon = (categoryId: string) => {
    const category = categories.find(c => c.id === categoryId);
    return category?.icon || HelpCircle;
  };

  return (
    <>
      <SEO
        title="Часто задаваемые вопросы (FAQ)"
        description="Ответы на популярные вопросы о международных перевозках, таможенном оформлении, сроках доставки, страховании грузов."
        keywords="FAQ, часто задаваемые вопросы, стоимость перевозки, таможенное оформление"
        canonicalUrl="/faq"
        structuredData={organizationSchema}
      />
      <div className="min-h-screen bg-[#0B0F18]">
        {/* Hero Section */}
        <section className="relative py-24 lg:py-32 overflow-hidden">
          {/* Background effects */}
          <div className="absolute inset-0 bg-[url('/nightport.jpg')] bg-cover bg-center opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0B0F18] via-[#0B0F18]/90 to-[#0B0F18]/70" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0B0F18]" />
          
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
              <div 
                className="inline-flex items-center gap-2 px-4 py-2 mb-8 text-sm font-medium bg-white/[0.04] backdrop-blur-sm rounded-xl border border-white/[0.06]"
                style={{
                  opacity: 0,
                  animation: 'fade-in 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards',
                }}
              >
                <Sparkles className="w-4 h-4 text-[#F34D1B]" />
                <span className="text-zinc-300">Поддержка</span>
              </div>
              
              <h1 
                className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-8 leading-[1.05] tracking-tight"
                style={{
                  opacity: 0,
                  animation: 'fade-in 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.1s forwards',
                }}
              >
                Частые вопросы
                <br />
                <span className="bg-gradient-to-r from-[#F34D1B] via-orange-400 to-[#F34D1B] bg-clip-text text-transparent">и ответы</span>
              </h1>
              
              <p 
                className="text-xl lg:text-2xl text-zinc-400 font-light leading-relaxed max-w-3xl mb-12"
                style={{
                  opacity: 0,
                  animation: 'fade-in 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.2s forwards',
                }}
              >
                Всё, что нужно знать о работе с нами — в одном месте
              </p>

              {/* Stats row */}
              <div 
                className="flex flex-wrap gap-6 lg:gap-12"
                style={{
                  opacity: 0,
                  animation: 'fade-in 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.3s forwards',
                }}
              >
                {[
                  { value: "12", label: "вопросов" },
                  { value: "4", label: "категории" },
                  { value: "24/7", label: "поддержка" },
                ].map((stat, index) => (
                  <div 
                    key={index}
                    className="flex items-center gap-3 px-5 py-3 rounded-2xl bg-white/[0.03] border border-white/[0.06] backdrop-blur-sm"
                  >
                    <span className="text-2xl lg:text-3xl font-bold text-[#F34D1B]">{stat.value}</span>
                    <span className="text-sm text-zinc-400">{stat.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Bottom gradient transition */}
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0a0e15] to-transparent" />
        </section>

        {/* FAQ Content */}
        <section ref={sectionRef} className="relative py-20 lg:py-24 overflow-hidden">
          {/* Background */}
          <div className="absolute inset-0 bg-[#0a0e15]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-gradient-to-r from-[#F34D1B]/[0.02] via-orange-500/[0.01] to-[#F34D1B]/[0.02] rounded-full blur-[150px]" />
          
          <div className="container mx-auto px-6 lg:px-8 relative z-10">
            <div className="max-w-4xl mx-auto">
              {/* Search and filters */}
              <div 
                className={`mb-12 space-y-6 transition-all duration-700 ${
                  sectionVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
              >
                {/* Search */}
                <div className="relative group">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-[#F34D1B]/20 to-orange-500/20 rounded-2xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-500 blur-sm" />
                  <div className="relative">
                    <Search className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-zinc-500 group-focus-within:text-[#F34D1B] transition-colors duration-300" />
                    <input
                      type="text"
                      placeholder="Поиск по вопросам..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-14 pr-12 py-5 rounded-2xl bg-white/[0.03] border border-white/[0.06] focus:border-[#F34D1B]/30 focus:bg-white/[0.05] focus:outline-none focus:ring-2 focus:ring-[#F34D1B]/10 transition-all duration-300 text-white placeholder:text-zinc-500"
                    />
                    {searchQuery && (
                      <button
                        onClick={() => setSearchQuery("")}
                        className="absolute right-5 top-1/2 -translate-y-1/2 p-1 rounded-lg hover:bg-white/[0.1] transition-colors duration-200"
                      >
                        <X className="h-4 w-4 text-zinc-500 hover:text-zinc-300" />
                      </button>
                    )}
                  </div>
                </div>

                {/* Category filters */}
                <div className="flex flex-wrap gap-3">
                  {categories.map((category, index) => {
                    const Icon = category.icon;
                    const isActive = activeCategory === category.id;
                    return (
                      <button
                        key={category.id}
                        onClick={() => setActiveCategory(category.id)}
                        className={`group relative px-5 py-3 rounded-xl font-medium transition-all duration-500 flex items-center gap-2.5 overflow-hidden ${
                          isActive
                            ? "text-white"
                            : "bg-white/[0.03] border border-white/[0.06] text-zinc-400 hover:border-[#F34D1B]/30 hover:text-zinc-200"
                        }`}
                        style={{
                          animationDelay: `${index * 0.05}s`,
                        }}
                      >
                        {/* Active background gradient */}
                        {isActive && (
                          <div className="absolute inset-0 bg-gradient-to-r from-[#F34D1B] to-orange-500" />
                        )}
                        
                        {/* Hover gradient */}
                        {!isActive && (
                          <div className="absolute inset-0 bg-gradient-to-r from-[#F34D1B]/10 to-orange-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        )}
                        
                        <Icon className={`relative z-10 h-4 w-4 transition-transform duration-300 ${isActive ? '' : 'group-hover:scale-110'}`} strokeWidth={1.5} />
                        <span className="relative z-10">{category.name}</span>
                        
                        {/* Active indicator dot */}
                        {isActive && (
                          <span className="relative z-10 w-1.5 h-1.5 rounded-full bg-white/60 ml-1" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* FAQ List */}
              <div className="space-y-4">
                {filteredFaqs.length === 0 ? (
                  <div 
                    className="text-center py-16 px-8 rounded-3xl bg-white/[0.02] border border-white/[0.05]"
                    style={{
                      opacity: 0,
                      animation: 'fade-in 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards',
                    }}
                  >
                    <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-white/[0.05] flex items-center justify-center">
                      <Search className="h-7 w-7 text-zinc-500" strokeWidth={1.5} />
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-2">Вопросы не найдены</h3>
                    <p className="text-zinc-500 max-w-sm mx-auto">
                      Попробуйте изменить поисковый запрос или выбрать другую категорию
                    </p>
                  </div>
                ) : (
                  filteredFaqs.map((faq, index) => {
                    const isOpen = openIndex === index;
                    const isVisible = visibleItems.has(index);
                    const CategoryIcon = getCategoryIcon(faq.category);
                    
                    return (
                      <div
                        key={index}
                        ref={(el) => (faqRefs.current[index] = el)}
                        data-index={index}
                        className={`rounded-2xl border transition-all duration-500 overflow-hidden ${
                          isOpen
                            ? "border-[#F34D1B]/30 bg-white/[0.04]"
                            : "border-white/[0.05] bg-white/[0.02] hover:border-[#F34D1B]/20 hover:bg-white/[0.03]"
                        }`}
                        style={{
                          opacity: isVisible ? 1 : 0,
                          transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                          transition: `all 0.6s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.08}s`,
                          boxShadow: isOpen 
                            ? '0 0 40px rgba(243,77,27,0.08), 0 0 80px rgba(243,77,27,0.04)' 
                            : 'none'
                        }}
                      >
                        <button
                          onClick={() => setOpenIndex(isOpen ? null : index)}
                          className="w-full text-left p-6 lg:p-8 flex items-start gap-4 group"
                        >
                          {/* Icon */}
                          <div className={`relative flex-shrink-0 p-3 rounded-xl transition-all duration-500 ${
                            isOpen 
                              ? "bg-gradient-to-br from-[#F34D1B] to-orange-500" 
                              : "bg-white/[0.05] group-hover:bg-[#F34D1B]/10"
                          }`}>
                            <CategoryIcon 
                              className={`h-5 w-5 transition-all duration-300 ${
                                isOpen ? "text-white" : "text-[#F34D1B]"
                              }`} 
                              strokeWidth={1.5} 
                            />
                            {/* Glow effect when open */}
                            {isOpen && (
                              <div className="absolute inset-0 rounded-xl bg-[#F34D1B]/30 blur-lg -z-10" />
                            )}
                          </div>
                          
                          {/* Content */}
                          <div className="flex-1 min-w-0">
                            <h3 className={`text-lg lg:text-xl font-semibold transition-colors duration-300 leading-snug ${
                              isOpen ? "text-[#F34D1B]" : "text-white group-hover:text-zinc-100"
                            }`}>
                              {faq.question}
                            </h3>
                          </div>
                          
                          {/* Chevron */}
                          <div className={`flex-shrink-0 p-2 rounded-xl transition-all duration-500 ${
                            isOpen 
                              ? "bg-[#F34D1B]/10 rotate-180" 
                              : "bg-white/[0.03] group-hover:bg-white/[0.06]"
                          }`}>
                            <ChevronDown
                              className={`h-5 w-5 transition-colors duration-300 ${
                                isOpen ? "text-[#F34D1B]" : "text-zinc-500 group-hover:text-zinc-300"
                              }`}
                              strokeWidth={1.5}
                            />
                          </div>
                        </button>
                        
                        {/* Answer */}
                        <div
                          className={`grid transition-all duration-500 ease-out ${
                            isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                          }`}
                        >
                          <div className="overflow-hidden">
                            <div className="px-6 lg:px-8 pb-6 lg:pb-8 pl-[5rem] lg:pl-[6rem]">
                              <div className="relative">
                                {/* Decorative line */}
                                <div className="absolute -left-6 top-0 bottom-0 w-px bg-gradient-to-b from-[#F34D1B]/40 via-[#F34D1B]/20 to-transparent" />
                                <p className="text-zinc-400 leading-relaxed text-base lg:text-lg">
                                  {faq.answer}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>

              {/* Contact CTA */}
              <div 
                className="mt-20"
                style={{
                  opacity: sectionVisible ? 1 : 0,
                  transform: sectionVisible ? 'translateY(0)' : 'translateY(30px)',
                  transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.5s'
                }}
              >
                <CTABlock
                  icon={MessageCircle}
                  title={
                    <>
                      <span className="text-white">Не нашли </span>
                      <span className="bg-gradient-to-r from-[#F34D1B] via-orange-400 to-[#F34D1B] bg-clip-text text-transparent">ответ?</span>
                    </>
                  }
                  subtitle="Свяжитесь с нами — ответим на любые вопросы о логистике и доставке"
                  buttons={[
                    {
                      text: "Написать нам",
                      variant: "primary",
                    },
                    {
                      text: "+7 (812) 644-02-91",
                      variant: "secondary",
                      href: "tel:+78126440291",
                      icon: Phone,
                    },
                  ]}
                />
              </div>
            </div>
          </div>
          
          {/* Bottom gradient transition */}
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0B0F18] to-transparent" />
        </section>

      </div>
    </>
  );
};

export default FAQ;
