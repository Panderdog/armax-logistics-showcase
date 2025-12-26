import { useState } from "react";
import { 
  Factory, 
  Smartphone, 
  ShoppingBag, 
  ArrowRight, 
  Clock, 
  TrendingDown,
  Package,
  Zap,
  Ship,
  Plane,
  Train,
  Truck as TruckIcon,
  CheckCircle2,
  Sparkles
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useApplicationModal } from "@/contexts/ApplicationModalContext";

// Unified design tokens
const RADIUS = "rounded-2xl"; // 16px
const RADIUS_SM = "rounded-xl"; // 12px

interface CaseStudy {
  id: number;
  icon: React.ElementType;
  title: string;
  shortTitle: string;
  highlight: string;
  stats: {
    main: string;
    mainLabel: string;
    items: { value: string; label: string }[];
  };
  task: string;
  solution: string[];
  result: string;
  gradient: string;
  transports: React.ElementType[];
}

const cases: CaseStudy[] = [
  {
    id: 1,
    icon: Factory,
    title: "Оптимизация поставки промышленного оборудования из Китая",
    shortTitle: "Промышленное оборудование",
    highlight: "Сократили срок на 12 дней",
    stats: {
      main: "28",
      mainLabel: "дней доставка",
      items: [
        { value: "–12", label: "дней к стандарту" },
        { value: "12 т", label: "масса груза" },
        { value: "30%", label: "экономия времени" },
      ],
    },
    task: "Клиенту требовалась срочная доставка станка ЧПУ весом 12 тонн из Шэньчжэня на производство в Екатеринбурге. Критично было сократить простой — любое опоздание стоило компании значительных затрат.",
    solution: [
      "Автодоставка до порта в Китае",
      "Ускоренный морской фрахт до Владивостока",
      "Оперативная выгрузка и оформление негабарита",
      "Ж/д доставка по экспресс-маршруту до Екатеринбурга",
    ],
    result: "Груз был доставлен за 28 дней вместо стандартных 40. Клиент избежал двухнедельного простоя производства, сохранив план выпуска и снизив сопутствующие расходы.",
    gradient: "from-[#F34D1B] to-orange-500",
    transports: [TruckIcon, Ship, Train],
  },
  {
    id: 2,
    icon: Smartphone,
    title: "Регулярные поставки электроники из Кореи",
    shortTitle: "Электроника из Кореи",
    highlight: "52 рейса в год без сбоев",
    stats: {
      main: "5",
      mainLabel: "дней доставка",
      items: [
        { value: "52", label: "рейса в год" },
        { value: "65%", label: "быстрее" },
        { value: "0", label: "сбоев" },
      ],
    },
    task: "Сеть розничной электроники столкнулась с задержками при поставках смартфонов и комплектующих из Кореи, что приводило к дефициту на складах и потере продаж.",
    solution: [
      "Комбинированная схема авиа + авто через Инчхон и Хабаровск",
      "Фиксированные слоты на рейсах",
      "Буферный склад для оперативной перевалки",
      "Прозрачная отчётность по каждой партии",
    ],
    result: "Сроки доставки сокращены с 14 до 5 дней. Клиент получил стабильный еженедельный поток в 52 поставки в год, исключил риск дефицита и улучшил оборачиваемость товара.",
    gradient: "from-orange-500 to-[#F34D1B]",
    transports: [Plane, TruckIcon],
  },
  {
    id: 3,
    icon: ShoppingBag,
    title: "Поставка комплектующих для e-commerce из Турции",
    shortTitle: "E-commerce из Турции",
    highlight: "–18% логистических затрат",
    stats: {
      main: "8",
      mainLabel: "дней дверь-в-дверь",
      items: [
        { value: "–18%", label: "стоимость" },
        { value: "4", label: "вида транспорта" },
        { value: "100%", label: "в срок" },
      ],
    },
    task: "Крупный интернет-ритейлер столкнулся с ростом стоимости логистики в сезон высокой нагрузки. Требовалось удержать сроки и снизить расходы без потери качества.",
    solution: [
      "Гибкая мультимодальная схема: авто ↔ авиа ↔ консолидация",
      "Оптимизация упаковки и объёмных весов",
      "Перераспределение партий для равномерной загрузки",
      "Ускоренное таможенное оформление",
    ],
    result: "Доставка дверь-в-дверь выполнялась за 8 дней даже в период пикового спроса. Клиент снизил логистические затраты на 18%, сохранил SLA и избежал задержек заказов.",
    gradient: "from-[#F34D1B] to-orange-600",
    transports: [TruckIcon, Plane, Train],
  },
];

const CasesSection = () => {
  const [activeCase, setActiveCase] = useState(1);
  const [isAnimating, setIsAnimating] = useState(false);
  const [displayCase, setDisplayCase] = useState(1);
  const { openApplicationModal } = useApplicationModal();
  const currentCase = cases.find((c) => c.id === displayCase) || cases[0];

  const handleCaseChange = (newCase: number) => {
    if (newCase === activeCase || isAnimating) return;
    
    setIsAnimating(true);
    setActiveCase(newCase);
    
    setTimeout(() => {
      setDisplayCase(newCase);
      setTimeout(() => setIsAnimating(false), 250);
    }, 120);
  };

  return (
    <section className="relative py-24 lg:py-32 overflow-hidden">
      {/* Dark premium background */}
      <div className="absolute inset-0 bg-[#0B0F18]" />
      
      {/* Ambient glow */}
      <div className="absolute top-1/3 right-1/4 w-[600px] h-[400px] bg-gradient-to-l from-[#F34D1B]/[0.04] via-orange-500/[0.02] to-transparent rounded-full blur-[120px]" />
      <div className="absolute bottom-1/4 left-1/4 w-[500px] h-[300px] bg-gradient-to-r from-[#F34D1B]/[0.03] to-transparent rounded-full blur-[100px]" />
      
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
              Реальные результаты
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight">
            <span className="text-white">Кейсы </span>
            <span className="bg-gradient-to-r from-[#F34D1B] via-orange-400 to-[#F34D1B] bg-clip-text text-transparent">
              наших клиентов
            </span>
          </h2>
          <p className="text-lg lg:text-xl text-zinc-400 font-light leading-relaxed max-w-2xl mx-auto">
            Как мы решаем сложные логистические задачи и помогаем бизнесу экономить время и деньги
          </p>
        </div>

        {/* Cases visualization */}
        <div className="max-w-[1200px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,400px),1fr] gap-8 lg:gap-12 items-start">
            {/* Left side - Cases navigation */}
            <div className="flex flex-col gap-3">
              {cases.map((caseItem) => {
                const isActive = activeCase === caseItem.id;
                
                return (
                  <button
                    key={caseItem.id}
                    onClick={() => handleCaseChange(caseItem.id)}
                    className={`w-full text-left p-5 lg:p-6 ${RADIUS} border transition-all duration-300 group relative overflow-hidden ${
                      isActive
                        ? "bg-white/[0.04] border-[#F34D1B]/20"
                        : "bg-white/[0.025] border-white/[0.05] hover:bg-white/[0.04] hover:border-white/[0.08]"
                    }`}
                    style={{
                      boxShadow: isActive 
                        ? '0 0 20px rgba(243,77,27,0.08), 0 0 40px rgba(243,77,27,0.04)' 
                        : 'none'
                    }}
                  >
                    <div className="flex items-start gap-4 relative z-10">
                      {/* Icon */}
                      <div className="relative flex-shrink-0">
                        <div
                          className={`w-12 h-12 ${RADIUS} flex items-center justify-center transition-all duration-300 ${
                            isActive
                              ? `bg-gradient-to-br ${caseItem.gradient}`
                              : "bg-zinc-800/70"
                          }`}
                          style={{
                            boxShadow: isActive 
                              ? '0 0 8px rgba(243,77,27,0.2), 0 0 16px rgba(243,77,27,0.1)' 
                              : 'none'
                          }}
                        >
                          <caseItem.icon
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
                        <div className="flex items-center gap-2 mb-1.5">
                          <span
                            className={`text-[11px] font-medium uppercase tracking-wider transition-colors duration-300 ${
                              isActive 
                                ? "text-[#F34D1B]" 
                                : "text-zinc-500 group-hover:text-zinc-400"
                            }`}
                          >
                            Кейс {caseItem.id}
                          </span>
                        </div>
                        <h3
                          className={`text-base font-semibold tracking-tight transition-colors duration-300 mb-1.5 ${
                            isActive ? "text-white" : "text-zinc-300 group-hover:text-white"
                          }`}
                        >
                          {caseItem.shortTitle}
                        </h3>
                        <div
                          className={`inline-flex items-center gap-1.5 text-sm font-medium transition-colors duration-300 ${
                            isActive ? "text-[#F34D1B]" : "text-zinc-500"
                          }`}
                        >
                          <Zap className="w-3.5 h-3.5" />
                          {caseItem.highlight}
                        </div>
                      </div>

                      {/* Arrow */}
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

            {/* Right side - Active case details */}
            <div className="relative">
              <div className={`relative ${RADIUS} border border-white/[0.03] overflow-hidden bg-white/[0.02]`}>
                <div className="p-6 lg:p-8">
                  {/* Header */}
                  <div className={`transition-all duration-400 ease-out ${
                    isAnimating ? 'opacity-0 translate-y-2' : 'opacity-100 translate-y-0'
                  }`}>
                    {/* Stats grid */}
                    <div className="grid grid-cols-4 gap-4 mb-8">
                      {/* Main stat */}
                      <div className={`col-span-4 sm:col-span-1 p-4 ${RADIUS} bg-gradient-to-br ${currentCase.gradient} relative overflow-hidden`}>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                        <div className="relative">
                          <div className="text-3xl lg:text-4xl font-bold text-white mb-1">
                            {currentCase.stats.main}
                          </div>
                          <div className="text-sm text-white/80 font-medium">
                            {currentCase.stats.mainLabel}
                          </div>
                        </div>
                      </div>
                      
                      {/* Other stats */}
                      {currentCase.stats.items.map((stat, index) => (
                        <div 
                          key={index} 
                          className={`p-4 ${RADIUS} bg-white/[0.03] border border-white/[0.05]`}
                        >
                          <div className="text-xl lg:text-2xl font-bold text-white mb-1">
                            {stat.value}
                          </div>
                          <div className="text-xs text-zinc-500">
                            {stat.label}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Title */}
                    <h3 className="text-xl lg:text-2xl font-bold text-white mb-6 tracking-tight leading-tight">
                      {currentCase.title}
                    </h3>

                    {/* Task */}
                    <div className="mb-6">
                      <div className="flex items-center gap-2 mb-3">
                        <Package className="w-4 h-4 text-[#F34D1B]" />
                        <span className="text-sm font-semibold text-white uppercase tracking-wider">Задача</span>
                      </div>
                      <p className="text-sm lg:text-base text-zinc-400 leading-relaxed">
                        {currentCase.task}
                      </p>
                    </div>

                    {/* Solution */}
                    <div className="mb-6">
                      <div className="flex items-center gap-2 mb-3">
                        <TrendingDown className="w-4 h-4 text-[#F34D1B]" />
                        <span className="text-sm font-semibold text-white uppercase tracking-wider">Решение</span>
                      </div>
                      <div className="space-y-2">
                        {currentCase.solution.map((item, index) => (
                          <div key={index} className="flex items-start gap-3">
                            <CheckCircle2 className="w-4 h-4 text-[#F34D1B] mt-0.5 flex-shrink-0" />
                            <span className="text-sm lg:text-base text-zinc-400">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Transport modes */}
                    <div className="flex items-center gap-2 mb-6">
                      <span className="text-xs text-zinc-500 uppercase tracking-wider mr-2">Транспорт:</span>
                      {currentCase.transports.map((Transport, index) => (
                        <div 
                          key={index}
                          className={`w-8 h-8 ${RADIUS_SM} bg-white/[0.04] border border-white/[0.06] flex items-center justify-center`}
                        >
                          <Transport className="w-4 h-4 text-zinc-400" strokeWidth={1.5} />
                        </div>
                      ))}
                    </div>

                    {/* Result */}
                    <div className={`p-5 ${RADIUS} bg-gradient-to-r from-[#F34D1B]/10 to-orange-500/5 border border-[#F34D1B]/20 mb-6`}>
                      <div className="flex items-center gap-2 mb-3">
                        <Clock className="w-4 h-4 text-[#F34D1B]" />
                        <span className="text-sm font-semibold text-white uppercase tracking-wider">Результат</span>
                      </div>
                      <p className="text-sm lg:text-base text-zinc-300 leading-relaxed">
                        {currentCase.result}
                      </p>
                    </div>

                    {/* CTA */}
                    <Button 
                      size="lg" 
                      className={`group relative overflow-hidden bg-gradient-to-r ${currentCase.gradient} hover:opacity-90 border-0 text-white font-semibold px-7 py-4 text-sm ${RADIUS} transition-all duration-300 w-full sm:w-auto`}
                      onClick={openApplicationModal}
                    >
                      <span className="relative z-10 flex items-center justify-center gap-2">
                        Обсудить похожую задачу
                        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                      </span>
                      <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-600" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Progress indicator */}
          <div className="flex items-center gap-3 mt-8 justify-center lg:justify-start lg:max-w-[400px]">
            {cases.map((caseItem) => (
              <button
                key={caseItem.id}
                onClick={() => handleCaseChange(caseItem.id)}
                className={`h-1.5 ${RADIUS} transition-all duration-300 ${
                  activeCase === caseItem.id 
                    ? "w-8 bg-gradient-to-r from-[#F34D1B] to-orange-500" 
                    : "w-1.5 bg-zinc-700 hover:bg-zinc-600"
                }`}
                aria-label={`Перейти к кейсу ${caseItem.id}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CasesSection;




