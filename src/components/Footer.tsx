import { Link } from "react-router-dom";
import { Mail, Phone, MapPin } from "lucide-react";
import armaxLogo from "@/assets/armax-logo.svg";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-primary to-primary-dark text-primary-foreground">
      <div className="container mx-auto px-6 py-16 lg:px-8 lg:py-20">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Company Info */}
          <div className="space-y-6">
            <img src={armaxLogo} alt="Armax Logistics" className="h-9 w-auto brightness-0 invert" />
            <p className="text-[15px] text-primary-foreground/70 leading-relaxed font-light">
              Надёжные международные перевозки по Европе и Азии
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-6 text-base font-bold tracking-wide">Навигация</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/services" className="text-[15px] text-primary-foreground/70 hover:text-primary-foreground hover:text-accent transition-all duration-300 ease-out hover:translate-x-2 inline-block font-light relative group">
                  <span className="relative">Услуги
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-accent group-hover:w-full transition-all duration-300"></span>
                  </span>
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-[15px] text-primary-foreground/70 hover:text-primary-foreground hover:text-accent transition-all duration-300 ease-out hover:translate-x-2 inline-block font-light relative group">
                  <span className="relative">О компании
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-accent group-hover:w-full transition-all duration-300"></span>
                  </span>
                </Link>
              </li>
              <li>
                <Link to="/geography" className="text-[15px] text-primary-foreground/70 hover:text-primary-foreground hover:text-accent transition-all duration-300 ease-out hover:translate-x-2 inline-block font-light relative group">
                  <span className="relative">География
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-accent group-hover:w-full transition-all duration-300"></span>
                  </span>
                </Link>
              </li>
              <li>
                <Link to="/reviews" className="text-[15px] text-primary-foreground/70 hover:text-primary-foreground hover:text-accent transition-all duration-300 ease-out hover:translate-x-2 inline-block font-light relative group">
                  <span className="relative">Отзывы
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-accent group-hover:w-full transition-all duration-300"></span>
                  </span>
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-[15px] text-primary-foreground/70 hover:text-primary-foreground hover:text-accent transition-all duration-300 ease-out hover:translate-x-2 inline-block font-light relative group">
                  <span className="relative">FAQ
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-accent group-hover:w-full transition-all duration-300"></span>
                  </span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="mb-6 text-base font-bold tracking-wide">Услуги</h3>
            <ul className="space-y-3">
              <li className="text-[15px] text-primary-foreground/70 font-light leading-relaxed">Международные автоперевозки</li>
              <li className="text-[15px] text-primary-foreground/70 font-light leading-relaxed">Морские перевозки</li>
              <li className="text-[15px] text-primary-foreground/70 font-light leading-relaxed">Авиа-доставка</li>
              <li className="text-[15px] text-primary-foreground/70 font-light leading-relaxed">Таможенное оформление</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="mb-6 text-base font-bold tracking-wide">Контакты</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 group cursor-pointer">
                <Phone className="h-5 w-5 mt-0.5 text-accent group-hover:scale-125 transition-all duration-300 ease-out" strokeWidth={2} />
                <span className="text-[15px] text-primary-foreground/70 group-hover:text-primary-foreground transition-colors duration-300 font-light">+7 (812) 644-02-91</span>
              </li>
              <li className="flex items-start gap-3 group cursor-pointer">
                <Mail className="h-5 w-5 mt-0.5 text-accent group-hover:scale-125 transition-all duration-300 ease-out" strokeWidth={2} />
                <span className="text-[15px] text-primary-foreground/70 group-hover:text-primary-foreground transition-colors duration-300 font-light">info@armaxstp.com</span>
              </li>
              <li className="flex items-start gap-3 group cursor-pointer">
                <MapPin className="h-5 w-5 mt-0.5 text-accent group-hover:scale-125 transition-all duration-300 ease-out" strokeWidth={2} />
                <span className="text-[15px] text-primary-foreground/70 group-hover:text-primary-foreground transition-colors duration-300 font-light">Санкт-Петербург</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-primary-foreground/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[13px] text-primary-foreground/50 font-light">
            © 2025 Armax Logistics. Все права защищены.
          </p>
          <div className="flex gap-8">
            <Link to="/privacy" className="text-[13px] text-primary-foreground/50 hover:text-primary-foreground/90 hover:text-accent transition-all duration-300 ease-out font-light relative group">
              <span className="relative">Политика конфиденциальности
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-accent group-hover:w-full transition-all duration-300"></span>
              </span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
