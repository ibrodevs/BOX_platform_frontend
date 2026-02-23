import { motion } from 'framer-motion'

export default function BoxingPage5({ onProgress }) {
  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-bold text-white">Страница 5: Спарринг и психология</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gray-800 p-6 rounded-xl"
        >
          <h4 className="text-xl font-semibold text-white mb-4">Спарринг</h4>
          <ul className="space-y-3">
            {['Условный спарринг', 'Вольный спарринг', 'Работа с тенью', 'Работа на мешке'].map((item, i) => (
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
          <h4 className="text-xl font-semibold text-white mb-4">Психология</h4>
          <ul className="space-y-3">
            {['Концентрация', 'Контроль эмоций', 'Визуализация', 'Настрой на бой'].map((item, i) => (
              <li key={i} className="text-gray-300">• {item}</li>
            ))}
          </ul>
        </motion.div>
      </div>
    </div>
  )
}