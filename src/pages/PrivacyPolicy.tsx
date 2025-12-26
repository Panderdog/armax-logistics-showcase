import { Shield, Mail, Phone, MapPin, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import SEO from "@/components/SEO";

const PrivacyPolicy = () => {
  return (
    <>
      <SEO
        title="Политика конфиденциальности"
        description="Политика конфиденциальности Armax Logistics. Узнайте, как мы собираем, храним и защищаем ваши персональные данные."
        keywords="политика конфиденциальности, персональные данные, защита данных"
        canonicalUrl="/privacy"
      />
      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="relative py-20 lg:py-28 bg-primary overflow-hidden">
          <div className="absolute inset-0 bg-[url('/nightport.jpg')] bg-cover bg-center opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/95 to-primary/80" />
          
          <div className="container mx-auto px-6 lg:px-8 relative z-10">
            <Link 
              to="/" 
              className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors mb-8 group"
            >
              <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
              На главную
            </Link>
            
            <div className="max-w-4xl">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 text-sm font-medium text-accent bg-accent/20 rounded-full border border-accent/30 backdrop-blur-sm">
                <Shield className="h-4 w-4" />
                Правовая информация
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight">
                Политика
                <br />
                <span className="text-accent">конфиденциальности</span>
              </h1>
              <p className="text-lg text-white/70">
                Дата обновления: 28 ноября 2025
              </p>
            </div>
          </div>
          
          {/* Smooth transition to next section */}
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0B0F18] to-transparent" />
        </section>

        {/* Content */}
        <section className="py-16 lg:py-24">
          <div className="container mx-auto px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="prose prose-lg prose-invert max-w-none">
                
                {/* Intro */}
                <div className="p-8 rounded-2xl bg-card border border-border/50 mb-10">
                  <p className="text-lg text-muted-foreground leading-relaxed m-0">
                    Настоящая Политика конфиденциальности определяет порядок обработки и защиты персональной информации пользователей сайта{" "}
                    <a href="https://armaxstp.com" className="text-accent hover:underline">armaxstp.com</a>{" "}
                    (далее — «Компания», «Мы»).
                  </p>
                  <p className="text-lg text-muted-foreground leading-relaxed mt-4 mb-0">
                    Используя наш сайт, Вы подтверждаете свое согласие с условиями данной Политики.
                  </p>
                </div>

                {/* Section 1 */}
                <section className="mb-12">
                  <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
                    <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-accent/10 text-accent text-lg font-bold">1</span>
                    Какие данные мы собираем
                  </h2>
                  
                  <div className="space-y-6">
                    <div className="p-6 rounded-xl bg-secondary/30 border border-border/30">
                      <h3 className="text-lg font-semibold text-foreground mb-4">
                        1.1. Данные, которые пользователь оставляет добровольно:
                      </h3>
                      <ul className="space-y-2 text-muted-foreground">
                        <li className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                          Имя
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                          Телефон
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                          Email
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                          Сообщение, отправленное через форму заявки
                        </li>
                      </ul>
                    </div>

                    <div className="p-6 rounded-xl bg-secondary/30 border border-border/30">
                      <h3 className="text-lg font-semibold text-foreground mb-4">
                        1.2. Технические данные, собираемые автоматически:
                      </h3>
                      <ul className="space-y-2 text-muted-foreground">
                        <li className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                          IP-адрес
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                          Тип устройства и браузера
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                          Дата и время посещения
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                          Просмотренные страницы
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                          Cookie-файлы
                        </li>
                      </ul>
                      <p className="text-sm text-muted-foreground/70 mt-4">
                        Данные технического характера не позволяют однозначно идентифицировать пользователя и используются в аналитических целях.
                      </p>
                    </div>
                  </div>
                </section>

                {/* Section 2 */}
                <section className="mb-12">
                  <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
                    <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-accent/10 text-accent text-lg font-bold">2</span>
                    Цели обработки данных
                  </h2>
                  
                  <div className="p-6 rounded-xl bg-secondary/30 border border-border/30">
                    <p className="text-muted-foreground mb-4">Мы обрабатываем данные для:</p>
                    <ol className="space-y-3 text-muted-foreground">
                      <li className="flex items-start gap-3">
                        <span className="flex-shrink-0 w-6 h-6 rounded-lg bg-accent/20 text-accent text-sm font-medium flex items-center justify-center">1</span>
                        Обработки и ответа на заявки пользователей
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="flex-shrink-0 w-6 h-6 rounded-lg bg-accent/20 text-accent text-sm font-medium flex items-center justify-center">2</span>
                        Подготовки коммерческих предложений и консультаций
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="flex-shrink-0 w-6 h-6 rounded-lg bg-accent/20 text-accent text-sm font-medium flex items-center justify-center">3</span>
                        Связи с пользователем по указанным контактным данным
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="flex-shrink-0 w-6 h-6 rounded-lg bg-accent/20 text-accent text-sm font-medium flex items-center justify-center">4</span>
                        Улучшения качества работы сайта
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="flex-shrink-0 w-6 h-6 rounded-lg bg-accent/20 text-accent text-sm font-medium flex items-center justify-center">5</span>
                        Аналитики и статистики
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="flex-shrink-0 w-6 h-6 rounded-lg bg-accent/20 text-accent text-sm font-medium flex items-center justify-center">6</span>
                        Соблюдения требований действующего законодательства
                      </li>
                    </ol>
                  </div>
                </section>

                {/* Section 3 */}
                <section className="mb-12">
                  <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
                    <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-accent/10 text-accent text-lg font-bold">3</span>
                    Правовые основания обработки
                  </h2>
                  
                  <div className="p-6 rounded-xl bg-secondary/30 border border-border/30">
                    <p className="text-muted-foreground mb-4">Мы обрабатываем персональные данные на основании:</p>
                    <ul className="space-y-2 text-muted-foreground">
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                        согласия пользователя
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                        необходимости исполнения договора или предварительной консультации
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                        наших законных интересов (статистика, оптимизация сайта)
                      </li>
                    </ul>
                  </div>
                </section>

                {/* Section 4 */}
                <section className="mb-12">
                  <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
                    <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-accent/10 text-accent text-lg font-bold">4</span>
                    Передача данных третьим лицам
                  </h2>
                  
                  <div className="p-6 rounded-xl bg-secondary/30 border border-border/30">
                    <p className="text-muted-foreground mb-4">
                      Мы можем передавать данные третьим лицам только в случаях, необходимых для корректной работы сайта:
                    </p>
                    <ul className="space-y-2 text-muted-foreground mb-6">
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                        хостинг-провайдеры
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                        база данных и backend-сервис: Supabase
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                        картографический сервис: Google Maps
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                        сервис загрузки шрифтов: Google Fonts
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                        аналитические сервисы (если будут подключены)
                      </li>
                    </ul>
                    <p className="text-sm text-muted-foreground/80">
                      Передача осуществляется строго в минимально необходимом объёме и в рамках действующего законодательства.
                    </p>
                    <p className="text-sm text-muted-foreground/80 mt-2 font-medium">
                      Мы не продаём и не передаём данные третьим лицам в коммерческих целях.
                    </p>
                  </div>
                </section>

                {/* Section 5 */}
                <section className="mb-12">
                  <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
                    <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-accent/10 text-accent text-lg font-bold">5</span>
                    Хранение данных
                  </h2>
                  
                  <div className="p-6 rounded-xl bg-secondary/30 border border-border/30">
                    <p className="text-muted-foreground mb-4">Мы храним данные столько, сколько это требуется для:</p>
                    <ul className="space-y-2 text-muted-foreground mb-4">
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                        обработки заявок — до 5 лет
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                        технической аналитики — до 1 года
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                        логов и cookies — согласно политике браузеров и Google-сервисов
                      </li>
                    </ul>
                    <p className="text-sm text-muted-foreground/80">
                      По истечении сроков данные удаляются или обезличиваются.
                    </p>
                  </div>
                </section>

                {/* Section 6 */}
                <section className="mb-12">
                  <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
                    <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-accent/10 text-accent text-lg font-bold">6</span>
                    Защита персональных данных
                  </h2>
                  
                  <div className="p-6 rounded-xl bg-secondary/30 border border-border/30">
                    <p className="text-muted-foreground mb-4">Мы используем современные меры защиты:</p>
                    <ul className="space-y-2 text-muted-foreground">
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                        HTTPS-шифрование
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                        контроль доступа и авторизация в админ-панели
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                        защита от несанкционированного доступа
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                        регулярное обновление систем и библиотек
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                        безопасное хранение данных в Supabase
                      </li>
                    </ul>
                  </div>
                </section>

                {/* Section 7 */}
                <section className="mb-12">
                  <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
                    <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-accent/10 text-accent text-lg font-bold">7</span>
                    Права пользователя
                  </h2>
                  
                  <div className="p-6 rounded-xl bg-secondary/30 border border-border/30">
                    <p className="text-muted-foreground mb-4">Пользователь имеет право:</p>
                    <ul className="space-y-2 text-muted-foreground mb-6">
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                        получить информацию о своих данных
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                        потребовать их корректировки или удаления
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                        ограничить обработку
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                        отозвать согласие на обработку
                      </li>
                    </ul>
                    <div className="flex items-center gap-3 p-4 rounded-xl bg-accent/10 border border-accent/20">
                      <Mail className="h-5 w-5 text-accent flex-shrink-0" />
                      <span className="text-muted-foreground">
                        Обращения принимаются по email:{" "}
                        <a href="mailto:info@armaxstp.com" className="text-accent hover:underline font-medium">
                          info@armaxstp.com
                        </a>
                      </span>
                    </div>
                  </div>
                </section>

                {/* Section 8 */}
                <section className="mb-12">
                  <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
                    <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-accent/10 text-accent text-lg font-bold">8</span>
                    Cookie-файлы
                  </h2>
                  
                  <div className="p-6 rounded-xl bg-secondary/30 border border-border/30">
                    <p className="text-muted-foreground mb-4">Мы используем cookies для:</p>
                    <ul className="space-y-2 text-muted-foreground mb-4">
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                        корректной работы сайта
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                        сохранения пользовательских настроек
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                        анализа посещаемости
                      </li>
                    </ul>
                    <p className="text-sm text-muted-foreground/80">
                      Пользователь может отключить cookies в настройках браузера. Это может повлиять на корректность работы отдельных функций сайта.
                    </p>
                  </div>
                </section>

                {/* Section 9 */}
                <section className="mb-12">
                  <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
                    <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-accent/10 text-accent text-lg font-bold">9</span>
                    Изменения политики
                  </h2>
                  
                  <div className="p-6 rounded-xl bg-secondary/30 border border-border/30">
                    <p className="text-muted-foreground">
                      Компания может обновлять настоящую Политику. Новая версия вступает в силу с момента публикации на сайте.
                    </p>
                  </div>
                </section>

                {/* Section 10 - Contact */}
                <section>
                  <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
                    <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-accent/10 text-accent text-lg font-bold">10</span>
                    Контактная информация
                  </h2>
                  
                  <div className="p-8 rounded-2xl bg-gradient-to-br from-primary to-primary-dark text-white">
                    <h3 className="text-2xl font-bold mb-6">Armax Logistics</h3>
                    <div className="space-y-4">
                      <a 
                        href="tel:+78126440291" 
                        className="flex items-center gap-4 text-white/80 hover:text-white transition-colors"
                      >
                        <div className="p-3 rounded-xl bg-white/10">
                          <Phone className="h-5 w-5" />
                        </div>
                        <span>+7 (812) 644-02-91</span>
                      </a>
                      <a 
                        href="mailto:info@armaxstp.com" 
                        className="flex items-center gap-4 text-white/80 hover:text-white transition-colors"
                      >
                        <div className="p-3 rounded-xl bg-white/10">
                          <Mail className="h-5 w-5" />
                        </div>
                        <span>info@armaxstp.com</span>
                      </a>
                      <div className="flex items-center gap-4 text-white/80">
                        <div className="p-3 rounded-xl bg-white/10">
                          <MapPin className="h-5 w-5" />
                        </div>
                        <span>Санкт-Петербург, Горское шоссе, 4</span>
                      </div>
                    </div>
                  </div>
                </section>

              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default PrivacyPolicy;

