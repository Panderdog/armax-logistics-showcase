import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Phone, Mail, MessageCircle } from "lucide-react";
import { toast } from "sonner";

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
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 animate-fade-in">
              Контакты
            </h1>
            <p className="text-xl text-primary-foreground/90 animate-fade-in" style={{ animationDelay: '0.2s' }}>
              Свяжитесь с нами удобным способом
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info & Form */}
      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold text-foreground mb-6">
                  Как с нами связаться
                </h2>
                <p className="text-muted-foreground mb-8">
                  Выберите удобный способ связи или заполните форму обратной связи
                </p>
              </div>

              <div className="space-y-6">
                {contactInfo.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-4 p-6 rounded-xl bg-secondary border border-border hover:border-primary transition-all duration-300"
                  >
                    <div className="p-3 rounded-lg bg-primary/10 text-primary">
                      <item.icon className="h-6 w-6" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-muted-foreground mb-1">
                        {item.title}
                      </div>
                      {item.link ? (
                        <a
                          href={item.link}
                          className="text-lg font-semibold text-foreground hover:text-primary transition-colors"
                        >
                          {item.value}
                        </a>
                      ) : (
                        <div className="text-lg font-semibold text-foreground">
                          {item.value}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* WhatsApp & Telegram */}
              <div className="p-6 rounded-xl bg-accent/10 border border-accent/20">
                <div className="flex items-center gap-3 mb-4">
                  <MessageCircle className="h-6 w-6 text-accent" />
                  <h3 className="text-lg font-semibold text-foreground">
                    Мессенджеры
                  </h3>
                </div>
                <div className="flex flex-wrap gap-4">
                  <Button
                    asChild
                    className="bg-[#25D366] text-white hover:bg-[#128C7E]"
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
                    className="bg-[#0088cc] text-white hover:bg-[#006699]"
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
            <div className="p-8 rounded-xl bg-card border border-border">
              <h2 className="text-2xl font-bold text-foreground mb-6">
                Отправить заявку
              </h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Имя *
                  </label>
                  <Input
                    required
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    placeholder="Ваше имя"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
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
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Email
                  </label>
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
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
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full bg-accent text-accent-foreground hover:bg-accent-hover transition-all duration-300"
                  size="lg"
                >
                  Отправить заявку
                </Button>
              </form>
            </div>
          </div>

          {/* Map */}
          <div className="mt-20 max-w-6xl mx-auto">
            <div className="aspect-video rounded-2xl overflow-hidden shadow-2xl bg-secondary border border-border">
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
  );
};

export default Contacts;
