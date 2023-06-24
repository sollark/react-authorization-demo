import {
  AppBar,
  Avatar,
  Box,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
} from '@mui/material'
import { FC, useState } from 'react'
import Logo from './logo/Logo'
import MenuIcon from './menu/MenuIcon'
import MobileMenu from './menu/MobileMenu'
import SiteNavigation from './menu/SiteNavigation'

const settings = ['Profile', 'Account', 'Dashboard', 'Logout']

const Header: FC = () => {
  console.log('Header connected')

  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null)
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null)

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget)
  }
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget)
  }

  const handleCloseNavMenu = () => {
    setAnchorElNav(null)
  }

  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }

  return (
    <header className='app-header'>
      <AppBar position='static'>
        <Container maxWidth='xl'>
          <Toolbar disableGutters>
            {/* Large screen logo */}
            <Logo
              sxImg={{ display: { xs: 'none', md: 'flex' } }}
              sxText={{ display: { xs: 'none', md: 'flex' } }}
            />

            {/* Mobile navigation */}
            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              <MenuIcon handleOpenNavMenu={handleOpenNavMenu} />
              <MobileMenu
                anchorElNav={anchorElNav}
                handleCloseNavMenu={handleCloseNavMenu}
              />
            </Box>

            {/* Mobile screen logo */}
            <Logo
              sxImg={{ display: { xs: 'flex', md: 'none' } }}
              sxText={{ display: { xs: 'flex', md: 'none', flexGrow: 1 } }}
            />

            {/* Site navigation  */}
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              <SiteNavigation handleCloseNavMenu={handleCloseNavMenu} />
            </Box>

            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title='Open settings'>
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt='Moshe' src='/static/images/avatar/2.jpg' />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: '45px' }}
                id='menu-appbar'
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}>
                {settings.map((setting) => (
                  <MenuItem key={setting} onClick={handleCloseUserMenu}>
                    <Typography textAlign='center'>{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </header>
  )
}

export default Header
