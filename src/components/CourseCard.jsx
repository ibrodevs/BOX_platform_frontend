import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Star, Clock, BookOpen, Tag } from 'lucide-react'

const levelLabels = {
  beginner: 'Beginner',
  intermediate: 'Intermediate',
  pro: 'Pro'
}

const levelColors = {
  beginner: 'bg-green-600',
  intermediate: 'bg-yellow-600',
  pro: 'bg-red-600'
}

export default function CourseCard({ course }) {
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
          {course.price.toLocaleString()} с
        </div>
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
            <span className="text-xs text-gray-500">({course.reviews_count} отзывов)</span>
          </div>
        )}
        
        {/* Stats */}
        <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
          <div className="flex items-center gap-1">
            <BookOpen className="w-4 h-4" />
            <span>{course.lessons_count} уроков</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>{course.duration_hours}ч</span>
          </div>
        </div>

        <Link
          to={`/courses/${course.slug}`}
          className="block w-full text-center btn-primary"
        >
          Подробнее
        </Link>
      </div>
    </motion.div>
  )
}
