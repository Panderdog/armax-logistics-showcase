import HeroSection from "@/components/HeroSection";
import StatsSection from "@/components/StatsSection";
import BentoGrid from "@/components/BentoGrid";
import MarqueePartners from "@/components/MarqueePartners";
import ProcessSection from "@/components/ProcessSection";
import TestimonialsPreview from "@/components/TestimonialsPreview";
import CTASection from "@/components/CTASection";
import SEO from "@/components/SEO";
import { organizationSchema } from "@/lib/schema";

const Index = () => {
  return (
    <>
      <SEO
        title="Главная"
        description="Armax Logistics — надёжные международные перевозки грузов по Европе и Азии. 15+ лет опыта, 20+ стран партнёров, 99% доставок вовремя. Организуем перевозки любой сложности."
        keywords="международные перевозки, логистика, грузоперевозки, Европа, Азия, Armax Logistics, транспортная компания, доставка грузов"
        canonicalUrl="/"
        structuredData={organizationSchema}
      />
      <div>
        <HeroSection />
        <StatsSection />
        <BentoGrid />
        <MarqueePartners />
        <ProcessSection />
        <TestimonialsPreview />
        <CTASection />
      </div>
    </>
  );
};

export default Index;
