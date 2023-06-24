import {
  AppBar,
  Avatar,
  Box,
  Button,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
} from '@mui/material'
import { Link } from '@tanstack/router'
import { FC, useState } from 'react'
import MenuIcon from './menu/MenuIcon'
import Navigation from './menu/Navigation'
import Logo from './logo/Logo'

const pages = [
  { key: 'Home', link: <Link to='/'>Home</Link> },
  { key: 'Shift', link: <Link to='/shift'>Shift</Link> },
]

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

            {/* Menu */}
            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              <MenuIcon handleOpenNavMenu={handleOpenNavMenu} />
              <Navigation
                anchorElNav={anchorElNav}
                handleCloseNavMenu={handleCloseNavMenu}
              />
            </Box>

            {/* Small screen logo */}
            <Logo
              sxImg={{ display: { xs: 'flex', md: 'none' } }}
              sxText={{ display: { xs: 'flex', md: 'none', flexGrow: 1 } }}
            />

            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              {pages.map((page) => (
                <Button
                  key={page.key}
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: 'white', display: 'block' }}>
                  {page.link}
                </Button>
              ))}
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
