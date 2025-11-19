import HeroSection from "@/components/HeroSection";
import BenefitsSection from "@/components/BenefitsSection";
import AboutPreview from "@/components/AboutPreview";
import HowWeWorkSection from "@/components/HowWeWorkSection";
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
        <BenefitsSection />
        <HowWeWorkSection />
        <AboutPreview />
      </div>
    </>
  );
};

export default Index;
