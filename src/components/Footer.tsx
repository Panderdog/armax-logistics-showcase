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
            <Link 
              to="/" 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              <img src={armaxLogo} alt="Armax Logistics" className="h-9 w-auto brightness-0 invert" />
            </Link>
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
              <li>
                <Link to="/services?service=auto" className="text-[15px] text-primary-foreground/70 hover:text-primary-foreground hover:text-accent transition-all duration-300 ease-out hover:translate-x-2 inline-block font-light relative group">
                  <span className="relative">Международные автоперевозки
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-accent group-hover:w-full transition-all duration-300"></span>
                  </span>
                </Link>
              </li>
              <li>
                <Link to="/services?service=sea" className="text-[15px] text-primary-foreground/70 hover:text-primary-foreground hover:text-accent transition-all duration-300 ease-out hover:translate-x-2 inline-block font-light relative group">
                  <span className="relative">Морские перевозки
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-accent group-hover:w-full transition-all duration-300"></span>
                  </span>
                </Link>
              </li>
              <li>
                <Link to="/services?service=aviation" className="text-[15px] text-primary-foreground/70 hover:text-primary-foreground hover:text-accent transition-all duration-300 ease-out hover:translate-x-2 inline-block font-light relative group">
                  <span className="relative">Авиаперевозки
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-accent group-hover:w-full transition-all duration-300"></span>
                  </span>
                </Link>
              </li>
              <li>
                <Link to="/services?service=customs" className="text-[15px] text-primary-foreground/70 hover:text-primary-foreground hover:text-accent transition-all duration-300 ease-out hover:translate-x-2 inline-block font-light relative group">
                  <span className="relative">Таможенное оформление
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-accent group-hover:w-full transition-all duration-300"></span>
                  </span>
                </Link>
              </li>
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
                <span className="text-[15px] text-primary-foreground/70 group-hover:text-primary-foreground transition-colors duration-300 font-light">Санкт-Петербург, Горское шоссе, 4</span>
              </li>
            </ul>
            {/* Social Links */}
            <div className="flex gap-4 mt-6">
              <a 
                href="https://t.me/armaxlogistics" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-primary-foreground/10 hover:bg-accent hover:scale-110 transition-all duration-300 ease-out group"
                aria-label="Telegram"
              >
                <svg className="h-5 w-5 text-primary-foreground/70 group-hover:text-white transition-colors" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                </svg>
              </a>
              <a 
                href="https://wa.me/78126440291" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-primary-foreground/10 hover:bg-accent hover:scale-110 transition-all duration-300 ease-out group"
                aria-label="WhatsApp"
              >
                <svg className="h-5 w-5 text-primary-foreground/70 group-hover:text-white transition-colors" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
              </a>
            </div>
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
