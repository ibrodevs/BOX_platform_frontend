import { motion } from 'framer-motion'

export default function BoxingPage4({ onProgress }) {
  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-bold text-white">Страница 4: Комбинации и тактика</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gray-800 p-6 rounded-xl"
        >
          <h4 className="text-xl font-semibold text-white mb-4">Базовые комбинации</h4>
          <ul className="space-y-3">
            {['Джеб-кросс', 'Джеб-джеб-кросс', 'Джеб-хук-кросс', 'Кросс-хук-кросс'].map((item, i) => (
              <li key={i} className="text-gray-300">• {item}</li>
            ))}
          </ul>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gray-800 p-6 rounded-xl"
        >
          <h4 className="text-xl font-semibold text-white mb-4">Тактические приемы</h4>
          <ul className="space-y-3">
            {['Работа на дистанции', 'Работа в клинче', 'Разведка джебом', 'Смена стоек'].map((item, i) => (
              <li key={i} className="text-gray-300">• {item}</li>
            ))}
          </ul>
        </motion.div>
      </div>
    </div>
  )
}