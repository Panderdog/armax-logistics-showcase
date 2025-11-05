import { Link } from "react-router-dom";
import { Mail, Phone, MapPin } from "lucide-react";
import armaxLogo from "@/assets/armax-logo.svg";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-12 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Company Info */}
          <div className="space-y-4">
            <img src={armaxLogo} alt="Armax Logistics" className="h-8 w-auto brightness-0 invert" />
            <p className="text-sm text-primary-foreground/80">
              Надёжные международные перевозки по Европе и Азии
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 text-lg font-semibold">Навигация</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/services" className="text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Услуги
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  О компании
                </Link>
              </li>
              <li>
                <Link to="/geography" className="text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  География
                </Link>
              </li>
              <li>
                <Link to="/reviews" className="text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Отзывы
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="mb-4 text-lg font-semibold">Услуги</h3>
            <ul className="space-y-2">
              <li className="text-sm text-primary-foreground/80">Международные автоперевозки</li>
              <li className="text-sm text-primary-foreground/80">Морские перевозки</li>
              <li className="text-sm text-primary-foreground/80">Авиа-доставка</li>
              <li className="text-sm text-primary-foreground/80">Таможенное оформление</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="mb-4 text-lg font-semibold">Контакты</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <Phone className="h-5 w-5 mt-0.5 text-accent" />
                <span className="text-sm text-primary-foreground/80">+7 (812) 644-02-91</span>
              </li>
              <li className="flex items-start gap-2">
                <Mail className="h-5 w-5 mt-0.5 text-accent" />
                <span className="text-sm text-primary-foreground/80">info@armaxstp.com</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="h-5 w-5 mt-0.5 text-accent" />
                <span className="text-sm text-primary-foreground/80">Санкт-Петербург</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-primary-foreground/20 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-primary-foreground/60">
            © 2025 Armax Logistics. Все права защищены.
          </p>
          <div className="flex gap-6">
            <Link to="/privacy" className="text-sm text-primary-foreground/60 hover:text-primary-foreground transition-colors">
              Политика конфиденциальности
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
