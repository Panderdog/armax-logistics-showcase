-- ============================================
-- ARMAX LOGISTICS - News Table Setup
-- ============================================
-- Run this SQL in Supabase SQL Editor (supabase.com -> your project -> SQL Editor)

-- 1. Create the news table
CREATE TABLE IF NOT EXISTS public.news (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  content TEXT NOT NULL,
  preview_text TEXT NOT NULL,
  preview_image TEXT,
  tags TEXT[] DEFAULT '{}',
  published BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Enable Row Level Security
ALTER TABLE public.news ENABLE ROW LEVEL SECURITY;

-- 3. Create RLS policies

-- Policy: Allow anyone to SELECT published news
-- This allows the public site to display published articles
CREATE POLICY "Allow public select published" ON public.news
  FOR SELECT
  TO anon
  USING (published = true);

-- Policy: Allow authenticated users (admin) to SELECT all news (including drafts)
CREATE POLICY "Allow authenticated select all" ON public.news
  FOR SELECT
  TO authenticated
  USING (true);

-- Policy: Allow authenticated users (admin) to INSERT new news
CREATE POLICY "Allow authenticated insert" ON public.news
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Policy: Allow authenticated users (admin) to UPDATE news
CREATE POLICY "Allow authenticated update" ON public.news
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Policy: Allow authenticated users (admin) to DELETE news
CREATE POLICY "Allow authenticated delete" ON public.news
  FOR DELETE
  TO authenticated
  USING (true);

-- 4. Create indexes for faster queries
CREATE INDEX IF NOT EXISTS idx_news_slug ON public.news(slug);
CREATE INDEX IF NOT EXISTS idx_news_published ON public.news(published);
CREATE INDEX IF NOT EXISTS idx_news_created_at ON public.news(created_at DESC);

-- 5. Create function to auto-update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = timezone('utc'::text, now());
  RETURN NEW;
END;
$$ language 'plpgsql';

-- 6. Create trigger to auto-update updated_at on every update
CREATE TRIGGER update_news_updated_at
  BEFORE UPDATE ON public.news
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- 7. Optional: Insert demo data (comment out if not needed)
INSERT INTO public.news (title, slug, content, preview_text, preview_image, tags, published, created_at)
VALUES 
  (
    'Открытие нового маршрута Шанхай — Владивосток',
    'novyj-marshrut-shanhaj-vladivostok',
    '# Открытие нового маршрута

С радостью сообщаем о запуске нового прямого морского маршрута из Шанхая во Владивосток!

Это событие знаменует важный этап в развитии нашей компании и открывает новые возможности для наших клиентов.

## Преимущества нового маршрута

- **Сокращение сроков доставки на 30%** — прямой маршрут без перегрузок
- **Еженедельные отправки** — стабильный график для планирования поставок
- **Конкурентные тарифы** — оптимизированная логистика снижает стоимость
- **Полное таможенное сопровождение** — берём на себя все формальности

## Как заказать

Для получения детальной информации и расчёта стоимости свяжитесь с нашими специалистами по телефону или оставьте заявку на сайте.

Мы готовы обсудить индивидуальные условия для постоянных клиентов и крупных отправок.',
    'Компания Armax расширяет географию перевозок и запускает прямой морской маршрут из Шанхая во Владивосток с еженедельными отправками.',
    '/images/ship.jpg',
    ARRAY['морские перевозки', 'новый маршрут', 'Китай'],
    true,
    NOW() - INTERVAL '7 days'
  ),
  (
    'Armax — лидер по грузоперевозкам из Азии 2024',
    'armax-lider-gruzoperevozok-2024',
    '# Armax — лидер года

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

Благодарим всех наших клиентов и партнёров за доверие! Мы продолжим развиваться и улучшать качество наших услуг.',
    'По итогам года компания Armax заняла первое место в рейтинге логистических операторов по направлению Азия-Россия.',
    '/images/port-by-air.webp',
    ARRAY['достижения', 'рейтинг', '2024'],
    true,
    NOW() - INTERVAL '14 days'
  ),
  (
    'Расширение складской сети в Москве',
    'rasshirenie-skladskoj-seti-moskva',
    '# Новый склад в Москве

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

Приглашаем к сотрудничеству!',
    'Открыли новый распределительный центр в Москве площадью 5000 м². Теперь доставка по столице ещё быстрее.',
    '/images/truck.webp',
    ARRAY['склад', 'Москва', 'логистика'],
    true,
    NOW() - INTERVAL '21 days'
  );

