import { Target, Users, Award, TrendingUp, Building, Globe, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import SEO from "@/components/SEO";
import { organizationSchema } from "@/lib/schema";
import { useEffect, useRef, useState } from "react";

const AnimatedCounter = ({ value, suffix = "", isVisible }: { value: number; suffix?: string; isVisible: boolean }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isVisible) return;
    const duration = 2000;
    const steps = 60;
    const increment = value / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [value, isVisible]);

  return <span className="tabular-nums">{count.toLocaleString()}{suffix}</span>;
};

const About = () => {
  const [statsVisible, setStatsVisible] = useState(false);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStatsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => observer.disconnect();
  }, []);

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
      description: "Полная отчётность и онлайн-мониторинг грузов",
      color: "from-emerald-500 to-teal-500",
    },
    {
      icon: Award,
      title: "Ответственность",
      description: "Профессиональный подход и индивидуальные решения",
      color: "from-violet-500 to-purple-500",
    },
  ];

  const timeline = [
    { year: "2009", event: "Основание компании", description: "Начали с автоперевозок по России" },
    { year: "2012", event: "Выход на международный рынок", description: "Первые контракты с европейскими партнёрами" },
    { year: "2015", event: "Развитие азиатского направления", description: "Открыли представительство в Китае" },
    { year: "2019", event: "Собственное таможенное оформление", description: "Лицензия таможенного брокера" },
    { year: "2024", event: "15 лет успешной работы", description: "Более 500 постоянных клиентов" },
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
          <div className="absolute inset-0 bg-[url('/images/tlk.png')] bg-cover bg-center opacity-10" />
          <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/95 to-primary/80" />
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-accent/20 rounded-full blur-[128px]" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-[128px]" />
          
          <div className="container mx-auto px-6 lg:px-8 relative z-10">
            <div className="max-w-4xl">
              <span className="inline-block px-4 py-1.5 mb-8 text-sm font-medium text-accent bg-accent/20 rounded-full border border-accent/30 backdrop-blur-sm animate-fade-in">
                О компании
              </span>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-8 animate-fade-in leading-[1.05] tracking-tight">
                Armax Logistics —
                <br />
                <span className="text-accent">интеллект в движении</span>
              </h1>
              <p className="text-xl lg:text-2xl text-white/80 font-light animate-fade-in leading-relaxed max-w-2xl" style={{ animationDelay: '0.15s' }}>
                15+ лет строим надёжные логистические маршруты между Азией и Россией
              </p>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section ref={statsRef} className="py-20 lg:py-24 bg-background relative">
          <div className="container mx-auto px-6 lg:px-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
              {[
                { value: 15, suffix: "+", label: "лет опыта", icon: Award },
                { value: 20, suffix: "+", label: "стран партнёров", icon: Globe },
                { value: 5000, suffix: "+", label: "тонн грузов/год", icon: Building },
                { value: 99, suffix: "%", label: "доставок вовремя", icon: Target },
              ].map((stat, index) => (
                <div
                  key={index}
                  className="group relative p-8 lg:p-10 rounded-3xl bg-card border border-border/50 hover:border-accent/30 transition-all duration-500 hover:shadow-large hover:-translate-y-2"
                  style={{
                    opacity: statsVisible ? 1 : 0,
                    transform: statsVisible ? 'translateY(0)' : 'translateY(30px)',
                    transition: `all 0.8s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.1}s`
                  }}
                >
                  <stat.icon className="h-8 w-8 text-accent mb-4 group-hover:scale-110 transition-transform" strokeWidth={1.5} />
                  <div className="text-4xl lg:text-5xl font-bold text-foreground mb-2 tracking-tight group-hover:text-accent transition-colors">
                    <AnimatedCounter value={stat.value} suffix={stat.suffix} isVisible={statsVisible} />
                  </div>
                  <div className="text-muted-foreground font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Story Section - Bento Grid */}
        <section className="py-20 lg:py-28 bg-secondary/30">
          <div className="container mx-auto px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
              {/* Main story card */}
              <div className="lg:col-span-2 lg:row-span-2 relative rounded-3xl overflow-hidden group">
                <div className="absolute inset-0 bg-[url('/images/tlk.png')] bg-cover bg-center" style={{ backgroundPosition: '85% center' }} />
                <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/80 to-primary/40" />
                <div className="relative h-full min-h-[500px] p-10 lg:p-14 flex flex-col justify-end">
                  <span className="inline-block w-fit px-3 py-1 mb-6 text-xs font-medium text-accent bg-accent/20 rounded-full">
                    Наша история
                  </span>
                  <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-white mb-6 tracking-tight">
                    От небольшой транспортной компании до международного оператора
                  </h2>
                  <p className="text-white/80 text-lg leading-relaxed max-w-xl">
                    Мы начинали в 2009 году и за 15 лет построили надёжную сеть партнёров в более чем 20 странах Европы и Азии. Наш офис расположен в здании Парголовского таможенного поста — это позволяет нам оперативно решать вопросы с таможней.
                  </p>
                </div>
              </div>

              {/* Mission card */}
              <div className="rounded-3xl bg-gradient-to-br from-accent to-accent-hover p-8 lg:p-10 flex flex-col justify-between min-h-[240px]">
                <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center">
                  <Target className="h-6 w-6 text-white" strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white mb-3">Наша миссия</h3>
                  <p className="text-white/80">
                    Сделать международную логистику простой, прозрачной и эффективной для каждого клиента
                  </p>
                </div>
              </div>

              {/* Vision card */}
              <div className="rounded-3xl bg-gradient-to-br from-primary to-primary-dark p-8 lg:p-10 flex flex-col justify-between min-h-[240px]">
                <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center">
                  <Globe className="h-6 w-6 text-white" strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white mb-3">Глобальный охват</h3>
                  <p className="text-white/70">
                    Работаем со всеми ключевыми портами Азии и развиваем партнёрскую сеть в Европе
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Timeline Section */}
        <section className="py-20 lg:py-28 bg-background">
          <div className="container mx-auto px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="inline-block px-4 py-1.5 mb-6 text-sm font-medium text-accent bg-accent/10 rounded-full border border-accent/20">
                Наш путь
              </span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 tracking-tight">
                История развития
              </h2>
            </div>

            <div className="max-w-4xl mx-auto">
              <div className="relative">
                {/* Timeline line */}
                <div className="absolute left-8 lg:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-accent via-accent/50 to-border lg:-translate-x-1/2" />

                {timeline.map((item, index) => (
                  <div
                    key={index}
                    className={`relative flex items-start gap-8 mb-12 last:mb-0 ${
                      index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                    }`}
                  >
                    {/* Content */}
                    <div className={`flex-1 ml-20 lg:ml-0 ${index % 2 === 0 ? 'lg:text-right lg:pr-16' : 'lg:pl-16'}`}>
                      <div
                        className="group p-6 lg:p-8 rounded-2xl bg-card border border-border/50 hover:border-accent/30 hover:shadow-large transition-all duration-500 cursor-default"
                        style={{
                          animationDelay: `${index * 0.1}s`
                        }}
                      >
                        <div className="text-accent font-bold text-lg mb-2">{item.year}</div>
                        <h3 className="text-xl lg:text-2xl font-bold text-foreground mb-2 group-hover:text-accent transition-colors">
                          {item.event}
                        </h3>
                        <p className="text-muted-foreground">{item.description}</p>
                      </div>
                    </div>

                    {/* Dot */}
                    <div className="absolute left-8 lg:left-1/2 w-4 h-4 rounded-full bg-accent border-4 border-background -translate-x-1/2 mt-8" />

                    {/* Empty space for alternating layout */}
                    <div className="hidden lg:block flex-1" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-20 lg:py-28 bg-secondary/30">
          <div className="container mx-auto px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="inline-block px-4 py-1.5 mb-6 text-sm font-medium text-accent bg-accent/10 rounded-full border border-accent/20">
                Принципы работы
              </span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 tracking-tight">
                Наши ценности
              </h2>
              <p className="text-lg text-muted-foreground font-light leading-relaxed">
                Принципы, которыми мы руководствуемся в каждой перевозке
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
        <section className="py-20 lg:py-28 bg-background">
          <div className="container mx-auto px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="relative p-12 lg:p-16 rounded-3xl bg-gradient-to-br from-primary via-primary to-primary-dark overflow-hidden">
                {/* Decorative elements */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-accent/20 rounded-full blur-[100px]" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/10 rounded-full blur-[100px]" />
                
                <div className="relative text-center">
                  <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
                    Готовы к сотрудничеству?
                  </h2>
                  <p className="text-xl text-white/80 font-light mb-10 max-w-2xl mx-auto">
                    Расскажите о вашей задаче — мы предложим оптимальное решение
                  </p>
                  <Button
                    asChild
                    size="lg"
                    className="bg-white text-primary hover:bg-white/90 text-lg px-10 py-7 h-auto group"
                  >
                    <Link to="/contacts">
                      Связаться с нами
                      <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                    </Link>
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
