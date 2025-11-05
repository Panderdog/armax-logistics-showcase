import { Truck, Shield, MapPin, Clock } from "lucide-react";

const BenefitsSection = () => {
  const benefits = [
    {
      icon: Truck,
      title: "Собственный автопарк",
      description: "Современные грузовые автомобили с GPS-мониторингом",
    },
    {
      icon: Shield,
      title: "Страхование грузов",
      description: "Полная защита и безопасность при транспортировке",
    },
    {
      icon: MapPin,
      title: "GPS-мониторинг",
      description: "Отслеживайте ваш груз в режиме реального времени",
    },
    {
      icon: Clock,
      title: "Доставка точно в срок",
      description: "99% доставок осуществляются в назначенное время",
    },
  ];

  return (
    <section className="py-20 bg-secondary">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Почему выбирают нас
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Профессиональный подход к каждой доставке
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="group p-8 rounded-xl bg-card border border-border hover:border-primary transition-all duration-300 hover:shadow-lg hover:-translate-y-1 animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="mb-6 inline-flex p-4 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                <benefit.icon className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">
                {benefit.title}
              </h3>
              <p className="text-muted-foreground">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
