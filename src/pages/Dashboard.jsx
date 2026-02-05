import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useMemo, useState } from 'react'
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
import { useTranslation } from 'react-i18next'

export default function Dashboard() {
  const { t } = useTranslation()
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState({
    totalCourses: 0,
    completedCourses: 0,
    totalLessons: 0,
    completedLessons: 0,
    streak: 7,
    rank: 'beginner',
    xp: 1250,
    nextLevelXp: 2000,
    weeklyProgress: 65,
    monthlyGoals: 3
  })
  const [recentCourses, setRecentCourses] = useState([])
  const [dailyTip, setDailyTip] = useState('')
  const [showNotifications, setShowNotifications] = useState(false)
  const [notifications, setNotifications] = useState([])

  const tips = useMemo(() => ([
    t('dashboardPage.tips.0'),
    t('dashboardPage.tips.1'),
    t('dashboardPage.tips.2'),
    t('dashboardPage.tips.3'),
    t('dashboardPage.tips.4')
  ]), [t])

  const notificationsData = useMemo(() => ([
    { id: 1, type: 'success', title: t('dashboardPage.notifications.0.title'), message: t('dashboardPage.notifications.0.message'), time: t('dashboardPage.notifications.0.time'), read: false },
    { id: 2, type: 'info', title: t('dashboardPage.notifications.1.title'), message: t('dashboardPage.notifications.1.message'), time: t('dashboardPage.notifications.1.time'), read: false },
    { id: 3, type: 'warning', title: t('dashboardPage.notifications.2.title'), message: t('dashboardPage.notifications.2.message'), time: t('dashboardPage.notifications.2.time'), read: true },
  ]), [t])

  useEffect(() => {
    fetchDashboardData()
    setDailyTip(tips[Math.floor(Math.random() * tips.length)])
    setNotifications(notificationsData)
  }, [tips, notificationsData])

  const fetchDashboardData = async () => {
    try {
      const response = await getMyCourses()
      const coursesData = response?.data?.results || response?.data || response || []
      const courses = Array.isArray(coursesData) ? coursesData : []
      
      // Используем реальные данные из API
      const enrichedCourses = courses.map(course => ({
        ...course,
        thumbnail: course.cover_image || course.thumbnail || 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?q=80&w=2069',
        progress: course.progress || 0, // Используем реальный прогресс из API
        lastAccessed: course.last_accessed ? new Date(course.last_accessed) : new Date(),
        difficulty: course.level || 'beginner',
        duration: `${course.duration_hours || 5} ${t('courses.hours')}`,
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
        rank: ['beginner', 'apprentice', 'fighter', 'champion', 'master'][Math.floor(enrichedCourses.length / 2)],
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
      console.error('Error details:', error.response?.data || error.message)
      // Устанавливаем пустой массив при ошибке
      setRecentCourses([])
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
                  {t('dashboardPage.title')}
                </span>
              </h1>
              <p className="text-gray-400">{t('dashboardPage.subtitle')}</p>
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
                title: t('dashboardPage.stats.currentRank'),
                value: t(`dashboardPage.ranks.${stats.rank}`),
                color: 'from-yellow-500 to-orange-500',
                progress: (stats.xp / stats.nextLevelXp) * 100,
                subtext: t('dashboardPage.stats.rankProgress', { xp: stats.xp, next: stats.nextLevelXp })
              },
              {
                icon: ClockIcon,
                title: t('dashboardPage.stats.streak'),
                value: t('dashboardPage.stats.streakValue', { count: stats.streak }),
                color: 'from-green-500 to-emerald-600',
                progress: (stats.streak / 30) * 100,
                subtext: t('dashboardPage.stats.streakRecord')
              },
              {
                icon: TrendingUpIcon,
                title: t('dashboardPage.stats.weeklyProgress'),
                value: `${stats.weeklyProgress}%`,
                color: 'from-blue-500 to-cyan-500',
                progress: stats.weeklyProgress,
                subtext: t('dashboardPage.stats.weeklyDelta', { value: 5 })
              },
              {
                icon: Book,
                title: t('dashboardPage.stats.totalHours'),
                value: t('dashboardPage.stats.totalHoursValue', { hours: stats.totalHours }),
                color: 'from-purple-500 to-pink-500',
                progress: 75,
                subtext: t('dashboardPage.stats.totalHoursGoal', { hours: 100 })
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
                      <span>{t('dashboardPage.stats.progress')}</span>
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
                  <h2 className="text-2xl font-bold text-white mb-1">{t('dashboardPage.continueLearning.title')}</h2>
                  <p className="text-gray-400">{t('dashboardPage.continueLearning.subtitle')}</p>
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
                                {course.difficulty === 'beginner' ? t('courses.beginner') :
                                 course.difficulty === 'intermediate' ? t('courses.intermediate') : t('courses.advanced')}
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
                                  <span>{t('courses.lessonsCount', { count: course.total_lessons })}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <Calendar className="w-4 h-4" />
                                  <span>
                                    {course.lastAccessed 
                                      ? t('dashboardPage.lastAccessedDays', { days: Math.floor((Date.now() - course.lastAccessed) / (1000 * 60 * 60 * 24)) })
                                      : t('dashboardPage.lastAccessedRecent')
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
                  <h3 className="text-xl font-bold text-white mb-3">{t('dashboardPage.emptyCourses.title')}</h3>
                  <p className="text-gray-400 mb-6">{t('dashboardPage.emptyCourses.subtitle')}</p>
                  <Link to="/courses" className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary to-red-600 rounded-xl font-semibold text-white hover:from-red-600 hover:to-primary transition-all">
                    <Sparkles className="w-5 h-5" />
                    {t('dashboardPage.emptyCourses.cta')}
                  </Link>
                </div>
              )}
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { icon: Award, label: t('dashboardPage.quickStats.completedCourses'), value: stats.completedCourses, color: 'text-green-500' },
                { icon: Target, label: t('dashboardPage.quickStats.completedLessons'), value: stats.completedLessons, color: 'text-blue-500' },
                { icon: Zap, label: t('dashboardPage.quickStats.totalCourses'), value: stats.totalCourses, color: 'text-yellow-500' },
                { icon: Users, label: t('dashboardPage.quickStats.totalLessons'), value: stats.totalLessons, color: 'text-purple-500' },
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
                <h3 className="font-bold text-lg">{t('dashboardPage.dailyTip.title')}</h3>
              </div>
              <p className="text-gray-300 mb-4">{dailyTip}</p>
              <div className="flex items-center justify-between text-sm text-gray-500">
                <span>{t('dashboardPage.dailyTip.updated')}</span>
                <button className="text-primary hover:text-white transition-colors">
                  {t('dashboardPage.dailyTip.showMore')}
                </button>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-gradient-to-br from-gray-900/50 to-black rounded-2xl border border-gray-800 p-6">
              <h3 className="font-bold text-lg mb-4">{t('dashboardPage.quickActions.title')}</h3>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { icon: BookOpen, label: t('dashboardPage.quickActions.myCourses'), to: '/dashboard/my-courses', color: 'from-blue-500 to-cyan-500' },
                  { icon: User, label: t('dashboardPage.quickActions.profile'), to: '/dashboard/profile', color: 'from-purple-500 to-pink-500' },
                  { icon: ShoppingBag, label: t('dashboardPage.quickActions.shop'), to: '/merch', color: 'from-green-500 to-emerald-500' },
                  { icon: Trophy, label: t('dashboardPage.quickActions.orders'), to: '/dashboard/orders', color: 'from-primary to-red-600' },
                  { icon: Download, label: t('dashboardPage.quickActions.materials'), to: '/dashboard/materials', color: 'from-yellow-500 to-orange-500' },
                  { icon: HelpCircle, label: t('dashboardPage.quickActions.help'), to: '/help', color: 'from-red-500 to-pink-500' },
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
                <h3 className="font-bold text-lg">{t('dashboardPage.monthlyGoals.title')}</h3>
                <div className="text-primary font-bold">{stats.monthlyGoals}/5</div>
              </div>
              
              <div className="space-y-4">
                {[
                  { label: t('dashboardPage.monthlyGoals.items.0'), completed: true },
                  { label: t('dashboardPage.monthlyGoals.items.1'), completed: false },
                  { label: t('dashboardPage.monthlyGoals.items.2'), completed: true },
                  { label: t('dashboardPage.monthlyGoals.items.3'), completed: false },
                  { label: t('dashboardPage.monthlyGoals.items.4'), completed: true },
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