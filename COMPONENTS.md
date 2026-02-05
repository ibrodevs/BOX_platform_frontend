# Структура компонентов фронтенда

## Публичные страницы

### Главная (/) — Home.jsx
- Hero-секция с фото и слоганом
- Статистика достижений (15+ лет опыта, 50+ побед, 1000+ учеников)
- Блок популярных онлайн-курсов
- Преимущества обучения (3 карточки)
- Отзывы учеников (3 отзыва)
- CTA кнопка «Начать тренироваться»

### О спортсмене (/about) — About.jsx
- Биография тренера
- Достижения (таймлайн)
- Фото / видео галерея (3 плейсхолдера)
- Философия тренировок

### Курсы (/courses) — Courses.jsx
- Список онлайн-курсов (карточки)
- Фильтры по уровню (beginner/intermediate/advanced)

### Детали курса (/courses/:id) — CourseDetail.jsx
- Описание курса
- Чему научится ученик
- Список уроков (заблокированы до оплаты)
- Кнопка покупки

## Авторизация

### Вход (/login) — Login.jsx
- Форма входа (username, password)
- Использует UI компоненты (Input, Button)
- Редирект в /dashboard после входа

### Регистрация (/register) — Register.jsx
- Форма регистрации (username, email, password, first_name, last_name)
- Валидация совпадения паролей
- Использует UI компоненты (Input, Button)
- Редирект в /dashboard после регистрации

## Личный кабинет / Dashboard

### Главная дашборда (/dashboard) — Dashboard.jsx
- Статистика прогресса (4 карточки):
  - Всего курсов
  - Завершено курсов
  - Всего уроков
  - Пройдено уроков
- Продолжить обучение (последние 3 курса)
- Рекомендации (3 карточки)
- Быстрые действия (ссылки на Мои курсы, Профиль, Платежи)

### Мои курсы (/dashboard/my-courses) — MyCourses.jsx
- Список купленных курсов
- Статус прогресса (прогресс-бар)

### Просмотр курса (/dashboard/course/:id) — CoursePlayer.jsx
- Информация о курсе
- Список уроков с доступом
- Прогресс-бар
- Кнопка назад к курсам

### Просмотр урока (/dashboard/lesson/:id) — Lesson.jsx
- Видеоплеер (streaming)
- Таймкоды
- Текстовое описание
- Кнопка завершения урока

### Профиль пользователя (/dashboard/profile) — Profile.jsx
- Форма редактирования профиля
- Изменение пароля
- Опасная зона (удаление аккаунта)

### Платежи (/dashboard/payments) — Payments.jsx
- История оплат (карточки транзакций)
- Суммарная статистика (3 карточки):
  - Всего потрачено
  - Успешных платежей
  - Всего транзакций
- Раздел помощи

### Страница 404 — NotFound.jsx
- Анимированная цифра 404
- Сообщение об ошибке
- Кнопка возврата на главную
- Анимированный эмодзи перчаток

## Компоненты

### Layout

#### Navbar.jsx
- Логотип BOXERPLATFORM
- Навигация (Главная, О тренере, Курсы, Личный кабинет, Мои курсы)
- Кнопки авторизации / профиль пользователя
- Адаптивное меню с MobileMenu
- Sticky навигация

#### Footer.jsx
- Информация о платформе
- Навигация по сайту
- Поддержка (ссылки)
- Социальные сети
- Copyright

#### MobileMenu.jsx
- Боковое выдвижное меню (справа)
- Информация о пользователе
- Навигация
- Кнопки авторизации

### UI Компоненты

#### Button.jsx
- Варианты: primary, secondary, outline, ghost
- Размеры: sm, md, lg
- Состояния: loading, disabled
- Анимации hover/tap (Framer Motion)

#### Input.jsx
- Label с опциональным * для required
- Отображение ошибок
- Все типы input (text, email, password, etc.)

#### Card.jsx
- Базовый контейнер для карточек
- Опциональная hover анимация
- Переиспользуемый компонент

#### Modal.jsx
- Backdrop с закрытием по клику
- Анимированное появление/исчезание
- Заголовок и кнопка закрытия
- Максимальная высота с прокруткой

#### Loader.jsx
- Размеры: sm, md, lg
- Режим fullScreen для загрузки страницы
- Спиннер с текстом "Загрузка..."

### Компоненты курсов

#### CourseCard.jsx
- Превью курса (thumbnail, title, description)
- Уровень сложности (badge)
- Цена и количество уроков
- Hover анимация

#### CourseProgress.jsx
- Прогресс-бар с процентами
- Отображение X из Y уроков
- Анимированный переход заполнения

#### LessonItem.jsx
- Карточка урока с номером/галочкой
- Информация о длительности
- Статусы: заблокирован, пройден, бесплатный
- Ссылка на урок (если доступен)

### AI Компоненты

#### AIChat.jsx
- Floating widget на всех страницах
- Чат с AI-тренером
- Вопросы по платформе и технике бокса
- Интеграция с Gemini API через backend

## Структура файлов

```
frontend/src/
├── components/
│   ├── ui/
│   │   ├── Button.jsx
│   │   ├── Input.jsx
│   │   ├── Card.jsx
│   │   ├── Modal.jsx
│   │   ├── Loader.jsx
│   │   └── index.js
│   ├── layout/
│   │   ├── Footer.jsx
│   │   ├── MobileMenu.jsx
│   │   └── index.js
│   ├── courses/
│   │   ├── CourseProgress.jsx
│   │   ├── LessonItem.jsx
│   │   └── index.js
│   ├── AIChat.jsx
│   ├── CourseCard.jsx
│   └── Navbar.jsx
├── pages/
│   ├── Home.jsx
│   ├── About.jsx
│   ├── Courses.jsx
│   ├── CourseDetail.jsx
│   ├── Login.jsx
│   ├── Register.jsx
│   ├── Dashboard.jsx
│   ├── MyCourses.jsx
│   ├── CoursePlayer.jsx
│   ├── Lesson.jsx
│   ├── Profile.jsx
│   ├── Payments.jsx
│   └── NotFound.jsx
├── services/
│   ├── api.js
│   └── apiService.js
├── store/
│   └── authStore.js
├── App.jsx
├── main.jsx
└── index.css
```

## Роутинг

```
/ - Home (публичная)
/about - About (публичная)
/courses - Courses (публичная)
/courses/:slug - CourseDetail (публичная)
/login - Login (публичная)
/register - Register (публичная)

/dashboard - Dashboard (требует авторизацию)
/dashboard/my-courses - MyCourses (требует авторизацию)
/dashboard/course/:id - CoursePlayer (требует авторизацию)
/dashboard/lesson/:id - Lesson (требует авторизацию)
/dashboard/profile - Profile (требует авторизацию)
/dashboard/payments - Payments (требует авторизацию)

* - NotFound (404)
```

## Цветовая схема

- Primary: #D10000 (красный)
- Dark: #0B0B0B (черный)
- Background: black
- Borders: gray-800

## Технологии

- React 18.2.0
- React Router DOM 6
- Framer Motion (анимации)
- Tailwind CSS (стили)
- Zustand (state management)
- Axios (HTTP клиент)
