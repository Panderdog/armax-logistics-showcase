import { Globe, Ship, Truck, Plane, Train, CheckCircle2, ArrowRight, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import SEO from "@/components/SEO";
import { organizationSchema } from "@/lib/schema";
import { Button } from "@/components/ui/button";
import LogisticsMap from "@/components/LogisticsMap";
import { useApplicationModal } from "@/contexts/ApplicationModalContext";

const Geography = () => {
  const { openApplicationModal } = useApplicationModal();

  const routes = [
    {
      from: "Китай",
      to: "Россия",
      modes: [
        { name: "Море", icon: Ship, time: "25-35 дней" },
        { name: "ЖД", icon: Train, time: "18-22 дня" },
        { name: "Авто", icon: Truck, time: "12-16 дней" },
        { name: "Авиа", icon: Plane, time: "3-5 дней" },
      ],
      description: "Основное направление с оптимизированными сроками",
      color: "from-red-500 to-orange-500",
    },
    {
      from: "Индия",
      to: "Россия",
      modes: [
        { name: "Море", icon: Ship, time: "30-40 дней" },
        { name: "Авиа", icon: Plane, time: "4-6 дней" },
      ],
      description: "Мультимодальные перевозки из Южной Азии",
      color: "from-orange-500 to-amber-500",
    },
    {
      from: "Вьетнам / Корея",
      to: "Россия",
      modes: [
        { name: "Море", icon: Ship, time: "28-35 дней" },
        { name: "Авиа", icon: Plane, time: "4-5 дней" },
      ],
      description: "Из промышленных центров Юго-Восточной Азии",
      color: "from-emerald-500 to-teal-500",
    },
    {
      from: "Европа",
      to: "Россия",
      modes: [
        { name: "Море", icon: Ship, time: "20-30 дней" },
        { name: "Авто", icon: Truck, time: "8-12 дней" },
      ],
      description: "Комбинированные перевозки через Турцию",
      color: "from-blue-500 to-indigo-500",
    },
  ];

  const countries = [
    { name: "Китай", flag: "🇨🇳", highlight: true },
    { name: "Вьетнам", flag: "🇻🇳", highlight: false },
    { name: "Южная Корея", flag: "🇰🇷", highlight: false },
    { name: "Индия", flag: "🇮🇳", highlight: false },
    { name: "Индонезия", flag: "🇮🇩", highlight: false },
    { name: "Таиланд", flag: "🇹🇭", highlight: false },
    { name: "Малайзия", flag: "🇲🇾", highlight: false },
    { name: "Япония", flag: "🇯🇵", highlight: false },
    { name: "Турция", flag: "🇹🇷", highlight: false },
    { name: "Германия", flag: "🇩🇪", highlight: false },
    { name: "Италия", flag: "🇮🇹", highlight: false },
    { name: "Нидерланды", flag: "🇳🇱", highlight: false },
  ];

  const advantages = [
    {
      title: "Прямые контракты",
      description: "Работаем напрямую с азиатскими партнёрами без посредников",
      icon: CheckCircle2,
    },
    {
      title: "Оптимальные сроки",
      description: "Отработанные маршруты сокращают время доставки",
      icon: CheckCircle2,
    },
    {
      title: "Полное сопровождение",
      description: "Таможня, документы, доставка до двери",
      icon: CheckCircle2,
    },
    {
      title: "Гибкие решения",
      description: "Комбинируем транспорт для лучшего соотношения цена/скорость",
      icon: CheckCircle2,
    },
  ];

  return (
    <>
      <SEO
        title="География перевозок"
        description="Armax Logistics специализируется на перевозках из Азии: Китай, Вьетнам, Южная Корея. Надёжная логистика с оптимальными сроками."
        keywords="перевозки из Китая, логистика из Азии, доставка из Вьетнама, перевозки из Кореи"
        canonicalUrl="/geography"
        structuredData={organizationSchema}
      />
      <div className="min-h-screen bg-[#0B0F18]">
        {/* Hero Section */}
        <section className="relative py-24 lg:py-32 overflow-hidden">
          {/* Background effects */}
          <div className="absolute inset-0 bg-[url('/nightport.jpg')] bg-cover bg-center opacity-30" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0B0F18] via-[#0B0F18]/80 to-transparent" />
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#F34D1B]/15 rounded-full blur-[150px]" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#F34D1B]/10 rounded-full blur-[150px]" />
          
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
              <div className="inline-flex items-center gap-2 px-4 py-2 mb-8 text-sm font-medium bg-white/[0.04] backdrop-blur-sm rounded-xl border border-white/[0.06] animate-fade-in">
                <MapPin className="w-4 h-4 text-[#F34D1B]" />
                <span className="text-zinc-300">География</span>
              </div>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-8 animate-fade-in leading-[1.05] tracking-tight">
                Международная география
                <br />
                <span className="bg-gradient-to-r from-[#F34D1B] via-orange-400 to-[#F34D1B] bg-clip-text text-transparent">поставок</span>
              </h1>
              <p className="text-xl lg:text-2xl text-zinc-400 font-light animate-fade-in leading-relaxed max-w-2xl" style={{ animationDelay: '0.15s' }}>
                Организуем поставки из Азии, Европы, Турции и других регионов. Все виды транспорта, оптимальные маршруты.
              </p>
            </div>
          </div>
        </section>

        {/* Interactive Map */}
        <section className="py-16 lg:py-20 bg-gradient-to-b from-background to-secondary/30">
          <div className="container mx-auto px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="inline-block px-4 py-1.5 mb-6 text-sm font-medium text-accent bg-accent/10 rounded-full border border-accent/20">
                Интерактивная карта
              </span>
              <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4 tracking-tight">
                Наши маршруты
              </h2>
              <p className="text-lg text-muted-foreground font-light max-w-2xl mx-auto">
                Исследуйте логистические маршруты из Азии и Европы
              </p>
            </div>
            <LogisticsMap />
          </div>
        </section>

        {/* Countries Grid */}
        <section className="py-20 lg:py-20 bg-background">
          <div className="container mx-auto px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="inline-block px-4 py-1.5 mb-6 text-sm font-medium text-accent bg-accent/10 rounded-full border border-accent/20">
                20+ стран
              </span>
              <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6 tracking-tight">
                Откуда доставляем
              </h2>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 lg:gap-6 max-w-6xl mx-auto">
              {countries.map((country, index) => (
                <div
                  key={index}
                  className={`group p-6 rounded-2xl text-center transition-all duration-500 cursor-default ${
                    country.highlight
                      ? "bg-gradient-to-br from-accent to-accent-hover text-white shadow-glow"
                      : "bg-card border border-border/50 hover:border-accent/30 hover:shadow-large hover:-translate-y-1"
                  }`}
                >
                  <div className="text-4xl mb-3">{country.flag}</div>
                  <div className={`font-semibold ${country.highlight ? "text-white" : "text-foreground group-hover:text-accent transition-colors"}`}>
                    {country.name}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Routes Section */}
        <section className="py-20 lg:py-20 bg-secondary/30">
          <div className="container mx-auto px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="inline-block px-4 py-1.5 mb-6 text-sm font-medium text-accent bg-accent/10 rounded-full border border-accent/20">
                Маршруты
              </span>
              <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6 tracking-tight">
                Основные направления
              </h2>
              <p className="text-lg text-muted-foreground font-light">
                Выберите оптимальный вид транспорта под ваши задачи
              </p>
            </div>

            <div className="space-y-6 max-w-5xl mx-auto">
              {routes.map((route, index) => (
                <div
                  key={index}
                  className="group p-8 lg:p-10 rounded-3xl bg-card border border-border/50 hover:border-accent/30 transition-all duration-500 hover:shadow-large"
                >
                  <div className="flex flex-col lg:flex-row lg:items-center gap-6 lg:gap-10">
                    {/* Route info */}
                    <div className="flex items-center gap-4 lg:min-w-[200px]">
                      <div className={`p-3 rounded-xl bg-gradient-to-br ${route.color}`}>
                        <Globe className="h-6 w-6 text-white" strokeWidth={1.5} />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 text-xl font-bold text-foreground">
                          {route.from}
                          <ArrowRight className="h-5 w-5 text-accent" />
                          {route.to}
                        </div>
                        <div className="text-sm text-muted-foreground">{route.description}</div>
                      </div>
                    </div>

                    {/* Transport modes */}
                    <div className="flex flex-wrap gap-3 lg:flex-1">
                      {route.modes.map((mode, idx) => (
                        <div
                          key={idx}
                          className="flex items-center gap-3 px-5 py-3 rounded-xl bg-secondary/50 hover:bg-secondary transition-colors"
                        >
                          <mode.icon className="h-5 w-5 text-accent" strokeWidth={1.5} />
                          <div>
                            <div className="font-medium text-foreground">{mode.name}</div>
                            <div className="text-xs text-muted-foreground">{mode.time}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* China Focus */}
        <section className="py-20 lg:py-20 bg-background">
          <div className="container mx-auto px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center max-w-6xl mx-auto">
              {/* Content */}
              <div>
                <span className="inline-block px-4 py-1.5 mb-6 text-sm font-medium text-accent bg-accent/10 rounded-full border border-accent/20">
                  🇨🇳 Ключевое направление
                </span>
                <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6 tracking-tight">
                  Китай — наша специализация
                </h2>
                <p className="text-lg text-muted-foreground font-light mb-8 leading-relaxed">
                  Работаем со всеми крупными промышленными регионами КНР. Прямые контакты с китайскими поставщиками, консолидация грузов на складах в Китае, все виды транспорта.
                </p>
                
                <div className="space-y-4 mb-8">
                  {advantages.map((item, index) => (
                    <div key={index} className="flex items-start gap-4 group">
                      <div className="p-2 rounded-lg bg-accent/10 text-accent group-hover:bg-accent group-hover:text-white transition-colors">
                        <item.icon className="h-5 w-5" strokeWidth={2} />
                      </div>
                      <div>
                        <div className="font-semibold text-foreground group-hover:text-accent transition-colors">
                          {item.title}
                        </div>
                        <div className="text-sm text-muted-foreground">{item.description}</div>
                      </div>
                    </div>
                  ))}
                </div>

                <Button size="lg" className="group" onClick={openApplicationModal}>
                  Рассчитать доставку из Китая
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-6">
                {[
                  { value: "25+", label: "городов КНР", desc: "работаем напрямую" },
                  { value: "15", label: "дней", desc: "среднее время ЖД" },
                  { value: "1000+", label: "контейнеров", desc: "в год из Китая" },
                  { value: "24/7", label: "поддержка", desc: "на русском языке" },
                ].map((stat, index) => (
                  <div
                    key={index}
                    className="group p-8 rounded-2xl bg-card border border-border/50 hover:border-accent/30 transition-all duration-500 hover:shadow-large hover:-translate-y-1 text-center"
                  >
                    <div className="text-4xl font-bold text-accent mb-2 group-hover:scale-110 transition-transform">
                      {stat.value}
                    </div>
                    <div className="font-semibold text-foreground mb-1">{stat.label}</div>
                    <div className="text-sm text-muted-foreground">{stat.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 lg:py-20 bg-primary relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('/nightport.jpg')] bg-cover bg-center opacity-30" />
          <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/95 to-primary/80" />
          <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-[128px]" />
          
          <div className="container mx-auto px-6 lg:px-8 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight">
                Нужна доставка из Азии?
              </h2>
              <p className="text-xl text-white/80 font-light mb-10">
                Рассчитаем стоимость и предложим оптимальный маршрут за 30 минут
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  className="bg-white text-primary hover:bg-white/90 text-lg px-10 py-7 h-auto group shadow-glow"
                  onClick={openApplicationModal}
                >
                  Рассчитать доставку
                  <ArrowRight className="ml-3 h-6 w-6 transition-transform group-hover:translate-x-2" />
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="border-2 border-white/30 text-white hover:bg-white hover:text-primary text-lg px-10 py-7 h-auto"
                >
                  <a href="tel:+78126440291">
                    Позвонить
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Geography;
