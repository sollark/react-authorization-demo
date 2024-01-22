import { LANGUAGES } from '@/constants/constants'
import { useLanguage } from '@/hooks/useLanguage'
import { ChangeEvent, FC } from 'react'

const LanguageSwitcher: FC = () => {
  const [currentLanguageCode, setLanguage] = useLanguage()

  const handleLanguageChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setLanguage(event.target.value)
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
