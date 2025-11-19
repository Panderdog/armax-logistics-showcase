import { Shield, Clock, Users, HeadphonesIcon } from "lucide-react";

const BenefitsSection = () => {
  const benefits = [
    {
      icon: Shield,
      title: "Страхование грузов",
      description: "Полная защита и безопасность при транспортировке",
    },
    {
      icon: Clock,
      title: "Доставка точно в срок",
      description: "99% доставок осуществляются в назначенное время",
    },
    {
      icon: Users,
      title: "Проверенные партнёры",
      description: "Сотрудничаем только с надёжными перевозчиками",
    },
    {
      icon: HeadphonesIcon,
      title: "Персональный менеджер",
      description: "Постоянная поддержка и контроль на всех этапах доставки",
    },
  ];

  return (
    <section className="py-24 lg:py-32 bg-gradient-to-b from-background via-secondary/30 to-background">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="text-center mb-20 max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 text-balance">
            Почему выбирают нас
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground font-light leading-relaxed">
            Профессиональный подход к каждой доставке
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="group p-8 lg:p-10 rounded-2xl bg-card border border-border/50 hover:border-accent/30 transition-all duration-500 ease-out hover:shadow-large hover:-translate-y-2 hover:scale-[1.02] animate-fade-in cursor-default"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="mb-8 inline-flex p-5 rounded-2xl bg-accent/5 text-accent group-hover:bg-accent group-hover:text-white transition-all duration-500 ease-out group-hover:scale-110">
                <benefit.icon className="h-9 w-9 group-hover:scale-110 transition-transform duration-300" strokeWidth={1.5} />
              </div>
              <h3 className="text-xl lg:text-2xl font-bold text-foreground group-hover:text-accent mb-4 tracking-tight transition-colors duration-300">
                {benefit.title}
              </h3>
              <p className="text-muted-foreground group-hover:text-foreground leading-relaxed text-[15px] transition-colors duration-300">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
