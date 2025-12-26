import HeroSection from "@/components/HeroSection";
import StatsSection from "@/components/StatsSection";
import { ServicesGrid } from "@/components/services";
import MarqueePartners from "@/components/MarqueePartners";
import NewsCarousel from "@/components/NewsCarousel";
import ProcessSection from "@/components/ProcessSection";
import TestimonialsPreview from "@/components/TestimonialsPreview";
import CasesSection from "@/components/CasesSection";
import CTABlock from "@/components/CTABlock";
import SEO from "@/components/SEO";
import { organizationSchema } from "@/lib/schema";
import { Phone, MessageCircle, Mail, Send } from "lucide-react";

const Index = () => {
  return (
    <>
      <SEO
        title="Главная"
        description="Armax Logistics — надёжные международные перевозки грузов по Европе и Азии. 16+ лет опыта, 1000+ деклараций в 2025, 99% доставок вовремя. Организуем перевозки любой сложности."
        keywords="международные перевозки, логистика, грузоперевозки, Европа, Азия, Armax Logistics, транспортная компания, доставка грузов, таможенное оформление, декларирование"
        canonicalUrl="/"
        structuredData={organizationSchema}
      />
      <div>
        <HeroSection />
        <StatsSection />
        <ServicesGrid />
        <MarqueePartners />
        <ProcessSection />
        <TestimonialsPreview />
        <CasesSection />
        <NewsCarousel />
        
        {/* CTA Section */}
        <section className="relative py-24 lg:py-32 overflow-hidden">
          {/* Background image with overlay */}
          <div className="absolute inset-0 bg-[url('/nightport.jpg')] bg-cover bg-center bg-fixed" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0B0F18] via-[#0B0F18]/95 to-[#0B0F18]/85" />

          <div className="container mx-auto px-6 lg:px-8 relative z-10">
            <div className="max-w-4xl mx-auto">
              <CTABlock
                title={
                  <>
                    <span className="text-white">Готовы оптимизировать </span>
                    <span className="bg-gradient-to-r from-[#F34D1B] via-orange-400 to-[#F34D1B] bg-clip-text text-transparent">
                      вашу логистику?
                    </span>
                  </>
                }
                subtitle="Получите персональное предложение в течение 30 минут. Расскажите нам о вашем грузе."
                buttons={[
                  {
                    text: "Получить расчёт бесплатно",
                    variant: "primary",
                  },
                  {
                    text: "Позвонить сейчас",
                    variant: "secondary",
                    href: "tel:+78126440291",
                    icon: Phone,
                  },
                ]}
              >
                {/* Contact options */}
                <div className="flex flex-wrap items-center justify-center gap-8 text-white/60">
                  <a 
                    href="tel:+78126440291" 
                    className="flex items-center gap-2 hover:text-white transition-colors group"
                  >
                    <Phone className="h-5 w-5 text-accent group-hover:scale-110 transition-transform" />
                    <span>+7 (812) 644-02-91</span>
                  </a>
                  <a 
                    href="mailto:info@armaxstp.com" 
                    className="flex items-center gap-2 hover:text-white transition-colors group"
                  >
                    <Mail className="h-5 w-5 text-accent group-hover:scale-110 transition-transform" />
                    <span>info@armaxstp.com</span>
                  </a>
                  <a 
                    href="https://wa.me/78126440291" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 hover:text-white transition-colors group"
                  >
                    <MessageCircle className="h-5 w-5 text-accent group-hover:scale-110 transition-transform" />
                    <span>WhatsApp</span>
                  </a>
                  <a 
                    href="https://t.me/armaxlogistics" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 hover:text-white transition-colors group"
                  >
                    <Send className="h-5 w-5 text-accent group-hover:scale-110 transition-transform" />
                    <span>Telegram</span>
                  </a>
                </div>
              </CTABlock>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Index;
