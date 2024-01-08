import { config } from '@/config/config'
import { LANGUAGES } from '@/constants/constants'
import { i18n } from '@/i18n/config'

import { ChangeEvent, FC, useEffect, useState } from 'react'

const defaultLanguage = config.defaultLanguage

const LanguageSwitcher: FC = () => {
  const initialLanguageCode =
    LANGUAGES.find((lang) => lang.value === defaultLanguage)?.value ||
    LANGUAGES[0].value
  const [currentLanguageCode, setCurrentLanguageCode] =
    useState<string>(initialLanguageCode)

  useEffect(() => {
    // Retrieve language preference from storage
    const storedLanguageCode = localStorage.getItem('languageCode')
    if (storedLanguageCode) {
      setCurrentLanguageCode(storedLanguageCode)
    }
  }, [])

  const handleLanguageChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const newLanguageCode = event.target.value
    setCurrentLanguageCode(newLanguageCode)
    localStorage.setItem('languageCode', newLanguageCode)
    i18n.changeLanguage(newLanguageCode)
  }

  return (
    <select value={currentLanguageCode} onChange={handleLanguageChange}>
      {LANGUAGES.map((language) => (
        <option key={language.value} value={language.value}>
          {language.label}
        </option>
      ))}
    </select>
  )
}

export default LanguageSwitcher
