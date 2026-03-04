import { motion } from 'framer-motion'
import { useState } from 'react'
import { 
  ShoppingCart, Star, Heart, Zap, Tag, Crown, Sparkles,
  Check, TrendingUp, Package, Award
} from 'lucide-react'
import { useCart } from '../hooks/useCart'
import { useTranslation } from 'react-i18next'

export default function MerchCard({ item, index = 0 }) {
  const { addItem, isInCart } = useCart()
  const { t } = useTranslation()
  const [selectedSize, setSelectedSize] = useState(item.sizes?.[0] || null)
  const [selectedColor, setSelectedColor] = useState(item.colors?.[0] || null)
  const [isLiked, setIsLiked] = useState(false)
  const [showAddedMessage, setShowAddedMessage] = useState(false)
  
  const handleAddToCart = () => {
    addItem(item, 1, selectedSize, selectedColor)
    setShowAddedMessage(true)
    setTimeout(() => setShowAddedMessage(false), 2000)
  }
  
  const inCart = isInCart(item.id, selectedSize, selectedColor)
  const discount = item.originalPrice ? Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100) : 0

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -4 }}
      className="relative group bg-white rounded-2xl border border-gray-200 overflow-hidden hover:border-gray-300 transition-all duration-300 flex flex-col h-full"
    >
      
      {/* Badges */}
      <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
        {item.isNew && (
          <motion.div
            initial={{ scale: 0, rotate: -45 }}
            animate={{ scale: 1, rotate: 0 }}
            className="px-3 py-1 rounded-full bg-gray-900 flex items-center gap-1 shadow-sm"
          >
            <Sparkles className="w-3 h-3 text-white" />
            <span className="text-xs font-bold text-white">{t('shop.badges.new')}</span>
          </motion.div>
        )}
        
        {item.isBestseller && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="px-3 py-1 rounded-full bg-gray-700 flex items-center gap-1 shadow-sm"
          >
            <TrendingUp className="w-3 h-3 text-white" />
            <span className="text-xs font-bold text-white">{t('shop.badges.bestseller')}</span>
          </motion.div>
        )}
        
        {item.isLimited && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="px-3 py-1 rounded-full bg-gray-500 flex items-center gap-1 shadow-sm"
          >
            <Zap className="w-3 h-3 text-white" />
            <span className="text-xs font-bold text-white">{t('shop.badges.limited')}</span>
          </motion.div>
        )}
      </div>
      
      {/* Like Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsLiked(!isLiked)}
        className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:border-gray-300 transition-colors"
      >
        <Heart className={`w-5 h-5 ${isLiked ? 'fill-red-500 text-red-500' : 'text-gray-700'}`} />
      </motion.button>
      
      {/* Discount Badge */}
      {discount > 0 && (
        <div className="absolute top-4 right-16 z-10 px-3 py-1 rounded-full bg-gray-900 shadow-sm">
          <span className="text-xs font-bold text-white">-{discount}%</span>
        </div>
      )}
      
      {/* Image Section */}
      <div className="relative h-64 bg-gray-50 flex items-center justify-center overflow-hidden">
        <motion.div
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
          className="w-16 h-16 rounded-2xl bg-gray-900 flex items-center justify-center"
        >
          {item.icon ? <item.icon className="w-8 h-8 text-white" /> : null}
        </motion.div>
        
        {/* Stock Warning */}
        {item.stock < 10 && (
          <div className="absolute bottom-4 left-4 px-3 py-1 rounded-lg bg-gray-900">
            <span className="text-xs font-semibold text-white">{t('shop.stockLeft', { count: item.stock })}</span>
          </div>
        )}
      </div>
      
      {/* Content */}
      <div className="p-6 relative flex flex-col flex-1">
        {/* Category */}
        <div className="flex items-center gap-2 mb-3">
          <Tag className="w-4 h-4 text-gray-600" />
          <span className="text-xs font-semibold text-gray-600 uppercase tracking-wider">
            {t(`shop.categories.${item.category}`)}
          </span>
        </div>
        
        {/* Title */}
        <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2 min-h-[3.5rem] group-hover:text-gray-700 transition-colors">
          {item.name}
        </h3>
        
        {/* Description */}
        <p className="text-sm text-gray-600 mb-4 line-clamp-2 min-h-[2.5rem]">
          {item.description}
        </p>
        
        {/* Rating & Reviews */}
        <div className="flex items-center gap-3 mb-4">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 text-yellow-500 fill-current" />
            <span className="text-sm font-semibold text-gray-900">{item.rating}</span>
          </div>
          <span className="text-xs text-gray-500">{t('shop.reviews', { count: item.reviews })}</span>
        </div>
        
        {/* Size Selector */}
        <div className="mb-4">
          {item.sizes && item.sizes.length > 0 && (
            <>
              <label className="text-xs text-gray-600 mb-2 block">{t('merch.size')}:</label>
              <div className="flex flex-wrap gap-2 min-h-[2rem]">
                {item.sizes.map(size => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                      selectedSize === size
                        ? 'bg-gray-900 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
        
        {/* Color Selector */}
        <div className="mb-4">
          {item.colors && item.colors.length > 0 && (
            <>
              <label className="text-xs text-gray-600 mb-2 block">{t('merch.color')}:</label>
              <div className="flex flex-wrap gap-2 min-h-[2rem]">
                {item.colors.map(color => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                      selectedColor === color
                        ? 'bg-gray-900 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
        
        {/* Spacer для выравнивания кнопки внизу */}
        <div className="flex-1"></div>
        
        {/* Price & Material */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex flex-col">
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-gray-900">{item.price.toLocaleString()} {t('common.currency')}</span>
              {item.originalPrice && (
                <span className="text-sm text-gray-500 line-through">{item.originalPrice.toLocaleString()} {t('common.currency')}</span>
              )}
            </div>
            <span className="text-xs text-gray-500 mt-1 line-clamp-1">{item.material}</span>
          </div>
        </div>
        
        {/* Add to Cart Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleAddToCart}
          disabled={inCart}
          className={`w-full py-3 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all ${
            inCart
              ? 'bg-gray-100 text-gray-700 border border-gray-200'
              : 'bg-gray-900 text-white hover:bg-gray-800'
          }`}
        >
          {inCart ? (
            <>
              <Check className="w-5 h-5" />
              <span>{t('shop.inCart')}</span>
            </>
          ) : (
            <>
              <ShoppingCart className="w-5 h-5" />
              <span>{t('shop.addToCart')}</span>
            </>
          )}
        </motion.button>
        
        {/* Added Message */}
        {showAddedMessage && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="absolute bottom-4 left-4 right-4 bg-gray-900 text-white text-sm font-semibold py-2 px-4 rounded-lg text-center"
          >
            {t('shop.addedToCart')}
          </motion.div>
        )}
        
        {/* Tags */}
        {item.tags && item.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-gray-200">
            {item.tags.map(tag => (
              <span
                key={tag}
                className="px-2 py-1 rounded-md bg-gray-100 text-xs text-gray-600"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>
      
      {/* Premium Badge */}
      {item.isPremium && (
        <div className="absolute -top-2 -right-2">
          <motion.div
            animate={{ rotate: [0, 10, 0, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Crown className="w-8 h-8 text-yellow-500 fill-yellow-500/20" />
          </motion.div>
        </div>
      )}
    </motion.div>
  )
}
