import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { Star, Clock, BookOpen, Tag, Check, ShoppingCart, Play } from 'lucide-react'
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
  const [purchasing, setPurchasing] = useState(false)
  
  useEffect(() => {
    // Проверяем, куплен ли курс
    setIsPurchased(purchaseUtils.isPurchased(course.id))
  }, [course.id])
  
  const handleQuickPurchase = async (e) => {
    e.preventDefault()
    e.stopPropagation()
    
    setPurchasing(true)
    
    try {
      // Имитируем процесс оплаты
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Покупаем курс
      purchaseUtils.purchaseCourse(course.id)
      
      setIsPurchased(true)
      alert('🎉 Курс успешно куплен!')
    } catch (error) {
      alert('Ошибка при покупке')
    } finally {
      setPurchasing(false)
    }
  }
  
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
        <div className="absolute top-3 right-3 bg-red-600 px-3 py-1 rounded-full text-sm font-bold">
          {isPurchased ? (
            <span className="flex items-center gap-1">
              <Check className="w-4 h-4" />
              Куплен
            </span>
          ) : (
            `${course.price.toLocaleString()} с`
          )}
        </div>
        
        {isPurchased && (
          <div className="absolute inset-0 bg-gradient-to-br from-green-600/20 to-transparent pointer-events-none" />
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Category */}
        {course.category && (
          <div className="flex items-center gap-2 text-xs text-red-500 mb-2">
            <Tag className="w-3 h-3" />
            {course.category}
          </div>
        )}
        
        <h3 className="text-xl font-bold mb-2 line-clamp-2">{course.title}</h3>
        <p className="text-gray-400 mb-4 line-clamp-2 text-sm">{course.description}</p>
        
        {/* Rating */}
        {course.rating > 0 && (
          <div className="flex items-center gap-2 mb-3">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 text-yellow-500 fill-current" />
              <span className="text-sm font-semibold">{course.rating}</span>
            </div>
            <span className="text-xs text-gray-500">({course.reviews_count} {t('courseDetail.reviews', { defaultValue: 'отзывов' })})</span>
          </div>
        )}
        
        {/* Stats */}
        <div className="flex items-center gap-4 mb-4 text-sm text-gray-400">
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>{course.duration_hours}{t('courses.hours', { defaultValue: 'ч' })}</span>
          </div>
          <div className="flex items-center gap-1">
            <BookOpen className="w-4 h-4" />
            <span>{course.lessons_count || 0} {t('courses.lessons', { defaultValue: 'уроков' })}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          {isPurchased ? (
            <Link
              to={`/courses/${course.slug}`}
              className="flex-1 text-center btn-primary"
            >
              {t('common.view', { defaultValue: 'Открыть курс' })}
            </Link>
          ) : (
            <>
              {/* Кнопка смотреть бесплатно */}
              {course.lessons && course.lessons.filter(l => l.is_free).length > 0 && (
                <Link
                  to={`/lessons/${course.lessons.find(l => l.is_free)?.id}`}
                  className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-600 text-white font-semibold py-3 rounded-lg transition-all duration-300"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Play className="w-4 h-4" />
                  Смотреть
                </Link>
              )}
              
              <button
                onClick={handleQuickPurchase}
                disabled={purchasing}
                className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-primary to-red-600 hover:from-red-600 hover:to-primary text-white font-semibold py-3 rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {purchasing ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    >
                      ⚡
                    </motion.div>
                    Покупка...
                  </>
                ) : (
                  <>
                    <ShoppingCart className="w-4 h-4" />
                    Купить
                  </>
                )}
              </button>
            </>
          )}
        </div>
      </div>
    </motion.div>
  )
}
