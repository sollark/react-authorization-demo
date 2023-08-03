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

const orangeBase = '#f0a202'
const orange = alpha(orangeBase, 0.7)
const orangeLight = alpha(orangeBase, 0.5)
const orangeDark = alpha(orangeBase, 0.9)

const getDesignTokens = (mode: PaletteMode) => {
  return {
    palette: {
      mode,
      ...(mode === 'light'
        ? {
            primary: {
              main: moonstoneLight,
            },
            secondary: {
              main: cyanLight,
            },
            accent: {
              main: orangeLight,
            },
          }
        : {
            primary: {
              main: moonstoneDark,
            },
            secondary: {
              main: cyanDark,
            },
            accent: {
              main: orangeDark,
            },
          }),
    },
  }
}

export default getDesignTokens
