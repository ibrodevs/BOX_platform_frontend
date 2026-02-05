import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { 
  Play, Clock, BookOpen, Award, Star, TrendingUp, 
  CheckCircle, Calendar, Download, ChevronRight, Trophy,
  Target, Zap
} from 'lucide-react'
import CourseProgress from './CourseProgress'
import { useTranslation } from 'react-i18next'

export default function MyCourseCard({ course, index = 0 }) {
  const { t, i18n } = useTranslation()
  const progressPercentage = course.progress || 0
  const isCompleted = progressPercentage >= 100
  const isStarted = progressPercentage > 0

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -8 }}
      className="relative group bg-gradient-to-br from-gray-900/90 to-black backdrop-blur-sm rounded-2xl border border-gray-800 overflow-hidden hover:border-primary/50 transition-all duration-300"
    >
      {/* Glow Effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-red-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* Status Badge */}
      <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
        {isCompleted ? (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="px-3 py-1 rounded-full bg-gradient-to-r from-green-500 to-emerald-600 flex items-center gap-1 shadow-lg"
          >
            <CheckCircle className="w-3 h-3 text-white" />
            <span className="text-xs font-bold text-white">{t('myCourses.status.completed')}</span>
          </motion.div>
        ) : isStarted ? (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="px-3 py-1 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center gap-1 shadow-lg"
          >
            <Play className="w-3 h-3 text-white" />
            <span className="text-xs font-bold text-white">{t('myCourses.status.inProgress')}</span>
          </motion.div>
        ) : (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="px-3 py-1 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center gap-1 shadow-lg"
          >
            <Zap className="w-3 h-3 text-white" />
            <span className="text-xs font-bold text-white">{t('myCourses.status.new')}</span>
          </motion.div>
        )}
        
        {/* Certificate Badge */}
        {course.isCertified && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="px-3 py-1 rounded-full bg-gradient-to-r from-yellow-500 to-orange-500 flex items-center gap-1 shadow-lg"
          >
            <Award className="w-3 h-3 text-white" />
            <span className="text-xs font-bold text-white">{t('myCourses.certificate')}</span>
          </motion.div>
        )}
      </div>
      
      {/* Image Section */}
      <Link to={`/courses/${course.slug}`}>
        <div className="relative h-56 bg-gradient-to-br from-gray-900 to-black overflow-hidden">
          <motion.img
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.5 }}
            src={course.thumbnail || course.cover_image}
            alt={course.title}
            className="w-full h-full object-cover"
          />
          
          {/* Play Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-center justify-center"
          >
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="w-16 h-16 rounded-full bg-gradient-to-r from-primary to-red-600 flex items-center justify-center shadow-2xl shadow-primary/50"
            >
              <Play className="w-6 h-6 text-white ml-1" />
            </motion.div>
          </motion.div>
          
          {/* Last Accessed */}
          {course.lastAccessed && (
            <div className="absolute bottom-4 left-4 px-3 py-1 rounded-lg bg-black/60 backdrop-blur-sm">
              <div className="flex items-center gap-2">
                <Calendar className="w-3 h-3 text-gray-400" />
                <span className="text-xs text-gray-300">
                  {new Date(course.lastAccessed).toLocaleDateString(i18n.language || 'ru')}
                </span>
              </div>
            </div>
          )}
        </div>
      </Link>
      
      {/* Content */}
      <div className="p-6 relative">
        {/* Category & Level */}
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-semibold text-primary uppercase tracking-wider">
            {course.category || t('common.course')}
          </span>
          <div className={`px-2 py-1 rounded-lg text-xs font-bold ${
            course.level === 'beginner' ? 'bg-green-600/20 text-green-400' :
            course.level === 'intermediate' ? 'bg-yellow-600/20 text-yellow-400' :
            course.level === 'advanced' ? 'bg-red-600/20 text-red-400' :
            'bg-purple-600/20 text-purple-400'
          }`}>
            {course.level === 'beginner' ? t('courses.beginner') :
             course.level === 'intermediate' ? t('courses.intermediate') :
             course.level === 'advanced' ? t('courses.advanced') : t('courses.pro')}
          </div>
        </div>
        
        {/* Title */}
        <Link to={`/courses/${course.slug}`}>
          <h3 className="text-xl font-bold text-white mb-2 line-clamp-2 group-hover:text-primary transition-colors">
            {course.title}
          </h3>
        </Link>
        
        {/* Description */}
        <p className="text-sm text-gray-400 mb-4 line-clamp-2">
          {course.description}
        </p>
        
        {/* Progress Bar */}
        <div className="mb-4">
          <CourseProgress
            completed={course.completed_lessons || 0}
            total={course.total_lessons || 12}
            showLabel
          />
        </div>
        
        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 mb-4">
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <BookOpen className="w-4 h-4 text-blue-500" />
            <span>{t('courses.lessonsCount', { count: course.total_lessons || 12 })}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <Clock className="w-4 h-4 text-green-500" />
            <span>{course.duration || t('myCourses.defaultDuration', { hours: 8 })}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <Star className="w-4 h-4 text-yellow-500 fill-current" />
            <span>{course.rating || 4.8}</span>
          </div>
        </div>
        
        {/* Next Lesson */}
        {course.nextLesson && !isCompleted && (
          <div className="mb-4 p-3 rounded-lg bg-gray-900/50 border border-gray-800">
            <div className="text-xs text-gray-400 mb-1">{t('myCourses.nextLesson')}</div>
            <div className="text-sm font-semibold text-white">{course.nextLesson}</div>
          </div>
        )}
        
        {/* Upcoming Lesson Schedule */}
        {course.upcomingLesson && !isCompleted && (
          <div className="mb-4 p-3 rounded-lg bg-blue-600/10 border border-blue-600/30">
            <div className="flex items-center gap-2 mb-1">
              <Calendar className="w-4 h-4 text-blue-500" />
              <span className="text-xs text-blue-400 font-semibold">{t('myCourses.scheduled')}</span>
            </div>
            <div className="text-sm font-semibold text-white">{course.upcomingLesson.title}</div>
            <div className="text-xs text-gray-400 mt-1">{course.upcomingLesson.scheduled}</div>
          </div>
        )}
        
        {/* Certification Progress */}
        {course.isCertified && course.certificationProgress !== undefined && (
          <div className="mb-4">
            <div className="flex items-center justify-between text-xs mb-2">
              <span className="text-gray-400 flex items-center gap-1">
                <Trophy className="w-3 h-3 text-yellow-500" />
                {t('myCourses.certificationProgress')}
              </span>
              <span className="text-yellow-500 font-semibold">{course.certificationProgress}%</span>
            </div>
            <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${course.certificationProgress}%` }}
                transition={{ duration: 1, delay: 0.3 }}
                className="h-full bg-gradient-to-r from-yellow-500 to-orange-500"
              />
            </div>
          </div>
        )}
        
        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          <Link
            to={`/courses/${course.slug}`}
            className="flex-1"
          >
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-primary to-red-600 text-white font-semibold flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-primary/50 transition-all relative overflow-hidden group"
            >
              {isCompleted ? (
                <>
                  <CheckCircle className="w-5 h-5" />
                  <span>{t('myCourses.actions.repeat')}</span>
                </>
              ) : isStarted ? (
                <>
                  <Play className="w-5 h-5" />
                  <span>{t('myCourses.actions.continue')}</span>
                </>
              ) : (
                <>
                  <Play className="w-5 h-5" />
                  <span>{t('myCourses.actions.start')}</span>
                </>
              )}
              
              {/* Shine effect */}
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
            </motion.button>
          </Link>
          
          {/* Download Materials Button */}
          {course.hasMaterials && (
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="w-12 h-12 rounded-xl bg-gray-800 hover:bg-gray-700 flex items-center justify-center transition-colors"
              title={t('myCourses.actions.downloadMaterials')}
            >
              <Download className="w-5 h-5 text-gray-400" />
            </motion.button>
          )}
        </div>
        
        {/* Instructor */}
        {course.instructor && (
          <div className="mt-4 pt-4 border-t border-gray-800">
            <div className="flex items-center justify-between">
              <div className="text-xs text-gray-400">
                {t('myCourses.instructor')} <span className="text-white font-semibold">{course.instructor}</span>
              </div>
              {course.students && (
                <div className="flex items-center gap-1 text-xs text-gray-400">
                  <Target className="w-3 h-3" />
                  <span>{course.students.toLocaleString()} {t('courses.students')}</span>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
      
      {/* Completion Badge */}
      {isCompleted && (
        <div className="absolute -top-2 -right-2">
          <motion.div
            animate={{ rotate: [0, 10, 0, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-12 h-12 rounded-full bg-gradient-to-r from-green-500 to-emerald-600 flex items-center justify-center shadow-lg"
          >
            <Trophy className="w-6 h-6 text-white" />
          </motion.div>
        </div>
      )}
    </motion.div>
  )
}
