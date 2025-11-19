import { Target, Users, Award, TrendingUp } from "lucide-react";
import SEO from "@/components/SEO";
import { organizationSchema } from "@/lib/schema";

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
    <>
      <SEO
        title="О компании"
        description="Armax Logistics — международная логистическая компания с 15+ летним опытом. 20+ стран партнёров, надёжная сеть перевозок, 99% своевременных доставок. Наша история, миссия и ценности."
        keywords="о компании, Armax Logistics, история компании, логистическая компания, опыт перевозок, надёжность, миссия, ценности"
        canonicalUrl="/about"
        structuredData={organizationSchema}
      />
      <div className="min-h-screen">
        {/* Hero Section */}
      <section className="relative py-24 lg:py-32 bg-gradient-to-br from-primary via-primary to-primary-dark text-primary-foreground">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="max-w-4xl">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8 animate-fade-in leading-[1.1] text-balance">
              О компании Armax Logistics
            </h1>
            <p className="text-xl md:text-2xl lg:text-3xl text-primary-foreground/85 font-light animate-fade-in leading-relaxed" style={{ animationDelay: '0.15s' }}>
              Ваш надёжный партнёр в международной логистике
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-24 lg:py-32">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center mb-32">
            <div className="space-y-8 animate-fade-in">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-[1.1] text-balance">
                Наша история
              </h2>
              <p className="text-lg md:text-xl text-muted-foreground font-light leading-relaxed">
                Armax Logistics — это международная логистическая компания с 15+-летним опытом работы на рынке грузоперевозок.
              </p>
              <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                Мы начинали как небольшая транспортная компания и выросли в полноценного международного оператора, предоставляющего комплексные логистические решения для бизнеса любого масштаба.
              </p>
              <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                За годы работы мы построили надёжную сеть партнёров в более чем 20 странах Европы и Азии, собрали команду профессионалов и внедрили современные технологии для контроля качества услуг.
              </p>
              <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                Наш офис расположен непосредственно в здании Парголовского таможенного поста, что позволяет нам оперативно решать вопросы с таможней и обеспечивать быстрое прохождение таможенных процедур для грузов наших клиентов.
              </p>
            </div>
            <div className="relative animate-fade-in group cursor-pointer" style={{ animationDelay: '0.2s' }}>
              <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-large group-hover:shadow-glow transition-all duration-500 group-hover:scale-[1.02]">
                <img
                  src="/images/tlk.png"
                  alt="Парголовский таможенный и логистический комплекс"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                  style={{ objectPosition: '85% center' }}
                />
              </div>
              {/* Decorative gradient blur */}
              <div className="absolute -bottom-8 -right-8 w-56 h-56 bg-gradient-to-br from-accent/10 to-accent/5 rounded-3xl -z-10 blur-2xl" />
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8 mb-32">
            {[
              { value: "20+", label: "стран партнёров" },
              { value: "15+", label: "лет на рынке" },
              { value: "99%", label: "своевременных доставок" },
              { value: "5000+", label: "тонн грузов ежегодно" },
            ].map((stat, index) => (
              <div
                key={index}
                className="group text-center p-8 lg:p-10 rounded-2xl bg-gradient-to-br from-secondary/50 to-background border border-border/50 hover:border-accent/30 transition-all duration-500 ease-out hover:shadow-large hover:scale-105 hover:-translate-y-2 animate-fade-in cursor-default"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="text-4xl md:text-5xl font-bold text-foreground group-hover:text-accent group-hover:scale-110 mb-3 tracking-tight transition-all duration-300">{stat.value}</div>
                <div className="text-sm md:text-base text-muted-foreground group-hover:text-foreground font-medium transition-colors duration-300">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Mission */}
          <div className="max-w-4xl mx-auto text-center mb-32 animate-fade-in">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-8 leading-[1.1] text-balance">
              Наша миссия
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground font-light leading-relaxed">
              Сделать международную логистику простой, прозрачной и эффективной. Мы стремимся стать надёжным партнёром для каждого клиента, обеспечивая безупречное качество услуг и индивидуальный подход к решению любых логистических задач.
            </p>
          </div>

          {/* Values */}
          <div>
            <div className="text-center mb-20 max-w-3xl mx-auto">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 text-balance">
                Наши ценности
              </h2>
              <p className="text-lg md:text-xl text-muted-foreground font-light leading-relaxed">
                Принципы, которыми мы руководствуемся в работе
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
              {values.map((value, index) => (
                <div
                  key={index}
                  className="group p-8 lg:p-10 rounded-2xl bg-card border border-border/50 hover:border-accent/30 transition-all duration-500 ease-out hover:shadow-large hover:-translate-y-2 hover:scale-[1.02] animate-fade-in cursor-default"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="mb-8 inline-flex p-5 rounded-2xl bg-accent/5 text-accent group-hover:bg-accent group-hover:text-white transition-all duration-500 ease-out group-hover:scale-110">
                    <value.icon className="h-9 w-9 group-hover:scale-110 transition-transform duration-300" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-xl lg:text-2xl font-bold text-foreground group-hover:text-accent mb-4 tracking-tight transition-colors duration-300">
                    {value.title}
                  </h3>
                  <p className="text-muted-foreground group-hover:text-foreground leading-relaxed text-[15px] transition-colors duration-300">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      </div>
    </>
  );
};

export default About;
