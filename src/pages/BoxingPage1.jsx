import { motion } from 'framer-motion'
import { CheckCircle, Circle } from 'lucide-react'

export default function BoxingPage1({ onProgress }) {
  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-bold text-white">Страница 1: Основы бокса</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gray-800 p-6 rounded-xl"
        >
          <h4 className="text-xl font-semibold text-white mb-4">Боксерская стойка</h4>
          <ul className="space-y-3">
            {['Ноги на ширине плеч', 'Вес на передней ноге', 'Подбородок опущен', 'Кулаки у лица'].map((item, i) => (
              <li key={i} className="flex items-center gap-2 text-gray-300">
                <CheckCircle className="w-4 h-4 text-green-500" />
                {item}
              </li>
            ))}
          </ul>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gray-800 p-6 rounded-xl"
        >
          <h4 className="text-xl font-semibold text-white mb-4">Передвижения</h4>
          <ul className="space-y-3">
            {['Шаг вперед', 'Шаг назад', 'Шаг влево', 'Шаг вправо', 'Челночный бег'].map((item, i) => (
              <li key={i} className="flex items-center gap-2 text-gray-300">
                <Circle className="w-4 h-4 text-blue-500" />
                {item}
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </div>
  )
}