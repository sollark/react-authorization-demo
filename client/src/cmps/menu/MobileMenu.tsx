import { Menu, MenuItem, Typography } from '@mui/material'
import { Link } from '@tanstack/react-router'

const pages = [
  { key: 'Home', link: <Link to='/'>Home</Link> },
  { key: 'Company', link: <Link to='/company'>Company</Link> },
  { key: 'Employee', link: <Link to='/employee'>Employee</Link> },
]

interface NavigationProps {
  anchorElNav: null | HTMLElement
  handleCloseNavMenu: () => void
}

const MobileMenu = (props: NavigationProps) => {
  const { anchorElNav, handleCloseNavMenu } = props

  return (
    <Menu
      id='menu-appbar'
      anchorEl={anchorElNav}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'left',
      }}
      open={Boolean(anchorElNav)}
      onClose={handleCloseNavMenu}
      sx={{
        display: { xs: 'block', md: 'none' },
      }}>
      {pages.map((page) => (
        <MenuItem key={page.key} onClick={handleCloseNavMenu}>
          <Typography textAlign='center'>{page.link}</Typography>
        </MenuItem>
      ))}
    </Menu>
  )
}

export default MobileMenu
