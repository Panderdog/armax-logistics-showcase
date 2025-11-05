import { MapPin } from "lucide-react";

const Geography = () => {
  const regions = [
    {
      title: "Европа",
      countries: [
        "Германия",
        "Польша",
        "Чехия",
        "Словакия",
        "Австрия",
        "Италия",
        "Франция",
        "Нидерланды",
        "Бельгия",
        "Испания",
      ],
      description: "Регулярные маршруты по всей Европе с оптимальными сроками доставки",
    },
    {
      title: "Азия",
      countries: [
        "Казахстан",
        "Узбекистан",
        "Туркменистан",
        "Киргизия",
        "Таджикистан",
        "Китай",
        "Монголия",
      ],
      description: "Надёжные логистические цепочки в странах Центральной Азии",
    },
    {
      title: "СНГ",
      countries: [
        "Россия",
        "Беларусь",
        "Украина",
        "Молдова",
        "Армения",
        "Азербайджан",
      ],
      description: "Быстрая доставка по территории СНГ с минимальными таможенными формальностями",
    },
  ];

  const routes = [
    {
      from: "Санкт-Петербург",
      to: "Германия",
      duration: "3-4 дня",
      description: "Прямой маршрут через Польшу",
    },
    {
      from: "Москва",
      to: "Казахстан",
      duration: "5-6 дней",
      description: "Регулярные отправки",
    },
    {
      from: "Европа",
      to: "Центральная Азия",
      duration: "10-12 дней",
      description: "Мультимодальные перевозки",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 animate-fade-in">
              География перевозок
            </h1>
            <p className="text-xl text-primary-foreground/90 animate-fade-in" style={{ animationDelay: '0.2s' }}>
              Международная логистическая сеть в 20+ странах
            </p>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <div className="aspect-video rounded-2xl overflow-hidden shadow-2xl bg-card border border-border flex items-center justify-center">
              <div className="text-center p-8">
                <MapPin className="h-16 w-16 text-primary mx-auto mb-4" />
                <p className="text-muted-foreground">
                  Интерактивная карта маршрутов
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Regions */}
      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Регионы присутствия
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Мы осуществляем перевозки по трём ключевым направлениям
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            {regions.map((region, index) => (
              <div
                key={index}
                className="p-8 rounded-xl bg-card border border-border hover:border-primary transition-all duration-300 hover:shadow-lg"
              >
                <h3 className="text-2xl font-bold text-foreground mb-4">
                  {region.title}
                </h3>
                <p className="text-muted-foreground mb-6">{region.description}</p>
                <div className="space-y-2">
                  {region.countries.map((country, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-foreground/80">
                      <div className="h-1.5 w-1.5 rounded-full bg-accent" />
                      {country}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Popular Routes */}
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Популярные маршруты
              </h2>
            </div>
            <div className="space-y-6">
              {routes.map((route, index) => (
                <div
                  key={index}
                  className="p-6 rounded-xl bg-secondary border border-border flex flex-col md:flex-row md:items-center md:justify-between gap-4"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-2">
                      <span className="text-lg font-semibold text-foreground">
                        {route.from}
                      </span>
                      <span className="text-accent">→</span>
                      <span className="text-lg font-semibold text-foreground">
                        {route.to}
                      </span>
                    </div>
                    <p className="text-muted-foreground text-sm">{route.description}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="px-4 py-2 rounded-lg bg-primary/10 text-primary font-semibold">
                      {route.duration}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Geography;
