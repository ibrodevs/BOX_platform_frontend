import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import { useEffect, useMemo, useRef, useState } from 'react'
import { getCourses } from '../services/apiService'
import CourseCard from '../components/CourseCard'
import { Sparkles, Trophy, Target, Clock, Brain, Star, ChevronRight, Play, Shield, Zap } from 'lucide-react'
import { useTranslation } from 'react-i18next'

export default function Home() {
  const { t } = useTranslation()
  const [courses, setCourses] = useState([])
  const containerRef = useRef(null)
  const heroRef = useRef(null)
  const coursesRef = useRef(null)
  const benefitsRef = useRef(null)
  const testimonialsRef = useRef(null)
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })
  
  const heroY = useTransform(scrollYProgress, [0, 1], [0, -100])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const statsScale = useTransform(scrollYProgress, [0.2, 0.4], [0.8, 1])
  
  const coursesInView = useInView(coursesRef, { once: true, amount: 0.3 })
  const benefitsInView = useInView(benefitsRef, { once: true, amount: 0.3 })
  const testimonialsInView = useInView(testimonialsRef, { once: true, amount: 0.3 })

  useEffect(() => {
    getCourses().then(res => {
      const coursesData = res.data?.results || res.data || []
      const coursesArray = Array.isArray(coursesData) ? coursesData : []
      setCourses(coursesArray.slice(0, 3))
    })
      .catch(err => console.error(err))
  }, [])

  const statsItems = useMemo(() => ([
    { value: t('homePage.stats.items.0.value'), label: t('homePage.stats.items.0.label'), icon: Trophy },
    { value: t('homePage.stats.items.1.value'), label: t('homePage.stats.items.1.label'), icon: Star },
    { value: t('homePage.stats.items.2.value'), label: t('homePage.stats.items.2.label'), icon: Target },
    { value: t('homePage.stats.items.3.value'), label: t('homePage.stats.items.3.label'), icon: Shield }
  ]), [t])

  const benefits = useMemo(() => ([
    {
      icon: Target,
      title: t('homePage.benefits.items.0.title'),
      description: t('homePage.benefits.items.0.description'),
      color: "from-red-500 to-orange-500"
    },
    {
      icon: Brain,
      title: t('homePage.benefits.items.1.title'),
      description: t('homePage.benefits.items.1.description'),
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: Clock,
      title: t('homePage.benefits.items.2.title'),
      description: t('homePage.benefits.items.2.description'),
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: Shield,
      title: t('homePage.benefits.items.3.title'),
      description: t('homePage.benefits.items.3.description'),
      color: "from-purple-500 to-pink-500"
    }
  ]), [t])

  const testimonials = useMemo(() => ([
    {
      name: t('homePage.testimonials.items.0.name'),
      course: t('homePage.testimonials.items.0.course'),
      rating: 5,
      text: t('homePage.testimonials.items.0.text'),
      progress: t('homePage.testimonials.items.0.progress')
    },
    {
      name: t('homePage.testimonials.items.1.name'),
      course: t('homePage.testimonials.items.1.course'),
      rating: 5,
      text: t('homePage.testimonials.items.1.text'),
      progress: t('homePage.testimonials.items.1.progress')
    },
    {
      name: t('homePage.testimonials.items.2.name'),
      course: t('homePage.testimonials.items.2.course'),
      rating: 5,
      text: t('homePage.testimonials.items.2.text'),
      progress: t('homePage.testimonials.items.2.progress')
    }
  ]), [t])

  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8 }
  }

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.2
      }
    }
  }

  const pulseAnimation = {
    initial: { scale: 1 },
    animate: {
      scale: [1, 1.05, 1],
      transition: {
        duration: 2,
        repeat: Infinity,
        repeatType: "reverse"
      }
    }
  }

  const floatingAnimation = {
    initial: { y: 0 },
    animate: {
      y: [0, -20, 0],
      transition: {
        duration: 3,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut"
      }
    }
  }

  return (
    <div ref={containerRef} className="relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(220,38,38,0.15)_0%,transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(220,38,38,0.1)_0%,transparent_50%)]"></div>
        
        {/* Animated Particles */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-[1px] h-[1px] bg-red-500 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 2 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>

      {/* Hero Section with Parallax */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[url('https://s-cdn.sportbox.ru/images/styles/upload/fp_fotos/d1/e9/6c02a3135fe59830a25c4f353e2fc7d1655b52b1bef99714146655.jpg')] bg-cover bg-center"></div>
          <div className="absolute inset-0 bg-gradient-to-br from-black/90 via-black/70 to-black/90"></div>
        </div>

        {/* Animated Championship Belt */}
        <motion.div
          initial={{ rotate: -180, opacity: 0, scale: 0 }}
          animate={{ rotate: 0, opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, delay: 0.5, type: "spring" }}
          className="absolute top-20 right-10 md:right-20"
        >
          <Trophy className="w-16 h-16 md:w-24 md:h-24 text-primary animate-pulse" />
        </motion.div>

        {/* Floating Gloves */}
        <motion.div 
          className="absolute left-10 top-1/3"
          animate={{ y: [0, -30, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <div className="w-16 h-16 rounded-full bg-primary/20 border-2 border-primary/40 flex items-center justify-center">
            <span className="text-2xl">🥊</span>
          </div>
        </motion.div>

        <div className="container-custom relative z-10 text-center">
          <motion.div
            variants={staggerContainer}
            initial="initial"
            animate="animate"
          >
            <motion.div variants={fadeInUp} className="relative inline-block mb-8">
              <span className="inline-block px-4 py-2 bg-primary/20 border border-primary/40 rounded-full text-sm md:text-base text-primary mb-4">
                {t('homePage.hero.badge')}
              </span>
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black mb-6 leading-tight"
            >
              <span className="block text-white drop-shadow-glow">{t('homePage.hero.titleLine1')}</span>
              <span className="block relative">
                <motion.span
                  animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
                  transition={{ duration: 5, repeat: Infinity }}
                  className="bg-gradient-to-r from-primary via-yellow-500 to-primary bg-[length:200%_auto] bg-clip-text text-transparent"
                >
                  {t('homePage.hero.titleLine2')}
                </motion.span>
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute -right-4 top-1/2 transform -translate-y-1/2"
                >
                  <Zap className="w-8 h-8 md:w-12 md:h-12 text-yellow-500" />
                </motion.div>
              </span>
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="text-lg md:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed font-light"
            >
              {t('homePage.hero.subtitle')}
            </motion.p>

            <motion.div
              variants={fadeInUp}
              className="flex flex-col sm:flex-row gap-6 justify-center items-center"
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link 
                  to="/register" 
                  className="group relative px-8 py-4 bg-gradient-to-r from-primary to-red-700 rounded-xl font-bold text-lg flex items-center gap-3 overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-primary to-red-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <span className="relative z-10">{t('homePage.hero.cta')}</span>
                  <ChevronRight className="relative z-10 w-5 h-5 group-hover:translate-x-2 transition-transform" />
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                    animate={{
                      x: ['-100%', '100%'],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      repeatType: "loop",
                    }}
                  />
                </Link>
              </motion.div>

              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link 
                  to="/about" 
                  className="group px-8 py-4 bg-transparent border-2 border-primary/50 rounded-xl font-bold text-lg flex items-center gap-3 hover:bg-primary/10 transition-all duration-300"
                >
                  <Play className="w-5 h-5" />
                  <span>{t('homePage.hero.watchVideo')}</span>
                </Link>
              </motion.div>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              className="mt-12 flex flex-wrap justify-center gap-6"
            >
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-green-500" />
                <span className="text-sm text-gray-400">{t('homePage.hero.features.0')}</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 text-yellow-500" />
                <span className="text-sm text-gray-400">{t('homePage.hero.features.1')}</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-blue-500" />
                <span className="text-sm text-gray-400">{t('homePage.hero.features.2')}</span>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        >
          <div className="w-6 h-10 border-2 border-primary/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-primary rounded-full mt-2"></div>
          </div>
        </motion.div>
      </section>

      {/* Stats Section with 3D Effect */}
      <motion.section 
        style={{ scale: statsScale }}
        className="py-32 bg-gradient-to-b from-transparent via-black/50 to-black"
      >
        <div className="container-custom">
          <motion.div 
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-4 gap-8"
          >
            {statsItems.map((stat, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                whileHover={{ y: -15, transition: { duration: 0.3 } }}
                className="group relative p-8 rounded-2xl bg-gradient-to-br from-gray-900/50 to-black border border-gray-800 hover:border-primary/50 transition-all duration-500"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>
                <stat.icon className="w-12 h-12 text-primary mb-6 group-hover:scale-110 transition-transform duration-500" />
                <div className="relative">
                  <div className="text-5xl font-black text-white mb-3 group-hover:text-primary transition-colors duration-500">
                    {stat.value}
                  </div>
                  <div className="text-lg text-gray-400 group-hover:text-gray-300 transition-colors duration-500">
                    {stat.label}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Courses Preview with Interactive Cards */}
      {courses.length > 0 && (
        <section ref={coursesRef} className="py-32 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900/50 to-black"></div>
          <div className="container-custom relative">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={coursesInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="text-center mb-20"
            >
              <div className="inline-block px-6 py-2 bg-primary/20 rounded-full mb-6">
                <span className="text-primary text-sm font-semibold">{t('homePage.popular.badge')}</span>
              </div>
              <h2 className="text-5xl md:text-6xl font-black mb-6">
                {t('homePage.popular.title')}
              </h2>
              <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                {t('homePage.popular.subtitle')}
              </p>
            </motion.div>

            <motion.div
              variants={staggerContainer}
              initial="initial"
              animate={coursesInView ? "animate" : ""}
              className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16"
            >
              {courses.map((course, index) => (
                <motion.div
                  key={course.id}
                  variants={{
                    initial: { opacity: 0, y: 60, rotateY: -30 },
                    animate: { 
                      opacity: 1, 
                      y: 0, 
                      rotateY: 0,
                      transition: { 
                        duration: 0.8,
                        delay: index * 0.2
                      }
                    }
                  }}
                  whileHover={{ 
                    y: -20,
                    transition: { duration: 0.3 }
                  }}
                  className="relative group perspective-1000"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500"></div>
                  <CourseCard 
                    course={course} 
                    className="relative bg-gray-900/50 backdrop-blur-sm border border-gray-800 group-hover:border-primary/50 transition-all duration-500"
                  />
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={coursesInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.6 }}
              className="text-center"
            >
              <Link to="/courses" className="group inline-flex items-center gap-3 text-lg font-bold">
                <span>{t('homePage.popular.viewAll')}</span>
                <ChevronRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
              </Link>
            </motion.div>
          </div>
        </section>
      )}

      {/* Benefits Section with Interactive Grid */}
      <section ref={benefitsRef} className="py-32">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={benefitsInView ? { opacity: 1, y: 0 } : {}}
            className="text-center mb-20"
          >
            <h2 className="text-5xl md:text-6xl font-black mb-6">
              <span className="text-primary">{t('homePage.benefits.titlePrimary')}</span> {t('homePage.benefits.titleSecondary')}
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              {t('homePage.benefits.subtitle')}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={benefitsInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ 
                  scale: 1.05,
                  transition: { duration: 0.3 }
                }}
                className="group relative p-8 rounded-2xl bg-gradient-to-br from-gray-900/50 to-black border border-gray-800 hover:border-transparent transition-all duration-500 overflow-hidden"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${benefit.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
                <div className="relative">
                  <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${benefit.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500`}>
                    <benefit.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-white">{benefit.title}</h3>
                  <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-500">
                    {benefit.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section with Carousel Effect */}
      <section ref={testimonialsRef} className="py-32 bg-gradient-to-b from-black to-gray-900">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0 }}
            animate={testimonialsInView ? { opacity: 1 } : {}}
            className="text-center mb-20"
          >
            <div className="inline-flex items-center gap-3 mb-6">
              <Star className="w-8 h-8 text-yellow-500 fill-current" />
              <span className="text-4xl font-black text-white">4.9</span>
              <span className="text-gray-400 text-lg">/ 5.0</span>
            </div>
            <h2 className="text-5xl md:text-6xl font-black mb-6">
              {t('homePage.testimonials.title')}
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                animate={testimonialsInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                whileHover={{ y: -10 }}
                className="group p-8 rounded-2xl bg-gradient-to-br from-gray-900 to-black border border-gray-800 hover:border-primary/50 transition-all duration-500"
              >
                <div className="flex items-start gap-4 mb-6">
                  <div className="relative">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-red-600 flex items-center justify-center text-xl font-bold">
                      {testimonial.name.charAt(0)}
                    </div>
                    <motion.div
                      animate={floatingAnimation}
                      className="absolute -top-2 -right-2"
                    >
                      <Trophy className="w-6 h-6 text-yellow-500" />
                    </motion.div>
                  </div>
                  <div>
                    <div className="font-bold text-lg">{testimonial.name}</div>
                    <div className="text-sm text-primary">{testimonial.course}</div>
                  </div>
                </div>
                
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-500 fill-current" />
                  ))}
                </div>
                
                <p className="text-gray-300 mb-6 italic">"{testimonial.text}"</p>
                
                <div className="pt-4 border-t border-gray-800">
                  <span className="text-sm font-semibold text-primary">{testimonial.progress}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Epic CTA Section */}
      <section className="py-40 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-black to-primary/20"></div>
          <motion.div
            animate={{
              backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
            }}
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent bg-[length:200%_100%]"
          />
        </div>

        <div className="container-custom relative text-center">
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <motion.div
              variants={pulseAnimation}
              className="inline-block mb-8"
            >
              <Sparkles className="w-16 h-16 text-yellow-500" />
            </motion.div>

            <motion.h2
              variants={fadeInUp}
              className="text-5xl md:text-7xl font-black mb-8"
            >
              <span className="bg-gradient-to-r from-primary via-yellow-500 to-primary bg-[length:200%_auto] bg-clip-text text-transparent">
                {t('homePage.cta.titleLine1')}
              </span>
              <br />
              <span className="text-white">{t('homePage.cta.titleLine2')}</span>
            </motion.h2>

            <motion.p
              variants={fadeInUp}
              className="text-2xl text-gray-300 mb-12 max-w-3xl mx-auto"
            >
              {t('homePage.cta.subtitle')}
            </motion.p>

            <motion.div
              variants={fadeInUp}
              className="flex flex-col md:flex-row gap-6 justify-center items-center"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative group"
              >
                <Link 
                  to="/register" 
                  className="relative px-12 py-6 bg-gradient-to-r from-primary via-red-600 to-primary bg-[length:200%_auto] rounded-2xl font-bold text-2xl flex items-center gap-4 overflow-hidden"
                >
                  <span className="relative z-10">{t('homePage.cta.primary')}</span>
                  <ChevronRight className="relative z-10 w-8 h-8 group-hover:translate-x-3 transition-transform" />
                  
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                    animate={{
                      x: ['-100%', '100%'],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      repeatType: "loop",
                    }}
                  />
                </Link>
                
                <div className="absolute -inset-1 bg-gradient-to-r from-primary to-yellow-500 rounded-2xl blur opacity-30 group-hover:opacity-70 transition-opacity duration-500"></div>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                className="group"
              >
                <Link 
                  to="/free-lesson" 
                  className="px-12 py-6 bg-transparent border-2 border-white/30 rounded-2xl font-bold text-2xl flex items-center gap-4 hover:bg-white/10 transition-all duration-500"
                >
                  <Play className="w-8 h-8" />
                  <span>{t('homePage.cta.secondary')}</span>
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}