import { ColorModeContext } from '@/Providers'
import LanguageSwitcher from '@/cmps/languageSwitcher/LanguageSwitcher'
import {
  Brightness4 as DarkIcon,
  Brightness7 as LightIcon,
  Notifications as NotificationsIcon,
  Search as SearchIcon,
} from '@mui/icons-material'
import { AppBar, Badge, IconButton, InputBase, Toolbar } from '@mui/material'
import { useContext } from 'react'

const Topbar = () => {
  const { mode, toggleColorMode } = useContext(ColorModeContext)

  const isDarkMode = mode === 'dark'

  const handleThemeChange = () => {
    toggleColorMode()
  }

  return (
    <AppBar position='static'>
      <Toolbar
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          padding: '0 1rem',
        }}>
        <div>
          <IconButton color='inherit'>
            <SearchIcon />
          </IconButton>
          <InputBase placeholder='Search...' />
        </div>
        <div>
          <IconButton color='inherit'>
            <Badge badgeContent={3} color='error'>
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <IconButton color='inherit' onClick={handleThemeChange}>
            {isDarkMode ? <LightIcon /> : <DarkIcon />}
          </IconButton>
          <LanguageSwitcher />
        </div>
      </Toolbar>
    </AppBar>
  )
}

export default Topbar
