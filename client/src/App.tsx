import { CssBaseline, useMediaQuery } from '@mui/material'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { RouterProvider } from '@tanstack/router'
import React, { useMemo, useState } from 'react'
import { TanStackRouterDevtools, router } from './routes/router'
import getDesignTokens from './ui/theme/theme'

function App() {
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
          {/* <CssBaseline enableColorScheme /> */}
          <RouterProvider router={router} />
        </ThemeProvider>
      </ColorModeContext.Provider>
      <TanStackRouterDevtools router={router} />
    </>
  )
}

export default App
