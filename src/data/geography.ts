// Типы для географических данных карты
export type Mode = "sea" | "air" | "rail" | "road" | "multi";

export interface LocationPoint {
  id: string;
  name: string;
  nameRu: string;
  type: "origin" | "destination";
  country: string;
  coordinates: [number, number]; // [longitude, latitude]
}

export interface Route {
  id: string;
  fromId: string;
  toId: string;
  mode: Mode;
  label: string;
}

// Пункты назначения (Россия)
const destinations: LocationPoint[] = [
  { 
    id: "spb", 
    name: "Saint Petersburg", 
    nameRu: "Санкт-Петербург", 
    type: "destination", 
    country: "Россия", 
    coordinates: [30.31, 59.94] 
  },
  { 
    id: "moscow", 
    name: "Moscow", 
    nameRu: "Москва", 
    type: "destination", 
    country: "Россия", 
    coordinates: [37.62, 55.75] 
  },
];

// Точки отправления (Китай)
const chinaOrigins: LocationPoint[] = [
  { 
    id: "ningbo", 
    name: "Ningbo", 
    nameRu: "Нингбо", 
    type: "origin", 
    country: "Китай", 
    coordinates: [121.55, 29.87] 
  },
  { 
    id: "shanghai", 
    name: "Shanghai", 
    nameRu: "Шанхай", 
    type: "origin", 
    country: "Китай", 
    coordinates: [121.47, 31.23] 
  },
  { 
    id: "hongkong", 
    name: "Hong Kong", 
    nameRu: "Гонконг", 
    type: "origin", 
    country: "Китай", 
    coordinates: [114.17, 22.28] 
  },
  { 
    id: "shenzhen", 
    name: "Shenzhen", 
    nameRu: "Шэньчжэнь", 
    type: "origin", 
    country: "Китай", 
    coordinates: [114.06, 22.54] 
  },
  { 
    id: "chengdu", 
    name: "Chengdu", 
    nameRu: "Чэнду", 
    type: "origin", 
    country: "Китай", 
    coordinates: [104.07, 30.57] 
  },
];

// Точки отправления (Турция)
const turkeyOrigins: LocationPoint[] = [
  { 
    id: "istanbul", 
    name: "Istanbul", 
    nameRu: "Стамбул", 
    type: "origin", 
    country: "Турция", 
    coordinates: [28.98, 41.01] 
  },
];

// Точки отправления (Япония)
const japanOrigins: LocationPoint[] = [
  { 
    id: "kumamoto", 
    name: "Kumamoto", 
    nameRu: "Кумамото", 
    type: "origin", 
    country: "Япония", 
    coordinates: [130.74, 32.79] 
  },
];

// Точки отправления (Индия)
const indiaOrigins: LocationPoint[] = [
  { 
    id: "chennai", 
    name: "Chennai", 
    nameRu: "Ченнай", 
    type: "origin", 
    country: "Индия", 
    coordinates: [80.27, 13.08] 
  },
];

// Точки отправления (Вьетнам)
const vietnamOrigins: LocationPoint[] = [
  { 
    id: "hanoi", 
    name: "Hanoi", 
    nameRu: "Ханой", 
    type: "origin", 
    country: "Вьетнам", 
    coordinates: [105.85, 21.03] 
  },
];

// Точки отправления (Южная Корея)
const koreaOrigins: LocationPoint[] = [
  { 
    id: "seoul", 
    name: "Seoul", 
    nameRu: "Сеул", 
    type: "origin", 
    country: "Южная Корея", 
    coordinates: [126.98, 37.57] 
  },
];

// Точки отправления (Европа)
const europeOrigins: LocationPoint[] = [
  { 
    id: "london", 
    name: "London", 
    nameRu: "Лондон", 
    type: "origin", 
    country: "Великобритания", 
    coordinates: [-0.12, 51.51] 
  },
  { 
    id: "berlin", 
    name: "Berlin", 
    nameRu: "Берлин", 
    type: "origin", 
    country: "Германия", 
    coordinates: [13.40, 52.52] 
  },
  { 
    id: "paris", 
    name: "Paris", 
    nameRu: "Париж", 
    type: "origin", 
    country: "Франция", 
    coordinates: [2.35, 48.85] 
  },
  { 
    id: "rome", 
    name: "Rome", 
    nameRu: "Рим", 
    type: "origin", 
    country: "Италия", 
    coordinates: [12.50, 41.90] 
  },
];

// Все точки
export const points: LocationPoint[] = [
  ...destinations,
  ...chinaOrigins,
  ...turkeyOrigins,
  ...japanOrigins,
  ...indiaOrigins,
  ...vietnamOrigins,
  ...koreaOrigins,
  ...europeOrigins,
];

// Маршруты (16 штук)
export const routes: Route[] = [
  // Европа -> Турция (4 маршрута, road)
  { 
    id: "r1", 
    fromId: "london", 
    toId: "istanbul", 
    mode: "road", 
    label: "Европа → Турция (Авто)" 
  },
  { 
    id: "r2", 
    fromId: "berlin", 
    toId: "istanbul", 
    mode: "road", 
    label: "Европа → Турция (Авто)" 
  },
  { 
    id: "r3", 
    fromId: "paris", 
    toId: "istanbul", 
    mode: "road", 
    label: "Европа → Турция (Авто)" 
  },
  { 
    id: "r4", 
    fromId: "rome", 
    toId: "istanbul", 
    mode: "road", 
    label: "Европа → Турция (Авто)" 
  },
  
  // Турция -> Россия (2 маршрута)
  { 
    id: "r5", 
    fromId: "istanbul", 
    toId: "moscow", 
    mode: "air", 
    label: "Турция → Москва (Авиа)" 
  },
  { 
    id: "r6", 
    fromId: "istanbul", 
    toId: "spb", 
    mode: "sea", 
    label: "Турция → СПб (Море)" 
  },
  
  // Китай -> Россия (5 маршрутов)
  { 
    id: "r7", 
    fromId: "shanghai", 
    toId: "spb", 
    mode: "sea", 
    label: "Шанхай → СПб (Море)" 
  },
  { 
    id: "r8", 
    fromId: "ningbo", 
    toId: "spb", 
    mode: "sea", 
    label: "Нингбо → СПб (Море)" 
  },
  { 
    id: "r9", 
    fromId: "shenzhen", 
    toId: "moscow", 
    mode: "rail", 
    label: "Шэньчжэнь → Москва (ЖД)" 
  },
  { 
    id: "r10", 
    fromId: "chengdu", 
    toId: "spb", 
    mode: "air", 
    label: "Чэнду → СПб (Авиа)" 
  },
  
  // Индия -> Россия (1 маршрут)
  { 
    id: "r11", 
    fromId: "chennai", 
    toId: "spb", 
    mode: "sea", 
    label: "Ченнай → СПб (Море)" 
  },
  
  // Вьетнам -> Россия (2 маршрута)
  { 
    id: "r12", 
    fromId: "hanoi", 
    toId: "spb", 
    mode: "sea", 
    label: "Ханой → СПб (Море)" 
  },
  { 
    id: "r13", 
    fromId: "hanoi", 
    toId: "spb", 
    mode: "air", 
    label: "Ханой → СПб (Авиа)" 
  },
  
  // Южная Корея -> Россия (2 маршрута)
  { 
    id: "r14", 
    fromId: "seoul", 
    toId: "spb", 
    mode: "sea", 
    label: "Сеул → СПб (Море)" 
  },
  { 
    id: "r15", 
    fromId: "seoul", 
    toId: "spb", 
    mode: "air", 
    label: "Сеул → СПб (Авиа)" 
  },
  
  // Япония -> Россия (1 маршрут, мультимодал)
  { 
    id: "r16", 
    fromId: "kumamoto", 
    toId: "spb", 
    mode: "multi", 
    label: "Япония → СПб (Мультимодал: море + ЖД)" 
  },
];

// Метки для модальностей
export const modeLabels: Record<Mode, string> = {
  sea: "Море",
  air: "Авиа",
  rail: "ЖД",
  road: "Авто",
  multi: "Мультимодал",
};

// Цвета для модальностей
export const modeColors: Record<Mode, string> = {
  sea: "#3B82F6",    // blue
  air: "#8B5CF6",    // purple
  rail: "#10B981",   // emerald
  road: "#F59E0B",   // amber
  multi: "#EC4899",  // pink
};

