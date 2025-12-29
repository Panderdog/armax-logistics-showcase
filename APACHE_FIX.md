# Исправление ошибки 404 для админки на Apache

## Проблема
При открытии `/admin/login` на Apache сервере появляется ошибка 404, потому что Apache не знает, что это Single Page Application (SPA) и все маршруты должны идти через `index.html`.

## Решение

Добавлен файл `.htaccess` в папку `dist/` с правилами для Apache:
- Перенаправление всех маршрутов на `index.html`
- Gzip сжатие для оптимизации
- Кэширование статических файлов
- Заголовки безопасности

## Инструкция по деплою на Apache сервер

### Шаг 1: Загрузите новый dist.zip
1. Скачайте обновленный файл `dist.zip` (он уже содержит `.htaccess`)
2. Загрузите на ваш сервер

### Шаг 2: Удалите старые файлы
```bash
# Подключитесь к серверу по SSH
ssh ваш_пользователь@armaxstp.com

# Перейдите в папку сайта
cd /var/www/html  # или путь к вашему сайту

# Удалите старые файлы (ОСТОРОЖНО!)
rm -rf *
```

### Шаг 3: Распакуйте новый архив
```bash
# Распакуйте архив
unzip dist.zip

# Переместите содержимое dist/ в корень
mv dist/* .
mv dist/.htaccess .

# Удалите пустую папку dist
rmdir dist

# Проверьте, что .htaccess на месте
ls -la | grep .htaccess
```

### Шаг 4: Установите правильные права
```bash
# Установите права на файлы
chmod 644 .htaccess
chmod -R 755 .

# Если нужно, измените владельца
chown -R www-data:www-data .
# ИЛИ (зависит от конфигурации)
chown -R apache:apache .
```

### Шаг 5: Проверьте, что mod_rewrite включен
```bash
# Проверьте, включен ли модуль
sudo a2enmod rewrite

# Перезапустите Apache
sudo systemctl restart apache2
# ИЛИ на CentOS
sudo systemctl restart httpd
```

### Шаг 6: Проверьте конфигурацию Apache
В файле конфигурации Apache для вашего сайта должна быть директива `AllowOverride All`:

```apache
<Directory /var/www/html>
    Options Indexes FollowSymLinks
    AllowOverride All    # ← Это важно!
    Require all granted
</Directory>
```

Файл обычно находится в:
- Ubuntu/Debian: `/etc/apache2/sites-available/000-default.conf`
- CentOS/RHEL: `/etc/httpd/conf.d/yourdomain.conf`

После изменения:
```bash
sudo systemctl reload apache2
# ИЛИ
sudo systemctl reload httpd
```

## Проверка

1. Откройте в браузере: https://armaxstp.com/admin/login
2. Должна появиться страница входа с логотипом Armax
3. Откройте консоль браузера (F12) - не должно быть ошибок 404

## Доступ в админку

После успешной загрузки:

1. Откройте: https://armaxstp.com/admin/login
2. Войдите с учетными данными из Supabase
3. Доступные разделы:
   - `/admin` - Dashboard
   - `/admin/applications` - Заявки
   - `/admin/news` - Новости

## Если не работает

### Вариант 1: .htaccess не обрабатывается
Проверьте, что `AllowOverride All` установлен в конфигурации Apache.

### Вариант 2: mod_rewrite не включен
```bash
sudo a2enmod rewrite
sudo systemctl restart apache2
```

### Вариант 3: Используется Nginx
Если у вас Nginx (не Apache), используйте файл `nginx.conf.example` вместо `.htaccess`.

## Альтернатива: Деплой на Netlify/Vercel

Если проблемы с Apache продолжаются, рекомендую задеплоить на:

### Netlify (рекомендуется)
```bash
# Установите Netlify CLI
npm install -g netlify-cli

# Залогиньтесь
netlify login

# Задеплойте
netlify deploy --prod --dir=dist
```

### Vercel
```bash
# Установите Vercel CLI
npm install -g vercel

# Задеплойте
vercel --prod
```

Оба сервиса автоматически настроят правильный роутинг для SPA.

## Поддержка

Если после всех шагов `/admin/login` все равно не открывается:
1. Проверьте логи Apache: `sudo tail -f /var/log/apache2/error.log`
2. Убедитесь, что файл `.htaccess` есть в корне сайта
3. Проверьте, что `mod_rewrite` включен
4. Проверьте права доступа к `.htaccess`

