import { useState } from 'react'
import { motion } from 'framer-motion'
import { CheckCircle2, Circle, Lock, Play, ChevronDown, ChevronUp } from 'lucide-react'

export default function LessonSidebar({ lessons, currentLesson, onLessonSelect, userProgress, hasCourseAccess }) {
  const [expandedModules, setExpandedModules] = useState([0])

  // Группируем уроки по модулям (каждые 5 уроков - модуль)
  const modules = []
  const lessonsPerModule = 5
  for (let i = 0; i < lessons.length; i += lessonsPerModule) {
    modules.push({
      id: Math.floor(i / lessonsPerModule),
      name: `Модуль ${Math.floor(i / lessonsPerModule) + 1}`,
      lessons: lessons.slice(i, i + lessonsPerModule)
    })
  }

  const toggleModule = (moduleId) => {
    setExpandedModules(prev => 
      prev.includes(moduleId) 
        ? prev.filter(id => id !== moduleId)
        : [...prev, moduleId]
    )
  }

  const getLessonProgress = (lessonId) => {
    return userProgress?.find(p => p.lesson === lessonId)
  }

  const isLessonCompleted = (lessonId) => {
    const progress = getLessonProgress(lessonId)
    return progress?.completed || false
  }

  const getModuleProgress = (module) => {
    const completed = module.lessons.filter(l => isLessonCompleted(l.id)).length
    return Math.round((completed / module.lessons.length) * 100)
  }

  return (
    <div className="h-full flex flex-col bg-gray-900">
      {/* Заголовок */}
      <div className="p-6 border-b border-gray-800">
        <h2 className="text-xl font-bold text-white">Содержание курса</h2>
        <p className="text-sm text-gray-400 mt-1">
          {lessons.filter(l => isLessonCompleted(l.id)).length} из {lessons.length} уроков завершено
        </p>
      </div>

      {/* Список модулей и уроков */}
      <div className="flex-1 overflow-y-auto">
        {modules.map(module => {
          const moduleProgress = getModuleProgress(module)
          const isExpanded = expandedModules.includes(module.id)

          return (
            <div key={module.id} className="border-b border-gray-800">
              {/* Заголовок модуля */}
              <button
                onClick={() => toggleModule(module.id)}
                className="w-full p-4 flex items-center justify-between hover:bg-gray-800/50 transition"
              >
                <div className="flex-1 text-left">
                  <h3 className="text-white font-semibold">{module.name}</h3>
                  <div className="flex items-center gap-3 mt-2">
                    <div className="flex-1 h-2 bg-gray-800 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${moduleProgress}%` }}
                        className="h-full bg-red-600"
                      />
                    </div>
                    <span className="text-xs text-gray-400">{moduleProgress}%</span>
                  </div>
                </div>
                <div className="ml-4">
                  {isExpanded ? (
                    <ChevronUp className="w-5 h-5 text-gray-400" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-400" />
                  )}
                </div>
              </button>

              {/* Список уроков модуля */}
              {isExpanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="bg-gray-900/50"
                >
                  {module.lessons.map((lesson, index) => {
                    const isCompleted = isLessonCompleted(lesson.id)
                    const isCurrent = currentLesson?.id === lesson.id
                    const isLocked = !hasCourseAccess && !lesson.is_free_preview
                    const canAccess = hasCourseAccess || lesson.is_free_preview

                    return (
                      <button
                        key={lesson.id}
                        onClick={() => canAccess && onLessonSelect(lesson)}
                        disabled={isLocked}
                        className={`
                          w-full p-4 pl-8 flex items-center gap-3 text-left transition
                          ${isCurrent ? 'bg-red-600/20 border-l-4 border-red-600' : ''}
                          ${canAccess ? 'hover:bg-gray-800/50 cursor-pointer' : 'opacity-50 cursor-not-allowed'}
                        `}
                      >
                        {/* Иконка статуса */}
                        <div className="flex-shrink-0">
                          {isLocked ? (
                            <Lock className="w-5 h-5 text-gray-500" />
                          ) : isCompleted ? (
                            <CheckCircle2 className="w-5 h-5 text-green-500" />
                          ) : isCurrent ? (
                            <Play className="w-5 h-5 text-red-600" />
                          ) : (
                            <Circle className="w-5 h-5 text-gray-600" />
                          )}
                        </div>

                        {/* Информация об уроке */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-gray-500">Урок {lesson.order_index + 1}</span>
                            {lesson.is_free_preview && (
                              <span className="text-xs bg-green-600/20 text-green-400 px-2 py-0.5 rounded">
                                ПРЕВЬЮ
                              </span>
                            )}
                          </div>
                          <h4 className={`text-sm font-medium mt-1 truncate ${isCurrent ? 'text-red-500' : 'text-white'}`}>
                            {lesson.title}
                          </h4>
                          <p className="text-xs text-gray-400 mt-1">
                            {lesson.duration_minutes} мин
                          </p>
                        </div>
                      </button>
                    )
                  })}
                </motion.div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
