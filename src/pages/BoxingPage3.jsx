import { motion } from 'framer-motion'

export default function BoxingPage3({ onProgress }) {
  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-bold text-white">Страница 3: Защита и контратаки</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gray-800 p-6 rounded-xl"
        >
          <h4 className="text-xl font-semibold text-white mb-4">Элементы защиты</h4>
          <ul className="space-y-3">
            {['Блок перчаткой', 'Уклон влево', 'Уклон вправо', 'Нырок', 'Отбив'].map((item, i) => (
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
          <h4 className="text-xl font-semibold text-white mb-4">Контратаки</h4>
          <ul className="space-y-3">
            {['Встречный джеб', 'Контрудар после уклона', 'Двойка после блока', 'Серия после нырка'].map((item, i) => (
              <li key={i} className="text-gray-300">• {item}</li>
            ))}
          </ul>
        </motion.div>
      </div>
    </div>
  )
}