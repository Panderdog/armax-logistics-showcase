import { useState } from "react";
import { ChevronDown, HelpCircle, Phone, MessageCircle, ArrowRight, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import SEO from "@/components/SEO";
import { organizationSchema } from "@/lib/schema";
import { useApplicationModal } from "@/contexts/ApplicationModalContext";

interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const { openApplicationModal } = useApplicationModal();

  const categories = [
    { id: "all", name: "Все вопросы" },
    { id: "delivery", name: "Доставка" },
    { id: "customs", name: "Таможня" },
    { id: "payment", name: "Оплата" },
    { id: "cargo", name: "Грузы" },
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

  return (
    <>
      <SEO
        title="Часто задаваемые вопросы (FAQ)"
        description="Ответы на популярные вопросы о международных перевозках, таможенном оформлении, сроках доставки, страховании грузов."
        keywords="FAQ, часто задаваемые вопросы, стоимость перевозки, таможенное оформление"
        canonicalUrl="/faq"
        structuredData={organizationSchema}
      />
      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="relative py-24 lg:py-32 bg-primary overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary to-primary-dark" />
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-[128px]" />
          <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[128px]" />
          
          <div className="container mx-auto px-6 lg:px-8 relative z-10">
            <div className="max-w-4xl">
              <span className="inline-block px-4 py-1.5 mb-8 text-sm font-medium text-accent bg-accent/20 rounded-full border border-accent/30 backdrop-blur-sm animate-fade-in">
                <HelpCircle className="inline h-4 w-4 mr-1" />
                FAQ
              </span>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-8 animate-fade-in leading-[1.05] tracking-tight">
                Частые вопросы
                <br />
                <span className="text-accent">и ответы</span>
              </h1>
              <p className="text-xl lg:text-2xl text-white/80 font-light animate-fade-in leading-relaxed max-w-2xl" style={{ animationDelay: '0.15s' }}>
                Всё, что нужно знать о работе с нами
              </p>
            </div>
          </div>
        </section>

        {/* FAQ Content */}
        <section className="py-20 lg:py-20 bg-background">
          <div className="container mx-auto px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              {/* Search and filters */}
              <div className="mb-12 space-y-6">
                {/* Search */}
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Поиск по вопросам..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 rounded-2xl bg-card border border-border/50 focus:border-accent/50 focus:outline-none focus:ring-2 focus:ring-accent/20 transition-all text-foreground placeholder:text-muted-foreground"
                  />
                </div>

                {/* Category filters */}
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setActiveCategory(category.id)}
                      className={`px-5 py-2.5 rounded-xl font-medium transition-all duration-300 ${
                        activeCategory === category.id
                          ? "bg-accent text-white shadow-medium"
                          : "bg-card border border-border/50 text-muted-foreground hover:border-accent/30 hover:text-foreground"
                      }`}
                    >
                      {category.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* FAQ List */}
              <div className="space-y-4">
                {filteredFaqs.length === 0 ? (
                  <div className="text-center py-12 text-muted-foreground">
                    Вопросы не найдены. Попробуйте изменить поиск или категорию.
                  </div>
                ) : (
                  filteredFaqs.map((faq, index) => (
                    <div
                      key={index}
                      className={`rounded-2xl border transition-all duration-500 overflow-hidden ${
                        openIndex === index
                          ? "border-accent/30 bg-card shadow-large"
                          : "border-border/50 bg-card hover:border-accent/20"
                      }`}
                    >
                      <button
                        onClick={() => setOpenIndex(openIndex === index ? null : index)}
                        className="w-full text-left p-6 lg:p-8 flex items-start gap-4"
                      >
                        <div className={`flex-shrink-0 p-2 rounded-xl transition-colors ${
                          openIndex === index ? "bg-accent text-white" : "bg-accent/10 text-accent"
                        }`}>
                          <HelpCircle className="h-5 w-5" strokeWidth={1.5} />
                        </div>
                        <div className="flex-1">
                          <h3 className={`text-lg lg:text-xl font-semibold transition-colors ${
                            openIndex === index ? "text-accent" : "text-foreground"
                          }`}>
                            {faq.question}
                          </h3>
                        </div>
                        <ChevronDown
                          className={`h-6 w-6 text-muted-foreground transition-transform duration-300 flex-shrink-0 ${
                            openIndex === index ? "rotate-180 text-accent" : ""
                          }`}
                        />
                      </button>
                      
                      <div
                        className={`overflow-hidden transition-all duration-500 ${
                          openIndex === index ? "max-h-96" : "max-h-0"
                        }`}
                      >
                        <div className="px-6 lg:px-8 pb-6 lg:pb-8 pl-[4.5rem] lg:pl-[5.5rem]">
                          <p className="text-muted-foreground leading-relaxed">
                            {faq.answer}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Contact CTA */}
              <div className="mt-16 p-10 lg:p-12 rounded-3xl bg-gradient-to-br from-accent/10 via-accent/5 to-background border border-accent/20 text-center">
                <HelpCircle className="h-12 w-12 text-accent mx-auto mb-6" strokeWidth={1.5} />
                <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4 tracking-tight">
                  Не нашли ответ?
                </h2>
                <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
                  Свяжитесь с нами — ответим на любые вопросы о логистике и доставке
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button asChild size="lg" className="group">
                    <a href="tel:+78126440291">
                      <Phone className="mr-2 h-5 w-5" />
                      +7 (812) 644-02-91
                    </a>
                  </Button>
                  <Button size="lg" variant="outline" className="group" onClick={openApplicationModal}>
                    Написать нам
                    <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Contact */}
        <section className="py-16 bg-secondary/30">
          <div className="container mx-auto px-6 lg:px-8">
            <div className="flex flex-wrap items-center justify-center gap-8 text-center">
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-accent" />
                <a href="tel:+78126440291" className="text-foreground hover:text-accent transition-colors font-medium">
                  +7 (812) 644-02-91
                </a>
              </div>
              <div className="flex items-center gap-3">
                <MessageCircle className="h-5 w-5 text-accent" />
                <a href="https://wa.me/78126440291" target="_blank" rel="noopener noreferrer" className="text-foreground hover:text-accent transition-colors font-medium">
                  WhatsApp
                </a>
              </div>
              <div className="flex items-center gap-3">
                <MessageCircle className="h-5 w-5 text-accent" />
                <a href="https://t.me/armaxlogistics" target="_blank" rel="noopener noreferrer" className="text-foreground hover:text-accent transition-colors font-medium">
                  Telegram
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default FAQ;
