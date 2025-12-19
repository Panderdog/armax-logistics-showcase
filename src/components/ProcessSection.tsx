import { useState } from "react";
import { MessageSquare, Calculator, Truck, CheckCircle, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useApplicationModal } from "@/contexts/ApplicationModalContext";

// Unified design tokens
const RADIUS = "rounded-2xl"; // 16px
const RADIUS_SM = "rounded-xl"; // 12px

const steps = [
  {
    id: 1,
    icon: MessageSquare,
    title: "Заявка",
    shortDesc: "Расскажите о грузе",
    description: "Свяжитесь с нами любым удобным способом: форма на сайте, телефон, Telegram, WhatsApp или email. Опишите ваш груз, откуда и куда нужна доставка.",
    time: "5 минут",
    gradient: "from-[#F34D1B] to-orange-500",
    ctaText: "Оставить заявку",
  },
  {
    id: 2,
    icon: Calculator,
    title: "Расчёт",
    shortDesc: "Получите предложение",
    description: "Рассчитаем оптимальный маршрут и стоимость. Подберём транспорт под ваши задачи. Предложим несколько вариантов на выбор.",
    time: "от 1 до 3 дней",
    gradient: "from-orange-500 to-[#F34D1B]",
    ctaText: "Запросить расчёт",
  },
  {
    id: 3,
    icon: Truck,
    title: "Доставка",
    shortDesc: "Отправляем груз",
    description: "Организуем забор груза, транспортировку и таможенное оформление. Контролируем каждый этап. Вы знаете статус доставки в реальном времени.",
    time: "от 3 дней",
    gradient: "from-[#F34D1B] to-orange-600",
    ctaText: "Организовать отправку",
  },
  {
    id: 4,
    icon: CheckCircle,
    title: "Получение",
    shortDesc: "Груз у вас",
    description: "Доставляем груз точно в срок. Предоставляем полный пакет документов.",
    time: "по договору",
    gradient: "from-orange-500 to-[#F34D1B]",
    ctaText: "Связаться с нами",
  },
];

const ProcessSection = () => {
  const [activeStep, setActiveStep] = useState(1);
  const [isAnimating, setIsAnimating] = useState(false);
  const [displayStep, setDisplayStep] = useState(1);
  const { openApplicationModal } = useApplicationModal();
  const currentStep = steps.find((s) => s.id === displayStep) || steps[0];

  const handleStepChange = (newStep: number) => {
    if (newStep === activeStep || isAnimating) return;
    
    setIsAnimating(true);
    setActiveStep(newStep);
    
    setTimeout(() => {
      setDisplayStep(newStep);
      setTimeout(() => setIsAnimating(false), 250);
    }, 120);
  };

  return (
    <section className="relative py-24 lg:py-32 overflow-hidden">
      {/* Dark premium background */}
      <div className="absolute inset-0 bg-[#0B0F18]" />
      
      {/* Single subtle ambient glow - warm orange */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-gradient-to-r from-[#F34D1B]/[0.03] via-orange-500/[0.015] to-[#F34D1B]/[0.03] rounded-full blur-[150px]" />
      
      {/* Subtle grid pattern */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)`,
          backgroundSize: '80px 80px'
        }}
      />
      
      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        {/* Section header */}
        <div className="text-center max-w-3xl mx-auto mb-16 lg:mb-20">
          <div className={`inline-flex items-center gap-2 px-4 py-2 mb-8 text-sm font-medium bg-white/[0.04] backdrop-blur-sm ${RADIUS_SM} border border-white/[0.06]`}>
            <Sparkles className="w-4 h-4 text-[#F34D1B]" />
            <span className="text-zinc-300">
              Простой процесс
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight">
            <span className="text-white">Как мы </span>
            <span className="bg-gradient-to-r from-[#F34D1B] via-orange-400 to-[#F34D1B] bg-clip-text text-transparent">
              работаем
            </span>
          </h2>
          <p className="text-lg lg:text-xl text-zinc-400 font-light leading-relaxed max-w-2xl mx-auto">
            4 шага от заявки до получения груза. Быстро, понятно, прозрачно.
          </p>
        </div>

        {/* Process visualization - equal height columns */}
        <div className="max-w-[1080px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr,minmax(0,360px)] gap-8 lg:gap-20 items-stretch">
            {/* Left side - Steps navigation */}
            <div className="flex flex-col gap-3">
              {steps.map((step) => {
                const isActive = activeStep === step.id;
                
                return (
                  <button
                    key={step.id}
                    onClick={() => handleStepChange(step.id)}
                    className={`w-full text-left p-5 ${RADIUS} border transition-all duration-300 group relative overflow-hidden ${
                      isActive
                        ? "bg-white/[0.04] border-[#F34D1B]/20"
                        : "bg-white/[0.025] border-white/[0.05] hover:bg-white/[0.04] hover:border-white/[0.08]"
                    }`}
                    style={{
                      // Warm orange glow for active - NOT blue
                      boxShadow: isActive 
                        ? '0 0 20px rgba(243,77,27,0.08), 0 0 40px rgba(243,77,27,0.04)' 
                        : 'none'
                    }}
                  >
                    <div className="flex items-center gap-4 relative z-10">
                      {/* Step icon */}
                      <div className="relative flex-shrink-0">
                        <div
                          className={`w-12 h-12 ${RADIUS} flex items-center justify-center transition-all duration-300 ${
                            isActive
                              ? `bg-gradient-to-br ${step.gradient}`
                              : "bg-zinc-800/70"
                          }`}
                          style={{
                            // Soft orange glow for active icon
                            boxShadow: isActive 
                              ? '0 0 8px rgba(243,77,27,0.2), 0 0 16px rgba(243,77,27,0.1)' 
                              : 'none'
                          }}
                        >
                          <step.icon
                            className={`h-5 w-5 transition-all duration-300 ${
                              isActive 
                                ? "text-white" 
                                : "text-zinc-400 group-hover:text-zinc-300"
                            }`}
                            strokeWidth={1.5}
                          />
                        </div>
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <span
                            className={`text-[11px] font-medium uppercase tracking-wider transition-colors duration-300 ${
                              isActive 
                                ? "text-[#F34D1B]" 
                                : "text-zinc-500 group-hover:text-zinc-400"
                            }`}
                          >
                            Шаг {step.id}
                          </span>
                          <span
                            className={`text-[11px] px-2.5 py-1 ${RADIUS_SM} font-medium transition-all duration-300 ${
                              isActive
                                ? "bg-white/[0.06] text-white/60"
                                : "bg-zinc-800/50 text-zinc-500"
                            }`}
                          >
                            {step.time}
                          </span>
                        </div>
                        <h3
                          className={`text-base font-semibold tracking-tight transition-colors duration-300 ${
                            isActive ? "text-white" : "text-zinc-300 group-hover:text-white"
                          }`}
                        >
                          {step.title}
                        </h3>
                        <p
                          className={`text-sm mt-0.5 transition-colors duration-300 ${
                            isActive ? "text-zinc-400" : "text-zinc-500 group-hover:text-zinc-400"
                          }`}
                        >
                          {step.shortDesc}
                        </p>
                      </div>

                      {/* Arrow - visible hover */}
                      <div className={`flex-shrink-0 w-8 h-8 ${RADIUS_SM} flex items-center justify-center transition-all duration-300 ${
                        isActive
                          ? "bg-white/[0.06]"
                          : "bg-white/[0.03] group-hover:bg-[#F34D1B]/10"
                      }`}>
                        <ArrowRight
                          className={`h-4 w-4 transition-all duration-300 ${
                            isActive
                              ? "text-white/80 translate-x-0.5"
                              : "text-zinc-500 group-hover:text-[#F34D1B] group-hover:translate-x-0.5"
                          }`}
                        />
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Right side - Active step details - stretches to match left column */}
            <div className="relative flex flex-col">
              {/* Main card - fills height */}
              <div className={`relative ${RADIUS} border border-white/[0.03] overflow-hidden flex-1 flex flex-col`}>
                
                {/* Card content - distributed vertically, reduced top padding */}
                <div className="relative bg-white/[0.02] pt-5 lg:pt-6 pb-7 lg:pb-8 px-7 lg:px-8 flex-1 flex flex-col justify-center">
                  {/* Header with icon and step number */}
                  <div className={`flex items-center gap-4 mb-6 transition-all duration-400 ease-out ${
                    isAnimating ? 'opacity-0 translate-y-2 scale-95' : 'opacity-100 translate-y-0 scale-100'
                  }`}>
                    {/* Step number - on the left, bolder */}
                    <span className="text-lg font-bold text-white/30">
                      {currentStep.id.toString().padStart(2, "0")}
                    </span>
                    
                    {/* Icon with soft glow */}
                    <div 
                      className={`relative inline-flex p-3 ${RADIUS} bg-gradient-to-br ${currentStep.gradient}`}
                      style={{
                        boxShadow: '0 0 8px rgba(243,77,27,0.15), 0 0 16px rgba(243,77,27,0.08)'
                      }}
                    >
                      <currentStep.icon className="h-5 w-5 text-white" strokeWidth={1.5} />
                    </div>
                  </div>

                  {/* Content with fade + slide animation */}
                  <div className={`transition-all duration-400 ease-out ${
                    isAnimating ? 'opacity-0 translate-y-3' : 'opacity-100 translate-y-0'
                  }`}>
                    <h3 className="text-xl lg:text-2xl font-bold text-white mb-4 tracking-tight leading-tight">
                      {currentStep.title}
                    </h3>
                    <p className="text-sm lg:text-base text-zinc-400 leading-relaxed mb-6">
                      {currentStep.description}
                    </p>

                    {/* Time indicator */}
                    <div className={`flex items-center gap-3 mb-6 p-3.5 ${RADIUS} bg-white/[0.025] border border-white/[0.03]`}>
                      <div className="relative">
                        <div className={`w-2 h-2 rounded-full bg-gradient-to-br ${currentStep.gradient}`} />
                        <div className={`absolute inset-0 w-2 h-2 rounded-full bg-gradient-to-br ${currentStep.gradient} animate-ping opacity-30`} />
                      </div>
                      <span className="text-sm text-zinc-400">
                        Среднее время: <span className="text-white font-medium">{currentStep.time}</span>
                      </span>
                    </div>

                    {/* CTA button - wider */}
                    <Button 
                      size="lg" 
                      className={`group relative overflow-hidden bg-gradient-to-r ${currentStep.gradient} hover:opacity-90 border-0 text-white font-semibold px-7 py-4 text-sm ${RADIUS} transition-all duration-300`}
                      onClick={openApplicationModal}
                    >
                      <span className="relative z-10 flex items-center gap-2">
                        {currentStep.ctaText}
                        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                      </span>
                      <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-600" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Progress indicator - macOS style - moved outside the grid */}
          <div className="hidden lg:flex items-center gap-1.5 pt-8 pl-1 max-w-[calc(100%-360px-5rem)]">
            <div className="flex-1 h-[2px] bg-zinc-800 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-[#F34D1B] to-orange-500 rounded-full transition-all duration-400"
                style={{ width: `${(activeStep / steps.length) * 100}%` }}
              />
            </div>
            <span className="text-xs text-zinc-500 tabular-nums ml-2">
              {activeStep}/{steps.length}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
