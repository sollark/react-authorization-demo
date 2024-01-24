import { ColorModeContext } from '@/Providers'
import LanguageSwitcher from '@/cmps/languageSwitcher/LanguageSwitcher'
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

const drawerWidth = 240

interface AppBarProps extends MuiAppBarProps {
  isSidebarOpen?: boolean
}

type TopbarProps = {
  isSidebarOpen?: boolean
  openSidebar: () => void
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'isSidebarOpen',
})<AppBarProps>(({ theme, isSidebarOpen }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(isSidebarOpen && {
    marginInlineStart: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}))

const Topbar = (props: TopbarProps) => {
  const { isSidebarOpen, openSidebar } = props

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
        }}>
        <div>
          {/* Open/Close sidebar */}
          <IconButton
            color='inherit'
            aria-label='open drawer'
            onClick={openSidebar}
            edge='start'
            sx={{
              marginInlineEnd: 5,
              ...(isSidebarOpen && { display: 'none' }),
            }}>
            <MenuIcon />
          </IconButton>
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
