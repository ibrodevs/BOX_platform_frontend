import { motion } from 'framer-motion'
import { useMemo, useRef } from 'react'
import { Trophy, Target, Zap, Brain, Award, Calendar, Medal, BarChart, Film, Dumbbell } from 'lucide-react'
import { useTranslation } from 'react-i18next'

export default function About() {
  const { t } = useTranslation()
  const containerRef = useRef(null)

  const achievements = useMemo(() => ([
    { year: '2025', title: t('aboutPage.achievements.0.title'), desc: t('aboutPage.achievements.0.desc'), icon: <Trophy className="w-6 h-6" /> },
    { year: '2022', title: t('aboutPage.achievements.1.title'), desc: t('aboutPage.achievements.1.desc'), icon: <Target className="w-6 h-6" /> },
    { year: '2017-2024', title: t('aboutPage.achievements.2.title'), desc: t('aboutPage.achievements.2.desc'), icon: <Award className="w-6 h-6" /> },
    { year: '2013', title: t('aboutPage.achievements.3.title'), desc: t('aboutPage.achievements.3.desc'), icon: <Medal className="w-6 h-6" /> },
  ]), [t])

  const stats = useMemo(() => ([
    { label: t('aboutPage.stats.0.label'), value: t('aboutPage.stats.0.value'), sub: t('aboutPage.stats.0.sub'), icon: <BarChart className="w-5 h-5" /> },
    { label: t('aboutPage.stats.1.label'), value: t('aboutPage.stats.1.value'), sub: t('aboutPage.stats.1.sub'), icon: <Trophy className="w-5 h-5" /> },
    { label: t('aboutPage.stats.2.label'), value: t('aboutPage.stats.2.value'), sub: t('aboutPage.stats.2.sub'), icon: <Zap className="w-5 h-5" /> },
    { label: t('aboutPage.stats.3.label'), value: t('aboutPage.stats.3.value'), sub: t('aboutPage.stats.3.sub'), icon: <Calendar className="w-5 h-5" /> },
  ]), [t])

  const philosophy = useMemo(() => ([
    {
      title: t('aboutPage.philosophy.items.0.title'),
      desc: t('aboutPage.philosophy.items.0.desc'),
      icon: Target
    },
    {
      title: t('aboutPage.philosophy.items.1.title'),
      desc: t('aboutPage.philosophy.items.1.desc'),
      icon: Brain
    },
    {
      title: t('aboutPage.philosophy.items.2.title'),
      desc: t('aboutPage.philosophy.items.2.desc'),
      icon: BarChart
    }
  ]), [t])

  const galleryItems = useMemo(() => ([
    { title: t('aboutPage.gallery.items.0.title'), desc: t('aboutPage.gallery.items.0.desc'), icon: Dumbbell },
    { title: t('aboutPage.gallery.items.1.title'), desc: t('aboutPage.gallery.items.1.desc'), icon: Film },
    { title: t('aboutPage.gallery.items.2.title'), desc: t('aboutPage.gallery.items.2.desc'), icon: Trophy }
  ]), [t])

  return (
    <div ref={containerRef} className="relative min-h-screen bg-white overflow-x-hidden">

      <div className="relative container-custom px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
        {/* Hero с параллакс эффектом */}
        <motion.div className="text-center mb-20 relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="inline-block mb-6"
          >
            <div className="relative">
              <div className="relative bg-white border border-gray-200 rounded-2xl px-8 py-6">
                <h1 className="text-5xl md:text-7xl font-black mb-2 text-gray-900">
                  {t('aboutPage.hero.nameLine1')} <span className="text-gray-700">{t('aboutPage.hero.nameLine2')}</span>
                </h1>
              </div>
            </div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed"
          >
              <span>{t('aboutPage.hero.subtitle.start')} </span>
              <span className="text-gray-900 font-semibold">{t('aboutPage.hero.subtitle.highlight')}</span>
              <span>, {t('aboutPage.hero.subtitle.end')}</span>
          </motion.p>
        </motion.div>

        {/* Статистика */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-16 sm:mb-24"
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
              <div className="relative bg-white border border-gray-200 rounded-xl p-6 text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-gray-100 rounded-lg mb-4 text-gray-700">
                  {stat.icon}
                </div>
                <div className="text-4xl font-black text-gray-900 mb-1">{stat.value}</div>
                <div className="text-lg font-semibold text-gray-700 mb-1">{stat.label}</div>
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
                <div className="relative aspect-[4/5] bg-white rounded-2xl overflow-hidden border border-gray-200">
                  <img src="https://www.wbaboxing.com/wp-content/uploads/2022/11/IMG_0173.jpg" alt="Dmitry Bivol" className="w-full h-full object-cover" />
                </div>
              </div>

              {/* Флоутинг элементы */}
              <motion.div
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute bottom-3 left-3 sm:-bottom-6 sm:-left-6 bg-gray-900 text-white p-3 sm:p-4 rounded-lg sm:rounded-xl shadow-md max-w-[min(12rem,calc(100vw-2rem))]"
              >
                <div className="text-2xl font-black">WBA</div>
                <div className="text-sm font-semibold">{t('aboutPage.hero.badges.wba')}</div>
              </motion.div>

              <motion.div
                animate={{ y: [0, 20, 0] }}
                transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
                className="absolute top-3 right-3 sm:-top-6 sm:-right-6 bg-gray-700 text-white p-3 sm:p-4 rounded-lg sm:rounded-xl shadow-md max-w-[min(14rem,calc(100vw-2rem))]"
              >
                <div className="text-2xl font-black">WBC</div>
                <div className="text-sm font-semibold whitespace-normal break-words">{t('aboutPage.hero.badges.wbc')}</div>
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
                <Brain className="w-8 h-8 text-gray-700" />
                {t('aboutPage.biography.title')}
              </h2>
              <div className="space-y-6">
                <p className="text-xl text-gray-600 leading-relaxed">
                  <span className="text-gray-900 font-semibold">{t('aboutPage.biography.paragraphs.0.highlight')}</span>{' '}
                  {t('aboutPage.biography.paragraphs.0.text')}
                </p>
                <p className="text-xl text-gray-600 leading-relaxed">
                  {t('aboutPage.biography.paragraphs.1.start')} <span className="text-gray-900 font-semibold">{t('aboutPage.biography.paragraphs.1.highlight')}</span>{' '}
                  {t('aboutPage.biography.paragraphs.1.end')}
                </p>
                <p className="text-xl text-gray-600 leading-relaxed">
                  {t('aboutPage.biography.paragraphs.2.start')} <span className="text-gray-900 font-semibold">{t('aboutPage.biography.paragraphs.2.highlight')}</span>,{' '}
                  {t('aboutPage.biography.paragraphs.2.end')}
                </p>
              </div>
            </div>

            {/* Достижения */}
            <div>
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <Trophy className="w-6 h-6 text-gray-700" />
                {t('aboutPage.achievementsTitle')}
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
                    className="group relative overflow-hidden rounded-xl bg-white border border-gray-200 p-6"
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center text-gray-700">
                        {item.icon}
                      </div>
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-2xl font-black text-gray-900">{item.year}</span>
                          <span className="text-xl font-bold text-gray-900">{item.title}</span>
                        </div>
                        <p className="text-gray-600">{item.desc}</p>
                      </div>
                    </div>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="w-2 h-2 bg-gray-400 rounded-full" />
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
          className="relative mb-24"
        >
          <div className="relative bg-white border border-gray-200 rounded-3xl p-12">
            <h2 className="text-4xl font-bold mb-8 text-center text-gray-900">
              {t('aboutPage.philosophy.title')}
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {philosophy.map((item, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="text-center p-6 bg-gray-50 rounded-2xl border border-gray-200"
                >
                  <div className="w-12 h-12 mx-auto mb-4 rounded-lg bg-gray-900 flex items-center justify-center">
                    <item.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-gray-900">{item.title}</h3>
                  <p className="text-gray-600">{item.desc}</p>
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
          <h2 className="text-4xl font-bold mb-12 text-center text-gray-900">
            {t('aboutPage.gallery.title')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {galleryItems.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.05, zIndex: 10 }}
                transition={{ delay: idx * 0.2 }}
                viewport={{ once: true }}
                className="relative group"
              >
                <div className="relative aspect-[4/3] bg-white rounded-2xl overflow-hidden border border-gray-200">
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <div className="w-14 h-14 mb-4 rounded-xl bg-gray-900 flex items-center justify-center">
                      <item.icon className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{item.title}</h3>
                    <p className="text-gray-600 text-center px-8">{item.desc}</p>
                  </div>
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
            <div className="relative">
              <div className="text-5xl mb-6 text-gray-400">"</div>
              <p className="text-3xl md:text-4xl font-light italic text-gray-700 max-w-3xl mx-auto leading-relaxed">
                {t('aboutPage.quote.text')}
              </p>
              <div className="text-5xl mt-6 rotate-180 text-gray-400">"</div>
              <div className="mt-8 text-xl text-gray-900 font-semibold">
                {t('aboutPage.quote.author')}
              </div>
            </div>
          </div>
        </motion.div>
      </div>

    </div>
  )
}