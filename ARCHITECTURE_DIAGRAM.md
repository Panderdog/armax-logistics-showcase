# Архитектурные диаграммы Armax Logistics

## 🗺️ Карта сайта (Site Map)

```mermaid
graph TD
    A[armax-logistics-showcase] --> B[Header - Global]
    A --> C[Routes]
    A --> D[Footer - Global]
    
    C --> E[/ - Главная]
    C --> F[/services - Услуги]
    C --> G[/about - О компании]
    C --> H[/geography - География]
    C --> I[/reviews - Отзывы]
    C --> J[/contacts - Контакты]
    C --> K[/404 - Not Found]
    
    E --> E1[HeroSection]
    E --> E2[BenefitsSection]
    E --> E3[AboutPreview]
    
    F --> F1[Hero + 4 Services]
    F --> F2[Why Choose Us]
    
    G --> G1[Hero + История]
    G --> G2[Статистика]
    G --> G3[Миссия + Ценности]
    
    H --> H1[Hero + Map]
    H --> H2[3 Региона]
    H --> H3[Маршруты]
    
    I --> I1[Hero + Отзывы]
    I --> I2[Кейсы]
    
    J --> J1[Hero + Контакты]
    J --> J2[Форма + Карта]
    
    style A fill:#3b82f6,stroke:#1e40af,stroke-width:3px,color:#fff
    style B fill:#10b981,stroke:#059669,stroke-width:2px,color:#fff
    style D fill:#10b981,stroke:#059669,stroke-width:2px,color:#fff
    style E fill:#f59e0b,stroke:#d97706,stroke-width:2px,color:#fff
    style F fill:#f59e0b,stroke:#d97706,stroke-width:2px,color:#fff
    style G fill:#f59e0b,stroke:#d97706,stroke-width:2px,color:#fff
    style H fill:#f59e0b,stroke:#d97706,stroke-width:2px,color:#fff
    style I fill:#f59e0b,stroke:#d97706,stroke-width:2px,color:#fff
    style J fill:#f59e0b,stroke:#d97706,stroke-width:2px,color:#fff
```

## 🧩 Компонентная архитектура

```mermaid
graph LR
    A[App.tsx] --> B[BrowserRouter]
    B --> C[Header]
    B --> D[Routes]
    B --> E[Footer]
    B --> F[ScrollToTop]
    
    D --> G[Index Page]
    D --> H[Services Page]
    D --> I[About Page]
    D --> J[Geography Page]
    D --> K[Reviews Page]
    D --> L[Contacts Page]
    
    G --> M[HeroSection]
    G --> N[BenefitsSection]
    G --> O[AboutPreview]
    
    M --> P[Button - shadcn/ui]
    N --> P
    O --> P
    
    L --> Q[Input - shadcn/ui]
    L --> R[Textarea - shadcn/ui]
    L --> P
    
    style A fill:#8b5cf6,stroke:#7c3aed,stroke-width:3px,color:#fff
    style C fill:#10b981,stroke:#059669,stroke-width:2px,color:#fff
    style E fill:#10b981,stroke:#059669,stroke-width:2px,color:#fff
    style G fill:#3b82f6,stroke:#2563eb,stroke-width:2px,color:#fff
    style H fill:#3b82f6,stroke:#2563eb,stroke-width:2px,color:#fff
    style I fill:#3b82f6,stroke:#2563eb,stroke-width:2px,color:#fff
    style J fill:#3b82f6,stroke:#2563eb,stroke-width:2px,color:#fff
    style K fill:#3b82f6,stroke:#2563eb,stroke-width:2px,color:#fff
    style L fill:#3b82f6,stroke:#2563eb,stroke-width:2px,color:#fff
```

## 🔄 User Flow: Конверсия в лид

```mermaid
flowchart TD
    A[Посетитель заходит на сайт] --> B{Первый визит?}
    B -->|Да| C[Главная страница]
    B -->|Нет| D[Любая страница]
    
    C --> E[Читает Hero заголовок]
    E --> F[Просматривает статистику]
    F --> G{Заинтересован?}
    
    G -->|Нет| H[Уходит - Bounce]
    G -->|Да| I[Прокручивает вниз]
    
    I --> J[Benefits Section]
    J --> K[About Preview]
    K --> L{Достаточно инфо?}
    
    L -->|Нет| M[Переход в Услуги/О компании]
    L -->|Да| N[Клик на CTA]
    
    M --> O[Изучает детали]
    O --> P[Читает отзывы]
    P --> Q{Убедился?}
    
    Q -->|Да| N
    Q -->|Нет| R[Уходит думать]
    
    N --> S[Страница Контакты]
    S --> T[Заполняет форму]
    T --> U[Отправка формы]
    U --> V[✅ КОНВЕРСИЯ!]
    
    D --> W[Навигация по сайту]
    W --> I
    
    style A fill:#3b82f6,stroke:#2563eb,stroke-width:2px,color:#fff
    style V fill:#10b981,stroke:#059669,stroke-width:3px,color:#fff
    style H fill:#ef4444,stroke:#dc2626,stroke-width:2px,color:#fff
    style R fill:#f59e0b,stroke:#d97706,stroke-width:2px,color:#fff
    style N fill:#8b5cf6,stroke:#7c3aed,stroke-width:2px,color:#fff
```

## 📊 Конверсионная воронка

```mermaid
funnel
    title Конверсионная воронка Armax Logistics
    section Визиты
        "Посетители сайта": 100
    section Вовлечённость
        "Остаются на сайте (не bounce)": 70
        "Прокручивают страницу": 50
    section Интерес
        "Кликают на CTA": 20
        "Переходят на Контакты": 15
    section Конверсия
        "Начинают заполнять форму": 10
        "Отправляют заявку": 5
```

## 🎨 Дизайн-система: Иерархия

```mermaid
graph TB
    A[Design System] --> B[Colors]
    A --> C[Typography]
    A --> D[Components]
    A --> E[Spacing]
    
    B --> B1[Primary - Blue]
    B --> B2[Accent - Highlight]
    B --> B3[Neutral - Grays]
    B --> B4[Semantic - Success/Error]
    
    C --> C1[Headings H1-H6]
    C --> C2[Body Text]
    C --> C3[Font Weights]
    
    D --> D1[Buttons]
    D --> D2[Cards]
    D --> D3[Forms]
    D --> D4[Navigation]
    
    E --> E1[Sections: 96-128px]
    E --> E2[Cards: 32-40px]
    E --> E3[Elements: 24-32px]
    
    D1 --> D1A[Primary CTA]
    D1 --> D1B[Secondary CTA]
    D1 --> D1C[Outline]
    
    style A fill:#8b5cf6,stroke:#7c3aed,stroke-width:3px,color:#fff
    style B fill:#3b82f6,stroke:#2563eb,stroke-width:2px,color:#fff
    style C fill:#10b981,stroke:#059669,stroke-width:2px,color:#fff
    style D fill:#f59e0b,stroke:#d97706,stroke-width:2px,color:#fff
    style E fill:#ec4899,stroke:#db2777,stroke-width:2px,color:#fff
```

## 🔗 Data Flow: Форма контактов

```mermaid
sequenceDiagram
    participant U as User
    participant F as Форма
    participant V as Validation
    participant S as State
    participant T as Toast
    
    U->>F: Заполняет поля
    F->>V: Валидация в реальном времени
    V-->>F: Ошибки валидации
    F-->>U: Показ ошибок
    
    U->>F: Исправляет ошибки
    F->>V: Повторная валидация
    V-->>F: ✅ Всё ок
    
    U->>F: Нажимает "Отправить"
    F->>S: handleSubmit
    S->>S: Обработка данных
    S->>T: Показать успех
    T-->>U: "Спасибо! Мы свяжемся с вами"
    S->>F: Очистка формы
    F-->>U: Пустая форма
```

## 🚀 Deployment Flow

```mermaid
graph LR
    A[Local Development] --> B[Git Push]
    B --> C[GitHub Repo]
    C --> D[Lovable Platform]
    D --> E[Build Process]
    E --> F[Deploy to CDN]
    F --> G[✅ Live Site]
    
    H[Custom Domain] -.-> G
    
    style A fill:#3b82f6,stroke:#2563eb,stroke-width:2px,color:#fff
    style G fill:#10b981,stroke:#059669,stroke-width:3px,color:#fff
    style H fill:#8b5cf6,stroke:#7c3aed,stroke-width:2px,color:#fff
```

## 📱 Responsive Breakpoints

```mermaid
graph LR
    A[Device Types] --> B[Mobile < 768px]
    A --> C[Tablet 768-1024px]
    A --> D[Desktop > 1024px]
    
    B --> B1[1 Column Layout]
    B --> B2[Hamburger Menu]
    B --> B3[Smaller Fonts]
    B --> B4[Stack Elements]
    
    C --> C1[2 Column Layout]
    C --> C2[Compact Menu]
    C --> C3[Medium Fonts]
    
    D --> D1[4 Column Layout]
    D --> D2[Full Navigation]
    D --> D3[Large Fonts]
    D --> D4[Hover Effects]
    
    style B fill:#3b82f6,stroke:#2563eb,stroke-width:2px,color:#fff
    style C fill:#10b981,stroke:#059669,stroke-width:2px,color:#fff
    style D fill:#8b5cf6,stroke:#7c3aed,stroke-width:2px,color:#fff
```

## 🎯 CTA Strategy Map

```mermaid
graph TD
    A[CTA Strategy] --> B[Header - Global]
    A --> C[Page-Specific]
    A --> D[Footer Links]
    
    B --> B1["Отправить заявку" - All Pages]
    
    C --> C1[Главная]
    C --> C2[Услуги]
    C --> C3[About Preview]
    
    C1 --> C1A["Получить предложение"]
    C1 --> C1B["Наши услуги"]
    C1A --> E[/contacts]
    C1B --> F[/services]
    
    C2 --> C2A["Узнать подробнее" x4]
    C2A --> E
    
    C3 --> C3A["Подробнее о компании"]
    C3A --> G[/about]
    
    B1 --> E
    
    style A fill:#8b5cf6,stroke:#7c3aed,stroke-width:3px,color:#fff
    style E fill:#10b981,stroke:#059669,stroke-width:3px,color:#fff
    style B1 fill:#f59e0b,stroke:#d97706,stroke-width:2px,color:#fff
```

## 🔄 State Management

```mermaid
graph TB
    A[Application State] --> B[Global State]
    A --> C[Local State]
    A --> D[Server State]
    
    B --> B1[React Context]
    B --> B2[Toast Notifications]
    
    C --> C1[useState - Forms]
    C --> C2[useState - UI State]
    C --> C3[Mobile Menu Open/Close]
    
    D --> D1[React Query]
    D --> D2[Future: API Calls]
    
    C1 --> E[Contacts Form Data]
    C2 --> F[Active Route]
    
    style A fill:#8b5cf6,stroke:#7c3aed,stroke-width:3px,color:#fff
    style B fill:#3b82f6,stroke:#2563eb,stroke-width:2px,color:#fff
    style C fill:#10b981,stroke:#059669,stroke-width:2px,color:#fff
    style D fill:#f59e0b,stroke:#d97706,stroke-width:2px,color:#fff
```

## 📈 Analytics Events (Planned)

```mermaid
graph TD
    A[User Actions] --> B[Page Views]
    A --> C[CTA Clicks]
    A --> D[Form Events]
    A --> E[Navigation]
    
    B --> B1[page_view - /]
    B --> B2[page_view - /services]
    B --> B3[page_view - /contacts]
    
    C --> C1[cta_click - hero_primary]
    C --> C2[cta_click - hero_secondary]
    C --> C3[cta_click - service_detail]
    
    D --> D1[form_start]
    D --> D2[form_submit]
    D --> D3[form_error]
    
    E --> E1[nav_click]
    E --> E2[scroll_depth]
    
    B1 --> F[Google Analytics]
    C1 --> F
    D1 --> F
    E1 --> F
    
    style A fill:#8b5cf6,stroke:#7c3aed,stroke-width:3px,color:#fff
    style F fill:#10b981,stroke:#059669,stroke-width:3px,color:#fff
```

## 🔐 Security Flow

```mermaid
graph LR
    A[User Input] --> B[Client-Side Validation]
    B --> C{Valid?}
    C -->|No| D[Show Error]
    C -->|Yes| E[Sanitization]
    E --> F[Send to Server]
    F --> G[Server Validation]
    G --> H{Valid?}
    H -->|No| I[Return Error]
    H -->|Yes| J[Process Data]
    J --> K[Send Email/Save]
    K --> L[Success Response]
    L --> M[Toast Notification]
    
    style A fill:#3b82f6,stroke:#2563eb,stroke-width:2px,color:#fff
    style K fill:#10b981,stroke:#059669,stroke-width:2px,color:#fff
    style D fill:#ef4444,stroke:#dc2626,stroke-width:2px,color:#fff
    style I fill:#ef4444,stroke:#dc2626,stroke-width:2px,color:#fff
```

---

## 📊 Легенда цветов

- 🔵 **Синий** - Основные элементы (страницы, компоненты)
- 🟢 **Зелёный** - Глобальные/успешные элементы (Header, Footer, Success)
- 🟣 **Фиолетовый** - Корневые элементы (App, Design System)
- 🟠 **Оранжевый** - Важные точки (CTA, Pages)
- 🔴 **Красный** - Ошибки, выходы (Bounce, Errors)
- 🟡 **Жёлтый** - Промежуточные состояния

---

**Создано**: 2025-11-07  
**Инструмент**: Mermaid.js  
**Для проекта**: Armax Logistics Showcase

> **Примечание**: Диаграммы автоматически отображаются на GitHub в README файлах

