import { Ship, Truck, Plane, Train, Package, Warehouse, FileCheck, Shield, LucideIcon } from "lucide-react";
import ServiceCard from "./ServiceCard";

interface ServiceData {
  id: string;
  icon: LucideIcon;
  title: string;
  description: string;
  image: string;
}

const servicesData: ServiceData[] = [
  {
    id: "sea",
    icon: Ship,
    title: "Морские перевозки",
    description: "Контейнерные перевозки из Китая, Индии и Турции.",
    image: "/images/service-images/sea-service.webp",
  },
  {
    id: "aviation",
    icon: Plane,
    title: "Авиадоставка",
    description: "Срочные грузы за 3–5 дней.",
    image: "/images/service-images/air-service.webp",
  },
  {
    id: "railway",
    icon: Train,
    title: "ЖД перевозки",
    description: "Надёжная доставка из Китая за 28–35 дней.",
    image: "/images/service-images/train-service.webp",
  },
  {
    id: "auto",
    icon: Truck,
    title: "Автоперевозки",
    description: "Доставка до двери из Азии и Европы.",
    image: "/images/truck.webp",
  },
  {
    id: "customs",
    icon: FileCheck,
    title: "Таможенное оформление",
    description: "Полное сопровождение документов.",
    image: "/images/customs.webp",
  },
  {
    id: "consolidated",
    icon: Package,
    title: "Сборные грузы",
    description: "Консолидация от 1 коробки до паллет.",
    image: "/images/service-images/sbor-service.webp",
  },
  {
    id: "warehouse",
    icon: Warehouse,
    title: "Складское хранение",
    description: "Хранение и обработка в Санкт-Петербурге.",
    image: "/images/service-images/sklad1-service.webp",
  },
  {
    id: "insurance",
    icon: Shield,
    title: "Страхование грузов",
    description: "Защита при перевозке и хранении.",
    image: "/images/service-images/safe1-service.webp",
  },
];

const ServicesGrid = () => {
  return (
    <section className="pt-8 lg:pt-12 pb-20 lg:pb-28 bg-[#0a0f1a]">
      <div className="container mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-2xl mb-10 lg:mb-14">
          <span className="inline-block px-4 py-1.5 mb-5 text-sm font-medium text-[#F34D1B] bg-[#F34D1B]/10 rounded-full border border-[#F34D1B]/20">
            Услуги
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-5 tracking-tight">
            Логистические
            <br />
            <span className="text-[#F34D1B]">решения</span>
          </h2>
          <p className="text-lg text-white/50 font-light">
            Полный цикл от забора груза до доставки
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 auto-rows-[340px]">
          {servicesData.map((service) => (
            <ServiceCard
              key={service.id}
              id={service.id}
              icon={service.icon}
              title={service.title}
              description={service.description}
              image={service.image}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesGrid;
