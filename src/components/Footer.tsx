import { Link } from "react-router-dom";
import { Mail, Phone, MapPin } from "lucide-react";
import armaxLogo from "@/assets/armax-logo.svg";

const Footer = () => {
  return (
    <footer className="bg-[#0B0F18] text-white">
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
            <p className="text-[15px] text-zinc-400 leading-relaxed font-light">
              Импорт в Россию из Азии, Турции и Европы
            </p>
            <div className="mt-4 pt-4 border-t border-white/[0.06]">
              <p className="text-sm text-zinc-500 font-light">
                Работаем с 2009 года
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-6 text-base font-bold tracking-wide text-white">Навигация</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/services" className="text-[15px] text-zinc-400 hover:text-white hover:text-accent transition-all duration-300 ease-out hover:translate-x-2 inline-block font-light relative group">
                  <span className="relative">Услуги
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-accent group-hover:w-full transition-all duration-300"></span>
                  </span>
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-[15px] text-zinc-400 hover:text-white hover:text-accent transition-all duration-300 ease-out hover:translate-x-2 inline-block font-light relative group">
                  <span className="relative">О компании
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-accent group-hover:w-full transition-all duration-300"></span>
                  </span>
                </Link>
              </li>
              <li>
                <Link to="/geography" className="text-[15px] text-zinc-400 hover:text-white hover:text-accent transition-all duration-300 ease-out hover:translate-x-2 inline-block font-light relative group">
                  <span className="relative">География
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-accent group-hover:w-full transition-all duration-300"></span>
                  </span>
                </Link>
              </li>
              <li>
                <Link to="/reviews" className="text-[15px] text-zinc-400 hover:text-white hover:text-accent transition-all duration-300 ease-out hover:translate-x-2 inline-block font-light relative group">
                  <span className="relative">Отзывы
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-accent group-hover:w-full transition-all duration-300"></span>
                  </span>
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-[15px] text-zinc-400 hover:text-white hover:text-accent transition-all duration-300 ease-out hover:translate-x-2 inline-block font-light relative group">
                  <span className="relative">FAQ
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-accent group-hover:w-full transition-all duration-300"></span>
                  </span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="mb-6 text-base font-bold tracking-wide text-white">Услуги</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/services/sea" className="text-[15px] text-zinc-400 hover:text-white hover:text-accent transition-all duration-300 ease-out hover:translate-x-2 inline-block font-light relative group">
                  <span className="relative">Морские перевозки
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-accent group-hover:w-full transition-all duration-300"></span>
                  </span>
                </Link>
              </li>
              <li>
                <Link to="/services/aviation" className="text-[15px] text-zinc-400 hover:text-white hover:text-accent transition-all duration-300 ease-out hover:translate-x-2 inline-block font-light relative group">
                  <span className="relative">Авиаперевозки
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-accent group-hover:w-full transition-all duration-300"></span>
                  </span>
                </Link>
              </li>
              <li>
                <Link to="/services/railway" className="text-[15px] text-zinc-400 hover:text-white hover:text-accent transition-all duration-300 ease-out hover:translate-x-2 inline-block font-light relative group">
                  <span className="relative">ЖД перевозки
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-accent group-hover:w-full transition-all duration-300"></span>
                  </span>
                </Link>
              </li>
              <li>
                <Link to="/services/auto" className="text-[15px] text-zinc-400 hover:text-white hover:text-accent transition-all duration-300 ease-out hover:translate-x-2 inline-block font-light relative group">
                  <span className="relative">Автоперевозки
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-accent group-hover:w-full transition-all duration-300"></span>
                  </span>
                </Link>
              </li>
              <li>
                <Link to="/services/customs" className="text-[15px] text-zinc-400 hover:text-white hover:text-accent transition-all duration-300 ease-out hover:translate-x-2 inline-block font-light relative group">
                  <span className="relative">Таможенное оформление
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-accent group-hover:w-full transition-all duration-300"></span>
                  </span>
                </Link>
              </li>
              <li>
                <Link to="/services/consolidated" className="text-[15px] text-zinc-400 hover:text-white hover:text-accent transition-all duration-300 ease-out hover:translate-x-2 inline-block font-light relative group">
                  <span className="relative">Сборные грузы
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-accent group-hover:w-full transition-all duration-300"></span>
                  </span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="mb-6 text-base font-bold tracking-wide text-white">Контакты</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 group cursor-pointer">
                <Phone className="h-5 w-5 mt-0.5 text-accent group-hover:scale-125 transition-all duration-300 ease-out" strokeWidth={2} />
                <span className="text-[15px] text-zinc-400 group-hover:text-white transition-colors duration-300 font-light">+7 (981) 997-66-36</span>
              </li>
              <li className="flex items-start gap-3 group cursor-pointer">
                <Mail className="h-5 w-5 mt-0.5 text-accent group-hover:scale-125 transition-all duration-300 ease-out" strokeWidth={2} />
                <span className="text-[15px] text-zinc-400 group-hover:text-white transition-colors duration-300 font-light">armaxrequest@gmail.com</span>
              </li>
              <li className="flex items-start gap-3 group cursor-pointer">
                <MapPin className="h-5 w-5 mt-0.5 text-accent group-hover:scale-125 transition-all duration-300 ease-out" strokeWidth={2} />
                <span className="text-[15px] text-zinc-400 group-hover:text-white transition-colors duration-300 font-light">Санкт-Петербург, Горское шоссе, 4</span>
              </li>
            </ul>
            <div className="mt-6 pt-6 border-t border-white/[0.06]">
              <p className="text-sm text-zinc-500 font-light">
                Работаем только с юр. лицами
              </p>
            </div>
            {/* Social Links */}
            <div className="flex gap-4 mt-6">
              <a 
                href="https://t.me/armaxlogistics" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-white/[0.05] hover:bg-accent hover:scale-110 transition-all duration-300 ease-out group"
                aria-label="Telegram"
              >
                <svg className="h-5 w-5 text-zinc-400 group-hover:text-white transition-colors" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-white/[0.06] pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[13px] text-zinc-500 font-light">
            © 2025 Armax Logistics. Все права защищены.
          </p>
          <div className="flex gap-8">
            <Link to="/privacy" className="text-[13px] text-zinc-500 hover:text-zinc-300 hover:text-accent transition-all duration-300 ease-out font-light relative group">
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
