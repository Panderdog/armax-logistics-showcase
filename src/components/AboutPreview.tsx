import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const AboutPreview = () => {
  return (
    <section className="py-16 lg:py-20 bg-background">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">
          {/* Image */}
          <div className="relative animate-fade-in">
            <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-large">
              <img
                src="https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?q=80&w=2070"
                alt="Logistics"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Decorative elements with subtle colors */}
            <div className="absolute -bottom-8 -right-8 w-56 h-56 bg-gradient-to-br from-accent/10 to-accent/5 rounded-3xl -z-10 blur-2xl" />
            <div className="absolute -top-8 -left-8 w-56 h-56 bg-gradient-to-br from-primary/10 to-primary/5 rounded-3xl -z-10 blur-2xl" />
          </div>

          {/* Content */}
          <div className="space-y-8 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-[1.1] text-balance">
              О компании Armax Logistics
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground font-light leading-relaxed">
              Мы специализируемся на международных перевозках грузов, обеспечивая надёжную доставку по всей Европе и Азии.
            </p>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
              За 16+ лет работы мы выстроили надёжную логистическую сеть, собрали команду профессионалов и заработали доверие сотен клиентов. Наша миссия — сделать международную логистику простой, прозрачной и эффективной.
            </p>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-6 pt-4">
              <div className="group p-6 lg:p-8 rounded-2xl border border-border/50 bg-gradient-to-br from-secondary/50 to-background hover:border-accent/30 hover:scale-105 hover:-translate-y-2 transition-all duration-500 ease-out hover:shadow-large cursor-default">
                <div className="text-4xl lg:text-5xl font-bold text-foreground mb-2 tracking-tight group-hover:text-accent group-hover:scale-110 transition-all duration-300">1 000+</div>
                <div className="text-sm lg:text-base text-muted-foreground group-hover:text-foreground font-medium transition-colors duration-300">деклараций в 2025</div>
              </div>
              <div className="group p-6 lg:p-8 rounded-2xl border border-border/50 bg-gradient-to-br from-secondary/50 to-background hover:border-accent/30 hover:scale-105 hover:-translate-y-2 transition-all duration-500 ease-out hover:shadow-large cursor-default">
                <div className="text-4xl lg:text-5xl font-bold text-foreground mb-2 tracking-tight group-hover:text-accent group-hover:scale-110 transition-all duration-300">16+</div>
                <div className="text-sm lg:text-base text-muted-foreground group-hover:text-foreground font-medium transition-colors duration-300">лет на рынке</div>
              </div>
            </div>

            <Button
              asChild
              size="lg"
              className="group mt-6"
            >
              <Link to="/about">
                Подробнее о компании
                <ArrowRight className="ml-2.5 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1.5" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutPreview;
