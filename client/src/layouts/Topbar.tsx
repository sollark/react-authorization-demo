import { ColorModeContext } from '@/Providers'
import LanguageSwitcher from '@/cmps/languageSwitcher/LanguageSwitcher'
import Logo from '@/cmps/logo/Logo'
import User from '@/cmps/user/User'
import {
  Brightness4 as DarkIcon,
  Brightness7 as LightIcon,
  Notifications as NotificationsIcon,
  Search as SearchIcon,
} from '@mui/icons-material'
import MenuIcon from '@mui/icons-material/Menu'
import { Badge, IconButton, InputBase, Toolbar, styled } from '@mui/material'
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar'
import { useContext } from 'react'

interface AppBarProps extends MuiAppBarProps {
  isSidebarOpen?: boolean
}

type TopbarProps = {
  isSidebarOpen?: boolean
  openSidebar: () => void
  closeSidebar: () => void
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'isSidebarOpen',
})<AppBarProps>(({ theme, isSidebarOpen }) => ({
  zIndex: theme.zIndex.drawer + 1,
}))

const Topbar = (props: TopbarProps) => {
  const { isSidebarOpen, openSidebar, closeSidebar } = props
  const { mode, toggleColorMode } = useContext(ColorModeContext)
  const isDarkMode = mode === 'dark'

  const handleThemeChange = () => {
    toggleColorMode()
  }

  return (
    <AppBar position='fixed' isSidebarOpen={isSidebarOpen}>
      <Toolbar
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          padding: '0 1rem',
          backgroundColor: (theme) =>
            theme.palette.mode === 'dark'
              ? theme.palette.primary.main
              : theme.palette.primary.main,
          color: (theme) =>
            theme.palette.mode === 'dark'
              ? theme.palette.grey[100]
              : theme.palette.grey[800],
        }}>
        {/* Open/Close sidebar button and logo */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center',
            gap: 3,
          }}>
          {/* Open/Close sidebar */}
          <IconButton
            color='inherit'
            aria-label='open drawer'
            onClick={isSidebarOpen ? closeSidebar : openSidebar}
            edge='start'
            sx={{ marginInlineEnd: 5 }}>
            <MenuIcon />
          </IconButton>

          {/* Logo */}
          <Logo
            sxImg={{ display: { xs: 'none', md: 'flex' } }}
            sxText={{ display: { xs: 'none', md: 'flex' } }}
          />
        </div>
        {/* Search bar */}
        <div>
          <IconButton color='inherit'>
            <SearchIcon />
          </IconButton>
          <InputBase placeholder='Search...' />
        </div>
        {/* User menu and theme toggle button  */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center',
            gap: 3,
          }}>
          <IconButton color='inherit'>
            <Badge badgeContent={3} color='error'>
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <IconButton color='inherit' onClick={handleThemeChange}>
            {isDarkMode ? <LightIcon /> : <DarkIcon />}
          </IconButton>
          <LanguageSwitcher />
          <User />
        </div>
      </Toolbar>
    </AppBar>
  )
}

export default Topbar
