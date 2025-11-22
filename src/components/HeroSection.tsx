import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const HeroSection = () => {
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [videoError, setVideoError] = useState(false);

  useEffect(() => {
    // Preload video on mount for faster display
    const video = document.getElementById('hero-video') as HTMLVideoElement;
    if (video) {
      video.addEventListener('loadeddata', () => setVideoLoaded(true));
      video.addEventListener('error', () => setVideoError(true));
    }
  }, []);

  return (
    <section className="relative h-[calc(100vh-var(--header-height))] flex items-center justify-center overflow-hidden bg-gradient-to-b from-primary via-primary to-primary-dark">
      {/* Mobile Background - Image with Overlay */}
      <div className="absolute inset-0 z-0 md:hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=2070')] bg-cover bg-center opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-b from-primary/98 via-primary/95 to-primary-dark/98" />
        {/* Subtle gradient overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/30 via-transparent to-transparent" />
      </div>

      {/* Desktop/Tablet Background - Video with Overlay */}
      <div className="absolute inset-0 z-0 hidden md:block">
        {/* Poster/Fallback Background - показывается пока видео грузится или при ошибке */}
        <div 
          className={`absolute inset-0 bg-[url('/images/ship.jpg')] bg-cover bg-center transition-opacity duration-1000 ${
            videoLoaded && !videoError ? 'opacity-0' : 'opacity-30'
          }`}
          aria-hidden="true"
        />
        
        {/* Video Background */}
        {!videoError && (
          <video
            id="hero-video"
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            poster="/images/ship.jpg"
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
              videoLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            aria-label="Фоновое видео морских грузовых перевозок и логистики"
          >
            <source src="/video/Кубрик-3.0.webm" type="video/webm" />
            <source src="/video/Кубрик-3.0.mp4" type="video/mp4" />
            Ваш браузер не поддерживает видео.
          </video>
        )}
        
        {/* Enhanced Gradient Overlay - многослойный для лучшей глубины и читаемости */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary/80 via-primary/60 to-primary/20" />
        <div className="absolute inset-0 bg-gradient-to-b from-primary/30 via-transparent to-primary-dark/40" />
        <div className="absolute inset-0 bg-gradient-to-tr from-primary-dark/50 via-transparent to-transparent" />
        
        {/* Subtle vignette effect */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.2)_100%)]" />
      </div>

      {/* Mobile Content */}
      <div className="container relative z-10 mx-auto px-6 pb-32 lg:px-8 md:hidden" style={{ paddingTop: '3em' }}>
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-[2.75rem] font-bold text-primary-foreground mb-10 animate-fade-in leading-[1.05] text-balance">
            ARMAX LOGISTICS — надёжные международные перевозки без задержек
          </h1>
          <p className="text-xl text-primary-foreground/90 mb-14 animate-fade-in font-light leading-[1.6]" style={{ animationDelay: '0.15s' }}>
            Организуем доставку по 20+ странам Европы и Азии
          </p>
          <div className="flex flex-col sm:flex-row gap-5 justify-center animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <Button
              asChild
              size="lg"
              className="text-lg px-12 py-8 h-auto group shadow-glow hover:scale-105 hover:-translate-y-1 transition-all duration-300 ease-out"
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
              className="text-lg px-12 py-8 h-auto bg-white/10 border-2 border-white/30 text-white hover:bg-white hover:text-primary hover:border-white hover:scale-105 hover:-translate-y-1 backdrop-blur-md transition-all duration-300 ease-out"
            >
              <Link to="/services">Наши услуги</Link>
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-24 grid grid-cols-2 gap-6 max-w-6xl mx-auto">
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
              <div className="text-4xl font-bold text-white group-hover:text-accent mb-3 tracking-tight group-hover:scale-110 transition-all duration-300">{stat.value}</div>
              <div className="text-sm text-white/70 group-hover:text-white font-medium transition-colors duration-300">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Desktop/Tablet Content */}
      <div className="container relative z-10 mx-auto px-6 pb-32 lg:px-8 hidden md:flex md:items-center md:h-full" style={{ paddingTop: '3em' }}>
        <div className="max-w-4xl">
          <h1 className="text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-10 lg:mb-4 animate-fade-in leading-[1.05] text-balance tracking-tight">
            ARMAX LOGISTICS — интеллект в движении
          </h1>
          <p className="text-xl lg:text-2xl xl:text-3xl text-white/90 mb-14 lg:mb-16 animate-fade-in font-light leading-[1.5]" style={{ animationDelay: '0.15s' }}>
            Умные решения для импортной логистики<br />и таможенного оформления
          </p>
          <div className="animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <Button
              asChild
              size="lg"
              className="text-xl lg:text-2xl px-10 lg:px-[2rem] py-6 lg:py-[1.5rem] h-auto group shadow-glow hover:shadow-[0_20px_60px_-10px_hsl(14_90%_53%/0.4)] hover:scale-110 hover:-translate-y-2 transition-all duration-500 ease-out"
            >
              <Link to="/contacts">
                Рассчитать доставку
                <ArrowRight className="ml-3 h-6 w-6 transition-transform duration-300 group-hover:translate-x-2" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
