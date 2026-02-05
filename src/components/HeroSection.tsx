import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronDown } from "lucide-react";
import { useState, useEffect } from "react";
import { useApplicationModal } from "@/contexts/ApplicationModalContext";

const HeroSection = () => {
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const [showScrollIndicator, setShowScrollIndicator] = useState(true);
  const [isDesktop, setIsDesktop] = useState(false);
  const { openApplicationModal } = useApplicationModal();

  // Определяем размер экрана - видео загружается ТОЛЬКО на desktop/tablet
  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 768px)');
    
    const handleMediaChange = (e: MediaQueryListEvent | MediaQueryList) => {
      setIsDesktop(e.matches);
    };
    
    // Начальная проверка
    handleMediaChange(mediaQuery);
    
    // Подписка на изменения
    mediaQuery.addEventListener('change', handleMediaChange);
    return () => mediaQuery.removeEventListener('change', handleMediaChange);
  }, []);

  useEffect(() => {
    // Загружаем видео только на desktop/tablet
    if (!isDesktop) return;
    
    const video = document.getElementById('hero-video') as HTMLVideoElement;
    if (video) {
      video.addEventListener('loadeddata', () => setVideoLoaded(true));
      video.addEventListener('error', () => setVideoError(true));
    }
  }, [isDesktop]);

  useEffect(() => {
    // Hide scroll indicator after scrolling down
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      // Hide after 80-120px scroll (using 100px as middle value)
      setShowScrollIndicator(scrollPosition < 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="relative min-h-screen-dynamic flex items-center justify-center overflow-hidden bg-primary pt-[var(--header-height)]">
      {/* Mobile Background - Image with Overlay */}
      <div className="absolute inset-0 z-0 md:hidden overflow-hidden">
        <div 
          className="absolute w-full h-full"
          style={{
            backgroundImage: "url('/images/armax_hero_9x16_right.webp')",
            backgroundSize: 'cover',
            backgroundPosition: 'left',
            backgroundRepeat: 'no-repeat',
            transform: 'scaleX(-1)',
            left: 0,
            right: 0,
            top: 0,
            bottom: 0
          }}
        />
        {/* Vertical gradient - top to bottom */}
        <div className="absolute inset-0 bg-gradient-to-b from-primary/75 via-primary/60 to-[#0a0f1a]" />
        {/* Horizontal gradient - darker on left (text area), lighter on right (port/containers) */}
        <div 
          className="absolute inset-0"
          style={{
            background: `linear-gradient(90deg,
              rgba(15,22,36,0.70) 0%,
              rgba(15,22,36,0.05) 45%,
              transparent 55%,
              transparent 100%
            )`
          }}
        />
      </div>

      {/* Desktop/Tablet Background - Video with Overlay - рендерится ТОЛЬКО на desktop/tablet */}
      {isDesktop && (
        <div className="absolute inset-0 z-0">
          {/* Poster/Fallback Background - показывается пока видео грузится или при ошибке */}
          <div 
            className={`absolute inset-0 bg-[url('/images/ship.webp')] bg-cover bg-center transition-opacity duration-1000 ${
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
              preload="metadata"
              poster="/images/ship.webp"
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
                videoLoaded ? 'opacity-100' : 'opacity-0'
              }`}
              aria-label="Фоновое видео морских грузовых перевозок и логистики"
            >
              <source src="/video/compress-hero-video.webm" type="video/webm" />
              <source src="/video/compress-hero-video.mp4" type="video/mp4" />
              Ваш браузер не поддерживает видео.
            </video>
          )}
          
          {/* Gradient Overlay - чистый и читаемый */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/70 to-primary/40" />
          <div className="absolute inset-0 bg-gradient-to-b from-primary/20 via-transparent to-[#0a0f1a]" />
        </div>
      )}

      {/* Bottom fade transition to next section */}
      <div className="absolute bottom-0 left-0 right-0 h-24 md:h-48 bg-gradient-to-t from-[#0a0f1a] via-[#0a0f1a]/80 to-transparent z-[5]" />
      
      {/* Scroll indicator - mobile version (premium chevrons) - aligned with trust badge */}
      <div 
        className={`absolute bottom-28 right-6 z-[6] md:hidden flex flex-col items-center gap-1 pointer-events-none transition-opacity duration-500 ${
          showScrollIndicator ? 'opacity-100' : 'opacity-0'
        }`}
        aria-label="Прокрутите вниз"
      >
        <ChevronDown 
          className="w-5 h-5 text-accent animate-chevron-1" 
          strokeWidth={2.5}
        />
        <ChevronDown 
          className="w-5 h-5 text-accent animate-chevron-2 -mt-2" 
          strokeWidth={2.5}
        />
        <ChevronDown 
          className="w-5 h-5 text-accent animate-chevron-3 -mt-2" 
          strokeWidth={2.5}
        />
      </div>

      {/* Scroll indicator - desktop version */}
      <div 
        className={`fixed bottom-0 left-0 right-0 z-[6] hidden md:flex justify-center pointer-events-none transition-opacity duration-500 ${
          showScrollIndicator ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div className="flex flex-col items-center gap-2 animate-bounce -mb-6">
          <span className="text-white/40 text-xs font-medium tracking-wider uppercase">Прокрутите</span>
          <div className="w-6 h-10 rounded-full border-2 border-white/20 flex items-start justify-center p-2">
            <div className="w-1.5 h-3 bg-accent rounded-full animate-scroll-down" />
          </div>
        </div>
      </div>

      {/* Mobile Content - Premium minimal design */}
      <div className="container relative z-20 mx-auto px-5 md:hidden flex flex-col justify-end pb-24 hero-mobile-height">
        <div className="max-w-lg relative">
          {/* Local gradient overlay for text readability - premium effect */}
          <div className="absolute -inset-x-8 -inset-y-6 bg-gradient-to-b from-primary/60 via-primary/40 to-transparent blur-2xl -z-10" />
          
          <div className="relative">
            {/* Accent badge */}
            <div 
              className="inline-flex items-center gap-2 mb-6 animate-fade-in"
              style={{ animationDelay: '0.1s' }}
            >
              <span className="w-8 h-[1px] bg-accent" />
              <span className="text-xs font-medium tracking-[0.2em] uppercase text-accent">
                Логистика и таможня
              </span>
            </div>

            {/* Main heading - clean hierarchy */}
            <h1 className="text-[2rem] sm:text-[2.5rem] font-bold text-white mb-5 animate-fade-in leading-[1.15] tracking-tight">
              Международная логистика
              <br />
              <span className="text-accent">для бизнеса</span>
            </h1>

            {/* Subtitle - refined typography */}
            <p 
              className="text-base sm:text-lg text-white/80 mb-8 animate-fade-in font-normal leading-[1.6] max-w-sm"
              style={{ animationDelay: '0.15s' }}
            >
              Импорт и экспорт по направлениям Азии и Европы. Таможенное оформление под ключ.
            </p>
          </div>

            {/* Single CTA - organic and premium */}
            <div 
              className="animate-fade-in"
              style={{ animationDelay: '0.25s' }}
            >
              <Button
                size="lg"
                className="text-[15px] px-7 py-5 h-auto group bg-accent hover:bg-accent/90 shadow-[0_8px_30px_-8px_hsl(14_90%_53%/0.4)] hover:shadow-[0_12px_40px_-8px_hsl(14_90%_53%/0.5)] transition-all duration-400 rounded-xl"
                onClick={openApplicationModal}
              >
                Рассчитать доставку
                <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
            </div>

            {/* Trust indicator - subtle */}
            <div 
              className="mt-10 flex items-center gap-3 animate-fade-in"
              style={{ animationDelay: '0.4s' }}
            >
              <div className="flex -space-x-1">
                <div className="w-2 h-2 rounded-full bg-emerald-400" />
                <div className="w-2 h-2 rounded-full bg-emerald-400/60" />
                <div className="w-2 h-2 rounded-full bg-emerald-400/30" />
              </div>
              <span className="text-xs text-white/50 font-medium">
                Более 16 лет на рынке логистики
              </span>
            </div>
        </div>
      </div>

      {/* Desktop/Tablet Content */}
      <div className="container relative z-10 mx-auto px-6 lg:px-8 hidden md:flex md:items-center md:h-full">
        <div className="max-w-3xl">
          <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-6 animate-fade-in leading-[1.1] tracking-tight">
            ARMAX LOGISTICS — <span className="text-accent">интеллект в движении</span>
          </h1>
          <p className="text-lg lg:text-xl xl:text-2xl text-white/90 mb-10 animate-fade-in font-light leading-relaxed" style={{ animationDelay: '0.15s' }}>
            Умные решения для импортной логистики<br />и таможенного оформления
          </p>
          <div className="animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <Button
              size="lg"
              className="text-base lg:text-lg px-8 lg:px-10 py-6 lg:py-7 h-auto group shadow-glow hover:shadow-[0_20px_60px_-10px_hsl(14_90%_53%/0.5)] hover:scale-105 transition-all duration-500"
              onClick={openApplicationModal}
            >
              Рассчитать доставку
              <ArrowRight className="ml-3 h-5 w-5 lg:h-6 lg:w-6 transition-transform duration-300 group-hover:translate-x-2" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
