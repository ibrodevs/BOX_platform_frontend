import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

export default function NotFound() {
  const { t } = useTranslation()
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen flex items-center justify-center"
    >
      <div className="text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring' }}
          className="text-9xl font-black mb-8"
        >
          <span className="text-primary">4</span>
          <span className="text-white">0</span>
          <span className="text-primary">4</span>
        </motion.div>
        
        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-4xl font-black mb-4"
        >
          {t('notFound.title')}
        </motion.h1>
        
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-gray-400 mb-8"
        >
          {t('notFound.subtitle')}
        </motion.p>
        
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <Link to="/" className="btn-primary inline-block">
            {t('notFound.goHome')}
          </Link>
        </motion.div>

        {/* Boxing Gloves Animation */}
        <motion.div
          animate={{ 
            rotate: [0, -10, 10, -10, 0],
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            repeatDelay: 1
          }}
          className="text-8xl mt-12"
        >
          🥊
        </motion.div>
      </div>
    </motion.div>
  )
}
