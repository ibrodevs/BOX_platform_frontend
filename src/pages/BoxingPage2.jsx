import { motion } from 'framer-motion'

export default function BoxingPage2({ onProgress }) {
  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-bold text-white">Страница 2: Ударная техника</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gray-800 p-6 rounded-xl"
        >
          <h4 className="text-xl font-semibold text-white mb-4">Основные удары</h4>
          <ul className="space-y-3">
            {['Джеб (передней рукой)', 'Кросс (задней рукой)', 'Хук с передней', 'Хук с задней', 'Апперкот'].map((item, i) => (
              <li key={i} className="text-gray-300">{i+1}. {item}</li>
            ))}
          </ul>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gray-800 p-6 rounded-xl"
        >
          <h4 className="text-xl font-semibold text-white mb-4">Правила нанесения</h4>
          <ul className="space-y-3">
            {['Вращение корпуса', 'Перенос веса', 'Возврат руки', 'Защита второй рукой'].map((item, i) => (
              <li key={i} className="text-gray-300">• {item}</li>
            ))}
          </ul>
        </motion.div>
      </div>
    </div>
  )
}