import { 
  Truck, Ship, Plane, Train, Package, FileCheck, Warehouse, Shield,
  LucideIcon
} from "lucide-react";

export type ServiceId =
  | "sea"
  | "aviation"
  | "auto"
  | "railway"
  | "consolidated"
  | "customs"
  | "warehouse"
  | "insurance";

export interface ServiceData {
  id: ServiceId;
  icon: LucideIcon;
  title: string;
  subtitle: string;
  description: string;
  features: string[];
  stats: { value: string; label: string };
  image: string;
  color: string;
  hoverBorder: string;
}

export const services: ServiceData[] = [
  {
    id: "sea",
    icon: Ship,
    title: "Морские перевозки",
    subtitle: "из Азии и Турции",
    description: "Организуем полный цикл морской перевозки: забор груза, документация, подбор линий, контроль на каждом этапе.",
    features: ["FCL и LCL контейнеры", "Мультимодальные перевозки", "Консолидация грузов"],
    stats: { value: "35-45", label: "дней" },
    image: "/images/service-images/sea-service.webp",
    color: "from-blue-600 to-cyan-500",
    hoverBorder: "hover:border-blue-500/30",
  },
  {
    id: "aviation",
    icon: Plane,
    title: "Авиаперевозки",
    subtitle: "экспресс доставка",
    description: "Полная организация воздушной логистики: приём груза, подготовка документов, контроль расписаний.",
    features: ["Проверенные авиалинии", "Точные сроки", "Экспресс-доставка"],
    stats: { value: "3-7", label: "дней" },
    image: "/images/service-images/air-service.webp",
    color: "from-sky-500 to-blue-600",
    hoverBorder: "hover:border-sky-500/30",
  },
  {
    id: "auto",
    icon: Truck,
    title: "Автоперевозки",
    subtitle: "из Азии, Турции и Европы",
    description: "Гибкость маршрутов и оптимальное сочетание стоимости и скорости. Доставка до двери.",
    features: ["FTL и LTL", "GPS-мониторинг", "Доставка до двери"],
    stats: { value: "14-21", label: "дней" },
    image: "/images/truck.webp",
    color: "from-orange-500 to-amber-500",
    hoverBorder: "hover:border-orange-500/30",
  },
  {
    id: "railway",
    icon: Train,
    title: "ЖД перевозки",
    subtitle: "из Китая",
    description: "Сбалансированное решение по срокам и стоимости. Регулярные рейсы и прозрачная логистика.",
    features: ["Сроки 28–35 дней", "Высокая надёжность", "Еженедельные рейсы"],
    stats: { value: "28-35", label: "дней" },
    image: "/images/service-images/train-service.webp",
    color: "from-amber-500 to-yellow-500",
    hoverBorder: "hover:border-amber-500/30",
  },
  {
    id: "consolidated",
    icon: Package,
    title: "Сборные грузы",
    subtitle: "небольшие партии",
    description: "Консолидация грузов от 1 коробки до нескольких паллет.",
    features: ["От 1 коробки", "Склады в Китае и Турции", "Регулярные отправки"],
    stats: { value: "от 1", label: "коробки" },
    image: "/images/service-images/sbor-service.webp",
    color: "from-rose-500 to-pink-500",
    hoverBorder: "hover:border-rose-500/30",
  },
  {
    id: "customs",
    icon: FileCheck,
    title: "Таможенное оформление",
    subtitle: "под ключ",
    description: "Готовим декларации, подбираем коды ТН ВЭД, рассчитываем платежи, представляем ваши интересы.",
    features: ["Выпуск за 1-2 дня", "99% без замечаний", "15+ лет опыта"],
    stats: { value: "1-2", label: "дня" },
    image: "/images/customs.webp",
    color: "from-emerald-500 to-teal-500",
    hoverBorder: "hover:border-emerald-500/30",
  },
  {
    id: "warehouse",
    icon: Warehouse,
    title: "Ответственное хранение",
    subtitle: "грузов в СПб",
    description: "Современный складской комплекс: приёмка, хранение, комплектация, переупаковка, таможенный склад.",
    features: ["5000+ м² площадь", "WMS-система", "24/7 работа"],
    stats: { value: "5000+", label: "м²" },
    image: "/images/service-images/sklad1-service.webp",
    color: "from-indigo-500 to-violet-500",
    hoverBorder: "hover:border-indigo-500/30",
  },
  {
    id: "insurance",
    icon: Shield,
    title: "Страхование грузов",
    subtitle: "полное покрытие",
    description: "Страховое покрытие от утраты и повреждения груза. Работаем с топ-10 страховщиков России.",
    features: ["От 0.1% стоимости", "100% покрытие", "Быстрые выплаты"],
    stats: { value: "0.1%", label: "от стоимости" },
    image: "/images/service-images/safe1-service.webp",
    color: "from-cyan-500 to-sky-500",
    hoverBorder: "hover:border-cyan-500/30",
  },
];

export const serviceIds = services.map((s) => s.id);
