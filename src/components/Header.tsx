import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useApplicationModal } from "@/contexts/ApplicationModalContext";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { openApplicationModal } = useApplicationModal();

  const navigation = [
    { name: "Главная", href: "/" },
    { name: "Услуги", href: "/services" },
    { name: "О компании", href: "/about" },
    { name: "География", href: "/geography" },
    { name: "Новости", href: "/news" },
    { name: "Отзывы", href: "/reviews" },
    { name: "FAQ", href: "/faq" },
    { name: "Контакты", href: "/contacts" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60">
      <nav className="container mx-auto flex items-center justify-between px-4 sm:px-6 py-4 lg:px-8">
        {/* Logo */}
        <Link 
          to="/" 
          className="flex items-center"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <img src="/logo.svg" alt="Armax Logistics" className="h-9 w-auto" />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex lg:items-center lg:gap-1">
          {navigation.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.name}
                to={item.href}
                className={`group relative px-4 py-2 text-[13px] font-medium transition-all duration-300 ease-out rounded-lg ${
                  isActive 
                    ? 'text-foreground [text-shadow:0_0_0.5px_currentColor,0_0_0.5px_currentColor]' 
                    : 'text-muted-foreground hover:text-foreground hover:[text-shadow:0_0_0.5px_currentColor,0_0_0.5px_currentColor]'
                }`}
              >
                {item.name}
                {/* Underline: static for active, animated for inactive */}
                <span 
                  className={`absolute bottom-1 left-4 right-4 h-[2px] bg-[#223A5E] ${
                    isActive 
                      ? 'scale-x-100' 
                      : 'origin-right scale-x-0 transition-transform duration-300 ease-out group-hover:origin-left group-hover:scale-x-100'
                  }`}
                ></span>
              </Link>
            );
          })}
        </div>

        {/* CTA Button */}
        <div className="hidden lg:block">
          <Button
            size="default"
            onClick={openApplicationModal}
          >
            Отправить заявку
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

      {/* Mobile menu - внутри header как его продолжение */}
      {mobileMenuOpen && (
        <div className="lg:hidden">
          {/* Overlay за пределами header */}
          <div 
            className="fixed inset-0 top-0 bg-black/30 -z-10"
            onClick={() => setMobileMenuOpen(false)}
          />
          {/* Меню - часть header */}
          <div className="px-4 sm:px-6 pt-2 pb-4 space-y-1">
            {navigation.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`group relative block px-4 py-3 text-base font-medium transition-all duration-300 ease-out rounded-lg ${
                    isActive 
                      ? 'text-foreground [text-shadow:0_0_0.5px_currentColor,0_0_0.5px_currentColor]' 
                      : 'text-foreground/75 hover:text-foreground hover:bg-secondary/30'
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                  {/* Левая акцентная линия для активного пункта */}
                  {isActive && (
                    <span className="absolute left-0 top-2 bottom-2 w-1 bg-[#E85D3E] rounded-r-full"></span>
                  )}
                </Link>
              );
            })}
            <div className="pt-3">
              <Button
                className="w-full"
                size="default"
                onClick={() => {
                  setMobileMenuOpen(false);
                  openApplicationModal();
                }}
              >
                Отправить заявку
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
