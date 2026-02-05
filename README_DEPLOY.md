# 🚀 Frontend - Быстрый старт деплоя

## ✅ Готово к деплою!

API уже настроен для использования переменных окружения.

---

## 📦 Созданные файлы:

- ✅ `.env.example` - шаблон для development
- ✅ `.env.production.example` - шаблон для production
- ✅ `vercel.json` - конфиг для Vercel
- ✅ `netlify.toml` - конфиг для Netlify
- ✅ `render.yaml` - конфиг для Render
- ✅ `.gitignore` - обновлен

---

## 🎯 Быстрый деплой на Vercel:

### 1. Загрузите на GitHub:
```bash
git add .
git commit -m "Ready for deployment"
git push
```

### 2. Vercel:
- Зайдите на https://vercel.com
- New Project → Import Git Repository
- Root Directory: `frontend`
- Add Environment Variable:
  - `VITE_API_URL` = `https://your-backend.onrender.com/api`
- Deploy!

### 3. Обновите CORS в backend:
Добавьте URL фронтенда в `CORS_ALLOWED_ORIGINS`:
```
https://your-app.vercel.app
```

---

## 🔑 Обязательная переменная окружения:

```env
VITE_API_URL=https://your-backend.onrender.com/api
```

**Где взять:**
1. Задеплойте backend на Render.com
2. Скопируйте URL (например: `https://boxer-platform-backend.onrender.com`)
3. Добавьте `/api` в конец

---

## 🧪 Тестирование локально:

```bash
# Создайте .env.production
echo "VITE_API_URL=https://your-backend.onrender.com/api" > .env.production

# Соберите
npm run build

# Запустите preview
npm run preview
```

---

## 📚 Полная инструкция:

См. файл `DEPLOYMENT.md`

---

## ⚡ Альтернативные платформы:

- **Vercel** ⭐ - Рекомендуется (бесплатно, быстро)
- **Netlify** - Отличная альтернатива
- **Render** - Всё в одном месте
- **GitHub Pages** - Совсем бесплатно

---

**🎉 Всё готово! Ваш frontend настроен для деплоя.**
