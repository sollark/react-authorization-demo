import { log } from '@/service/console.service.js'
import { tokens } from './colorTokens'

type PaletteMode = 'light' | 'dark'

// Mui theme setting
export const getDesignTokens = (mode: PaletteMode, lang: string) => {
  log(`Mui theme, mode ${mode}, lang ${lang}`)

  const colors = tokens(mode)

  return {
    palette: {
      mode: mode,
      ...(mode === 'dark'
        ? {
            primary: {
              main: colors.primary[500],
            },
            secondary: {
              main: colors.secondary[500],
            },
            accent: {
              main: colors.accent[500],
            },
            neutral: {
              dark: colors.grey[700],
              main: colors.grey[500],
              light: colors.grey[100],
            },
            background: {
              default: colors.primary[500],
              paper: colors.grey[800],
            },
          }
        : {
            primary: {
              main: colors.primary[500],
            },
            secondary: {
              main: colors.secondary[500],
            },
            accent: {
              main: colors.accent[500],
            },
            neutral: {
              dark: colors.grey[100],
              main: colors.grey[500],
              light: colors.grey[700],
            },
            background: {
              default: colors.grey[100],
              paper: colors.grey[800],
            },
          }),
    },
    typography: {
      fontFamily:
        lang === 'he'
          ? 'Noto, Helvetica, Arial, sans-serif'
          : 'Roboto, Helvetica, Arial, sans-serif',
      fontSize: lang === 'he' ? 16 : 14,
    },
  }
}
