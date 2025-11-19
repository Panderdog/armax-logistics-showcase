import { Package, Ship, Truck, Globe, CheckCircle2, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import SEO from "@/components/SEO";
import { organizationSchema } from "@/lib/schema";
import { Button } from "@/components/ui/button";

const Geography = () => {
  const asianCountries = [
    { name: "Китай", emphasis: true },
    { name: "Вьетнам", emphasis: false },
    { name: "Южная Корея", emphasis: false },
    { name: "Индонезия", emphasis: false },
    { name: "Таиланд", emphasis: false },
    { name: "Малайзия", emphasis: false },
    { name: "Индия", emphasis: false },
    { name: "Япония", emphasis: false },
  ];

  const routes = [
    {
      from: "Китай",
      to: "Россия",
      modes: ["Авто", "ЖД", "Море", "Авиа"],
      description: "Основное направление с оптимизированными сроками доставки",
    },
    {
      from: "Индия",
      to: "Россия",
      modes: ["Море", "Авиа", "ЖД"],
      description: "Мультимодальные перевозки из крупнейшего промышленного региона Южной Азии",
    },
    {
      from: "Вьетнам / Корея",
      to: "Россия",
      modes: ["Море", "Авиа"],
      description: "Морские и авиаперевозки из промышленных центров Юго-Восточной Азии",
    },
    {
      from: "Европа",
      to: "Россия",
      modes: ["Море", "Авто"],
      description: "Комбинированные перевозки через Турцию",
    },
  ];

  const advantages = [
    {
      title: "Прямые контракты с перевозчиками",
      description: "Работаем напрямую с проверенными азиатскими партнёрами без посредников",
    },
    {
      title: "Оптимальные сроки",
      description: "Отработанные маршруты и отлаженная логистика сокращают время доставки",
    },
    {
      title: "Таможенное оформление",
      description: "Полное сопровождение грузов на всех этапах, включая таможенную очистку",
    },
    {
      title: "Мультимодальные решения",
      description: "Комбинируем виды транспорта для достижения лучшего соотношения цена/скорость",
    },
  ];

  return (
    <>
      <SEO
        title="География перевозок из Азии и Китая"
        description="Armax Logistics специализируется на перевозках из Азии: Китай, Вьетнам, Южная Корея, Индонезия. Надёжная логистика с оптимальными сроками доставки. Также работаем с Европой через турецких партнёров."
        keywords="перевозки из Китая, логистика из Азии, доставка из Вьетнама, перевозки из Кореи, грузоперевозки Азия Россия, международная логистика"
        canonicalUrl="/geography"
        structuredData={organizationSchema}
      />
      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="relative py-24 lg:py-32 bg-gradient-to-br from-primary via-primary to-primary-dark text-primary-foreground">
          <div className="container mx-auto px-6 lg:px-8">
            <div className="max-w-4xl">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8 animate-fade-in leading-[1.1] text-balance">
                География наших перевозок
              </h1>
              <p className="text-xl md:text-2xl lg:text-3xl text-primary-foreground/85 font-light animate-fade-in leading-relaxed mb-8" style={{ animationDelay: '0.15s' }}>
                Надёжные логистические решения для поставок из Азии
              </p>
              <p className="text-lg md:text-xl text-primary-foreground/75 font-light animate-fade-in leading-relaxed" style={{ animationDelay: '0.3s' }}>
                Специализируемся на перевозках из Китая и других стран Азиатско-Тихоокеанского региона с оптимальными сроками и прозрачным ценообразованием
              </p>
            </div>
          </div>
        </section>

        {/* Main Focus - Asia Section */}
        <section className="py-24 lg:py-32 bg-gradient-to-b from-secondary/50 via-secondary/30 to-background">
          <div className="container mx-auto px-6 lg:px-8">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 text-balance">
                  Азия — наше основное направление
                </h2>
                <p className="text-lg md:text-xl text-muted-foreground font-light leading-relaxed max-w-3xl mx-auto">
                  Мы специализируемся на организации грузоперевозок из стран Азии, 
                  предоставляя комплексные логистические решения для вашего бизнеса
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
                {/* China Focus */}
                <div className="group p-10 lg:p-12 rounded-3xl bg-gradient-to-br from-accent/10 via-accent/5 to-background border-2 border-accent/30 hover:border-accent/50 transition-all duration-500 ease-out hover:shadow-large hover:-translate-y-2 animate-fade-in">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="p-4 rounded-2xl bg-accent/10 group-hover:bg-accent/20 transition-colors duration-300">
                      <Globe className="h-10 w-10 text-accent" strokeWidth={1.5} />
                    </div>
                    <h3 className="text-3xl lg:text-4xl font-bold text-foreground tracking-tight">
                      Китай
                    </h3>
                  </div>
                  <p className="text-muted-foreground text-base leading-relaxed mb-6">
                    Китай — ключевое направление нашей деятельности. Мы работаем со всеми крупными промышленными регионами КНР, 
                    обеспечивая надёжную доставку грузов любой сложности.
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 text-foreground/80">
                      <CheckCircle2 className="h-5 w-5 text-accent flex-shrink-0" strokeWidth={2} />
                      <span className="text-[15px]">Прямые контакты с китайскими поставщиками</span>
                    </div>
                    <div className="flex items-center gap-3 text-foreground/80">
                      <CheckCircle2 className="h-5 w-5 text-accent flex-shrink-0" strokeWidth={2} />
                      <span className="text-[15px]">Консолидация грузов на складах в Китае</span>
                    </div>
                    <div className="flex items-center gap-3 text-foreground/80">
                      <CheckCircle2 className="h-5 w-5 text-accent flex-shrink-0" strokeWidth={2} />
                      <span className="text-[15px]">Все виды транспорта: авто, ЖД, море, авиа</span>
                    </div>
                  </div>
                </div>

                {/* Other Asian Countries */}
                <div className="group p-10 lg:p-12 rounded-3xl bg-card border border-border/50 hover:border-accent/30 transition-all duration-500 ease-out hover:shadow-large hover:-translate-y-2 animate-fade-in" style={{ animationDelay: '0.1s' }}>
                  <div className="flex items-center gap-4 mb-6">
                    <div className="p-4 rounded-2xl bg-accent/10 group-hover:bg-accent/20 transition-colors duration-300">
                      <Package className="h-10 w-10 text-accent" strokeWidth={1.5} />
                    </div>
                    <h3 className="text-3xl lg:text-4xl font-bold text-foreground tracking-tight">
                      Другие страны Азии
                    </h3>
                  </div>
                  <p className="text-muted-foreground text-base leading-relaxed mb-6">
                    Помимо Китая, мы организуем перевозки из ключевых промышленных центров Азии
                  </p>
                  <div className="grid grid-cols-2 gap-3">
                    {asianCountries.filter(c => !c.emphasis).map((country, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-foreground/80 text-[15px]">
                        <div className="h-2 w-2 rounded-full bg-accent/60 flex-shrink-0" />
                        {country.name}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Route Schema */}
              <div className="p-10 lg:p-12 rounded-3xl bg-gradient-to-br from-secondary/50 to-background border border-border/50 animate-fade-in" style={{ animationDelay: '0.2s' }}>
                <h3 className="text-2xl lg:text-3xl font-bold text-foreground mb-8 text-center">
                  Основные логистические маршруты
                </h3>
                <div className="space-y-6">
                  {routes.map((route, index) => (
                    <div
                      key={index}
                      className="group flex flex-col md:flex-row md:items-center gap-6 p-6 rounded-2xl bg-background/50 border border-border/30 hover:border-accent/30 transition-all duration-300 hover:shadow-md"
                    >
                      <div className="flex items-center gap-4 flex-1">
                        <div className="text-center">
                          <div className="text-lg lg:text-xl font-bold text-foreground whitespace-nowrap">
                            {route.from}
                          </div>
                        </div>
                        <ArrowRight className="h-6 w-6 text-accent flex-shrink-0 group-hover:translate-x-1 transition-transform duration-300" strokeWidth={2} />
                        <div className="text-center">
                          <div className="text-lg lg:text-xl font-bold text-foreground whitespace-nowrap">
                            {route.to}
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {route.modes.map((mode, idx) => (
                          <div key={idx} className="px-4 py-2 rounded-lg bg-accent/10 text-accent text-sm font-semibold border border-accent/20">
                            {mode}
                          </div>
                        ))}
                      </div>
                      <div className="flex-1 md:text-right">
                        <p className="text-muted-foreground text-sm">{route.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Advantages Section */}
        <section className="py-24 lg:py-32">
          <div className="container mx-auto px-6 lg:px-8">
            <div className="text-center mb-16 max-w-3xl mx-auto">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 text-balance">
                Преимущества логистики из Азии с нами
              </h2>
              <p className="text-lg md:text-xl text-muted-foreground font-light leading-relaxed">
                Многолетний опыт работы с азиатскими партнёрами и глубокое понимание специфики региона
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10 max-w-6xl mx-auto">
              {advantages.map((advantage, index) => (
                <div
                  key={index}
                  className="group p-8 lg:p-10 rounded-2xl bg-card border border-border/50 hover:border-accent/30 transition-all duration-500 ease-out hover:shadow-large hover:-translate-y-2 animate-fade-in cursor-default"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-xl bg-accent/10 group-hover:bg-accent/20 transition-colors duration-300 flex-shrink-0">
                      <CheckCircle2 className="h-7 w-7 text-accent" strokeWidth={2} />
                    </div>
                    <div>
                      <h3 className="text-xl lg:text-2xl font-bold text-foreground mb-3 group-hover:text-accent transition-colors duration-300">
                        {advantage.title}
                      </h3>
                      <p className="text-muted-foreground group-hover:text-foreground text-[15px] leading-relaxed transition-colors duration-300">
                        {advantage.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Europe Through Turkey Section */}
        <section className="py-24 lg:py-32 bg-gradient-to-b from-secondary/30 to-background">
          <div className="container mx-auto px-6 lg:px-8">
            <div className="max-w-5xl mx-auto">
              <div className="p-10 lg:p-12 rounded-3xl bg-card border border-border/50 animate-fade-in">
                <div className="flex flex-col lg:flex-row gap-8 items-center">
                  <div className="flex-shrink-0">
                    <div className="p-6 rounded-2xl bg-accent/10">
                      <Ship className="h-16 w-16 text-accent" strokeWidth={1.5} />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
                      Европа через партнёров в Турции
                    </h2>
                    <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                      Благодаря сотрудничеству с надёжными турецкими логистическими компаниями, 
                      мы также организуем доставку грузов из стран Европы.
                    </p>
                    <p className="text-base text-muted-foreground leading-relaxed">
                      Наши партнёры в Турции обеспечивают качественное сопровождение грузов, 
                      что позволяет нам предлагать конкурентные условия для европейских направлений.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 lg:py-32">
          <div className="container mx-auto px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <div className="p-12 lg:p-16 rounded-3xl bg-gradient-to-br from-primary via-primary to-primary-dark text-primary-foreground animate-fade-in">
                <h2 className="text-4xl md:text-5xl font-bold mb-6 text-balance">
                  Готовы организовать вашу перевозку?
                </h2>
                <p className="text-xl md:text-2xl text-primary-foreground/85 font-light mb-10 leading-relaxed">
                  Свяжитесь с нами для расчёта стоимости доставки и консультации по оптимальному маршруту
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button 
                    asChild 
                    size="lg" 
                    className="bg-white text-primary hover:bg-white/90 font-semibold text-lg px-8 py-6 h-auto"
                  >
                    <Link to="/contacts">Рассчитать доставку</Link>
                  </Button>
                  <Button 
                    asChild 
                    size="lg" 
                    variant="outline"
                    className="border-2 border-white text-white hover:bg-white hover:text-primary font-semibold text-lg px-8 py-6 h-auto"
                  >
                    <Link to="/contacts">Связаться с нами</Link>
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

export default Geography;
