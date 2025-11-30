import { Target, Users, Award, TrendingUp, Globe, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import SEO from "@/components/SEO";
import { organizationSchema } from "@/lib/schema";
import { useApplicationModal } from "@/contexts/ApplicationModalContext";

const About = () => {
  const { openApplicationModal } = useApplicationModal();

  const values = [
    {
      icon: Target,
      title: "Надёжность",
      description: "Гарантируем сохранность груза и выполнение обязательств в срок",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: TrendingUp,
      title: "Скорость",
      description: "Оптимизированные маршруты и быстрая обработка заявок",
      color: "from-accent to-orange-500",
    },
    {
      icon: Users,
      title: "Прозрачность",
      description: "Полная отчётность и контроль на каждом этапе доставки",
      color: "from-emerald-500 to-teal-500",
    },
    {
      icon: Award,
      title: "Ответственность",
      description: "Профессиональный подход и индивидуальные решения",
      color: "from-violet-500 to-purple-500",
    },
  ];

  return (
    <>
      <SEO
        title="О компании"
        description="Armax Logistics — международная логистическая компания с 15+ летним опытом. 20+ стран партнёров, надёжная сеть перевозок, 99% своевременных доставок."
        keywords="о компании, Armax Logistics, история компании, логистическая компания, опыт перевозок"
        canonicalUrl="/about"
        structuredData={organizationSchema}
      />
      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="relative py-24 lg:py-32 bg-primary overflow-hidden">
          {/* Background effects */}
          <div className="absolute inset-0 bg-[url('/images/tlk.png')] bg-cover bg-center opacity-30" />
          <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/95 to-primary/80" />
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-accent/20 rounded-full blur-[128px]" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-[128px]" />
          
          <div className="container mx-auto px-6 lg:px-8 relative z-10">
            <div className="max-w-4xl">
              <span className="inline-block px-4 py-1.5 mb-8 text-sm font-medium text-accent bg-accent/20 rounded-full border border-accent/30 backdrop-blur-sm animate-fade-in">
                О компании
              </span>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-8 animate-fade-in leading-[1.05] tracking-tight">
                Надёжный партнёр и
                <br />
                <span className="text-accent">оператор полного цикла</span>
              </h1>
              <p className="text-xl lg:text-2xl text-white/80 font-light animate-fade-in leading-relaxed max-w-3xl" style={{ animationDelay: '0.15s' }}>
                Мы предоставляем полный спектр логистических услуг: международные грузоперевозки всеми видами транспорта, мультимодальные решения, таможенное оформление, экспедирование, консолидацию грузов и полное сопровождение импорта.
              </p>
            </div>
          </div>
        </section>

        {/* Story Section - Bento Grid */}
        <section className="py-20 lg:py-20 bg-secondary/30">
          <div className="container mx-auto px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
              {/* Main story card */}
              <div className="lg:col-span-2 lg:row-span-2 relative rounded-3xl overflow-hidden group">
                <div className="absolute inset-0 bg-[url('/images/tlk.png')] bg-cover bg-center" style={{ backgroundPosition: '85% center' }} />
                <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/80 to-primary/40" />
                <div className="relative h-full min-h-[500px] p-10 lg:p-14 flex flex-col justify-end">
                  <span className="inline-block w-fit px-3 py-1 mb-6 text-xs font-medium text-accent bg-accent/20 rounded-full">
                    Наш фокус
                  </span>
                  <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-white mb-6 tracking-tight">
                    Импорт из Азии и поставки через турецкий транзит
                  </h2>
                  <p className="text-white/80 text-lg leading-relaxed max-w-xl">
                    Наш основной фокус — импорт из стран азиатского региона, а также поставки из Турции и европейских стран через турецкий транзит. Благодаря собственной сети агентов и глубокому знанию региональной специфики мы выстраиваем оптимальные маршруты и помогаем клиентам сокращать сроки и издержки.
                  </p>
                </div>
              </div>

              {/* Approach card */}
              <div className="rounded-3xl bg-gradient-to-br from-accent to-accent-hover p-8 lg:p-10 flex flex-col justify-between min-h-[240px]">
                <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center">
                  <Users className="h-6 w-6 text-white" strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white mb-3">Личный менеджер</h3>
                  <p className="text-white/80">
                    Контролирует движение груза, решает вопросы в режиме реального времени и обеспечивает полную прозрачность
                  </p>
                </div>
              </div>

              {/* Experience card */}
              <div className="rounded-3xl bg-gradient-to-br from-primary to-primary-dark p-8 lg:p-10 flex flex-col justify-between min-h-[240px]">
                <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center">
                  <Award className="h-6 w-6 text-white" strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white mb-3">15 лет опыта</h3>
                  <p className="text-white/70">
                    Репутация партнёра, который берёт на себя ответственность и гарантирует результат
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Detailed Description Section */}
        <section className="py-20 lg:py-20 bg-background">
          <div className="container mx-auto px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
                <div className="space-y-6">
                  <div className="inline-flex items-center gap-2 px-4 py-1.5 text-sm font-medium text-accent bg-accent/10 rounded-full border border-accent/20">
                    <Target className="h-4 w-4" />
                    Как мы работаем
                  </div>
                  <h2 className="text-3xl lg:text-4xl font-bold text-foreground tracking-tight">
                    Сложные маршруты — наша специализация
                  </h2>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    Работаем со сложными маршрутами и документами, обеспечивая клиентам прозрачность, скорость и стабильный результат на каждом этапе цепочки поставок.
                  </p>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    Мы оперативно закрываем нестандартные ситуации, не допускаем задержек и предлагаем клиентам честные, фиксированные и понятные условия.
                  </p>
                </div>
                <div className="space-y-6">
                  <div className="inline-flex items-center gap-2 px-4 py-1.5 text-sm font-medium text-accent bg-accent/10 rounded-full border border-accent/20">
                    <Globe className="h-4 w-4" />
                    Наши клиенты
                  </div>
                  <h2 className="text-3xl lg:text-4xl font-bold text-foreground tracking-tight">
                    Для тех, кому нужна надёжность
                  </h2>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    Armax Logistics сотрудничает с производителями, дистрибьюторами, крупными торговыми сетями и промышленными компаниями, которым нужна надёжная международная логистика без сбоев.
                  </p>
                  <p className="text-lg text-muted-foreground leading-relaxed font-medium text-foreground">
                    Armax Logistics — это сочетание опыта, технологии и гибкости. Мы строим логистику, которая работает как единый, предсказуемый и эффективный механизм.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-20 lg:py-20 bg-secondary/30">
          <div className="container mx-auto px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="inline-block px-4 py-1.5 mb-6 text-sm font-medium text-accent bg-accent/10 rounded-full border border-accent/20">
                Принципы работы
              </span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 tracking-tight">
                Наши ценности
              </h2>
              <p className="text-lg text-muted-foreground font-light leading-relaxed">
                То, что определяет наш подход к работе
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
              {values.map((value, index) => (
                <div
                  key={index}
                  className="group relative p-8 lg:p-10 rounded-3xl bg-card border border-border/50 hover:border-accent/30 transition-all duration-500 hover:shadow-large hover:-translate-y-2 animate-fade-in cursor-default overflow-hidden"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {/* Gradient background on hover */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${value.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
                  
                  <div className={`relative mb-6 inline-flex p-4 rounded-2xl bg-gradient-to-br ${value.color} text-white`}>
                    <value.icon className="h-8 w-8" strokeWidth={1.5} />
                  </div>
                  <h3 className="relative text-xl lg:text-2xl font-bold text-foreground mb-3 group-hover:text-accent transition-colors">
                    {value.title}
                  </h3>
                  <p className="relative text-muted-foreground group-hover:text-foreground transition-colors">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 lg:py-20 bg-background">
          <div className="container mx-auto px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="relative p-12 lg:p-16 rounded-3xl bg-gradient-to-br from-primary via-primary to-primary-dark overflow-hidden">
                {/* Decorative elements */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-accent/20 rounded-full blur-[100px]" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/10 rounded-full blur-[100px]" />
                
                <div className="relative text-center">
                  <h2 className="text-4xl md:text-5xl font-bold text-accent mb-6 tracking-tight">
                    Готовы к сотрудничеству?
                  </h2>
                  <p className="text-xl text-white/80 font-light mb-10 max-w-2xl mx-auto">
                    Расскажите о вашей задаче — мы предложим оптимальное решение
                  </p>
                  <Button
                    size="lg"
                    className="bg-accent hover:bg-accent-hover text-white text-lg px-10 py-7 h-auto group"
                    onClick={openApplicationModal}
                  >
                    Связаться с нами
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

export default About;
