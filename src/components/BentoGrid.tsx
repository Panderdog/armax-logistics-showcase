import { Ship, Truck, Plane, FileCheck, Shield, HeadphonesIcon, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

const BentoGrid = () => {
  return (
    <section className="py-20 lg:py-20 bg-background relative overflow-hidden">
      
      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        {/* Section header */}
        <div className="max-w-3xl mb-16">
          <span className="inline-block px-4 py-1.5 mb-6 text-sm font-medium text-accent bg-accent/10 rounded-full border border-accent/20">
            Наши возможности
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 tracking-tight">
            Полный спектр
            <br />
            логистических услуг
          </h2>
          <p className="text-lg text-muted-foreground font-light leading-relaxed">
            От забора груза до доставки получателю — берём на себя всю
            <br />
            логистику и таможенное оформление
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 auto-rows-[180px] lg:auto-rows-[200px]">
          
          {/* Large card - Морские перевозки */}
          <Link 
            to="/services"
            className="group relative md:col-span-2 md:row-span-2 rounded-3xl overflow-hidden cursor-pointer"
          >
            <div className="absolute inset-0 bg-[url('/images/port-by-air.webp')] bg-cover bg-center" />
            <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/60 to-transparent" />
            <div className="absolute inset-0 bg-primary/20 group-hover:bg-primary/10 transition-colors duration-500" />
            
            <div className="relative h-full p-8 flex flex-col justify-end">
              <div className="mb-4 inline-flex p-4 rounded-2xl bg-white/10 backdrop-blur-sm w-fit">
                <Ship className="h-8 w-8 text-white" strokeWidth={1.5} />
              </div>
              <h3 className="text-2xl lg:text-3xl font-bold text-white mb-2">
                Морские перевозки
              </h3>
              <p className="text-white/70 mb-4 max-w-md">
                Контейнерные и сборные грузы из портов Китая, Индии, Турции в порты России
              </p>
              <div className="flex items-center gap-2 text-accent group-hover:translate-x-2 transition-transform duration-300">
                <span className="font-medium">Подробнее</span>
                <ArrowUpRight className="h-5 w-5" />
              </div>
            </div>
          </Link>

          {/* Автоперевозки */}
          <div className="group relative rounded-3xl overflow-hidden cursor-pointer hover:scale-[1.02] transition-transform duration-500">
            <div className="absolute inset-0 bg-[url('/images/truck.webp')] bg-cover bg-center" />
            <div className="absolute inset-0 bg-gradient-to-t from-accent via-accent/60 to-transparent" />
            <div className="absolute inset-0 bg-accent/20 group-hover:bg-accent/10 transition-colors duration-500" />
            
            <div className="relative h-full p-6 lg:p-8 flex flex-col justify-end">
              <div className="mb-3 inline-flex p-3 rounded-xl bg-white/10 backdrop-blur-sm w-fit">
                <Truck className="h-6 w-6 text-white" strokeWidth={1.5} />
              </div>
              <h3 className="text-xl font-bold text-white mb-1">Автоперевозки</h3>
              <p className="text-white/80 text-sm">
                Доставка из Азии по России и СНГ
              </p>
            </div>
          </div>

          {/* Авиадоставка */}
          <div className="group relative rounded-3xl overflow-hidden cursor-pointer hover:scale-[1.02] transition-transform duration-500">
            <div className="absolute inset-0 bg-[url('/images/airplane.webp')] bg-cover bg-center" />
            <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/60 to-transparent" />
            <div className="absolute inset-0 bg-primary/20 group-hover:bg-primary/10 transition-colors duration-500" />
            
            <div className="relative h-full p-6 lg:p-8 flex flex-col justify-end">
              <div className="mb-3 inline-flex p-3 rounded-xl bg-white/10 backdrop-blur-sm w-fit">
                <Plane className="h-6 w-6 text-white" strokeWidth={1.5} />
              </div>
              <h3 className="text-xl font-bold text-white mb-1">Авиадоставка</h3>
              <p className="text-white/80 text-sm">
                Срочные грузы за 3-5 дней
              </p>
            </div>
          </div>

          {/* Таможенное оформление - wide card */}
          <Link 
            to="/services"
            className="group relative lg:col-span-2 rounded-3xl overflow-hidden cursor-pointer"
          >
            <div className="absolute inset-0 bg-[url('/images/customs.png')] bg-cover bg-center" />
            <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/80 to-primary/60" />
            <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 transition-colors duration-500" />
            
            <div className="relative h-full p-6 lg:p-8 flex flex-col justify-between">
              <div className="inline-flex p-3 rounded-xl bg-white/10 backdrop-blur-sm w-fit">
                <FileCheck className="h-6 w-6 text-white" strokeWidth={1.5} />
              </div>
              <div>
                <h3 className="text-xl lg:text-2xl font-bold text-white mb-2">
                  Таможенное оформление
                </h3>
                <p className="text-white/70 text-sm">
                  Полное сопровождение документов, сертификация, валютный контроль
                </p>
              </div>
            </div>
          </Link>

          {/* Страхование */}
          <div className="group relative rounded-3xl overflow-hidden p-6 lg:p-8 hover:shadow-xl transition-all duration-500 cursor-pointer bg-gradient-to-br from-amber-50 via-orange-100 to-rose-100 border-2 border-accent/30 hover:border-accent/60">
            {/* Decorative glow */}
            <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-accent/30 rounded-full blur-3xl" />
            <div className="absolute -top-4 -left-4 w-24 h-24 bg-orange-300/20 rounded-full blur-2xl" />
            
            <div className="relative h-full flex flex-col">
              <div className="mb-4 inline-flex p-3 rounded-xl bg-accent/15 text-accent w-fit group-hover:bg-accent group-hover:text-white transition-colors duration-500 group-hover:shadow-lg group-hover:shadow-accent/30">
                <Shield className="h-6 w-6" strokeWidth={1.5} />
              </div>
              <h3 className="text-xl font-bold text-accent mb-2">
                Управление рисками
              </h3>
              <p className="text-foreground/70 text-sm flex-1">
                Подбор под каждую перевозку
              </p>
            </div>
          </div>

          {/* Персональный менеджер */}
          <div className="group relative rounded-3xl overflow-hidden p-6 lg:p-8 hover:shadow-xl transition-all duration-500 cursor-pointer bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 border-2 border-primary/20 hover:border-primary/40">
            {/* Decorative glow */}
            <div className="absolute -top-8 -left-8 w-32 h-32 bg-primary/20 rounded-full blur-3xl" />
            <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-indigo-300/20 rounded-full blur-2xl" />
            
            <div className="relative h-full flex flex-col">
              <div className="mb-4 inline-flex p-3 rounded-xl bg-primary/15 text-primary w-fit group-hover:bg-primary group-hover:text-white transition-colors duration-500 group-hover:shadow-lg group-hover:shadow-primary/30">
                <HeadphonesIcon className="h-6 w-6" strokeWidth={1.5} />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                Поддержка 24/7
              </h3>
              <p className="text-foreground/70 text-sm flex-1">
                Личный менеджер
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default BentoGrid;

