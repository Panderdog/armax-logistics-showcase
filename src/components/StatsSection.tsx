import { useEffect, useState } from "react";
import { FileText, Package, Clock, Award } from "lucide-react";
import { useInView } from "@/hooks/useInView";

interface StatItem {
  value: number;
  suffix: string;
  label: string;
  icon: React.ElementType;
  description: string;
}

const stats: StatItem[] = [
  {
    value: 16,
    suffix: "+",
    label: "лет на рынке",
    icon: Award,
    description: "Стабильная работа с 2009 года",
  },
  {
    value: 1000,
    suffix: "+",
    label: "деклараций в 2025 году",
    icon: FileText,
    description: "Импорт и экспорт",
  },
  {
    value: 10000,
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
  const { ref: sectionRef, isInView: isVisible } = useInView({ threshold: 0.2 });

  return (
    <section
      ref={sectionRef}
      className="relative pt-0 sm:pt-12 lg:pt-24 xl:pt-32 pb-12 sm:pb-14 lg:pb-16 xl:pb-20 bg-[#0a0f1a] overflow-hidden"
    >
      {/* Atmospheric background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-transparent" />

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
        <div className="text-center mb-10 sm:mb-12 lg:mb-16 xl:mb-20">
          <span className="inline-block px-3 py-1 sm:px-4 sm:py-1.5 mb-4 sm:mb-6 text-xs sm:text-sm font-medium text-accent bg-accent/10 rounded-full border border-accent/20">
            Наши достижения
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-4 sm:mb-6 tracking-tight leading-tight">
            Цифры, которые говорят
            <br />
            <span className="text-accent">сами за себя</span>
          </h2>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 xl:gap-8">
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
              <div className="relative p-4 sm:p-6 lg:p-8 rounded-2xl lg:rounded-3xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-accent/30 hover:bg-white/10 transition-all duration-500 h-full flex flex-col">
                {/* Icon */}
                <div className="mb-3 sm:mb-4 lg:mb-6 inline-flex p-2.5 sm:p-3 lg:p-4 rounded-xl lg:rounded-2xl bg-accent/10 text-accent group-hover:bg-accent group-hover:text-white transition-all duration-500 self-start">
                  <stat.icon className="h-5 w-5 sm:h-6 sm:w-6 lg:h-8 lg:w-8" strokeWidth={1.5} />
                </div>

                {/* Number */}
                <div className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-1 sm:mb-2 tracking-tight leading-none">
                  <AnimatedCounter 
                    value={stat.value} 
                    suffix={stat.suffix} 
                    isVisible={isVisible}
                  />
                </div>

                {/* Label */}
                <div className="text-sm sm:text-base lg:text-lg xl:text-xl font-semibold text-white/90 mb-1 sm:mb-2 leading-snug">
                  {stat.label}
                </div>

                {/* Description */}
                <div className="text-xs sm:text-sm text-white/50 group-hover:text-white/70 transition-colors leading-relaxed">
                  {stat.description}
                </div>

                {/* Hover glow effect */}
                <div className="absolute inset-0 rounded-3xl bg-accent/0 group-hover:bg-accent/5 transition-all duration-500 pointer-events-none" />
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Accent divider after stats */}
      <div className="absolute bottom-0 left-0 right-0">
        <div className="h-0.5 bg-gradient-to-r from-transparent via-accent/40 to-transparent" />
      </div>
    </section>
  );
};

export default StatsSection;

