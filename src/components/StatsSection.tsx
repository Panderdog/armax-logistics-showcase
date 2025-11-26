import { useEffect, useRef, useState } from "react";
import { Globe, Package, Clock, Award } from "lucide-react";

interface StatItem {
  value: number;
  suffix: string;
  label: string;
  icon: React.ElementType;
  description: string;
}

const stats: StatItem[] = [
  {
    value: 15,
    suffix: "+",
    label: "лет на рынке",
    icon: Award,
    description: "Стабильная работа с 2009 года",
  },
  {
    value: 20,
    suffix: "+",
    label: "стран партнёров",
    icon: Globe,
    description: "Европа, Азия, СНГ",
  },
  {
    value: 5000,
    suffix: "+",
    label: "тонн грузов в год",
    icon: Package,
    description: "Любые объёмы и габариты",
  },
  {
    value: 99,
    suffix: "%",
    label: "доставок вовремя",
    icon: Clock,
    description: "Пунктуальность — наш приоритет",
  },
];

const AnimatedCounter = ({ 
  value, 
  suffix, 
  isVisible 
}: { 
  value: number; 
  suffix: string; 
  isVisible: boolean;
}) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isVisible) return;
    
    const duration = 2000;
    const steps = 60;
    const increment = value / steps;
    let current = 0;
    
    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);
    
    return () => clearInterval(timer);
  }, [value, isVisible]);

  return (
    <span className="tabular-nums">
      {count.toLocaleString()}{suffix}
    </span>
  );
};

const StatsSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

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

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-24 lg:py-32 bg-primary overflow-hidden"
    >
      {/* Atmospheric background */}
      <div className="absolute inset-0 bg-[url('/nightport.jpg')] bg-cover bg-center opacity-15" />
      <div className="absolute inset-0 bg-gradient-to-b from-primary via-primary/90 to-primary" />
      
      {/* Animated gradient orb */}
      <div className="absolute top-1/3 left-1/4 w-64 h-64 bg-accent/15 rounded-full blur-[100px] animate-pulse" />

      {/* Grid pattern overlay */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }}
      />

      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        {/* Section header */}
        <div className="text-center mb-16 lg:mb-20">
          <span className="inline-block px-4 py-1.5 mb-6 text-sm font-medium text-accent bg-accent/10 rounded-full border border-accent/20">
            Наши достижения
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight">
            Цифры, которые говорят
            <br />
            <span className="text-accent">сами за себя</span>
          </h2>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="group relative"
              style={{ 
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
                transition: `all 0.8s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.1}s`
              }}
            >
              <div className="relative p-6 lg:p-8 rounded-3xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-accent/30 hover:bg-white/10 transition-all duration-500 h-full">
                {/* Icon */}
                <div className="mb-6 inline-flex p-4 rounded-2xl bg-accent/10 text-accent group-hover:bg-accent group-hover:text-white transition-all duration-500">
                  <stat.icon className="h-6 w-6 lg:h-8 lg:w-8" strokeWidth={1.5} />
                </div>

                {/* Number */}
                <div className="text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-2 tracking-tight">
                  <AnimatedCounter 
                    value={stat.value} 
                    suffix={stat.suffix} 
                    isVisible={isVisible}
                  />
                </div>

                {/* Label */}
                <div className="text-lg lg:text-xl font-semibold text-white/90 mb-2">
                  {stat.label}
                </div>

                {/* Description */}
                <div className="text-sm text-white/50 group-hover:text-white/70 transition-colors">
                  {stat.description}
                </div>

                {/* Hover glow effect */}
                <div className="absolute inset-0 rounded-3xl bg-accent/0 group-hover:bg-accent/5 transition-all duration-500 pointer-events-none" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;

