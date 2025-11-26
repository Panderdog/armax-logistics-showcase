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
    <section className="relative h-[calc(100vh-var(--header-height))] flex items-center justify-center overflow-hidden bg-primary">
      {/* Mobile Background - Image with Overlay */}
      <div className="absolute inset-0 z-0 md:hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=2070')] bg-cover bg-center opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-b from-primary/95 via-primary/90 to-primary" />
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
        
        {/* Gradient Overlay - чистый и читаемый */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/70 to-primary/40" />
        <div className="absolute inset-0 bg-gradient-to-b from-primary/20 via-transparent to-primary" />
      </div>

      {/* Bottom fade transition */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-primary via-primary/90 to-transparent z-[5]" />
      
      {/* Subtle accent divider */}
      <div className="absolute bottom-0 left-0 right-0 z-[6]">
        <div className="h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />
      </div>

      {/* Mobile Content */}
      <div className="container relative z-10 mx-auto px-6 pb-24 md:hidden pt-12">
        <div className="max-w-xl mx-auto text-center">
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-6 animate-fade-in leading-[1.1] tracking-tight">
            ARMAX LOGISTICS — надёжные международные перевозки без задержек
          </h1>
          <p className="text-base sm:text-lg text-white/80 mb-10 animate-fade-in font-light leading-relaxed" style={{ animationDelay: '0.15s' }}>
            Организуем доставку по 20+ странам Европы и Азии
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <Button
              asChild
              size="lg"
              className="text-base px-8 py-6 h-auto group shadow-glow hover:shadow-[0_20px_60px_-10px_hsl(14_90%_53%/0.5)] hover:scale-105 transition-all duration-500"
            >
              <Link to="/contacts">
                Получить предложение
                <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1.5" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="text-base px-8 py-6 h-auto bg-white/5 border-2 border-white/20 text-white hover:bg-white hover:text-primary hover:border-white transition-all duration-500 backdrop-blur-sm"
            >
              <Link to="/services">Наши услуги</Link>
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-2 gap-4 max-w-md mx-auto">
          {[
            { value: "15+", label: "лет опыта" },
            { value: "20+", label: "стран партнёров" },
            { value: "99%", label: "доставок вовремя" },
            { value: "5000+", label: "тонн грузов/год" },
          ].map((stat, index) => (
            <div
              key={index}
              className="group text-center p-5 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 animate-fade-in hover:bg-white/10 hover:border-accent/30 transition-all duration-500 cursor-default"
              style={{ animationDelay: `${0.45 + index * 0.1}s` }}
            >
              <div className="text-2xl sm:text-3xl font-bold text-white group-hover:text-accent mb-1 tracking-tight transition-colors duration-300">{stat.value}</div>
              <div className="text-xs sm:text-sm text-white/60 group-hover:text-white/80 font-medium transition-colors duration-300">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Desktop/Tablet Content */}
      <div className="container relative z-10 mx-auto px-6 lg:px-8 hidden md:flex md:items-center md:h-full">
        <div className="max-w-3xl">
          <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-6 animate-fade-in leading-[1.1] tracking-tight">
            ARMAX LOGISTICS — <span className="text-accent">интеллект в движении</span>
          </h1>
          <p className="text-lg lg:text-xl xl:text-2xl text-white/80 mb-10 animate-fade-in font-light leading-relaxed" style={{ animationDelay: '0.15s' }}>
            Умные решения для импортной логистики<br />и таможенного оформления
          </p>
          <div className="animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <Button
              asChild
              size="lg"
              className="text-base lg:text-lg px-8 lg:px-10 py-6 lg:py-7 h-auto group shadow-glow hover:shadow-[0_20px_60px_-10px_hsl(14_90%_53%/0.5)] hover:scale-105 transition-all duration-500"
            >
              <Link to="/contacts">
                Рассчитать доставку
                <ArrowRight className="ml-3 h-5 w-5 lg:h-6 lg:w-6 transition-transform duration-300 group-hover:translate-x-2" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
