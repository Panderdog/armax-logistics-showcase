import { useParams, Link } from "react-router-dom";
import { 
  Truck, Ship, Plane, Train, Package, FileCheck, Warehouse, Shield, 
  ArrowRight, Clock, Globe, Sparkles, 
  ChevronRight, Phone
} from "lucide-react";
import { Button } from "@/components/ui/button";
import SEO from "@/components/SEO";
import { serviceSchema, breadcrumbSchema } from "@/lib/schema";
import { useApplicationModal } from "@/contexts/ApplicationModalContext";
import { servicesDetailData } from "@/data/servicesDetail";
import { ServiceId } from "@/data/services";

// Список услуг для навигации
const servicesList = [
  { id: "sea" as ServiceId, title: "Морские перевозки", icon: Ship },
  { id: "aviation" as ServiceId, title: "Авиаперевозки", icon: Plane },
  { id: "auto" as ServiceId, title: "Автоперевозки", icon: Truck },
  { id: "railway" as ServiceId, title: "ЖД перевозки", icon: Train },
  { id: "consolidated" as ServiceId, title: "Сборные грузы", icon: Package },
  { id: "customs" as ServiceId, title: "Таможня", icon: FileCheck },
  { id: "warehouse" as ServiceId, title: "Склад", icon: Warehouse },
  { id: "insurance" as ServiceId, title: "Страхование грузов", icon: Shield },
];

const ServiceDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { openApplicationModal } = useApplicationModal();
  
  const service = servicesDetailData[id as ServiceId];
  
  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Услуга не найдена</h1>
          <Button asChild>
            <Link to="/services">Вернуться к услугам</Link>
          </Button>
        </div>
      </div>
    );
  }

  // Находим предыдущую и следующую услугу
  const currentIndex = servicesList.findIndex(s => s.id === id);
  const prevService = currentIndex > 0 ? servicesList[currentIndex - 1] : null;
  const nextService = currentIndex < servicesList.length - 1 ? servicesList[currentIndex + 1] : null;

  // Рекомендуемые услуги (исключаем текущую)
  const relatedServices = servicesList.filter(s => s.id !== id).slice(0, 4);

  // Создаём структурированные данные для услуги
  const combinedSchema = {
    "@context": "https://schema.org",
    "@graph": [
      serviceSchema(service.title, service.description),
      breadcrumbSchema([
        { name: "Главная", url: "/" },
        { name: "Услуги", url: "/services" },
        { name: service.title, url: `/services/${id}` }
      ])
    ]
  };

  return (
    <>
      <SEO
        title={service.title}
        description={service.description}
        keywords={`${service.title}, международные перевозки, логистика, Armax Logistics`}
        canonicalUrl={`/services/${id}/`}
        structuredData={combinedSchema}
      />
      
      <div className="min-h-screen bg-[#0B0F18]">
        {/* Hero Section */}
        <section className="relative pt-20 pb-32 lg:pt-28 lg:pb-40 overflow-hidden">
          {/* Background */}
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-30"
            style={{ backgroundImage: `url(${service.heroImage})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0B0F18] via-[#0B0F18]/80 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0B0F18]" />
          
          {/* Grid pattern */}
          <div 
            className="absolute inset-0 opacity-[0.02]"
            style={{
              backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
              backgroundSize: '60px 60px'
            }}
          />
          
          <div className="container mx-auto px-6 lg:px-8 relative z-10">
            {/* Breadcrumbs */}
            <nav className="flex items-center gap-2 text-sm text-zinc-500 mb-8">
              <Link to="/" className="hover:text-zinc-300 transition-colors">Главная</Link>
              <ChevronRight className="h-4 w-4" />
              <Link to="/services" className="hover:text-zinc-300 transition-colors">Услуги</Link>
              <ChevronRight className="h-4 w-4" />
              <span className="text-zinc-300">{service.title}</span>
            </nav>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              {/* Content */}
              <div>
                <div className="inline-flex items-center gap-2 px-4 py-2 mb-8 text-sm font-medium bg-white/[0.04] backdrop-blur-sm rounded-xl border border-white/[0.06]">
                  <service.icon className="w-4 h-4 text-[#F34D1B]" strokeWidth={1.5} />
                  <span className="text-zinc-300">{service.subtitle}</span>
                </div>
                
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight leading-[1.1]">
                  {service.heroTitle}
                  <br />
                  <span className="bg-gradient-to-r from-[#F34D1B] via-orange-400 to-[#F34D1B] bg-clip-text text-transparent">
                    {service.heroAccent}
                  </span>
                </h1>
                
                <p className="text-lg lg:text-xl text-zinc-400 font-light leading-relaxed mb-8 max-w-xl">
                  {service.description}
                </p>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    size="lg"
                    className="text-base lg:text-lg px-8 py-6 h-auto group shadow-glow hover:shadow-[0_20px_60px_-10px_hsl(14_90%_53%/0.5)] hover:scale-105 transition-all duration-500"
                    onClick={openApplicationModal}
                  >
                    {service.ctaButtonText}
                    <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </Button>
                  <Button
                    asChild
                    size="lg"
                    variant="outline"
                    className="text-base lg:text-lg px-8 py-6 h-auto bg-white/5 border-2 border-white/20 text-white hover:bg-white hover:text-primary hover:border-white transition-all duration-500 backdrop-blur-sm"
                  >
                    <a href="tel:+79819976636">
                      <Phone className="mr-2 h-5 w-5" />
                      Позвонить
                    </a>
                  </Button>
                </div>
              </div>

              {/* Stats Cards or Insurance Text */}
              {id === 'insurance' ? (
                <div className="flex items-center justify-center">
                  <p className="text-base lg:text-lg text-white/50 font-light leading-relaxed italic text-center max-w-md">
                    Страхование является частью комплексного логистического сопровождения Armax и подбирается индивидуально под маршрут и тип груза.
                  </p>
                </div>
              ) : service.stats && (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                  {service.stats.map((stat, index) => (
                    <div
                      key={index}
                      className="group p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-500 text-center"
                    >
                      <div className={`text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r ${service.color} bg-clip-text text-transparent mb-2`}>
                        {stat.value}
                      </div>
                      <div className="text-xs sm:text-sm text-white/60 group-hover:text-white/80 transition-colors">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          
          {/* Smooth transition to next section */}
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0B0F18] to-transparent" />
        </section>

        {/* Features Section */}
        <section className="py-20 lg:py-28 bg-[#0B0F18] relative overflow-hidden">
          {/* Background effects */}
          <div className={`absolute top-0 left-1/4 w-[500px] h-[500px] bg-gradient-to-br ${service.color} opacity-[0.03] rounded-full blur-[150px]`} />
          <div className={`absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-gradient-to-tl ${service.color} opacity-[0.025] rounded-full blur-[120px]`} />
          
          {/* Subtle grid pattern */}
          <div 
            className="absolute inset-0 opacity-[0.02]"
            style={{
              backgroundImage: `linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)`,
              backgroundSize: '80px 80px'
            }}
          />
          
          <div className="container mx-auto px-6 lg:px-8 relative z-10">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <span className="inline-flex items-center gap-2 px-4 py-2 mb-8 text-sm font-medium bg-white/[0.04] backdrop-blur-sm rounded-xl border border-white/[0.06]">
                  <Sparkles className="h-4 w-4 text-[#F34D1B]" />
                  <span className="text-zinc-300">Что входит в услугу</span>
                </span>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
                  <span className="text-white">{id === 'insurance' ? 'Как мы ' : 'Преимущества '}</span>
                  <span className={`bg-gradient-to-r ${service.color} bg-clip-text text-transparent`}>
                    {id === 'insurance' ? 'страхуем грузы' : 'и возможности'}
                  </span>
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {service.features.map((feature, index) => {
                  const FeatureIcon = feature.icon;
                  return (
                    <div
                      key={index}
                      className="group p-6 lg:p-8 rounded-2xl bg-white/[0.02] border border-white/[0.05] hover:bg-white/[0.04] hover:border-white/[0.1] hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.3),0_0_30px_-10px_rgba(243,77,27,0.1)] transition-all duration-500 hover:-translate-y-1"
                    >
                      <div 
                        className={`inline-flex p-3.5 rounded-xl bg-gradient-to-br ${service.color} mb-5`}
                        style={{
                          boxShadow: '0 0 15px rgba(243,77,27,0.2)'
                        }}
                      >
                        <FeatureIcon className="h-5 w-5 text-white" strokeWidth={1.5} />
                      </div>
                      <h3 className="text-lg font-bold text-white mb-2 group-hover:text-[#F34D1B] transition-colors duration-300">
                        {feature.title}
                      </h3>
                      <p className="text-zinc-400 text-sm leading-relaxed">
                        {feature.desc}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* About Section - Two Columns */}
        <section className="py-20 lg:py-28 bg-[#0B0F18] relative overflow-hidden">
          {/* Background effects */}
          <div className={`absolute top-1/3 right-0 w-[600px] h-[600px] bg-gradient-to-br ${service.color} opacity-[0.04] rounded-full blur-[180px]`} />
          <div className={`absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-tr ${service.color} opacity-[0.03] rounded-full blur-[150px]`} />
          
          {/* Subtle grid pattern */}
          <div 
            className="absolute inset-0 opacity-[0.02]"
            style={{
              backgroundImage: `linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)`,
              backgroundSize: '80px 80px'
            }}
          />
          
          <div className="container mx-auto px-6 lg:px-8 relative z-10">
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                {/* Image */}
                <div className="relative">
                  <div className="relative rounded-3xl overflow-hidden aspect-[4/3] border border-white/[0.08]"
                    style={{
                      boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5), 0 0 60px -15px rgba(243,77,27,0.15)'
                    }}
                  >
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F18]/60 via-transparent to-transparent" />
                    <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-[0.08] mix-blend-overlay`} />
                  </div>
                  {/* Floating badge */}
                  <div 
                    className="absolute -bottom-6 -right-6 p-5 rounded-2xl bg-white/[0.03] backdrop-blur-xl border border-white/[0.08]"
                    style={{
                      boxShadow: '0 20px 40px -15px rgba(0,0,0,0.4), 0 0 30px -10px rgba(243,77,27,0.1)'
                    }}
                  >
                    <div 
                      className={`p-3.5 rounded-xl bg-gradient-to-br ${service.color} mb-3`}
                      style={{
                        boxShadow: '0 0 20px rgba(243,77,27,0.25)'
                      }}
                    >
                      <service.icon className="h-7 w-7 text-white" strokeWidth={1.5} />
                    </div>
                    <p className="text-sm font-medium text-white">Контроль</p>
                    <p className="text-sm text-zinc-400">на каждом этапе</p>
                  </div>
                </div>

                {/* Content */}
                <div>
                  <span className="inline-flex items-center gap-2 px-4 py-2 mb-8 text-sm font-medium bg-white/[0.04] backdrop-blur-sm rounded-xl border border-white/[0.06]">
                    <Globe className={`h-4 w-4 bg-gradient-to-r ${service.color} bg-clip-text`} style={{ color: '#F34D1B' }} />
                    <span className="text-zinc-300">О услуге</span>
                  </span>
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 tracking-tight">
                    <span className="text-white">{service.title.split(' ')[0]} </span>
                    <span className={`bg-gradient-to-r ${service.color} bg-clip-text text-transparent`}>
                      {service.title.split(' ').slice(1).join(' ')}
                    </span>
                  </h2>
                  <div className="space-y-4 text-zinc-400 leading-relaxed text-base lg:text-lg">
                    {service.longDescription.split('\n\n').map((paragraph, index) => (
                      <p key={index}>{paragraph}</p>
                    ))}
                  </div>
                  <Button
                    size="lg"
                    className={`mt-10 group relative overflow-hidden bg-gradient-to-r ${service.color} hover:opacity-90 border-0 text-white font-semibold px-8 py-6 h-auto text-base rounded-xl transition-all duration-300`}
                    style={{
                      boxShadow: '0 10px 40px -10px rgba(243,77,27,0.4)'
                    }}
                    onClick={openApplicationModal}
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      {service.ctaButtonText}
                      <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-600" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="py-20 lg:py-24 bg-[#0B0F18] relative overflow-hidden">
          {/* Background effects */}
          <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-gradient-to-r ${service.color} opacity-[0.03] rounded-full blur-[150px]`} />
          
          <div className="container mx-auto px-6 lg:px-8 relative z-10">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-16">
                <span className="inline-flex items-center gap-2 px-4 py-2 mb-6 text-sm font-medium bg-white/[0.04] backdrop-blur-sm rounded-xl border border-white/[0.06]">
                  <Clock className="h-4 w-4 text-accent" />
                  <span className="text-zinc-300">Процесс работы</span>
                </span>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 tracking-tight">
                  <span className="text-white">Как мы </span>
                  <span className={`bg-gradient-to-r ${service.color} bg-clip-text text-transparent`}>
                    работаем
                  </span>
                </h2>
                <p className="text-lg text-zinc-400 max-w-2xl mx-auto">
                  Прозрачный процесс на каждом этапе
                </p>
              </div>

              {/* Timeline */}
              <div className="relative">
                {/* Vertical line */}
                <div className="absolute left-[23px] top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-white/10 to-transparent hidden md:block" />
                
                <div className="space-y-6">
                  {service.process.map((step, index) => (
                    <div key={index} className="relative flex gap-6 group">
                      {/* Step number */}
                      <div className={`relative z-10 flex-shrink-0 w-12 h-12 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center text-white font-bold shadow-lg`}>
                        {step.step}
                      </div>
                      
                      {/* Content */}
                      <div className="flex-1 pb-6">
                        <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.05] hover:border-white/[0.1] transition-all duration-300">
                          <h3 className="text-lg font-bold text-white mb-2">{step.title}</h3>
                          <p className="text-zinc-400 text-sm leading-relaxed">{step.desc}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Related Services Section */}
        <section className="py-20 lg:py-24 bg-[#0B0F18] relative overflow-hidden">
          {/* Background effects */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-gradient-to-r from-[#F34D1B]/[0.02] to-orange-500/[0.02] rounded-full blur-[120px]" />
          
          <div className="container mx-auto px-6 lg:px-8 relative z-10">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <span className="inline-flex items-center gap-2 px-4 py-2 mb-6 text-sm font-medium bg-white/[0.04] backdrop-blur-sm rounded-xl border border-white/[0.06]">
                  <Sparkles className="h-4 w-4 text-[#F34D1B]" />
                  <span className="text-zinc-300">Другие услуги</span>
                </span>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
                  <span className="text-white">Вам также может </span>
                  <span className="bg-gradient-to-r from-[#F34D1B] via-orange-400 to-[#F34D1B] bg-clip-text text-transparent">
                    быть интересно
                  </span>
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                {relatedServices.map((relatedService, index) => {
                  const RelatedIcon = relatedService.icon;
                  return (
                    <Link
                      key={relatedService.id}
                      to={`/services/${relatedService.id}`}
                      className="group p-6 rounded-2xl bg-white/[0.02] border border-white/[0.05] hover:bg-white/[0.04] hover:border-[#F34D1B]/30 transition-all duration-500 hover:-translate-y-1"
                      style={{
                        animationDelay: `${index * 0.1}s`
                      }}
                    >
                      <div className="flex flex-col h-full">
                        <div className="inline-flex p-3.5 rounded-xl bg-gradient-to-br from-[#F34D1B] to-orange-500 mb-4 w-fit">
                          <RelatedIcon className="h-5 w-5 text-white" strokeWidth={1.5} />
                        </div>
                        <h3 className="text-lg font-bold text-white mb-2 group-hover:text-[#F34D1B] transition-colors duration-300">
                          {relatedService.title}
                        </h3>
                        <div className="mt-auto pt-4 flex items-center gap-2 text-sm text-zinc-400 group-hover:text-[#F34D1B] transition-colors duration-300">
                          <span>Подробнее</span>
                          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 lg:py-28 bg-[#0B0F18] relative overflow-hidden">
          {/* Background effects */}
          <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] bg-gradient-to-r ${service.color} opacity-[0.06] rounded-full blur-[180px]`} />
          
          {/* Subtle grid pattern */}
          <div 
            className="absolute inset-0 opacity-[0.02]"
            style={{
              backgroundImage: `linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)`,
              backgroundSize: '80px 80px'
            }}
          />
          
          <div className="container mx-auto px-6 lg:px-8 relative z-10">
            <div className="max-w-4xl mx-auto">
              <div 
                className={`relative p-10 lg:p-16 rounded-3xl bg-gradient-to-br ${service.color} overflow-hidden`}
                style={{
                  boxShadow: '0 30px 60px -15px rgba(0,0,0,0.5), 0 0 80px -20px rgba(243,77,27,0.3)'
                }}
              >
                {/* Decorative elements */}
                <div className="absolute top-0 right-0 w-80 h-80 bg-white/15 rounded-full blur-[120px]" />
                <div className="absolute bottom-0 left-0 w-80 h-80 bg-black/20 rounded-full blur-[120px]" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-32 bg-white/5 blur-[60px]" />
                
                {/* Animated gradient border effect */}
                <div className="absolute inset-0 rounded-3xl border border-white/20" />
                
                <div className="relative text-center">
                  <div 
                    className="inline-flex p-4 rounded-2xl bg-white/20 backdrop-blur-sm mb-8 border border-white/10"
                    style={{
                      boxShadow: '0 0 30px rgba(255,255,255,0.1)'
                    }}
                  >
                    <service.icon className="h-8 w-8 text-white" strokeWidth={1.5} />
                  </div>
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-5 tracking-tight">
                    {service.ctaTitle || "Готовы начать?"}
                  </h2>
                  <p className="text-lg lg:text-xl text-white/80 font-light mb-10 max-w-xl mx-auto leading-relaxed">
                    {service.ctaSubtitle || `Получите расчёт стоимости ${service.title.toLowerCase()} за один день`}
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button
                      size="lg"
                      className="relative overflow-hidden bg-[#F34D1B] text-white hover:bg-[#F34D1B]/90 text-base lg:text-lg px-8 lg:px-10 py-6 lg:py-7 h-auto group font-semibold rounded-xl transition-all duration-300"
                      style={{
                        boxShadow: '0 10px 40px -10px rgba(243,77,27,0.5)'
                      }}
                      onClick={openApplicationModal}
                    >
                      <span className="relative z-10 flex items-center">
                        Получить расчёт
                        <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                      </span>
                    </Button>
                    <Button
                      asChild
                      size="lg"
                      variant="outline"
                      className="bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white hover:bg-white hover:text-[#0B0F18] text-base lg:text-lg px-8 lg:px-10 py-6 lg:py-7 h-auto rounded-xl transition-all duration-300"
                    >
                      <a href="tel:+79819976636">
                        <Phone className="mr-2 h-5 w-5" />
                        Позвонить нам
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

      </div>
    </>
  );
};

export default ServiceDetail;
