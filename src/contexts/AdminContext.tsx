import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Hardcoded admin credentials (in production, use Supabase or proper auth)
const ADMIN_CREDENTIALS = {
  username: 'admin',
  password: 'armax2024'
};

interface Application {
  id: string;
  name: string;
  email: string;
  phone: string;
  company?: string;
  service: string;
  message: string;
  status: 'new' | 'in_progress' | 'completed' | 'cancelled';
  createdAt: string;
}

interface NewsItem {
  id: string;
  title: string;
  slug: string;
  content: string;
  previewText: string;
  previewImage?: string;
  tags: string[];
  published: boolean;
  createdAt: string;
  updatedAt: string;
}

interface AdminContextType {
  isAuthenticated: boolean;
  login: (username: string, password: string) => boolean;
  logout: () => void;
  applications: Application[];
  addApplication: (application: Omit<Application, 'id' | 'createdAt' | 'status'>) => void;
  updateApplicationStatus: (id: string, status: Application['status']) => void;
  deleteApplication: (id: string) => void;
  news: NewsItem[];
  addNews: (news: Omit<NewsItem, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateNews: (id: string, news: Partial<NewsItem>) => void;
  deleteNews: (id: string) => void;
  getPublishedNews: () => NewsItem[];
  getNewsBySlug: (slug: string) => NewsItem | undefined;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

// Demo data for initial state
const demoApplications: Application[] = [
  {
    id: '1',
    name: 'Иван Петров',
    email: 'ivan@company.ru',
    phone: '+7 (999) 123-45-67',
    company: 'ООО "ТрансЛогистика"',
    service: 'Морские перевозки',
    message: 'Нужна доставка контейнера из Шанхая в Владивосток. Объём: 40 футов.',
    status: 'new',
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString()
  },
  {
    id: '2',
    name: 'Мария Сидорова',
    email: 'maria@trade.com',
    phone: '+7 (495) 987-65-43',
    company: 'ИП Сидорова М.А.',
    service: 'Таможенное оформление',
    message: 'Требуется помощь с таможенным оформлением грузов из Китая.',
    status: 'in_progress',
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: '3',
    name: 'Алексей Козлов',
    email: 'alexey@import.ru',
    phone: '+7 (812) 555-33-22',
    company: 'ООО "Импорт Групп"',
    service: 'Авиаперевозки',
    message: 'Срочная доставка документов из Сеула.',
    status: 'completed',
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString()
  }
];

const demoNews: NewsItem[] = [
  {
    id: '1',
    title: 'Открытие нового маршрута Шанхай — Владивосток',
    slug: 'novyj-marshrut-shanhaj-vladivostok',
    previewText: 'Компания Armax расширяет географию перевозок и запускает прямой морской маршрут из Шанхая во Владивосток с еженедельными отправками.',
    content: `# Открытие нового маршрута

С радостью сообщаем о запуске нового прямого морского маршрута из Шанхая во Владивосток!

Это событие знаменует важный этап в развитии нашей компании и открывает новые возможности для наших клиентов.

## Преимущества нового маршрута

- **Сокращение сроков доставки на 30%** — прямой маршрут без перегрузок
- **Еженедельные отправки** — стабильный график для планирования поставок
- **Конкурентные тарифы** — оптимизированная логистика снижает стоимость
- **Полное таможенное сопровождение** — берём на себя все формальности

## Как заказать

Для получения детальной информации и расчёта стоимости свяжитесь с нашими специалистами по телефону или оставьте заявку на сайте.

Мы готовы обсудить индивидуальные условия для постоянных клиентов и крупных отправок.`,
    previewImage: '/images/ship.jpg',
    tags: ['морские перевозки', 'новый маршрут', 'Китай'],
    published: true,
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: '2',
    title: 'Armax — лидер по грузоперевозкам из Азии 2024',
    slug: 'armax-lider-gruzoperevozok-2024',
    previewText: 'По итогам года компания Armax заняла первое место в рейтинге логистических операторов по направлению Азия-Россия.',
    content: `# Armax — лидер года

Мы гордимся тем, что по итогам 2024 года компания Armax была признана лидером в сфере грузоперевозок из Азии.

## Что помогло нам достичь этого результата

- Высокое качество сервиса и внимание к каждому клиенту
- Профессиональная команда с многолетним опытом
- Современные технологии отслеживания грузов в реальном времени
- Надёжные партнёрские отношения с перевозчиками

## Наши достижения в цифрах

За 2024 год мы:
- Доставили более 15 000 контейнеров
- Расширили сеть до 50 городов
- Сократили среднее время доставки на 20%

Благодарим всех наших клиентов и партнёров за доверие! Мы продолжим развиваться и улучшать качество наших услуг.`,
    previewImage: '/images/port-by-air.webp',
    tags: ['достижения', 'рейтинг', '2024'],
    published: true,
    createdAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: '3',
    title: 'Новые тарифы на авиаперевозки с января 2025',
    slug: 'novye-tarify-aviaperervozki-2025',
    previewText: 'Информируем об обновлении тарифов на авиадоставку грузов из Азии. Новые условия вступают в силу с 1 января 2025 года.',
    content: `# Обновление тарифов на авиаперевозки

Уведомляем наших клиентов об изменении тарифов на авиаперевозки с 1 января 2025 года.

## Что изменится

Новые тарифы разработаны с учётом текущей рыночной ситуации и позволят нам сохранить высокое качество услуг.

### Основные изменения:
- Обновлены базовые ставки для направлений из Китая, Кореи и Японии
- Введены специальные условия для постоянных клиентов
- Добавлены новые опции экспресс-доставки

## Как узнать новые цены

Для получения актуальных расценок обратитесь к нашим менеджерам. Мы подготовим индивидуальное предложение с учётом объёмов и регулярности ваших отправок.`,
    previewImage: '/images/airplane.webp',
    tags: ['тарифы', 'авиаперевозки', '2025'],
    published: false,
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: '4',
    title: 'Расширение складской сети в Москве',
    slug: 'rasshirenie-skladskoj-seti-moskva',
    previewText: 'Открыли новый распределительный центр в Москве площадью 5000 м². Теперь доставка по столице ещё быстрее.',
    content: `# Новый склад в Москве

Рады сообщить об открытии нового распределительного центра в Московском регионе!

## Характеристики нового склада

- Площадь: 5000 м²
- Расположение: Домодедово, рядом с аэропортом
- Температурный режим: от -20 до +25°C
- Круглосуточная работа

## Преимущества для клиентов

Новый склад позволяет:
- Сократить время доставки по Москве до 24 часов
- Хранить товары с особыми условиями хранения
- Консолидировать грузы для дальнейшей отправки

Приглашаем к сотрудничеству!`,
    previewImage: '/images/truck.webp',
    tags: ['склад', 'Москва', 'логистика'],
    published: true,
    createdAt: new Date(Date.now() - 21 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 21 * 24 * 60 * 60 * 1000).toISOString()
  }
];

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[а-яё]/g, (char) => {
      const map: Record<string, string> = {
        'а': 'a', 'б': 'b', 'в': 'v', 'г': 'g', 'д': 'd', 'е': 'e', 'ё': 'yo',
        'ж': 'zh', 'з': 'z', 'и': 'i', 'й': 'j', 'к': 'k', 'л': 'l', 'м': 'm',
        'н': 'n', 'о': 'o', 'п': 'p', 'р': 'r', 'с': 's', 'т': 't', 'у': 'u',
        'ф': 'f', 'х': 'h', 'ц': 'c', 'ч': 'ch', 'ш': 'sh', 'щ': 'sch', 'ъ': '',
        'ы': 'y', 'ь': '', 'э': 'e', 'ю': 'yu', 'я': 'ya'
      };
      return map[char] || char;
    })
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

export { generateSlug };

export function AdminProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem('armax_admin_auth') === 'true';
  });
  
  const [applications, setApplications] = useState<Application[]>(() => {
    const saved = localStorage.getItem('armax_applications');
    return saved ? JSON.parse(saved) : demoApplications;
  });
  
  const [news, setNews] = useState<NewsItem[]>(() => {
    const saved = localStorage.getItem('armax_news_v2');
    return saved ? JSON.parse(saved) : demoNews;
  });

  // Persist data to localStorage
  useEffect(() => {
    localStorage.setItem('armax_applications', JSON.stringify(applications));
  }, [applications]);

  useEffect(() => {
    localStorage.setItem('armax_news_v2', JSON.stringify(news));
  }, [news]);

  const login = (username: string, password: string): boolean => {
    if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
      setIsAuthenticated(true);
      localStorage.setItem('armax_admin_auth', 'true');
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('armax_admin_auth');
  };

  const addApplication = (application: Omit<Application, 'id' | 'createdAt' | 'status'>) => {
    const newApplication: Application = {
      ...application,
      id: Date.now().toString(),
      status: 'new',
      createdAt: new Date().toISOString()
    };
    setApplications(prev => [newApplication, ...prev]);
  };

  const updateApplicationStatus = (id: string, status: Application['status']) => {
    setApplications(prev => 
      prev.map(app => app.id === id ? { ...app, status } : app)
    );
  };

  const deleteApplication = (id: string) => {
    setApplications(prev => prev.filter(app => app.id !== id));
  };

  const addNews = (newsItem: Omit<NewsItem, 'id' | 'createdAt' | 'updatedAt'>) => {
    const now = new Date().toISOString();
    const newNewsItem: NewsItem = {
      ...newsItem,
      id: Date.now().toString(),
      slug: newsItem.slug || generateSlug(newsItem.title),
      createdAt: now,
      updatedAt: now
    };
    setNews(prev => [newNewsItem, ...prev]);
  };

  const updateNews = (id: string, updatedNews: Partial<NewsItem>) => {
    setNews(prev => 
      prev.map(item => {
        if (item.id === id) {
          return { 
            ...item, 
            ...updatedNews,
            updatedAt: new Date().toISOString()
          };
        }
        return item;
      })
    );
  };

  const deleteNews = (id: string) => {
    setNews(prev => prev.filter(item => item.id !== id));
  };

  const getPublishedNews = () => {
    return news
      .filter(item => item.published)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  };

  const getNewsBySlug = (slug: string) => {
    return news.find(item => item.slug === slug && item.published);
  };

  return (
    <AdminContext.Provider value={{
      isAuthenticated,
      login,
      logout,
      applications,
      addApplication,
      updateApplicationStatus,
      deleteApplication,
      news,
      addNews,
      updateNews,
      deleteNews,
      getPublishedNews,
      getNewsBySlug
    }}>
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const context = useContext(AdminContext);
  if (context === undefined) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
}
