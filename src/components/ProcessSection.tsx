import { useState } from "react";
import { MessageSquare, Calculator, Truck, CheckCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useApplicationModal } from "@/contexts/ApplicationModalContext";

const steps = [
  {
    id: 1,
    icon: MessageSquare,
    title: "Заявка",
    shortDesc: "Расскажите о грузе",
    description: "Свяжитесь с нами любым удобным способом: форма на сайте, телефон, Telegram, WhatsApp или email. Опишите ваш груз, откуда и куда нужна доставка.",
    time: "5 минут",
    color: "from-blue-500 to-cyan-500",
  },
  {
    id: 2,
    icon: Calculator,
    title: "Расчёт",
    shortDesc: "Получите предложение",
    description: "Рассчитаем оптимальный маршрут и стоимость. Подберём транспорт под ваши задачи. Предложим несколько вариантов на выбор.",
    time: "от 1 до 3 дней",
    color: "from-accent to-orange-500",
  },
  {
    id: 3,
    icon: Truck,
    title: "Доставка",
    shortDesc: "Отправляем груз",
    description: "Организуем забор груза, транспортировку и таможенное оформление. Контролируем каждый этап. Вы знаете статус доставки в реальном времени.",
    time: "от 3 дней",
    color: "from-emerald-500 to-teal-500",
  },
  {
    id: 4,
    icon: CheckCircle,
    title: "Получение",
    shortDesc: "Груз у вас",
    description: "Доставляем груз точно в срок. Предоставляем полный пакет документов.",
    time: "по договору",
    color: "from-violet-500 to-purple-500",
  },
];

const ProcessSection = () => {
  const [activeStep, setActiveStep] = useState(1);
  const { openApplicationModal } = useApplicationModal();
  const currentStep = steps.find((s) => s.id === activeStep) || steps[0];

  return (
    <section className="py-20 lg:py-20 bg-background relative overflow-hidden">
      {/* Subtle background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,hsl(var(--accent)/0.05),transparent)]" />
      
      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        {/* Section header */}
        <div className="text-center max-w-3xl mx-auto mb-16 lg:mb-20">
          <span className="inline-block px-4 py-1.5 mb-6 text-sm font-medium text-accent bg-accent/10 rounded-full border border-accent/20">
            Простой процесс
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 tracking-tight">
            Как мы работаем
          </h2>
          <p className="text-lg text-muted-foreground font-light leading-relaxed">
            4 шага от заявки до получения груза. Быстро, понятно, прозрачно.
          </p>
        </div>

        {/* Process visualization */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center max-w-6xl mx-auto">
          {/* Left side - Steps navigation */}
          <div className="space-y-4">
            {steps.map((step) => (
              <button
                key={step.id}
                onClick={() => setActiveStep(step.id)}
                className={`w-full text-left p-6 rounded-2xl border transition-all duration-500 group ${
                  activeStep === step.id
                    ? "bg-card border-accent/30 shadow-large"
                    : "bg-transparent border-border/50 hover:border-border hover:bg-card/50"
                }`}
              >
                <div className="flex items-center gap-5">
                  {/* Step number with gradient */}
                  <div
                    className={`relative flex-shrink-0 w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-500 ${
                      activeStep === step.id
                        ? `bg-gradient-to-br ${step.color} shadow-medium`
                        : "bg-secondary"
                    }`}
                  >
                    <step.icon
                      className={`h-6 w-6 transition-colors ${
                        activeStep === step.id ? "text-white" : "text-muted-foreground"
                      }`}
                      strokeWidth={1.5}
                    />
                    {activeStep === step.id && (
                      <div className="absolute inset-0 rounded-2xl bg-white/20 animate-pulse" />
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <span
                        className={`text-sm font-medium ${
                          activeStep === step.id ? "text-accent" : "text-muted-foreground"
                        }`}
                      >
                        Шаг {step.id}
                      </span>
                      <span
                        className={`text-xs px-2 py-1 rounded-full ${
                          activeStep === step.id
                            ? "bg-accent/10 text-accent"
                            : "bg-secondary text-muted-foreground"
                        }`}
                      >
                        {step.time}
                      </span>
                    </div>
                    <h3
                      className={`text-xl font-bold tracking-tight transition-colors ${
                        activeStep === step.id ? "text-foreground" : "text-foreground/70"
                      }`}
                    >
                      {step.title}
                    </h3>
                    <p
                      className={`text-sm mt-1 ${
                        activeStep === step.id ? "text-muted-foreground" : "text-muted-foreground/60"
                      }`}
                    >
                      {step.shortDesc}
                    </p>
                  </div>

                  {/* Arrow */}
                  <ArrowRight
                    className={`h-5 w-5 flex-shrink-0 transition-all duration-300 ${
                      activeStep === step.id
                        ? "text-accent translate-x-1"
                        : "text-muted-foreground/30 group-hover:text-muted-foreground"
                    }`}
                  />
                </div>
              </button>
            ))}
          </div>

          {/* Right side - Active step details */}
          <div className="relative">
            {/* Decorative elements */}
            <div className={`absolute -inset-4 rounded-3xl bg-gradient-to-br ${currentStep.color} opacity-10 blur-3xl`} />
            
            <div className="relative bg-card rounded-3xl border border-border/50 p-8 lg:p-12 shadow-large">
              {/* Large step number */}
              <div className="absolute -top-6 -right-6 w-20 h-20 rounded-2xl bg-gradient-to-br from-accent to-accent-hover flex items-center justify-center shadow-glow">
                <span className="text-3xl font-bold text-white">
                  {currentStep.id.toString().padStart(2, "0")}
                </span>
              </div>

              {/* Icon */}
              <div className={`mb-8 inline-flex p-5 rounded-2xl bg-gradient-to-br ${currentStep.color}`}>
                <currentStep.icon className="h-10 w-10 text-white" strokeWidth={1.5} />
              </div>

              {/* Content */}
              <h3 className="text-3xl lg:text-4xl font-bold text-foreground mb-4 tracking-tight">
                {currentStep.title}
              </h3>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                {currentStep.description}
              </p>

              {/* Time indicator */}
              <div className="flex items-center gap-3 mb-8 p-4 rounded-xl bg-secondary/50">
                <div className={`w-3 h-3 rounded-full bg-gradient-to-br ${currentStep.color} animate-pulse`} />
                <span className="text-sm text-muted-foreground">
                  Среднее время: <strong className="text-foreground">{currentStep.time}</strong>
                </span>
              </div>

              {/* CTA */}
              {activeStep === 1 && (
                <Button size="lg" className="group" onClick={openApplicationModal}>
                  Оставить заявку
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;

