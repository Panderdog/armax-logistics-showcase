import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import SEO from "@/components/SEO";
import { organizationSchema } from "@/lib/schema";

const FAQ = () => {
  const faqs = [
    {
      question: "Как рассчитывается стоимость перевозки?",
      answer:
        "Стоимость перевозки зависит от нескольких факторов: расстояние, вес и объём груза, тип груза (обычный, негабаритный, скоропортящийся), срочность доставки, необходимость дополнительных услуг (страхование, таможенное оформление). Для точного расчёта свяжитесь с нами по телефону +7 (812) 644-02-91 или заполните форму на сайте.",
    },
    {
      question: "Какие документы нужны для таможенного оформления?",
      answer:
        "Для таможенного оформления потребуются: инвойс (счёт-фактура), упаковочный лист (packing list), контракт или договор поставки, транспортные документы (CMR, коносамент или AWB), сертификаты соответствия (при необходимости), разрешительные документы для специфических товаров. Наши специалисты помогут подготовить все необходимые документы.",
    },
    {
      question: "Как отследить груз?",
      answer:
        "За каждой доставкой закреплён персональный менеджер, который предоставит актуальную информацию о статусе и местонахождении вашего груза на любом этапе маршрута. Вы можете связаться с ним в любое время по телефону, email или в мессенджерах.",
    },
    {
      question: "Страхуется ли груз?",
      answer:
        "Да, мы предлагаем услуги страхования грузов. Стоимость страхования обычно составляет 0.1-0.3% от стоимости груза в зависимости от типа товара и условий перевозки. Страхование покрывает риски повреждения, утраты или хищения груза во время транспортировки.",
    },
    {
      question: "Какие сроки доставки?",
      answer:
        "Сроки доставки зависят от маршрута. Например: Санкт-Петербург → Германия: 3-4 дня, Москва → Казахстан: 5-6 дней, Европа → Центральная Азия: 10-12 дней. Для срочных отправок доступна услуга экспресс-доставки с сокращёнными сроками.",
    },
    {
      question: "Возможна ли доставка негабаритных грузов?",
      answer:
        "Да, мы специализируемся на перевозке негабаритных и тяжеловесных грузов. У наших партнёров есть специализированная техника для таких перевозок. Мы оформляем все необходимые разрешения и маршрутную документацию. Для расчёта стоимости и сроков доставки негабарита свяжитесь с нашими специалистами.",
    },
    {
      question: "Работаете ли вы с физическими лицами?",
      answer:
        "Да, мы работаем как с юридическими, так и с физическими лицами. Для физических лиц доступны все наши услуги: международные перевозки, таможенное оформление, страхование грузов. Условия сотрудничества обсуждаются индивидуально.",
    },
    {
      question: "Работаете ли вы с проверенными перевозчиками?",
      answer:
        "Да, мы работаем только с надёжными и проверенными партнёрами-перевозчиками, которые имеют весь спектр транспорта для различных типов грузов: тентованные фуры, рефрижераторы для перевозки скоропортящихся грузов, негабаритные тягачи. Все партнёры соответствуют нашим высоким стандартам качества и надёжности перевозок.",
    },
    {
      question: "Какие способы оплаты вы принимаете?",
      answer:
        "Мы принимаем оплату банковским переводом (для юридических лиц), наличными, по картам (для физических лиц). Возможна оплата по факту доставки или предоплата в зависимости от условий договора. Для постоянных клиентов доступна отсрочка платежа.",
    },
    {
      question: "Предоставляете ли вы складские услуги?",
      answer:
        "Да, мы можем организовать временное хранение вашего груза на складах наших партнёров в различных городах Европы и Азии. Доступны как обычные, так и температурные склады. Стоимость хранения рассчитывается индивидуально в зависимости от объёма груза и срока хранения.",
    },
    {
      question: "Что делать, если груз повреждён при доставке?",
      answer:
        "При обнаружении повреждения груза необходимо: немедленно уведомить водителя и составить акт о повреждении с его участием, сфотографировать повреждения, связаться с вашим менеджером. Если груз был застрахован, мы поможем оформить страховое возмещение. В любом случае, мы проведём расследование и примем меры для урегулирования ситуации.",
    },
    {
      question: "Работаете ли вы с опасными грузами?",
      answer:
        "Да, мы имеем все необходимые разрешения и сертификаты для перевозки опасных грузов (ADR). Наши водители прошли специальное обучение, а транспорт соответствует всем требованиям безопасности. Для организации перевозки опасных грузов требуется предоставить паспорт безопасности вещества (MSDS) и соблюдать особые условия упаковки.",
    },
  ];

  return (
    <>
      <SEO
        title="Часто задаваемые вопросы (FAQ)"
        description="Ответы на часто задаваемые вопросы о международных перевозках, таможенном оформлении, сроках доставки, страховании грузов. Полная информация об услугах Armax Logistics."
        keywords="FAQ, часто задаваемые вопросы, как заказать доставку, стоимость перевозки, таможенное оформление, страхование груза, персональный менеджер"
        canonicalUrl="/faq"
        structuredData={organizationSchema}
      />
      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="relative py-24 lg:py-32 bg-gradient-to-br from-primary via-primary to-primary-dark text-primary-foreground">
          <div className="container mx-auto px-6 lg:px-8">
            <div className="max-w-4xl">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8 animate-fade-in leading-[1.1] text-balance">
                Часто задаваемые вопросы
              </h1>
              <p
                className="text-xl md:text-2xl lg:text-3xl text-primary-foreground/85 font-light animate-fade-in leading-relaxed"
                style={{ animationDelay: "0.15s" }}
              >
                Ответы на популярные вопросы о наших услугах
              </p>
            </div>
          </div>
        </section>

        {/* FAQ Content */}
        <section className="py-24 lg:py-32">
          <div className="container mx-auto px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <Accordion type="single" collapsible className="space-y-4">
                {faqs.map((faq, index) => (
                  <AccordionItem
                    key={index}
                    value={`item-${index}`}
                    className="border border-border/50 rounded-2xl px-8 py-2 bg-card hover:border-accent/30 hover:shadow-medium hover:scale-[1.01] transition-all duration-300 ease-out"
                  >
                    <AccordionTrigger className="text-left hover:no-underline py-6 hover:text-accent transition-colors duration-300">
                      <span className="text-lg md:text-xl font-bold text-foreground pr-4">
                        {faq.question}
                      </span>
                    </AccordionTrigger>
                    <AccordionContent className="text-base md:text-lg text-muted-foreground leading-relaxed pb-6">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>

              {/* CTA Section */}
              <div className="mt-16 text-center p-12 rounded-3xl bg-gradient-to-br from-accent/10 to-accent/5 border border-accent/20">
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                  Не нашли ответ на свой вопрос?
                </h2>
                <p className="text-lg text-muted-foreground mb-8">
                  Свяжитесь с нами, и мы с удовольствием ответим на все ваши
                  вопросы
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a
                    href="tel:+78126440291"
                    className="inline-flex items-center justify-center rounded-lg bg-primary text-primary-foreground px-8 py-3 text-base font-medium hover:bg-primary/90 hover:scale-105 hover:-translate-y-0.5 hover:shadow-large transition-all duration-300 ease-out"
                  >
                    Позвонить: +7 (812) 644-02-91
                  </a>
                  <a
                    href="/contacts"
                    className="inline-flex items-center justify-center rounded-lg bg-secondary text-secondary-foreground px-8 py-3 text-base font-medium hover:bg-secondary/70 hover:scale-105 hover:-translate-y-0.5 hover:shadow-medium transition-all duration-300 ease-out"
                  >
                    Написать нам
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default FAQ;

