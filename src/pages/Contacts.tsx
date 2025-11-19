import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Phone, Mail, MessageCircle } from "lucide-react";
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Спасибо! Мы свяжемся с вами в ближайшее время.");
    setFormData({ name: "", phone: "", email: "", message: "" });
  };

  const contactInfo = [
    {
      icon: Phone,
      title: "Телефон",
      value: "+7 (812) 644-02-91",
      link: "tel:+78126440291",
    },
    {
      icon: Mail,
      title: "Email",
      value: "info@armaxstp.com",
      link: "mailto:info@armaxstp.com",
    },
    {
      icon: MapPin,
      title: "Адрес",
      value: "Санкт-Петербург, Россия",
      link: null,
    },
  ];

  return (
    <>
      <SEO
        title="Контакты"
        description="Контакты Armax Logistics: телефон +7 (812) 644-02-91, email info@armaxstp.com. Офис в Санкт-Петербурге. Свяжитесь с нами через форму, WhatsApp или Telegram. Получите расчёт стоимости доставки."
        keywords="контакты, телефон, email, офис, Санкт-Петербург, связаться, заявка, расчёт стоимости, WhatsApp, Telegram"
        canonicalUrl="/contacts"
        structuredData={localBusinessSchema}
      />
      <div className="min-h-screen">
        {/* Hero Section */}
      <section className="relative py-24 lg:py-32 bg-gradient-to-br from-primary via-primary to-primary-dark text-primary-foreground">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="max-w-4xl">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8 animate-fade-in leading-[1.1] text-balance">
              Контакты
            </h1>
            <p className="text-xl md:text-2xl lg:text-3xl text-primary-foreground/85 font-light animate-fade-in leading-relaxed" style={{ animationDelay: '0.15s' }}>
              Свяжитесь с нами удобным способом
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info & Form */}
      <section className="py-24 lg:py-32">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 max-w-6xl mx-auto">
            {/* Contact Information */}
            <div className="space-y-10 animate-fade-in">
              <div>
                <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6 leading-[1.1] text-balance">
                  Как с нами связаться
                </h2>
                <p className="text-lg text-muted-foreground font-light leading-relaxed">
                  Выберите удобный способ связи или заполните форму обратной связи
                </p>
              </div>

              <div className="space-y-6">
                {contactInfo.map((item, index) => (
                  <div
                    key={index}
                    className="group flex items-start gap-5 p-6 lg:p-8 rounded-2xl bg-gradient-to-br from-secondary/50 to-background border border-border/50 hover:border-accent/30 transition-all duration-500 ease-out hover:shadow-large hover:scale-105 hover:-translate-y-1"
                  >
                    <div className="p-4 rounded-xl bg-accent/10 text-accent group-hover:bg-accent group-hover:text-white transition-all duration-300 group-hover:scale-110">
                      <item.icon className="h-7 w-7 group-hover:scale-110 transition-transform duration-300" strokeWidth={1.5} />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-muted-foreground group-hover:text-foreground mb-2 uppercase tracking-wider transition-colors duration-300">
                        {item.title}
                      </div>
                      {item.link ? (
                        <a
                          href={item.link}
                          className="text-xl font-bold text-foreground hover:text-accent transition-colors duration-300 tracking-tight"
                        >
                          {item.value}
                        </a>
                      ) : (
                        <div className="text-xl font-bold text-foreground group-hover:text-accent tracking-tight transition-colors duration-300">
                          {item.value}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* WhatsApp & Telegram */}
              <div className="p-8 rounded-2xl bg-accent/10 border border-accent/30">
                <div className="flex items-center gap-4 mb-6">
                  <MessageCircle className="h-7 w-7 text-accent" strokeWidth={1.5} />
                  <h3 className="text-xl font-bold text-foreground tracking-tight">
                    Мессенджеры
                  </h3>
                </div>
                <div className="flex flex-wrap gap-4">
                  <Button
                    asChild
                    className="bg-[#25D366] text-white hover:bg-[#128C7E] shadow-medium hover:shadow-large hover:scale-105 hover:-translate-y-0.5 transition-all duration-300 ease-out"
                  >
                    <a
                      href="https://wa.me/78126440291"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      WhatsApp
                    </a>
                  </Button>
                  <Button
                    asChild
                    className="bg-[#0088cc] text-white hover:bg-[#006699] shadow-medium hover:shadow-large hover:scale-105 hover:-translate-y-0.5 transition-all duration-300 ease-out"
                  >
                    <a
                      href="https://t.me/armaxlogistics"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Telegram
                    </a>
                  </Button>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="p-10 lg:p-12 rounded-2xl bg-card border border-border/50 shadow-large animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-8 tracking-tight">
                Отправить заявку
              </h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-foreground mb-3 tracking-wide">
                    Имя *
                  </label>
                  <Input
                    required
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    placeholder="Ваше имя"
                    className="h-12"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-foreground mb-3 tracking-wide">
                    Телефон *
                  </label>
                  <Input
                    required
                    type="tel"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    placeholder="+7 (___) ___-__-__"
                    className="h-12"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-foreground mb-3 tracking-wide">
                    Email
                  </label>
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    placeholder="your@email.com"
                    className="h-12"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-foreground mb-3 tracking-wide">
                    Сообщение *
                  </label>
                  <Textarea
                    required
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    placeholder="Опишите вашу задачу"
                    rows={5}
                    className="resize-none"
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full"
                  size="lg"
                >
                  Отправить заявку
                </Button>
              </form>
            </div>
          </div>

          {/* Map */}
          <div className="mt-32 max-w-6xl mx-auto animate-fade-in">
            <div className="aspect-video rounded-3xl overflow-hidden shadow-large bg-secondary border border-border/50">
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
