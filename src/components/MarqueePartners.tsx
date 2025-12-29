import { Sparkles } from "lucide-react";

const partners = [
  { name: "MAERSK", image: "/images/containers-cropped/maersk.webp" },
  { name: "MSC", image: "/images/containers-cropped/msc.webp" },
  { name: "CMA CGM", image: "/images/containers-cropped/cma-cgm.webp" },
  { name: "OOCL", image: "/images/containers-cropped/oocl.webp" },
  { name: "ONE", image: "/images/containers-cropped/one-big.webp" },
  { name: "FESCO", image: "/images/containers-cropped/fesco.webp" },
  { name: "Hapag-Lloyd", image: "/images/containers-cropped/hapag-lloyd.webp" },
  { name: "Evergreen", image: "/images/containers-cropped/evergreen.webp" },
  { name: "Yang Ming", image: "/images/containers-cropped/yang-ming.webp" },
];

const PartnerCard = ({ name, image }: { name: string; image: string }) => (
  <div className="flex-shrink-0 px-2 lg:px-4">
    <div className="flex items-center justify-center transition-all duration-500 cursor-default h-[70px] lg:h-[90px]">
      <img
        src={image}
        alt={`${name} контейнер`}
        className="h-full w-auto object-contain drop-shadow-md hover:drop-shadow-lg hover:scale-105 transition-all duration-300"
        loading="lazy"
      />
    </div>
  </div>
);

const MarqueePartners = () => {
  return (
    <section className="py-16 lg:py-20 bg-[#EDE7DF] overflow-hidden relative">
      {/* Top and bottom fade effects */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      
      <div className="container mx-auto px-6 lg:px-8 mb-12">
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-8 text-sm font-medium bg-white border border-border/50 rounded-xl shadow-sm">
            <Sparkles className="w-4 h-4 text-[#F34D1B]" />
            <span className="text-foreground">
              Наши партнёры
            </span>
          </div>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Работаем с ведущими мировыми перевозчиками
          </h2>
          <p className="text-muted-foreground text-base lg:text-lg">
            Прямые контракты с крупнейшими судоходными линиями гарантируют лучшие ставки и приоритетное размещение грузов
          </p>
        </div>
      </div>

      {/* Marquee container */}
      <div className="relative">
        {/* First marquee row */}
        <div className="mb-6 overflow-hidden">
          <div className="marquee-track animate-marquee">
            {partners.map((partner, index) => (
              <PartnerCard key={`row1-a-${index}`} name={partner.name} image={partner.image} />
            ))}
            {partners.map((partner, index) => (
              <PartnerCard key={`row1-b-${index}`} name={partner.name} image={partner.image} />
            ))}
          </div>
        </div>

        {/* Second marquee row - reverse direction */}
        <div className="overflow-hidden">
          <div className="marquee-track animate-marquee-reverse">
            {[...partners].reverse().map((partner, index) => (
              <PartnerCard key={`row2-a-${index}`} name={partner.name} image={partner.image} />
            ))}
            {[...partners].reverse().map((partner, index) => (
              <PartnerCard key={`row2-b-${index}`} name={partner.name} image={partner.image} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MarqueePartners;
