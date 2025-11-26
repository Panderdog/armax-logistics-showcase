import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Phone, Mail, MessageCircle } from "lucide-react";

const CTASection = () => {
  return (
    <section className="relative py-24 lg:py-32 overflow-hidden">
      {/* Background image with overlay */}
      <div className="absolute inset-0 bg-[url('/nightport.jpg')] bg-cover bg-center bg-fixed" />
      <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/95 to-primary/80" />
      
      {/* Animated gradient orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/20 rounded-full blur-[128px] animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-[128px] animate-pulse" style={{ animationDelay: '1s' }} />

      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <span className="inline-block px-4 py-1.5 mb-8 text-sm font-medium text-accent bg-accent/20 rounded-full border border-accent/30 backdrop-blur-sm">
            Начните прямо сейчас
          </span>

          {/* Main heading */}
          <h2 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-6 tracking-tight leading-[1.1]">
            Готовы оптимизировать
            <br />
            <span className="text-accent">вашу логистику?</span>
          </h2>

          {/* Description */}
          <p className="text-xl lg:text-2xl text-white/70 mb-12 font-light leading-relaxed max-w-2xl mx-auto">
            Получите персональное предложение в течение 30 минут. Расскажите нам о вашем грузе.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Button
              asChild
              size="lg"
              className="text-lg px-10 py-7 h-auto group shadow-glow hover:shadow-[0_20px_60px_-10px_hsl(14_90%_53%/0.5)] hover:scale-105 transition-all duration-500"
            >
              <Link to="/contacts">
                Получить расчёт бесплатно
                <ArrowRight className="ml-3 h-6 w-6 transition-transform group-hover:translate-x-2" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="text-lg px-10 py-7 h-auto bg-white/5 border-2 border-white/20 text-white hover:bg-white hover:text-primary hover:border-white transition-all duration-500 backdrop-blur-sm"
            >
              <a href="tel:+78126440291">
                <Phone className="mr-2 h-5 w-5" />
                Позвонить сейчас
              </a>
            </Button>
          </div>

          {/* Contact options */}
          <div className="flex flex-wrap items-center justify-center gap-8 text-white/60">
            <a 
              href="tel:+78126440291" 
              className="flex items-center gap-2 hover:text-white transition-colors group"
            >
              <Phone className="h-5 w-5 text-accent group-hover:scale-110 transition-transform" />
              <span>+7 (812) 644-02-91</span>
            </a>
            <a 
              href="mailto:info@armaxstp.com" 
              className="flex items-center gap-2 hover:text-white transition-colors group"
            >
              <Mail className="h-5 w-5 text-accent group-hover:scale-110 transition-transform" />
              <span>info@armaxstp.com</span>
            </a>
            <a 
              href="https://wa.me/78126440291" 
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-white transition-colors group"
            >
              <MessageCircle className="h-5 w-5 text-accent group-hover:scale-110 transition-transform" />
              <span>WhatsApp</span>
            </a>
          </div>
        </div>
      </div>

      {/* Bottom wave decoration */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg 
          viewBox="0 0 1440 120" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-auto"
          preserveAspectRatio="none"
        >
          <path 
            d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" 
            fill="hsl(var(--background))"
          />
        </svg>
      </div>
    </section>
  );
};

export default CTASection;

