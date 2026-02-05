import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { motion, AnimatePresence } from 'framer-motion'
import { Globe, Check } from 'lucide-react'

export default function LanguageSwitcher() {
  const { i18n, t } = useTranslation()
  const [isOpen, setIsOpen] = useState(false)

  const languages = [
    { code: 'ru', name: t('languages.ru'), flag: '🇷🇺' },
    { code: 'en', name: t('languages.en'), flag: '🇬🇧' },
    { code: 'ky', name: t('languages.ky'), flag: '🇰🇬' }
  ]

  const currentLanguage = languages.find(lang => lang.code === i18n.language) || languages[0]

  const changeLanguage = (langCode) => {
    i18n.changeLanguage(langCode)
    setIsOpen(false)
  }

  return (
    <div className="relative">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-900/50 hover:bg-gray-800 transition-colors border border-gray-800 hover:border-primary/50"
      >
        <Globe className="w-4 h-4 text-gray-400" />
        <span className="text-lg">{currentLanguage.flag}</span>
        <span className="text-sm font-medium text-gray-400 hidden md:inline">
          {currentLanguage.code.toUpperCase()}
        </span>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="absolute right-0 mt-2 w-48 bg-gray-900/95 backdrop-blur-xl rounded-xl border border-gray-800 shadow-2xl overflow-hidden z-50"
            >
              <div className="p-2">
                {languages.map((lang, index) => (
                  <motion.button
                    key={lang.code}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    onClick={() => changeLanguage(lang.code)}
                    className={`w-full flex items-center justify-between gap-3 px-4 py-3 rounded-lg transition-all duration-300 ${
                      currentLanguage.code === lang.code
                        ? 'bg-primary/20 text-white'
                        : 'text-gray-400 hover:text-white hover:bg-gray-800'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-xl">{lang.flag}</span>
                      <span className="font-medium">{lang.name}</span>
                    </div>
                    {currentLanguage.code === lang.code && (
                      <Check className="w-4 h-4 text-primary" />
                    )}
                  </motion.button>
                ))}
              </div>
            </motion.div>
            
            <div 
              className="fixed inset-0 z-40" 
              onClick={() => setIsOpen(false)}
            />
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
