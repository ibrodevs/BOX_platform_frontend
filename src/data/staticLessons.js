// Статичные данные уроков с видео для демонстрации

export const staticCourses = [
  {
    id: 1,
    slug: 'boxing-fundamentals',
    title: 'Основы бокса',
    description: 'Изучите фундаментальные техники бокса от чемпиона мира',
    level: 'beginner',
    price: 9990,
    duration: '8 часов',
    studentsCount: 2843,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?q=80&w=2070',
    instructor: {
      name: 'Дмитрий Бивол',
      title: 'Абсолютный чемпион мира',
      avatar: '👑'
    },
    lessons: [
      {
        id: 1,
        title: 'Введение в бокс',
        order: 1,
        duration_minutes: 12,
        is_free: true,
        completed: false,
        video_url: 'https://youtube.com/shorts/h__6YzTTSRE?si=CDa-Mdm26svG3TLY',
        video_format: '9:16',
        description: 'Добро пожаловать в мир профессионального бокса. В этом уроке мы познакомимся с основами.',
        content: `
          <h2>Что вы узнаете в этом уроке:</h2>
          <ul>
            <li>История бокса и его философия</li>
            <li>Основные правила и этика</li>
            <li>Необходимое оборудование</li>
            <li>Как правильно начать тренировки</li>
          </ul>
        `
      },
      {
        id: 2,
        title: 'Правильная боксерская стойка',
        order: 2,
        duration_minutes: 15,
        is_free: true,
        completed: false,
        video_url: 'https://youtube.com/shorts/h__6YzTTSRE?si=CDa-Mdm26svG3TLY',
        video_format: '16:9',
        description: 'Учимся правильной базовой стойке - фундаменту всей боксерской техники.',
        content: `
          <h2>Ключевые моменты:</h2>
          <ul>
            <li>Позиция ног и распределение веса</li>
            <li>Положение рук и защита</li>
            <li>Баланс и устойчивость</li>
            <li>Частые ошибки новичков</li>
          </ul>
        `
      },
      {
        id: 3,
        title: 'Джеб - главный удар в боксе',
        order: 3,
        duration_minutes: 18,
        is_free: true,
        completed: false,
        video_url: 'https://youtube.com/shorts/h__6YzTTSRE?si=CDa-Mdm26svG3TLY',
        video_format: '9:16',
        description: 'Разбираем технику джеба - самого важного удара в арсенале боксера.',
        content: `
          <h2>Техника джеба:</h2>
          <ul>
            <li>Механика движения</li>
            <li>Работа плеча и бедра</li>
            <li>Скорость и точность</li>
            <li>Практические упражнения</li>
          </ul>
        `
      },
      {
        id: 4,
        title: 'Прямой правой (кросс)',
        order: 4,
        duration_minutes: 16,
        is_free: true,
        completed: false,
        video_url: 'https://youtube.com/shorts/h__6YzTTSRE?si=CDa-Mdm26svG3TLY',
        video_format: '16:9',
        description: 'Изучаем технику мощного прямого правого удара.',
        content: `
          <h2>Сила кросса:</h2>
          <ul>
            <li>Вращение корпуса</li>
            <li>Перенос веса тела</li>
            <li>Координация движений</li>
            <li>Комбинация с джебом</li>
          </ul>
        `
      },
      {
        id: 5,
        title: 'Передвижение по рингу',
        order: 5,
        duration_minutes: 20,
        is_free: true,
        completed: false,
        video_url: 'https://youtube.com/shorts/h__6YzTTSRE?si=CDa-Mdm26svG3TLY',
        video_format: '16:9',
        description: 'Основы footwork - как правильно двигаться в ринге.',
        content: `
          <h2>Footwork основы:</h2>
          <ul>
            <li>Базовые шаги вперед и назад</li>
            <li>Боковые передвижения</li>
            <li>Круговые движения</li>
            <li>Работа на дистанции</li>
          </ul>
        `
      }
    ]
  },
  {
    id: 2,
    slug: 'advanced-combinations',
    title: 'Продвинутые комбинации',
    description: 'Мастер-класс по составлению и отработке эффективных комбинаций ударов',
    level: 'advanced',
    price: 14990,
    duration: '12 часов',
    studentsCount: 1247,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?q=80&w=2070',
    instructor: {
      name: 'Дмитрий Бивол',
      title: 'Абсолютный чемпион мира',
      avatar: '👑'
    },
    lessons: [
      {
        id: 11,
        title: 'Базовые двухударные комбинации',
        order: 1,
        duration_minutes: 22,
        is_free: true,
        completed: false,
        video_url: 'https://youtube.com/shorts/h__6YzTTSRE?si=CDa-Mdm26svG3TLY',
        video_format: '16:9',
        description: 'Изучаем классические комбинации из двух ударов.',
        content: `
          <h2>Двухударные комбинации:</h2>
          <ul>
            <li>Джеб + Кросс</li>
            <li>Джеб + Хук</li>
            <li>Кросс + Хук</li>
            <li>Timing и ритм</li>
          </ul>
        `
      },
      {
        id: 12,
        title: 'Трехударные серии',
        order: 2,
        duration_minutes: 25,
        is_free: true,
        completed: false,
        video_url: 'https://youtube.com/shorts/h__6YzTTSRE?si=CDa-Mdm26svG3TLY',
        video_format: '16:9',
        description: 'Продвинутые трехударные комбинации для максимальной эффективности.',
        content: `
          <h2>Серии из трех ударов:</h2>
          <ul>
            <li>1-2-3 комбинация</li>
            <li>Хуки в корпус и голову</li>
            <li>Смена уровней</li>
            <li>Скорость выполнения</li>
          </ul>
        `
      },
      {
        id: 13,
        title: 'Комбинации с защитой',
        order: 3,
        duration_minutes: 28,
        is_free: true,
        completed: false,
        video_url: 'https://youtube.com/shorts/h__6YzTTSRE?si=CDa-Mdm26svG3TLY',
        video_format: '16:9',
        description: 'Учимся комбинировать атаку с защитными действиями.',
        content: `
          <h2>Атака + Защита:</h2>
          <ul>
            <li>Удар с уклоном</li>
            <li>Блок и контратака</li>
            <li>Slip и комбинация</li>
            <li>Работа под давлением</li>
          </ul>
        `
      }
    ]
  },
  {
    id: 3,
    slug: 'defense-mastery',
    title: 'Мастерство защиты',
    description: 'Комплексный курс по защитным техникам и контратакам',
    level: 'intermediate',
    price: 12990,
    duration: '10 часов',
    studentsCount: 1853,
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?q=80&w=2070',
    instructor: {
      name: 'Дмитрий Бивол',
      title: 'Абсолютный чемпион мира',
      avatar: '👑'
    },
    lessons: [
      {
        id: 21,
        title: 'Основы блокировки',
        order: 1,
        duration_minutes: 18,
        is_free: true,
        completed: false,
        video_url: 'https://youtube.com/shorts/h__6YzTTSRE?si=CDa-Mdm26svG3TLY',
        video_format: '16:9',
        description: 'Изучаем различные виды блоков и их применение.',
        content: `
          <h2>Виды блоков:</h2>
          <ul>
            <li>Высокая защита</li>
            <li>Блоки руками</li>
            <li>Защита корпуса</li>
            <li>Когда использовать каждый тип</li>
          </ul>
        `
      },
      {
        id: 22,
        title: 'Техника уклонений (слипы)',
        order: 2,
        duration_minutes: 21,
        is_free: true,
        completed: false,
        video_url: 'https://youtube.com/shorts/h__6YzTTSRE?si=CDa-Mdm26svG3TLY',
        video_format: '16:9',
        description: 'Мастерим уклонения - самый эффективный вид защиты.',
        content: `
          <h2>Slip техника:</h2>
          <ul>
            <li>Движение головы</li>
            <li>Работа ног и корпуса</li>
            <li>Timing и дистанция</li>
            <li>Контратака после уклона</li>
          </ul>
        `
      },
      {
        id: 23,
        title: 'Нырки и уходы',
        order: 3,
        duration_minutes: 24,
        is_free: true,
        completed: false,
        video_url: 'https://youtube.com/shorts/h__6YzTTSRE?si=CDa-Mdm26svG3TLY',
        video_format: '16:9',
        description: 'Учимся нырять под удары и использовать это для атаки.',
        content: `
          <h2>Duck и Bob техника:</h2>
          <ul>
            <li>Нырки под хуки</li>
            <li>Движение корпуса</li>
            <li>Выход в позицию атаки</li>
            <li>Связка с ударами в корпус</li>
          </ul>
        `
      }
    ]
  }
]

// Функция для получения курса по slug
export function getCourseBySlug(slug) {
  return staticCourses.find(course => course.slug === slug)
}

// Функция для получения урока по ID
export function getLessonById(lessonId) {
  for (const course of staticCourses) {
    const lesson = course.lessons.find(l => l.id === parseInt(lessonId))
    if (lesson) {
      return { ...lesson, course: { id: course.id, title: course.title, slug: course.slug } }
    }
  }
  return null
}

// Функция для получения всех курсов
export function getAllCourses() {
  return staticCourses
}

// Функция для получения уроков курса
export function getCourseLessons(courseId) {
  const course = staticCourses.find(c => c.id === courseId)
  return course ? course.lessons : []
}
