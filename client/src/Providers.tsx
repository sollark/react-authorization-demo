import { useMediaQuery } from '@mui/material'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { SnackbarProvider } from 'notistack'
import React, { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { log } from './service/console.service'
import getDesignTokens from './ui/theme/theme'

// All application has access to the same query client to share data
const queryClient = new QueryClient({
  defaultOptions: {
    // All queries will be refetched every 5 minutes
    //queries: { staleTime: 1000 * 60 * 5 },
  },
})

export const Providers = ({ children }: { children: React.ReactNode }) => {
  log('Providers connected')

  const [mode, setMode] = useState<'light' | 'dark'>('light')
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)')
  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'))
      },
    }),
    []
  )

  const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode])
  const ColorModeContext = React.createContext(colorMode)

  // Set direction
  const { i18n } = useTranslation()
  document.body.dir = i18n.dir()

  return (
    <QueryClientProvider client={queryClient}>
      <SnackbarProvider autoHideDuration={5000}>
        <ColorModeContext.Provider value={colorMode}>
          <ThemeProvider theme={theme}>
            <SnackbarProvider autoHideDuration={5000} maxSnack={3}>
              {children}
            </SnackbarProvider>
          </ThemeProvider>
        </ColorModeContext.Provider>
      </SnackbarProvider>
    </QueryClientProvider>
  )
}
