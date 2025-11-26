import { MessageSquare, Calculator, Truck, Eye } from "lucide-react";

const HowWeWorkSection = () => {
  const steps = [
    {
      icon: MessageSquare,
      number: "01",
      title: "Заявка",
      description: "Оставьте заявку на сайте, позвоните нам или напишите в мессенджер",
    },
    {
      icon: Calculator,
      number: "02",
      title: "Расчёт",
      description: "Рассчитаем стоимость и срок доставки за 30 минут",
    },
    {
      icon: Truck,
      number: "03",
      title: "Доставка",
      description: "Организуем перевозку по оптимальному маршруту",
    },
    {
      icon: Eye,
      number: "04",
      title: "Контроль",
      description: "Информируем о статусе доставки через персонального менеджера",
    },
  ];

  return (
    <section className="py-16 lg:py-20 bg-gradient-to-b from-background via-secondary/30 to-background">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="text-center mb-12 max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 text-balance">
            Как мы работаем
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground font-light leading-relaxed">
            Простой и прозрачный процесс от заявки до доставки
          </p>
        </div>

        <div className="relative max-w-6xl mx-auto">
          {/* Connection Line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-accent/20 via-accent/50 to-accent/20 -translate-y-1/2 -z-10" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div
                key={index}
                className="relative group animate-fade-in h-full"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Step Card */}
                <div className="relative p-8 lg:p-10 rounded-2xl bg-card border border-border/50 hover:border-accent/50 transition-all duration-500 ease-out hover:shadow-large hover:-translate-y-2 hover:scale-[1.02] h-full min-h-[320px] flex flex-col cursor-default">
                  {/* Number Badge */}
                  <div className="absolute -top-4 -right-4 w-12 h-12 rounded-full bg-accent flex items-center justify-center text-white font-bold text-sm shadow-medium group-hover:scale-110 group-hover:shadow-glow transition-all duration-300 ease-out">
                    {step.number}
                  </div>

                  {/* Icon */}
                  <div className="mb-6 inline-flex p-5 rounded-2xl bg-accent/10 text-accent group-hover:bg-accent group-hover:text-white transition-all duration-500 ease-out group-hover:scale-110">
                    <step.icon className="h-9 w-9 group-hover:scale-110 transition-transform duration-300" strokeWidth={1.5} />
                  </div>

                  {/* Content */}
                  <div className="flex-1 flex flex-col">
                    <h3 className="text-2xl lg:text-3xl font-bold text-foreground group-hover:text-accent mb-4 tracking-tight transition-colors duration-300">
                      {step.title}
                    </h3>
                    <p className="text-muted-foreground group-hover:text-foreground leading-relaxed text-[15px] transition-colors duration-300">
                      {step.description}
                    </p>
                  </div>
                </div>

                {/* Arrow for larger screens */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-8 -translate-y-1/2 z-10">
                    <div className="w-8 h-8 rotate-45 bg-accent/20 group-hover:bg-accent/50 group-hover:scale-125 transition-all duration-500 ease-out" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowWeWorkSection;

