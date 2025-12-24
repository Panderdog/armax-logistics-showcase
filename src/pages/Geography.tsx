import { useState, useEffect, useRef } from "react";
import { Globe, Ship, Truck, Plane, Train, ArrowRight, MapPin, Sparkles, TrendingUp, Shield, Users, Clock, Zap, Building2 } from "lucide-react";
import SEO from "@/components/SEO";
import { organizationSchema } from "@/lib/schema";
import { Button } from "@/components/ui/button";
import LogisticsMap from "@/components/LogisticsMap";
import { useApplicationModal } from "@/contexts/ApplicationModalContext";

const Geography = () => {
  const { openApplicationModal } = useApplicationModal();
  const [activeRoute, setActiveRoute] = useState<number | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    if (statsRef.current) observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, []);

  const routes = [
    {
      from: "Китай",
      to: "Россия",
      modes: [
        { name: "Море", icon: Ship, time: "25-35 дней", price: "от $1 500" },
        { name: "ЖД", icon: Train, time: "18-22 дня", price: "от $2 800" },
        { name: "Авто", icon: Truck, time: "12-16 дней", price: "от $3 500" },
        { name: "Авиа", icon: Plane, time: "3-5 дней", price: "от $8 000" },
      ],
      description: "Основное направление с оптимизированными сроками",
      gradient: "from-[#FF6B35] via-[#F34D1B] to-[#C73E14]",
      bgGlow: "bg-[#F34D1B]/20",
    },
    {
      from: "Индия",
      to: "Россия",
      modes: [
        { name: "Море", icon: Ship, time: "30-40 дней", price: "от $1 800" },
        { name: "Авиа", icon: Plane, time: "4-6 дней", price: "от $9 000" },
      ],
      description: "Мультимодальные перевозки из Южной Азии",
      gradient: "from-[#FF9500] via-[#FF7A00] to-[#E65100]",
      bgGlow: "bg-orange-500/20",
    },
    {
      from: "Вьетнам",
      to: "Россия",
      modes: [
        { name: "Море", icon: Ship, time: "28-35 дней", price: "от $1 600" },
        { name: "Авиа", icon: Plane, time: "4-5 дней", price: "от $7 500" },
      ],
      description: "Из промышленных центров Юго-Восточной Азии",
      gradient: "from-[#10B981] via-[#059669] to-[#047857]",
      bgGlow: "bg-emerald-500/20",
    },
    {
      from: "Европа",
      to: "Россия",
      modes: [
        { name: "Море", icon: Ship, time: "20-30 дней", price: "от $2 200" },
        { name: "Авто", icon: Truck, time: "8-12 дней", price: "от $4 000" },
      ],
      description: "Комбинированные перевозки через Турцию",
      gradient: "from-[#3B82F6] via-[#2563EB] to-[#1D4ED8]",
      bgGlow: "bg-blue-500/20",
    },
  ];

  const regions = [
    { 
      name: "Азия", 
      countries: ["🇨🇳 Китай", "🇻🇳 Вьетнам", "🇰🇷 Корея", "🇯🇵 Япония", "🇹🇭 Таиланд", "🇲🇾 Малайзия", "🇮🇩 Индонезия", "🇸🇬 Сингапур"],
      highlight: true,
      icon: "🌏",
      stats: { deliveries: "1500+", time: "от 3 дней" }
    },
    { 
      name: "Южная Азия", 
      countries: ["🇮🇳 Индия", "🇧🇩 Бангладеш", "🇵🇰 Пакистан", "🇱🇰 Шри-Ланка"],
      highlight: false,
      icon: "🌍",
      stats: { deliveries: "400+", time: "от 4 дней" }
    },
    { 
      name: "Ближний Восток", 
      countries: ["🇦🇪 ОАЭ", "🇹🇷 Турция", "🇸🇦 Саудовская Аравия", "🇶🇦 Катар"],
      highlight: false,
      icon: "🏜️",
      stats: { deliveries: "300+", time: "от 5 дней" }
    },
    { 
      name: "Европа", 
      countries: ["🇩🇪 Германия", "🇮🇹 Италия", "🇳🇱 Нидерланды", "🇵🇱 Польша", "🇫🇷 Франция", "🇪🇸 Испания"],
      highlight: false,
      icon: "🌍",
      stats: { deliveries: "250+", time: "от 8 дней" }
    },
  ];

  const advantages = [
    {
      title: "Прямые контракты",
      description: "Работаем напрямую с азиатскими партнёрами без посредников",
      icon: Building2,
    },
    {
      title: "Оптимальные сроки",
      description: "Отработанные маршруты сокращают время доставки",
      icon: Clock,
    },
    {
      title: "Полное сопровождение",
      description: "Таможня, документы, доставка до двери",
      icon: Shield,
    },
    {
      title: "Гибкие решения",
      description: "Комбинируем транспорт для лучшего соотношения цена/скорость",
      icon: Zap,
    },
  ];

  const chinaStats = [
    { value: "25+", label: "городов КНР", desc: "работаем напрямую", icon: MapPin },
    { value: "15", label: "дней", desc: "среднее время ЖД", icon: Clock },
    { value: "1000+", label: "контейнеров", desc: "в год из Китая", icon: Ship },
    { value: "24/7", label: "поддержка", desc: "на русском языке", icon: Users },
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

        {/* Interactive Map Section */}
        <section className="relative py-20 lg:py-28 overflow-hidden">
          {/* Background effects */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#0B0F18] via-[#0D1220] to-[#0B0F18]" />
          <div className="absolute top-1/4 left-0 w-[600px] h-[600px] bg-[#F34D1B]/8 rounded-full blur-[180px]" />
          <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[150px]" />
          
          {/* Decorative grid lines */}
          <div 
            className="absolute inset-0 opacity-[0.015]"
            style={{
              backgroundImage: `
                linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px),
                linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px)
              `,
              backgroundSize: '80px 80px'
            }}
          />
          
          <div className="container mx-auto px-6 lg:px-8 relative z-10">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-2 mb-8 text-sm font-medium bg-white/[0.03] backdrop-blur-sm rounded-full border border-white/[0.06]">
                <Globe className="w-4 h-4 text-[#F34D1B]" />
                <span className="text-zinc-400">Интерактивная карта</span>
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight">
                Логистические маршруты
              </h2>
              <p className="text-lg lg:text-xl text-zinc-500 font-light max-w-2xl mx-auto">
                Исследуйте сеть наших логистических маршрутов из Азии и Европы
              </p>
            </div>
            
            {/* Map container with premium styling */}
            <div className="relative max-w-6xl mx-auto">
              {/* Glow effect behind map */}
              <div className="absolute -inset-4 bg-gradient-to-r from-[#F34D1B]/10 via-transparent to-blue-500/10 rounded-3xl blur-2xl opacity-60" />
              
              <div className="relative rounded-2xl overflow-hidden border border-white/[0.08] bg-[#0a0e17]/80 backdrop-blur-sm shadow-2xl">
            <LogisticsMap />
              </div>
            </div>
          </div>
        </section>

        {/* Regions Grid - Premium Design */}
        <section className="relative py-24 lg:py-32 overflow-hidden">
          {/* Dark background with gradient */}
          <div className="absolute inset-0 bg-[#080B12]" />
          
          {/* Accent glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-[#F34D1B]/5 rounded-full blur-[200px]" />
          
          <div className="container mx-auto px-6 lg:px-8 relative z-10">
            <div className="text-center max-w-3xl mx-auto mb-16 lg:mb-20">
              <div className="inline-flex items-center gap-2 px-4 py-2 mb-8 text-sm font-medium bg-white/[0.03] backdrop-blur-sm rounded-full border border-white/[0.06]">
                <Sparkles className="w-4 h-4 text-[#F34D1B]" />
                <span className="text-zinc-400">20+ стран партнёров</span>
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight">
                Наша география
              </h2>
              <p className="text-lg lg:text-xl text-zinc-500 font-light">
                Доставляем грузы из ключевых регионов мира
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto">
              {regions.map((region, index) => (
                <div
                  key={index}
                  className={`group relative p-8 lg:p-10 rounded-3xl transition-all duration-700 cursor-default overflow-hidden ${
                    region.highlight
                      ? "bg-gradient-to-br from-[#F34D1B]/20 via-[#F34D1B]/10 to-transparent border-2 border-[#F34D1B]/30"
                      : "bg-white/[0.02] border border-white/[0.06] hover:border-white/[0.12] hover:bg-white/[0.04]"
                  }`}
                  style={{ 
                    animationDelay: `${index * 0.1}s`,
                  }}
                >
                  {/* Background glow on highlight */}
                  {region.highlight && (
                    <div className="absolute -top-20 -right-20 w-40 h-40 bg-[#F34D1B]/30 rounded-full blur-[80px]" />
                  )}
                  
                  {/* Hover glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#F34D1B]/0 to-transparent opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-3xl" />
                  
                  <div className="relative z-10">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-4">
                        <span className="text-4xl">{region.icon}</span>
                        <div>
                          <h3 className={`text-2xl lg:text-3xl font-bold ${region.highlight ? "text-white" : "text-white group-hover:text-[#F34D1B] transition-colors"}`}>
                            {region.name}
                          </h3>
                          {region.highlight && (
                            <span className="text-xs font-medium text-[#F34D1B] uppercase tracking-wider">Основной регион</span>
                          )}
                        </div>
                      </div>
                      
                      {/* Stats badges */}
                      <div className="hidden sm:flex flex-col items-end gap-1">
                        <span className="text-xs text-zinc-500">Доставок в год</span>
                        <span className={`text-lg font-bold ${region.highlight ? "text-[#F34D1B]" : "text-white"}`}>{region.stats.deliveries}</span>
                      </div>
                    </div>
                    
                    {/* Countries */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {region.countries.map((country, idx) => (
                        <span
                          key={idx}
                          className={`px-3 py-1.5 text-sm rounded-lg transition-all duration-300 ${
                            region.highlight 
                              ? "bg-white/10 text-white/90 hover:bg-white/20" 
                              : "bg-white/[0.04] text-zinc-400 hover:bg-white/[0.08] hover:text-white"
                          }`}
                        >
                          {country}
                        </span>
                      ))}
                    </div>
                    
                    {/* Footer stats */}
                    <div className="flex items-center gap-6 pt-4 border-t border-white/[0.06]">
                      <div className="flex items-center gap-2">
                        <Clock className={`w-4 h-4 ${region.highlight ? "text-[#F34D1B]" : "text-zinc-500"}`} />
                        <span className="text-sm text-zinc-400">Доставка {region.stats.time}</span>
                      </div>
                      <ArrowRight className={`w-5 h-5 ml-auto transition-transform group-hover:translate-x-1 ${region.highlight ? "text-[#F34D1B]" : "text-zinc-600 group-hover:text-[#F34D1B]"}`} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Routes Section - Premium Interactive Cards */}
        <section className="relative py-24 lg:py-32 overflow-hidden">
          {/* Background */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#080B12] via-[#0B0F18] to-[#0D1220]" />
          
          {/* Animated gradient orbs */}
          <div className="absolute top-20 right-1/4 w-[500px] h-[500px] bg-[#F34D1B]/8 rounded-full blur-[180px] animate-pulse" />
          <div className="absolute bottom-20 left-1/4 w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-[150px]" />
          
          {/* Grid pattern */}
          <div 
            className="absolute inset-0 opacity-[0.02]"
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)`,
              backgroundSize: '40px 40px'
            }}
          />
          
          <div className="container mx-auto px-6 lg:px-8 relative z-10">
            <div className="text-center max-w-3xl mx-auto mb-16 lg:mb-20">
              <div className="inline-flex items-center gap-2 px-4 py-2 mb-8 text-sm font-medium bg-white/[0.03] backdrop-blur-sm rounded-full border border-white/[0.06]">
                <TrendingUp className="w-4 h-4 text-[#F34D1B]" />
                <span className="text-zinc-400">Популярные направления</span>
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight">
                Основные маршруты
              </h2>
              <p className="text-lg lg:text-xl text-zinc-500 font-light">
                Выберите оптимальный вид транспорта для вашего груза
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 max-w-6xl mx-auto">
              {routes.map((route, index) => (
                <div
                  key={index}
                  className={`group relative rounded-3xl transition-all duration-500 cursor-pointer overflow-hidden ${
                    activeRoute === index 
                      ? "ring-2 ring-[#F34D1B]/50 scale-[1.02]" 
                      : "hover:scale-[1.01]"
                  }`}
                  onClick={() => setActiveRoute(activeRoute === index ? null : index)}
                  onMouseEnter={() => setActiveRoute(index)}
                  onMouseLeave={() => setActiveRoute(null)}
                >
                  {/* Card background with gradient border effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/[0.08] to-white/[0.02] rounded-3xl" />
                  <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${route.bgGlow} blur-3xl`} />
                  
                  <div className="relative p-8 lg:p-10 bg-[#0D1220]/80 backdrop-blur-sm rounded-3xl border border-white/[0.06] group-hover:border-white/[0.12] transition-colors">
                    {/* Route header */}
                    <div className="flex items-start justify-between mb-8">
                      <div className="flex items-center gap-4">
                        <div className={`p-4 rounded-2xl bg-gradient-to-br ${route.gradient} shadow-lg`}>
                        <Globe className="h-6 w-6 text-white" strokeWidth={1.5} />
                      </div>
                      <div>
                          <div className="flex items-center gap-3 text-2xl lg:text-3xl font-bold text-white mb-1">
                          {route.from}
                            <ArrowRight className="h-5 w-5 text-[#F34D1B]" />
                          {route.to}
                          </div>
                          <div className="text-sm text-zinc-500">{route.description}</div>
                        </div>
                      </div>
                    </div>

                    {/* Transport modes grid */}
                    <div className="grid grid-cols-2 gap-3">
                      {route.modes.map((mode, idx) => (
                        <div
                          key={idx}
                          className="group/mode relative p-4 rounded-2xl bg-white/[0.03] border border-white/[0.06] hover:border-[#F34D1B]/30 hover:bg-white/[0.06] transition-all duration-300"
                        >
                          <div className="flex items-center gap-3 mb-3">
                            <div className="p-2 rounded-xl bg-[#F34D1B]/10 group-hover/mode:bg-[#F34D1B]/20 transition-colors">
                              <mode.icon className="h-5 w-5 text-[#F34D1B]" strokeWidth={1.5} />
                            </div>
                            <span className="font-semibold text-white">{mode.name}</span>
                          </div>
                          <div className="space-y-1">
                            <div className="flex items-center justify-between">
                              <span className="text-xs text-zinc-500">Срок</span>
                              <span className="text-sm font-medium text-zinc-300">{mode.time}</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-xs text-zinc-500">Цена</span>
                              <span className="text-sm font-medium text-[#F34D1B]">{mode.price}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    {/* CTA */}
                    <div className="mt-6 pt-6 border-t border-white/[0.06]">
                      <button 
                        className="w-full py-3 px-6 rounded-xl bg-[#F34D1B]/10 hover:bg-[#F34D1B] text-[#F34D1B] hover:text-white font-medium transition-all duration-300 flex items-center justify-center gap-2 group/btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          openApplicationModal();
                        }}
                      >
                        Рассчитать стоимость
                        <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* China Focus - Premium Section */}
        <section className="relative py-28 lg:py-36 overflow-hidden" ref={statsRef}>
          {/* Rich dark background */}
          <div className="absolute inset-0 bg-[#070A10]" />
          
          {/* China flag inspired accent */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#DE2910] to-transparent opacity-50" />
          
          {/* Dramatic glow effects */}
          <div className="absolute top-1/4 -left-20 w-[600px] h-[600px] bg-[#DE2910]/10 rounded-full blur-[200px]" />
          <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-[#F34D1B]/8 rounded-full blur-[180px]" />
          
          {/* Premium pattern overlay */}
          <div 
            className="absolute inset-0 opacity-[0.02]"
            style={{
              backgroundImage: `linear-gradient(45deg, rgba(255,255,255,0.05) 25%, transparent 25%),
                               linear-gradient(-45deg, rgba(255,255,255,0.05) 25%, transparent 25%),
                               linear-gradient(45deg, transparent 75%, rgba(255,255,255,0.05) 75%),
                               linear-gradient(-45deg, transparent 75%, rgba(255,255,255,0.05) 75%)`,
              backgroundSize: '60px 60px'
            }}
          />
          
          <div className="container mx-auto px-6 lg:px-8 relative z-10">
            <div className="max-w-7xl mx-auto">
              {/* Header */}
              <div className="text-center mb-16 lg:mb-20">
                <div className="inline-flex items-center gap-3 px-5 py-2.5 mb-8 text-sm font-medium bg-[#DE2910]/10 backdrop-blur-sm rounded-full border border-[#DE2910]/20">
                  <span className="text-2xl">🇨🇳</span>
                  <span className="text-[#F34D1B]">Ключевое направление</span>
                </div>
                <h2 className="text-4xl md:text-5xl lg:text-7xl font-bold text-white mb-6 tracking-tight">
                  Китай — наша
                  <br />
                  <span className="bg-gradient-to-r from-[#DE2910] via-[#F34D1B] to-[#FF6B35] bg-clip-text text-transparent">специализация</span>
                </h2>
                <p className="text-lg lg:text-xl text-zinc-500 font-light max-w-3xl mx-auto">
                  Работаем со всеми крупными промышленными регионами КНР. Прямые контакты с производителями, собственные склады для консолидации.
                </p>
              </div>
              
              {/* Stats grid - Premium animated counters */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-16 lg:mb-20">
                {chinaStats.map((stat, index) => (
                  <div
                    key={index}
                    className="group relative"
                    style={{ 
                      opacity: isVisible ? 1 : 0,
                      transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
                      transition: `all 0.8s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.15}s`
                    }}
                  >
                    <div className="relative p-6 lg:p-8 rounded-3xl bg-white/[0.02] backdrop-blur-sm border border-white/[0.06] hover:border-[#F34D1B]/30 hover:bg-white/[0.04] transition-all duration-500 h-full text-center overflow-hidden">
                      {/* Hover glow */}
                      <div className="absolute inset-0 bg-gradient-to-br from-[#F34D1B]/0 to-transparent opacity-0 group-hover:opacity-20 transition-opacity duration-500 rounded-3xl" />
                      
                      {/* Icon */}
                      <div className="relative mb-5 inline-flex p-4 rounded-2xl bg-[#F34D1B]/10 text-[#F34D1B] group-hover:bg-[#F34D1B] group-hover:text-white transition-all duration-500">
                        <stat.icon className="h-6 w-6 lg:h-7 lg:w-7" strokeWidth={1.5} />
                      </div>

                      {/* Number */}
                      <div className="relative text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-2 tracking-tight group-hover:scale-105 transition-transform duration-500">
                        {stat.value}
                      </div>

                      {/* Label */}
                      <div className="relative text-base lg:text-lg font-semibold text-white/90 mb-1">
                        {stat.label}
                      </div>

                      {/* Description */}
                      <div className="relative text-sm text-zinc-500 group-hover:text-zinc-400 transition-colors">
                        {stat.desc}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Advantages grid - Premium cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6 mb-12">
                  {advantages.map((item, index) => (
                  <div 
                    key={index} 
                    className="group relative p-6 lg:p-8 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:border-[#F34D1B]/30 transition-all duration-500"
                    style={{ 
                      opacity: isVisible ? 1 : 0,
                      transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
                      transition: `all 0.8s cubic-bezier(0.4, 0, 0.2, 1) ${0.4 + index * 0.1}s`
                    }}
                  >
                    <div className="flex items-start gap-5">
                      <div className="p-3 rounded-xl bg-[#F34D1B]/10 text-[#F34D1B] group-hover:bg-[#F34D1B] group-hover:text-white transition-all duration-300 shrink-0">
                        <item.icon className="h-6 w-6" strokeWidth={1.5} />
                      </div>
                      <div>
                        <div className="font-semibold text-lg text-white group-hover:text-[#F34D1B] transition-colors mb-1">
                          {item.title}
                        </div>
                        <div className="text-sm text-zinc-500 leading-relaxed">{item.description}</div>
                      </div>
                      </div>
                    </div>
                  ))}
                </div>

              {/* CTA */}
              <div className="text-center">
                <Button 
                  size="lg" 
                  className="group bg-gradient-to-r from-[#DE2910] to-[#F34D1B] hover:from-[#F34D1B] hover:to-[#FF6B35] text-white text-lg px-10 py-7 h-auto shadow-lg shadow-[#F34D1B]/25 hover:shadow-[#F34D1B]/40 transition-all duration-500" 
                  onClick={openApplicationModal}
                >
                  Рассчитать доставку из Китая
                  <ArrowRight className="ml-3 h-6 w-6 transition-transform group-hover:translate-x-2" />
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* CTA - Premium Closing Section */}
        <section className="relative py-28 lg:py-36 overflow-hidden">
          {/* Rich layered background */}
          <div className="absolute inset-0 bg-[#0B0F18]" />
          <div className="absolute inset-0 bg-[url('/nightport.jpg')] bg-cover bg-center opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F18] via-[#0B0F18]/80 to-[#0B0F18]/60" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0B0F18] via-transparent to-[#0B0F18]" />
          
          {/* Dramatic accent glows */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#F34D1B]/15 rounded-full blur-[200px]" />
          <div className="absolute bottom-0 left-1/3 w-[600px] h-[300px] bg-blue-500/5 rounded-full blur-[150px]" />
          
          {/* Decorative lines */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-1/4 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            <div className="absolute bottom-1/4 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />
          </div>
          
          <div className="container mx-auto px-6 lg:px-8 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              {/* Premium badge */}
              <div className="inline-flex items-center gap-2 px-5 py-2.5 mb-10 text-sm font-medium bg-white/[0.03] backdrop-blur-sm rounded-full border border-white/[0.08]">
                <Sparkles className="w-4 h-4 text-[#F34D1B]" />
                <span className="text-zinc-400">Бесплатный расчёт за 30 минут</span>
              </div>
              
              <h2 className="text-4xl md:text-5xl lg:text-7xl font-bold text-white mb-8 tracking-tight leading-[1.1]">
                Нужна доставка
                <br />
                <span className="bg-gradient-to-r from-[#F34D1B] via-[#FF6B35] to-[#F34D1B] bg-clip-text text-transparent">из Азии?</span>
              </h2>
              <p className="text-xl lg:text-2xl text-zinc-400 font-light mb-12 max-w-2xl mx-auto">
                Рассчитаем стоимость и предложим оптимальный маршрут под ваш бюджет и сроки
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  className="bg-[#F34D1B] hover:bg-[#FF6B35] text-white text-lg px-12 py-8 h-auto group shadow-lg shadow-[#F34D1B]/30 hover:shadow-[#F34D1B]/50 transition-all duration-500"
                  onClick={openApplicationModal}
                >
                  Рассчитать доставку
                  <ArrowRight className="ml-3 h-6 w-6 transition-transform group-hover:translate-x-2" />
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="border-2 border-white/20 bg-white/[0.02] text-white hover:bg-white hover:text-[#0B0F18] text-lg px-12 py-8 h-auto backdrop-blur-sm transition-all duration-500"
                >
                  <a href="tel:+78126440291">
                    Позвонить нам
                  </a>
                </Button>
              </div>
              
              {/* Trust indicators */}
              <div className="mt-16 pt-10 border-t border-white/[0.06]">
                <div className="flex flex-wrap justify-center gap-8 lg:gap-12">
                  {[
                    { value: "15+", label: "лет на рынке" },
                    { value: "1500+", label: "доставок в год" },
                    { value: "99%", label: "довольных клиентов" },
                  ].map((item, index) => (
                    <div key={index} className="text-center">
                      <div className="text-2xl lg:text-3xl font-bold text-white mb-1">{item.value}</div>
                      <div className="text-sm text-zinc-500">{item.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Geography;
