import { useLanguageAndTheme } from '@/hooks/useLanguageAndTheme'
import {
  Brightness4 as DarkIcon,
  Language as LanguageIcon,
  Brightness7 as LightIcon,
  Notifications as NotificationsIcon,
  Search as SearchIcon,
} from '@mui/icons-material'
import { AppBar, Badge, IconButton, InputBase, Toolbar } from '@mui/material'

const Topbar = () => {
  const { currentLanguageCode, setLanguage, mode, toggleColorMode } =
    useLanguageAndTheme()
  const isDarkMode = mode === 'dark'

  const handleThemeChange = () => {
    toggleColorMode()
  }

  const handleLanguageChange = () => {
    // Handle language change logic here
  }

  return (
    <AppBar position='static'>
      <Toolbar>
        <div>
          <IconButton color='inherit'>
            <SearchIcon />
          </IconButton>
          <InputBase placeholder='Search...' />
        </div>
        <div style={{ marginLeft: 'auto' }}>
          <IconButton color='inherit'>
            <Badge badgeContent={3} color='error'>
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <IconButton color='inherit' onClick={handleThemeChange}>
            {isDarkMode ? <LightIcon /> : <DarkIcon />}
          </IconButton>
          <IconButton color='inherit' onClick={handleLanguageChange}>
            <LanguageIcon />
          </IconButton>
        </div>
      </Toolbar>
    </AppBar>
  )
}

export default Topbar
