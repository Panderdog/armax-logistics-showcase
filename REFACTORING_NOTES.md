# Code Review Refactoring — Feb 7, 2026

## ✅ Критичные исправления выполнены

### 1. ✅ HelmetProvider добавлен
**Проблема:** `react-helmet-async` использовался без `<HelmetProvider>` в корне приложения
**Решение:** Добавлен `<HelmetProvider>` в `App.tsx` (обёртка вокруг всего приложения)
```tsx
// src/App.tsx
import { HelmetProvider } from "react-helmet-async";

const App = () => {
  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        {/* ... остальной код */}
      </QueryClientProvider>
    </HelmetProvider>
  );
};
```

### 2. ✅ Создан переиспользуемый хук useApplicationForm
**Проблема:** Дубликат логики валидации и отправки формы в:
- `ApplicationModal.tsx` (~150 строк)
- `Contacts.tsx` (~80 строк)

**Решение:** Создан `src/hooks/useApplicationForm.ts`
- Единая валидация (имя, телефон, email, сообщение)
- Отправка в Supabase
- Email-уведомления через edge function
- Yandex Metrika goal tracking
- Обработка ошибок и состояний загрузки

**Использование:**
```tsx
const {
  formData,
  errors,
  isSubmitting,
  isSubmitted,
  submitError,
  handleSubmit,
  handleInputChange,
  resetForm,
} = useApplicationForm({
  initialPhone: "+7 ",
  onSuccess: () => {
    // Callback после успешной отправки
  },
});
```

### 3. ✅ Создан переиспользуемый хук useInView
**Проблема:** Inline определение IntersectionObserver хука в 6+ файлах:
- `Contacts.tsx` (строки 21-43)
- `NewsArticle.tsx`
- `NewsList.tsx`
- `StatsSection.tsx`
- `FAQ.tsx`
- `Geography.tsx`

**Решение:** Создан `src/hooks/useInView.ts`
- Настраиваемый threshold
- rootMargin опция
- triggerOnce опция (отключение observer после первого срабатывания)

**Использование:**
```tsx
const { ref, isInView } = useInView({ 
  threshold: 0.2, 
  triggerOnce: true 
});

<div ref={ref} className={isInView ? 'fade-in' : 'opacity-0'}>
  Content
</div>
```

### 4. ✅ Удалён некорректный комментарий
**Проблема:** В `Contacts.tsx` строка 115-116:
```tsx
// @ts-expect-error - Yandex Maps typings issue
const { error } = await supabase.from("applications").insert({
```
Комментарий про Yandex Maps, но код работает с Supabase (копипаста-ошибка)

**Решение:** Комментарий удалён при рефакторинге в хук

### 5. ✅ App.css удалён
**Проблема:** Vite boilerplate стили не используются в проекте
- `#root { max-width: 1280px }` конфликтовал с full-width секциями
- `.logo`, `.read-the-docs` и другие стили не используются

**Решение:** Файл `src/App.css` полностью удалён

### 6. ✅ Inline styles заменены на Tailwind
**Проблема:** `ServiceDetail.tsx` использовал inline JS для управления стилями:
```tsx
onMouseEnter={(e) => {
  e.currentTarget.style.boxShadow = '0 20px 40px...';
}}
```

**Решение:** Заменено на Tailwind classes:
```tsx
className="hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.3),0_0_30px_-10px_rgba(243,77,27,0.1)]"
```

## 📊 Статистика

### Удалено дублированного кода
- ~150 строк валидации/отправки формы → 1 хук
- ~120 строк IntersectionObserver логики → 1 хук
- 43 строки неиспользуемого CSS → удалено

### Обновлённые файлы
**Новые файлы:**
- `src/hooks/useApplicationForm.ts` (новый)
- `src/hooks/useInView.ts` (новый)

**Обновлённые компоненты:**
- `src/App.tsx` (добавлен HelmetProvider)
- `src/components/ApplicationModal.tsx` (рефакторинг на хук)
- `src/pages/Contacts.tsx` (рефакторинг на хуки)
- `src/pages/ServiceDetail.tsx` (inline styles → Tailwind)
- `src/components/StatsSection.tsx` (useInView хук)
- `src/pages/FAQ.tsx` (useInView хук)
- `src/pages/Geography.tsx` (useInView хук)
- `src/pages/NewsArticle.tsx` (useInView хук)
- `src/pages/NewsList.tsx` (useInView хук)

**Удалённые файлы:**
- `src/App.css` (не использовался)

## ✅ Проверки
- ✅ TypeScript: `npx tsc --noEmit` — без ошибок
- ✅ Build: `npm run build` — успешно
- ✅ Dev server: запускается на http://localhost:8081/ — 200 OK
- ✅ React-snap prerendering: работает корректно

## 🎯 Результат

Код стал:
- **Чище**: нет дублей валидации и IntersectionObserver
- **Поддерживаемее**: изменения в одном месте, а не в 6+ файлах
- **Типобезопаснее**: react-helmet-async теперь работает корректно
- **Современнее**: Tailwind вместо inline JS-стилей

**Ничего не сломано:**
- Все формы работают как раньше
- Анимации работают
- SEO meta-теги рендерятся корректно
- Билд проходит успешно
