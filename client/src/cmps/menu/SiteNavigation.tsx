import { Role } from '@/models/Account'
import useAccountStore from '@/stores/accountStore'
import { Button } from '@mui/material'
import { adminPages, userPages } from './Pages'

type SiteNavigationProps = {
  handleCloseNavMenu: () => void
}

const navigationPages = {
  guest: userPages,
  user: userPages,
  supervisor: userPages,
  manager: adminPages,
  admin: adminPages,
}

const SiteNavigation = (props: SiteNavigationProps) => {
  const { handleCloseNavMenu } = props
  const role: Role = useAccountStore((state) => state.role)
  const pages = navigationPages[role]

  return (
    <>
      {pages.map((page) => (
        <Button
          key={page.key}
          onClick={handleCloseNavMenu}
          sx={{ my: 2, color: 'primary.contrastText', display: 'block' }}>
          {page.link}
        </Button>
      ))}
    </>
  )
}

export default SiteNavigation
