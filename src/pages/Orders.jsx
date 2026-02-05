import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { Package, CheckCircle, Truck, Clock, ChevronDown, ChevronUp } from 'lucide-react'
import Loader from '../components/ui/Loader'
import { useTranslation } from 'react-i18next'

export default function Orders() {
  const { t, i18n } = useTranslation()
  const [loading, setLoading] = useState(true)
  const [orders, setOrders] = useState([])
  const [expandedOrder, setExpandedOrder] = useState(null)

  useEffect(() => {
    fetchOrders()
  }, [])

  const fetchOrders = async () => {
    try {
      await new Promise(resolve => setTimeout(resolve, 500))
      
      // Получить заказы из localStorage
      const savedOrders = JSON.parse(localStorage.getItem('orders') || '[]')
      setOrders(savedOrders)
    } catch (error) {
      console.error('Failed to fetch orders:', error)
    } finally {
      setLoading(false)
    }
  }

  const getStatusBadge = (status) => {
    const statuses = {
      completed: {
        text: t('orders.delivered'),
        icon: CheckCircle,
        className: 'bg-green-600/20 text-green-400 border-green-600/30'
      },
      processing: {
        text: t('orders.processing'),
        icon: Clock,
        className: 'bg-yellow-600/20 text-yellow-400 border-yellow-600/30'
      },
      shipping: {
        text: t('orders.shipped'),
        icon: Truck,
        className: 'bg-blue-600/20 text-blue-400 border-blue-600/30'
      }
    }
    
    const statusInfo = statuses[status] || statuses.completed
    const Icon = statusInfo.icon
    
    return (
      <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold border ${statusInfo.className}`}>
        <Icon className="w-3 h-3" />
        {statusInfo.text}
      </span>
    )
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString(i18n.language || 'ru', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const toggleOrder = (orderId) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId)
  }

  if (loading) {
    return <Loader fullScreen />
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen py-20"
    >
      <div className="container-custom">
        <div className="mb-8">
          <h1 className="text-4xl font-black mb-2">{t('orders.title')}</h1>
          <p className="text-gray-400">{t('orders.subtitle')}</p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="card bg-gradient-to-br from-primary/20 to-transparent">
            <div className="text-3xl font-black mb-2">
              {orders.reduce((sum, o) => sum + o.total, 0).toLocaleString()} {t('common.currency')}
            </div>
            <div className="text-gray-400">{t('orders.totalSpent')}</div>
          </div>
          <div className="card bg-gradient-to-br from-green-600/20 to-transparent">
            <div className="text-3xl font-black mb-2">
              {orders.filter(o => o.status === 'completed').length}
            </div>
            <div className="text-gray-400">{t('orders.deliveredCount')}</div>
          </div>
          <div className="card bg-gradient-to-br from-blue-600/20 to-transparent">
            <div className="text-3xl font-black mb-2">
              {orders.length}
            </div>
            <div className="text-gray-400">{t('orders.totalOrders')}</div>
          </div>
        </div>

        {/* Orders List */}
        <div className="space-y-4">
          {orders.length > 0 ? (
            orders.map((order) => (
              <motion.div
                key={order.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="card overflow-hidden"
              >
                {/* Order Header */}
                <div 
                  className="flex flex-col md:flex-row md:items-center justify-between gap-4 cursor-pointer"
                  onClick={() => toggleOrder(order.id)}
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-r from-primary to-red-600 flex items-center justify-center">
                        <Package className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-white">{t('orders.orderNumberLabel', { id: order.id })}</h3>
                        <p className="text-sm text-gray-400">
                          {formatDate(order.date)}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap items-center gap-4">
                      {getStatusBadge(order.status)}
                      <span className="text-sm text-gray-400">
                        {t('shop.results.items', { count: order.items.length })}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <div className="text-sm text-gray-400 mb-1">{t('orders.orderTotal')}</div>
                      <div className="text-2xl font-black text-primary">
                        {order.total.toLocaleString()} {t('common.currency')}
                      </div>
                    </div>
                    
                    <button className="p-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors">
                      {expandedOrder === order.id ? (
                        <ChevronUp className="w-5 h-5 text-gray-400" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-gray-400" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Order Details - Expanded */}
                {expandedOrder === order.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="mt-6 pt-6 border-t border-gray-800"
                  >
                    {/* Customer Info */}
                    <div className="mb-6">
                      <h4 className="text-sm font-bold text-gray-400 mb-3">{t('orders.shippingInfo')}</h4>
                      <div className="bg-gray-800/30 rounded-lg p-4 space-y-2">
                        <p className="text-white">
                          <span className="text-gray-400">{t('orders.recipient')}:</span> {order.customerInfo.name}
                        </p>
                        <p className="text-white">
                          <span className="text-gray-400">{t('orders.phone')}:</span> {order.customerInfo.phone}
                        </p>
                        <p className="text-white">
                          <span className="text-gray-400">{t('orders.city')}:</span> {order.customerInfo.city}
                        </p>
                        <p className="text-white">
                          <span className="text-gray-400">{t('orders.address')}:</span> {order.customerInfo.address}
                        </p>
                      </div>
                    </div>

                    {/* Items */}
                    <div>
                      <h4 className="text-sm font-bold text-gray-400 mb-3">{t('orders.itemsTitle')}</h4>
                      <div className="space-y-3">
                        {order.items.map((item, index) => (
                          <div
                            key={index}
                            className="bg-gray-800/30 rounded-lg p-4 flex items-center gap-4"
                          >
                            <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-gray-900 to-black flex items-center justify-center text-2xl">
                              {item.image}
                            </div>
                            <div className="flex-1">
                              <h5 className="font-semibold text-white mb-1">{item.name}</h5>
                              <div className="flex gap-2 text-xs text-gray-400">
                                {item.selectedSize && <span>{t('merch.size')}: {item.selectedSize}</span>}
                                {item.selectedColor && <span>• {t('merch.color')}: {item.selectedColor}</span>}
                                <span>• {t('merch.quantity')}: {item.quantity}</span>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="text-lg font-bold text-white">
                                {(item.price * item.quantity).toLocaleString()} {t('common.currency')}
                              </div>
                              <div className="text-xs text-gray-400">
                                {item.price.toLocaleString()} {t('common.currency')} × {item.quantity}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Order Summary */}
                    <div className="mt-6 bg-gradient-to-r from-primary/10 to-transparent rounded-lg p-4 border border-primary/20">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-gray-400">{t('orders.itemsSubtotal')}:</span>
                        <span className="text-white font-semibold">{order.total.toLocaleString()} {t('common.currency')}</span>
                      </div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-gray-400">{t('orders.delivery')}:</span>
                        <span className="text-green-400 font-semibold">{t('orders.freeDelivery')}</span>
                      </div>
                      <div className="border-t border-gray-700 my-3"></div>
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-bold text-white">{t('orders.total')}:</span>
                        <span className="text-2xl font-black text-primary">{order.total.toLocaleString()} {t('common.currency')}</span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            ))
          ) : (
            <div className="card text-center py-12">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 200 }}
                className="w-20 h-20 rounded-full bg-gray-800/50 flex items-center justify-center mx-auto mb-4"
              >
                <Package className="w-10 h-10 text-gray-600" />
              </motion.div>
              <h3 className="text-xl font-bold mb-2">{t('orders.emptyTitle')}</h3>
              <p className="text-gray-400 mb-6">
                {t('orders.emptySubtitle')}
              </p>
              <a href="/merch" className="btn-primary inline-block">
                {t('orders.goToShop')}
              </a>
            </div>
          )}
        </div>

        {/* Help Section */}
        {orders.length > 0 && (
          <div className="card mt-12 bg-gradient-to-r from-primary/10 to-transparent">
            <div className="flex items-start gap-4">
              <div className="text-4xl">💡</div>
              <div>
                <h3 className="font-bold mb-2">{t('orders.helpTitle')}</h3>
                <p className="text-gray-400 mb-4">
                  {t('orders.helpSubtitle')}
                </p>
                <button className="text-primary hover:underline">
                  {t('orders.contactSupport')}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  )
}
