import type React from "react";
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Phone, Mail, MessageCircle, Clock, Send, ArrowRight, CheckCircle, AlertCircle, Globe, Sparkles, Building2 } from "lucide-react";
import { toast } from "sonner";
import SEO from "@/components/SEO";
import { localBusinessSchema } from "@/lib/schema";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import CTABlock from "@/components/CTABlock";

interface FormErrors {
  name?: string;
  phone?: string;
  email?: string;
  message?: string;
}

// Custom hook for intersection observer animations
const useInView = (threshold = 0.1) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [threshold]);

  return { ref, isInView };
};

const Contacts = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Animation refs
  const heroRef = useInView(0.2);
  const contactCardsRef = useInView(0.1);
  const formSectionRef = useInView(0.1);
  const mapRef = useInView(0.1);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Пожалуйста, введите ваше имя";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Имя должно содержать минимум 2 символа";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Пожалуйста, введите номер телефона";
    } else {
      const phoneDigits = formData.phone.replace(/\D/g, "");
      if (phoneDigits.length < 10) {
        newErrors.phone = "Введите корректный номер телефона";
      }
    }

    if (formData.email.trim()) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email.trim())) {
        newErrors.email = "Введите корректный email адрес";
      }
    }

    if (!formData.message.trim()) {
      newErrors.message = "Пожалуйста, опишите ваш запрос";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Сообщение должно содержать минимум 10 символов";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      if (!supabase || !isSupabaseConfigured) {
        throw new Error(
          "База данных не настроена. Пожалуйста, свяжитесь с нами по телефону."
        );
      }

            // @ts-expect-error - Yandex Maps typings issue
      const { error } = await supabase.from("applications").insert({
        name: formData.name.trim(),
        email: formData.email.trim() || null,
        phone: formData.phone.trim(),
        message: formData.message.trim(),
      });

      if (error) {
        throw error;
      }

      try {
        const functionUrl =
          "https://ztkvnqoxkdxpjlwcgarx.supabase.co/functions/v1/smooth-service";

        const response = await fetch(functionUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            apikey: import.meta.env.VITE_SUPABASE_ANON_KEY,
            Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
          },
          body: JSON.stringify({
            name: formData.name.trim(),
            email: formData.email.trim() || null,
            phone: formData.phone.trim(),
            message: formData.message.trim(),
          }),
        });

        // Отправка email прошла успешно
        await response.text();
      } catch (emailError) {
        console.error("Ошибка отправки email через Resend:", emailError);
      }

      toast.success("Спасибо! Мы свяжемся с вами в ближайшее время.");
      setFormData({ name: "", phone: "", email: "", message: "" });
      setErrors({});
      setIsSubmitted(true);

      setTimeout(() => setIsSubmitted(false), 5000);
    } catch (error) {
      console.error("Error submitting application:", error);
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Произошла ошибка при отправке заявки. Пожалуйста, попробуйте позже.";
      setSubmitError(errorMessage);
      toast.error("Ошибка при отправке заявки");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: keyof typeof formData, value: string) => {
    setFormData({ ...formData, [field]: value });
    if (errors[field]) {
      setErrors({ ...errors, [field]: undefined });
    }
    if (submitError) {
      setSubmitError(null);
    }
  };

  const contactMethods = [
    {
      icon: Phone,
      title: "Телефон",
      value: "+7 (981) 997-66-36",
      link: "tel:+79819976636",
      description: "Пн-Пт: 9:00-18:00",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      icon: Mail,
      title: "Email",
      value: "armaxrequest@gmail.com",
      link: "mailto:armaxrequest@gmail.com",
      description: "Ответим в течение часа",
      gradient: "from-[#F34D1B] to-orange-500",
    },
    {
      icon: MapPin,
      title: "Офис",
      value: "Санкт-Петербург",
      link: null,
      description: "Парголовский ТЛК",
      gradient: "from-emerald-500 to-teal-500",
    },
  ];

  const messengers = [
    {
      name: "Telegram",
      icon: Send,
      link: "https://t.me/armaxlogistics",
      color: "bg-[#0088cc]",
      hoverColor: "hover:bg-[#006699]",
      description: "Файлы и документы",
    },
  ];

  const workingHours = [
    { day: "Понедельник — Пятница", hours: "9:00 — 18:00", active: true },
    { day: "Суббота", hours: "10:00 — 15:00", active: true },
    { day: "Воскресенье", hours: "Выходной", active: false },
  ];

  return (
    <>
      <SEO
        title="Контакты"
        description="Контакты Armax Logistics: телефон +7 (981) 997-66-36, email armaxrequest@gmail.com. Офис в Санкт-Петербурге."
        keywords="контакты, телефон, email, офис, Санкт-Петербург"
        canonicalUrl="/contacts"
        structuredData={localBusinessSchema}
      />
      <div className="min-h-screen bg-[#0B0F18]">
        {/* Hero Section */}
        <section 
          ref={heroRef.ref}
          className="relative min-h-[calc(100vh-var(--header-height))] flex items-center overflow-hidden"
        >
          {/* Background effects */}
          <div className="absolute inset-0 bg-[url('/nightport.jpg')] bg-cover bg-center opacity-40" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0B0F18]/70 via-[#0B0F18]/50 to-[#0B0F18]" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0B0F18]/80 via-transparent to-[#0B0F18]/30" />
          
          {/* Grid pattern */}
          <div 
            className="absolute inset-0 opacity-[0.015]"
            style={{
              backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
              backgroundSize: '80px 80px'
            }}
          />
          
          <div className="container mx-auto px-6 lg:px-8 relative z-10 py-24 lg:py-32">
            <div className="max-w-4xl">
              <div 
                className={`inline-flex items-center gap-2 px-4 py-2 mb-8 text-sm font-medium bg-white/[0.04] backdrop-blur-sm rounded-xl border border-white/[0.06] transition-all duration-700 ${
                  heroRef.isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
              >
                <Sparkles className="w-4 h-4 text-[#F34D1B]" />
                <span className="text-zinc-300">Свяжитесь с нами</span>
              </div>
              
              <h1 
                className={`text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-8 leading-[1.05] tracking-tight transition-all duration-700 delay-100 ${
                  heroRef.isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
              >
                Давайте
                <br />
                <span className="bg-gradient-to-r from-[#F34D1B] via-orange-400 to-[#F34D1B] bg-clip-text text-transparent animate-shimmer-gradient">обсудим доставку</span>
              </h1>
              
              <p 
                className={`text-xl lg:text-2xl text-zinc-400 font-light leading-relaxed max-w-2xl transition-all duration-700 delay-200 ${
                  heroRef.isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
              >
                Расскажите о вашей задаче — предложим оптимальное решение за один день
              </p>
            </div>
          </div>
          
          {/* Smooth transition to next section */}
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0B0F18] to-transparent" />
        </section>

        {/* Contact Cards Section */}
        <section 
          ref={contactCardsRef.ref}
          className="relative py-8 lg:py-12 overflow-hidden"
        >
          <div className="container mx-auto px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6 max-w-5xl mx-auto">
              {contactMethods.map((method, index) => (
                <div
                  key={index}
                  className={`group relative p-8 rounded-3xl bg-white/[0.02] border border-white/[0.06] backdrop-blur-sm overflow-hidden transition-all duration-700 hover:border-white/[0.12] hover:-translate-y-2 hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)] ${
                    contactCardsRef.isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                  }`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  {/* Gradient glow on hover */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${method.gradient} opacity-0 group-hover:opacity-[0.08] transition-opacity duration-500`} />
                  
                  <div className={`relative inline-flex p-4 rounded-2xl bg-gradient-to-br ${method.gradient} mb-6 group-hover:scale-110 transition-transform duration-500 shadow-lg`}>
                    <method.icon className="h-7 w-7 text-white" strokeWidth={1.5} />
                  </div>
                  
                  <div className="relative">
                    <div className="text-sm text-zinc-500 mb-2 font-medium">{method.title}</div>
                    {method.link ? (
                      <a
                        href={method.link}
                        className="block text-2xl font-bold text-white hover:text-[#F34D1B] transition-colors mb-3 tracking-tight"
                      >
                        {method.value}
                      </a>
                    ) : (
                      <div className="text-2xl font-bold text-white mb-3 tracking-tight">{method.value}</div>
                    )}
                    <div className="text-sm text-zinc-500 flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      {method.description}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Main Content Section */}
        <section 
          ref={formSectionRef.ref}
          className="relative py-20 lg:py-28 overflow-hidden"
        >
          <div className="container mx-auto px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 max-w-6xl mx-auto">
              {/* Left side - Messengers & Info */}
              <div 
                className={`space-y-8 transition-all duration-700 ${
                  formSectionRef.isInView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'
                }`}
              >
                {/* Section header */}
                <div>
                  <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 text-sm font-medium bg-white/[0.04] rounded-xl border border-white/[0.06]">
                    <MessageCircle className="h-4 w-4 text-[#F34D1B]" />
                    <span className="text-zinc-300">Мессенджеры</span>
                  </div>
                  <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
                    Напишите нам
                  </h2>
                  <p className="text-lg text-zinc-400 font-light leading-relaxed">
                    Выберите удобный мессенджер — ответим в течение 15 минут в рабочее время
                  </p>
                </div>

                {/* Messenger buttons */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {messengers.map((messenger, index) => (
                    <a
                      key={index}
                      href={messenger.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`group flex items-center gap-4 p-6 rounded-2xl ${messenger.color} ${messenger.hoverColor} text-white transition-all duration-500 hover:scale-[1.02] hover:shadow-[0_20px_40px_-10px_rgba(0,0,0,0.5)]`}
                      style={{ transitionDelay: `${200 + index * 100}ms` }}
                    >
                      <div className="p-3 rounded-xl bg-white/20 group-hover:scale-110 transition-transform duration-300">
                        <messenger.icon className="h-6 w-6" strokeWidth={1.5} />
                      </div>
                      <div className="flex-1">
                        <div className="font-bold text-lg">{messenger.name}</div>
                        <div className="text-white/70 text-sm">{messenger.description}</div>
                      </div>
                      <ArrowRight className="h-5 w-5 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
                    </a>
                  ))}
                </div>

                {/* Working hours card */}
                <div className="p-8 rounded-3xl bg-white/[0.02] border border-white/[0.06] backdrop-blur-sm">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="p-3 rounded-xl bg-[#F34D1B]/10">
                      <Clock className="h-6 w-6 text-[#F34D1B]" strokeWidth={1.5} />
                    </div>
                    <h3 className="text-xl font-bold text-white">Режим работы</h3>
                  </div>
                  <div className="space-y-4">
                    {workingHours.map((item, index) => (
                      <div 
                        key={index}
                        className={`flex justify-between items-center py-3 ${
                          index < workingHours.length - 1 ? 'border-b border-white/[0.06]' : ''
                        }`}
                      >
                        <span className="text-zinc-400">{item.day}</span>
                        <span className={`font-semibold ${item.active ? 'text-white' : 'text-zinc-600'}`}>
                          {item.hours}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Office address card */}
                <div className="relative p-8 rounded-3xl overflow-hidden group">
                  {/* Background gradient */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#F34D1B] to-orange-600" />
                  <div className="absolute inset-0 bg-[url('/images/tlk.webp')] bg-cover bg-center opacity-20" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  
                  <div className="relative">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="p-3 rounded-xl bg-white/20">
                        <Building2 className="h-6 w-6 text-white" strokeWidth={1.5} />
                      </div>
                      <h3 className="text-xl font-bold text-white">Наш офис</h3>
                    </div>
                    <p className="text-white/90 leading-relaxed mb-4 text-lg">
                      Санкт-Петербург, Парголовский таможенный и логистический комплекс
                    </p>
                    <p className="text-white/70 text-sm leading-relaxed">
                      Офис расположен непосредственно в здании таможенного поста, что позволяет оперативно решать вопросы с таможней
                    </p>
                  </div>
                </div>
              </div>

              {/* Right side - Form */}
              <div 
                className={`transition-all duration-700 delay-200 ${
                  formSectionRef.isInView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'
                }`}
              >
                <div className="sticky top-28">
                  <div className="p-10 lg:p-12 rounded-3xl bg-white/[0.02] border border-white/[0.06] backdrop-blur-sm shadow-[0_30px_60px_-15px_rgba(0,0,0,0.4)]">
                    {isSubmitted ? (
                      <div className="text-center py-12">
                        <div className="w-24 h-24 rounded-full bg-emerald-500/10 flex items-center justify-center mx-auto mb-8 animate-scale-in">
                          <CheckCircle className="h-12 w-12 text-emerald-500" strokeWidth={1.5} />
                        </div>
                        <h3 className="text-3xl font-bold text-white mb-4">Заявка отправлена!</h3>
                        <p className="text-zinc-400 text-lg">
                          Мы свяжемся с вами в ближайшее время
                        </p>
                      </div>
                    ) : (
                      <>
                        <div className="mb-10">
                          <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 text-sm font-medium bg-white/[0.04] rounded-xl border border-white/[0.06]">
                            <Globe className="h-4 w-4 text-[#F34D1B]" />
                            <span className="text-zinc-300">Форма заявки</span>
                          </div>
                          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4 tracking-tight">
                            Отправить заявку
                          </h2>
                          <p className="text-zinc-400 text-lg">
                            Заполните форму — перезвоним за 30 минут
                          </p>
                        </div>
                        
                        <form onSubmit={handleSubmit} className="space-y-6">
                          {submitError && (
                            <div className="p-5 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-start gap-4 animate-fade-in">
                              <AlertCircle className="h-6 w-6 text-red-500 flex-shrink-0 mt-0.5" />
                              <div>
                                <p className="text-sm font-semibold text-red-400">Ошибка отправки</p>
                                <p className="text-sm text-red-400/80 mt-1">{submitError}</p>
                              </div>
                            </div>
                          )}

                          <div className="space-y-2">
                            <label className="block text-sm font-semibold text-white mb-3">
                              Ваше имя <span className="text-[#F34D1B]">*</span>
                            </label>
                            <Input
                              value={formData.name}
                              onChange={(e) => handleInputChange("name", e.target.value)}
                              placeholder="Как к вам обращаться?"
                              className={`h-14 rounded-xl bg-white/[0.04] border-white/[0.08] text-white placeholder:text-zinc-500 focus:border-[#F34D1B] focus:ring-[#F34D1B]/20 transition-all duration-300 ${
                                errors.name ? "border-red-500 focus:border-red-500" : ""
                              }`}
                              disabled={isSubmitting}
                            />
                            {errors.name && (
                              <p className="text-sm text-red-400 mt-2 flex items-center gap-2 animate-fade-in">
                                <AlertCircle className="h-4 w-4" />
                                {errors.name}
                              </p>
                            )}
                          </div>
                          
                          <div className="space-y-2">
                            <label className="block text-sm font-semibold text-white mb-3">
                              Телефон <span className="text-[#F34D1B]">*</span>
                            </label>
                            <Input
                              type="tel"
                              value={formData.phone}
                              onChange={(e) => handleInputChange("phone", e.target.value)}
                              placeholder="+7 (___) ___-__-__"
                              className={`h-14 rounded-xl bg-white/[0.04] border-white/[0.08] text-white placeholder:text-zinc-500 focus:border-[#F34D1B] focus:ring-[#F34D1B]/20 transition-all duration-300 ${
                                errors.phone ? "border-red-500 focus:border-red-500" : ""
                              }`}
                              disabled={isSubmitting}
                            />
                            {errors.phone && (
                              <p className="text-sm text-red-400 mt-2 flex items-center gap-2 animate-fade-in">
                                <AlertCircle className="h-4 w-4" />
                                {errors.phone}
                              </p>
                            )}
                          </div>
                          
                          <div className="space-y-2">
                            <label className="block text-sm font-semibold text-white mb-3">
                              Email
                            </label>
                            <Input
                              type="email"
                              value={formData.email}
                              onChange={(e) => handleInputChange("email", e.target.value)}
                              placeholder="your@email.com"
                              className={`h-14 rounded-xl bg-white/[0.04] border-white/[0.08] text-white placeholder:text-zinc-500 focus:border-[#F34D1B] focus:ring-[#F34D1B]/20 transition-all duration-300 ${
                                errors.email ? "border-red-500 focus:border-red-500" : ""
                              }`}
                              disabled={isSubmitting}
                            />
                            {errors.email && (
                              <p className="text-sm text-red-400 mt-2 flex items-center gap-2 animate-fade-in">
                                <AlertCircle className="h-4 w-4" />
                                {errors.email}
                              </p>
                            )}
                          </div>
                          
                          <div className="space-y-2">
                            <label className="block text-sm font-semibold text-white mb-3">
                              Что нужно доставить? <span className="text-[#F34D1B]">*</span>
                            </label>
                            <Textarea
                              value={formData.message}
                              onChange={(e) => handleInputChange("message", e.target.value)}
                              placeholder="Опишите груз, откуда и куда нужна доставка"
                              rows={5}
                              className={`resize-none rounded-xl bg-white/[0.04] border-white/[0.08] text-white placeholder:text-zinc-500 focus:border-[#F34D1B] focus:ring-[#F34D1B]/20 transition-all duration-300 ${
                                errors.message ? "border-red-500 focus:border-red-500" : ""
                              }`}
                              disabled={isSubmitting}
                            />
                            {errors.message && (
                              <p className="text-sm text-red-400 mt-2 flex items-center gap-2 animate-fade-in">
                                <AlertCircle className="h-4 w-4" />
                                {errors.message}
                              </p>
                            )}
                          </div>
                          
                          <Button
                            type="submit"
                            size="lg"
                            className="w-full h-16 text-lg font-semibold group bg-gradient-to-r from-[#F34D1B] to-orange-500 hover:from-[#e04318] hover:to-orange-600 shadow-[0_10px_40px_-10px_rgba(243,77,27,0.5)] hover:shadow-[0_20px_60px_-10px_rgba(243,77,27,0.6)] transition-all duration-500 hover:scale-[1.02]"
                            disabled={isSubmitting}
                          >
                            {isSubmitting ? (
                              <>
                                <div className="h-6 w-6 border-2 border-white/30 border-t-white rounded-full animate-spin mr-3" />
                                Отправляем...
                              </>
                            ) : (
                              <>
                                Отправить заявку
                                <ArrowRight className="ml-3 h-6 w-6 transition-transform group-hover:translate-x-2" />
                              </>
                            )}
                          </Button>
                          
                          <p className="text-sm text-zinc-500 text-center pt-2">
                            Нажимая кнопку, вы соглашаетесь с{" "}
                            <a href="/privacy" target="_blank" rel="noopener noreferrer" className="text-[#F34D1B] hover:underline transition-colors">
                              политикой конфиденциальности
                            </a>
                          </p>
                        </form>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Map Section */}
        <section 
          ref={mapRef.ref}
          className="relative py-20 lg:py-28 overflow-hidden"
        >
          {/* Background transition */}
          <div className="absolute top-0 left-0 right-0 h-48 bg-gradient-to-b from-[#0B0F18] to-transparent z-10" />
          
          <div className="container mx-auto px-6 lg:px-8 relative">
            <div 
              className={`max-w-6xl mx-auto transition-all duration-1000 ${
                mapRef.isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'
              }`}
            >
              {/* Section header */}
              <div className="text-center mb-12">
                <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 text-sm font-medium bg-white/[0.04] rounded-xl border border-white/[0.06]">
                  <MapPin className="h-4 w-4 text-[#F34D1B]" />
                  <span className="text-zinc-300">Расположение</span>
                </div>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight">
                  Мы на карте
                </h2>
              </div>
              
              {/* Map container */}
              <div className="relative rounded-3xl overflow-hidden shadow-[0_30px_80px_-20px_rgba(0,0,0,0.6)] border border-white/[0.06]">
                {/* Gradient overlay on top of map for aesthetics */}
                <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-[#0B0F18]/20 via-transparent to-[#0B0F18]/10 z-10" />
                <div className="aspect-[21/9]">
                  <iframe
                    src="https://yandex.ru/map-widget/v1/?text=Санкт-Петербург%2C%20Горское%20шоссе%2C%204&z=16&scroll=false"
                    width="100%"
                    height="100%"
                    style={{ border: 0, filter: 'saturate(0.9) contrast(1.1)', position: 'relative' }}
                    allowFullScreen
                    loading="lazy"
                    scrolling="no"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="relative py-20 lg:py-28 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-[#0B0F18] via-[#0a0e15] to-[#0B0F18]" />
          
          <div className="container mx-auto px-6 lg:px-8 relative z-10">
            <div className="max-w-4xl mx-auto">
              <CTABlock
                title="Остались вопросы?"
                subtitle="Позвоните нам или напишите в мессенджер — с радостью поможем"
                buttons={[
                  {
                    text: "+7 (981) 997-66-36",
                    variant: "primary",
                    href: "tel:+79819976636",
                    icon: Phone,
                  },
                  {
                    text: "armaxrequest@gmail.com",
                    variant: "secondary",
                    href: "mailto:armaxrequest@gmail.com",
                    icon: Mail,
                  },
                ]}
              />
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Contacts;
