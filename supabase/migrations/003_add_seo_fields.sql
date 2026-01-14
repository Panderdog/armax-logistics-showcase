-- ============================================
-- ARMAX LOGISTICS - SEO Fields for News
-- ============================================
-- Добавляет dedicated SEO-поля для более гибкого управления метаданными

-- 1. Добавить новые SEO-поля
ALTER TABLE public.news
  ADD COLUMN IF NOT EXISTS meta_title TEXT,           -- Кастомный title для <title> (fallback на title)
  ADD COLUMN IF NOT EXISTS meta_description TEXT,     -- Кастомное описание (fallback на preview_text)
  ADD COLUMN IF NOT EXISTS og_image TEXT,             -- Отдельная картинка для OG (fallback на preview_image)
  ADD COLUMN IF NOT EXISTS noindex BOOLEAN DEFAULT false;  -- Запретить индексацию (для черновиков/служебных)

-- 2. Комментарии для документации
COMMENT ON COLUMN public.news.meta_title IS 'SEO title для <title> и og:title. Если NULL, используется title';
COMMENT ON COLUMN public.news.meta_description IS 'SEO description для meta description и og:description. Если NULL, используется preview_text';
COMMENT ON COLUMN public.news.og_image IS 'Отдельная картинка для Open Graph. Если NULL, используется preview_image';
COMMENT ON COLUMN public.news.noindex IS 'Если true, добавляется meta robots="noindex,nofollow"';

-- 3. Опционально: установить noindex=true для черновиков
-- UPDATE public.news SET noindex = true WHERE published = false;
