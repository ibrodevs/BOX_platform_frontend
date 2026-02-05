# Шаблон для обновления компонентов с i18n

## Шаг 1: Добавить импорт useTranslation

```javascript
import { useTranslation } from 'react-i18next'
```

## Шаг 2: Добавить хук в компонент

```javascript
export default function MyComponent() {
  const { t } = useTranslation()
  // ... остальной код
}
```

## Шаг 3: Заменить строки на вызовы t()

### Примеры замены:

#### Простой текст:
```javascript
// Было:
<h1>Добро пожаловать</h1>

// Стало:
<h1>{t('welcome.title')}</h1>
```

#### Текст с переменными:
```javascript
// Было:
<p>У вас {count} новых сообщений</p>

// Стало:
<p>{t('messages.count', { count })}</p>

// В JSON:
"messages": {
  "count": "У вас {{count}} новых сообщений"
}
```

#### С fallback значением:
```javascript
// Стало:
<p>{t('some.key', { defaultValue: 'Текст по умолчанию' })}</p>
```

## Быстрая замена для основных компонентов

### NotFound.jsx
```javascript
import { useTranslation } from 'react-i18next'

export default function NotFound() {
  const { t } = useTranslation()
  return (
    <div>
      <h1>{t('notFound.title')}</h1>
      <p>{t('notFound.subtitle')}</p>
      <Link to="/">{t('notFound.goHome')}</Link>
    </div>
  )
}
```

### AIChat.jsx
```javascript
const { t } = useTranslation()

// Заголовок
<h3>{t('aiChat.title')}</h3>

// Placeholder
<input placeholder={t('aiChat.placeholder')} />

// Кнопка отправки
<button>{t('aiChat.send')}</button>

// Статус печатает
{isTyping && <span>{t('aiChat.typing')}</span>}
```

### Orders.jsx
```javascript
const { t } = useTranslation()

// Статусы заказов
const statusTranslations = {
  pending: t('orders.pending'),
  processing: t('orders.processing'),
  shipped: t('orders.shipped'),
  delivered: t('orders.delivered'),
  cancelled: t('orders.cancelled')
}

// Заголовки
<th>{t('orders.orderNumber')}</th>
<th>{t('orders.orderDate')}</th>
<th>{t('orders.orderStatus')}</th>
<th>{t('orders.totalAmount')}</th>
```

### MerchCard.jsx
```javascript
const { t } = useTranslation()

// Кнопка добавить в корзину
<button>{t('shop.addToCart')}</button>

// Статус наличия
{inStock ? t('shop.inStock') : t('shop.outOfStock')}

// Размер
<label>{t('merch.size')}</label>

// Цвет
<label>{t('merch.color')}</label>
```

### Lesson.jsx / CoursePlayer.jsx
```javascript
const { t } = useTranslation()

// Кнопки навигации
<button>{t('lesson.previousLesson')}</button>
<button>{t('lesson.nextLesson')}</button>

// Статус
<span>{t('lesson.completed')}</span>
<span>{t('lesson.inProgress')}</span>
<span>{t('lesson.locked')}</span>

// Действия
<button>{t('lesson.startLesson')}</button>
<button>{t('lesson.continueLesson')}</button>
<button>{t('lesson.markComplete')}</button>

// Вкладки
<Tab>{t('coursePlayer.overview')}</Tab>
<Tab>{t('coursePlayer.lessons')}</Tab>
<Tab>{t('coursePlayer.resources')}</Tab>
<Tab>{t('coursePlayer.progress')}</Tab>
```

### Dashboard.jsx
```javascript
const { t } = useTranslation()

// Приветствие
<h1>{t('dashboard.welcome')}, {user.name}!</h1>

// Статистика
<Card title={t('dashboard.stats.coursesInProgress')} value={stats.inProgress} />
<Card title={t('dashboard.stats.completedCourses')} value={stats.completed} />
<Card title={t('dashboard.stats.totalHours')} value={stats.hours} />
<Card title={t('dashboard.stats.certificates')} value={stats.certificates} />
```

### Courses.jsx
```javascript
const { t } = useTranslation()

// Заголовок
<h1>{t('courses.title')}</h1>
<p>{t('courses.subtitle')}</p>

// Фильтры
<button>{t('courses.all')}</button>
<button>{t('courses.beginner')}</button>
<button>{t('courses.intermediate')}</button>
<button>{t('courses.advanced')}</button>

// Сортировка
<select aria-label={t('courses.sort')}>
  <option>{t('courses.sort')}</option>
</select>
```

### Profile.jsx
```javascript
const { t } = useTranslation()

// Заголовок
<h1>{t('profile.title')}</h1>

// Секции
<h2>{t('profile.personalInfo')}</h2>
<h2>{t('profile.changePassword')}</h2>

// Поля
<Input label={t('profile.email')} />
<Input label={t('profile.phone')} />
<Input label={t('profile.location')} />
<Input label={t('profile.bio')} />

// Пароль
<Input label={t('profile.currentPassword')} type="password" />
<Input label={t('profile.newPassword')} type="password" />
<Input label={t('profile.confirmPassword')} type="password" />

// Кнопки
<Button>{t('profile.save')}</Button>
<Button>{t('profile.cancel')}</Button>
```

## Полезные советы

1. **Используйте fallback для новых ключей:**
   ```javascript
   t('newKey', { defaultValue: 'Значение по умолчанию' })
   ```

2. **Для множественного числа используйте интерполяцию:**
   ```javascript
   t('items.count', { count: items.length })
   ```

3. **Для динамического контента:**
   ```javascript
   t('greeting', { name: user.name })
   ```

4. **Группируйте связанные переводы:**
   ```json
   {
     "course": {
       "start": "Начать",
       "continue": "Продолжить",
       "complete": "Завершить"
     }
   }
   ```

5. **Проверяйте все три языка** после добавления новых ключей

## Чеклист для каждого компонента

- [ ] Добавлен импорт `useTranslation`
- [ ] Добавлен хук `const { t } = useTranslation()`
- [ ] Заменены все хардкодные строки
- [ ] Проверены все три языка (ru, en, ky)
- [ ] Компонент корректно работает при переключении языка
- [ ] Нет ошибок в консоли

## Приоритет обновления

### Высокий приоритет (видны всем пользователям):
1. ✅ Navbar - завершено
2. ✅ Login/Register - завершено
3. ✅ CourseCard - завершено
4. Home - частично
5. Courses
6. CourseDetail

### Средний приоритет (для авторизованных):
7. Dashboard
8. Profile
9. MyCourses
10. Orders

### Низкий приоритет:
11. AIChat
12. Lesson/CoursePlayer
13. Payments
14. About
15. Merch
16. NotFound
