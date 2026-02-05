# 🚀 Инструкция по деплою Frontend

## ✅ Frontend готов к деплою!

Все настройки выполнены, переменные окружения настроены через `.env` файлы.

---

## 📋 Что было настроено:

### 1. **Переменные окружения**
- ✅ API уже использует `VITE_API_URL` из переменных окружения
- ✅ Создан `.env.example` - шаблон для development
- ✅ Создан `.env.production.example` - шаблон для production
- ✅ Обновлен `.gitignore` - .env файлы не попадут в Git

### 2. **Конфигурационные файлы**
- ✅ `vercel.json` - для деплоя на Vercel
- ✅ `netlify.toml` - для деплоя на Netlify  
- ✅ `render.yaml` - для деплоя на Render.com

### 3. **Routing**
- ✅ Настроено перенаправление всех маршрутов на index.html (SPA)

---

## 🎯 Варианты деплоя:

### 🔷 Вариант 1: Vercel (Рекомендуется) ⭐

**Преимущества:** Быстро, бесплатно, автоматический деплой из GitHub, отличная производительность

#### Шаги:

1. **Загрузите код на GitHub:**
   ```bash
   cd "/Users/Apple/Desktop/projects/Новая папка/boxer-platform"
   git add frontend/
   git commit -m "Prepare frontend for deployment"
   git push
   ```

2. **Зарегистрируйтесь на [Vercel](https://vercel.com)**
   - Используйте GitHub аккаунт

3. **Создайте новый проект:**
   - Dashboard → "Add New..." → "Project"
   - Import Git Repository (выберите ваш репозиторий)
   - Root Directory: `frontend`
   - Framework Preset: Vite
   - Build Command: `npm run build` (автоматически)
   - Output Directory: `dist` (автоматически)

4. **Настройте Environment Variables:**
   ```
   VITE_API_URL = https://your-backend.onrender.com/api
   ```

5. **Deploy!**
   - Нажмите "Deploy"
   - Готово через 1-2 минуты!
   - URL: `https://your-app.vercel.app`

6. **Автоматический деплой:**
   - Каждый push в main → автоматический деплой ✅

---

### 🟢 Вариант 2: Netlify

**Преимущества:** Простой, бесплатный, хороший UI

#### Шаги:

1. **Загрузите код на GitHub** (см. выше)

2. **Зарегистрируйтесь на [Netlify](https://netlify.com)**

3. **Создайте новый сайт:**
   - "Add new site" → "Import an existing project"
   - Подключите GitHub репозиторий
   - Base directory: `frontend`
   - Build command: `npm run build`
   - Publish directory: `frontend/dist`

4. **Настройте Environment Variables:**
   - Site settings → Environment variables
   - Добавьте: `VITE_API_URL = https://your-backend.onrender.com/api`

5. **Deploy!**
   - Netlify автоматически начнет деплой
   - URL: `https://your-app.netlify.app`

---

### 🟣 Вариант 3: Render.com

**Преимущества:** Всё в одном месте (backend + frontend)

#### Шаги:

1. **Загрузите код на GitHub** (см. выше)

2. **Зарегистрируйтесь на [Render.com](https://render.com)**

3. **Создайте Static Site:**
   - Dashboard → "New +" → "Static Site"
   - Подключите GitHub репозиторий
   - Name: `boxer-platform-frontend`
   - Root Directory: `frontend`
   - Build Command: `npm install && npm run build`
   - Publish Directory: `dist`

4. **Настройте Environment Variables:**
   ```
   VITE_API_URL = https://your-backend.onrender.com/api
   ```

5. **Deploy!**
   - Нажмите "Create Static Site"
   - URL: `https://your-app.onrender.com`

---

### 🔵 Вариант 4: GitHub Pages

**Преимущества:** Совсем бесплатно, простой

#### Шаги:

1. **Установите gh-pages:**
   ```bash
   cd frontend
   npm install --save-dev gh-pages
   ```

2. **Обновите package.json:**
   ```json
   {
     "homepage": "https://your-username.github.io/boxer-platform",
     "scripts": {
       "predeploy": "npm run build",
       "deploy": "gh-pages -d dist"
     }
   }
   ```

3. **Настройте base в vite.config.js:**
   ```javascript
   export default defineConfig({
     base: '/boxer-platform/',
     // ...остальные настройки
   })
   ```

4. **Создайте .env.production:**
   ```env
   VITE_API_URL=https://your-backend.onrender.com/api
   ```

5. **Deploy:**
   ```bash
   npm run deploy
   ```

6. **Настройте GitHub Pages:**
   - Repository Settings → Pages
   - Source: gh-pages branch
   - URL: `https://your-username.github.io/boxer-platform`

---

## 🔑 Настройка переменных окружения

### Обязательная переменная:

```env
VITE_API_URL=https://your-backend-api-url.com/api
```

### Где взять URL бэкенда:
- После деплоя backend на Render.com
- URL будет вида: `https://boxer-platform-backend.onrender.com`
- Добавьте `/api` в конец: `https://boxer-platform-backend.onrender.com/api`

### Как добавить в разные платформы:

**Vercel:**
- Project Settings → Environment Variables
- Name: `VITE_API_URL`
- Value: `https://your-backend.onrender.com/api`
- Environments: Production, Preview, Development

**Netlify:**
- Site settings → Build & deploy → Environment
- Key: `VITE_API_URL`
- Value: `https://your-backend.onrender.com/api`

**Render:**
- Environment → Environment Variables
- Key: `VITE_API_URL`
- Value: `https://your-backend.onrender.com/api`

---

## 🔄 После деплоя backend:

1. **Обновите CORS в backend:**
   - Добавьте URL фронтенда в `CORS_ALLOWED_ORIGINS`
   - Например: `https://your-app.vercel.app`

2. **Проверьте подключение:**
   - Откройте DevTools (F12)
   - Console → проверьте нет ли CORS ошибок
   - Network → проверьте запросы к API

---

## 🧪 Тестирование перед деплоем:

### Локально с production build:

```bash
cd frontend

# Создайте .env.production
echo "VITE_API_URL=https://your-backend.onrender.com/api" > .env.production

# Соберите production версию
npm run build

# Запустите preview
npm run preview

# Откройте http://localhost:4173
```

---

## 📊 Оптимизация production build:

Frontend уже оптимизирован, но вы можете добавить:

### 1. Анализ размера бандла:
```bash
npm install --save-dev rollup-plugin-visualizer
```

Добавьте в `vite.config.js`:
```javascript
import { visualizer } from 'rollup-plugin-visualizer'

export default defineConfig({
  plugins: [
    react(),
    visualizer({ open: true })
  ]
})
```

### 2. Lazy loading для страниц:

Уже реализовано через React.lazy() (если нужно)

---

## 🔒 Security Headers

Уже настроены в конфигах:
- ✅ X-Frame-Options: DENY
- ✅ X-Content-Type-Options: nosniff
- ✅ X-XSS-Protection: 1; mode=block

---

## 🌐 Custom Domain

### Vercel:
- Project Settings → Domains
- Add domain → Введите ваш домен
- Настройте DNS записи (Vercel покажет инструкции)

### Netlify:
- Domain settings → Add custom domain
- Следуйте инструкциям по настройке DNS

### Render:
- Settings → Custom Domain
- Добавьте домен и настройте DNS

---

## 🐛 Troubleshooting

### Ошибка "Failed to fetch":
```
✅ Проверьте VITE_API_URL
✅ Проверьте CORS настройки в backend
✅ Проверьте что backend запущен
```

### 404 при переходе по URL:
```
✅ Проверьте настройки rewrites/redirects
✅ Для Vercel - vercel.json настроен ✅
✅ Для Netlify - netlify.toml настроен ✅
```

### Переменные окружения не работают:
```
✅ Переменные должны начинаться с VITE_
✅ Пересоберите: npm run build
✅ Перезапустите dev сервер
```

### CORS ошибки:
```
✅ Добавьте URL фронтенда в CORS_ALLOWED_ORIGINS backend
✅ Формат: https://your-app.vercel.app (без / в конце)
✅ Перезапустите backend после изменений
```

---

## 📈 Performance

После деплоя проверьте:
- **Lighthouse Score** (Google Chrome DevTools)
- **PageSpeed Insights**: https://pagespeed.web.dev/
- **GTmetrix**: https://gtmetrix.com/

Целевые показатели:
- Performance: 90+
- Accessibility: 95+
- Best Practices: 90+
- SEO: 90+

---

## ✅ Чек-лист перед деплоем:

- [ ] Код загружен на GitHub
- [ ] .env файлы НЕ загружены в Git (проверьте .gitignore)
- [ ] Backend задеплоен и работает
- [ ] VITE_API_URL указывает на правильный backend
- [ ] CORS настроен в backend для вашего frontend домена
- [ ] Production build собирается без ошибок (`npm run build`)
- [ ] Переменные окружения добавлены на платформу деплоя
- [ ] Routing работает (все маршруты ведут на index.html)

---

## 🎉 После успешного деплоя:

1. **Проверьте основные функции:**
   - ✅ Регистрация/Вход
   - ✅ Просмотр курсов
   - ✅ Корзина
   - ✅ AI Chat
   - ✅ Профиль

2. **Проверьте на разных устройствах:**
   - 💻 Desktop
   - 📱 Mobile
   - 🖥️ Tablet

3. **Мониторинг:**
   - Vercel Analytics (встроен)
   - Google Analytics (если настроен)
   - Sentry для ошибок (опционально)

---

## 📚 Полезные ссылки:

- **Vercel Docs:** https://vercel.com/docs
- **Netlify Docs:** https://docs.netlify.com
- **Render Docs:** https://render.com/docs
- **Vite Docs:** https://vitejs.dev/guide/
- **Vite Env Variables:** https://vitejs.dev/guide/env-and-mode.html

---

**🚀 Frontend готов к деплою! Выберите платформу и следуйте инструкциям выше.**

Рекомендуется: **Vercel** - самый быстрый и простой вариант для React приложений.
