# Чек-лист миграции на Яндекс.Карты

## Сделано

### 1. Замена карты на странице контактов
- ✅ Заменен Google Maps iframe на Яндекс.Карты
- ✅ Адрес: Горское шоссе, 4, Санкт-Петербург
- ✅ Отключен зум через скролл (`scroll=false` + `scrolling="no"`)

### 2. Обновлен CSP во всех конфигах
- ✅ `public/.htaccess` (основной для Apache) - **это то, что работает на проде!**
- ✅ `netlify.toml` (для будущего деплоя на Netlify)
- ✅ `vercel.json` (для будущего деплоя на Vercel)
- ✅ `nginx.conf.example` (для тех, кто на Nginx)

**Обновленный CSP:**
```
frame-src 'self' https://yandex.ru https://*.yandex.ru https://yandex.com https://*.yandex.com
```

**Оставлено широким для совместимости:**
```
img-src 'self' data: https:
font-src 'self' data: https:
```

### 3. Обновлена Privacy Policy
- ✅ Заменено "Google Maps" на "Яндекс.Карты"
- ✅ Добавлено подробное описание про передачу данных Яндексу (IP, User-Agent, cookies)

## Инструкция по проверке на проде

### Шаг 1: Деплой на сервер

```bash
# Соберите проект
npm run build

# Убедитесь, что .htaccess скопирован в dist/
ls -la dist/.htaccess

# Если нет, скопируйте вручную
node scripts/copy-htaccess.cjs

# Загрузите dist/ на сервер (замените на ваши данные)
# Вариант 1: через FTP/FileZilla
# Вариант 2: через rsync
rsync -avz --delete dist/ user@armaxstp.com:/var/www/html/

# Проверьте права
ssh user@armaxstp.com "chmod 644 /var/www/html/.htaccess"
```

### Шаг 2: Проверка текущей CSP на сервере

```bash
# Проверьте, какой CSP отдается сейчас
curl -sI https://armaxstp.com/ | grep -i content-security

# Должно быть только ОДНО упоминание CSP (без дублей)
# В нем должен быть yandex.ru, а НЕ www.google.com
```

**Ожидаемый результат:**
```
Content-Security-Policy-Report-Only: default-src 'self'; ... frame-src 'self' https://yandex.ru https://*.yandex.ru ...
```

**Плохой результат (если такое):**
```
Content-Security-Policy-Report-Only: ... frame-src 'self' https://www.google.com ...
Content-Security-Policy-Report-Only: ... frame-src 'self' https://yandex.ru ...
```
☝️ Это значит дублирование заголовков - проверьте Apache config и убедитесь, что там нет другого CSP

### Шаг 3: Проверка в браузере (критично!)

1. **Откройте страницу контактов в инкогнито:**
   ```
   https://armaxstp.com/contacts
   ```

2. **Откройте DevTools (F12) → Console**

3. **Проверьте:**
   - ✅ Карта загрузилась и показывает Горское шоссе, 4
   - ✅ Нет ошибок типа `[Report Only] Refused to frame 'https://...'`
   - ✅ Нет упоминаний `www.google.com` или `maps.google.com`

4. **Проверьте зум:**
   - ✅ Прокрутка колесом мыши НЕ зумирует карту (скроллится страница)
   - ✅ Карта отображается корректно на десктопе и мобилке

5. **Проверьте Network (вкладка Network в DevTools):**
   - ✅ Запросы идут к `yandex.ru`, `*.yandex.ru`, `yastatic.net`
   - ❌ НЕТ запросов к `google.com`, `maps.google.com`, `googleapis.com`

### Шаг 4: Мониторинг CSP нарушений (1-2 дня)

CSP сейчас в режиме **Report-Only**, то есть только логирует нарушения, но не блокирует.

**Если в консоли появятся нарушения CSP:**

```
[Report Only] Refused to frame 'https://some-yandex-domain.com/' because it violates the following Content Security Policy directive: "frame-src 'self' https://yandex.ru..."
```

**Действия:**
1. Скопируйте точный URL, который блокируется
2. Добавьте этот домен в `frame-src` в `public/.htaccess`
3. Пересоберите и задеплойте

**Типичные домены Яндекса, которые могут понадобиться:**
- `https://yandex.ru` ✅ уже есть
- `https://*.yandex.ru` ✅ уже есть
- `https://yastatic.net` - для статики (если нужно, добавится автоматически через `https:` в img-src/font-src)

### Шаг 5: Перевод CSP в боевой режим (через 1-2 дня)

Если за 1-2 дня нарушений CSP не было:

1. В файле `public/.htaccess` на строке 84 замените:
   ```apache
   Header always set Content-Security-Policy-Report-Only "..."
   ```
   на:
   ```apache
   Header always set Content-Security-Policy "..."
   ```

2. Пересоберите и задеплойте:
   ```bash
   npm run build
   node scripts/copy-htaccess.cjs
   # загрузите на сервер
   ```

## Проверка на локалке (опционально)

Перед деплоем можно проверить локально:

```bash
# Соберите проект
npm run build

# Запустите локальный сервер из dist/
npx serve dist

# Откройте http://localhost:3000/contacts
# Проверьте, что карта работает (но CSP не будет работать на локалке)
```

## Если что-то пошло не так

### Карта не загружается
- Проверьте URL iframe в `src/pages/Contacts.tsx`
- Проверьте CSP в браузере (F12 → Console)
- Проверьте, что `.htaccess` есть на сервере

### CSP блокирует карту
- Посмотрите точный URL в ошибке CSP
- Добавьте домен в `frame-src` в `public/.htaccess`

### Google Maps все еще грузится
- Проверьте `src/pages/Contacts.tsx` - должен быть `yandex.ru`, а не `google.com`
- Очистите кэш браузера (Ctrl+Shift+Delete)
- Проверьте, что загрузили новый билд на сервер

### Дублирование CSP заголовков
- В Apache config файле (обычно `/etc/apache2/sites-available/000-default.conf`)
- Убедитесь, что там нет другого `Header set Content-Security-Policy`
- Если есть - закомментируйте его, чтобы работал только `.htaccess`

## Контакты для вопросов

Если возникли проблемы:
1. Проверьте консоль браузера (F12)
2. Проверьте Apache error log: `sudo tail -f /var/log/apache2/error.log`
3. Проверьте текущий CSP: `curl -sI https://armaxstp.com/ | grep -i content-security`
