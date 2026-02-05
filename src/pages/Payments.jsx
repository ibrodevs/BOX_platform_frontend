import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import Loader from '../components/ui/Loader'

export default function Payments() {
  const [loading, setLoading] = useState(true)
  const [payments, setPayments] = useState([])

  useEffect(() => {
    fetchPayments()
  }, [])

  const fetchPayments = async () => {
    try {
      // Mock data for now - replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 500))
      
      // Example payments data
      setPayments([
        {
          id: 1,
          course_title: 'Основы бокса для начинающих',
          amount: 2990,
          status: 'completed',
          date: '2026-01-15T10:30:00',
          payment_method: 'Банковская карта'
        },
        {
          id: 2,
          course_title: 'Продвинутые техники',
          amount: 4990,
          status: 'completed',
          date: '2026-01-20T14:15:00',
          payment_method: 'Банковская карта'
        },
      ])
    } catch (error) {
      console.error('Failed to fetch payments:', error)
    } finally {
      setLoading(false)
    }
  }

  const getStatusBadge = (status) => {
    const badges = {
      completed: { text: 'Оплачен', className: 'bg-green-600/20 text-green-400' },
      pending: { text: 'Ожидание', className: 'bg-yellow-600/20 text-yellow-400' },
      failed: { text: 'Отклонен', className: 'bg-red-600/20 text-red-400' },
    }
    const badge = badges[status] || badges.completed
    return (
      <span className={`px-3 py-1 rounded-full text-xs font-bold ${badge.className}`}>
        {badge.text}
      </span>
    )
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('ru-RU', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const formatPrice = (price) => {
    return new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: 'KGS',
      minimumFractionDigits: 0
    }).format(price)
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
        <h1 className="text-4xl font-black mb-8">История платежей</h1>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="card bg-gradient-to-br from-primary/20 to-transparent">
            <div className="text-3xl font-black mb-2">
              {formatPrice(payments.reduce((sum, p) => sum + (p.status === 'completed' ? p.amount : 0), 0))}
            </div>
            <div className="text-gray-400">Всего потрачено</div>
          </div>
          <div className="card bg-gradient-to-br from-green-600/20 to-transparent">
            <div className="text-3xl font-black mb-2">
              {payments.filter(p => p.status === 'completed').length}
            </div>
            <div className="text-gray-400">Успешных платежей</div>
          </div>
          <div className="card bg-gradient-to-br from-blue-600/20 to-transparent">
            <div className="text-3xl font-black mb-2">
              {payments.length}
            </div>
            <div className="text-gray-400">Всего транзакций</div>
          </div>
        </div>

        {/* Payments List */}
        <div className="space-y-4">
          {payments.length > 0 ? (
            payments.map((payment) => (
              <motion.div
                key={payment.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="card"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-bold">{payment.course_title}</h3>
                      {getStatusBadge(payment.status)}
                    </div>
                    <div className="flex flex-wrap gap-4 text-sm text-gray-400">
                      <span>📅 {formatDate(payment.date)}</span>
                      <span>💳 {payment.payment_method}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-black text-primary">
                      {formatPrice(payment.amount)}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="card text-center py-12">
              <div className="text-6xl mb-4">💳</div>
              <h3 className="text-xl font-bold mb-2">Нет платежей</h3>
              <p className="text-gray-400 mb-6">
                У вас пока нет истории платежей
              </p>
              <a href="/courses" className="btn-primary inline-block">
                Купить курс
              </a>
            </div>
          )}
        </div>

        {/* Help Section */}
        <div className="card mt-12 bg-gradient-to-r from-primary/10 to-transparent">
          <div className="flex items-start gap-4">
            <div className="text-4xl">💡</div>
            <div>
              <h3 className="font-bold mb-2">Нужна помощь?</h3>
              <p className="text-gray-400 mb-4">
                Если у вас возникли вопросы по платежам, свяжитесь с нашей поддержкой
              </p>
              <button className="text-primary hover:underline">
                Связаться с поддержкой →
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
