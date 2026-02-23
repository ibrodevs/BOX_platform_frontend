import { motion } from 'framer-motion'
import { Trophy, Star, Zap, Target, Award, Calendar, CheckCircle, Lock } from 'lucide-react'

export default function BoxingStats({ userProgress, achievements, streak, currentPage, completedPages }) {
  const stats = {
    totalLessons: userProgress.length,
    completedLessons: userProgress.filter(p => p.completed).length,
    totalWatchTime: userProgress.reduce((acc, p) => acc + (p.watch_time_seconds || 0), 0),
    averageScore: Math.round(userProgress.reduce((acc, p) => acc + (p.score || 0), 0) / userProgress.length) || 0,
    completedPages: completedPages.length,
    totalPages: 5
  }

  const pageNames = [
    'Основы бокса',
    'Ударная техника',
    'Защита и контратаки',
    'Комбинации и тактика',
    'Спарринг и психология'
  ]

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold text-white mb-6">Моя статистика</h2>

      {/* Основные показатели */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { icon: Star, label: 'Пройдено уроков', value: `${stats.completedLessons}/${stats.totalLessons}`, color: 'yellow' },
          { icon: Trophy, label: 'Достижений', value: achievements.length, color: 'orange' },
          { icon: Zap, label: 'Стрик', value: `${streak} дней`, color: 'red' },
          { icon: Target, label: 'Страниц курса', value: `${stats.completedPages}/${stats.totalPages}`, color: 'blue' }
        ].map((stat, index) => {
          const Icon = stat.icon
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-gray-800 rounded-xl p-6"
            >
              <div className={`w-12 h-12 bg-${stat.color}-600/20 rounded-lg flex items-center justify-center mb-4`}>
                <Icon className={`w-6 h-6 text-${stat.color}-500`} />
              </div>
              <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
              <div className="text-sm text-gray-400">{stat.label}</div>
            </motion.div>
          )
        })}
      </div>

      {/* Прогресс по страницам */}
      <div className="bg-gray-800 rounded-xl p-6">
        <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
          <Calendar className="w-5 h-5 text-red-500" />
          Прогресс по страницам
        </h3>
        <div className="space-y-4">
          {pageNames.map((name, index) => {
            const pageId = index + 1
            const isCompleted = completedPages.includes(pageId)
            const isCurrent = currentPage === pageId
            
            return (
              <div key={pageId}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className={`text-white ${isCurrent ? 'font-bold' : ''}`}>
                      {pageId}. {name}
                    </span>
                    {isCompleted && (
                      <CheckCircle className="w-4 h-4 text-green-500" />
                    )}
                    {!isCompleted && pageId > 1 && !completedPages.includes(pageId - 1) && (
                      <Lock className="w-4 h-4 text-gray-600" />
                    )}
                  </div>
                  <span className="text-sm text-gray-400">
                    {isCompleted ? 'Завершено' : isCurrent ? 'Текущая' : 'Не начата'}
                  </span>
                </div>
                <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                  <motion.div
                    className={`h-full ${isCompleted ? 'bg-green-500' : isCurrent ? 'bg-red-500' : 'bg-gray-600'}`}
                    initial={{ width: 0 }}
                    animate={{ width: isCompleted ? '100%' : isCurrent ? '50%' : '0%' }}
                  />
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Прогресс по урокам */}
      <div className="bg-gray-800 rounded-xl p-6">
        <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
          <Calendar className="w-5 h-5 text-red-500" />
          Прогресс по урокам
        </h3>
        <div className="space-y-4">
          {userProgress.slice(0, 5).map((progress, index) => (
            <div key={index}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-white">Урок {index + 1}</span>
                <span className="text-sm text-gray-400">
                  {Math.round((progress.watch_time_seconds || 0) / 60)} мин
                </span>
              </div>
              <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-red-500"
                  initial={{ width: 0 }}
                  animate={{ width: progress.completed ? '100%' : '50%' }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Достижения */}
      {achievements.length > 0 && (
        <div className="bg-gray-800 rounded-xl p-6">
          <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <Award className="w-5 h-5 text-red-500" />
            Последние достижения
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {achievements.slice(0, 4).map((achievement, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full mx-auto mb-2 flex items-center justify-center">
                  <Trophy className="w-8 h-8 text-white" />
                </div>
                <p className="text-white text-sm font-medium">{achievement.title}</p>
                <p className="text-xs text-gray-400">{achievement.date}</p>
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}