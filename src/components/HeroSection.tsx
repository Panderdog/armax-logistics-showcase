import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-primary via-primary to-primary-dark">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=2070')] bg-cover bg-center opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-b from-primary/98 via-primary/95 to-primary-dark/98" />
        {/* Subtle gradient overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/30 via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="container relative z-10 mx-auto px-6 pb-32 lg:px-8" style={{ paddingTop: '3em' }}>
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-[2.75rem] md:text-6xl lg:text-7xl font-bold text-primary-foreground mb-8 animate-fade-in leading-[1.1] text-balance">
            Armax Logistics — надёжные международные перевозки без задержек
          </h1>
          <p className="text-xl md:text-2xl lg:text-3xl text-primary-foreground/85 mb-12 animate-fade-in font-light leading-relaxed" style={{ animationDelay: '0.15s' }}>
            Организуем доставку по 20+ странам Европы и Азии
          </p>
          <div className="flex flex-col sm:flex-row gap-5 justify-center animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <Button
              asChild
              size="lg"
              className="text-base sm:text-lg px-10 py-7 h-auto group shadow-glow hover:scale-105 hover:-translate-y-1 transition-all duration-300 ease-out"
            >
              <Link to="/contacts">
                Получить предложение
                <ArrowRight className="ml-2.5 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1.5" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="text-base sm:text-lg px-10 py-7 h-auto bg-white/10 border-2 border-white/30 text-white hover:bg-white hover:text-primary hover:border-white hover:scale-105 hover:-translate-y-1 backdrop-blur-md transition-all duration-300 ease-out"
            >
              <Link to="/services">Наши услуги</Link>
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8 max-w-6xl mx-auto">
          {[
            { value: "15+", label: "лет опыта" },
            { value: "20+", label: "стран партнёров" },
            { value: "99%", label: "доставок вовремя" },
            { value: "5000+", label: "тонн грузов/год" },
          ].map((stat, index) => (
            <div
              key={index}
              className="group text-center p-8 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 animate-fade-in hover:bg-white/10 hover:border-white/30 hover:scale-105 hover:-translate-y-2 hover:shadow-large transition-all duration-500 ease-out cursor-default"
              style={{ animationDelay: `${0.45 + index * 0.1}s` }}
            >
              <div className="text-4xl md:text-5xl font-bold text-white group-hover:text-accent mb-3 tracking-tight group-hover:scale-110 transition-all duration-300">{stat.value}</div>
              <div className="text-sm md:text-base text-white/70 group-hover:text-white font-medium transition-colors duration-300">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 animate-bounce opacity-70 hover:opacity-100 transition-opacity">
        <div className="w-7 h-11 border-2 border-white/40 rounded-full flex items-start justify-center p-2">
          <div className="w-1.5 h-3 bg-white/80 rounded-full animate-pulse" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
