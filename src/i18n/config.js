import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

import translationRU from './locales/ru.json'
import translationEN from './locales/en.json'
import translationKY from './locales/ky.json'

const resources = {
  ru: {
    translation: translationRU
  },
  en: {
    translation: translationEN
  },
  ky: {
    translation: translationKY
  }
}

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'ru',
    debug: false,
    interpolation: {
      escapeValue: false
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage']
    }
  })

export default i18n
