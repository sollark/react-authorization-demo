import { alpha } from '@mui/material'

type PaletteMode = 'light' | 'dark'

const cyanBase = '#54f2f2'
const cyan = alpha(cyanBase, 0.7)
const cyanLight = alpha(cyanBase, 0.5)
const cyanDark = alpha(cyanBase, 0.9)

const moonstoneBase = '#5eb1bf'
const moonstone = alpha(moonstoneBase, 0.7)
const moonstoneLight = alpha(moonstoneBase, 0.5)
const moonstoneDark = alpha(moonstoneBase, 0.9)

const getDesignTokens = (mode: PaletteMode) => {
  return {
    palette: {
      mode,
      ...(mode === 'light'
        ? {
            primary: {
              main: cyan,
            },
            secondary: {
              main: moonstone,
            },
            accent: {
              main: '#f0a202',
            },
          }
        : {
            primary: {
              main: cyan,
            },
            secondary: {
              main: moonstone,
            },
            accent: {
              main: '#f0a202',
            },
          }),
    },
  }
}

export default getDesignTokens
