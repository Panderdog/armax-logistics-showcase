import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Phone, Mail, MessageCircle, Clock, Send, ArrowRight, CheckCircle } from "lucide-react";
import { toast } from "sonner";
import SEO from "@/components/SEO";
import { localBusinessSchema } from "@/lib/schema";

const Contacts = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast.success("Спасибо! Мы свяжемся с вами в ближайшее время.");
    setFormData({ name: "", phone: "", email: "", message: "" });
    setIsSubmitting(false);
    setIsSubmitted(true);
    
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  const contactMethods = [
    {
      icon: Phone,
      title: "Телефон",
      value: "+7 (812) 644-02-91",
      link: "tel:+78126440291",
      description: "Пн-Пт: 9:00-18:00",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: Mail,
      title: "Email",
      value: "info@armaxstp.com",
      link: "mailto:info@armaxstp.com",
      description: "Ответим в течение часа",
      color: "from-accent to-orange-500",
    },
    {
      icon: MapPin,
      title: "Офис",
      value: "Санкт-Петербург",
      link: null,
      description: "Парголовский таможенный пост",
      color: "from-emerald-500 to-teal-500",
    },
  ];

  const messengers = [
    {
      name: "WhatsApp",
      icon: MessageCircle,
      link: "https://wa.me/78126440291",
      color: "bg-[#25D366] hover:bg-[#128C7E]",
      description: "Быстрые ответы",
    },
    {
      name: "Telegram",
      icon: Send,
      link: "https://t.me/armaxlogistics",
      color: "bg-[#0088cc] hover:bg-[#006699]",
      description: "Файлы и документы",
    },
  ];

  return (
    <>
      <SEO
        title="Контакты"
        description="Контакты Armax Logistics: телефон +7 (812) 644-02-91, email info@armaxstp.com. Офис в Санкт-Петербурге."
        keywords="контакты, телефон, email, офис, Санкт-Петербург"
        canonicalUrl="/contacts"
        structuredData={localBusinessSchema}
      />
      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="relative py-24 lg:py-32 bg-primary overflow-hidden">
          <div className="absolute inset-0 bg-[url('/nightport.jpg')] bg-cover bg-center opacity-15" />
          <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/95 to-primary/80" />
          <div className="absolute top-0 left-1/3 w-96 h-96 bg-accent/20 rounded-full blur-[128px]" />
          
          <div className="container mx-auto px-6 lg:px-8 relative z-10">
            <div className="max-w-4xl">
              <span className="inline-block px-4 py-1.5 mb-8 text-sm font-medium text-accent bg-accent/20 rounded-full border border-accent/30 backdrop-blur-sm animate-fade-in">
                <MessageCircle className="inline h-4 w-4 mr-1" />
                Контакты
              </span>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-8 animate-fade-in leading-[1.05] tracking-tight">
                Давайте
                <br />
                <span className="text-accent">обсудим доставку</span>
              </h1>
              <p className="text-xl lg:text-2xl text-white/80 font-light animate-fade-in leading-relaxed max-w-2xl" style={{ animationDelay: '0.15s' }}>
                Расскажите о вашей задаче — предложим оптимальное решение за 30 минут
              </p>
            </div>
          </div>
        </section>

        {/* Contact Methods */}
        <section className="py-16 bg-background relative -mt-12 z-20">
          <div className="container mx-auto px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {contactMethods.map((method, index) => (
                <div
                  key={index}
                  className="group p-8 rounded-3xl bg-card border border-border/50 shadow-large hover:border-accent/30 transition-all duration-500 hover:-translate-y-2"
                >
                  <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${method.color} mb-6`}>
                    <method.icon className="h-7 w-7 text-white" strokeWidth={1.5} />
                  </div>
                  <div className="text-sm text-muted-foreground mb-2">{method.title}</div>
                  {method.link ? (
                    <a
                      href={method.link}
                      className="block text-2xl font-bold text-foreground hover:text-accent transition-colors mb-2"
                    >
                      {method.value}
                    </a>
                  ) : (
                    <div className="text-2xl font-bold text-foreground mb-2">{method.value}</div>
                  )}
                  <div className="text-sm text-muted-foreground flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    {method.description}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-20 lg:py-28 bg-background">
          <div className="container mx-auto px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 max-w-6xl mx-auto">
              {/* Left side - Messengers & Info */}
              <div className="space-y-10">
                <div>
                  <span className="inline-block px-4 py-1.5 mb-6 text-sm font-medium text-accent bg-accent/10 rounded-full border border-accent/20">
                    Мессенджеры
                  </span>
                  <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6 tracking-tight">
                    Напишите нам
                  </h2>
                  <p className="text-lg text-muted-foreground font-light leading-relaxed">
                    Выберите удобный мессенджер — ответим в течение 15 минут в рабочее время
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {messengers.map((messenger, index) => (
                    <a
                      key={index}
                      href={messenger.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`group flex items-center gap-4 p-6 rounded-2xl ${messenger.color} text-white transition-all duration-300 hover:scale-105 hover:shadow-large`}
                    >
                      <messenger.icon className="h-8 w-8" strokeWidth={1.5} />
                      <div>
                        <div className="font-bold text-lg">{messenger.name}</div>
                        <div className="text-white/70 text-sm">{messenger.description}</div>
                      </div>
                      <ArrowRight className="h-5 w-5 ml-auto opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                    </a>
                  ))}
                </div>

                {/* Working hours */}
                <div className="p-8 rounded-3xl bg-secondary/50 border border-border/50">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="p-3 rounded-xl bg-accent/10">
                      <Clock className="h-6 w-6 text-accent" strokeWidth={1.5} />
                    </div>
                    <h3 className="text-xl font-bold text-foreground">Режим работы</h3>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center py-2 border-b border-border/50">
                      <span className="text-muted-foreground">Понедельник — Пятница</span>
                      <span className="font-semibold text-foreground">9:00 — 18:00</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-border/50">
                      <span className="text-muted-foreground">Суббота</span>
                      <span className="font-semibold text-foreground">10:00 — 15:00</span>
                    </div>
                    <div className="flex justify-between items-center py-2">
                      <span className="text-muted-foreground">Воскресенье</span>
                      <span className="text-muted-foreground">Выходной</span>
                    </div>
                  </div>
                </div>

                {/* Address */}
                <div className="p-8 rounded-3xl bg-gradient-to-br from-primary to-primary-dark text-white">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="p-3 rounded-xl bg-white/10">
                      <MapPin className="h-6 w-6 text-white" strokeWidth={1.5} />
                    </div>
                    <h3 className="text-xl font-bold">Наш офис</h3>
                  </div>
                  <p className="text-white/80 leading-relaxed mb-4">
                    Санкт-Петербург, Парголовский таможенный и логистический комплекс
                  </p>
                  <p className="text-white/60 text-sm">
                    Офис расположен непосредственно в здании таможенного поста, что позволяет оперативно решать вопросы с таможней
                  </p>
                </div>
              </div>

              {/* Right side - Form */}
              <div>
                <div className="p-10 lg:p-12 rounded-3xl bg-card border border-border/50 shadow-large">
                  {isSubmitted ? (
                    <div className="text-center py-12">
                      <div className="w-20 h-20 rounded-full bg-emerald-500/10 flex items-center justify-center mx-auto mb-6">
                        <CheckCircle className="h-10 w-10 text-emerald-500" strokeWidth={1.5} />
                      </div>
                      <h3 className="text-2xl font-bold text-foreground mb-3">Заявка отправлена!</h3>
                      <p className="text-muted-foreground">
                        Мы свяжемся с вами в ближайшее время
                      </p>
                    </div>
                  ) : (
                    <>
                      <div className="mb-8">
                        <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-3 tracking-tight">
                          Отправить заявку
                        </h2>
                        <p className="text-muted-foreground">
                          Заполните форму — перезвоним за 30 минут
                        </p>
                      </div>
                      
                      <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                          <label className="block text-sm font-semibold text-foreground mb-3">
                            Ваше имя *
                          </label>
                          <Input
                            required
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            placeholder="Как к вам обращаться?"
                            className="h-14 rounded-xl bg-secondary/50 border-border/50 focus:border-accent"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-semibold text-foreground mb-3">
                            Телефон *
                          </label>
                          <Input
                            required
                            type="tel"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            placeholder="+7 (___) ___-__-__"
                            className="h-14 rounded-xl bg-secondary/50 border-border/50 focus:border-accent"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-semibold text-foreground mb-3">
                            Email
                          </label>
                          <Input
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            placeholder="your@email.com"
                            className="h-14 rounded-xl bg-secondary/50 border-border/50 focus:border-accent"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-semibold text-foreground mb-3">
                            Что нужно доставить? *
                          </label>
                          <Textarea
                            required
                            value={formData.message}
                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                            placeholder="Опишите груз, откуда и куда нужна доставка"
                            rows={5}
                            className="resize-none rounded-xl bg-secondary/50 border-border/50 focus:border-accent"
                          />
                        </div>
                        
                        <Button
                          type="submit"
                          size="lg"
                          className="w-full h-14 text-lg group"
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? (
                            <>
                              <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                              Отправляем...
                            </>
                          ) : (
                            <>
                              Отправить заявку
                              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                            </>
                          )}
                        </Button>
                        
                        <p className="text-xs text-muted-foreground text-center">
                          Нажимая кнопку, вы соглашаетесь с обработкой персональных данных
                        </p>
                      </form>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Map */}
        <section className="pb-20 lg:pb-28 bg-background">
          <div className="container mx-auto px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <div className="aspect-[21/9] rounded-3xl overflow-hidden shadow-large border border-border/50">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1998.5928156483635!2d30.308519!3d59.937485!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNTnCsDU2JzE0LjkiTiAzMMKwMTgnMzAuNyJF!5e0!3m2!1sru!2sru!4v1234567890123"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Contacts;
