import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'

export default function LessonItem({ lesson, courseId, isLocked, isCompleted, index }) {
  const { t } = useTranslation()
  const content = (
    <div className="flex items-center gap-4">
      {/* Number */}
      <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg ${
        isCompleted ? 'bg-green-600' : isLocked ? 'bg-gray-800' : 'bg-primary'
      }`}>
        {isCompleted ? '✓' : index + 1}
      </div>

      {/* Info */}
      <div className="flex-1">
        <h4 className="text-lg font-bold mb-1">{lesson.title}</h4>
        <div className="flex items-center gap-4 text-sm text-gray-400">
          <span>⏱️ {lesson.duration_minutes} {t('common.minutesShort')}</span>
          {isCompleted && <span className="text-green-500">✓ {t('lesson.completed')}</span>}
          {lesson.is_free && <span className="text-primary">🎁 {t('courses.free')}</span>}
        </div>
      </div>

      {/* Action */}
      <div>
        {isLocked ? (
          <div className="flex items-center gap-2 text-gray-500">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
            </svg>
            <span className="text-sm">{t('lessonItem.locked')}</span>
          </div>
        ) : (
          <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        )}
      </div>
    </div>
  )

  if (isLocked && !lesson.is_free) {
    return (
      <div className="bg-dark border border-gray-800 p-4 rounded-lg opacity-60 cursor-not-allowed">
        {content}
      </div>
    )
  }

  return (
    <motion.div whileHover={{ x: 5 }}>
      <Link
        to={`/dashboard/lesson/${lesson.id}`}
        className="block bg-dark border border-gray-800 hover:border-primary p-4 rounded-lg transition-colors"
      >
        {content}
      </Link>
    </motion.div>
  )
}
