import { useState, useEffect, useRef } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Play, Clock, BookOpen, Users, Star, Award, Shield, 
  CheckCircle, Lock, Download, Share2, Heart, ChevronRight,
  TrendingUp, Target, Zap, Crown, Sparkles, Calendar,
  MessageCircle, Bookmark, BarChart3, Trophy, HelpCircle, ArrowLeft
} from 'lucide-react'
import { getCourse, createOrder, completePayment } from '../services/apiService'
import { useAuthStore } from '../store/authStore'
import CoursePlayer from '../components/courses/CoursePlayer'
import CurriculumSection from '../components/courses/CurriculumSection'
import { getCourseBySlug } from '../data/staticLessons'
import { purchaseUtils } from '../utils/purchaseUtils'
import { useTranslation } from 'react-i18next'

export default function CourseDetail() {
  const { t, i18n } = useTranslation()
  const { slug } = useParams()
  const navigate = useNavigate()
  const { isAuthenticated, user } = useAuthStore()
  const [course, setCourse] = useState(null)
  const [loading, setLoading] = useState(true)
  const [purchasing, setPurchasing] = useState(false)
  const [showPlayer, setShowPlayer] = useState(false)
  const [selectedLesson, setSelectedLesson] = useState(null)
  const [isLiked, setIsLiked] = useState(false)
  const [showShare, setShowShare] = useState(false)
  const [activeTab, setActiveTab] = useState('overview')
  
  const featuresRef = useRef(null)
  const curriculumRef = useRef(null)
  const reviewsRef = useRef(null)

  useEffect(() => {
    fetchCourseData()
  }, [slug])

  const fetchCourseData = async () => {
    try {
      setLoading(true)
      
      // Сначала пробуем загрузить с API
      try {
        const response = await getCourse(slug)
        const courseData = response.data
        
        // Проверяем, куплен ли курс локально
        const isPurchasedLocally = purchaseUtils.isPurchased(courseData.id)
        
        // Enhanced course data with mock details
        const enhancedCourse = {
          ...courseData,
          is_purchased: courseData.is_purchased || isPurchasedLocally,
          full_description: courseData.full_description || t('courseDetail.fullDescription'),
        
        // Mock additional details
        instructor: {
          name: t('courseDetail.instructorData.name'),
          title: t('courseDetail.instructorData.title'),
          rating: 4.9,
          students: 10500,
          courses: 8,
          avatar: '👑'
        },
        
        stats: {
          rating: 4.8,
          totalReviews: 342,
          studentsEnrolled: 2843,
          completionRate: 87,
          satisfactionRate: 94
        },
        
        features: [
          t('courseDetail.features.0'),
          t('courseDetail.features.1'),
          t('courseDetail.features.2'),
          t('courseDetail.features.3'),
          t('courseDetail.features.4'),
          t('courseDetail.features.5')
        ],
        
        requirements: [
          t('courseDetail.requirementsList.0'),
          t('courseDetail.requirementsList.1'),
          t('courseDetail.requirementsList.2'),
          t('courseDetail.requirementsList.3')
        ],
        
        lessons: courseData.lessons || [
          { id: 1, title: t('courseDetail.lessons.0'), duration_minutes: 45, is_free: true, preview: true },
          { id: 2, title: t('courseDetail.lessons.1'), duration_minutes: 60, is_free: false, preview: false },
          { id: 3, title: t('courseDetail.lessons.2'), duration_minutes: 75, is_free: false, preview: false },
          { id: 4, title: t('courseDetail.lessons.3'), duration_minutes: 90, is_free: false, preview: false },
          { id: 5, title: t('courseDetail.lessons.4'), duration_minutes: 80, is_free: false, preview: false },
          { id: 6, title: t('courseDetail.lessons.5'), duration_minutes: 85, is_free: false, preview: false },
          { id: 7, title: t('courseDetail.lessons.6'), duration_minutes: 70, is_free: false, preview: false },
          { id: 8, title: t('courseDetail.lessons.7'), duration_minutes: 95, is_free: false, preview: false },
          { id: 9, title: t('courseDetail.lessons.8'), duration_minutes: 65, is_free: false, preview: false },
          { id: 10, title: t('courseDetail.lessons.9'), duration_minutes: 50, is_free: false, preview: false }
        ],
        
        reviews: [
          {
            id: 1,
            user: t('courseDetail.reviewsData.0.user'),
            avatar: '👤',
            rating: 5,
            date: t('courseDetail.reviewsData.0.date'),
            comment: t('courseDetail.reviewsData.0.comment'),
            helpful: 24
          },
          {
            id: 2,
            user: t('courseDetail.reviewsData.1.user'),
            avatar: '👩',
            rating: 5,
            date: t('courseDetail.reviewsData.1.date'),
            comment: t('courseDetail.reviewsData.1.comment'),
            helpful: 18
          }
        ]
      }
      
      setCourse(enhancedCourse)
      } catch (apiError) {
        console.log('API не доступен, используем статичные данные')
        
        // Используем статичные данные если API недоступен
        const staticCourse = getCourseBySlug(slug, t)
        if (staticCourse) {
          // Проверяем, куплен ли курс локально
          const isPurchasedLocally = purchaseUtils.isPurchased(staticCourse.id)
          
          const enhancedStaticCourse = {
            ...staticCourse,
            is_purchased: isPurchasedLocally,
            full_description: t('courseDetail.fullDescription'),
            stats: {
              rating: staticCourse.rating || 4.8,
              totalReviews: 342,
              studentsEnrolled: staticCourse.studentsCount || 2843,
              completionRate: 87,
              satisfactionRate: 94
            },
            features: [
              t('courseDetail.features.0'),
              t('courseDetail.features.1'),
              t('courseDetail.features.2'),
              t('courseDetail.features.3'),
              t('courseDetail.features.4'),
              t('courseDetail.features.5')
            ],
            requirements: [
              t('courseDetail.requirementsList.0'),
              t('courseDetail.requirementsList.1'),
              t('courseDetail.requirementsList.2'),
              t('courseDetail.requirementsList.3Alt')
            ],
            reviews: [
              {
                id: 1,
                user: t('courseDetail.reviewsData.0.user'),
                avatar: '👤',
                rating: 5,
                date: t('courseDetail.reviewsData.0.date'),
                comment: t('courseDetail.reviewsData.0.comment'),
                helpful: 24
              },
              {
                id: 2,
                user: t('courseDetail.reviewsData.1.user'),
                avatar: '👩',
                rating: 5,
                date: t('courseDetail.reviewsData.1.date'),
                comment: t('courseDetail.reviewsData.1.comment'),
                helpful: 18
              }
            ]
          }
          setCourse(enhancedStaticCourse)
        } else {
          throw new Error(t('courseDetail.notFound'))
        }
      }
    } catch (error) {
      console.error('Failed to fetch course:', error)
      navigate('/courses')
    } finally {
      setLoading(false)
    }
  }

  const handlePurchase = async () => {
    // Упрощенная покупка - просто добавляем курс в localStorage
    setPurchasing(true)
    
    try {
      // Имитируем процесс оплаты с небольшой задержкой
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // Покупаем курс через утилиту
      purchaseUtils.purchaseCourse(course.id)
      
      // Обновляем состояние курса
      setCourse({ ...course, is_purchased: true })
      
      // Показываем успешное сообщение
      alert(t('courseDetail.purchaseSuccess'))
      
    } catch (error) {
      console.error('Purchase error:', error)
      alert(t('courseDetail.purchaseError'))
    } finally {
      setPurchasing(false)
    }
  }

  const handleLessonClick = (lesson) => {
    if (course.is_purchased || lesson.is_free) {
      setSelectedLesson(lesson)
      setShowPlayer(true)
    }
  }

  const scrollToSection = (ref) => {
    ref.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  }

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="text-6xl mb-4"
          >
            ⚡
          </motion.div>
          <p className="text-gray-400 text-lg">{t('courseDetail.loading')}</p>
        </div>
      </div>
    )
  }

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🥊</div>
          <h3 className="text-2xl font-bold text-white mb-2">{t('courseDetail.notFoundTitle')}</h3>
          <p className="text-gray-400 mb-6">{t('courseDetail.notFoundSubtitle')}</p>
          <Link to="/courses" className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary to-red-600 rounded-xl font-semibold text-white hover:from-red-600 hover:to-primary transition-all">
            <ChevronRight className="w-5 h-5 rotate-180" />
            {t('courseDetail.backToCourses')}
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black">
      {/* Hero Section */}
      <section className="relative pt-20 pb-12 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-red-600/10"></div>
          <div className="absolute inset-0 bg-[url('https://img.freepik.com/free-vector/boxing-gloves-realistic-composition-with-dark-gradient-background-pair-red-mufflers-hanging-strings-vector-illustration_1284-78726.jpg?semt=ais_hybrid&w=740&q=80')] bg-cover bg-center opacity-5"></div>
        </div>

        <div className="container-custom relative">
          <motion.div
            variants={staggerContainer}
            initial="initial"
            animate="animate"
            className="grid lg:grid-cols-3 gap-8"
          >
            {/* Left Column - Course Info */}
            <motion.div variants={fadeInUp} className="lg:col-span-2">
              <button
                onClick={() => navigate('/courses')}
                className="inline-flex items-center gap-2 px-4 py-2 mb-6 text-gray-300 hover:text-white hover:bg-gray-800/50 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>{t('common.back')}</span>
              </button>

              <div className="inline-flex items-center gap-2 px-3 py-1 bg-gradient-to-r from-primary/20 to-red-600/20 rounded-full border border-primary/30 mb-6">
                <Sparkles className="w-4 h-4 text-primary" />
                <span className="text-primary text-sm font-semibold">
                  {course.level === 'beginner'
                    ? t('courseDetail.levels.beginner')
                    : course.level === 'intermediate'
                      ? t('courseDetail.levels.intermediate')
                      : t('courseDetail.levels.advanced')}{' '}{t('courseDetail.levelSuffix')}
                </span>
              </div>

              <h1 className="text-4xl md:text-6xl font-black mb-6">
                {course.title}
              </h1>
              
              {/* Бесплатные уроки баннер */}
              {course.lessons && course.lessons.filter(l => l.is_free).length > 0 && !course.is_purchased && (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6 p-4 bg-gradient-to-r from-blue-600/20 to-blue-700/20 border-2 border-blue-500/50 rounded-xl"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center">
                      <Play className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="font-bold text-white mb-1">
                        🎁 {t('courseDetail.freeLessonsBanner', {
                          count: course.lessons.filter(l => l.is_free).length,
                          lessons: t('courses.lessonsCount', { count: course.lessons.filter(l => l.is_free).length })
                        })}
                      </div>
                      <div className="text-sm text-gray-300">
                        {t('courseDetail.freeLessonsSubtitle')}
                      </div>
                    </div>
                    <Link
                      to={`/lessons/${course.lessons.find(l => l.is_free)?.id}`}
                      className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold text-white transition-colors whitespace-nowrap"
                    >
                      {t('courseDetail.freeLessonsCta')}
                    </Link>
                  </div>
                </motion.div>
              )}
              
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                {course.description}
              </p>

              {/* Instructor */}
              <div className="flex items-center gap-4 mb-8">
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-primary to-red-600 flex items-center justify-center text-2xl">
                  {course.instructor?.avatar || '🥊'}
                </div>
                <div>
                  <div className="font-bold text-white">{course.instructor?.name}</div>
                  <div className="text-sm text-gray-400">{course.instructor?.title}</div>
                  <div className="flex items-center gap-2 mt-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <span className="text-sm">{course.instructor?.rating}</span>
                    <span className="text-gray-500 text-sm">•</span>
                    <span className="text-sm text-gray-400">
                      {course.instructor?.students?.toLocaleString()} {t('courses.students')}
                    </span>
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div className="p-4 rounded-xl bg-gray-900/50 border border-gray-800">
                  <div className="text-2xl font-bold text-white mb-1">{course.rating || 4.8}</div>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-500 fill-current" />
                    ))}
                  </div>
                  <div className="text-xs text-gray-400 mt-1">
                    {t('courseDetail.reviewsCount', { count: course.reviews?.length || 342 })}
                  </div>
                </div>
                
                <div className="p-4 rounded-xl bg-gray-900/50 border border-gray-800">
                  <div className="text-2xl font-bold text-white mb-1">{course.stats?.studentsEnrolled?.toLocaleString() || 2843}</div>
                  <div className="text-sm text-gray-400">{t('courseDetail.stats.students')}</div>
                </div>
                
                <div className="p-4 rounded-xl bg-gray-900/50 border border-gray-800">
                  <div className="text-2xl font-bold text-white mb-1">{course.lessons_count || 10}</div>
                  <div className="text-sm text-gray-400">{t('courseDetail.stats.lessons')}</div>
                </div>
                
                <div className="p-4 rounded-xl bg-gray-900/50 border border-gray-800">
                  <div className="text-2xl font-bold text-white mb-1">
                    {course.duration_hours || 8}{t('courses.hoursShort')}
                  </div>
                  <div className="text-sm text-gray-400">{t('courseDetail.stats.duration')}</div>
                </div>
              </div>
            </motion.div>

            {/* Right Column - Purchase Card */}
            <motion.div variants={fadeInUp} className="lg:col-span-1">
              <div className="sticky top-24">
                <div className="bg-gradient-to-br from-gray-900/90 to-black border border-gray-800 rounded-2xl overflow-hidden shadow-2xl">
                  {/* Course Preview */}
                  <div className="relative">
                    <div className="aspect-video bg-gradient-to-br from-gray-900 to-black flex items-center justify-center">
                      {course.image ? (
                        <img src={course.image} alt={course.title} className="w-full h-full object-cover" />
                      ) : (
                        <span className="text-8xl">🥊</span>
                      )}
                    </div>
                    
                    {/* Play Button Overlay */}
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => course.lessons?.[0] && handleLessonClick(course.lessons[0])}
                        className="w-20 h-20 rounded-full bg-gradient-to-r from-primary to-red-600 flex items-center justify-center shadow-2xl shadow-primary/50"
                      >
                        <Play className="w-8 h-8 text-white ml-1" />
                      </motion.button>
                    </div>
                    
                    {/* Free Badge */}
                    {course.lessons?.[0]?.is_free && (
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 bg-gradient-to-r from-green-600 to-emerald-600 rounded-full text-sm font-bold text-white">
                          {t('courseDetail.freePreview')}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Price Section */}
                  <div className="p-6">
                    <div className="flex items-baseline gap-2 mb-6">
                      <div className="text-4xl font-black text-primary">{course.price?.toLocaleString()} {t('common.currency')}</div>
                      {course.originalPrice && (
                        <div className="text-lg text-gray-400 line-through">{course.originalPrice?.toLocaleString()} {t('common.currency')}</div>
                      )}
                    </div>

                    {course.is_purchased ? (
                      <Link
                        to="/dashboard/my-courses"
                        className="block w-full py-4 bg-gradient-to-r from-green-600 to-emerald-600 rounded-xl font-bold text-lg text-white text-center hover:from-emerald-600 hover:to-green-600 transition-all mb-4"
                      >
                        {t('courseDetail.goToLearning')}
                      </Link>
                    ) : (
                      <>
                        {/* Кнопка смотреть бесплатные уроки */}
                        {course.lessons && course.lessons.filter(l => l.is_free).length > 0 && (
                          <Link
                            to={`/lessons/${course.lessons.find(l => l.is_free)?.id}`}
                            className="block w-full py-4 bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl font-bold text-lg text-white text-center hover:from-blue-700 hover:to-blue-600 transition-all mb-4 relative overflow-hidden"
                          >
                            <span className="relative z-10 flex items-center justify-center gap-2">
                              <Play className="w-5 h-5" />
                              {t('courseDetail.watchFree', {
                                count: course.lessons.filter(l => l.is_free).length,
                                lessons: t('courses.lessonsCount', { count: course.lessons.filter(l => l.is_free).length })
                              })}
                            </span>
                            <motion.div
                              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                              animate={{
                                x: ['-100%', '100%'],
                              }}
                              transition={{
                                duration: 2,
                                repeat: Infinity,
                                repeatType: "loop",
                              }}
                            />
                          </Link>
                        )}
                        
                        <button
                          onClick={handlePurchase}
                          disabled={purchasing}
                          className="w-full py-4 bg-gradient-to-r from-primary to-red-600 rounded-xl font-bold text-lg text-white hover:from-red-600 hover:to-primary transition-all mb-4 relative overflow-hidden disabled:opacity-50"
                        >
                          {purchasing ? t('courses.purchasing') : t('courses.buy')}
                          
                          {/* Shine effect */}
                          {!purchasing && (
                            <motion.div
                              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                              animate={{
                                x: ['-100%', '100%'],
                              }}
                              transition={{
                                duration: 1.5,
                                repeat: Infinity,
                                repeatType: "loop",
                              }}
                            />
                          )}
                        </button>
                        
                        <button className="w-full py-3 border-2 border-primary text-primary rounded-xl font-semibold hover:bg-primary/10 transition-colors">
                          {t('courseDetail.addToFavorites')}
                        </button>
                      </>
                    )}

                    {/* Guarantee */}
                    <div className="mt-6 p-4 bg-gradient-to-r from-primary/10 to-red-600/10 rounded-xl border border-primary/30">
                      <div className="flex items-center gap-3 mb-2">
                        <Shield className="w-5 h-5 text-primary" />
                        <span className="font-semibold text-white">{t('courseDetail.guarantee.title')}</span>
                      </div>
                      <p className="text-sm text-gray-400">
                        {t('courseDetail.guarantee.subtitle')}
                      </p>
                    </div>

                    {/* Share Actions */}
                    <div className="flex items-center justify-between mt-6 pt-6 border-t border-gray-800">
                      <button
                        onClick={() => setIsLiked(!isLiked)}
                        className={`flex items-center gap-2 ${isLiked ? 'text-red-500' : 'text-gray-400 hover:text-white'}`}
                      >
                        <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
                        <span>{t('courseDetail.like')}</span>
                      </button>
                      
                      <div className="relative">
                        <button
                          onClick={() => setShowShare(!showShare)}
                          className="flex items-center gap-2 text-gray-400 hover:text-white"
                        >
                          <Share2 className="w-5 h-5" />
                          <span>{t('courseDetail.share')}</span>
                        </button>
                        
                        <AnimatePresence>
                          {showShare && (
                            <motion.div
                              initial={{ opacity: 0, y: -10, scale: 0.95 }}
                              animate={{ opacity: 1, y: 0, scale: 1 }}
                              exit={{ opacity: 0, y: -10, scale: 0.95 }}
                              className="absolute right-0 mt-2 w-48 bg-gray-900 border border-gray-800 rounded-xl shadow-2xl p-2 z-50"
                            >
                              <button className="w-full px-4 py-2 text-left hover:bg-gray-800 rounded-lg transition-colors">
                                📱 {t('courseDetail.shareCopy')}
                              </button>
                              <button className="w-full px-4 py-2 text-left hover:bg-gray-800 rounded-lg transition-colors">
                                📧 {t('courseDetail.shareEmail')}
                              </button>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Navigation Tabs */}
      <section className="sticky top-0 z-40 bg-black/80 backdrop-blur-xl border-b border-gray-800">
        <div className="container-custom">
          <div className="flex overflow-x-auto">
            {['overview', 'curriculum', 'instructor', 'reviews', 'faq'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-4 font-semibold whitespace-nowrap transition-colors ${
                  activeTab === tab
                    ? 'text-primary border-b-2 border-primary'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {tab === 'overview' ? t('courseDetail.overview') :
                 tab === 'curriculum' ? t('courseDetail.curriculum') :
                 tab === 'instructor' ? t('courseDetail.instructor') :
                 tab === 'reviews' ? t('courseDetail.reviews') : t('courseDetail.faq')}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="container-custom">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column - Content */}
            <div className="lg:col-span-2">
              <AnimatePresence mode="wait">
                {activeTab === 'overview' && (
                  <motion.div
                    key="overview"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="space-y-8"
                  >
                    {/* Full Description */}
                    <div className="bg-gradient-to-br from-gray-900/50 to-black border border-gray-800 rounded-2xl p-8">
                      <h2 className="text-3xl font-bold mb-6 text-white">{t('courseDetail.whatYouLearn')}</h2>
                      <div className="prose prose-invert max-w-none">
                        <p className="text-gray-300 text-lg leading-relaxed mb-6">
                          {course.full_description}
                        </p>
                        
                        {/* Key Learnings */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                          {[
                            t('courseDetail.keyLearnings.0'),
                            t('courseDetail.keyLearnings.1'),
                            t('courseDetail.keyLearnings.2'),
                            t('courseDetail.keyLearnings.3'),
                            t('courseDetail.keyLearnings.4'),
                            t('courseDetail.keyLearnings.5')
                          ].map((item, idx) => (
                            <div key={idx} className="flex items-center gap-3">
                              <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                              <span className="text-gray-300">{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Features */}
                    <div ref={featuresRef} className="bg-gradient-to-br from-gray-900/50 to-black border border-gray-800 rounded-2xl p-8">
                      <h2 className="text-3xl font-bold mb-6 text-white">{t('courseDetail.includes')}</h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {course.features?.map((feature, idx) => (
                          <div key={idx} className="flex items-start gap-3">
                            <div className="p-2 rounded-lg bg-gradient-to-r from-primary/20 to-red-600/20">
                              <CheckCircle className="w-5 h-5 text-primary" />
                            </div>
                            <div>
                              <h4 className="font-semibold text-white mb-1">{feature}</h4>
                              <p className="text-sm text-gray-400">{t('courseDetail.availableImmediately')}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Requirements */}
                    <div className="bg-gradient-to-br from-gray-900/50 to-black border border-gray-800 rounded-2xl p-8">
                      <h2 className="text-3xl font-bold mb-6 text-white">{t('courseDetail.requirements')}</h2>
                      <div className="space-y-3">
                        {course.requirements?.map((req, idx) => (
                          <div key={idx} className="flex items-center gap-3">
                            <div className="w-2 h-2 rounded-full bg-primary"></div>
                            <span className="text-gray-300">{req}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeTab === 'curriculum' && (
                  <motion.div
                    key="curriculum"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                  >
                    <CurriculumSection
                      lessons={course.lessons}
                      isPurchased={course.is_purchased}
                      onLessonClick={handleLessonClick}
                    />
                  </motion.div>
                )}

                {activeTab === 'instructor' && (
                  <motion.div
                    key="instructor"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="bg-gradient-to-br from-gray-900/50 to-black border border-gray-800 rounded-2xl p-8"
                  >
                    <div className="flex flex-col md:flex-row gap-8 items-start">
                      <div className="text-center md:text-left">
                        <div className="w-32 h-32 rounded-full bg-gradient-to-r from-primary to-red-600 flex items-center justify-center text-4xl mb-4 mx-auto md:mx-0">
                          {course.instructor?.avatar}
                        </div>
                        <h3 className="text-2xl font-bold text-white">{course.instructor?.name}</h3>
                        <p className="text-gray-400 mb-4">{course.instructor?.title}</p>
                      </div>
                      
                      <div className="flex-1">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                          <div className="p-4 rounded-xl bg-gray-900/50">
                            <div className="text-2xl font-bold text-white mb-1">{course.instructor?.rating}</div>
                            <div className="text-sm text-gray-400">{t('courseDetail.instructorStats.rating')}</div>
                          </div>
                          <div className="p-4 rounded-xl bg-gray-900/50">
                            <div className="text-2xl font-bold text-white mb-1">{course.instructor?.students?.toLocaleString()}</div>
                            <div className="text-sm text-gray-400">{t('courseDetail.instructorStats.students')}</div>
                          </div>
                          <div className="p-4 rounded-xl bg-gray-900/50">
                            <div className="text-2xl font-bold text-white mb-1">{course.instructor?.courses}</div>
                            <div className="text-sm text-gray-400">{t('courseDetail.instructorStats.courses')}</div>
                          </div>
                          <div className="p-4 rounded-xl bg-gray-900/50">
                            <div className="text-2xl font-bold text-white mb-1">15+</div>
                            <div className="text-sm text-gray-400">{t('courseDetail.instructorStats.years')}</div>
                          </div>
                        </div>
                        
                        <p className="text-gray-300 leading-relaxed">
                          {t('courseDetail.instructorBio')}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeTab === 'reviews' && (
                  <motion.div
                    key="reviews"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                  >
                    <div className="bg-gradient-to-br from-gray-900/50 to-black border border-gray-800 rounded-2xl p-8 mb-6">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
                        <div>
                          <h2 className="text-3xl font-bold text-white mb-2">{t('courseDetail.reviewsTitle')}</h2>
                          <div className="flex items-center gap-4">
                            <div className="text-5xl font-bold text-white">{course.stats?.rating || 4.8}</div>
                            <div>
                              <div className="flex items-center gap-1 mb-1">
                                {[...Array(5)].map((_, i) => (
                                  <Star key={i} className="w-5 h-5 text-yellow-500 fill-current" />
                                ))}
                              </div>
                              <div className="text-gray-400">
                                {t('courseDetail.reviewsBasedOn', { count: course.stats?.totalReviews || 342 })}
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <button className="px-6 py-3 bg-gradient-to-r from-primary to-red-600 rounded-xl font-semibold text-white hover:from-red-600 hover:to-primary transition-all">
                          {t('courseDetail.leaveReview')}
                        </button>
                      </div>
                      
                      {/* Review Stats */}
                      <div className="space-y-3 mb-8">
                        {[5, 4, 3, 2, 1].map(rating => (
                          <div key={rating} className="flex items-center gap-3">
                            <div className="flex items-center gap-1 w-16">
                              <span className="text-sm text-gray-400">{rating}</span>
                              <Star className="w-4 h-4 text-yellow-500 fill-current" />
                            </div>
                            <div className="flex-1 h-2 bg-gray-800 rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-gradient-to-r from-yellow-500 to-orange-500" 
                                style={{ width: `${(rating / 5) * 100}%` }}
                              />
                            </div>
                            <span className="text-sm text-gray-400 w-12 text-right">
                              {Math.round((rating / 5) * 100)}%
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    {/* Reviews List */}
                    <div className="space-y-6">
                      {course.reviews?.map(review => (
                        <div key={review.id} className="bg-gray-900/30 border border-gray-800 rounded-2xl p-6">
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center gap-4">
                              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-primary to-red-600 flex items-center justify-center text-xl">
                                {review.avatar}
                              </div>
                              <div>
                                <div className="font-bold text-white">{review.user}</div>
                                <div className="text-sm text-gray-400">{review.date}</div>
                              </div>
                            </div>
                            <div className="flex items-center gap-1">
                              {[...Array(review.rating)].map((_, i) => (
                                <Star key={i} className="w-4 h-4 text-yellow-500 fill-current" />
                              ))}
                            </div>
                          </div>
                          
                          <p className="text-gray-300 mb-4">{review.comment}</p>
                          
                          <div className="flex items-center justify-between">
                            <button className="text-sm text-gray-400 hover:text-white flex items-center gap-1">
                              <span>👍</span>
                              <span>{t('courseDetail.helpful', { count: review.helpful })}</span>
                            </button>
                            <button className="text-sm text-gray-400 hover:text-white">
                              {t('courseDetail.reply')}
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {activeTab === 'faq' && (
                  <motion.div
                    key="faq"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                  >
                    <div className="bg-gradient-to-br from-gray-900/50 to-black border border-gray-800 rounded-2xl p-8">
                      <h2 className="text-3xl font-bold mb-6 text-white">{t('courseDetail.faqTitle')}</h2>
                      <div className="space-y-4">
                        {[
                          {
                            q: t('courseDetail.faqItems.0.q'),
                            a: t('courseDetail.faqItems.0.a')
                          },
                          {
                            q: t('courseDetail.faqItems.1.q'),
                            a: t('courseDetail.faqItems.1.a')
                          },
                          {
                            q: t('courseDetail.faqItems.2.q'),
                            a: t('courseDetail.faqItems.2.a')
                          },
                          {
                            q: t('courseDetail.faqItems.3.q'),
                            a: t('courseDetail.faqItems.3.a')
                          }
                        ].map((faq, idx) => (
                          <div key={idx} className="border-b border-gray-800 last:border-0 pb-4 last:pb-0">
                            <div className="text-lg font-semibold text-white mb-2">{faq.q}</div>
                            <p className="text-gray-400">{faq.a}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Right Column - Sidebar */}
            <div className="space-y-6">
              {/* Course Details */}
              <div className="bg-gradient-to-br from-gray-900/50 to-black border border-gray-800 rounded-2xl p-6">
                <h3 className="font-bold text-lg mb-4">{t('courseDetail.detailsTitle')}</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-blue-500" />
                    <div>
                      <div className="text-sm text-gray-400">{t('courseDetail.stats.duration')}</div>
                      <div className="font-semibold text-white">{course.duration_hours} {t('courses.hours')}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <BookOpen className="w-5 h-5 text-green-500" />
                    <div>
                      <div className="text-sm text-gray-400">{t('courseDetail.stats.lessons')}</div>
                      <div className="font-semibold text-white">{course.lessons_count}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Users className="w-5 h-5 text-purple-500" />
                    <div>
                      <div className="text-sm text-gray-400">{t('courseDetail.stats.students')}</div>
                      <div className="font-semibold text-white">{course.stats?.studentsEnrolled?.toLocaleString()}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <TrendingUp className="w-5 h-5 text-yellow-500" />
                    <div>
                      <div className="text-sm text-gray-400">{t('courseDetail.stats.level')}</div>
                      <div className="font-semibold text-white">
                        {course.level === 'beginner' ? t('courses.beginner') : 
                         course.level === 'intermediate' ? t('courses.intermediate') : t('courses.advanced')}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Related Courses */}
              <div className="bg-gradient-to-br from-gray-900/50 to-black border border-gray-800 rounded-2xl p-6">
                <h3 className="font-bold text-lg mb-4">{t('courseDetail.relatedTitle')}</h3>
                <div className="space-y-4">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-800/50 transition-colors">
                      <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                        <span className="text-2xl">🥊</span>
                      </div>
                      <div>
                        <div className="font-semibold text-white text-sm mb-1">{t('courseDetail.relatedCourse', { index: i })}</div>
                        <div className="text-xs text-gray-400">{t('courseDetail.relatedPrice')}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Support */}
              <div className="bg-gradient-to-br from-blue-600/10 to-cyan-600/10 border border-blue-600/30 rounded-2xl p-6">
                <div className="text-center">
                  <HelpCircle className="w-12 h-12 text-blue-500 mx-auto mb-4" />
                  <h3 className="font-bold text-lg mb-2 text-white">{t('courseDetail.supportTitle')}</h3>
                  <p className="text-gray-300 text-sm mb-4">{t('courseDetail.supportSubtitle')}</p>
                  <button className="w-full py-2 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-lg text-white font-semibold hover:from-cyan-600 hover:to-blue-600 transition-all">
                    {t('courseDetail.supportCta')}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Course Player Modal */}
      <AnimatePresence>
        {showPlayer && selectedLesson && (
          <CoursePlayer
            lesson={selectedLesson}
            course={course}
            onClose={() => {
              setShowPlayer(false)
              setSelectedLesson(null)
            }}
          />
        )}
      </AnimatePresence>
    </div>
  )
}