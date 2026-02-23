import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { Star, Clock, BookOpen, Check, Play } from 'lucide-react'
import { useState, useEffect } from 'react'
import { purchaseUtils } from '../utils/purchaseUtils'

const levelColors = {
  beginner: 'bg-green-600',
  intermediate: 'bg-yellow-600',
  pro: 'bg-red-600'
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
      className="card overflow-hidden"
    >
      {/* Image */}
      <div className="relative h-48 bg-gray-900">
        {course.cover_image ? (
          <img
            src={course.cover_image}
            alt={course.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-6xl">
            🥊
          </div>
        )}
        
        {/* Level Badge */}
        <div className={`absolute top-3 left-3 ${levelColors[course.level]} px-3 py-1 rounded-full text-xs font-bold text-white`}>
          {levelLabels[course.level]}
        </div>
        
        {/* Price */}
        <div className="absolute top-3 right-3 px-3 py-1 rounded-full text-sm font-bold" style={{ background: isPurchased ? undefined : 'transparent' }}>
          {isPurchased ? (
            <span className="flex items-center gap-1 bg-green-600 px-3 py-1 rounded-full text-white">
              <Check className="w-4 h-4" />
              {t('courses.purchased')}
            </span>
          ) : (
            <span className="bg-red-600 px-3 py-1 rounded-full text-white">
              { (course.price === 0 || course.isFree) ? (t('courses.free') || 'Free') : `${course.price.toLocaleString()} ${t('common.currency')}` }
            </span>
          )}
        </div>
        
        {isPurchased && (
          <div className="absolute inset-0 bg-gradient-to-br from-green-600/20 to-transparent pointer-events-none" />
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Category removed */}
        
        <h3 className="text-xl font-bold mb-2 line-clamp-2">{course.title}</h3>
        <p className="text-gray-400 mb-4 line-clamp-2 text-sm">{course.description}</p>
        
        {/* Rating */}
        {course.rating > 0 && (
          <div className="flex items-center gap-2 mb-3">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 text-yellow-500 fill-current" />
              <span className="text-sm font-semibold">{course.rating}</span>
            </div>
            <span className="text-xs text-gray-500">{t('courseDetail.reviewsCount_one', { count: course.reviews_count })}</span>
          </div>
        )}
        
        {/* Stats */}
        <div className="flex items-center gap-4 mb-4 text-sm text-gray-400">
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>{course.duration_hours} {t('courses.hoursShort')}</span>
          </div>
          <div className="flex items-center gap-1">
            <BookOpen className="w-4 h-4" />
            <span>{t('courses.lessonsCount', { count: course.lessons_count || 0 })}</span>
          </div>
        </div>

        {/* Single Watch Button */}
        <div className="flex gap-2">
          {(() => {
            const firstFree = course.lessons && course.lessons.find(l => l.is_free || l.isFree)
            const to = firstFree ? `/lessons/${firstFree.id}` : `/courses/${course.slug}`
            return (
              <Link
                  to={to}
                  onClick={() => console.log('CourseCard: navigate to', to)}
                  className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-primary to-red-600 hover:from-red-600 hover:to-primary text-white font-semibold py-3 rounded-lg transition-all duration-300"
                >
                  <Play className="w-4 h-4" />
                  {t('courses.watch') || 'Смотреть'}
                </Link>
            )
          })()}
        </div>
      </div>
    </motion.div>
  )
}
