import { ThemeProvider, createTheme } from '@mui/material/styles'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { SnackbarProvider } from 'notistack'
import React, { createContext, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { useLanguage } from './hooks/useLanguage'
import useThemeMode from './hooks/useThemeMode'
import { log } from './service/console.service'
import { getDesignTokens } from './ui/theme/theme'

// All application has access to the same query client to share data
const queryClient = new QueryClient({
  defaultOptions: {
    // All queries will be refetched every 5 minutes
    //queries: { staleTime: 1000 * 60 * 5 },
  },
})

export const LanguageContext = createContext({
  currentLanguageCode: '',
  setLanguage: (languageCode: string) => {},
})
const ColorModeContext = createContext({
  mode: '',
  setMode: () => {},
})

export const Providers = ({ children }: { children: React.ReactNode }) => {
  log('Providers connected')

  const [mode, setMode] = useThemeMode()
  const [currentLanguageCode, setLanguage] = useLanguage()
  const theme = useMemo(
    () => createTheme(getDesignTokens(mode, currentLanguageCode)),
    [mode, currentLanguageCode]
  )

  // Set text direction
  const { i18n } = useTranslation()
  document.body.dir = i18n.dir()

  return (
    <QueryClientProvider client={queryClient}>
      <ColorModeContext.Provider value={{ mode, setMode }}>
        <LanguageContext.Provider value={{ currentLanguageCode, setLanguage }}>
          <ThemeProvider theme={theme}>
            <SnackbarProvider autoHideDuration={5000} maxSnack={3}>
              {children}
            </SnackbarProvider>
          </ThemeProvider>
        </LanguageContext.Provider>
      </ColorModeContext.Provider>
    </QueryClientProvider>
  )
}
