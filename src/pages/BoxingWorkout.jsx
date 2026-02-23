import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { Timer, Activity, Heart, Flame, CheckCircle, Play, Pause, RotateCcw } from 'lucide-react'

const workouts = {
  warmup: {
    name: 'Разминка',
    duration: 300, // 5 минут
    exercises: [
      { name: 'Бег на месте', duration: 60, rest: 0 },
      { name: 'Вращение руками', duration: 60, rest: 0 },
      { name: 'Повороты корпуса', duration: 60, rest: 0 },
      { name: 'Наклоны', duration: 60, rest: 0 },
      { name: 'Прыжки', duration: 60, rest: 0 }
    ]
  },
  shadowboxing: {
    name: 'Бой с тенью',
    duration: 900, // 15 минут
    exercises: [
      { name: 'Джебы', duration: 180, rest: 30 },
      { name: 'Джеб-кросс', duration: 180, rest: 30 },
      { name: 'Защита', duration: 180, rest: 30 },
      { name: 'Комбинации', duration: 180, rest: 30 }
    ]
  },
  bagwork: {
    name: 'Работа с мешком',
    duration: 900, // 15 минут
    exercises: [
      { name: 'Силовые удары', duration: 180, rest: 30 },
      { name: 'Серии', duration: 180, rest: 30 },
      { name: 'Комбинации', duration: 180, rest: 30 },
      { name: 'На силу и выносливость', duration: 180, rest: 30 }
    ]
  }
}

export default function BoxingWorkout({ lesson, onComplete }) {
  const [selectedWorkout, setSelectedWorkout] = useState(null)
  const [isActive, setIsActive] = useState(false)
  const [timeLeft, setTimeLeft] = useState(0)
  const [currentExercise, setCurrentExercise] = useState(0)
  const [exerciseTimeLeft, setExerciseTimeLeft] = useState(0)
  const [isRest, setIsRest] = useState(false)
  const [calories, setCalories] = useState(0)
  const [heartRate, setHeartRate] = useState(70)
  const [completedExercises, setCompletedExercises] = useState([])

  useEffect(() => {
    let interval
    if (isActive && selectedWorkout) {
      interval = setInterval(() => {
        if (timeLeft > 0) {
          setTimeLeft(t => t - 1)
          setCalories(c => c + 0.1) // Примерный расчет калорий
          
          // Симуляция пульса
          setHeartRate(h => Math.min(180, h + Math.random() * 2))
          
          if (exerciseTimeLeft > 0) {
            setExerciseTimeLeft(et => et - 1)
          } else {
            if (isRest) {
              // Переход к следующему упражнению
              if (currentExercise < selectedWorkout.exercises.length - 1) {
                setCurrentExercise(ce => ce + 1)
                setIsRest(false)
                setExerciseTimeLeft(selectedWorkout.exercises[currentExercise + 1].duration)
              } else {
                // Тренировка завершена
                setIsActive(false)
                onComplete?.({ calories, duration: selectedWorkout.duration - timeLeft })
              }
            } else {
              // Переход к отдыху
              const restTime = selectedWorkout.exercises[currentExercise].rest
              if (restTime > 0) {
                setIsRest(true)
                setExerciseTimeLeft(restTime)
                setCompletedExercises([...completedExercises, currentExercise])
              } else {
                // Сразу следующее упражнение
                if (currentExercise < selectedWorkout.exercises.length - 1) {
                  setCurrentExercise(ce => ce + 1)
                  setExerciseTimeLeft(selectedWorkout.exercises[currentExercise + 1].duration)
                } else {
                  setIsActive(false)
                  onComplete?.({ calories, duration: selectedWorkout.duration - timeLeft })
                }
              }
            }
          }
        } else {
          setIsActive(false)
          onComplete?.({ calories, duration: selectedWorkout.duration })
        }
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [isActive, timeLeft, exerciseTimeLeft, currentExercise, isRest, selectedWorkout, calories])

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const startWorkout = (workout) => {
    setSelectedWorkout(workout)
    setTimeLeft(workout.duration)
    setCurrentExercise(0)
    setExerciseTimeLeft(workout.exercises[0].duration)
    setIsRest(false)
    setIsActive(true)
    setCompletedExercises([])
    setCalories(0)
    setHeartRate(70)
  }

  const pauseWorkout = () => {
    setIsActive(false)
  }

  const resetWorkout = () => {
    setIsActive(false)
    setSelectedWorkout(null)
    setTimeLeft(0)
    setCurrentExercise(0)
    setCompletedExercises([])
    setCalories(0)
    setHeartRate(70)
  }

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold text-white mb-6">Тренировка по боксу</h2>

      {!selectedWorkout ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {Object.entries(workouts).map(([key, workout], index) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className="bg-gray-800 rounded-xl p-6 cursor-pointer hover:bg-gray-750 transition group"
              onClick={() => startWorkout(workout)}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-red-600/20 rounded-lg group-hover:bg-red-600/30 transition">
                  <Activity className="w-6 h-6 text-red-500" />
                </div>
                <h3 className="text-xl font-semibold text-white">{workout.name}</h3>
              </div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2 text-gray-400">
                  <Timer className="w-4 h-4" />
                  <span>{formatTime(workout.duration)}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-400">
                  <Flame className="w-4 h-4" />
                  <span>~{Math.round(workout.duration * 0.1)} ккал</span>
                </div>
              </div>
              <p className="text-gray-400 text-sm">
                {workout.exercises.length} упражнений
              </p>
            </motion.div>
          ))}
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gray-800 rounded-xl p-6"
        >
          {/* Статистика тренировки */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="bg-gray-900 rounded-lg p-4 text-center">
              <Timer className="w-6 h-6 text-red-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">{formatTime(timeLeft)}</div>
              <div className="text-sm text-gray-400">Осталось</div>
            </div>
            <div className="bg-gray-900 rounded-lg p-4 text-center">
              <Flame className="w-6 h-6 text-orange-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">{Math.round(calories)}</div>
              <div className="text-sm text-gray-400">Ккал</div>
            </div>
            <div className="bg-gray-900 rounded-lg p-4 text-center">
              <Heart className="w-6 h-6 text-red-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">{Math.round(heartRate)}</div>
              <div className="text-sm text-gray-400">Пульс</div>
            </div>
          </div>

          {/* Текущее упражнение */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-white">
                {isRest ? 'Отдых' : selectedWorkout.exercises[currentExercise].name}
              </h3>
              <span className="text-2xl font-bold text-red-500">
                {formatTime(exerciseTimeLeft)}
              </span>
            </div>
            <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-red-500"
                initial={{ width: 0 }}
                animate={{
                  width: `${(exerciseTimeLeft / (isRest 
                    ? selectedWorkout.exercises[currentExercise].rest 
                    : selectedWorkout.exercises[currentExercise].duration)) * 100}%`
                }}
              />
            </div>
          </div>

          {/* Прогресс упражнений */}
          <div className="mb-8">
            <h4 className="text-sm text-gray-400 mb-3">Прогресс тренировки</h4>
            <div className="flex gap-2">
              {selectedWorkout.exercises.map((_, index) => (
                <div
                  key={index}
                  className={`flex-1 h-2 rounded-full ${
                    completedExercises.includes(index)
                      ? 'bg-green-500'
                      : index === currentExercise
                      ? 'bg-red-500'
                      : 'bg-gray-700'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Контролы */}
          <div className="flex justify-center gap-4">
            {isActive ? (
              <button
                onClick={pauseWorkout}
                className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition flex items-center gap-2"
              >
                <Pause className="w-5 h-5" />
                Пауза
              </button>
            ) : (
              <button
                onClick={() => setIsActive(true)}
                className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition flex items-center gap-2"
              >
                <Play className="w-5 h-5" />
                Продолжить
              </button>
            )}
            <button
              onClick={resetWorkout}
              className="px-6 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition flex items-center gap-2"
            >
              <RotateCcw className="w-5 h-5" />
              Завершить
            </button>
          </div>
        </motion.div>
      )}
    </div>
  )
}