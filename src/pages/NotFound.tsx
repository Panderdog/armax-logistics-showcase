import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-secondary/50 to-background">
      <div className="text-center px-6 max-w-2xl mx-auto">
        <div className="mb-8 animate-fade-in">
          <h1 className="mb-6 text-9xl md:text-[12rem] font-bold text-foreground/10 tracking-tighter">404</h1>
        </div>
        <h2 className="mb-6 text-4xl md:text-5xl font-bold text-foreground animate-fade-in tracking-tight" style={{ animationDelay: '0.1s' }}>
          Страница не найдена
        </h2>
        <p className="mb-10 text-lg md:text-xl text-muted-foreground font-light animate-fade-in leading-relaxed" style={{ animationDelay: '0.2s' }}>
          К сожалению, запрашиваемая страница не существует или была перемещена
        </p>
        <div className="animate-fade-in" style={{ animationDelay: '0.3s' }}>
          <Button asChild size="lg">
            <Link to="/">
              <Home className="mr-2 h-5 w-5" />
              Вернуться на главную
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
