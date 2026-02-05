import { useState, useEffect, useRef } from 'react'
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

const API_URL = 'https://box-platform-backend.onrender.com/api'

export default function Courses() {
  const { t } = useTranslation()
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')
  const [error, setError] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [viewMode, setViewMode] = useState('grid')
  const [showFilters, setShowFilters] = useState(false)
  const [sortBy, setSortBy] = useState('popular')
  const [selectedCategories, setSelectedCategories] = useState([])
  const containerRef = useRef(null)

  const categories = [
    { id: 'beginner', label: t('courses.beginner'), icon: Target, count: 0 },
    { id: 'intermediate', label: t('courses.intermediate'), icon: TrendingUp, count: 0 },
    { id: 'advanced', label: t('courses.advanced'), icon: Trophy, count: 0 },
    { id: 'pro', label: t('courses.advanced'), icon: Crown, count: 0 },
    { id: 'new', label: t('courses.newCourses', { defaultValue: 'Новые курсы' }), icon: Sparkles, count: 0 },
    { id: 'popular', label: t('courses.popular', { defaultValue: 'Популярные' }), icon: TrendingUp, count: 0 },
  ]

  useEffect(() => {
    fetchCourses()
  }, [])

  const fetchCourses = async () => {
    try {
      setLoading(true)
      const response = await axios.get(`${API_URL}/courses/`)
      console.log('API Response:', response.data)
      
      const data = response.data.results ? response.data.results : (Array.isArray(response.data) ? response.data : [])
      console.log('Courses data:', data)
      
      // Добавляем mock данные для демонстрации
      const enhancedData = data.map(course => ({
        ...course,
        rating: course.rating || (4.5 + Math.random() * 0.5),
        studentsCount: course.studentsCount || Math.floor(Math.random() * 1000) + 100,
        duration: course.duration || `${Math.floor(Math.random() * 10) + 1} часов`,
        isNew: Math.random() > 0.7,
        isBestseller: Math.random() > 0.8,
      }))
      
      setCourses(enhancedData)
      setError(null)
    } catch (err) {
      console.error('Failed to fetch courses:', err)
      setError('Не удалось загрузить курсы')
      setCourses([])
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
    
    // Фильтр по категориям
    const matchesCategories = selectedCategories.length === 0 || 
      selectedCategories.some(cat => {
        if (cat === 'new') return course.isNew
        if (cat === 'popular') return course.isBestseller
        if (cat === 'beginner') return course.level === 'beginner'
        if (cat === 'intermediate') return course.level === 'intermediate'
        if (cat === 'advanced') return course.level === 'advanced'
        if (cat === 'pro') return course.level === 'pro'
        return true
      })
    
    return matchesSearch && matchesFilter && matchesCategories
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

  const handleCategoryToggle = (categoryId) => {
    setSelectedCategories(prev => 
      prev.includes(categoryId) 
        ? prev.filter(c => c !== categoryId)
        : [...prev, categoryId]
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
    <div ref={containerRef} className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-red-600/10"></div>
          <div className="absolute inset-0 bg-[url('https://st3.depositphotos.com/13324256/16676/i/450/depositphotos_166764852-stock-photo-red-boxing-gloves.jpg')] bg-cover bg-center opacity-10"></div>
        </div>

        <div className="container-custom relative z-10">
          <motion.div
            variants={staggerContainer}
            initial="initial"
            animate="animate"
            className="text-center mb-12"
          >
            <motion.div variants={fadeInUp} className="inline-block mb-6">
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary/20 to-red-600/20 rounded-full border border-primary/30">
                <Sparkles className="w-4 h-4 text-primary" />
                <span className="text-primary text-sm font-semibold">ОБУЧЕНИЕ ОТ ЧЕМПИОНА</span>
              </span>
            </motion.div>

            <motion.h1 
              variants={fadeInUp}
              className="text-5xl md:text-7xl font-black mb-6"
            >
              <span className="block text-white">Стань учеником</span>
              <span className="bg-gradient-to-r from-primary via-yellow-500 to-primary bg-[length:200%_auto] bg-clip-text text-transparent">
                Чемпиона
              </span>
            </motion.h1>

            <motion.p 
              variants={fadeInUp}
              className="text-xl text-gray-400 max-w-2xl mx-auto mb-10"
            >
              Эксклюзивные программы от Дмитрия Бивола с персональным AI-тренером и поддержкой комьюнити
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
                  placeholder="Искать курсы, уроки, техники..."
                  className="w-full pl-14 pr-6 py-4 bg-black/50 border border-gray-800 rounded-2xl text-white placeholder-gray-500 focus:outline-none focus:border-primary transition-colors backdrop-blur-xl"
                />
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
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
              <div className="bg-gray-900/50 backdrop-blur-xl rounded-2xl border border-gray-800 p-6 mb-6">
                <div className="flex flex-wrap gap-4 mb-6">
                  {categories.map(category => (
                    <motion.button
                      key={category.id}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleCategoryToggle(category.id)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-all ${
                        selectedCategories.includes(category.id)
                          ? 'bg-gradient-to-r from-primary to-red-600 border-primary text-white'
                          : 'bg-gray-800/50 border-gray-700 text-gray-400 hover:border-primary/50'
                      }`}
                    >
                      <category.icon className="w-4 h-4" />
                      <span>{category.label}</span>
                    </motion.button>
                  ))}
                </div>
                
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <span className="text-gray-400">Сортировка:</span>
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="bg-black/50 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-primary"
                    >
                      <option value="popular">По популярности</option>
                      <option value="rating">По рейтингу</option>
                      <option value="students">По количеству студентов</option>
                      <option value="price-low">Цена: по возрастанию</option>
                      <option value="price-high">Цена: по убыванию</option>
                      <option value="newest">Сначала новые</option>
                    </select>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setViewMode('grid')}
                      className={`p-2 rounded-lg transition-colors ${
                        viewMode === 'grid' 
                          ? 'bg-primary text-white' 
                          : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                      }`}
                    >
                      <Grid className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => setViewMode('list')}
                      className={`p-2 rounded-lg transition-colors ${
                        viewMode === 'list' 
                          ? 'bg-primary text-white' 
                          : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
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
            className="bg-gradient-to-r from-red-600/20 to-red-600/10 border border-red-600/50 rounded-2xl p-6 mb-8 backdrop-blur-xl"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Shield className="w-8 h-8 text-red-500" />
                <div>
                  <p className="text-red-500 font-semibold">{error}</p>
                  <p className="text-red-400/80 text-sm">Пожалуйста, попробуйте позже</p>
                </div>
              </div>
              <button 
                onClick={fetchCourses}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg text-white font-semibold transition-colors"
              >
                Обновить
              </button>
            </div>
          </motion.div>
        )}

        {/* Courses Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-white">
              {filteredCourses.length} {filteredCourses.length === 1 ? 'курс' : 'курсов'} найдено
            </h2>
            {searchTerm && (
              <p className="text-gray-400">
                По запросу: <span className="text-primary">{searchTerm}</span>
              </p>
            )}
          </div>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-3"
          >
            <span className="text-gray-400 text-sm">Отображение:</span>
            <div className="flex bg-gray-900 rounded-lg p-1">
              <button
                onClick={() => setFilter('all')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  filter === 'all'
                    ? 'bg-primary text-white'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Все
              </button>
              <button
                onClick={() => setFilter('beginner')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  filter === 'beginner'
                    ? 'bg-primary text-white'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Начинающие
              </button>
              <button
                onClick={() => setFilter('intermediate')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  filter === 'intermediate'
                    ? 'bg-primary text-white'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Средний
              </button>
              <button
                onClick={() => setFilter('advanced')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  filter === 'advanced'
                    ? 'bg-primary text-white'
                    : 'text-gray-400 hover:text-white'
                }`
              }>
                Продвинутые
              </button>
            </div>
          </motion.div>
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
                {sortedCourses.map((course, idx) => (
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
                        <span className="px-3 py-1 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full text-xs font-bold text-white">
                          НОВЫЙ
                        </span>
                      </div>
                    )}
                    {course.isBestseller && (
                      <div className="absolute top-4 right-4 z-10">
                        <span className="px-3 py-1 bg-gradient-to-r from-yellow-600 to-orange-500 rounded-full text-xs font-bold text-white flex items-center gap-1">
                          <TrendingUp className="w-3 h-3" />
                          ТОП
                        </span>
                      </div>
                    )}
                    
                    <CourseCard 
                      course={course} 
                      className="bg-gradient-to-br from-gray-900/50 to-black border border-gray-800 group-hover:border-primary/50 transition-all duration-500"
                    />
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
                {sortedCourses.map((course, idx) => (
                  <motion.div
                    key={course.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    whileHover={{ x: 5 }}
                    className="bg-gradient-to-br from-gray-900/50 to-black border border-gray-800 rounded-2xl p-6 group hover:border-primary/50 transition-all duration-500"
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
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                          <div className="w-16 h-16 rounded-full bg-gradient-to-r from-primary to-red-600 flex items-center justify-center">
                            <Play className="w-8 h-8 text-white" />
                          </div>
                        </div>
                      </div>
                      
                      {/* Course Info */}
                      <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-3 mb-3">
                          {course.isNew && (
                            <span className="px-3 py-1 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full text-xs font-bold text-white">
                              НОВЫЙ
                            </span>
                          )}
                          {course.isBestseller && (
                            <span className="px-3 py-1 bg-gradient-to-r from-yellow-600 to-orange-500 rounded-full text-xs font-bold text-white flex items-center gap-1">
                              <TrendingUp className="w-3 h-3" />
                              ТОП КУРС
                            </span>
                          )}
                          <span className="px-3 py-1 bg-gray-800 rounded-full text-xs font-medium text-gray-300">
                            {course.level}
                          </span>
                        </div>
                        
                        <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-primary transition-colors">
                          {course.title}
                        </h3>
                        <p className="text-gray-400 mb-4 line-clamp-2">
                          {course.description}
                        </p>
                        
                        <div className="flex flex-wrap items-center gap-6 text-sm text-gray-400 mb-4">
                          <div className="flex items-center gap-2">
                            <Star className="w-4 h-4 text-yellow-500 fill-current" />
                            <span>{course.rating?.toFixed(1)}</span>
                            <span className="text-gray-600">({course.studentsCount})</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-blue-500" />
                            <span>{course.duration}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Users className="w-4 h-4 text-green-500" />
                            <span>{course.studentsCount} студентов</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Target className="w-4 h-4 text-primary" />
                            <span>{course.category}</span>
                          </div>
                        </div>
                        
                        {/* Progress Bar (for enrolled users) */}
                        {course.progress && (
                          <div className="mb-4">
                            <div className="flex justify-between text-sm mb-1">
                              <span className="text-gray-400">Прогресс</span>
                              <span className="text-primary font-semibold">{course.progress}%</span>
                            </div>
                            <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                              <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${course.progress}%` }}
                                className="h-full bg-gradient-to-r from-primary to-red-600"
                              />
                            </div>
                          </div>
                        )}
                        
                        {/* Price & CTA */}
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="text-3xl font-bold text-white">{course.price} с</div>
                            {course.originalPrice && (
                              <div className="text-sm text-gray-500 line-through">{course.originalPrice} с</div>
                            )}
                          </div>
                          
                          <div className="flex items-center gap-3">
                            <button className="p-2 rounded-lg border border-gray-700 text-gray-400 hover:text-white hover:border-primary transition-colors">
                              <Heart className="w-5 h-5" />
                            </button>
                            <button className="px-6 py-3 bg-gradient-to-r from-primary to-red-600 rounded-xl font-semibold text-white hover:from-red-600 hover:to-primary transition-all duration-300">
                              Подробнее
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
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
              <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-r from-primary/20 to-red-600/20 flex items-center justify-center">
                <BookOpen className="w-12 h-12 text-primary" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">Курсы не найдены</h3>
              <p className="text-gray-400 mb-6">
                {searchTerm 
                  ? `По запросу "${searchTerm}" ничего не найдено. Попробуйте изменить поисковый запрос.`
                  : 'Попробуйте изменить фильтры или выберите другую категорию.'
                }
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <button
                  onClick={() => setSearchTerm('')}
                  className="px-6 py-3 bg-gray-800 hover:bg-gray-700 rounded-xl text-white font-medium transition-colors"
                >
                  Сбросить поиск
                </button>
                <button
                  onClick={() => {
                    setSearchTerm('')
                    setSelectedCategories([])
                    setFilter('all')
                  }}
                  className="px-6 py-3 bg-gradient-to-r from-primary to-red-600 rounded-xl text-white font-medium hover:from-red-600 hover:to-primary transition-all"
                >
                  Смотреть все курсы
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* Pagination */}
        {sortedCourses.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-center mt-12"
          >
            <div className="flex items-center gap-2">
              <button className="w-10 h-10 flex items-center justify-center rounded-lg bg-gray-800 text-gray-400 hover:text-white transition-colors">
                ←
              </button>
              <button className="w-10 h-10 flex items-center justify-center rounded-lg bg-primary text-white">
                1
              </button>
              <button className="w-10 h-10 flex items-center justify-center rounded-lg bg-gray-800 text-gray-400 hover:text-white transition-colors">
                2
              </button>
              <button className="w-10 h-10 flex items-center justify-center rounded-lg bg-gray-800 text-gray-400 hover:text-white transition-colors">
                3
              </button>
              <button className="w-10 h-10 flex items-center justify-center rounded-lg bg-gray-800 text-gray-400 hover:text-white transition-colors">
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
          className="mt-20 p-8 rounded-2xl bg-gradient-to-r from-primary/10 via-black/50 to-primary/10 border border-gray-800 text-center"
        >
          <Award className="w-16 h-16 text-primary mx-auto mb-6" />
          <h3 className="text-3xl font-bold text-white mb-4">Не нашли подходящий курс?</h3>
          <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
            Мы готовы разработать индивидуальную программу тренировок специально для вас. 
            Запишитесь на консультацию с нашим тренером.
          </p>
          <button className="px-8 py-4 bg-gradient-to-r from-primary to-red-600 rounded-xl font-bold text-lg hover:from-red-600 hover:to-primary transition-all duration-300">
            Записаться на консультацию
          </button>
        </motion.div>
      </section>
    </div>
  )
}