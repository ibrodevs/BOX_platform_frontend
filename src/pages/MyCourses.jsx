import { useState, useEffect } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { getMyCourses } from '../services/apiService'
import { useAuthStore } from '../store/authStore'
import CourseCard from '../components/CourseCard'

// Демо данные для незарегистрированных/новых пользователей
const mockMyCourses = [
  {
    id: 1,
    title: 'Основы бокса для начинающих',
    description: 'Изучите базовые техники бокса',
    level: 'beginner',
    price: 2990,
    total_lessons: 12,
    completed_lessons: 3,
    thumbnail: null,
    slug: 'basics-for-beginners'
  }
]

export default function MyCourses() {
  const { isAuthenticated } = useAuthStore()
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (isAuthenticated) {
      getMyCourses()
        .then(res => {
          const coursesData = res?.data?.results || res?.data || []
          const coursesArray = Array.isArray(coursesData) ? coursesData : []
          
          if (coursesArray.length > 0) {
            setCourses(coursesArray)
          } else {
            // Если нет купленных курсов, показываем демо
            setCourses(mockMyCourses)
          }
          setLoading(false)
        })
        .catch(err => {
          console.error(err)
          // При ошибке показываем демо
          setCourses(mockMyCourses)
          setLoading(false)
        })
    }
  }, [isAuthenticated])

  if (!isAuthenticated) {
    return <Navigate to="/login" />
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">⏳</div>
          <p className="text-gray-400">Загрузка...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="py-20">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="text-5xl md:text-7xl font-black mb-6">
            МОИ <span className="text-primary">КУРСЫ</span>
          </h1>
          <p className="text-xl text-gray-400">
            Курсы, которые вы приобрели
          </p>
        </motion.div>

        {courses.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <div className="text-6xl mb-4">📚</div>
            <p className="text-gray-400 mb-6 text-xl">
              У вас пока нет купленных курсов
            </p>
            <Link to="/courses" className="btn-primary">
              Перейти к каталогу
            </Link>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {courses.map((course, idx) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
              >
                <CourseCard course={course} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  )
}
