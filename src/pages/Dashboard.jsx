import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { 
  TrendingUp, Award, Clock, BookOpen, Target, Trophy,
  Calendar, Star, Zap, Crown, TrendingDown, Users,
  BarChart3, ChevronRight, Play, Bell, Download,
  Clock as ClockIcon, TrendingUp as TrendingUpIcon,
  Book, Shield, Heart, Settings, LogOut, User,
  ShoppingBag, HelpCircle, Sparkles
} from 'lucide-react'
import { getMyCourses } from '../services/apiService'
import Loader from '../components/ui/Loader'
import CourseProgress from '../components/courses/CourseProgress'

export default function Dashboard() {
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState({
    totalCourses: 0,
    completedCourses: 0,
    totalLessons: 0,
    completedLessons: 0,
    streak: 7,
    rank: 'Новичок',
    xp: 1250,
    nextLevelXp: 2000,
    weeklyProgress: 65,
    monthlyGoals: 3
  })
  const [recentCourses, setRecentCourses] = useState([])
  const [dailyTip, setDailyTip] = useState('')
  const [showNotifications, setShowNotifications] = useState(false)
  const [notifications, setNotifications] = useState([
    { id: 1, type: 'success', title: 'Урок завершён', message: 'Вы завершили урок "Базовая стойка"', time: '2 часа назад', read: false },
    { id: 2, type: 'info', title: 'Новый курс доступен', message: 'Курс "Продвинутая техника" теперь в вашей библиотеке', time: '1 день назад', read: false },
    { id: 3, type: 'warning', title: 'Не пропустите тренировку', message: 'Ваша следующая тренировка запланирована на завтра', time: '2 дня назад', read: true },
  ])

  const tips = [
    'Занимайтесь утром для лучшей концентрации',
    'Пейте воду во время тренировки',
    'Не забывайте разминаться перед тренировкой',
    'Следите за дыханием во время ударов',
    'Регулярно растягивайтесь для гибкости'
  ]

  useEffect(() => {
    fetchDashboardData()
    setDailyTip(tips[Math.floor(Math.random() * tips.length)])
  }, [])

  const fetchDashboardData = async () => {
    try {
      const courses = await getMyCourses()
      
      // Используем реальные данные из API
      const enrichedCourses = courses.map(course => ({
        ...course,
        thumbnail: course.cover_image || course.thumbnail || 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?q=80&w=2069',
        progress: course.progress || 0, // Используем реальный прогресс из API
        lastAccessed: course.last_accessed ? new Date(course.last_accessed) : new Date(),
        difficulty: course.level || 'beginner',
        duration: `${course.duration_hours || 5} часов`,
        total_lessons: course.lessons_count || course.total_lessons || 12,
        completed_lessons: course.completed_lessons || 0
      }))

      // Calculate stats from real data
      let totalLessons = 0
      let completedLessons = 0
      
      enrichedCourses.forEach(course => {
        totalLessons += course.total_lessons
        completedLessons += course.completed_lessons
      })

      const newStats = {
        totalCourses: enrichedCourses.length,
        completedCourses: enrichedCourses.filter(c => c.progress >= 100).length,
        totalLessons,
        completedLessons,
        streak: Math.floor(Math.random() * 30) + 1, // TODO: получать с бэкенда
        rank: ['Новичок', 'Ученик', 'Боец', 'Чемпион', 'Мастер'][Math.floor(enrichedCourses.length / 2)],
        xp: completedLessons * 50, // 50 XP за урок
        nextLevelXp: 2000,
        weeklyProgress: Math.min(100, (completedLessons / totalLessons) * 100),
        monthlyGoals: enrichedCourses.filter(c => c.progress >= 100).length,
        totalHours: enrichedCourses.reduce((acc, course) => acc + parseInt(course.duration_hours || 0), 0)
      }

      setStats(newStats)
      setRecentCourses(enrichedCourses.slice(0, 3))
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleMarkAsRead = (id) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, read: true } : notif
      )
    )
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
    return <Loader fullScreen />
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black py-20">
      <div className="container-custom">
        {/* Header */}
        <motion.div
          variants={staggerContainer}
          initial="initial"
          animate="animate"
          className="mb-12"
        >
          <motion.div variants={fadeInUp} className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
            <div>
              <h1 className="text-4xl md:text-5xl font-black mb-2">
                <span className="bg-gradient-to-r from-primary via-white to-primary bg-[length:200%_auto] bg-clip-text text-transparent">
                  Личный кабинет
                </span>
              </h1>
              <p className="text-gray-400">Добро пожаловать в вашу учебную панель</p>
            </div>
            
            <div className="flex items-center gap-4">
            </div>
          </motion.div>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          variants={staggerContainer}
          initial="initial"
          animate="animate"
          className="mb-12"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[
              {
                icon: Trophy,
                title: 'Текущий ранг',
                value: stats.rank,
                color: 'from-yellow-500 to-orange-500',
                progress: (stats.xp / stats.nextLevelXp) * 100,
                subtext: `${stats.xp} XP / ${stats.nextLevelXp} XP`
              },
              {
                icon: ClockIcon,
                title: 'Дней подряд',
                value: `${stats.streak} дней`,
                color: 'from-green-500 to-emerald-600',
                progress: (stats.streak / 30) * 100,
                subtext: 'Рекорд: 30 дней'
              },
              {
                icon: TrendingUpIcon,
                title: 'Прогресс за неделю',
                value: `${stats.weeklyProgress}%`,
                color: 'from-blue-500 to-cyan-500',
                progress: stats.weeklyProgress,
                subtext: '+5% с прошлой недели'
              },
              {
                icon: Book,
                title: 'Всего часов',
                value: `${stats.totalHours}ч`,
                color: 'from-purple-500 to-pink-500',
                progress: 75,
                subtext: 'Цель: 100 часов'
              }
            ].map((stat, index) => (
              <motion.div
                key={stat.title}
                variants={fadeInUp}
                whileHover={{ y: -5 }}
                className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-900/50 to-black border border-gray-800 p-6 group"
              >
                <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${stat.color} rounded-full opacity-10 blur-xl group-hover:opacity-20 transition-opacity`} />
                
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-6">
                    <div className={`p-3 rounded-xl bg-gradient-to-br ${stat.color} bg-opacity-20`}>
                      <stat.icon className={`w-6 h-6 bg-gradient-to-br ${stat.color} bg-clip-text text-transparent`} />
                    </div>
                    <TrendingUp className="w-5 h-5 text-green-500" />
                  </div>
                  
                  <div className="mb-4">
                    <div className="text-3xl font-black text-white mb-1">{stat.value}</div>
                    <div className="text-sm text-gray-400">{stat.title}</div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>Прогресс</span>
                      <span>{Math.round(stat.progress)}%</span>
                    </div>
                    <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${stat.progress}%` }}
                        transition={{ duration: 1, delay: index * 0.1 }}
                        className={`h-full bg-gradient-to-r ${stat.color} rounded-full`}
                      />
                    </div>
                    <div className="text-xs text-gray-500">{stat.subtext}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Recent Courses */}
          <motion.div
            variants={fadeInUp}
            className="lg:col-span-2"
          >
            <div className="bg-gradient-to-br from-gray-900/50 to-black rounded-2xl border border-gray-800 p-6 mb-8">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-white mb-1">Продолжить обучение</h2>
                  <p className="text-gray-400">Возобновите с того места, где остановились</p>
                </div>
                <Link to="/dashboard/my-courses" className="text-primary hover:text-white transition-colors">
                  <ChevronRight className="w-6 h-6" />
                </Link>
              </div>

              {recentCourses.length > 0 ? (
                <div className="space-y-4">
                  {recentCourses.map((course, index) => (
                    <motion.div
                      key={course.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ x: 5 }}
                      className="group"
                    >
                      <Link to={`/courses/${course.slug}`}>
                        <div className="flex items-center gap-4 p-4 rounded-xl border border-gray-800 hover:border-primary/50 bg-gray-900/30 transition-all group-hover:bg-gray-800/50">
                          <div className="relative flex-shrink-0">
                            <div className="w-20 h-20 rounded-lg overflow-hidden">
                              <img
                                src={course.thumbnail}
                                alt={course.title}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                              />
                            </div>
                            <div className="absolute -top-2 -right-2">
                              <div className={`px-2 py-1 rounded-full text-xs font-bold ${
                                course.difficulty === 'beginner' ? 'bg-green-600' :
                                course.difficulty === 'intermediate' ? 'bg-yellow-600' :
                                'bg-red-600'
                              }`}>
                                {course.difficulty === 'beginner' ? 'Начальный' :
                                 course.difficulty === 'intermediate' ? 'Средний' : 'Продвинутый'}
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex-1">
                            <div className="flex justify-between items-start mb-2">
                              <h3 className="font-bold text-white group-hover:text-primary transition-colors">
                                {course.title}
                              </h3>
                              <div className="flex items-center gap-2">
                                <Clock className="w-4 h-4 text-gray-400" />
                                <span className="text-sm text-gray-400">{course.duration}</span>
                              </div>
                            </div>
                            
                            <CourseProgress
                              completed={course.completed_lessons}
                              total={course.total_lessons}
                              showLabel
                            />
                            
                            <div className="flex items-center justify-between mt-3">
                              <div className="flex items-center gap-4 text-sm text-gray-400">
                                <div className="flex items-center gap-1">
                                  <BookOpen className="w-4 h-4" />
                                  <span>{course.total_lessons} уроков</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <Calendar className="w-4 h-4" />
                                  <span>
                                    {course.lastAccessed 
                                      ? `${Math.floor((Date.now() - course.lastAccessed) / (1000 * 60 * 60 * 24))} дн. назад`
                                      : 'Недавно'
                                    }
                                  </span>
                                </div>
                              </div>
                              
                              <motion.div
                                whileHover={{ scale: 1.1 }}
                                className="w-10 h-10 rounded-full bg-gradient-to-r from-primary to-red-600 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                              >
                                <Play className="w-4 h-4 text-white ml-0.5" />
                              </motion.div>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-r from-primary/20 to-red-600/20 flex items-center justify-center">
                    <BookOpen className="w-10 h-10 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">Курсы не найдены</h3>
                  <p className="text-gray-400 mb-6">Начните свой путь к чемпионству с первого курса</p>
                  <Link to="/courses" className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary to-red-600 rounded-xl font-semibold text-white hover:from-red-600 hover:to-primary transition-all">
                    <Sparkles className="w-5 h-5" />
                    Выбрать курс
                  </Link>
                </div>
              )}
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { icon: Award, label: 'Завершено курсов', value: stats.completedCourses, color: 'text-green-500' },
                { icon: Target, label: 'Пройдено уроков', value: stats.completedLessons, color: 'text-blue-500' },
                { icon: Zap, label: 'Всего курсов', value: stats.totalCourses, color: 'text-yellow-500' },
                { icon: Users, label: 'Всего уроков', value: stats.totalLessons, color: 'text-purple-500' },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -3 }}
                  className="p-4 rounded-xl bg-gradient-to-br from-gray-900/50 to-black border border-gray-800"
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${stat.color.replace('text-', 'bg-')}/20`}>
                      <stat.icon className={`w-5 h-5 ${stat.color}`} />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-white">{stat.value}</div>
                      <div className="text-xs text-gray-400">{stat.label}</div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Column - Sidebar */}
          <motion.div
            variants={fadeInUp}
            className="space-y-6"
          >
            {/* Daily Tip */}
            <div className="bg-gradient-to-br from-primary/10 via-black/50 to-primary/10 rounded-2xl border border-gray-800 p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-xl bg-gradient-to-r from-blue-500/20 to-cyan-500/20">
                  <Sparkles className="w-6 h-6 text-blue-500" />
                </div>
                <h3 className="font-bold text-lg">Совет дня</h3>
              </div>
              <p className="text-gray-300 mb-4">{dailyTip}</p>
              <div className="flex items-center justify-between text-sm text-gray-500">
                <span>Обновляется ежедневно</span>
                <button className="text-primary hover:text-white transition-colors">
                  Показать еще
                </button>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-gradient-to-br from-gray-900/50 to-black rounded-2xl border border-gray-800 p-6">
              <h3 className="font-bold text-lg mb-4">Быстрые действия</h3>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { icon: BookOpen, label: 'Мои курсы', to: '/dashboard/my-courses', color: 'from-blue-500 to-cyan-500' },
                  { icon: User, label: 'Профиль', to: '/dashboard/profile', color: 'from-purple-500 to-pink-500' },
                  { icon: ShoppingBag, label: 'Магазин', to: '/merch', color: 'from-green-500 to-emerald-500' },
                  { icon: Trophy, label: 'Мои заказы', to: '/dashboard/orders', color: 'from-primary to-red-600' },
                  { icon: Download, label: 'Материалы', to: '/dashboard/materials', color: 'from-yellow-500 to-orange-500' },
                  { icon: HelpCircle, label: 'Помощь', to: '/help', color: 'from-red-500 to-pink-500' },
                ].map((action, index) => (
                  <motion.div
                    key={action.label}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ scale: 1.05 }}
                  >
                    <Link
                      to={action.to}
                      className={`block p-4 rounded-xl bg-gradient-to-br ${action.color} border border-transparent hover:border-white/20 transition-all`}
                    >
                      <action.icon className="w-6 h-6 text-white mb-2" />
                      <span className="text-sm font-medium text-white">{action.label}</span>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Monthly Goals */}
            <div className="bg-gradient-to-br from-gray-900/50 to-black rounded-2xl border border-gray-800 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-lg">Цели на месяц</h3>
                <div className="text-primary font-bold">{stats.monthlyGoals}/5</div>
              </div>
              
              <div className="space-y-4">
                {[
                  { label: 'Завершить 1 курс', completed: true },
                  { label: 'Тренироваться 15 дней подряд', completed: false },
                  { label: 'Пройди 20 уроков', completed: true },
                  { label: 'Пригласить друга', completed: false },
                  { label: 'Заработать 1000 XP', completed: true },
                ].map((goal, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                      goal.completed 
                        ? 'bg-green-600' 
                        : 'bg-gray-800 border border-gray-700'
                    }`}>
                      {goal.completed && <Check className="w-4 h-4 text-white" />}
                    </div>
                    <span className={`text-sm ${goal.completed ? 'text-gray-300' : 'text-gray-500'}`}>
                      {goal.label}
                    </span>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 pt-4 border-t border-gray-800">
                <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(stats.monthlyGoals / 5) * 100}%` }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="h-full bg-gradient-to-r from-primary to-red-600 rounded-full"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

// Helper components
const Check = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
  </svg>
)

const Info = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
)

const AlertCircle = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
)