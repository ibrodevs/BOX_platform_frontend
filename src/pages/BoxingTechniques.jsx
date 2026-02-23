import { motion } from 'framer-motion'
import { useState } from 'react'
import { Play, Info, Target, Shield, Zap } from 'lucide-react'

const techniques = {
  jab: {
    name: 'Джеб',
    description: 'Прямой удар передней рукой. Основа бокса для контроля дистанции.',
    videoUrl: '/videos/boxing/jab.mp4',
    tips: [
      'Держите подбородок опущенным',
      'Вращайте кулат в последний момент',
      'Возвращайте руку быстрее, чем наносили удар'
    ],
    commonMistakes: [
      'Опускание руки после удара',
      'Отклонение корпуса назад',
      'Забывать защищать подбородок второй рукой'
    ],
    icon: Target
  },
  cross: {
    name: 'Кросс',
    description: 'Прямой удар задней рукой. Самый сильный удар в боксе.',
    videoUrl: '/videos/boxing/cross.mp4',
    tips: [
      'Вращайте корпус и бедро',
      'Переносите вес на переднюю ногу',
      'Держите заднюю пятку поднятой'
    ],
    commonMistakes: [
      'Удар только рукой, без корпуса',
      'Заваливание корпуса вперед',
      'Потеря равновесия'
    ],
    icon: Zap
  },
  hook: {
    name: 'Хук',
    description: 'Боковой удар. Эффективен на средней дистанции.',
    videoUrl: '/videos/boxing/hook.mp4',
    tips: [
      'Вращайте корпус и бедро',
      'Держите локоть на одной линии с кулаком',
      'Смотрите на цель через плечо'
    ],
    commonMistakes: [
      'Размашистое движение',
      'Опускание второй руки',
      'Удар с дальней дистанции'
    ],
    icon: Shield
  }
}

export default function BoxingTechniques({ lesson, onSelectTechnique }) {
  const [selectedTechnique, setSelectedTechnique] = useState(null)
  const [showVideo, setShowVideo] = useState(false)

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold text-white mb-6">Техники бокса</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {Object.entries(techniques).map(([key, technique], index) => {
          const Icon = technique.icon
          return (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              onClick={() => {
                setSelectedTechnique(technique)
                onSelectTechnique?.(technique)
              }}
              className="bg-gray-800 rounded-xl p-6 cursor-pointer hover:bg-gray-750 transition group"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-red-600/20 rounded-lg group-hover:bg-red-600/30 transition">
                  <Icon className="w-6 h-6 text-red-500" />
                </div>
                <h3 className="text-xl font-semibold text-white">{technique.name}</h3>
              </div>
              <p className="text-gray-400 text-sm mb-4">{technique.description}</p>
              <button className="text-red-500 text-sm font-medium flex items-center gap-2 hover:gap-3 transition-all">
                <Play className="w-4 h-4" />
                Смотреть технику
              </button>
            </motion.div>
          )
        })}
      </div>

      {selectedTechnique && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8 bg-gray-800 rounded-xl overflow-hidden"
        >
          {showVideo ? (
            <div className="aspect-video bg-black">
              <video
                src={selectedTechnique.videoUrl}
                controls
                autoPlay
                className="w-full h-full"
              />
            </div>
          ) : (
            <div className="aspect-video bg-gradient-to-br from-gray-900 to-black flex items-center justify-center">
              <button
                onClick={() => setShowVideo(true)}
                className="w-20 h-20 bg-red-600 rounded-full flex items-center justify-center hover:scale-110 transition group"
              >
                <Play className="w-8 h-8 text-white group-hover:rotate-12 transition" />
              </button>
            </div>
          )}
          
          <div className="p-6">
            <h3 className="text-2xl font-bold text-white mb-4">{selectedTechnique.name}</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                  <Info className="w-5 h-5 text-red-500" />
                  Советы
                </h4>
                <ul className="space-y-2">
                  {selectedTechnique.tips.map((tip, i) => (
                    <li key={i} className="flex items-start gap-2 text-gray-300">
                      <span className="text-red-500 mt-1">•</span>
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h4 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                  <Info className="w-5 h-5 text-red-500" />
                  Частые ошибки
                </h4>
                <ul className="space-y-2">
                  {selectedTechnique.commonMistakes.map((mistake, i) => (
                    <li key={i} className="flex items-start gap-2 text-gray-300">
                      <span className="text-red-500 mt-1">•</span>
                      {mistake}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  )
}