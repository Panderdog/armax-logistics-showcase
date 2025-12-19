import HeroSection from "@/components/HeroSection";
import StatsSection from "@/components/StatsSection";
import { ServicesGrid } from "@/components/services";
import MarqueePartners from "@/components/MarqueePartners";
import NewsCarousel from "@/components/NewsCarousel";
import ProcessSection from "@/components/ProcessSection";
import TestimonialsPreview from "@/components/TestimonialsPreview";
import CasesSection from "@/components/CasesSection";
import CTASection from "@/components/CTASection";
import SEO from "@/components/SEO";
import { organizationSchema } from "@/lib/schema";

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
        <CTASection />
      </div>
    </>
  );
};

export default Index;
