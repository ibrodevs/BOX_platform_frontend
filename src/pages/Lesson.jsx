import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { getLesson, updateLessonProgress } from '../services/apiService'

export default function Lesson() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [lesson, setLesson] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getLesson(id)
      .then(res => {
        setLesson(res.data)
        setLoading(false)
      })
      .catch(err => {
        console.error(err)
        if (err.response?.status === 403) {
          alert('У вас нет доступа к этому уроку. Купите курс.')
          navigate('/courses')
        }
        setLoading(false)
      })
  }, [id, navigate])

  const markAsCompleted = async () => {
    try {
      await updateLessonProgress(id, { completed: true })
      alert('✅ Урок отмечен как пройденный!')
    } catch (error) {
      console.error(error)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">⏳</div>
          <p className="text-gray-400">Загрузка урока...</p>
        </div>
      </div>
    )
  }

  if (!lesson) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">❌</div>
          <p className="text-gray-400">Урок не найден</p>
        </div>
      </div>
    )
  }

  // Определяем, является ли видео внешним URL (YouTube, Vimeo и т.д.) или загруженным файлом
  const isExternalVideo = lesson.video_url && (
    lesson.video_url.includes('youtube.com') ||
    lesson.video_url.includes('youtu.be') ||
    lesson.video_url.includes('vimeo.com') ||
    lesson.video_url.includes('rutube.ru')
  )

  // Получаем класс для aspect ratio
  const getAspectRatioClass = () => {
    if (!lesson.video_format) return 'aspect-video'
    
    switch(lesson.video_format) {
      case '9:16':
        return 'aspect-[9/16] max-w-md mx-auto'
      case '1:1':
        return 'aspect-square max-w-2xl mx-auto'
      case '16:9':
      default:
        return 'aspect-video'
    }
  }

  return (
    <div className="py-20">
      <div className="container-custom max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {/* Video Player */}
          <div className={`bg-gray-900 rounded-lg mb-8 overflow-hidden ${getAspectRatioClass()}`}>
            {lesson.video_url ? (
              isExternalVideo ? (
                // Для внешних видео используем iframe
                <iframe
                  src={lesson.video_url}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              ) : (
                // Для загруженных файлов используем video тег
                <video
                  src={lesson.video_url}
                  controls
                  className="w-full h-full object-contain"
                  preload="metadata"
                >
                  Ваш браузер не поддерживает воспроизведение видео.
                </video>
              )
            ) : (
              <div className="w-full h-full flex items-center justify-center text-6xl">
                🎥
              </div>
            )}
          </div>

          {/* Lesson Info */}
          <div className="mb-8">
            <h1 className="text-4xl font-black mb-4">{lesson.title}</h1>
            <div className="flex items-center gap-4 text-gray-400 mb-6">
              <span>⏱️ {lesson.duration_minutes} минут</span>
            </div>
            
            {lesson.description && (
              <div className="bg-dark p-6 rounded-lg mb-6">
                <h2 className="text-xl font-bold mb-4">Описание урока</h2>
                <p className="text-gray-300 leading-relaxed whitespace-pre-line">
                  {lesson.description}
                </p>
              </div>
            )}

            {/* Actions */}
            <div className="flex gap-4">
              <button
                onClick={markAsCompleted}
                className="btn-primary"
              >
                ✅ Отметить как пройденный
              </button>
              <button
                onClick={() => navigate(-1)}
                className="btn-secondary"
              >
                ← Назад к курсу
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
