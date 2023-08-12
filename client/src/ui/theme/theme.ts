type PaletteMode = 'light' | 'dark'

const cyan = 'hsl(180, 86%, 67%)'
const cyanLight = 'hsl(180, 86%, 90%)'
const cyanDark = 'hsl(180, 86%, 25%)'

const moonstone = 'hsl(189, 43%, 56%)'
const moonstoneLight = 'hsl(189, 41%, 85%)'
const moonstoneDark = 'hsl(189, 43%, 25%)'

const yellow = 'hsl(40, 98%, 47%)'
const yellowLight = 'hsl(40, 98%, 65%)'
const yellowDark = 'hsl(40, 98%, 47%)'

const getDesignTokens = (mode: PaletteMode) => {
  return {
    palette: {
      mode,
      ...(mode === 'light'
        ? {
            primary: {
              main: cyanLight,
              light: cyanLight,
              dark: cyanDark,
              divider: cyanDark,
              contrastText: 'black',
            },
            secondary: {
              main: moonstoneLight,
              light: moonstoneLight,
              dark: moonstoneDark,
              divider: moonstoneDark,
              contrastText: 'black',
            },
            accent: {
              main: yellowLight,
              light: yellowLight,
              dark: yellowDark,
              divider: yellowDark,
              contrastText: 'black',
            },
          }
        : {
            primary: {
              main: cyanDark,
              light: cyanLight,
              dark: cyanDark,
              divider: cyanLight,
              contrastText: 'white',
            },
            secondary: {
              main: moonstoneDark,
              light: moonstoneLight,
              dark: moonstoneDark,
              divider: moonstoneLight,
              contrastText: 'white',
            },
            accent: {
              main: yellowDark,
              light: yellowLight,
              dark: yellowDark,
              divider: yellowLight,
              contrastText: 'black',
            },
          }),
    },
  }
}

export default getDesignTokens
