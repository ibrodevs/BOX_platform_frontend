import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { Star, Clock, BookOpen, Check, Play, Shield } from 'lucide-react'
import { useState, useEffect } from 'react'
import { purchaseUtils } from '../utils/purchaseUtils'

const levelColors = {
  beginner: 'bg-slate-900',
  intermediate: 'bg-slate-700',
  pro: 'bg-slate-800'
}

export default function CourseCard({ course }) {
  const { t } = useTranslation()
  const [isPurchased, setIsPurchased] = useState(false)
  
  useEffect(() => {
    // Проверяем, куплен ли курс (для визуального индикатора, если применимо)
    setIsPurchased(purchaseUtils.isPurchased(course.id))
  }, [course.id])
  
  const levelLabels = {
    beginner: t('courses.beginner'),
    intermediate: t('courses.intermediate'),
    pro: t('courses.advanced')
  }
  
  return (
    <motion.div
      whileHover={{ y: -10 }}
      className="card overflow-hidden group h-full flex flex-col"
    >
      {/* Image */}
      <div className="relative h-44 sm:h-48 bg-slate-100">
        {course.cover_image ? (
          <img
            src={course.cover_image}
            alt={course.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <div className="w-12 h-12 rounded-2xl bg-slate-900 flex items-center justify-center">
              <Shield className="w-6 h-6 text-white" />
            </div>
          </div>
        )}
        
        {/* Level Badge */}
        <div className={`absolute top-2 sm:top-3 left-2 sm:left-3 ${levelColors[course.level]} px-2 sm:px-3 py-1 rounded-full text-xs font-bold text-white`}>
          {levelLabels[course.level]}
        </div>
        
        {/* Price */}
        <div className="absolute top-2 sm:top-3 right-2 sm:right-3 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-bold" style={{ background: isPurchased ? undefined : 'transparent' }}>
          {isPurchased ? (
            <span className="flex items-center gap-1 bg-slate-900 px-2 sm:px-3 py-1 rounded-full text-white text-xs">
              <Check className="w-3 sm:w-4 h-3 sm:h-4" />
              {t('courses.purchased')}
            </span>
          ) : (
            <span className="bg-primary px-2 sm:px-3 py-1 rounded-full text-white">
              { (course.price === 0 || course.isFree) ? (t('courses.free') || 'Free') : `${course.price.toLocaleString()} ${t('common.currency')}` }
            </span>
          )}
        </div>
        
        {isPurchased && (
          <div className="absolute inset-0 bg-slate-900/10 pointer-events-none" />
        )}
      </div>

      {/* Content */}
      <div className="p-4 sm:p-6 flex-1 flex flex-col">
        {/* Category removed */}
        
        <h3 className="text-lg sm:text-xl font-bold mb-2 line-clamp-2 group-hover:text-slate-900">{course.title}</h3>
        <p className="text-gray-600 mb-3 sm:mb-4 line-clamp-2 text-sm group-hover:text-slate-600">{course.description}</p>
        
        {/* Rating */}
        {course.rating > 0 && (
          <div className="flex items-center gap-2 mb-3">
            <div className="flex items-center gap-1">
              <Star className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-yellow-500 fill-current" />
              <span className="text-sm font-semibold group-hover:text-slate-900">{course.rating}</span>
            </div>
            <span className="text-xs text-gray-500 group-hover:text-slate-500">{t('courseDetail.reviewsCount_one', { count: course.reviews_count })}</span>
          </div>
        )}
        
        {/* Stats */}
        <div className="flex items-center gap-3 sm:gap-4 mb-4 text-xs sm:text-sm text-gray-400 group-hover:text-slate-500">
          <div className="flex items-center gap-1">
            <Clock className="w-3.5 sm:w-4 h-3.5 sm:h-4" />
            <span>{course.duration_hours} {t('courses.hoursShort')}</span>
          </div>
          <div className="flex items-center gap-1">
            <BookOpen className="w-3.5 sm:w-4 h-3.5 sm:h-4" />
            <span>{t('courses.lessonsCount', { count: course.lessons_count || 0 })}</span>
          </div>
        </div>

        {/* Single Watch Button */}
        <div className="flex gap-2 mt-auto">
          {(() => {
            const firstFree = course.lessons && course.lessons.find(l => l.is_free || l.isFree)
            const to = firstFree ? `/lessons/${firstFree.id}` : `/courses/${course.slug}`
            return (
              <Link
                  to={to}
                  onClick={() => console.log('CourseCard: navigate to', to)}
                  className="flex-1 flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-white font-semibold py-2.5 sm:py-3 rounded-lg transition-colors text-sm sm:text-base"
                >
                  <Play className="w-3.5 sm:w-4 h-3.5 sm:h-4" />
                  {t('courses.watch') || 'Смотреть'}
                </Link>
            )
          })()}
        </div>
      </div>
    </motion.div>
  )
}
