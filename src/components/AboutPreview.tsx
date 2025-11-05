import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const AboutPreview = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <div className="relative">
            <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?q=80&w=2070"
                alt="Logistics"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-accent/10 rounded-2xl -z-10" />
            <div className="absolute -top-6 -left-6 w-48 h-48 bg-primary/10 rounded-2xl -z-10" />
          </div>

          {/* Content */}
          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              О компании Armax Logistics
            </h2>
            <p className="text-lg text-muted-foreground">
              Мы специализируемся на международных перевозках грузов, обеспечивая надёжную доставку по всей Европе и Азии.
            </p>
            <p className="text-muted-foreground">
              За +15 лет работы мы выстроили надёжную логистическую сеть, собрали команду профессионалов и заработали доверие сотен клиентов. Наша миссия — сделать международную логистику простой, прозрачной и эффективной.
            </p>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-6 pt-6">
              <div className="p-4 rounded-lg border border-border">
                <div className="text-3xl font-bold text-primary mb-1">20+</div>
                <div className="text-sm text-muted-foreground">стран партнёров</div>
              </div>
              <div className="p-4 rounded-lg border border-border">
                <div className="text-3xl font-bold text-primary mb-1">+15</div>
                <div className="text-sm text-muted-foreground">лет на рынке</div>
              </div>
            </div>

            <Button
              asChild
              className="transition-all duration-300 group mt-6"
            >
              <Link to="/about">
                Подробнее о компании
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutPreview;
