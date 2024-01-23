// useLanguageAndTheme.ts
import { ColorModeContext, LanguageContext } from '@/Providers'
import { config } from '@/config/config'
import { LANGUAGES } from '@/constants/constants'
import { i18n } from '@/i18n/config'
import { useContext, useEffect, useState } from 'react'

const DEFAULT_LANGUAGE = config.defaultLanguage

export const useLanguageAndTheme = () => {
  const {
    currentLanguageCode: contextLanguageCode,
    setLanguage: setLanguageContext,
  } = useContext(LanguageContext)
  const { mode, toggleColorMode } = useContext(ColorModeContext)

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
    setLanguageContext(newLanguageCode)
    i18n.changeLanguage(newLanguageCode)
  }

  return { currentLanguageCode, setLanguage, mode, toggleColorMode }
}
