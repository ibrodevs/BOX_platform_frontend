import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ChevronLeft, ChevronRight, Download, MessageCircle, Star } from 'lucide-react'
import axios from 'axios'
import Loader from '../components/ui/Loader'
import LessonSidebar from '../components/courses/LessonSidebar'
import VideoPlayer from '../components/courses/VideoPlayer'
import AIChat from '../components/AIChat'

const API_URL = 'http://127.0.0.1:8000/api'

export default function CoursePlayer() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [course, setCourse] = useState(null)
  const [currentLesson, setCurrentLesson] = useState(null)
  const [userProgress, setUserProgress] = useState([])
  const [showChat, setShowChat] = useState(false)

  useEffect(() => {
    fetchCourseData()
  }, [id])

  const fetchCourseData = async () => {
    try {
      const token = localStorage.getItem('access_token')
      const response = await axios.get(`${API_URL}/courses/${id}/`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      
      const courseData = response.data

      // Проверка доступа
      if (!courseData.is_purchased) {
        navigate(`/courses/${id}`)
        return
      }

      setCourse(courseData)
      setUserProgress(courseData.user_progress || [])
      
      // Устанавливаем первый урок
      if (courseData.lessons && courseData.lessons.length > 0) {
        setCurrentLesson(courseData.lessons[0])
      }
    } catch (error) {
      console.error('Failed to fetch course:', error)
      navigate('/dashboard/my-courses')
    } finally {
      setLoading(false)
    }
  }

  const updateLessonProgress = async (lessonId, data) => {
    try {
      const token = localStorage.getItem('access_token')
      await axios.post(
        `${API_URL}/courses/lessons/${lessonId}/progress/`,
        data,
        { headers: { Authorization: `Bearer ${token}` } }
      )
      // Обновляем локальный прогресс
      fetchCourseData()
    } catch (error) {
      console.error('Failed to update progress:', error)
    }
  }

  const handleLessonComplete = () => {
    if (currentLesson) {
      updateLessonProgress(currentLesson.id, {
        completed: true,
        watch_time_seconds: currentLesson.duration_minutes * 60
      })
    }
  }

  const handleTimeUpdate = (time) => {
    if (currentLesson) {
      // Сохраняем позицию каждые 10 секунд
      if (Math.floor(time) % 10 === 0) {
        updateLessonProgress(currentLesson.id, {
          last_position_seconds: Math.floor(time),
          watch_time_seconds: Math.floor(time)
        })
      }
    }
  }

  const goToNextLesson = () => {
    if (!course || !currentLesson) return
    const currentIndex = course.lessons.findIndex(l => l.id === currentLesson.id)
    if (currentIndex < course.lessons.length - 1) {
      setCurrentLesson(course.lessons[currentIndex + 1])
    }
  }

  const goToPreviousLesson = () => {
    if (!course || !currentLesson) return
    const currentIndex = course.lessons.findIndex(l => l.id === currentLesson.id)
    if (currentIndex > 0) {
      setCurrentLesson(course.lessons[currentIndex - 1])
    }
  }

  if (loading) {
    return <Loader fullScreen />
  }

  if (!course || !currentLesson) {
    return null
  }

  const currentIndex = course.lessons.findIndex(l => l.id === currentLesson.id)
  const hasPrevious = currentIndex > 0
  const hasNext = currentIndex < course.lessons.length - 1

  return (
    <div className="min-h-screen bg-black pt-16">
      {/* Прогресс-бар курса сверху */}
      <div className="fixed top-16 left-0 right-0 h-1 bg-gray-900 z-40">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${course.user_progress?.percentage || 0}%` }}
          className="h-full bg-red-600"
        />
      </div>

      <div className="flex h-[calc(100vh-4rem)]">
        {/* Сайдбар с уроками */}
        <div className="w-96 border-r border-gray-800 overflow-hidden">
          <LessonSidebar
            lessons={course.lessons}
            currentLesson={currentLesson}
            onLessonSelect={setCurrentLesson}
            userProgress={userProgress}
            hasCourseAccess={course.is_purchased}
          />
        </div>

        {/* Основной контент */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Видео плеер */}
          <div className="bg-black">
            <VideoPlayer
              videoUrl={currentLesson.video_url}
              timestamps={currentLesson.timestamps}
              videoFormat={currentLesson.video_format || '16:9'}
              onTimeUpdate={handleTimeUpdate}
              onComplete={handleLessonComplete}
              initialTime={currentLesson.progress?.last_position_seconds || 0}
            />
          </div>

          {/* Контент урока */}
          <div className="flex-1 overflow-y-auto bg-gray-900">
            <div className="max-w-4xl mx-auto p-8">
              {/* Заголовок урока */}
              <div className="mb-8">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-sm text-gray-400">
                    Урок {currentLesson.order_index + 1} из {course.lessons.length}
                  </span>
                  {currentLesson.progress?.completed && (
                    <span className="flex items-center gap-1 text-sm text-green-500">
                      <Star className="w-4 h-4 fill-current" />
                      Завершено
                    </span>
                  )}
                </div>
                <h1 className="text-3xl font-bold text-white mb-4">
                  {currentLesson.title}
                </h1>
              </div>

              {/* Описание урока */}
              {currentLesson.text_content && (
                <div className="mb-8">
                  <h2 className="text-xl font-semibold text-white mb-4">О чём этот урок</h2>
                  <div className="prose prose-invert max-w-none">
                    <p className="text-gray-300 leading-relaxed whitespace-pre-wrap">
                      {currentLesson.text_content}
                    </p>
                  </div>
                </div>
              )}

              {/* Ресурсы для скачивания */}
              {currentLesson.resources && currentLesson.resources.length > 0 && (
                <div className="mb-8">
                  <h2 className="text-xl font-semibold text-white mb-4">Материалы урока</h2>
                  <div className="space-y-3">
                    {currentLesson.resources.map((resource, index) => (
                      <a
                        key={index}
                        href={resource.url}
                        download
                        className="flex items-center gap-3 p-4 bg-gray-800 rounded-lg hover:bg-gray-700 transition"
                      >
                        <Download className="w-5 h-5 text-red-500" />
                        <div className="flex-1">
                          <p className="text-white font-medium">{resource.name}</p>
                          <p className="text-sm text-gray-400">{resource.type.toUpperCase()}</p>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              )}

              {/* Навигация между уроками */}
              <div className="flex items-center justify-between pt-8 border-t border-gray-800">
                <button
                  onClick={goToPreviousLesson}
                  disabled={!hasPrevious}
                  className={`
                    flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition
                    ${hasPrevious 
                      ? 'bg-gray-800 text-white hover:bg-gray-700' 
                      : 'bg-gray-800/50 text-gray-600 cursor-not-allowed'
                    }
                  `}
                >
                  <ChevronLeft className="w-5 h-5" />
                  Предыдущий урок
                </button>

                <button
                  onClick={goToNextLesson}
                  disabled={!hasNext}
                  className={`
                    flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition
                    ${hasNext 
                      ? 'bg-red-600 text-white hover:bg-red-700' 
                      : 'bg-gray-800/50 text-gray-600 cursor-not-allowed'
                    }
                  `}
                >
                  Следующий урок
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* AI Chat Widget */}
      <button
        onClick={() => setShowChat(!showChat)}
        className="fixed bottom-8 right-8 w-14 h-14 bg-red-600 rounded-full flex items-center justify-center shadow-lg hover:bg-red-700 transition z-50"
      >
        <MessageCircle className="w-6 h-6 text-white" />
      </button>

      <AnimatePresence>
        {showChat && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-24 right-8 w-96 h-[500px] z-50"
          >
            <AIChat onClose={() => setShowChat(false)} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
