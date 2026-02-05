import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, CheckCircle, Clock, BookOpen } from 'lucide-react'
import { getLesson, updateLessonProgress } from '../services/apiService'
import { getLessonById } from '../data/staticLessons'
import { useTranslation } from 'react-i18next'

export default function Lesson() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { t } = useTranslation()
  const [lesson, setLesson] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchLesson = async () => {
      try {
        // Сначала пробуем загрузить с API
        try {
          const res = await getLesson(id)
          setLesson(res.data)
        } catch (apiError) {
          console.log('API не доступен, используем статичные данные')
          
          // Используем статичные данные если API недоступен
          const staticLesson = getLessonById(id, t)
          if (staticLesson) {
            setLesson(staticLesson)
          } else {
            throw new Error(t('lesson.notFound'))
          }
        }
      } catch (err) {
        console.error(err)
        alert(t('lesson.notFound'))
        navigate('/courses')
      } finally {
        setLoading(false)
      }
    }
    
    fetchLesson()
  }, [id, navigate])

  const markAsCompleted = async () => {
    try {
      await updateLessonProgress(id, { completed: true })
      alert(t('lesson.completedAlert'))
    } catch (error) {
      console.error(error)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">⏳</div>
          <p className="text-gray-400">{t('lesson.loading')}</p>
        </div>
      </div>
    )
  }

  if (!lesson) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">❌</div>
          <p className="text-gray-400">{t('lesson.notFound')}</p>
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

  // Конвертируем YouTube Shorts URL в embed формат
  const getEmbedUrl = (url) => {
    if (!url) return url
    
    // YouTube Shorts: youtube.com/shorts/VIDEO_ID -> youtube.com/embed/VIDEO_ID
    if (url.includes('youtube.com/shorts/')) {
      const videoId = url.split('/shorts/')[1].split('?')[0]
      return `https://www.youtube.com/embed/${videoId}`
    }
    
    // YouTube обычный: youtube.com/watch?v=VIDEO_ID -> youtube.com/embed/VIDEO_ID
    if (url.includes('youtube.com/watch?v=')) {
      const videoId = url.split('watch?v=')[1].split('&')[0]
      return `https://www.youtube.com/embed/${videoId}`
    }
    
    // YouTube короткий: youtu.be/VIDEO_ID -> youtube.com/embed/VIDEO_ID
    if (url.includes('youtu.be/')) {
      const videoId = url.split('youtu.be/')[1].split('?')[0]
      return `https://www.youtube.com/embed/${videoId}`
    }
    
    return url
  }

  const embedUrl = getEmbedUrl(lesson.video_url)

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
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black py-20">
      <div className="container-custom max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {/* Breadcrumb */}
          {lesson.course && (
            <div className="mb-6">
              <Link 
                to={`/courses/${lesson.course.slug}`}
                className="inline-flex items-center gap-2 text-gray-400 hover:text-primary transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                {t('lesson.backToCourse', { title: lesson.course.title })}
              </Link>
            </div>
          )}

          {/* Video Player */}
          <div className={`bg-black rounded-2xl mb-8 overflow-hidden shadow-2xl border border-gray-800 ${getAspectRatioClass()}`}>
            {lesson.video_url ? (
              isExternalVideo ? (
                // Для внешних видео используем iframe
                <iframe
                  src={embedUrl}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title={lesson.title}
                ></iframe>
              ) : (
                // Для загруженных файлов используем video тег
                <video
                  controls
                  controlsList="nodownload"
                  className="w-full h-full object-contain bg-black"
                  preload="auto"
                  playsInline
                  autoPlay={false}
                >
                  <source src={lesson.video_url} type="video/mp4" />
                  <source src={lesson.video_url} type="video/quicktime" />
                  <p className="text-white p-8 text-center">
                    {t('lesson.videoNotSupported')}
                    <br/>
                    <a href={lesson.video_url} className="text-blue-500 underline" download>
                      {t('lesson.downloadVideo')}
                    </a>
                  </p>
                </video>
              )
            ) : (
              <div className="w-full h-full flex items-center justify-center text-6xl">
                🎥
              </div>
            )}
          </div>

          {/* Lesson Info */}
          <div className="bg-gradient-to-br from-gray-900/50 to-black border border-gray-800 rounded-2xl p-8 mb-8">
            <div className="flex items-start justify-between mb-6">
              <div className="flex-1">
                <h1 className="text-4xl font-black text-white mb-4">{lesson.title}</h1>
                <div className="flex items-center gap-6 text-gray-400">
                  <div className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-primary" />
                    <span>{t('lesson.durationMinutes', { minutes: lesson.duration_minutes })}</span>
                  </div>
                  {lesson.order && (
                    <div className="flex items-center gap-2">
                      <BookOpen className="w-5 h-5 text-blue-500" />
                      <span>{t('lesson.lessonNumber', { number: lesson.order })}</span>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Mark as Completed Button */}
              {!lesson.completed && (
                <button
                  onClick={markAsCompleted}
                  className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary to-red-600 rounded-xl text-white font-semibold hover:from-red-600 hover:to-primary transition-all duration-300"
                >
                  <CheckCircle className="w-5 h-5" />
                  {t('lesson.markComplete')}
                </button>
              )}
              
              {lesson.completed && (
                <div className="flex items-center gap-2 px-6 py-3 bg-green-600/20 border border-green-600/50 rounded-xl text-green-500 font-semibold">
                  <CheckCircle className="w-5 h-5" />
                  {t('lesson.completed')}
                </div>
              )}
            </div>
            
            {lesson.description && (
              <div className="border-t border-gray-800 pt-6">
                <h2 className="text-2xl font-bold text-white mb-4">{t('lesson.descriptionTitle')}</h2>
                <p className="text-gray-300 leading-relaxed whitespace-pre-line">
                  {lesson.description}
                </p>
              </div>
            )}

            {lesson.content && (
              <div className="border-t border-gray-800 pt-6 mt-6">
                <div 
                  className="prose prose-invert max-w-none"
                  dangerouslySetInnerHTML={{ __html: lesson.content }}
                />
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
