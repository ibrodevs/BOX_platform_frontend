import { Link } from 'react-router-dom'
import { motion, useInView } from 'framer-motion'
import { useEffect, useMemo, useRef, useState } from 'react'
import { getCourses } from '../services/apiService'
import CourseCard from '../components/CourseCard'
import { Trophy, Target, Clock, Brain, Star, ChevronRight, Play, Shield, Zap } from 'lucide-react'
import { useTranslation } from 'react-i18next'

export default function Home() {
  const { t } = useTranslation()
  const [courses, setCourses] = useState([])
  const containerRef = useRef(null)
  const heroRef = useRef(null)
  const coursesRef = useRef(null)
  const benefitsRef = useRef(null)
  const testimonialsRef = useRef(null)
  

  
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
      description: t('homePage.benefits.items.0.description')
    },
    {
      icon: Brain,
      title: t('homePage.benefits.items.1.title'),
      description: t('homePage.benefits.items.1.description')
    },
    {
      icon: Clock,
      title: t('homePage.benefits.items.2.title'),
      description: t('homePage.benefits.items.2.description')
    },
    {
      icon: Shield,
      title: t('homePage.benefits.items.3.title'),
      description: t('homePage.benefits.items.3.description')
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
    <div ref={containerRef} className="relative overflow-hidden bg-white">
      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center bg-white pt-20">
        <div className="container-custom relative z-10 text-center">
          <motion.div
            variants={staggerContainer}
            initial="initial"
            animate="animate"
          >
            <motion.div variants={fadeInUp} className="relative inline-block mb-8">
              <span className="inline-block px-4 py-2 bg-gray-100 border border-gray-300 rounded-lg text-sm md:text-base text-gray-600 mb-4 font-medium">
                {t('homePage.hero.badge')}
              </span>
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black mb-6 leading-tight text-gray-900"
            >
              <span className="block">{t('homePage.hero.titleLine1')}</span>
              <span className="block text-gray-700">{t('homePage.hero.titleLine2')}</span>
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="text-lg md:text-xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed"
            >
              {t('homePage.hero.subtitle')}
            </motion.p>

            <motion.div
              variants={fadeInUp}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Link 
                  to="/courses" 
                  className="btn-primary flex items-center gap-2 text-base md:text-lg"
                >
                  <span>{t('homePage.hero.cta')}</span>
                  <ChevronRight className="w-5 h-5" />
                </Link>
              </motion.div>

              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Link 
                  to="/merch" 
                  className="btn-secondary flex items-center gap-2 text-base md:text-lg"
                >
                  <Play className="w-5 h-5" />
                  <span>{t('homePage.hero.buyMerch')}</span>
                </Link>
              </motion.div>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              className="mt-12 flex flex-wrap justify-center gap-8 text-sm md:text-base"
            >
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-gray-600" />
                <span className="text-gray-600">{t('homePage.hero.features.0')}</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 text-gray-600" />
                <span className="text-gray-600">{t('homePage.hero.features.1')}</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-gray-600" />
                <span className="text-gray-600">{t('homePage.hero.features.2')}</span>
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
          <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-gray-400 rounded-full mt-2"></div>
          </div>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gray-50 border-y border-gray-200">
        <div className="container-custom">
          <motion.div 
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-4 gap-6"
          >
            {statsItems.map((stat, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="relative p-6 rounded-xl bg-white border border-gray-200 hover:border-gray-300 transition-all duration-300"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center">
                    <stat.icon className="w-6 h-6 text-gray-700" />
                  </div>
                  <div>
                    <div className="text-2xl md:text-3xl font-bold text-gray-900">
                      {stat.value}
                    </div>
                    <div className="text-sm text-gray-600">
                      {stat.label}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Courses Preview */}
      {courses.length > 0 && (
        <section ref={coursesRef} className="py-20 bg-white">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={coursesInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <span className="inline-block text-sm font-semibold text-gray-600 uppercase tracking-wider mb-4">
                {t('homePage.popular.badge')}
              </span>
              <h2 className="text-4xl md:text-5xl font-black mb-4 text-gray-900">
                {t('homePage.popular.title')}
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                {t('homePage.popular.subtitle')}
              </p>
            </motion.div>

            <motion.div
              variants={staggerContainer}
              initial="initial"
              animate={coursesInView ? "animate" : ""}
              className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12"
            >
              {courses.map((course, index) => (
                <motion.div
                  key={course.id}
                  variants={{
                    initial: { opacity: 0, y: 30 },
                    animate: { 
                      opacity: 1, 
                      y: 0,
                      transition: { 
                        duration: 0.6,
                        delay: index * 0.15
                      }
                    }
                  }}
                >
                  <CourseCard 
                    course={course} 
                    className="relative bg-white border border-gray-200 hover:border-gray-300 transition-all duration-300"
                  />
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={coursesInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.4 }}
              className="text-center"
            >
              <Link to="/courses" className="group inline-flex items-center gap-2 font-semibold text-gray-900 hover:text-gray-700">
                <span>{t('homePage.popular.viewAll')}</span>
                <ChevronRight className="w-5 h-5" />
              </Link>
            </motion.div>
          </div>
        </section>
      )}

      {/* Benefits Section */}
      <section ref={benefitsRef} className="py-20 bg-gray-50">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={benefitsInView ? { opacity: 1, y: 0 } : {}}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-black mb-4 text-gray-900">
              {t('homePage.benefits.titlePrimary')} {t('homePage.benefits.titleSecondary')}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {t('homePage.benefits.subtitle')}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={benefitsInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="p-6 rounded-xl bg-white border border-gray-200 hover:border-gray-300 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-lg bg-gray-900 flex items-center justify-center mb-4">
                  <benefit.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold mb-2 text-gray-900">{benefit.title}</h3>
                <p className="text-sm text-gray-600">
                  {benefit.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section ref={testimonialsRef} className="py-20 bg-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0 }}
            animate={testimonialsInView ? { opacity: 1 } : {}}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 mb-4">
              <span className="text-3xl font-black text-gray-900">4.9</span>
              <span className="text-gray-600">/ 5.0</span>
              <div className="flex gap-1 ml-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-500 fill-current" />
                ))}
              </div>
            </div>
            <h2 className="text-4xl md:text-5xl font-black mb-4 text-gray-900">
              {t('homePage.testimonials.title')}
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={testimonialsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className="p-6 rounded-xl bg-gray-50 border border-gray-200 hover:border-gray-300 transition-all duration-300"
              >
                <div className="flex items-start gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-gray-900 flex items-center justify-center text-white font-bold text-sm">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-600">{testimonial.course}</div>
                  </div>
                </div>
                
                <div className="flex gap-1 mb-3">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-500 fill-current" />
                  ))}
                </div>
                
                <p className="text-gray-700 text-sm mb-4 italic">"{testimonial.text}"</p>
                
                <div className="pt-4 border-t border-gray-200">
                  <span className="text-xs font-semibold text-gray-600">{testimonial.progress}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="container-custom">
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="text-center"
          >
            <motion.h2
              variants={fadeInUp}
              className="text-4xl md:text-6xl font-black mb-6"
            >
              {t('homePage.cta.titleLine1')}
              <br />
              {t('homePage.cta.titleLine2')}
            </motion.h2>

            <motion.p
              variants={fadeInUp}
              className="text-lg text-gray-300 mb-10 max-w-2xl mx-auto"
            >
              {t('homePage.cta.subtitle')}
            </motion.p>

            <motion.div
              variants={fadeInUp}
              className="flex flex-col md:flex-row gap-4 justify-center items-center"
            >
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link 
                  to="/register" 
                  className="px-8 py-3 bg-white text-gray-900 rounded-lg font-bold flex items-center gap-2 hover:bg-gray-100 transition-colors"
                >
                  <span>{t('homePage.cta.primary')}</span>
                  <ChevronRight className="w-5 h-5" />
                </Link>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link 
                  to="/free-lesson" 
                  className="px-8 py-3 bg-transparent border-2 border-white rounded-lg font-bold flex items-center gap-2 hover:bg-white/10 transition-all"
                >
                  <Play className="w-5 h-5" />
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