import i18next from 'i18next'
import I18NextHttpBackend from 'i18next-http-backend'
import { initReactI18next } from 'react-i18next'

i18next
  .use(I18NextHttpBackend) // Optional for dynamic loading
  .use(initReactI18next) // Pass options to initReactI18next
  .init({
    fallbackLng: 'en', // Default language
    debug: true, // Enable debug logging (optional)
    resources: {
      en: {
        translation: require('./locales/en/translation.json'),
      },
      ru: {
        translation: require('./locales/ru/translation.json'),
      },
      he: {
        translation: require('./locales/he/translation.json'),
      },
    },
    interpolation: {
      escapeValue: false, // Not needed for react as it escapes by default
    },
  })

export const i18n = i18next
