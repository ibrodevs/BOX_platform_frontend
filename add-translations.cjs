#!/usr/bin/env node

/**
 * Utility script для добавления недостающих ключей переводов
 * Использование: node add-translations.js
 */

const fs = require('fs');
const path = require('path');

// Дополнительные переводы для разных компонентов
const additionalTranslations = {
  ru: {
    // Дополнительные ключи для компонентов, которые еще не переведены
    lesson: {
      completed: "Завершено",
      inProgress: "В процессе",
      locked: "Заблокировано",
      startLesson: "Начать урок",
      continueLesson: "Продолжить урок",
      nextLesson: "Следующий урок",
      previousLesson: "Предыдущий урок",
      videoNotAvailable: "Видео недоступно",
      downloadMaterials: "Скачать материалы",
      markComplete: "Отметить как завершенное"
    },
    coursePlayer: {
      overview: "Обзор",
      lessons: "Уроки",
      resources: "Ресурсы",
      progress: "Прогресс",
      certificate: "Сертификат",
      shareProgress: "Поделиться прогрессом"
    },
    merch: {
      size: "Размер",
      color: "Цвет",
      quantity: "Количество",
      selectSize: "Выберите размер",
      selectColor: "Выберите цвет"
    },
    orders: {
      orderNumber: "Номер заказа",
      orderDate: "Дата заказа",
      orderStatus: "Статус заказа",
      totalAmount: "Общая сумма",
      viewDetails: "Посмотреть детали",
      trackOrder: "Отследить заказ",
      cancelOrder: "Отменить заказ",
      pending: "Ожидает",
      processing: "Обрабатывается",
      shipped: "Отправлено",
      delivered: "Доставлено",
      cancelled: "Отменено"
    },
    aiChat: {
      title: "AI Тренер",
      placeholder: "Задайте вопрос...",
      send: "Отправить",
      typing: "Печатает...",
      clearChat: "Очистить чат",
      suggestions: "Предложения",
      askQuestion: "Задать вопрос"
    },
    notFound: {
      title: "404 - Страница не найдена",
      subtitle: "Упс! Страница, которую вы ищете, не существует.",
      goHome: "Вернуться на главную"
    }
  },
  en: {
    lesson: {
      completed: "Completed",
      inProgress: "In Progress",
      locked: "Locked",
      startLesson: "Start Lesson",
      continueLesson: "Continue Lesson",
      nextLesson: "Next Lesson",
      previousLesson: "Previous Lesson",
      videoNotAvailable: "Video Unavailable",
      downloadMaterials: "Download Materials",
      markComplete: "Mark as Complete"
    },
    coursePlayer: {
      overview: "Overview",
      lessons: "Lessons",
      resources: "Resources",
      progress: "Progress",
      certificate: "Certificate",
      shareProgress: "Share Progress"
    },
    merch: {
      size: "Size",
      color: "Color",
      quantity: "Quantity",
      selectSize: "Select Size",
      selectColor: "Select Color"
    },
    orders: {
      orderNumber: "Order Number",
      orderDate: "Order Date",
      orderStatus: "Order Status",
      totalAmount: "Total Amount",
      viewDetails: "View Details",
      trackOrder: "Track Order",
      cancelOrder: "Cancel Order",
      pending: "Pending",
      processing: "Processing",
      shipped: "Shipped",
      delivered: "Delivered",
      cancelled: "Cancelled"
    },
    aiChat: {
      title: "AI Coach",
      placeholder: "Ask a question...",
      send: "Send",
      typing: "Typing...",
      clearChat: "Clear Chat",
      suggestions: "Suggestions",
      askQuestion: "Ask Question"
    },
    notFound: {
      title: "404 - Page Not Found",
      subtitle: "Oops! The page you're looking for doesn't exist.",
      goHome: "Go Home"
    }
  },
  ky: {
    lesson: {
      completed: "Аяктаган",
      inProgress: "Процесстe",
      locked: "Кулпуланган",
      startLesson: "Сабакты баштоо",
      continueLesson: "Сабакты улантуу",
      nextLesson: "Кийинки сабак",
      previousLesson: "Мурунку сабак",
      videoNotAvailable: "Видео жеткиликсиз",
      downloadMaterials: "Материалдарды жүктөп алуу",
      markComplete: "Аяктаган деп белгилөө"
    },
    coursePlayer: {
      overview: "Көз карашы",
      lessons: "Сабактар",
      resources: "Ресурстар",
      progress: "Прогресс",
      certificate: "Сертификат",
      shareProgress: "Прогрессти бөлүшүү"
    },
    merch: {
      size: "Өлчөмү",
      color: "Түсү",
      quantity: "Саны",
      selectSize: "Өлчөмдү тандаңыз",
      selectColor: "Түстү тандаңыз"
    },
    orders: {
      orderNumber: "Заказ номери",
      orderDate: "Заказ датасы",
      orderStatus: "Заказ статусу",
      totalAmount: "Жалпы сумма",
      viewDetails: "Деталдарды көрүү",
      trackOrder: "Заказды көзөмөлдөө",
      cancelOrder: "Заказды жокко чыгаруу",
      pending: "Күтүүдө",
      processing: "Иштетилүүдө",
      shipped: "Жөнөтүлдү",
      delivered: "Жеткирилди",
      cancelled: "Жокко чыгарылды"
    },
    aiChat: {
      title: "AI Машыктыргыч",
      placeholder: "Суроо бериңиз...",
      send: "Жөнөтүү",
      typing: "Жазууда...",
      clearChat: "Чатты тазалоо",
      suggestions: "Сунуштар",
      askQuestion: "Суроо берүү"
    },
    notFound: {
      title: "404 - Бет табылган жок",
      subtitle: "Упс! Сиз издеген бет жок.",
      goHome: "Башкы бетке кайтуу"
    }
  }
};

// Функция для объединения переводов
function mergeTranslations() {
  const localesDir = path.join(__dirname, 'src', 'i18n', 'locales');
  
  ['ru', 'en', 'ky'].forEach(lang => {
    const filePath = path.join(localesDir, `${lang}.json`);
    
    // Читаем существующие переводы
    const existing = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    
    // Объединяем с новыми
    const merged = {
      ...existing,
      ...additionalTranslations[lang],
      // Сохраняем существующие ключи
      nav: existing.nav,
      user: existing.user,
      home: existing.home,
      about: existing.about,
      courses: existing.courses,
      courseDetail: existing.courseDetail,
      dashboard: existing.dashboard,
      profile: existing.profile,
      cart: existing.cart,
      shop: existing.shop,
      payments: existing.payments,
      auth: existing.auth,
      common: existing.common,
      errors: existing.errors
    };
    
    // Записываем обратно
    fs.writeFileSync(filePath, JSON.stringify(merged, null, 2), 'utf8');
    console.log(`✅ Обновлен ${lang}.json`);
  });
}

console.log('🚀 Добавление недостающих переводов...');
mergeTranslations();
console.log('✨ Готово!');
