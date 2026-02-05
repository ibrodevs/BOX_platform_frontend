import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuthStore } from '../store/authStore'
import { sendAIMessage } from '../services/apiService'

export default function AIChat() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const { isAuthenticated } = useAuthStore()

  const handleSend = async () => {
    if (!input.trim() || loading) return

    const userMessage = input.trim()
    setInput('')
    
    setMessages(prev => [...prev, { role: 'user', content: userMessage }])
    setLoading(true)

    try {
      if (isAuthenticated) {
        const response = await sendAIMessage(userMessage)
        // API возвращает объект с полем response (текст ответа AI)
        const aiResponse = response.data?.response || response.data?.message || 'Получен пустой ответ'
        setMessages(prev => [...prev, { role: 'assistant', content: aiResponse }])
      } else {
        // Демо ответы для неавторизованных
        setTimeout(() => {
          const demoResponses = [
            'Привет! Я AI-тренер. Чтобы получить персональные рекомендации, пожалуйста, авторизуйтесь.',
            'Для начинающих рекомендую курс "Основы бокса". Там есть всё необходимое!',
            'Бокс - это не только сила, но и техника. Правильная стойка - основа всего.',
            'Тренируйтесь регулярно! Минимум 3 раза в неделю для видимого прогресса.'
          ]
          const randomResponse = demoResponses[Math.floor(Math.random() * demoResponses.length)]
          setMessages(prev => [...prev, { role: 'assistant', content: randomResponse }])
          setLoading(false)
        }, 1000)
        return
      }
    } catch (error) {
      console.error('AI Error:', error)
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: 'Извините, произошла ошибка. Попробуйте позже.' 
      }])
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      {/* Chat Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 bg-primary text-white rounded-full w-16 h-16 flex items-center justify-center shadow-2xl z-50"
      >
        {isOpen ? '✕' : '💬'}
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.8 }}
            className="fixed bottom-24 right-6 w-96 h-[500px] bg-dark border-2 border-gray-800 rounded-lg shadow-2xl z-50 flex flex-col"
          >
            {/* Header */}
            <div className="bg-primary p-4 rounded-t-lg">
              <h3 className="font-bold text-lg">🥊 AI Тренер</h3>
              <p className="text-xs opacity-90">Задай вопрос о технике бокса</p>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.length === 0 && (
                <div className="text-center text-gray-500 mt-8">
                  <p>Привет! Я твой AI тренер.</p>
                  <p className="text-sm mt-2">Задай мне любой вопрос о боксе!</p>
                </div>
              )}
              
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-lg ${
                      msg.role === 'user'
                        ? 'bg-primary text-white'
                        : 'bg-gray-800 text-white'
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}
              
              {loading && (
                <div className="flex justify-start">
                  <div className="bg-gray-800 p-3 rounded-lg">
                    <span className="animate-pulse">Печатает...</span>
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <div className="p-4 border-t border-gray-800">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Напиши сообщение..."
                  className="flex-1 bg-gray-900 border border-gray-700 rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-primary"
                  disabled={loading}
                />
                <button
                  onClick={handleSend}
                  disabled={loading || !input.trim()}
                  className="bg-primary text-white px-4 py-2 rounded font-bold hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  ➤
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
