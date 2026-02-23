import { useState, useEffect } from 'react'
import { useRef } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  ArrowLeft, CheckCircle, Clock, BookOpen, 
  ChevronRight, ChevronLeft, Download, Target,
  Award, Star, Trophy, Sparkles, Lock, Check,
  Home, Swords, Dumbbell, GraduationCap,
  Play, Pause, Volume2, VolumeX, Maximize2, Minimize2,
  Youtube, Film, Info
} from 'lucide-react'
import { getLesson, updateLessonProgress } from '../services/apiService'
import { getLessonById } from '../data/staticLessons'
import { useTranslation } from 'react-i18next'

// Конфигурация страниц обучения с YouTube видео
const LEARNING_PAGES = [
  {
    id: 1,
    title: 'Основы бокса',
    description: 'Изучите базовую стойку, передвижения и дыхание',
    icon: Home,
    color: 'from-blue-500 to-blue-600',
    videoUrl: 'https://www.youtube.com/embed/h__6YzTTSRE',
    videoTitle: 'Основы бокса для начинающих',
    content: {
      title: 'Боксерская стойка',
      sections: [
        {
          title: 'Позиция ног',
          items: [
            'Ноги на ширине плеч',
            'Вес равномерно распределен',
            'Левая нога чуть впереди (для правшей)',
            'Колени слегка согнуты'
          ]
        },
        {
          title: 'Позиция корпуса',
          items: [
            'Подбородок опущен к груди',
            'Плечи расслаблены',
            'Корпус слегка развернут',
            'Локти прикрывают корпус'
          ]
        },
        {
          title: 'Позиция рук',
          items: [
            'Кулаки у подбородка',
            'Левая рука чуть выдвинута',
            'Правая рука защищает подбородок',
            'Локти прижаты к корпусу'
          ]
        }
      ]
    }
  },
  {
    id: 2,
    title: 'Ударная техника',
    description: 'Джебы, кроссы, хуки и апперкоты',
    icon: Target,
    color: 'from-red-500 to-red-600',
    videoUrl: 'https://www.youtube.com/embed/7TzJp-SNRR4',
    videoTitle: 'Техника ударов в боксе',
    content: {
      title: 'Основные удары',
      sections: [
        {
          title: 'Джеб (передней рукой)',
          items: [
            'Резкое движение передней руки',
            'Вращение кулака в последний момент',
            'Быстрое возвращение в защиту',
            'Контроль дистанции'
          ]
        },
        {
          title: 'Кросс (задней рукой)',
          items: [
            'Вращение корпуса и бедра',
            'Перенос веса на переднюю ногу',
            'Удар идет через плечо',
            'Максимальная сила'
          ]
        },
        {
          title: 'Хук (боковой удар)',
          items: [
            'Вращение корпуса',
            'Локоть под 90 градусов',
            'Удар по дуге',
            'Цель - боковая часть головы или корпус'
          ]
        }
      ]
    }
  },
  {
    id: 3,
    title: 'Защита и контратаки',
    description: 'Блоки, уклоны, нырки и ответные удары',
    icon: Swords,
    color: 'from-purple-500 to-purple-600',
    videoUrl: 'https://www.youtube.com/embed/8q8Jp1wYh5Y',
    videoTitle: 'Защита в боксе',
    content: {
      title: 'Элементы защиты',
      sections: [
        {
          title: 'Блоки',
          items: [
            'Блок перчаткой',
            'Блок предплечьем',
            'Блок плечом',
            'Подставка'
          ]
        },
        {
          title: 'Уклоны и нырки',
          items: [
            'Уклон влево',
            'Уклон вправо',
            'Нырок под руку',
            'Уход с линии атаки'
          ]
        },
        {
          title: 'Контратаки',
          items: [
            'Встречный джеб',
            'Двойка после блока',
            'Контрудар после уклона',
            'Серия после защиты'
          ]
        }
      ]
    }
  },
  {
    id: 4,
    title: 'Комбинации и тактика',
    description: 'Связки ударов и тактические схемы',
    icon: GraduationCap,
    color: 'from-yellow-500 to-yellow-600',
    videoUrl: 'https://www.youtube.com/embed/3tLJ9Ys9p3o',
    videoTitle: 'Боксерские комбинации',
    content: {
      title: 'Боевые комбинации',
      sections: [
        {
          title: 'Двухударные комбинации',
          items: [
            'Джеб + Кросс',
            'Джеб + Хук',
            'Кросс + Хук',
            'Хук + Апперкот'
          ]
        },
        {
          title: 'Трехударные комбинации',
          items: [
            'Джеб + Кросс + Хук',
            'Джеб + Хук + Кросс',
            'Хук + Кросс + Хук',
            'Джеб + Джеб + Кросс'
          ]
        },
        {
          title: 'Тактика боя',
          items: [
            'Работа на дальней дистанции',
            'Работа на средней дистанции',
            'Работа в клинче',
            'Прессинг и контратаки'
          ]
        }
      ]
    }
  },
  {
    id: 5,
    title: 'Спарринг и психология',
    description: 'Работа в спарринге и ментальная подготовка',
    icon: Dumbbell,
    color: 'from-green-500 to-green-600',
    videoUrl: 'https://www.youtube.com/embed/l9M_x-1uJxY',
    videoTitle: 'Спарринг в боксе',
    content: {
      title: 'Подготовка к спаррингу',
      sections: [
        {
          title: 'Виды спарринга',
          items: [
            'Условный спарринг (легкий контакт)',
            'Вольный спарринг (средний контакт)',
            'Соревновательный спарринг',
            'Работа с тенью'
          ]
        },
        {
          title: 'Психологическая подготовка',
          items: [
            'Концентрация перед боем',
            'Контроль эмоций',
            'Визуализация успеха',
            'Настрой на победу'
          ]
        },
        {
          title: 'Правила спарринга',
          items: [
            'Уважение к партнеру',
            'Контроль силы ударов',
            'Защита обязательна',
            'Работа в своем темпе'
          ]
        }
      ]
    }
  }
]

export default function Lesson() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { t } = useTranslation()
  
  const [lesson, setLesson] = useState(null)
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [completedPages, setCompletedPages] = useState([])
  const [showPageComplete, setShowPageComplete] = useState(false)
  const [selectedVideo, setSelectedVideo] = useState(null)
  const [showVideoModal, setShowVideoModal] = useState(false)
  const [showVideoInfo, setShowVideoInfo] = useState({})
  
  const videoRef = useRef(null)
  const modalRef = useRef(null)

  useEffect(() => {
    const fetchLesson = async () => {
      try {
        try {
          const res = await getLesson(id)
          setLesson(res.data)
          loadPageProgress()
        } catch (apiError) {
          console.log('API не доступен, используем статичные данные')
          const staticLesson = getLessonById(id, t)
          if (staticLesson) {
            setLesson(staticLesson)
            loadLocalProgress()
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

  const loadPageProgress = async () => {
    try {
      const saved = localStorage.getItem(`lesson-${id}-pages`)
      if (saved) {
        setCompletedPages(JSON.parse(saved))
      }
    } catch (error) {
      console.error('Failed to load page progress:', error)
    }
  }

  const loadLocalProgress = () => {
    const saved = localStorage.getItem(`lesson-${id}-pages`)
    if (saved) {
      setCompletedPages(JSON.parse(saved))
    }
  }

  const markPageAsCompleted = (pageId) => {
    if (!completedPages.includes(pageId)) {
      const newCompleted = [...completedPages, pageId]
      setCompletedPages(newCompleted)
      
      localStorage.setItem(`lesson-${id}-pages`, JSON.stringify(newCompleted))
      
      setShowPageComplete(true)
      setTimeout(() => setShowPageComplete(false), 3000)
      
      if (newCompleted.length === 5) {
        markLessonAsCompleted()
      }
    }
  }

  const markLessonAsCompleted = async () => {
    try {
      await updateLessonProgress(id, { completed: true })
      alert(t('lesson.completedAlert'))
    } catch (error) {
      console.error(error)
    }
  }

  const markAsCompleted = async () => {
    try {
      await updateLessonProgress(id, { completed: true })
      alert(t('lesson.completedAlert'))
    } catch (error) {
      console.error(error)
    }
  }

  const goToNextPage = () => {
    if (currentPage < 5) {
      setCurrentPage(currentPage + 1)
    }
  }

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  const isPageCompleted = (pageId) => completedPages.includes(pageId)
  
  // Свободная навигация - все страницы доступны
  const isPageLocked = (pageId) => false // Все страницы открыты

  const openVideo = (pageData) => {
    setSelectedVideo(pageData)
    setShowVideoModal(true)
  }

  const closeVideo = () => {
    setShowVideoModal(false)
    setSelectedVideo(null)
  }

  const toggleVideoInfo = (pageId) => {
    setShowVideoInfo(prev => ({
      ...prev,
      [pageId]: !prev[pageId]
    }))
  }

  const currentPageData = LEARNING_PAGES[currentPage - 1]
  const PageIcon = currentPageData.icon

  // Закрытие модального окна по клику вне его
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        closeVideo()
      }
    }
    
    if (showVideoModal) {
      document.addEventListener('mousedown', handleClickOutside)
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [showVideoModal])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="text-6xl mb-4"
          >
            ⏳
          </motion.div>
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

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black py-20">
      {/* Модальное окно с видео */}
      <AnimatePresence>
        {showVideoModal && selectedVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          >
            <motion.div
              ref={modalRef}
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-gray-900 rounded-2xl overflow-hidden max-w-4xl w-full border border-gray-800"
            >
              <div className="p-4 bg-gray-800 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Youtube className="w-5 h-5 text-red-500" />
                  <h3 className="text-white font-semibold">{selectedVideo.videoTitle}</h3>
                </div>
                <button
                  onClick={closeVideo}
                  className="text-gray-400 hover:text-white transition"
                >
                  ✕
                </button>
              </div>
              <div className="aspect-video">
                <iframe
                  src={selectedVideo.videoUrl}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title={selectedVideo.title}
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Уведомление о завершении страницы */}
      <AnimatePresence>
        {showPageComplete && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-3 rounded-full shadow-lg flex items-center gap-3"
          >
            <CheckCircle className="w-5 h-5" />
            <span className="font-medium">Страница "{currentPageData.title}" завершена!</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Прогресс-бар курса */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-gray-900 z-40"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${(completedPages.length / 5) * 100}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="h-full bg-gradient-to-r from-red-500 to-red-600 relative"
        >
          <motion.div
            animate={{
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute inset-0 bg-white/20"
          />
        </motion.div>
      </motion.div>

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

          {/* Прогресс страниц */}
          <div className="mb-8 bg-gray-900/50 backdrop-blur-lg rounded-xl p-4 border border-gray-800">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-white font-semibold">Прогресс обучения</h3>
              <span className="text-gray-400 text-sm">{completedPages.length}/5 страниц</span>
            </div>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((page) => {
                const pageData = LEARNING_PAGES[page-1]
                const PageIconSmall = pageData.icon
                
                return (
                  <motion.button
                    key={page}
                    whileHover={{ scale: 1.05, y: -2 }}
                    onClick={() => setCurrentPage(page)}
                    className={`
                      flex-1 relative group
                    `}
                  >
                    <div className={`
                      h-12 rounded-lg transition-all flex items-center justify-center gap-2
                      ${currentPage === page 
                        ? `bg-gradient-to-r ${pageData.color} text-white` 
                        : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                      }
                    `}>
                      <PageIconSmall className="w-4 h-4" />
                      <span className="text-sm font-medium hidden sm:inline">{page}</span>
                    </div>
                    
                    {/* Tooltip */}
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition bg-gray-900 text-white text-xs py-1 px-2 rounded whitespace-nowrap">
                      {pageData.title}
                    </div>
                  </motion.button>
                )
              })}
            </div>
          </div>

          {/* Карточки страниц в виде сетки */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {LEARNING_PAGES.map((page) => {
              const Icon = page.icon
              const isCompleted = isPageCompleted(page.id)
              const isCurrent = currentPage === page.id
              
              return (
                <motion.div
                  key={page.id}
                  whileHover={{ scale: 1.02, y: -5 }}
                  className={`
                    bg-gray-900/50 backdrop-blur-lg rounded-xl p-6 border cursor-pointer
                    ${isCurrent 
                      ? 'border-red-500 ring-2 ring-red-500/20' 
                      : isCompleted
                        ? 'border-green-500/50 hover:border-green-500'
                        : 'border-gray-800 hover:border-gray-700'
                    }
                  `}
                  onClick={() => setCurrentPage(page.id)}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${page.color} flex items-center justify-center`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    {isCompleted && (
                      <CheckCircle className="w-6 h-6 text-green-500" />
                    )}
                  </div>
                  
                  <h3 className="text-xl font-bold text-white mb-2">{page.title}</h3>
                  <p className="text-gray-400 text-sm mb-4">{page.description}</p>
                  
                  <div className="flex items-center justify-between">
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        openVideo(page)
                      }}
                      className="flex items-center gap-2 text-red-500 hover:text-red-400 transition group"
                    >
                      <Youtube className="w-4 h-4 group-hover:scale-110 transition" />
                      <span className="text-sm">Смотреть видео</span>
                    </button>
                    
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        toggleVideoInfo(page.id)
                      }}
                      className="text-gray-400 hover:text-white transition"
                    >
                      <Info className="w-4 h-4" />
                    </button>
                  </div>
                  
                  {/* Информация о видео при наведении */}
                  <AnimatePresence>
                    {showVideoInfo[page.id] && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="mt-4 p-3 bg-gray-800 rounded-lg text-sm text-gray-300"
                      >
                        <Film className="w-4 h-4 inline mr-2 text-red-500" />
                        {page.videoTitle}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              )
            })}
          </div>

          {/* Видео плеер для текущей страницы */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <Youtube className="w-5 h-5 text-red-500" />
                Видеоурок: {currentPageData.videoTitle}
              </h3>
              <button
                onClick={() => openVideo(currentPageData)}
                className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
              >
                <Play className="w-4 h-4" />
                Смотреть в полном размере
              </button>
            </div>
            <div className="aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl border border-gray-800">
              <iframe
                src={currentPageData.videoUrl}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title={currentPageData.title}
              />
            </div>
          </div>

          {/* Навигация по страницам */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${currentPageData.color} flex items-center justify-center`}>
                <PageIcon className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">{currentPageData.title}</h2>
                <p className="text-gray-400">{currentPageData.description}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {!isPageCompleted(currentPage) && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => markPageAsCompleted(currentPage)}
                  className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg font-medium"
                >
                  <Check className="w-4 h-4" />
                  Завершить страницу
                </motion.button>
              )}
              
              <button
                onClick={goToPreviousPage}
                disabled={currentPage === 1}
                className={`p-2 rounded-lg transition ${
                  currentPage > 1 
                    ? 'bg-gray-800 text-white hover:bg-gray-700' 
                    : 'bg-gray-800/50 text-gray-600 cursor-not-allowed'
                }`}
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              
              <span className="text-white font-medium">
                {currentPage}/5
              </span>
              
              <button
                onClick={goToNextPage}
                disabled={currentPage === 5}
                className={`p-2 rounded-lg transition ${
                  currentPage < 5
                    ? 'bg-red-600 text-white hover:bg-red-700' 
                    : 'bg-gray-800/50 text-gray-600 cursor-not-allowed'
                }`}
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Контент страницы */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPage}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="bg-gradient-to-br from-gray-900/50 to-black border border-gray-800 rounded-2xl p-8"
            >
              {/* Статус страницы */}
              <div className="flex items-center justify-between mb-6">
                <h1 className="text-3xl font-black text-white">{currentPageData.content.title}</h1>
                <div className="flex items-center gap-2">
                  {isPageCompleted(currentPage) ? (
                    <div className="flex items-center gap-2 px-4 py-2 bg-green-600/20 border border-green-600/50 rounded-xl text-green-500 font-semibold">
                      <CheckCircle className="w-5 h-5" />
                      Страница завершена
                    </div>
                  ) : null}
                </div>
              </div>

              {/* Секции контента */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {currentPageData.content.sections.map((section, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-gray-800/50 rounded-xl p-6 border border-gray-700"
                  >
                    <h3 className="text-xl font-bold text-white mb-4">{section.title}</h3>
                    <ul className="space-y-3">
                      {section.items.map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-gray-300">
                          <span className="text-red-500 mt-1">•</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </div>

              {/* Дополнительные материалы */}
              <div className="mt-8 pt-8 border-t border-gray-800">
                <h3 className="text-xl font-bold text-white mb-4">Дополнительные материалы</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <a
                    href={`/materials/page-${currentPage}.pdf`}
                    className="flex items-center gap-3 p-4 bg-gray-800 rounded-lg hover:bg-gray-700 transition group"
                  >
                    <Download className="w-5 h-5 text-red-500 group-hover:scale-110 transition" />
                    <div>
                      <p className="text-white font-medium">Методичка страницы {currentPage}</p>
                      <p className="text-sm text-gray-400">PDF, 2.5 MB</p>
                    </div>
                  </a>
                  <a
                    href={`/exercises/page-${currentPage}.pdf`}
                    className="flex items-center gap-3 p-4 bg-gray-800 rounded-lg hover:bg-gray-700 transition group"
                  >
                    <Download className="w-5 h-5 text-red-500 group-hover:scale-110 transition" />
                    <div>
                      <p className="text-white font-medium">Упражнения для страницы {currentPage}</p>
                      <p className="text-sm text-gray-400">PDF, 1.8 MB</p>
                    </div>
                  </a>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Кнопка завершения урока */}
          {completedPages.length === 5 && !lesson.completed && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-8 text-center"
            >
              <button
                onClick={markAsCompleted}
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-green-500 to-green-600 rounded-xl text-white font-semibold hover:from-green-600 hover:to-green-700 transition-all duration-300 text-lg"
              >
                <Trophy className="w-6 h-6" />
                Завершить урок и получить достижение!
              </button>
            </motion.div>
          )}

          {/* Отображение завершенного урока */}
          {lesson.completed && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mt-8 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/50 rounded-2xl p-8 text-center"
            >
              <Trophy className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-white mb-2">Урок завершен!</h2>
              <p className="text-gray-400">Вы успешно прошли все 5 страниц обучения</p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  )
}