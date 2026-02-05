import { motion } from 'framer-motion'
import { useState } from 'react'
import { 
  ShoppingCart, Star, Heart, Zap, Tag, Crown, Sparkles,
  Check, TrendingUp, Package, Award
} from 'lucide-react'
import { useCart } from '../hooks/useCart'

export default function MerchCard({ item, index = 0 }) {
  const { addItem, isInCart } = useCart()
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
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -10 }}
      className="relative group bg-gradient-to-br from-gray-900/90 to-black backdrop-blur-sm rounded-2xl border border-gray-800 overflow-hidden hover:border-primary/50 transition-all duration-300 flex flex-col h-full"
    >
      {/* Glow Effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-red-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* Badges */}
      <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
        {item.isNew && (
          <motion.div
            initial={{ scale: 0, rotate: -45 }}
            animate={{ scale: 1, rotate: 0 }}
            className="px-3 py-1 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center gap-1 shadow-lg"
          >
            <Sparkles className="w-3 h-3 text-white" />
            <span className="text-xs font-bold text-white">НОВИНКА</span>
          </motion.div>
        )}
        
        {item.isBestseller && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="px-3 py-1 rounded-full bg-gradient-to-r from-yellow-500 to-orange-500 flex items-center gap-1 shadow-lg"
          >
            <TrendingUp className="w-3 h-3 text-white" />
            <span className="text-xs font-bold text-white">ХИТ</span>
          </motion.div>
        )}
        
        {item.isLimited && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="px-3 py-1 rounded-full bg-gradient-to-r from-red-600 to-pink-600 flex items-center gap-1 shadow-lg"
          >
            <Zap className="w-3 h-3 text-white" />
            <span className="text-xs font-bold text-white">ЛИМИТЕД</span>
          </motion.div>
        )}
      </div>
      
      {/* Like Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsLiked(!isLiked)}
        className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-black/60 backdrop-blur-sm flex items-center justify-center hover:bg-red-600/30 transition-colors"
      >
        <Heart className={`w-5 h-5 ${isLiked ? 'fill-red-500 text-red-500' : 'text-white'}`} />
      </motion.button>
      
      {/* Discount Badge */}
      {discount > 0 && (
        <div className="absolute top-4 right-16 z-10 px-3 py-1 rounded-full bg-gradient-to-r from-red-600 to-pink-600 shadow-lg">
          <span className="text-xs font-bold text-white">-{discount}%</span>
        </div>
      )}
      
      {/* Image Section */}
      <div className="relative h-64 bg-gradient-to-br from-gray-900 to-black flex items-center justify-center overflow-hidden">
        <motion.div
          whileHover={{ scale: 1.1, rotate: 5 }}
          transition={{ duration: 0.3 }}
          className="text-8xl"
        >
          {item.image}
        </motion.div>
        
        {/* Stock Warning */}
        {item.stock < 10 && (
          <div className="absolute bottom-4 left-4 px-3 py-1 rounded-lg bg-red-600/90 backdrop-blur-sm">
            <span className="text-xs font-semibold text-white">Осталось {item.stock} шт.</span>
          </div>
        )}
      </div>
      
      {/* Content */}
      <div className="p-6 relative flex flex-col flex-1">
        {/* Category */}
        <div className="flex items-center gap-2 mb-3">
          <Tag className="w-4 h-4 text-primary" />
          <span className="text-xs font-semibold text-primary uppercase tracking-wider">
            {item.category}
          </span>
        </div>
        
        {/* Title */}
        <h3 className="text-xl font-bold text-white mb-2 line-clamp-2 min-h-[3.5rem] group-hover:text-primary transition-colors">
          {item.name}
        </h3>
        
        {/* Description */}
        <p className="text-sm text-gray-400 mb-4 line-clamp-2 min-h-[2.5rem]">
          {item.description}
        </p>
        
        {/* Rating & Reviews */}
        <div className="flex items-center gap-3 mb-4">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 text-yellow-500 fill-current" />
            <span className="text-sm font-semibold text-white">{item.rating}</span>
          </div>
          <span className="text-xs text-gray-500">({item.reviews} отзывов)</span>
        </div>
        
        {/* Size Selector */}
        <div className="mb-4">
          {item.sizes && item.sizes.length > 0 && (
            <>
              <label className="text-xs text-gray-400 mb-2 block">Размер:</label>
              <div className="flex flex-wrap gap-2 min-h-[2rem]">
                {item.sizes.map(size => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                      selectedSize === size
                        ? 'bg-gradient-to-r from-primary to-red-600 text-white'
                        : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
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
              <label className="text-xs text-gray-400 mb-2 block">Цвет:</label>
              <div className="flex flex-wrap gap-2 min-h-[2rem]">
                {item.colors.map(color => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                      selectedColor === color
                        ? 'bg-gradient-to-r from-primary to-red-600 text-white'
                        : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
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
              <span className="text-2xl font-bold text-white">{item.price.toLocaleString()} с</span>
              {item.originalPrice && (
                <span className="text-sm text-gray-500 line-through">{item.originalPrice.toLocaleString()} с</span>
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
              ? 'bg-green-600/20 text-green-400 border border-green-600/50'
              : 'bg-gradient-to-r from-primary to-red-600 text-white hover:shadow-lg hover:shadow-primary/50'
          }`}
        >
          {inCart ? (
            <>
              <Check className="w-5 h-5" />
              <span>В корзине</span>
            </>
          ) : (
            <>
              <ShoppingCart className="w-5 h-5" />
              <span>Добавить в корзину</span>
            </>
          )}
        </motion.button>
        
        {/* Added Message */}
        {showAddedMessage && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="absolute bottom-4 left-4 right-4 bg-green-600 text-white text-sm font-semibold py-2 px-4 rounded-lg text-center"
          >
            ✓ Добавлено в корзину!
          </motion.div>
        )}
        
        {/* Tags */}
        {item.tags && item.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-gray-800">
            {item.tags.map(tag => (
              <span
                key={tag}
                className="px-2 py-1 rounded-md bg-gray-800/50 text-xs text-gray-400"
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
