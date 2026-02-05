import { motion, AnimatePresence } from 'framer-motion'
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight, Package, CreditCard, User, Phone, MapPin, CheckCircle } from 'lucide-react'
import { useCart } from '../hooks/useCart'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { useState } from 'react'

export default function Cart({ isOpen, onClose }) {
  const { items, removeItem, updateQuantity, getTotalPrice, getTotalItems, clearCart } = useCart()
  const { t } = useTranslation()
  const [showCheckout, setShowCheckout] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    city: 'Бишкек',
    cardNumber: '',
    cardExpiry: '',
    cardCVV: ''
  })

  const handleCheckout = () => {
    setShowCheckout(true)
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmitOrder = async (e) => {
    e.preventDefault()
    e.stopPropagation()
    setIsProcessing(true)

    // Симуляция обработки платежа
    await new Promise(resolve => setTimeout(resolve, 2000))

    // Сохранить заказ в localStorage для истории
    const order = {
      id: Date.now(),
      items: items,
      total: getTotalPrice(),
      customerInfo: {
        name: formData.name,
        phone: formData.phone,
        address: formData.address,
        city: formData.city
      },
      date: new Date().toISOString(),
      status: 'completed'
    }

    const existingOrders = JSON.parse(localStorage.getItem('orders') || '[]')
    localStorage.setItem('orders', JSON.stringify([order, ...existingOrders]))

    setIsProcessing(false)
    setShowCheckout(false)
    setShowSuccess(true)
    clearCart()

    // Закрыть модальное окно успеха через 3 секунды
    setTimeout(() => {
      setShowSuccess(false)
      setFormData({
        name: '',
        phone: '',
        address: '',
        city: 'Бишкек',
        cardNumber: '',
        cardExpiry: '',
        cardCVV: ''
      })
    }, 3000)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => {
              if (!showCheckout && !showSuccess) {
                onClose()
              }
            }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          {/* Cart Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-gradient-to-br from-gray-900 to-black border-l border-gray-800 shadow-2xl z-50 flex flex-col"
          >
            {/* Header */}
            <div className="p-6 border-b border-gray-800">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-primary to-red-600 flex items-center justify-center">
                    <ShoppingBag className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white">{t('cart.title')}</h2>
                    <p className="text-sm text-gray-400">
                      {t('shop.results.items', { count: getTotalItems() })}
                    </p>
                  </div>
                </div>
                
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={onClose}
                  className="p-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors"
                >
                  <X className="w-5 h-5 text-gray-400" />
                </motion.button>
              </div>

              {items.length > 0 && (
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={clearCart}
                  className="w-full mt-3 px-4 py-2 rounded-lg bg-red-600/10 border border-red-600/30 text-red-400 text-sm font-semibold hover:bg-red-600/20 transition-colors flex items-center justify-center gap-2"
                >
                  <Trash2 className="w-4 h-4" />
                  {t('cart.clear')}
                </motion.button>
              )}
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                    className="w-24 h-24 rounded-full bg-gray-800/50 flex items-center justify-center mb-4"
                  >
                    <Package className="w-12 h-12 text-gray-600" />
                  </motion.div>
                  <h3 className="text-lg font-semibold text-gray-400 mb-2">{t('cart.empty')}</h3>
                  <p className="text-sm text-gray-600 mb-6">
                    {t('cart.emptySubtitle')}
                  </p>
                  <Link
                    to="/merch"
                    onClick={onClose}
                    className="px-6 py-3 rounded-xl bg-gradient-to-r from-primary to-red-600 text-white font-semibold hover:shadow-lg hover:shadow-primary/50 transition-all"
                  >
                    {t('cart.goToShop')}
                  </Link>
                </div>
              ) : (
                items.map((item, index) => (
                  <motion.div
                    key={`${item.id}-${item.selectedSize}-${item.selectedColor}`}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ delay: index * 0.05 }}
                    className="bg-gray-800/30 rounded-xl p-4 border border-gray-800 hover:border-gray-700 transition-colors"
                  >
                    <div className="flex gap-4">
                      {/* Item Image */}
                      <div className="w-20 h-20 rounded-lg bg-gradient-to-br from-gray-900 to-black flex items-center justify-center text-4xl flex-shrink-0">
                        {item.image}
                      </div>

                      {/* Item Details */}
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-semibold text-white mb-1 truncate">
                          {item.name}
                        </h4>
                        
                        {/* Size & Color */}
                        <div className="flex gap-2 mb-2">
                          {item.selectedSize && (
                            <span className="px-2 py-0.5 rounded bg-gray-900 text-xs text-gray-400">
                              {item.selectedSize}
                            </span>
                          )}
                          {item.selectedColor && (
                            <span className="px-2 py-0.5 rounded bg-gray-900 text-xs text-gray-400">
                              {item.selectedColor}
                            </span>
                          )}
                        </div>

                        {/* Price & Quantity Controls */}
                        <div className="flex items-center justify-between">
                          <span className="text-lg font-bold text-white">
                            {(item.price * item.quantity).toLocaleString()} {t('common.currency')}
                          </span>

                          <div className="flex items-center gap-2">
                            {/* Decrease */}
                            <motion.button
                              type="button"
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => updateQuantity(item.id, item.quantity - 1, item.selectedSize, item.selectedColor)}
                              className="w-7 h-7 rounded-lg bg-gray-900 hover:bg-gray-800 flex items-center justify-center transition-colors"
                            >
                              <Minus className="w-3 h-3 text-gray-400" />
                            </motion.button>

                            {/* Quantity */}
                            <span className="w-8 text-center text-sm font-semibold text-white">
                              {item.quantity}
                            </span>

                            {/* Increase */}
                            <motion.button
                              type="button"
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => updateQuantity(item.id, item.quantity + 1, item.selectedSize, item.selectedColor)}
                              className="w-7 h-7 rounded-lg bg-gray-900 hover:bg-gray-800 flex items-center justify-center transition-colors"
                            >
                              <Plus className="w-3 h-3 text-gray-400" />
                            </motion.button>

                            {/* Remove */}
                            <motion.button
                              type="button"
                              whileHover={{ scale: 1.1, rotate: 15 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => removeItem(item.id, item.selectedSize, item.selectedColor)}
                              className="ml-2 w-7 h-7 rounded-lg bg-red-600/20 hover:bg-red-600/30 flex items-center justify-center transition-colors"
                            >
                              <Trash2 className="w-3 h-3 text-red-400" />
                            </motion.button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {/* Footer - Checkout */}
            {items.length > 0 && (
              <div className="p-6 border-t border-gray-800 bg-black/50">
                {/* Total */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-gray-400">{t('cart.total')}:</span>
                  <span className="text-2xl font-bold text-white">
                    {getTotalPrice().toLocaleString()} {t('common.currency')}
                  </span>
                </div>

                {/* Checkout Button */}
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleCheckout}
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-primary to-red-600 text-white font-bold flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-primary/50 transition-all relative overflow-hidden group"
                >
                  <span>{t('cart.checkout')}</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  
                  {/* Shine effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                    animate={{
                      x: ['-100%', '100%'],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      repeatType: "loop",
                    }}
                  />
                </motion.button>

                {/* Continue Shopping */}
                <Link
                  to="/merch"
                  onClick={onClose}
                  className="block mt-3 text-center text-sm text-gray-400 hover:text-white transition-colors"
                >
                  {t('cart.continue')}
                </Link>
              </div>
            )}
          </motion.div>

          {/* Checkout Modal */}
          <AnimatePresence>
            {showCheckout && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="fixed inset-0 flex items-center justify-center z-[60] p-4"
                onClick={(e) => e.stopPropagation()}
              >
                <div 
                  className="bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
                  onClick={(e) => e.stopPropagation()}
                >
                  {/* Header */}
                  <div className="p-6 border-b border-gray-800 flex items-center justify-between sticky top-0 bg-gray-900/95 backdrop-blur-lg z-10">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-r from-primary to-red-600 flex items-center justify-center">
                        <CreditCard className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h2 className="text-xl font-bold text-white">{t('checkout.title')}</h2>
                        <p className="text-sm text-gray-400">{t('checkout.subtitle')}</p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => setShowCheckout(false)}
                      className="p-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors"
                    >
                      <X className="w-5 h-5 text-gray-400" />
                    </button>
                  </div>

                  {/* Form */}
                  <form onSubmit={handleSubmitOrder} className="p-6 space-y-6">
                    {/* Контактные данные */}
                    <div>
                      <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                        <User className="w-5 h-5 text-primary" />
                        {t('checkout.contactTitle')}
                      </h3>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-semibold text-gray-400 mb-2">
                            {t('checkout.fullName')} *
                          </label>
                          <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                            className="w-full px-4 py-3 rounded-lg bg-gray-800/50 border border-gray-700 text-white focus:border-primary focus:outline-none transition-colors"
                            placeholder={t('checkout.fullNamePlaceholder')}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-gray-400 mb-2">
                            {t('checkout.phone')} *
                          </label>
                          <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            required
                            className="w-full px-4 py-3 rounded-lg bg-gray-800/50 border border-gray-700 text-white focus:border-primary focus:outline-none transition-colors"
                            placeholder={t('checkout.phonePlaceholder')}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Адрес доставки */}
                    <div>
                      <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                        <MapPin className="w-5 h-5 text-primary" />
                        {t('checkout.deliveryAddressTitle')}
                      </h3>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-semibold text-gray-400 mb-2">
                            {t('checkout.city')} *
                          </label>
                          <select
                            name="city"
                            value={formData.city}
                            onChange={handleInputChange}
                            required
                            className="w-full px-4 py-3 rounded-lg bg-gray-800/50 border border-gray-700 text-white focus:border-primary focus:outline-none transition-colors"
                          >
                            <option value={t('checkout.cities.bishkek')}>{t('checkout.cities.bishkek')}</option>
                            <option value={t('checkout.cities.osh')}>{t('checkout.cities.osh')}</option>
                            <option value={t('checkout.cities.jalalAbad')}>{t('checkout.cities.jalalAbad')}</option>
                            <option value={t('checkout.cities.karakol')}>{t('checkout.cities.karakol')}</option>
                            <option value={t('checkout.cities.tokmok')}>{t('checkout.cities.tokmok')}</option>
                            <option value={t('checkout.cities.balykchy')}>{t('checkout.cities.balykchy')}</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-gray-400 mb-2">
                            {t('checkout.address')} *
                          </label>
                          <textarea
                            name="address"
                            value={formData.address}
                            onChange={handleInputChange}
                            required
                            rows="3"
                            className="w-full px-4 py-3 rounded-lg bg-gray-800/50 border border-gray-700 text-white focus:border-primary focus:outline-none transition-colors resize-none"
                            placeholder={t('checkout.addressPlaceholder')}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Данные карты */}
                    <div>
                      <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                        <CreditCard className="w-5 h-5 text-primary" />
                        {t('checkout.paymentTitle')}
                      </h3>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-semibold text-gray-400 mb-2">
                            {t('checkout.cardNumber')} *
                          </label>
                          <input
                            type="text"
                            name="cardNumber"
                            value={formData.cardNumber}
                            onChange={handleInputChange}
                            required
                            maxLength="19"
                            className="w-full px-4 py-3 rounded-lg bg-gray-800/50 border border-gray-700 text-white focus:border-primary focus:outline-none transition-colors"
                            placeholder={t('checkout.cardNumberPlaceholder')}
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-semibold text-gray-400 mb-2">
                              {t('checkout.expiryDate')} *
                            </label>
                            <input
                              type="text"
                              name="cardExpiry"
                              value={formData.cardExpiry}
                              onChange={handleInputChange}
                              required
                              maxLength="5"
                              className="w-full px-4 py-3 rounded-lg bg-gray-800/50 border border-gray-700 text-white focus:border-primary focus:outline-none transition-colors"
                              placeholder={t('checkout.expiryPlaceholder')}
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-semibold text-gray-400 mb-2">
                              {t('checkout.cvv')} *
                            </label>
                            <input
                              type="text"
                              name="cardCVV"
                              value={formData.cardCVV}
                              onChange={handleInputChange}
                              required
                              maxLength="3"
                              className="w-full px-4 py-3 rounded-lg bg-gray-800/50 border border-gray-700 text-white focus:border-primary focus:outline-none transition-colors"
                              placeholder={t('checkout.cvvPlaceholder')}
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Итого */}
                    <div className="bg-gradient-to-r from-primary/10 to-transparent rounded-lg p-4 border border-primary/20">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-gray-400">{t('checkout.items', { count: getTotalItems() })}</span>
                        <span className="text-white font-semibold">{getTotalPrice().toLocaleString()} {t('common.currency')}</span>
                      </div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-gray-400">{t('checkout.delivery')}:</span>
                        <span className="text-green-400 font-semibold">{t('checkout.freeDelivery')}</span>
                      </div>
                      <div className="border-t border-gray-700 my-3"></div>
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-bold text-white">{t('checkout.totalToPay')}</span>
                        <span className="text-2xl font-black text-primary">{getTotalPrice().toLocaleString()} {t('common.currency')}</span>
                      </div>
                    </div>

                    {/* Buttons */}
                    <div className="flex gap-3">
                      <button
                        type="button"
                        onClick={() => setShowCheckout(false)}
                        className="flex-1 py-3 rounded-xl bg-gray-800 text-white font-semibold hover:bg-gray-700 transition-colors"
                      >
                        {t('checkout.cancel')}
                      </button>
                      <button
                        type="submit"
                        disabled={isProcessing}
                        className="flex-1 py-3 rounded-xl bg-gradient-to-r from-primary to-red-600 text-white font-bold hover:shadow-lg hover:shadow-primary/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isProcessing ? t('checkout.processing') : t('checkout.pay')}
                      </button>
                    </div>

                    <p className="text-xs text-center text-gray-500">
                      {t('checkout.terms')}
                    </p>
                  </form>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Success Modal */}
          <AnimatePresence>
            {showSuccess && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="fixed inset-0 flex items-center justify-center z-[70] p-4"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="bg-gradient-to-br from-gray-900 to-black border border-green-600/30 rounded-2xl max-w-md w-full p-8 text-center shadow-2xl">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
                    className="w-20 h-20 rounded-full bg-gradient-to-r from-green-500 to-green-600 flex items-center justify-center mx-auto mb-6"
                  >
                    <CheckCircle className="w-10 h-10 text-white" />
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <h2 className="text-2xl font-bold text-white mb-3">{t('checkout.successTitle')}</h2>
                    <p className="text-gray-400 mb-6">
                      {t('checkout.successSubtitle')}
                    </p>
                    <div className="bg-green-600/10 rounded-lg p-4 mb-6">
                      <p className="text-sm text-gray-400 mb-1">{t('checkout.orderAmountLabel')}</p>
                      <p className="text-3xl font-black text-green-400">{getTotalPrice().toLocaleString()} {t('common.currency')}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setShowSuccess(false)
                        onClose()
                      }}
                      className="w-full py-3 rounded-xl bg-gradient-to-r from-primary to-red-600 text-white font-bold hover:shadow-lg hover:shadow-primary/50 transition-all"
                    >
                      {t('checkout.successButton')}
                    </button>
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}
    </AnimatePresence>
  )
}
