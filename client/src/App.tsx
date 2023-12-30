import { useMediaQuery } from '@mui/material'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { RouterProvider } from '@tanstack/react-router'
import { SnackbarProvider } from 'notistack'
import React, { useMemo, useState } from 'react'
import { router } from './routes/router'
import { log } from './service/console.service'
import getDesignTokens from './ui/theme/theme'

function App() {
  log('App connected')

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

  return (
    <>
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <SnackbarProvider maxSnack={3}>
            {/* <CssBaseline enableColorScheme /> */}
            <RouterProvider router={router} />
          </SnackbarProvider>
        </ThemeProvider>
      </ColorModeContext.Provider>
      {/* <TanStackRouterDevtools router={router} /> */}
    </>
  )
}

export default App
