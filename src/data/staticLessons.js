import i18n from '../i18n/config'

// Статичные данные уроков с видео для демонстрации

export const staticCourses = [
  {
    id: 1,
    slug: 'boxing-fundamentals',
    i18nKey: 'staticCourses.boxingFundamentals',
    level: 'beginner',
    price: 0,
    isFree: true,
    studentsCount: 2843,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?q=80&w=2070',
    instructor: {
      avatar: null
    },
    lessons: [
      {
        id: 1,
        order: 1,
        duration_minutes: 12,
        is_free: true,
        completed: false,
        video_url: '/IMG_2080.MOV',
        video_format: '9:16'
      },
      {
        id: 2,
        order: 2,
        duration_minutes: 15,
        is_free: true,
        completed: false,
        video_url: '/IMG_2081.MOV',
        video_format: '16:9'
      },
      {
        id: 3,
        order: 3,
        duration_minutes: 18,
        is_free: true,
        completed: false,
        video_url: '/IMG_2084.MOV',
        video_format: '9:16'
      },
      {
        id: 4,
        order: 4,
        duration_minutes: 16,
        is_free: true,
        completed: false,
        video_url: '/IMG_2085.MOV',
        video_format: '16:9'
      },
      {
        id: 5,
        order: 5,
        duration_minutes: 20,
        is_free: true,
        completed: false,
        video_url: '/IMG_2080.MOV',
        video_format: '16:9'
      }
    ]
  },
  {
    id: 2,
    slug: 'advanced-combinations',
    i18nKey: 'staticCourses.advancedCombinations',
    level: 'advanced',
    price: 0,
    isFree: true,
    studentsCount: 1247,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?q=80&w=2070',
    instructor: {
      avatar: null
    },
    lessons: [
      {
        id: 11,
        order: 1,
        duration_minutes: 22,
        is_free: true,
        completed: false,
        video_url: '/IMG_2081.MOV',
        video_format: '16:9'
      },
      {
        id: 12,
        order: 2,
        duration_minutes: 25,
        is_free: true,
        completed: false,
        video_url: '/IMG_2084.MOV',
        video_format: '16:9'
      },
      {
        id: 13,
        order: 3,
        duration_minutes: 28,
        is_free: true,
        completed: false,
        video_url: '/IMG_2085.MOV',
        video_format: '16:9'
      }
    ]
  },
  {
    id: 3,
    slug: 'defense-mastery',
    i18nKey: 'staticCourses.defenseMastery',
    level: 'intermediate',
    price: 0,
    isFree: true,
    studentsCount: 1853,
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?q=80&w=2070',
    instructor: {
      avatar: null
    },
    lessons: [
      {
        id: 21,
        order: 1,
        duration_minutes: 18,
        is_free: true,
        completed: false,
        video_url: '/IMG_2080.MOV',
        video_format: '16:9'
      },
      {
        id: 22,
        order: 2,
        duration_minutes: 21,
        is_free: true,
        completed: false,
        video_url: '/IMG_2081.MOV',
        video_format: '16:9'
      },
      {
        id: 23,
        order: 3,
        duration_minutes: 24,
        is_free: true,
        completed: false,
        video_url: '/IMG_2084.MOV',
        video_format: '16:9'
      }
    ]
  }
]

const translateWith = (t, key, options) => (t ? t(key, options) : i18n.t(key, options))

const localizeLesson = (lesson, lessonKey, t) => ({
  ...lesson,
  title: translateWith(t, `${lessonKey}.title`),
  description: translateWith(t, `${lessonKey}.description`),
  content: translateWith(t, `${lessonKey}.content`)
})

const localizeCourse = (course, t) => {
  const baseKey = course.i18nKey
  const localizedLessons = course.lessons.map(lesson =>
    localizeLesson(lesson, `${baseKey}.lessons.${lesson.id}`, t)
  )

  return {
    ...course,
    title: translateWith(t, `${baseKey}.title`),
    description: translateWith(t, `${baseKey}.description`),
    duration: translateWith(t, `${baseKey}.duration`),
    instructor: {
      ...course.instructor,
      name: translateWith(t, `${baseKey}.instructor.name`),
      title: translateWith(t, `${baseKey}.instructor.title`)
    },
    lessons: localizedLessons
  }
}

// Функция для получения курса по slug
export function getCourseBySlug(slug, t) {
  const course = staticCourses.find(course => course.slug === slug)
  return course ? localizeCourse(course, t) : null
}

// Функция для получения урока по ID
export function getLessonById(lessonId, t) {
  for (const course of staticCourses) {
    const lesson = course.lessons.find(l => l.id === parseInt(lessonId))
    if (lesson) {
      const courseTitle = translateWith(t, `${course.i18nKey}.title`)
      const localizedLesson = localizeLesson(
        lesson,
        `${course.i18nKey}.lessons.${lesson.id}`,
        t
      )

      return { ...localizedLesson, course: { id: course.id, title: courseTitle, slug: course.slug } }
    }
  }
  return null
}

// Функция для получения всех курсов
export function getAllCourses(t) {
  return staticCourses.map(course => localizeCourse(course, t))
}

// Функция для получения уроков курса
export function getCourseLessons(courseId, t) {
  const course = staticCourses.find(c => c.id === courseId)
  return course ? localizeCourse(course, t).lessons : []
}
