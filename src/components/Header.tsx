import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigation = [
    { name: "Главная", href: "/" },
    { name: "Услуги", href: "/services" },
    { name: "О компании", href: "/about" },
    { name: "География", href: "/geography" },
    { name: "Отзывы", href: "/reviews" },
    { name: "FAQ", href: "/faq" },
    { name: "Контакты", href: "/contacts" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60">
      <nav className="container mx-auto flex items-center justify-between px-6 py-4 lg:px-8">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img src="/logo.svg" alt="Armax Logistics" className="h-9 w-auto" />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex lg:items-center lg:gap-1">
          {navigation.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className="group relative px-4 py-2 text-[13px] font-medium transition-all duration-300 ease-out rounded-lg text-muted-foreground hover:text-foreground hover:[text-shadow:0_0_0.5px_currentColor,0_0_0.5px_currentColor]"
            >
              {item.name}
              {/* Animated underline */}
              <span className="absolute bottom-1 left-4 right-4 h-[2px] bg-[#223A5E] origin-right scale-x-0 transition-transform duration-300 ease-out group-hover:origin-left group-hover:scale-x-100"></span>
            </Link>
          ))}
        </div>

        {/* CTA Button */}
        <div className="hidden lg:block">
          <Button
            asChild
            size="default"
          >
            <Link to="/contacts">Отправить заявку</Link>
          </Button>
        </div>

        {/* Mobile menu button */}
        <button
          type="button"
          className="lg:hidden p-2 rounded-lg hover:bg-secondary hover:scale-110 transition-all duration-300 ease-out"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? (
            <X className="h-6 w-6 text-foreground transition-transform duration-300" />
          ) : (
            <Menu className="h-6 w-6 text-foreground transition-transform duration-300" />
          )}
        </button>
      </nav>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-border bg-background">
          <div className="space-y-1 px-4 pb-3 pt-2">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="block rounded-md px-3 py-2 text-base font-medium transition-all duration-300 ease-out text-foreground hover:bg-secondary hover:translate-x-1 hover:shadow-soft"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <div className="pt-4">
              <Button
                asChild
                className="w-full"
              >
                <Link to="/contacts" onClick={() => setMobileMenuOpen(false)}>
                  Отправить заявку
                </Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
