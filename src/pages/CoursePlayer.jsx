import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { 
  ChevronLeft, ChevronRight, Download, MessageCircle, 
  Star, Sparkles, Target, Trophy, Clock, CheckCircle,
  Maximize2, Minimize2, BookOpen, Users, Award,
  Play, Pause, Volume2, VolumeX, SkipForward, SkipBack,
  GraduationCap, Swords, Dumbbell, BarChart, Home,
  ArrowRight, ArrowLeft, Check, Lock
} from 'lucide-react'
import axios from 'axios'
import Loader from '../components/ui/Loader'
import LessonSidebar from '../components/courses/LessonSidebar'
import VideoPlayer from '../components/courses/VideoPlayer'
import AIChat from '../components/AIChat'
import BoxingPage1 from './BoxingPage1'
import BoxingPage2 from './BoxingPage2'
import BoxingPage3 from './BoxingPage3'
import BoxingPage4 from './BoxingPage4'
import BoxingPage5 from './BoxingPage5'
import { useTranslation } from 'react-i18next'

const API_URL = 'http://127.0.0.1:8000/api'

// Конфигурация страниц обучения
const LEARNING_PAGES = [
  {
    id: 1,
    title: 'Основы бокса',
    description: 'Изучите базовую стойку, передвижения и дыхание',
    icon: Home,
    color: 'from-blue-500 to-blue-600',
    progress: 0
  },
  {
    id: 2,
    title: 'Ударная техника',
    description: 'Джебы, кроссы, хуки и апперкоты',
    icon: Target,
    color: 'from-red-500 to-red-600',
    progress: 0
  },
  {
    id: 3,
    title: 'Защита и контратаки',
    description: 'Блоки, уклоны, нырки и ответные удары',
    icon: Swords,
    color: 'from-purple-500 to-purple-600',
    progress: 0
  },
  {
    id: 4,
    title: 'Комбинации и тактика',
    description: 'Связки ударов и тактические схемы',
    icon: GraduationCap,
    color: 'from-yellow-500 to-yellow-600',
    progress: 0
  },
  {
    id: 5,
    title: 'Спарринг и психология',
    description: 'Работа в спарринге и ментальная подготовка',
    icon: Dumbbell,
    color: 'from-green-500 to-green-600',
    progress: 0
  }
]

export default function CoursePlayer() {
  const { t } = useTranslation()
  const { id } = useParams()
  const navigate = useNavigate()
  
  // Состояния
  const [loading, setLoading] = useState(true)
  const [course, setCourse] = useState(null)
  const [currentLesson, setCurrentLesson] = useState(null)
  const [userProgress, setUserProgress] = useState([])
  const [showChat, setShowChat] = useState(false)
  const [activeTab, setActiveTab] = useState('lesson')
  const [currentPage, setCurrentPage] = useState(1)
  const [completedPages, setCompletedPages] = useState([])
  const [pageProgress, setPageProgress] = useState({})
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [showControls, setShowControls] = useState(true)
  const [playbackSpeed, setPlaybackSpeed] = useState(1)
  const [volume, setVolume] = useState(1)
  const [isMuted, setIsMuted] = useState(false)
  const [showSpeedMenu, setShowSpeedMenu] = useState(false)
  const [progress, setProgress] = useState(0)
  const [achievements, setAchievements] = useState([])
  const [streak, setStreak] = useState(0)
  const [showPageComplete, setShowPageComplete] = useState(false)
  
  const videoRef = useRef(null)
  const playerRef = useRef(null)
  const controlsTimeout = useRef(null)

  useEffect(() => {
    fetchCourseData()
    loadUserAchievements()
    loadPageProgress()
  }, [id])

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement)
    }
    document.addEventListener('fullscreenchange', handleFullscreenChange)
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange)
  }, [])

  // Загрузка прогресса по страницам
  const loadPageProgress = async () => {
    try {
      const token = localStorage.getItem('access_token')
      const response = await axios.get(`${API_URL}/courses/${id}/page-progress/`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      setPageProgress(response.data.progress || {})
      setCompletedPages(response.data.completed_pages || [])
    } catch (error) {
      console.error('Failed to load page progress:', error)
    }
  }

  const fetchCourseData = async () => {
    try {
      const token = localStorage.getItem('access_token')
      const response = await axios.get(`${API_URL}/courses/${id}/`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      
      const courseData = response.data

      if (!courseData.is_purchased) {
        navigate(`/courses/${id}`)
        return
      }

      setCourse(courseData)
      setUserProgress(courseData.user_progress || [])
      
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

  const loadUserAchievements = async () => {
    try {
      const token = localStorage.getItem('access_token')
      const response = await axios.get(`${API_URL}/users/achievements/`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      setAchievements(response.data)
      setStreak(response.data.streak || 0)
    } catch (error) {
      console.error('Failed to load achievements:', error)
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
      fetchCourseData()
      checkAchievements()
    } catch (error) {
      console.error('Failed to update progress:', error)
    }
  }

  // Отметка страницы как завершенной
  const completePage = async (pageId) => {
    try {
      const token = localStorage.getItem('access_token')
      await axios.post(
        `${API_URL}/courses/${id}/complete-page/`,
        { page_id: pageId },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      
      setCompletedPages([...completedPages, pageId])
      setShowPageComplete(true)
      
      // Показываем уведомление
      setTimeout(() => setShowPageComplete(false), 3000)
      
      // Проверяем достижения
      if (completedPages.length + 1 === 5) {
        showAchievementNotification('Мастер бокса', 'Пройдены все страницы курса')
      }
    } catch (error) {
      console.error('Failed to complete page:', error)
    }
  }

  const checkAchievements = () => {
    const completedLessons = userProgress.filter(p => p.completed).length
    if (completedLessons === 5) {
      showAchievementNotification('Начинающий боксер', 'Завершено 5 уроков')
    } else if (completedLessons === 10) {
      showAchievementNotification('Опытный боец', 'Завершено 10 уроков')
    }
  }

  const showAchievementNotification = (title, description) => {
    const notification = new Audio('/sounds/achievement.mp3')
    notification.play().catch(() => {})
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
    setProgress((time / (currentLesson?.duration_minutes * 60 || 1)) * 100)
    if (currentLesson && Math.floor(time) % 10 === 0) {
      updateLessonProgress(currentLesson.id, {
        last_position_seconds: Math.floor(time),
        watch_time_seconds: Math.floor(time)
      })
    }
  }

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      playerRef.current?.requestFullscreen()
    } else {
      document.exitFullscreen()
    }
  }

  const handleMouseMove = () => {
    setShowControls(true)
    clearTimeout(controlsTimeout.current)
    controlsTimeout.current = setTimeout(() => {
      if (!isFullscreen) return
      setShowControls(false)
    }, 3000)
  }

  const handleKeyPress = (e) => {
    if (e.code === 'Space') {
      e.preventDefault()
      if (videoRef.current) {
        if (videoRef.current.paused) {
          videoRef.current.play()
        } else {
          videoRef.current.pause()
        }
      }
    } else if (e.code === 'ArrowRight') {
      e.preventDefault()
      if (videoRef.current) {
        videoRef.current.currentTime += 10
      }
    } else if (e.code === 'ArrowLeft') {
      e.preventDefault()
      if (videoRef.current) {
        videoRef.current.currentTime -= 10
      }
    } else if (e.code === 'KeyF') {
      toggleFullscreen()
    } else if (e.code === 'KeyM') {
      setIsMuted(!isMuted)
      if (videoRef.current) {
        videoRef.current.muted = !isMuted
      }
    }
  }

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [isMuted])

  // Навигация между страницами
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
  const isPageLocked = (pageId) => {
    // Страницы доступны последовательно
    if (pageId === 1) return false
    return !completedPages.includes(pageId - 1)
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
  const currentPageData = LEARNING_PAGES[currentPage - 1]
  const PageIcon = currentPageData.icon

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 pt-16">
      {/* Анимированный фон */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5"></div>
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute -top-1/2 -right-1/2 w-full h-full bg-gradient-to-r from-red-600/10 to-transparent rounded-full blur-3xl"
        />
      </div>

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
        className="fixed top-16 left-0 right-0 h-1 bg-gray-900 z-40"
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

      {/* Статистика и достижения */}
      <motion.div 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="fixed top-20 left-1/2 transform -translate-x-1/2 z-30 flex gap-4 bg-gray-900/90 backdrop-blur-lg rounded-full px-6 py-2 border border-gray-700"
      >
        <div className="flex items-center gap-2">
          <Trophy className="w-4 h-4 text-yellow-500" />
          <span className="text-white text-sm">{achievements.length} достижений</span>
        </div>
        <div className="flex items-center gap-2">
          <Target className="w-4 h-4 text-red-500" />
          <span className="text-white text-sm">страница {currentPage}/5</span>
        </div>
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-blue-500" />
          <span className="text-white text-sm">стрик {streak} дней</span>
        </div>
      </motion.div>

      <div className="flex h-[calc(100vh-4rem)]">
        {/* Сайдбар с уроками и страницами */}
        <motion.div 
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="w-96 border-r border-gray-800 overflow-hidden bg-gray-900/50 backdrop-blur-lg"
        >
          {/* Навигация по страницам */}
          <div className="p-4 border-b border-gray-800">
            <h3 className="text-sm font-medium text-gray-400 mb-3">Прогресс курса</h3>
            <div className="space-y-2">
              {LEARNING_PAGES.map((page) => {
                const Icon = page.icon
                const isCompleted = isPageCompleted(page.id)
                const isLocked = isPageLocked(page.id)
                
                return (
                  <motion.button
                    key={page.id}
                    whileHover={{ x: 5 }}
                    onClick={() => !isLocked && setCurrentPage(page.id)}
                    disabled={isLocked}
                    className={`
                      w-full flex items-center gap-3 p-3 rounded-lg transition
                      ${currentPage === page.id 
                        ? 'bg-red-600/20 border border-red-600/50' 
                        : isLocked
                          ? 'opacity-50 cursor-not-allowed'
                          : 'hover:bg-gray-800'
                      }
                    `}
                  >
                    <div className={`w-8 h-8 rounded-lg bg-gradient-to-r ${page.color} flex items-center justify-center`}>
                      <Icon className="w-4 h-4 text-white" />
                    </div>
                    <div className="flex-1 text-left">
                      <div className="flex items-center justify-between">
                        <span className={`text-sm font-medium ${currentPage === page.id ? 'text-white' : 'text-gray-400'}`}>
                          {page.title}
                        </span>
                        {isCompleted && (
                          <Check className="w-4 h-4 text-green-500" />
                        )}
                        {isLocked && (
                          <Lock className="w-4 h-4 text-gray-600" />
                        )}
                      </div>
                      <div className="h-1 bg-gray-700 rounded-full mt-2 overflow-hidden">
                        <motion.div
                          className="h-full bg-gradient-to-r from-red-500 to-red-600"
                          initial={{ width: 0 }}
                          animate={{ width: isCompleted ? '100%' : '0%' }}
                        />
                      </div>
                    </div>
                  </motion.button>
                )
              })}
            </div>
          </div>

          <LessonSidebar
            lessons={course.lessons}
            currentLesson={currentLesson}
            onLessonSelect={setCurrentLesson}
            userProgress={userProgress}
            hasCourseAccess={course.is_purchased}
          />
        </motion.div>

        {/* Основной контент */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Видео плеер */}
          <motion.div 
            ref={playerRef}
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="relative bg-black group"
            onMouseMove={handleMouseMove}
            onMouseLeave={() => isFullscreen && setShowControls(false)}
          >
            <VideoPlayer
              ref={videoRef}
              videoUrl={currentLesson.video_url}
              timestamps={currentLesson.timestamps}
              videoFormat={currentLesson.video_format || '16:9'}
              onTimeUpdate={handleTimeUpdate}
              onComplete={handleLessonComplete}
              initialTime={currentLesson.progress?.last_position_seconds || 0}
            />

            {/* Кастомные контролы */}
            <AnimatePresence>
              {showControls && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-4"
                >
                  <div className="relative h-1 bg-gray-600 rounded-full mb-4 cursor-pointer group">
                    <motion.div 
                      className="absolute h-full bg-red-500 rounded-full"
                      style={{ width: `${progress}%` }}
                    />
                    <div className="absolute h-3 w-3 bg-red-500 rounded-full -top-1 opacity-0 group-hover:opacity-100 transition"
                         style={{ left: `${progress}%` }} />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <button onClick={() => videoRef.current?.play()} className="text-white hover:text-red-500 transition">
                        <Play className="w-5 h-5" />
                      </button>
                      <button onClick={() => videoRef.current?.pause()} className="text-white hover:text-red-500 transition">
                        <Pause className="w-5 h-5" />
                      </button>
                      <button onClick={() => videoRef.current && (videoRef.current.currentTime -= 10)} className="text-white hover:text-red-500 transition">
                        <SkipBack className="w-5 h-5" />
                      </button>
                      <button onClick={() => videoRef.current && (videoRef.current.currentTime += 10)} className="text-white hover:text-red-500 transition">
                        <SkipForward className="w-5 h-5" />
                      </button>
                      
                      <div className="flex items-center gap-2 group/volume">
                        <button onClick={() => {
                          setIsMuted(!isMuted)
                          if (videoRef.current) videoRef.current.muted = !isMuted
                        }} className="text-white hover:text-red-500 transition">
                          {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                        </button>
                        <input 
                          type="range" min="0" max="1" step="0.1" value={volume}
                          onChange={(e) => {
                            const val = parseFloat(e.target.value)
                            setVolume(val)
                            if (videoRef.current) videoRef.current.volume = val
                          }}
                          className="w-20 accent-red-500 opacity-0 group-hover/volume:opacity-100 transition"
                        />
                      </div>

                      <div className="relative">
                        <button onClick={() => setShowSpeedMenu(!showSpeedMenu)} className="text-white hover:text-red-500 transition px-2 py-1 rounded bg-gray-800">
                          {playbackSpeed}x
                        </button>
                        <AnimatePresence>
                          {showSpeedMenu && (
                            <motion.div
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: 10 }}
                              className="absolute bottom-full mb-2 bg-gray-800 rounded-lg overflow-hidden"
                            >
                              {[0.5, 1, 1.25, 1.5, 2].map(speed => (
                                <button
                                  key={speed}
                                  onClick={() => {
                                    setPlaybackSpeed(speed)
                                    if (videoRef.current) videoRef.current.playbackRate = speed
                                    setShowSpeedMenu(false)
                                  }}
                                  className={`block w-full px-4 py-2 text-sm hover:bg-gray-700 transition ${
                                    playbackSpeed === speed ? 'text-red-500' : 'text-white'
                                  }`}
                                >
                                  {speed}x
                                </button>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <span className="text-white text-sm">
                        {Math.floor(videoRef.current?.currentTime || 0)} / {currentLesson.duration_minutes}:00
                      </span>
                      <button onClick={toggleFullscreen} className="text-white hover:text-red-500 transition">
                        {isFullscreen ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Заголовок текущей страницы */}
          <div className="bg-gray-900 border-b border-gray-800 p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-lg bg-gradient-to-r ${currentPageData.color} flex items-center justify-center`}>
                  <PageIcon className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">{currentPageData.title}</h2>
                  <p className="text-sm text-gray-400">{currentPageData.description}</p>
                </div>
              </div>
              
              {/* Кнопки навигации по страницам */}
              <div className="flex items-center gap-3">
                {!isPageCompleted(currentPage) && !isPageLocked(currentPage) && (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => completePage(currentPage)}
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
                  disabled={currentPage === 5 || isPageLocked(currentPage + 1)}
                  className={`p-2 rounded-lg transition ${
                    currentPage < 5 && !isPageLocked(currentPage + 1)
                      ? 'bg-red-600 text-white hover:bg-red-700' 
                      : 'bg-gray-800/50 text-gray-600 cursor-not-allowed'
                  }`}
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Табы для разных разделов */}
          <div className="bg-gray-900 border-b border-gray-800">
            <div className="flex gap-2 p-2">
              {[
                { id: 'lesson', icon: BookOpen, label: t('coursePlayer.lesson') },
                { id: 'techniques', icon: Target, label: 'Техники' },
                { id: 'workout', icon: Users, label: 'Тренировка' },
                { id: 'stats', icon: Award, label: 'Статистика' }
              ].map(tab => (
                <motion.button
                  key={tab.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition ${
                    activeTab === tab.id
                      ? 'bg-red-600 text-white'
                      : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  {tab.label}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Контент вкладок */}
          <div className="flex-1 overflow-y-auto bg-gray-900">
            <AnimatePresence mode="wait">
              <motion.div
                key={`${activeTab}-${currentPage}`}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="max-w-4xl mx-auto p-8"
              >
                {activeTab === 'lesson' && (
                  <>
                    {/* Заголовок урока */}
                    <div className="mb-8">
                      <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center gap-3 mb-3"
                      >
                        <span className="text-sm text-gray-400">
                          {t('coursePlayer.lessonOf', { number: currentLesson.order_index + 1, total: course.lessons.length })}
                        </span>
                        {currentLesson.progress?.completed && (
                          <motion.span 
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="flex items-center gap-1 text-sm text-green-500"
                          >
                            <CheckCircle className="w-4 h-4" />
                            {t('lesson.completed')}
                          </motion.span>
                        )}
                      </motion.div>
                      <motion.h1 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl font-bold text-white mb-4"
                      >
                        {currentLesson.title}
                      </motion.h1>
                    </div>

                    {/* Описание урока */}
                    {currentLesson.text_content && (
                      <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="mb-8"
                      >
                        <h2 className="text-xl font-semibold text-white mb-4">{t('coursePlayer.lessonAbout')}</h2>
                        <div className="prose prose-invert max-w-none">
                          <p className="text-gray-300 leading-relaxed whitespace-pre-wrap">
                            {currentLesson.text_content}
                          </p>
                        </div>
                      </motion.div>
                    )}

                    {/* Ресурсы для скачивания */}
                    {currentLesson.resources && currentLesson.resources.length > 0 && (
                      <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="mb-8"
                      >
                        <h2 className="text-xl font-semibold text-white mb-4">{t('coursePlayer.lessonMaterials')}</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {currentLesson.resources.map((resource, index) => (
                            <motion.a
                              key={index}
                              href={resource.url}
                              download
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              className="flex items-center gap-3 p-4 bg-gray-800 rounded-lg hover:bg-gray-700 transition group"
                            >
                              <Download className="w-5 h-5 text-red-500 group-hover:scale-110 transition" />
                              <div className="flex-1">
                                <p className="text-white font-medium">{resource.name}</p>
                                <p className="text-sm text-gray-400">{resource.type.toUpperCase()}</p>
                              </div>
                            </motion.a>
                          ))}
                        </div>
                      </motion.div>
                    )}

                    {/* Навигация между уроками */}
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                      className="flex items-center justify-between pt-8 border-t border-gray-800"
                    >
                      <motion.button
                        whileHover={hasPrevious ? { x: -5 } : {}}
                        whileTap={{ scale: 0.95 }}
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
                        {t('lesson.previousLesson')}
                      </motion.button>

                      <motion.button
                        whileHover={hasNext ? { x: 5 } : {}}
                        whileTap={{ scale: 0.95 }}
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
                        {t('lesson.nextLesson')}
                        <ChevronRight className="w-5 h-5" />
                      </motion.button>
                    </motion.div>
                  </>
                )}

                {activeTab === 'techniques' && (
                  <BoxingTechniques 
                    page={currentPage}
                    lesson={currentLesson}
                    onSelectTechnique={(technique) => {
                      console.log('Selected technique:', technique)
                    }}
                  />
                )}

                {activeTab === 'workout' && (
                  <BoxingWorkout 
                    page={currentPage}
                    lesson={currentLesson}
                    onComplete={(stats) => {
                      console.log('Workout completed:', stats)
                    }}
                  />
                )}

                {activeTab === 'stats' && (
                  <BoxingStats 
                    userProgress={userProgress}
                    achievements={achievements}
                    streak={streak}
                    currentPage={currentPage}
                    completedPages={completedPages}
                  />
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* AI Chat Widget */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setShowChat(!showChat)}
        className="fixed bottom-8 right-8 w-14 h-14 bg-gradient-to-r from-red-600 to-red-500 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition z-50 group"
      >
        <MessageCircle className="w-6 h-6 text-white group-hover:rotate-12 transition" />
      </motion.button>

      <AnimatePresence>
        {showChat && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 right-8 w-96 h-[500px] z-50 rounded-xl overflow-hidden shadow-2xl border border-gray-700"
          >
            <AIChat onClose={() => setShowChat(false)} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}