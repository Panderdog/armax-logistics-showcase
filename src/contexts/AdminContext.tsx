import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';

interface Application {
  id: string;
  name: string;
  email: string | null;
  phone: string;
  company?: string;
  service?: string;
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
  isAuthLoading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  applications: Application[];
  applicationsLoading: boolean;
  refreshApplications: () => Promise<void>;
  addApplication: (application: Omit<Application, 'id' | 'createdAt' | 'status'>) => void;
  updateApplicationStatus: (id: string, status: Application['status']) => Promise<void>;
  deleteApplication: (id: string) => Promise<void>;
  news: NewsItem[];
  newsLoading: boolean;
  refreshNews: () => Promise<void>;
  addNews: (news: Omit<NewsItem, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>;
  updateNews: (id: string, news: Partial<NewsItem>) => Promise<void>;
  deleteNews: (id: string) => Promise<void>;
  getPublishedNews: () => NewsItem[];
  getNewsBySlug: (slug: string) => NewsItem | undefined;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

// Demo data for initial state (fallback when Supabase is not configured)
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
    previewImage: '/images/ship.webp',
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

// Helper to map Supabase news row to NewsItem interface
function mapNewsRow(row: {
  id: string;
  title: string;
  slug: string;
  content: string;
  preview_text: string;
  preview_image: string | null;
  tags: string[];
  published: boolean;
  created_at: string;
  updated_at: string;
}): NewsItem {
  return {
    id: row.id,
    title: row.title,
    slug: row.slug,
    content: row.content,
    previewText: row.preview_text,
    previewImage: row.preview_image || undefined,
    tags: row.tags || [],
    published: row.published,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

export function AdminProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isAuthLoading, setIsAuthLoading] = useState(true);
  
  const [applications, setApplications] = useState<Application[]>([]);
  const [applicationsLoading, setApplicationsLoading] = useState(true);
  
  const [news, setNews] = useState<NewsItem[]>([]);
  const [newsLoading, setNewsLoading] = useState(true);

  // Check auth state on mount
  useEffect(() => {
    if (!supabase || !isSupabaseConfigured) {
      setIsAuthLoading(false);
      return;
    }

    // Check current session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setIsAuthenticated(!!session);
      setIsAuthLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsAuthenticated(!!session);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Fetch applications from Supabase
  const fetchApplications = useCallback(async () => {
    if (!supabase || !isSupabaseConfigured) {
      setApplicationsLoading(false);
      return;
    }

    setApplicationsLoading(true);
    try {
      const { data, error } = await supabase
        .from('applications')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching applications:', error);
        return;
      }

      // Map Supabase data to Application interface
      const mappedApplications: Application[] = (data || []).map(app => ({
        id: app.id,
        name: app.name,
        email: app.email,
        phone: app.phone,
        message: app.message,
        status: app.status as Application['status'],
        createdAt: app.created_at,
      }));

      setApplications(mappedApplications);
    } catch (error) {
      console.error('Error fetching applications:', error);
    } finally {
      setApplicationsLoading(false);
    }
  }, []);

  // Fetch news from Supabase
  const fetchNews = useCallback(async () => {
    if (!supabase || !isSupabaseConfigured) {
      // Fallback to demo data if Supabase is not configured
      setNews(demoNews);
      setNewsLoading(false);
      return;
    }

    setNewsLoading(true);
    try {
      const { data, error } = await supabase
        .from('news')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching news:', error);
        // Fallback to demo data on error
        setNews(demoNews);
        return;
      }

      if (data && data.length > 0) {
        setNews(data.map(mapNewsRow));
      } else {
        // If no news in database, use demo data
        setNews(demoNews);
      }
    } catch (error) {
      console.error('Error fetching news:', error);
      setNews(demoNews);
    } finally {
      setNewsLoading(false);
    }
  }, []);

  // Load applications when authenticated
  useEffect(() => {
    if (isAuthenticated) {
      fetchApplications();
    }
  }, [isAuthenticated, fetchApplications]);

  // Load news on mount (published news are public)
  useEffect(() => {
    fetchNews();
  }, [fetchNews]);

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    if (!supabase || !isSupabaseConfigured) {
      return { success: false, error: 'База данных не настроена' };
    }

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        return { success: false, error: error.message };
      }

      return { success: true };
    } catch (error) {
      return { success: false, error: 'Произошла ошибка при входе' };
    }
  };

  const logout = async () => {
    if (supabase && isSupabaseConfigured) {
      await supabase.auth.signOut();
    }
    setIsAuthenticated(false);
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

  const updateApplicationStatus = async (id: string, status: Application['status']) => {
    if (!supabase || !isSupabaseConfigured) {
      // Fallback to local update
      setApplications(prev => 
        prev.map(app => app.id === id ? { ...app, status } : app)
      );
      return;
    }

    try {
      const { error } = await supabase
        .from('applications')
        .update({ status })
        .eq('id', id);

      if (error) {
        console.error('Error updating application status:', error);
        return;
      }

      // Update local state
      setApplications(prev => 
        prev.map(app => app.id === id ? { ...app, status } : app)
      );
    } catch (error) {
      console.error('Error updating application status:', error);
    }
  };

  const deleteApplication = async (id: string) => {
    if (!supabase || !isSupabaseConfigured) {
      // Fallback to local delete
      setApplications(prev => prev.filter(app => app.id !== id));
      return;
    }

    try {
      const { error } = await supabase
        .from('applications')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Error deleting application:', error);
        return;
      }

      // Update local state
      setApplications(prev => prev.filter(app => app.id !== id));
    } catch (error) {
      console.error('Error deleting application:', error);
    }
  };

  const addNews = async (newsItem: Omit<NewsItem, 'id' | 'createdAt' | 'updatedAt'>) => {
    const slug = newsItem.slug || generateSlug(newsItem.title);

    if (!supabase || !isSupabaseConfigured) {
      // Fallback to local state
      const now = new Date().toISOString();
      const newNewsItem: NewsItem = {
        ...newsItem,
        id: Date.now().toString(),
        slug,
        createdAt: now,
        updatedAt: now
      };
      setNews(prev => [newNewsItem, ...prev]);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('news')
        .insert({
          title: newsItem.title,
          slug,
          content: newsItem.content,
          preview_text: newsItem.previewText,
          preview_image: newsItem.previewImage || null,
          tags: newsItem.tags,
          published: newsItem.published,
        })
        .select()
        .single();

      if (error) {
        console.error('Error adding news:', error);
        return;
      }

      if (data) {
        setNews(prev => [mapNewsRow(data), ...prev]);
      }
    } catch (error) {
      console.error('Error adding news:', error);
    }
  };

  const updateNews = async (id: string, updatedNews: Partial<NewsItem>) => {
    if (!supabase || !isSupabaseConfigured) {
      // Fallback to local update
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
      return;
    }

    try {
      // Map NewsItem fields to database columns
      const updateData: Record<string, unknown> = {};
      if (updatedNews.title !== undefined) updateData.title = updatedNews.title;
      if (updatedNews.slug !== undefined) updateData.slug = updatedNews.slug;
      if (updatedNews.content !== undefined) updateData.content = updatedNews.content;
      if (updatedNews.previewText !== undefined) updateData.preview_text = updatedNews.previewText;
      if (updatedNews.previewImage !== undefined) updateData.preview_image = updatedNews.previewImage;
      if (updatedNews.tags !== undefined) updateData.tags = updatedNews.tags;
      if (updatedNews.published !== undefined) updateData.published = updatedNews.published;

      const { data, error } = await supabase
        .from('news')
        .update(updateData)
        .eq('id', id)
        .select()
        .single();

      if (error) {
        console.error('Error updating news:', error);
        return;
      }

      if (data) {
        setNews(prev => 
          prev.map(item => item.id === id ? mapNewsRow(data) : item)
        );
      }
    } catch (error) {
      console.error('Error updating news:', error);
    }
  };

  const deleteNews = async (id: string) => {
    if (!supabase || !isSupabaseConfigured) {
      // Fallback to local delete
      setNews(prev => prev.filter(item => item.id !== id));
      return;
    }

    try {
      const { error } = await supabase
        .from('news')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Error deleting news:', error);
        return;
      }

      setNews(prev => prev.filter(item => item.id !== id));
    } catch (error) {
      console.error('Error deleting news:', error);
    }
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
      isAuthLoading,
      login,
      logout,
      applications,
      applicationsLoading,
      refreshApplications: fetchApplications,
      addApplication,
      updateApplicationStatus,
      deleteApplication,
      news,
      newsLoading,
      refreshNews: fetchNews,
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
