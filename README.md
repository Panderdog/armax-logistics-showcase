# Armax Logistics - Showcase Website

> Современный, адаптивный сайт-витрина для международной логистической компании Armax Logistics

## 📋 О проекте

Это полнофункциональный showcase-сайт для логистической компании, специализирующейся на международных перевозках. Сайт включает информацию об услугах, географии работы, отзывы клиентов и удобную систему связи.

**URL**: https://lovable.dev/projects/3d7ef259-4424-4496-9611-84202584eba1

## 📚 Документация по структуре сайта

> 📑 **[DOCUMENTATION_INDEX.md](./DOCUMENTATION_INDEX.md)** - Навигатор по всей документации

Создана подробная документация по архитектуре и структуре сайта:

- **[STRUCTURE_SUMMARY.md](./STRUCTURE_SUMMARY.md)** - 📄 Краткий обзор (начните отсюда!)
- **[SITE_STRUCTURE.md](./SITE_STRUCTURE.md)** - 📖 Полная детальная документация
- **[SITE_MAP_VISUAL.md](./SITE_MAP_VISUAL.md)** - 🗺️ Визуальные ASCII схемы
- **[ARCHITECTURE_DIAGRAM.md](./ARCHITECTURE_DIAGRAM.md)** - 📊 Mermaid диаграммы
- **[STRUCTURE_CHECKLIST.md](./STRUCTURE_CHECKLIST.md)** - ✅ Чек-лист задач и улучшений

## 🎯 Основные страницы

1. **Главная (/)** - Hero секция, преимущества, краткая информация о компании
2. **Услуги (/services)** - 4 основных логистических услуги
3. **О компании (/about)** - История, миссия, ценности компании
4. **География (/geography)** - Карта присутствия в 20+ странах
5. **Отзывы (/reviews)** - Отзывы клиентов и кейсы проектов
6. **Контакты (/contacts)** - Форма связи, контактная информация

## ✨ Ключевые особенности

- ✅ Полностью адаптивный дизайн (mobile, tablet, desktop)
- ✅ Современный UI с анимациями и hover эффектами
- ✅ Липкий Header с навигацией
- ✅ Мобильное гамбургер-меню
- ✅ Форма обратной связи с валидацией
- ✅ Интеграция мессенджеров (WhatsApp, Telegram)
- ✅ Google Maps интеграция
- ✅ Toast уведомления
- ✅ SEO-friendly структура

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/3d7ef259-4424-4496-9611-84202584eba1) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## 🛠 Технологический стек

Проект построен на современных технологиях:

### Core
- **React 18** - UI библиотека
- **TypeScript** - Типизация
- **Vite** - Сборщик и dev сервер
- **React Router** - Маршрутизация

### UI/Styling
- **Tailwind CSS** - Utility-first CSS фреймворк
- **shadcn/ui** - Компонентная библиотека на базе Radix UI
- **Lucide Icons** - Набор иконок

### State Management
- **React Query** - Управление серверным состоянием
- **React Hooks** - Локальное состояние

### Forms & Validation
- **React Hook Form** (встроен в shadcn/ui)
- **Sonner** - Toast уведомления

## 📁 Структура проекта

```
armax-logistics-showcase/
├── public/                    # Статические файлы
│   ├── favicon.svg
│   ├── placeholder.svg
│   └── robots.txt
├── src/
│   ├── assets/               # Изображения и медиа
│   │   └── armax-logo.svg
│   ├── components/           # React компоненты
│   │   ├── ui/              # shadcn/ui компоненты
│   │   ├── Header.tsx       # Шапка сайта
│   │   ├── Footer.tsx       # Подвал сайта
│   │   ├── HeroSection.tsx  # Hero секция
│   │   ├── BenefitsSection.tsx
│   │   ├── AboutPreview.tsx
│   │   └── ScrollToTop.tsx  # Утилита для скролла
│   ├── pages/               # Страницы сайта
│   │   ├── Index.tsx        # Главная
│   │   ├── Services.tsx     # Услуги
│   │   ├── About.tsx        # О компании
│   │   ├── Geography.tsx    # География
│   │   ├── Reviews.tsx      # Отзывы
│   │   ├── Contacts.tsx     # Контакты
│   │   └── NotFound.tsx     # 404
│   ├── hooks/               # Custom React hooks
│   ├── lib/                 # Утилиты
│   ├── App.tsx              # Главный компонент
│   ├── main.tsx             # Entry point
│   └── index.css            # Глобальные стили
├── SITE_STRUCTURE.md        # 📖 Полная документация
├── SITE_MAP_VISUAL.md       # 🗺️ Визуальные схемы
├── STRUCTURE_CHECKLIST.md   # ✅ Чек-лист задач
├── STRUCTURE_SUMMARY.md     # 📄 Краткий обзор
└── README.md                # Этот файл
```

## 🚀 Roadmap

### ✅ Phase 1: MVP (Завершено)
- Базовая структура сайта
- 6 основных страниц
- Адаптивный дизайн
- Форма обратной связи

### 🔄 Phase 2: UX Improvements (В работе)
- [ ] FAQ секция
- [ ] Live Chat интеграция
- [ ] Кнопка "Наверх"
- [ ] Sticky CTA для мобильных
- [ ] Breadcrumbs навигация

### 📅 Phase 3: Features (Планируется)
- [ ] Интерактивная карта с маршрутами
- [ ] Калькулятор стоимости доставки
- [ ] Блог/Новости
- [ ] Видео-презентация компании

### 🎨 Phase 4: Content & Trust (Планируется)
- [ ] Реальные фотографии (офис, команда, складские помещения)
- [ ] Больше отзывов клиентов (10+)
- [ ] Сертификаты и лицензии
- [ ] Страница с командой

### ⚡ Phase 5: Optimization (Планируется)
- [ ] SEO оптимизация (meta tags, schema.org)
- [ ] Performance optimization
- [ ] Accessibility audit (WCAG AA)
- [ ] Google Analytics / Яндекс.Метрика

## 📊 Текущие KPI

| Метрика | Текущее состояние | Цель |
|---------|-------------------|------|
| Страниц | 6 | 8-10 |
| CTA кнопок | 9 | 12+ |
| Отзывов | 3 | 10+ |
| Кейсов | 2 | 5+ |
| Bounce Rate | - | <50% |
| Avg Session | - | >2 мин |
| Conversion | - | 3-5% |

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/3d7ef259-4424-4496-9611-84202584eba1) and click on Share -> Publish.

## 🌐 Деплой и кастомный домен

### Быстрый деплой
Просто откройте [Lovable](https://lovable.dev/projects/3d7ef259-4424-4496-9611-84202584eba1) и нажмите Share → Publish.

### Подключение кастомного домена
1. Перейдите в Project > Settings > Domains
2. Нажмите Connect Domain
3. Следуйте инструкциям

Подробнее: [Setting up a custom domain](https://docs.lovable.dev/features/custom-domain#custom-domain)

## 📞 Контакты компании (в проекте)

- **Телефон**: +7 (812) 644-02-91
- **Email**: info@armaxstp.com
- **Адрес**: Санкт-Петербург, Россия
- **WhatsApp**: +7 (812) 644-02-91
- **Telegram**: @armaxlogistics

## 📖 Полезные ссылки

- [Документация Lovable](https://docs.lovable.dev/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [shadcn/ui](https://ui.shadcn.com/)
- [React Router](https://reactrouter.com/)
- [Lucide Icons](https://lucide.dev/)

## 🤝 Вклад в проект

Этот проект находится в активной разработке. Для предложений по улучшению структуры:

1. Изучите документацию в `SITE_STRUCTURE.md`
2. Проверьте чек-лист в `STRUCTURE_CHECKLIST.md`
3. Создайте issue с описанием предложения
4. Или сразу создайте pull request

## 📄 Лицензия

Проект создан для демонстрации возможностей современного веб-дизайна и разработки.

---

**Последнее обновление**: 2025-11-07  
**Версия**: 1.0  
**Статус**: В активной разработке 🚀
