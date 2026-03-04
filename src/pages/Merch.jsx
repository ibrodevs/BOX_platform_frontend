import { motion, AnimatePresence } from 'framer-motion'
import { useState, useRef, useEffect } from 'react'
import { 
  ShoppingCart, Star, Package, Truck, Shield, Heart, 
  Filter, Search, TrendingUp, Zap, Crown, Sparkles,
  ChevronRight, X, ShoppingBag, Tag, Check, Clock,
  Star as StarIcon, Award, Users, Droplet, Layers, GraduationCap, RotateCw, Gift
} from 'lucide-react'
import { useCart } from '../hooks/useCart'
import MerchCard from '../components/MerchCard'
import { useTranslation } from 'react-i18next'

export default function Merch() {
  const { addToCart, items: cartItems } = useCart()
  const { t } = useTranslation()
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedItem, setSelectedItem] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState('popular')
  const [priceRange, setPriceRange] = useState([0, 20000])
  const [showFilters, setShowFilters] = useState(false)
  const [quickViewItem, setQuickViewItem] = useState(null)
  const [notification, setNotification] = useState(null)
  
  const notificationRef = useRef(null)

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        setNotification(null)
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [notification])

  const merchItems = [
    {
      id: 1,
      name: t('shop.items.item1.name'),
      description: t('shop.items.item1.description'),
      price: 2490,
      originalPrice: 3490,
      icon: ShoppingBag,
      category: 'clothing',
      sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
      colors: [t('shop.colors.black'), t('shop.colors.white'), t('shop.colors.red')],
      rating: 4.8,
      reviews: 127,
      isNew: true,
      isBestseller: true,
      isLimited: false,
      material: t('shop.items.item1.material'),
      stock: 42,
      tags: [t('shop.tags.hit'), t('shop.tags.new'), t('shop.tags.exclusive')]
    },
    {
      id: 2,
      name: t('shop.items.item2.name'),
      description: t('shop.items.item2.description'),
      price: 12990,
      originalPrice: 15990,
      icon: Shield,
      category: 'equipment',
      sizes: ['8 oz', '10 oz', '12 oz', '14 oz', '16 oz'],
      colors: [t('shop.colors.blackGold'), t('shop.colors.redBlack'), t('shop.colors.blueWhite')],
      rating: 4.9,
      reviews: 89,
      isNew: false,
      isBestseller: true,
      isLimited: true,
      material: t('shop.items.item2.material'),
      stock: 15,
      tags: [t('shop.tags.pro'), t('shop.tags.limited')]
    },
    {
      id: 3,
      name: t('shop.items.item3.name'),
      description: t('shop.items.item3.description'),
      price: 5990,
      originalPrice: 7990,
      icon: ShoppingBag,
      category: 'clothing',
      sizes: ['S', 'M', 'L', 'XL'],
      colors: [t('shop.colors.black'), t('shop.colors.khakiGray'), t('shop.colors.darkBlue')],
      rating: 4.7,
      reviews: 56,
      isNew: true,
      isBestseller: false,
      isLimited: false,
      material: t('shop.items.item3.material'),
      stock: 28,
      tags: [t('shop.tags.new'), t('shop.tags.tech')]
    },
    {
      id: 4,
      name: t('shop.items.item4.name'),
      description: t('shop.items.item4.description'),
      price: 1290,
      originalPrice: 1890,
      icon: Zap,
      category: 'equipment',
      sizes: [t('shop.sizes.wraps45m')],
      colors: [t('shop.colors.black'), t('shop.colors.red'), t('shop.colors.blue')],
      rating: 4.6,
      reviews: 203,
      isNew: false,
      isBestseller: true,
      isLimited: false,
      material: t('shop.items.item4.material'),
      stock: 150,
      tags: [t('shop.tags.hit'), t('shop.tags.economy')]
    },
    {
      id: 5,
      name: t('shop.items.item5.name'),
      description: t('shop.items.item5.description'),
      price: 3490,
      originalPrice: 4990,
      icon: Droplet,
      category: 'accessories',
      sizes: ['750ml', '1000ml'],
      colors: [t('shop.colors.black'), t('shop.colors.white'), t('shop.colors.transparent')],
      rating: 4.5,
      reviews: 78,
      isNew: true,
      isBestseller: false,
      isLimited: true,
      material: t('shop.items.item5.material'),
      stock: 8,
      tags: [t('shop.tags.smart'), t('shop.tags.tech'), t('shop.tags.limited')]
    },
    {
      id: 6,
      name: t('shop.items.item6.name'),
      description: t('shop.items.item6.description'),
      price: 3990,
      originalPrice: 4990,
      icon: Layers,
      category: 'clothing',
      sizes: ['S', 'M', 'L', 'XL'],
      colors: [t('shop.colors.black'), t('shop.colors.gray'), t('shop.colors.darkBlue')],
      rating: 4.4,
      reviews: 92,
      isNew: false,
      isBestseller: true,
      isLimited: false,
      material: t('shop.items.item6.material'),
      stock: 64,
      tags: [t('shop.tags.hit'), t('shop.tags.tech')]
    },
    {
      id: 7,
      name: t('shop.items.item7.name'),
      description: t('shop.items.item7.description'),
      price: 2490,
      originalPrice: 3290,
      icon: Shield,
      category: 'equipment',
      sizes: ['S', 'M', 'L'],
      colors: [t('shop.colors.transparent'), t('shop.colors.multicolor')],
      rating: 4.8,
      reviews: 45,
      isNew: true,
      isBestseller: false,
      isLimited: false,
      material: t('shop.items.item7.material'),
      stock: 36,
      tags: [t('shop.tags.new'), t('shop.tags.safety')]
    },
    {
      id: 8,
      name: t('shop.items.item8.name'),
      description: t('shop.items.item8.description'),
      price: 5990,
      originalPrice: 7990,
      icon: Package,
      category: 'accessories',
      sizes: ['30L', '40L', '50L'],
      colors: [t('shop.colors.black'), t('shop.colors.camouflage'), t('shop.colors.gray')],
      rating: 4.7,
      reviews: 67,
      isNew: false,
      isBestseller: true,
      isLimited: true,
      material: t('shop.items.item8.material'),
      stock: 12,
      tags: [t('shop.tags.pro'), t('shop.tags.limited')]
    },
    {
      id: 9,
      name: t('shop.items.item9.name'),
      description: t('shop.items.item9.description'),
      price: 1990,
      originalPrice: 2990,
      icon: GraduationCap,
      category: 'accessories',
      sizes: [t('shop.sizes.oneSize')],
      colors: [t('shop.colors.black'), t('shop.colors.white'), t('shop.colors.red')],
      rating: 4.9,
      reviews: 112,
      isNew: false,
      isBestseller: true,
      isLimited: true,
      material: t('shop.items.item9.material'),
      stock: 5,
      tags: [t('shop.tags.exclusive'), t('shop.tags.limited'), t('shop.tags.hit')]
    },
    {
      id: 10,
      name: t('shop.items.item10.name'),
      description: t('shop.items.item10.description'),
      price: 7990,
      originalPrice: 9990,
      icon: Zap,
      category: 'clothing',
      sizes: ['S', 'M', 'L', 'XL'],
      colors: [t('shop.colors.black'), t('shop.colors.grayMelange'), t('shop.colors.burgundy')],
      rating: 4.6,
      reviews: 34,
      isNew: true,
      isBestseller: false,
      isLimited: true,
      material: t('shop.items.item10.material'),
      stock: 3,
      tags: [t('shop.tags.exclusive'), t('shop.tags.limited'), t('shop.tags.new')]
    },
    {
      id: 11,
      name: t('shop.items.item11.name'),
      description: t('shop.items.item11.description'),
      price: 1890,
      originalPrice: 2490,
      icon: RotateCw,
      category: 'equipment',
      sizes: [t('shop.sizes.adjustable')],
      colors: [t('shop.colors.black'), t('shop.colors.red'), t('shop.colors.blue')],
      rating: 4.5,
      reviews: 89,
      isNew: false,
      isBestseller: true,
      isLimited: false,
      material: t('shop.items.item11.material'),
      stock: 47,
      tags: [t('shop.tags.hit'), t('shop.tags.pro')]
    },
    {
      id: 12,
      name: t('shop.items.item12.name'),
      description: t('shop.items.item12.description'),
      price: 9990,
      originalPrice: 14990,
      icon: Gift,
      category: 'sets',
      sizes: [t('shop.sizes.set')],
      colors: [t('shop.colors.blackGold')],
      rating: 4.9,
      reviews: 23,
      isNew: true,
      isBestseller: true,
      isLimited: true,
      material: t('shop.items.item12.material'),
      stock: 7,
      tags: [t('shop.tags.gift'), t('shop.tags.exclusive'), t('shop.tags.limited')]
    }
  ]

  const categories = [
    { id: 'all', label: t('shop.categories.all'), icon: ShoppingBag, count: 12 },
    { id: 'clothing', label: t('shop.categories.clothing'), icon: ShoppingBag, count: 4 },
    { id: 'equipment', label: t('shop.categories.equipment'), icon: Shield, count: 5 },
    { id: 'accessories', label: t('shop.categories.accessories'), icon: Package, count: 3 },
    { id: 'sets', label: t('shop.categories.sets'), icon: Gift, count: 1 }
  ]

  const sortOptions = [
    { id: 'popular', label: t('shop.sort.popular'), icon: TrendingUp },
    { id: 'new', label: t('shop.sort.new'), icon: Sparkles },
    { id: 'price-low', label: t('shop.sort.priceLow'), icon: '↑' },
    { id: 'price-high', label: t('shop.sort.priceHigh'), icon: '↓' },
    { id: 'rating', label: t('shop.sort.rating'), icon: StarIcon },
    { id: 'discount', label: t('shop.sort.discount'), icon: Tag }
  ]

  const stats = [
    { icon: Shield, label: t('shop.stats.qualityGuarantee'), value: t('shop.stats.qualityGuaranteeValue'), color: 'text-green-500' },
    { icon: Truck, label: t('shop.stats.freeDelivery'), value: t('shop.stats.freeDeliveryValue'), color: 'text-blue-500' },
    { icon: Clock, label: t('shop.stats.deliveryTime'), value: t('shop.stats.deliveryTimeValue'), color: 'text-yellow-500' },
    { icon: Users, label: t('shop.stats.happyClients'), value: t('shop.stats.happyClientsValue'), color: 'text-primary' },
  ]

  // Фильтрация товаров
  const filteredItems = merchItems.filter(item => {
    const matchesCategory = selectedCategory === 'all' || 
      item.category === selectedCategory
    
    const matchesSearch = searchTerm === '' || 
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.tags.some(tag => tag.includes(searchTerm.toLowerCase()))
    
    const matchesPrice = item.price >= priceRange[0] && item.price <= priceRange[1]
    
    return matchesCategory && matchesSearch && matchesPrice
  })

  // Сортировка
  const sortedItems = [...filteredItems].sort((a, b) => {
    switch (sortBy) {
      case 'new':
        if (a.isNew && !b.isNew) return -1
        if (!a.isNew && b.isNew) return 1
        return 0
      case 'price-low':
        return a.price - b.price
      case 'price-high':
        return b.price - a.price
      case 'rating':
        return b.rating - a.rating
      case 'discount':
        const discountA = ((a.originalPrice - a.price) / a.originalPrice) * 100
        const discountB = ((b.originalPrice - b.price) / b.originalPrice) * 100
        return discountB - discountA
      default: // popular
        if (a.isBestseller && !b.isBestseller) return -1
        if (!a.isBestseller && b.isBestseller) return 1
        return b.rating - a.rating
    }
  })

  const handleAddToCart = (item) => {
    addToCart(item)
    setNotification({
      type: 'success',
      title: t('shop.notification.addedTitle'),
      message: item.name,
      icon: item.icon
    })
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

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Hero Section */}
      <section className="relative py-16">

        <div className="container-custom relative z-10">
          <motion.div
            variants={staggerContainer}
            initial="initial"
            animate="animate"
            className="text-center mb-12"
          >
            <motion.div variants={fadeInUp} className="inline-block mb-6">
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg border border-gray-200">
                <Crown className="w-4 h-4 text-gray-700" />
                <span className="text-gray-700 text-sm font-semibold">{t('shop.hero.badge')}</span>
              </span>
            </motion.div>

            <motion.h1 
              variants={fadeInUp}
              className="text-4xl md:text-6xl font-black mb-6"
            >
              <span className="block text-gray-900">{t('shop.hero.titleLine1')}</span>
              <span className="block text-gray-700">{t('shop.hero.titleLine2')}</span>
            </motion.h1>

            <motion.p 
              variants={fadeInUp}
              className="text-lg text-gray-600 max-w-2xl mx-auto mb-10"
            >
              {t('shop.hero.subtitle')}
            </motion.p>

            {/* Search Bar */}
            <motion.div
              variants={fadeInUp}
              className="relative max-w-3xl mx-auto mb-8"
            >
              <div className="relative">
                <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder={t('shop.searchPlaceholder')}
                  className="w-full pl-14 pr-6 py-3 bg-white border border-gray-300 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:border-gray-600 transition-colors"
                />
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
                >
                  <Filter className="w-5 h-5" />
                  <span>{t('common.filter')}</span>
                </button>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Filters Section */}
      <AnimatePresence>
        {showFilters && (
          <motion.section
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="container-custom mb-12">
              <div className="bg-white rounded-2xl border border-gray-200 p-6">
                <div className="flex flex-col lg:flex-row gap-8">
                  {/* Categories */}
                  <div className="flex-1">
                    <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                      <ShoppingBag className="w-5 h-5" />
                      {t('shop.filters.categories')}
                    </h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                      {categories.map(category => (
                        <motion.button
                          key={category.id}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setSelectedCategory(category.id)}
                          className={`flex flex-col items-center justify-center p-4 rounded-xl border transition-all ${
                            selectedCategory === category.id
                              ? 'bg-gray-900 border-gray-900 text-white'
                              : 'bg-white border-gray-300 text-gray-700 hover:border-gray-400'
                          }`}
                        >
                          <category.icon className="w-6 h-6 mb-2" />
                          <span className="text-sm font-medium">{category.label}</span>
                          <span className="text-xs mt-1 opacity-75">{category.count}</span>
                        </motion.button>
                      ))}
                    </div>
                  </div>

                  {/* Price Range */}
                  <div className="flex-1">
                    <h3 className="font-bold text-lg mb-4">{t('shop.filters.price', { currency: t('common.currency') })}</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between text-sm text-gray-400">
                        <span>0 {t('common.currency')}</span>
                        <span>20,000 {t('common.currency')}</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="20000"
                        step="100"
                        value={priceRange[0]}
                        onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-gray-900"
                      />
                      <input
                        type="range"
                        min="0"
                        max="20000"
                        step="100"
                        value={priceRange[1]}
                        onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-gray-900"
                      />
                      <div className="flex items-center justify-center gap-2">
                        <input
                          type="number"
                          value={priceRange[0]}
                          onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
                          className="w-24 px-3 py-2 bg-white border border-gray-300 rounded-lg text-gray-900 text-center"
                        />
                        <span className="text-gray-400">—</span>
                        <input
                          type="number"
                          value={priceRange[1]}
                          onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                          className="w-24 px-3 py-2 bg-white border border-gray-300 rounded-lg text-gray-900 text-center"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Sort Options */}
                <div className="mt-8 pt-6 border-t border-gray-800">
                  <h3 className="font-bold text-lg mb-4">{t('common.sort')}</h3>
                  <div className="flex flex-wrap gap-3">
                    {sortOptions.map(option => (
                      <motion.button
                        key={option.id}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setSortBy(option.id)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-all ${
                          sortBy === option.id
                            ? 'bg-gray-900 border-gray-900 text-white'
                            : 'bg-white border-gray-300 text-gray-700 hover:border-gray-400'
                        }`}
                      >
                        {typeof option.icon === 'string' ? (
                          <span>{option.icon}</span>
                        ) : (
                          <option.icon className="w-4 h-4" />
                        )}
                        <span>{option.label}</span>
                      </motion.button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* Stats Banner */}
      <section className="container-custom mb-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-white border border-gray-200 rounded-2xl p-6"
            >
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-gray-100">
                  <stat.icon className="w-6 h-6 text-gray-700" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Main Content */}
      <section className="container-custom pb-20">
        {/* Results Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">
              {t('shop.results.items', { count: sortedItems.length })}
            </h2>
            {searchTerm && (
              <p className="text-gray-600">
                {t('shop.results.byQuery')} <span className="text-gray-900">{searchTerm}</span>
              </p>
            )}
          </div>
          
          <div className="flex items-center gap-4">
            <div className="text-sm text-gray-600">
              {t('shop.results.shown', { shown: sortedItems.length, total: merchItems.length })}
            </div>
          </div>
        </div>

        {/* Merch Grid */}
        {sortedItems.length > 0 ? (
          <motion.div
            variants={staggerContainer}
            initial="initial"
            animate="animate"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {sortedItems.map((item, idx) => (
              <MerchCard
                key={item.id}
                item={item}
                onAddToCart={handleAddToCart}
                onQuickView={setQuickViewItem}
                index={idx}
              />
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-20"
          >
            <div className="max-w-md mx-auto">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gray-100 flex items-center justify-center">
                <ShoppingBag className="w-10 h-10 text-gray-700" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">{t('shop.empty.title')}</h3>
              <p className="text-gray-600 mb-6">
                {searchTerm 
                  ? t('shop.empty.withQuery', { query: searchTerm })
                  : t('shop.empty.noFilters')
                }
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <button
                  onClick={() => setSearchTerm('')}
                  className="px-6 py-3 bg-gray-900 hover:bg-gray-800 rounded-lg text-white font-medium transition-colors"
                >
                  {t('shop.empty.resetSearch')}
                </button>
                <button
                  onClick={() => {
                    setSearchTerm('')
                    setSelectedCategory('all')
                    setPriceRange([0, 20000])
                  }}
                  className="px-6 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 font-medium hover:border-gray-400 transition-all"
                >
                  {t('shop.empty.viewAll')}
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* Features Banner */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 p-8 rounded-2xl bg-gray-50 border border-gray-200"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-xl bg-gray-100">
                <Package className="w-8 h-8 text-gray-700" />
              </div>
              <div>
                <h3 className="font-bold text-lg mb-2 text-gray-900">{t('shop.features.freeDeliveryTitle')}</h3>
                <p className="text-gray-600 text-sm">{t('shop.features.freeDeliveryDesc')}</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-xl bg-gray-100">
                <Shield className="w-8 h-8 text-gray-700" />
              </div>
              <div>
                <h3 className="font-bold text-lg mb-2 text-gray-900">{t('shop.features.qualityTitle')}</h3>
                <p className="text-gray-600 text-sm">{t('shop.features.qualityDesc')}</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-xl bg-gray-100">
                <Award className="w-8 h-8 text-gray-700" />
              </div>
              <div>
                <h3 className="font-bold text-lg mb-2 text-gray-900">{t('shop.features.originalTitle')}</h3>
                <p className="text-gray-600 text-sm">{t('shop.features.originalDesc')}</p>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Notification */}
      <AnimatePresence>
        {notification && (
          <motion.div
            ref={notificationRef}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            className="fixed bottom-6 right-6 z-50"
          >
            <div className="bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden min-w-80">
              <div className="p-4">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-gray-800 flex items-center justify-center">
                    {notification.icon && (
                      <notification.icon className="w-5 h-5 text-white" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <Check className="w-4 h-4 text-green-500" />
                      <span className="font-bold text-gray-900">{notification.title}</span>
                    </div>
                    <p className="text-sm text-gray-700">{notification.message}</p>
                    <p className="text-xs text-gray-500 mt-2">{t('shop.notification.goToCart')}</p>
                  </div>
                  <button
                    onClick={() => setNotification(null)}
                    className="text-gray-400 hover:text-gray-700 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>
              <div className="h-1 bg-gray-200"></div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}