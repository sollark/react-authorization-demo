import { Role } from '@/models/Account'
import useAccountStore from '@/stores/accountStore'
import { Menu, MenuItem, Typography } from '@mui/material'
import { adminPages, userPages } from './Pages'

type NavigationProps = {
  anchorElNav: null | HTMLElement
  handleCloseNavMenu: () => void
}

const navigationPages = {
  guest: userPages,
  user: userPages,
  supervisor: userPages,
  manager: adminPages,
  admin: adminPages,
}

const MobileMenu = (props: NavigationProps) => {
  const { anchorElNav, handleCloseNavMenu } = props
  const role: Role = useAccountStore((state) => state.role)
  const pages = navigationPages[role]

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
