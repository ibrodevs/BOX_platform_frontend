import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import axios from 'axios'
import { 
  Search, Filter, Grid, List, Star, TrendingUp, Clock, 
  Users, Trophy, Zap, Target, Award, Sparkles, ChevronDown,
  Play, Shield, BookOpen, Heart, TrendingDown, Crown
} from 'lucide-react'
import CourseCard from '../components/CourseCard'
import Loader from '../components/ui/Loader'
import { getAllCourses } from '../data/staticLessons'

const API_URL = 'https://box-platform-backend.onrender.com/api'

export default function Courses() {
  const COURSES_PER_PAGE = 6
  const { t } = useTranslation()
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')
  const [error, setError] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [viewMode, setViewMode] = useState('grid')
  const [showFilters, setShowFilters] = useState(false)
  const [sortBy, setSortBy] = useState('popular')
  const [currentPage, setCurrentPage] = useState(1)
  const containerRef = useRef(null)

  useEffect(() => {
    fetchCourses()
  }, [])

  const fetchCourses = async () => {
    try {
      setLoading(true)
      
      // Сначала пробуем загрузить с API
      try {
        const response = await axios.get(`${API_URL}/courses/`)
        const data = response.data.results ? response.data.results : (Array.isArray(response.data) ? response.data : [])
        
        if (data.length > 0) {
          const enhancedData = data.map(course => ({
            ...course,
            rating: course.rating || (4.5 + Math.random() * 0.5),
            studentsCount: course.studentsCount || Math.floor(Math.random() * 1000) + 100,
            duration: course.duration || `${Math.floor(Math.random() * 10) + 1} часов`,
            isNew: Math.random() > 0.7,
            isBestseller: Math.random() > 0.8,
            // Force free
            price: 0,
            isFree: true,
            originalPrice: undefined
          }))
          
          setCourses(enhancedData)
          setError(null)
          return
        }
      } catch (apiError) {
        console.log('API не доступен, используем статичные данные')
      }
      
      // Если API недоступен или нет данных, используем статичные данные
      const staticData = getAllCourses(t).map(course => ({
        ...course,
        isNew: Math.random() > 0.7,
        isBestseller: Math.random() > 0.8,
        // Ensure static courses are free
        price: 0,
        isFree: true,
        originalPrice: undefined
      }))
      
      setCourses(staticData)
      setError(null)
    } catch (err) {
      console.error('Failed to fetch courses:', err)
      setError(t('coursesPage.errors.loadFailed'))
      
      // В случае ошибки всё равно показываем статичные данные
      const staticData = getAllCourses(t).map(course => ({
        ...course,
        isNew: Math.random() > 0.7,
        isBestseller: Math.random() > 0.8,
        // Ensure static courses are free on error
        price: 0,
        isFree: true,
        originalPrice: undefined
      }))
      setCourses(staticData)
    } finally {
      setLoading(false)
    }
  }

  // Фильтрация и поиск
  const filteredCourses = courses.filter(course => {
    // Поиск по названию и описанию
    const matchesSearch = searchTerm === '' || 
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.description.toLowerCase().includes(searchTerm.toLowerCase())
    
    // Фильтр по уровню
    const matchesFilter = filter === 'all' || course.level === filter
    
    return matchesSearch && matchesFilter
  })

  // Сортировка
  const sortedCourses = [...filteredCourses].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price
      case 'price-high':
        return b.price - a.price
      case 'rating':
        return b.rating - a.rating
      case 'students':
        return b.studentsCount - a.studentsCount
      case 'newest':
        return new Date(b.created_at) - new Date(a.created_at)
      default: // popular
        if (a.isBestseller && !b.isBestseller) return -1
        if (!a.isBestseller && b.isBestseller) return 1
        return b.rating - a.rating
    }
  })

  useEffect(() => {
    setCurrentPage(1)
  }, [searchTerm, filter, sortBy])

  const totalPages = Math.max(1, Math.ceil(sortedCourses.length / COURSES_PER_PAGE))

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages)
    }
  }, [currentPage, totalPages])

  const paginatedCourses = sortedCourses.slice(
    (currentPage - 1) * COURSES_PER_PAGE,
    currentPage * COURSES_PER_PAGE
  )

  const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1)

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
    <div ref={containerRef} className="min-h-screen bg-white text-gray-900">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="container-custom relative z-10">
          <motion.div
            variants={staggerContainer}
            initial="initial"
            animate="animate"
            className="text-center mb-12"
          >
            <motion.div variants={fadeInUp} className="inline-block mb-6">
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full border border-gray-200">
                <Sparkles className="w-4 h-4 text-gray-700" />
                <span className="text-gray-700 text-sm font-semibold">{t('coursesPage.hero.badge')}</span>
              </span>
            </motion.div>

            <motion.h1 
              variants={fadeInUp}
              className="text-5xl md:text-7xl font-black mb-6"
            >
              <span className="block text-gray-900">{t('coursesPage.hero.titleLine1')}</span>
              <span className="block text-gray-700">{t('coursesPage.hero.titleLine2')}</span>
            </motion.h1>

            <motion.p 
              variants={fadeInUp}
              className="text-xl text-gray-600 max-w-2xl mx-auto mb-10"
            >
              {t('coursesPage.hero.subtitle')}
            </motion.p>

            {/* Search Bar */}
            <motion.div
              variants={fadeInUp}
              className="relative max-w-3xl mx-auto"
            >
              <div className="relative">
                <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder={t('coursesPage.searchPlaceholder')}
                  className="w-full pl-14 pr-6 py-4 bg-white border border-gray-300 rounded-2xl text-gray-900 placeholder-gray-500 focus:outline-none focus:border-gray-600 transition-colors"
                />
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
                >
                  <Filter className="w-5 h-5" />
                </button>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Filters & Controls */}
      <section className="container-custom mb-12">
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <div className="bg-white/90 backdrop-blur-xl rounded-2xl border border-slate-200 p-6 mb-6 shadow-sm">
                {/* Categories removed */}
                
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <span className="text-slate-600">{t('common.sort')}:</span>
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="bg-white border border-gray-300 rounded-lg px-4 py-2 text-gray-900 focus:outline-none focus:border-gray-600"
                    >
                      <option value="popular">{t('coursesPage.sort.popular')}</option>
                      <option value="rating">{t('coursesPage.sort.rating')}</option>
                      <option value="students">{t('coursesPage.sort.students')}</option>
                      <option value="price-low">{t('coursesPage.sort.priceLow')}</option>
                      <option value="price-high">{t('coursesPage.sort.priceHigh')}</option>
                      <option value="newest">{t('coursesPage.sort.newest')}</option>
                    </select>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setViewMode('grid')}
                      className={`p-2 rounded-lg transition-colors ${
                        viewMode === 'grid' 
                          ? 'bg-gray-900 text-white' 
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      <Grid className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => setViewMode('list')}
                      className={`p-2 rounded-lg transition-colors ${
                        viewMode === 'list' 
                          ? 'bg-gray-900 text-white' 
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      <List className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* Main Content */}
      <section className="container-custom pb-20">
        {/* Error */}
        {error && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-slate-100 border border-slate-300 rounded-2xl p-6 mb-8"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Shield className="w-8 h-8 text-slate-700" />
                <div>
                  <p className="text-slate-900 font-semibold">{error}</p>
                  <p className="text-slate-600 text-sm">{t('coursesPage.errors.tryLater')}</p>
                </div>
              </div>
              <button 
                onClick={fetchCourses}
                className="px-4 py-2 bg-slate-900 hover:bg-slate-800 rounded-lg text-white font-semibold transition-colors"
              >
                {t('coursesPage.actions.refresh')}
              </button>
            </div>
          </motion.div>
        )}

        {/* Courses Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
          <div className="w-full md:w-auto">
            <h2 className="text-3xl font-bold text-slate-900">
              {t('coursesPage.results.found', { count: filteredCourses.length })}
            </h2>
            {searchTerm && (
              <p className="text-slate-600">
                {t('coursesPage.results.byQuery')} <span className="text-slate-900 font-semibold">{searchTerm}</span>
              </p>
            )}
          </div>
        </div>

        {/* Courses Grid/List */}
        {sortedCourses.length > 0 ? (
          <AnimatePresence mode="wait">
            {viewMode === 'grid' ? (
              <motion.div
                key="grid"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {paginatedCourses.map((course, idx) => (
                  <motion.div
                    key={course.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: idx * 0.05 }}
                    whileHover={{ y: -10 }}
                    className="relative group"
                  >
                    {/* Badges */}
                    {course.isNew && (
                      <div className="absolute top-4 left-4 z-10">
                        <span className="px-3 py-1 bg-slate-900 rounded-full text-xs font-bold text-white">
                          {t('coursesPage.badges.new')}
                        </span>
                      </div>
                    )}
                    {course.isBestseller && (
                      <div className="absolute top-4 right-4 z-10">
                        <span className="px-3 py-1 bg-slate-700 rounded-full text-xs font-bold text-white flex items-center gap-1">
                          <TrendingUp className="w-3 h-3" />
                          {t('coursesPage.badges.top')}
                        </span>
                      </div>
                    )}
                    
                    <CourseCard course={course} />
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div
                key="list"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-4"
              >
                {paginatedCourses.map((course, idx) => {
                  const firstFreeLesson = course.lessons?.find((lesson) => lesson.is_free || lesson.isFree)
                  const watchTarget = firstFreeLesson ? `/lessons/${firstFreeLesson.id}` : `/courses/${course.slug}`

                  return (
                  <motion.div
                    key={course.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    whileHover={{ x: 5 }}
                    className="bg-white border border-gray-200 rounded-2xl p-6 group hover:border-gray-300 transition-all duration-300"
                  >
                    <div className="flex flex-col md:flex-row md:items-center gap-6">
                      {/* Course Image */}
                      <div className="relative flex-shrink-0">
                        <div className="w-full md:w-64 h-48 rounded-xl overflow-hidden">
                          <img 
                            src={course.image || 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?q=80&w=2069'} 
                            alt={course.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                        </div>
                        
                        {/* Play Button Overlay */}
                        <div className="absolute inset-0 bg-gray-900/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                          <div className="w-16 h-16 rounded-full bg-gray-900 flex items-center justify-center">
                            <Play className="w-8 h-8 text-white" />
                          </div>
                        </div>
                      </div>
                      
                      {/* Course Info */}
                      <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-3 mb-3">
                          {course.isNew && (
                            <span className="px-3 py-1 bg-gray-900 rounded-full text-xs font-bold text-white">
                              {t('coursesPage.badges.new')}
                            </span>
                          )}
                          {course.isBestseller && (
                            <span className="px-3 py-1 bg-gray-700 rounded-full text-xs font-bold text-white flex items-center gap-1">
                              <TrendingUp className="w-3 h-3" />
                              {t('coursesPage.badges.topCourse')}
                            </span>
                          )}
                          <span className="px-3 py-1 bg-gray-100 rounded-full text-xs font-medium text-gray-700">
                            {course.level}
                          </span>
                        </div>
                        
                        <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-gray-700 transition-colors">
                          {course.title}
                        </h3>
                        <p className="text-gray-700 mb-4 line-clamp-2">
                          {course.description}
                        </p>
                        
                        <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600 mb-4">
                          <div className="flex items-center gap-2">
                            <Star className="w-4 h-4 text-yellow-500 fill-current" />
                            <span>{course.rating?.toFixed(1)}</span>
                            <span className="text-gray-600">({course.studentsCount})</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-gray-600" />
                            <span>{course.duration}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Users className="w-4 h-4 text-gray-600" />
                            <span>{course.studentsCount} {t('courses.students')}</span>
                          </div>
                          {/* category removed */}
                        </div>
                        
                        {/* Progress Bar (for enrolled users) */}
                        {course.progress && (
                          <div className="mb-4">
                            <div className="flex justify-between text-sm mb-1">
                              <span className="text-gray-600">{t('coursesPage.progress')}</span>
                              <span className="text-gray-900 font-semibold">{course.progress}%</span>
                            </div>
                            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                              <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${course.progress}%` }}
                                className="h-full bg-gray-900"
                              />
                            </div>
                          </div>
                        )}
                        
                        {/* Price & CTA */}
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                          <div>
                            <div className="text-3xl font-bold text-gray-900">{course.price} {t('common.currency')}</div>
                            {course.originalPrice && (
                              <div className="text-sm text-gray-500 line-through">{course.originalPrice} {t('common.currency')}</div>
                            )}
                          </div>
                          
                          <div className="flex items-center gap-3">
                            <button className="p-2 rounded-lg border border-gray-300 text-gray-700 hover:text-gray-900 hover:border-gray-400 transition-colors">
                              <Heart className="w-5 h-5" />
                            </button>
                            <Link
                              to={watchTarget}
                              className="px-6 py-3 bg-gray-900 rounded-xl font-semibold text-white hover:bg-gray-800 transition-colors"
                            >
                              {t('courses.watch') || t('coursesPage.actions.details')}
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                  )
                })}
              </motion.div>
            )}
          </AnimatePresence>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-20"
          >
            <div className="max-w-md mx-auto">
              <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-slate-100 flex items-center justify-center">
                <BookOpen className="w-12 h-12 text-slate-700" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-3">{t('coursesPage.empty.title')}</h3>
              <p className="text-slate-600 mb-6">
                {searchTerm 
                  ? t('coursesPage.empty.withQuery', { query: searchTerm })
                  : t('coursesPage.empty.noFilters')
                }
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <button
                  onClick={() => setSearchTerm('')}
                  className="px-6 py-3 bg-gray-800 hover:bg-gray-700 rounded-xl text-white font-medium transition-colors"
                >
                  {t('coursesPage.actions.resetSearch')}
                </button>
                <button
                  onClick={() => {
                    setSearchTerm('')
                    setFilter('all')
                    setCurrentPage(1)
                  }}
                  className="px-6 py-3 bg-slate-900 rounded-xl text-white font-medium hover:bg-slate-800 transition-all"
                >
                  {t('coursesPage.actions.viewAll')}
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* Pagination */}
        {sortedCourses.length > 0 && totalPages > 1 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-center mt-12"
          >
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                className="w-10 h-10 flex items-center justify-center rounded-lg bg-gray-800 text-gray-400 hover:text-white disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                ←
              </button>
              {pageNumbers.map((page) => (
                <button
                  key={page}
                  type="button"
                  onClick={() => setCurrentPage(page)}
                  className={`w-10 h-10 flex items-center justify-center rounded-lg transition-colors ${
                    currentPage === page
                      ? 'bg-slate-900 text-white'
                      : 'bg-gray-800 text-gray-400 hover:text-white'
                  }`}
                >
                  {page}
                </button>
              ))}
              <button
                type="button"
                onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
                className="w-10 h-10 flex items-center justify-center rounded-lg bg-gray-800 text-gray-400 hover:text-white disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                →
              </button>
            </div>
          </motion.div>
        )}

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 p-8 rounded-2xl bg-slate-100 border border-slate-200 text-center"
        >
          <Award className="w-16 h-16 text-slate-800 mx-auto mb-6" />
          <h3 className="text-3xl font-bold text-slate-900 mb-4">{t('coursesPage.cta.title')}</h3>
          <p className="text-slate-600 mb-8 max-w-2xl mx-auto">
            {t('coursesPage.cta.subtitle')}
          </p>
          <button className="px-8 py-4 bg-slate-900 rounded-xl font-bold text-lg text-white hover:bg-slate-800 transition-all duration-300">
            {t('coursesPage.cta.button')}
          </button>
        </motion.div>
      </section>
    </div>
  )
}
