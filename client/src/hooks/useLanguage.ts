import { config } from '@/config/config'
import { LANGUAGES } from '@/constants/constants'
import { i18n } from '@/i18n/config'
import { useEffect, useState } from 'react'

const DEFAULT_LANGUAGE = config.defaultLanguage

export const useLanguage = () => {
  const initialLanguageCode =
    LANGUAGES.find((lang) => lang.value === DEFAULT_LANGUAGE)?.value ||
    LANGUAGES[0].value
  const [currentLanguageCode, setCurrentLanguageCode] =
    useState<string>(initialLanguageCode)

  useEffect(() => {
    const storedLanguageCode = localStorage.getItem('languageCode')
    if (storedLanguageCode) {
      setCurrentLanguageCode(storedLanguageCode)
    }
  }, [])

  const setLanguage = (newLanguageCode: string) => {
    setCurrentLanguageCode(newLanguageCode)
    localStorage.setItem('languageCode', newLanguageCode)
    i18n.changeLanguage(newLanguageCode)
  }

  return { currentLanguageCode, setLanguage }
}
