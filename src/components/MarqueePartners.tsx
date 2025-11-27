const partners = [
  { name: "MAERSK", image: "/images/containers-cropped/maersk.png" },
  { name: "MSC", image: "/images/containers-cropped/msc.png" },
  { name: "CMA CGM", image: "/images/containers-cropped/cma-cgm.png" },
  { name: "OOCL", image: "/images/containers-cropped/oocl.png" },
  { name: "ONE", image: "/images/containers-cropped/one-big.png" },
  { name: "FESCO", image: "/images/containers-cropped/fesco.png" },
  { name: "Hapag-Lloyd", image: "/images/containers-cropped/hapag-lloyd.png" },
  { name: "Evergreen", image: "/images/containers-cropped/evergreen.png" },
  { name: "Yang Ming", image: "/images/containers-cropped/yang ming.png" },
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
    <section className="py-16 lg:py-20 bg-secondary/40 overflow-hidden relative">
      {/* Top and bottom fade effects */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      
      <div className="container mx-auto px-6 lg:px-8 mb-12">
        <div className="text-center">
          <span className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
            Работаем с ведущими мировыми перевозчиками
          </span>
        </div>
      </div>

      {/* Marquee container */}
      <div className="relative">
        {/* Left fade */}
        <div className="absolute left-0 top-0 bottom-0 w-32 lg:w-64 bg-gradient-to-r from-secondary/40 via-secondary/40 to-transparent z-10 pointer-events-none" />
        
        {/* Right fade */}
        <div className="absolute right-0 top-0 bottom-0 w-32 lg:w-64 bg-gradient-to-l from-secondary/40 via-secondary/40 to-transparent z-10 pointer-events-none" />

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
