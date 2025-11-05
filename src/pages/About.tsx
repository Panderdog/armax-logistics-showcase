import { Target, Users, Award, TrendingUp } from "lucide-react";

const About = () => {
  const values = [
    {
      icon: Target,
      title: "Надёжность",
      description: "Мы гарантируем сохранность вашего груза и выполнение обязательств в срок",
    },
    {
      icon: TrendingUp,
      title: "Скорость",
      description: "Оптимизированные маршруты и быстрая обработка заявок для экономии вашего времени",
    },
    {
      icon: Users,
      title: "Прозрачность",
      description: "Полная отчётность на каждом этапе и онлайн-мониторинг грузов",
    },
    {
      icon: Award,
      title: "Ответственность",
      description: "Профессиональный подход к каждому клиенту и индивидуальные решения",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 animate-fade-in">
              О компании Armax Logistics
            </h1>
            <p className="text-xl text-primary-foreground/90 animate-fade-in" style={{ animationDelay: '0.2s' }}>
              Ваш надёжный партнёр в международной логистике
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                Наша история
              </h2>
              <p className="text-lg text-muted-foreground">
                Armax Logistics — это международная логистическая компания с 10-летним опытом работы на рынке грузоперевозок.
              </p>
              <p className="text-muted-foreground">
                Мы начинали как небольшая транспортная компания и выросли в полноценного международного оператора, предоставляющего комплексные логистические решения для бизнеса любого масштаба.
              </p>
              <p className="text-muted-foreground">
                За годы работы мы построили надёжную сеть партнёров в более чем 20 странах Европы и Азии, собрали команду профессионалов и внедрили современные технологии для контроля качества услуг.
              </p>
            </div>
            <div className="relative">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=2070"
                  alt="О компании"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
            {[
              { value: "20+", label: "стран партнёров" },
              { value: "10", label: "лет на рынке" },
              { value: "99%", label: "своевременных доставок" },
              { value: "5000+", label: "тонн грузов ежегодно" },
            ].map((stat, index) => (
              <div
                key={index}
                className="text-center p-6 rounded-xl bg-secondary border border-border"
              >
                <div className="text-4xl font-bold text-primary mb-2">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Mission */}
          <div className="max-w-3xl mx-auto text-center mb-20">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Наша миссия
            </h2>
            <p className="text-lg text-muted-foreground">
              Сделать международную логистику простой, прозрачной и эффективной. Мы стремимся стать надёжным партнёром для каждого клиента, обеспечивая безупречное качество услуг и индивидуальный подход к решению любых логистических задач.
            </p>
          </div>

          {/* Values */}
          <div>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Наши ценности
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Принципы, которыми мы руководствуемся в работе
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <div
                  key={index}
                  className="p-8 rounded-xl bg-card border border-border hover:border-primary transition-all duration-300 hover:shadow-lg"
                >
                  <div className="mb-6 inline-flex p-4 rounded-lg bg-primary/10 text-primary">
                    <value.icon className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">
                    {value.title}
                  </h3>
                  <p className="text-muted-foreground">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
