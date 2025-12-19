import { useParams, Link, useNavigate } from "react-router-dom";
import { 
  Truck, Ship, Plane, Train, Package, FileCheck, Warehouse, Shield, 
  ArrowRight, ArrowLeft, Clock, Globe, Users, Sparkles, 
  ChevronRight, Phone, MessageCircle,
  // Иконки для features
  Container, Route, Boxes, Anchor, MapPin, ShieldCheck,
  PlaneTakeoff, Timer, CalendarClock, PackageCheck, Radar, Zap,
  Navigation, Home, GitBranch, Satellite, BadgeCheck, TruckIcon,
  TrainTrack, Calendar, BookCheck, Headphones, RefreshCw,
  Box, WarehouseIcon, ShipWheel, FileText, Calculator,
  ThermometerSun, LayoutGrid, DollarSign, Percent, Award, Scale,
  ClipboardCheck, Search, Receipt, FileSignature, Gavel, Eye,
  PackageOpen, Tags, Building2, Snowflake, MonitorCheck,
  ShieldAlert, Banknote, Building, BadgeDollarSign, HandCoins, HeartHandshake,
  LucideIcon
} from "lucide-react";
import { Button } from "@/components/ui/button";
import SEO from "@/components/SEO";
import { organizationSchema } from "@/lib/schema";
import { useApplicationModal } from "@/contexts/ApplicationModalContext";

// Данные об услугах
const servicesData = {
  sea: {
    id: "sea",
    icon: Ship,
    title: "Морские перевозки из Азии и Турции",
    heroTitle: "Морские перевозки",
    heroAccent: "из Азии и Турции",
    subtitle: "Надёжная доставка контейнеров с оптимальными сроками и тарифами",
    description: "Организуем полный цикл морской перевозки: забор груза, документация, подбор линий, контроль на каждом этапе. Работаем с FCL, LCL и мультимодальными схемами, обеспечивая стабильные сроки и выгодную стоимость доставки.",
    longDescription: `Морские контейнерные перевозки — основа международной логистики. Мы обеспечиваем доставку грузов из ключевых портов Китая, Юго-Восточной Азии и Турции в Россию через Санкт-Петербург, Новороссийск и порты Дальнего Востока.

Наша команда подбирает оптимальные линии и маршруты под каждую задачу, контролирует движение контейнера на всех этапах и обеспечивает своевременное таможенное оформление.`,
    features: [
      { title: "FCL и LCL контейнеры", desc: "Полная и сборная загрузка под ваши объёмы", icon: Container },
      { title: "Мультимодальные перевозки", desc: "Комбинируем море, ЖД и авто для оптимального маршрута", icon: Route },
      { title: "Консолидация грузов", desc: "Сборные отправки от 1 м³ с регулярными рейсами", icon: Boxes },
      { title: "Подбор оптимальных линий", desc: "Работаем с 20+ морскими линиями", icon: Anchor },
      { title: "Контроль на каждом этапе", desc: "Отслеживание в реальном времени", icon: MapPin },
      { title: "Страхование груза", desc: "Полное покрытие рисков при перевозке", icon: ShieldCheck },
    ],
    stats: [
      { value: "35-45", label: "дней доставка из Китая" },
      { value: "20+", label: "морских линий" },
      { value: "500+", label: "контейнеров в год" },
    ],
    process: [
      { step: 1, title: "Заявка и расчёт", desc: "Анализируем характеристики груза, маршрут и сроки, рассчитываем стоимость перевозки" },
      { step: 2, title: "Бронирование", desc: "Резервируем место на судне, согласовываем график отправки и прибытия" },
      { step: 3, title: "Забор груза", desc: "Организуем доставку до порта отправления" },
      { step: 4, title: "Морская перевозка", desc: "Контролируем движение контейнера на всём маршруте и регулярно информируем клиента о статусе" },
      { step: 5, title: "Таможня и доставка", desc: "Оформляем таможенные процедуры и доставляем груз до склада или двери получателя" },
    ],
    image: "/images/service-images/sea-service.webp",
    heroImage: "/images/port-by-air.webp",
    color: "from-blue-600 to-cyan-500",
    bgColor: "bg-blue-600",
    lightColor: "text-blue-500",
    ctaButtonText: "Запросить ставку",
  },
  aviation: {
    id: "aviation",
    icon: Plane,
    title: "Авиаперевозки из Азии и Турции",
    heroTitle: "Авиаперевозки",
    heroAccent: "из Азии и Турции",
    subtitle: "Авиадоставка срочных и ценных грузов",
    description: "Организуем авиаперевозки грузов под ключ: приём груза, подготовка документов, контроль рейсов и отправок. Работаем с проверенными авиалиниями, обеспечивая точные сроки, безопасность и прозрачное отслеживание.",
    longDescription: `Авиаперевозки грузов — оптимальное решение для срочной доставки из Азии и Турции. Мы организуем полный цикл воздушной логистики с гарантией сроков и сохранности груза.

Работаем с ведущими авиакомпаниями, обеспечиваем полный комплекс услуг от забора груза до доставки «до двери». Специализируемся на маршрутах из Китая, Турции и других стран Азии в Россию.`,
    features: [
      { title: "Проверенные авиалинии", desc: "Партнёрство с 15+ авиакомпаниями", icon: PlaneTakeoff },
      { title: "Точные сроки доставки", desc: "От 3 до 7 дней из Азии и Турции", icon: Timer },
      { title: "Контроль расписаний", desc: "Мониторинг рейсов 24/7", icon: CalendarClock },
      { title: "Безопасность груза", desc: "Специальная упаковка и обработка", icon: PackageCheck },
      { title: "Прозрачный мониторинг", desc: "Трекинг на каждом этапе", icon: Radar },
      { title: "Срочные отправки", desc: "Экспресс-доставка за 24-48 часов", icon: Zap },
    ],
    stats: [
      { value: "3-7", label: "дней доставка" },
      { value: "15+", label: "авиалиний" },
      { value: "24/7", label: "отслеживание" },
    ],
    process: [
      { step: 1, title: "Запрос и расчёт стоимости", desc: "Анализируем характеристики груза и условия перевозки" },
      { step: 2, title: "Бронирование рейса", desc: "Резервируем место, согласовываем дату вылета" },
      { step: 3, title: "Подготовка груза", desc: "Упаковка, маркировка, оформление документов" },
      { step: 4, title: "Перелёт", desc: "Контроль погрузки, мониторинг рейса и статуса отправки" },
      { step: 5, title: "Получение", desc: "Таможня, доставка на склад или адрес" },
    ],
    image: "/images/service-images/air-service.webp",
    heroImage: "/images/airplane.webp",
    color: "from-sky-500 to-blue-600",
    bgColor: "bg-sky-500",
    lightColor: "text-sky-500",
    ctaButtonText: "Запросить ставку",
  },
  auto: {
    id: "auto",
    icon: Truck,
    title: "Автоперевозки из Азии и Турции",
    heroTitle: "Автоперевозки",
    heroAccent: "из Азии и Турции",
    subtitle: "Быстрая доставка оптимальным маршрутом «до двери»",
    description: "Автомобильная логистика обеспечивает точные сроки, гибкость маршрутов и оптимальное сочетание стоимости и скорости. Формируем индивидуальные схемы движения, контролируем груз на всех этапах и обеспечиваем стабильный сервис.",
    longDescription: `Автомобильные перевозки — универсальное решение для грузов любого объёма. Мы организуем доставку через Турцию, Грузию, Казахстан и страны ЕАЭС с оптимальными сроками и стоимостью.

Наши преимущества — гибкость маршрутов, доставка «до двери» и персональный контроль каждой отправки. Работаем с надёжными перевозчиками, гарантируем сохранность груза.`,
    features: [
      { title: "Гибкость маршрутов", desc: "Подбираем оптимальный путь под каждый груз", icon: Navigation },
      { title: "Доставка «до двери»", desc: "От склада отправителя до адреса получателя", icon: Home },
      { title: "Индивидуальные схемы", desc: "Регулярные и разовые автомобильные перевозки", icon: GitBranch },
      { title: "Контроль на всех этапах", desc: "Оперативная связь и статус на каждом этапе доставки", icon: Satellite },
      { title: "Стабильный сервис", desc: "Работаем с проверенными партнёрами и перевозчиками", icon: BadgeCheck },
      { title: "FTL и LTL", desc: "Полная и частичная загрузка", icon: TruckIcon },
    ],
    stats: [
      { value: "14-21", label: "дней из Турции" },
      { value: "20-22", label: "дня из Китая" },
      { value: "100+", label: "перевозчиков" },
    ],
    process: [
      { step: 1, title: "Заявка", desc: "Получаем параметры груза и адреса" },
      { step: 2, title: "Расчёт маршрута", desc: "Определяем оптимальный путь и стоимость" },
      { step: 3, title: "Забор груза", desc: "Подаём транспорт, загружаем товар" },
      { step: 4, title: "Перевозка", desc: "Контролируем движение, проходим границы" },
      { step: 5, title: "Доставка", desc: "Выгрузка на вашем складе или адресе" },
    ],
    image: "/images/truck.webp",
    heroImage: "/images/truck.webp",
    color: "from-orange-500 to-amber-500",
    bgColor: "bg-orange-500",
    lightColor: "text-orange-500",
    ctaButtonText: "Запросить ставку",
  },
  railway: {
    id: "railway",
    icon: Train,
    title: "Железнодорожные перевозки из Китая",
    heroTitle: "ЖД перевозки",
    heroAccent: "из Китая",
    subtitle: "Сбалансированное решение по срокам и стоимости",
    description: "ЖД-перевозки обеспечивают устойчивые сроки (28–35 дней), высокую надёжность и минимальную зависимость от внешних факторов. Организуем бронирование контейнеров, оформление документов и полное сопровождение до российских терминалов.",
    ctaTitle: "Рассчитаем ЖД-перевозку под ваш маршрут",
    ctaSubtitle: "Стоимость, сроки и формат отправки — в течение 30 минут",
    longDescription: `Железнодорожные контейнерные перевозки — золотая середина между морем и авиа. Стабильные сроки, конкурентная стоимость и независимость от погодных условий делают ЖД оптимальным выбором для регулярных поставок.

Мы организуем перевозки по маршрутам Китай–Россия через погранпереходы Забайкальск, Достык/Алтынколь с доставкой до Москвы, Санкт-Петербурга и других городов.`,
    features: [
      { title: "Сроки 28–35 дней", desc: "Стабильное время транзита", icon: Timer },
      { title: "Высокая надёжность", desc: "Минимум внешних факторов", icon: ShieldCheck },
      { title: "Бронирование контейнеров", desc: "Гарантированное место в составе", icon: Container },
      { title: "Оформление документов", desc: "Полный комплект для таможни", icon: FileText },
      { title: "Сопровождение до терминала", desc: "Контроль на всём маршруте", icon: MapPin },
      { title: "Регулярные отправки", desc: "1–2 отправки / неделя", icon: Calendar },
    ],
    stats: [
      { value: "28-35", label: "дней транзит" },
      { value: "3", label: "погранперехода" },
      { value: "1-2", label: "отправки / неделя" },
    ],
    process: [
      { step: 1, title: "Заявка", desc: "Получаем информацию о грузе и маршруте" },
      { step: 2, title: "Бронирование", desc: "Резервируем контейнер под конкретный поезд и маршрут" },
      { step: 3, title: "Загрузка", desc: "Организуем доставку до станции отправления" },
      { step: 4, title: "Перевозка", desc: "Контроль движения состава и прохождения погранпереходов" },
      { step: 5, title: "Прибытие", desc: "Таможенное оформление и доставка до получателя" },
    ],
    image: "/images/service-images/train-service.webp",
    heroImage: "/images/service-images/train-service.webp",
    color: "from-amber-500 to-yellow-500",
    bgColor: "bg-amber-500",
    lightColor: "text-amber-500",
    ctaButtonText: "Запросить ставку",
  },
  consolidated: {
    id: "consolidated",
    icon: Package,
    title: "Международные перевозки сборных грузов",
    heroTitle: "Сборные грузы",
    heroAccent: "из Азии и Турции",
    subtitle: "Консолидация небольших партий грузов",
    description: "Консолидация грузов от 1 коробки на зарубежных складах с отправкой морем, авто или ЖД и полным документальным сопровождением.",
    longDescription: `Сборные перевозки — оптимальное решение для небольших партий товара. Мы консолидируем грузы от разных отправителей на складах в Китае и Турции, формируем сборные контейнеры и отправляем с регулярными рейсами.

Это позволяет значительно снизить стоимость логистики при сохранении надёжности и предсказуемости сроков доставки.`,
    features: [
      { title: "От 1 коробки до паллет", desc: "Любой объём груза", icon: Box },
      { title: "Консолидация на складах", desc: "Склады в Китае и Турции", icon: Warehouse },
      { title: "Доставка морем, авто, ЖД", desc: "Выбор оптимального транспорта", icon: Route },
      { title: "Документальное сопровождение", desc: "Полный комплект для таможни", icon: FileText },
      { title: "Экономия за счёт консолидации", desc: "Платите только за свой объём", icon: Percent },
      { title: "Регулярные отправки", desc: "Еженедельные рейсы", icon: RefreshCw },
    ],
    stats: [
      { value: "от 1", label: "коробки" },
      { value: "40%", label: "экономия" },
      { value: "2", label: "склада за рубежом" },
    ],
    process: [
      { step: 1, title: "Запрос и расчёт", desc: "Уточняем параметры груза и условия доставки" },
      { step: 2, title: "Приёмка на складе", desc: "Регистрируем, маркируем и готовим к отправке" },
      { step: 3, title: "Консолидация", desc: "Формируем сборную партию под оптимальный тариф" },
      { step: 4, title: "Отправка по графику", desc: "Бронируем место и контролируем отгрузку" },
      { step: 5, title: "Таможня и доставка получателю", desc: "Оформление и передача груза" },
    ],
    image: "/images/service-images/sbor-service.webp",
    heroImage: "/images/service-images/sbor-service.webp",
    color: "from-rose-500 to-pink-500",
    bgColor: "bg-rose-500",
    lightColor: "text-rose-500",
    ctaButtonText: "Запросить ставку",
  },
  customs: {
    id: "customs",
    icon: FileCheck,
    title: "Таможенное оформление «под ключ»",
    heroTitle: "Таможенное оформление",
    heroAccent: "«под ключ»",
    subtitle: "Быстрое и безопасное прохождение таможенных процедур",
    description: "Готовим декларации, подбираем коды ТН ВЭД, рассчитываем платежи, оформляем разрешительные документы и представляем ваши интересы в таможенных органах. Сопровождаем досмотры и экспертизы, минимизируем риски задержек.",
    longDescription: `Таможенное оформление — ключевой этап международной логистики. Наши специалисты имеют многолетний опыт работы с любыми категориями товаров и знают особенности оформления на всех постах.

Мы берём на себя полный цикл таможенных операций: от подготовки документов до выпуска груза. Работаем быстро, прозрачно и с минимальными рисками для клиента.`,
    features: [
      { title: "Подготовка деклараций", desc: "Полный комплект документов для подачи декларации", icon: ClipboardCheck },
      { title: "Подбор кодов ТН ВЭД", desc: "Корректная классификация товара", icon: Search },
      { title: "Расчёт платежей", desc: "Расчёт пошлин, НДС и таможенных сборов", icon: Calculator },
      { title: "Разрешительные документы", desc: "Оформление разрешительной документации", icon: FileSignature },
      { title: "Представительство в органах", desc: "Представление интересов в таможенных органах", icon: Gavel },
      { title: "Сопровождение досмотров", desc: "Сопровождение таможенных досмотров", icon: Eye },
    ],
    stats: [
      { value: "1-2", label: "дня оформление" },
      { value: "1000+", label: "деклараций в год" },
      { value: "15+", label: "лет опыта" },
    ],
    process: [
      { step: 1, title: "Документы", desc: "Проверяем комплектность и соответствие требованиям ФТС до подачи декларации" },
      { step: 2, title: "Проверка", desc: "Определяем код ТН ВЭД и риски до начала оформления" },
      { step: 3, title: "Расчёт", desc: "Фиксируем платежи, сроки и возможные сценарии до подачи декларации" },
      { step: 4, title: "Декларирование", desc: "Подаём ДТ и сопровождаем взаимодействие с таможней до выпуска" },
      { step: 5, title: "Выпуск", desc: "Доводим груз до выпуска без задержек и доначислений" },
    ],
    image: "/images/customs.png",
    heroImage: "/images/customs.png",
    color: "from-emerald-500 to-teal-500",
    bgColor: "bg-emerald-500",
    lightColor: "text-emerald-500",
    ctaButtonText: "Рассчитать пошлину",
    ctaTitle: "Рассчитать таможенное оформление",
    ctaSubtitle: "Получите предварительный расчёт стоимости и сроков таможенного оформления",
  },
  warehouse: {
    id: "warehouse",
    icon: Warehouse,
    title: "Ответственное хранение грузов",
    heroTitle: "Ответственное хранение",
    heroAccent: "грузов",
    subtitle: "Современный складской комплекс в Санкт-Петербурге",
    description: "Приёмка, размещение, хранение, ПРР, комплектация, переупаковка и маркировка, включая таможенный склад.\n\nКонтроль условий хранения, безопасность и оперативная обработка заявок.",
    longDescription: `Наш складской комплекс в Санкт-Петербурге предоставляет полный спектр услуг по хранению и обработке грузов. Мы работаем с грузами любой сложности, включая товары под таможенным контролем.

Современное складское оборудование и опытный персонал обеспечивают сохранность грузов и оперативную обработку. Работаем в круглосуточном режиме, с контролем на всех этапах хранения.`,
    features: [
      { title: "Приёмка и размещение", desc: "Обработка груза в день поступления", icon: PackageOpen },
      { title: "Таможенно-логистический комплекс", desc: "Полный цикл складских и таможенных операций в одном месте", icon: Boxes },
      { title: "Переупаковка и маркировка", desc: "Подготовка к отправке", icon: Tags },
      { title: "Склад временного хранения", desc: "Хранение грузов до завершения таможенных процедур", icon: Building2 },
      { title: "Контроль условий хранения", desc: "Температура, влажность, безопасность", icon: ThermometerSun },
      { title: "Погрузо-разгрузочные работы", desc: "Механизированная обработка грузов и контейнеров", icon: MonitorCheck },
    ],
    stats: [
      { value: "5000+", label: "м² площадь" },
      { value: "24/7", label: "режим работы" },
      { value: "0", label: "страховых случаев за 10 лет" },
    ],
    process: [
      { step: 1, title: "Заявка", desc: "Согласовываем объём и условия хранения" },
      { step: 2, title: "Приёмка", desc: "Принимаем груз, проверяем количество и состояние упаковки" },
      { step: 3, title: "Размещение", desc: "Размещаем груз на складе согласно условиям хранения" },
      { step: 4, title: "Хранение", desc: "Контролируем условия, обеспечиваем безопасность" },
      { step: 5, title: "Отгрузка", desc: "Подготавливаем груз и отгружаем по заявке" },
    ],
    image: "/images/service-images/sklad1-service.webp",
    heroImage: "/images/service-images/sklad1-service.webp",
    color: "from-indigo-500 to-violet-500",
    bgColor: "bg-indigo-500",
    lightColor: "text-indigo-500",
    ctaButtonText: "Получить расчёт",
    ctaSubtitle: "Получите расчёт стоимости ответственного хранения грузов за 30 минут",
  },
  insurance: {
    id: "insurance",
    icon: Shield,
    title: "Управление страховыми рисками",
    heroTitle: "Страхование",
    heroAccent: "грузов",
    subtitle: "Финансовая защита товаров при перевозке и хранении",
    description: "Страхование используется как часть логистического сопровождения и подбирается под конкретную перевозку. Мы учитываем маршрут, тип груза и этапы доставки, а при наступлении страхового случая сопровождаем процесс урегулирования.",
    longDescription: `Страхование используется как часть логистического сопровождения и подбирается под конкретную перевозку. Мы учитываем маршрут, тип груза и этапы доставки.

При наступлении страхового случая сопровождаем весь процесс урегулирования — взаимодействуем со страховой компанией, готовим документы и контролируем выплату компенсации.`,
    features: [
      { title: "Риски утраты", desc: "Страхование груза на случай полной или частичной утраты", icon: ShieldAlert },
      { title: "Риски повреждения", desc: "Покрытие ущерба при транспортировке и перегрузке", icon: ShieldCheck },
      { title: "Партнёрские страховщики", desc: "Работаем с надёжными страховыми компаниями", icon: Building },
      { title: "Индивидуальные условия", desc: "Тариф рассчитывается под конкретную перевозку", icon: BadgeDollarSign },
      { title: "Подбор страхового покрытия", desc: "С учётом маршрута, груза и этапов доставки", icon: FileSignature },
      { title: "Сопровождение страхового случая", desc: "Взаимодействие со страховщиком до завершения", icon: HandCoins },
    ],
    process: [
      { step: 1, title: "Запрос", desc: "Анализируем данные о грузе и маршруте" },
      { step: 2, title: "Расчёт", desc: "Рассчитываем условия страхования" },
      { step: 3, title: "Оформление", desc: "Оформляем полис в соответствии с маршрутом и грузом" },
      { step: 4, title: "Перевозка", desc: "Груз находится под страховой защитой на всём маршруте" },
      { step: 5, title: "Урегулирование", desc: "Сопровождаем урегулирование страхового случая" },
    ],
    image: "/images/service-images/safe1-service.webp",
    heroImage: "/images/service-images/safe1-service.webp",
    color: "from-cyan-500 to-sky-500",
    bgColor: "bg-cyan-500",
    lightColor: "text-cyan-500",
    ctaButtonText: "Рассчитать страхование",
    ctaTitle: "Рассчитаем условия страхования",
    ctaSubtitle: "Подберём страховое покрытие под маршрут и тип груза в течение 30 минут",
  },
};

// Список услуг для навигации
const servicesList = [
  { id: "sea", title: "Морские перевозки", icon: Ship },
  { id: "aviation", title: "Авиаперевозки", icon: Plane },
  { id: "auto", title: "Автоперевозки", icon: Truck },
  { id: "railway", title: "ЖД перевозки", icon: Train },
  { id: "consolidated", title: "Сборные грузы", icon: Package },
  { id: "customs", title: "Таможня", icon: FileCheck },
  { id: "warehouse", title: "Склад", icon: Warehouse },
  { id: "insurance", title: "Управление рисками", icon: Shield },
];

const ServiceDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { openApplicationModal } = useApplicationModal();
  
  const service = servicesData[id as keyof typeof servicesData];
  
  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Услуга не найдена</h1>
          <Button asChild>
            <Link to="/services">Вернуться к услугам</Link>
          </Button>
        </div>
      </div>
    );
  }

  // Находим предыдущую и следующую услугу
  const currentIndex = servicesList.findIndex(s => s.id === id);
  const prevService = currentIndex > 0 ? servicesList[currentIndex - 1] : null;
  const nextService = currentIndex < servicesList.length - 1 ? servicesList[currentIndex + 1] : null;

  // Рекомендуемые услуги (исключаем текущую)
  const relatedServices = servicesList.filter(s => s.id !== id).slice(0, 4);

  return (
    <>
      <SEO
        title={service.title}
        description={service.description}
        keywords={`${service.title}, международные перевозки, логистика, Armax Logistics`}
        canonicalUrl={`/services/${id}`}
        structuredData={organizationSchema}
      />
      
      <div className="min-h-screen bg-[#0B0F18]">
        {/* Hero Section */}
        <section className="relative pt-20 pb-32 lg:pt-28 lg:pb-40 overflow-hidden">
          {/* Background */}
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-30"
            style={{ backgroundImage: `url(${service.heroImage})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0B0F18] via-[#0B0F18]/80 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0B0F18]" />
          
          {/* Decorative orbs */}
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#F34D1B]/15 rounded-full blur-[150px]" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#F34D1B]/10 rounded-full blur-[150px]" />
          
          {/* Grid pattern */}
          <div 
            className="absolute inset-0 opacity-[0.02]"
            style={{
              backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
              backgroundSize: '60px 60px'
            }}
          />
          
          <div className="container mx-auto px-6 lg:px-8 relative z-10">
            {/* Breadcrumbs */}
            <nav className="flex items-center gap-2 text-sm text-zinc-500 mb-8">
              <Link to="/" className="hover:text-zinc-300 transition-colors">Главная</Link>
              <ChevronRight className="h-4 w-4" />
              <Link to="/services" className="hover:text-zinc-300 transition-colors">Услуги</Link>
              <ChevronRight className="h-4 w-4" />
              <span className="text-zinc-300">{service.title}</span>
            </nav>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              {/* Content */}
              <div>
                <div className="inline-flex items-center gap-2 px-4 py-2 mb-8 text-sm font-medium bg-white/[0.04] backdrop-blur-sm rounded-xl border border-white/[0.06]">
                  <service.icon className="w-4 h-4 text-[#F34D1B]" strokeWidth={1.5} />
                  <span className="text-zinc-300">{service.subtitle}</span>
                </div>
                
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight leading-[1.1]">
                  {service.heroTitle}
                  <br />
                  <span className="bg-gradient-to-r from-[#F34D1B] via-orange-400 to-[#F34D1B] bg-clip-text text-transparent">
                    {service.heroAccent}
                  </span>
                </h1>
                
                <p className="text-lg lg:text-xl text-zinc-400 font-light leading-relaxed mb-8 max-w-xl">
                  {service.description}
                </p>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    size="lg"
                    className="text-base lg:text-lg px-8 py-6 h-auto group shadow-glow hover:shadow-[0_20px_60px_-10px_hsl(14_90%_53%/0.5)] hover:scale-105 transition-all duration-500"
                    onClick={openApplicationModal}
                  >
                    {service.ctaButtonText}
                    <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </Button>
                  <Button
                    asChild
                    size="lg"
                    variant="outline"
                    className="text-base lg:text-lg px-8 py-6 h-auto bg-white/5 border-2 border-white/20 text-white hover:bg-white hover:text-primary hover:border-white transition-all duration-500 backdrop-blur-sm"
                  >
                    <a href="tel:+78126440291">
                      <Phone className="mr-2 h-5 w-5" />
                      Позвонить
                    </a>
                  </Button>
                </div>
              </div>

              {/* Stats Cards or Insurance Text */}
              {id === 'insurance' ? (
                <div className="flex items-center justify-center">
                  <p className="text-base lg:text-lg text-white/50 font-light leading-relaxed italic text-center max-w-md">
                    Страхование является частью комплексного логистического сопровождения Armax и подбирается индивидуально под маршрут и тип груза.
                  </p>
                </div>
              ) : service.stats && (
                <div className="grid grid-cols-3 gap-4">
                  {service.stats.map((stat, index) => (
                    <div
                      key={index}
                      className="group p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-500 text-center"
                    >
                      <div className={`text-3xl lg:text-4xl font-bold bg-gradient-to-r ${service.color} bg-clip-text text-transparent mb-2`}>
                        {stat.value}
                      </div>
                      <div className="text-sm text-white/60 group-hover:text-white/80 transition-colors">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 lg:py-24 bg-background">
          <div className="container mx-auto px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <span className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 text-sm font-medium text-accent bg-accent/10 rounded-full border border-accent/20">
                  <Sparkles className="h-4 w-4" />
                  Что входит в услугу
                </span>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground tracking-tight">
                  {id === 'insurance' ? 'Как мы страхуем грузы' : 'Преимущества и возможности'}
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {service.features.map((feature, index) => {
                  const FeatureIcon = feature.icon;
                  return (
                    <div
                      key={index}
                      className="group p-6 lg:p-8 rounded-2xl bg-card border border-border/50 hover:border-accent/30 hover:shadow-large transition-all duration-500 hover:-translate-y-1"
                    >
                      <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${service.color} mb-5`}>
                        <FeatureIcon className="h-5 w-5 text-white" strokeWidth={1.5} />
                      </div>
                      <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-accent transition-colors">
                        {feature.title}
                      </h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {feature.desc}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* About Section - Two Columns */}
        <section className="py-20 lg:py-24 bg-secondary/30">
          <div className="container mx-auto px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                {/* Image */}
                <div className="relative">
                  <div className="relative rounded-3xl overflow-hidden aspect-[4/3] shadow-large">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent`} />
                  </div>
                  {/* Floating badge */}
                  <div className="absolute -bottom-6 -right-6 p-6 rounded-2xl bg-card border border-border/50 shadow-large">
                    <div className={`p-4 rounded-xl bg-gradient-to-br ${service.color} mb-3`}>
                      <service.icon className="h-8 w-8 text-white" strokeWidth={1.5} />
                    </div>
                    <p className="text-sm font-medium text-foreground">Контроль</p>
                    <p className="text-sm text-muted-foreground">на каждом этапе</p>
                  </div>
                </div>

                {/* Content */}
                <div>
                  <span className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 text-sm font-medium text-accent bg-accent/10 rounded-full border border-accent/20">
                    <Globe className="h-4 w-4" />
                    О услуге
                  </span>
                  <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6 tracking-tight">
                    {service.title}
                  </h2>
                  <div className="space-y-4 text-muted-foreground leading-relaxed">
                    {service.longDescription.split('\n\n').map((paragraph, index) => (
                      <p key={index}>{paragraph}</p>
                    ))}
                  </div>
                  <Button
                    size="lg"
                    className="mt-8 group"
                    onClick={openApplicationModal}
                  >
                    {service.ctaButtonText}
                    <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="py-20 lg:py-24 bg-[#0B0F18] relative overflow-hidden">
          {/* Background effects */}
          <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-gradient-to-r ${service.color} opacity-[0.03] rounded-full blur-[150px]`} />
          
          <div className="container mx-auto px-6 lg:px-8 relative z-10">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-16">
                <span className="inline-flex items-center gap-2 px-4 py-2 mb-6 text-sm font-medium bg-white/[0.04] backdrop-blur-sm rounded-xl border border-white/[0.06]">
                  <Clock className="h-4 w-4 text-accent" />
                  <span className="text-zinc-300">Процесс работы</span>
                </span>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 tracking-tight">
                  <span className="text-white">Как мы </span>
                  <span className={`bg-gradient-to-r ${service.color} bg-clip-text text-transparent`}>
                    работаем
                  </span>
                </h2>
                <p className="text-lg text-zinc-400 max-w-2xl mx-auto">
                  Прозрачный процесс на каждом этапе
                </p>
              </div>

              {/* Timeline */}
              <div className="relative">
                {/* Vertical line */}
                <div className="absolute left-[23px] top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-white/10 to-transparent hidden md:block" />
                
                <div className="space-y-6">
                  {service.process.map((step, index) => (
                    <div key={index} className="relative flex gap-6 group">
                      {/* Step number */}
                      <div className={`relative z-10 flex-shrink-0 w-12 h-12 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center text-white font-bold shadow-lg`}>
                        {step.step}
                      </div>
                      
                      {/* Content */}
                      <div className="flex-1 pb-6">
                        <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.05] hover:border-white/[0.1] transition-all duration-300">
                          <h3 className="text-lg font-bold text-white mb-2">{step.title}</h3>
                          <p className="text-zinc-400 text-sm leading-relaxed">{step.desc}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 lg:py-24 bg-background">
          <div className="container mx-auto px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className={`relative p-12 lg:p-16 rounded-3xl bg-gradient-to-br ${service.color} overflow-hidden`}>
                {/* Decorative elements */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-[100px]" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 rounded-full blur-[100px]" />
                
                <div className="relative text-center">
                  <div className="inline-flex p-4 rounded-2xl bg-white/20 mb-6">
                    <service.icon className="h-8 w-8 text-white" strokeWidth={1.5} />
                  </div>
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 tracking-tight">
                    {service.ctaTitle || "Готовы начать?"}
                  </h2>
                  <p className="text-xl text-white/80 font-light mb-10 max-w-xl mx-auto">
                    {service.ctaSubtitle || `Получите расчёт стоимости ${service.title.toLowerCase()} за 30 минут`}
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button
                      size="lg"
                      className="bg-accent text-white border-2 border-accent hover:bg-accent-hover hover:text-white text-lg px-10 py-7 h-auto group shadow-glow transition-all duration-300"
                      onClick={openApplicationModal}
                    >
                      Получить расчёт
                      <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                    </Button>
                    <Button
                      asChild
                      size="lg"
                      variant="outline"
                      className="bg-white/10 border-2 border-white/30 text-white hover:bg-white hover:text-foreground text-lg px-10 py-7 h-auto"
                    >
                      <a href="tel:+78126440291">
                        <Phone className="mr-2 h-5 w-5" />
                        Позвонить нам
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

      </div>
    </>
  );
};

export default ServiceDetail;

