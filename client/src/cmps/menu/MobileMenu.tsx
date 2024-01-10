import { useNavigationPages } from '@/hooks/useNavigationPage'
import { Role } from '@/models/Account'
import useAccountStore from '@/stores/accountStore'
import { Menu, MenuItem, Typography } from '@mui/material'

type NavigationProps = {
  anchorElNav: null | HTMLElement
  handleCloseNavMenu: () => void
}

const MobileMenu = (props: NavigationProps) => {
  const { anchorElNav, handleCloseNavMenu } = props
  const role: Role = useAccountStore((state) => state.role)
  const pages = useNavigationPages(role)

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
