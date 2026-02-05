import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { Trophy, Target, Zap, Brain, Award, Calendar, Medal, BarChart } from 'lucide-react'

export default function About() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.3])
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95])

  const achievements = [
    { year: '2025', title: 'Абсолютный чемпион мира', desc: 'Победа над Артуром Бетербиевым', icon: <Trophy className="w-6 h-6" /> },
    { year: '2022', title: 'Победа над Канело', desc: 'Сенсация года в боксе', icon: <Target className="w-6 h-6" /> },
    { year: '2017-2024', title: 'Чемпион WBA (Super)', desc: '8 лет непрерывного чемпионства', icon: <Award className="w-6 h-6" /> },
    { year: '2013', title: 'Золото World Combat Games', desc: 'Чемпион в любителях', icon: <Medal className="w-6 h-6" /> },
  ]

  const stats = [
    { label: 'Побед', value: '24', sub: 'из них 12 нокаутом', icon: <BarChart className="w-5 h-5" /> },
    { label: 'Титулы', value: '4', sub: 'WBA, WBC, IBF, WBO', icon: <Trophy className="w-5 h-5" /> },
    { label: 'Рейтинг', value: '#1', sub: 'pound-for-pound', icon: <Zap className="w-5 h-5" /> },
    { label: 'Карьера', value: '11', sub: 'лет в профессионалах', icon: <Calendar className="w-5 h-5" /> },
  ]

  return (
    <div ref={containerRef} className="relative min-h-screen overflow-hidden">
      {/* Анимированный фон */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
      </div>

      {/* Парящие элементы */}
      <motion.div
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 4, repeat: Infinity }}
        className="absolute top-1/4 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl"
      />
      <motion.div
        animate={{ y: [0, 20, 0] }}
        transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
        className="absolute bottom-1/4 right-10 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"
      />

      <div className="relative container-custom py-32">
        {/* Hero с параллакс эффектом */}
        <motion.div
          style={{ opacity, scale }}
          className="text-center mb-24 relative z-10"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="inline-block mb-8"
          >
            <div className="relative">
              <div className="absolute -inset-4 bg-primary/20 blur-xl rounded-full" />
              <div className="relative bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-2xl px-8 py-6">
                <h1 className="text-6xl md:text-8xl font-black mb-4 bg-gradient-to-r from-white via-primary to-white bg-clip-text text-transparent">
                  ДМИТРИЙ <span className="text-primary">БИВОЛ</span>
                </h1>
              </div>
            </div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-2xl md:text-3xl text-gray-300 max-w-4xl mx-auto leading-relaxed"
          >
            Абсолютный чемпион мира в полутяжёлом весе. <span className="text-primary font-semibold">Непобеждённый чемпион</span>, победитель Канело Альвареса и Артура Бетербиева
          </motion.p>
        </motion.div>

        {/* Статистика */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-24"
        >
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              whileHover={{ y: -10, scale: 1.05 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="group relative"
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-blue-500 rounded-2xl blur opacity-0 group-hover:opacity-30 transition duration-500" />
              <div className="relative bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6 text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg mb-4 text-primary">
                  {stat.icon}
                </div>
                <div className="text-4xl font-black text-white mb-1">{stat.value}</div>
                <div className="text-lg font-semibold text-gray-300 mb-1">{stat.label}</div>
                <div className="text-sm text-gray-500">{stat.sub}</div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Основной контент с 3D эффектом */}
        <div className="grid lg:grid-cols-2 gap-16 mb-32 relative">
          {/* Левая колонка с изображением */}
          <motion.div
            initial={{ opacity: 0, x: -100, rotateY: -15 }}
            whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="relative perspective-1000"
          >
            <div className="sticky top-24">
              <div className="relative">
                <div className="absolute -inset-8 bg-gradient-to-br from-primary/30 to-transparent rounded-3xl blur-2xl" />
                <div className="relative aspect-[4/5] bg-gradient-to-br from-gray-900 to-black rounded-2xl overflow-hidden border border-gray-800">
                  <img src="https://www.wbaboxing.com/wp-content/uploads/2022/11/IMG_0173.jpg" alt="Dmitry Bivol" className="w-full h-full object-cover" />
                  {/* Анимированные линии */}
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 border-2 border-dashed border-primary/20 rounded-2xl"
                  />
                </div>
              </div>

              {/* Флоутинг элементы */}
              <motion.div
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute -bottom-6 -left-6 bg-primary text-black p-4 rounded-xl shadow-2xl"
              >
                <div className="text-2xl font-black">WBA</div>
                <div className="text-sm font-semibold">Super Champion</div>
              </motion.div>

              <motion.div
                animate={{ y: [0, 20, 0] }}
                transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
                className="absolute -top-6 -right-6 bg-blue-600 text-white p-4 rounded-xl shadow-2xl"
              >
                <div className="text-2xl font-black">WBC</div>
                <div className="text-sm font-semibold">World Champion</div>
              </motion.div>
            </div>
          </motion.div>

          {/* Правая колонка с информацией */}
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="space-y-8"
          >
            <div>
              <h2 className="text-4xl font-bold mb-4 flex items-center gap-3">
                <Brain className="w-8 h-8 text-primary" />
                БИОГРАФИЯ ЧЕМПИОНА
              </h2>
              <div className="space-y-6">
                <p className="text-xl text-gray-300 leading-relaxed">
                  <span className="text-primary font-semibold">Дмитрий Юрьевич Бивол</span> — выдающийся боксёр современности, 
                  родившийся 18 декабря 1990 года в Токмоке, Кыргызстан. Начал заниматься боксом в 6 лет под руководством отца.
                </p>
                <p className="text-xl text-gray-300 leading-relaxed">
                  В любительской карьере провёл <span className="text-primary font-semibold">свыше 280 боёв</span> с невероятным 
                  рекордом 268-15. Перешёл в профессионалы в 2014 году и с тех пор не знал поражений.
                </p>
                <p className="text-xl text-gray-300 leading-relaxed">
                  Обладатель уникального стиля: <span className="text-primary font-semibold">безупречный джеб</span>, 
                  превосходная работа ног и тактический интеллект, позволяющий доминировать над любым соперником.
                </p>
              </div>
            </div>

            {/* Достижения */}
            <div>
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <Trophy className="w-6 h-6 text-primary" />
                ГЛАВНЫЕ ДОСТИЖЕНИЯ
              </h3>
              <div className="space-y-4">
                {achievements.map((item, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    whileHover={{ x: 10 }}
                    transition={{ delay: idx * 0.1 }}
                    viewport={{ once: true }}
                    className="group relative overflow-hidden rounded-xl bg-gradient-to-r from-gray-900/50 to-black/50 border border-gray-800 p-6"
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
                        {item.icon}
                      </div>
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-2xl font-black text-primary">{item.year}</span>
                          <span className="text-xl font-bold text-white">{item.title}</span>
                        </div>
                        <p className="text-gray-400">{item.desc}</p>
                      </div>
                    </div>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="w-2 h-2 bg-primary rounded-full animate-ping" />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Философия тренировок */}
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative mb-32"
        >
          <div className="absolute -inset-8 bg-gradient-to-r from-primary/20 via-transparent to-blue-500/20 rounded-3xl blur-3xl" />
          <div className="relative bg-gradient-to-br from-gray-900/80 to-black/80 backdrop-blur-sm border border-gray-800 rounded-3xl p-12">
            <h2 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-primary to-blue-500 bg-clip-text text-transparent">
              ФИЛОСОФИЯ ЧЕМПИОНА
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  title: "Техническое превосходство",
                  desc: "Точность джеба, контроль дистанции и работа ног — фундамент чемпионского стиля",
                  icon: "🎯"
                },
                {
                  title: "Тактический интеллект",
                  desc: "Умение читать соперника и адаптировать стратегию во время боя",
                  icon: "🧠"
                },
                {
                  title: "Непрерывный рост",
                  desc: "Каждая тренировка — шаг к совершенству. Каждый бой — новая глава в истории",
                  icon: "📈"
                }
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="text-center p-6 bg-black/50 rounded-2xl border border-gray-800"
                >
                  <div className="text-5xl mb-4">{item.icon}</div>
                  <h3 className="text-xl font-bold mb-3 text-white">{item.title}</h3>
                  <p className="text-gray-400">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Галлерея с параллаксом */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="relative"
        >
          <h2 className="text-4xl font-bold mb-12 text-center">
            <span className="bg-gradient-to-r from-primary to-blue-500 bg-clip-text text-transparent">
              МОМЕНТЫ ВЕЛИЧИЯ
            </span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "Тренировочный процесс", desc: "Ежедневная работа над совершенством", emoji: "💪" },
              { title: "Тактические сессии", desc: "Анализ и подготовка к боям", emoji: "🎬" },
              { title: "Чемпионские ночи", desc: "Исторические победы на ринге", emoji: "🏆" }
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.05, zIndex: 10 }}
                transition={{ delay: idx * 0.2 }}
                viewport={{ once: true }}
                className="relative group"
              >
                <div className="absolute -inset-4 bg-gradient-to-br from-primary/30 to-blue-500/30 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative aspect-[4/3] bg-gradient-to-br from-gray-900 to-black rounded-2xl overflow-hidden border border-gray-800">
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <div className="text-8xl mb-4 transform group-hover:scale-110 transition-transform duration-500">
                      {item.emoji}
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">{item.title}</h3>
                    <p className="text-gray-400 text-center px-8">{item.desc}</p>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Финальная цитата */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-32 text-center"
        >
          <div className="relative inline-block">
            <div className="absolute -inset-4 bg-primary/10 rounded-full blur-2xl" />
            <div className="relative">
              <div className="text-6xl mb-6">"</div>
              <p className="text-3xl md:text-4xl font-light italic text-gray-300 max-w-3xl mx-auto leading-relaxed">
                На ринге нет места сомнениям. Только дисциплина, техника и воля к победе создают чемпиона
              </p>
              <div className="text-6xl mt-6 rotate-180">"</div>
              <div className="mt-8 text-xl text-primary font-semibold">
                — Дмитрий Бивол
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Анимированные градиентные линии */}
      <motion.div
        animate={{ x: ['0%', '100%'] }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent"
      />
    </div>
  )
}