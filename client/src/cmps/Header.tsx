import { AppBar, Box, Container, Toolbar } from '@mui/material'
import { FC, useState } from 'react'
import Logo from './logo/Logo'
import MenuIcon from './menu/MenuIcon'
import MobileMenu from './menu/MobileMenu'
import SiteNavigation from './menu/SiteNavigation'
import User from './user/User'

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
      <AppBar color='primary' enableColorOnDark position='static'>
        <Container color='primary' maxWidth='xl'>
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

            {/* User section  */}
            <Box sx={{ flexGrow: 0 }}>
              <User
                handleOpenUserMenu={handleOpenUserMenu}
                anchorElUser={anchorElUser}
                handleCloseUserMenu={handleCloseUserMenu}
              />
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </header>
  )
}

export default Header
