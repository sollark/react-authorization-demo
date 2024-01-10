import { useNavigationPages } from '@/hooks/useNavigationPage'
import { Role } from '@/models/Account'
import useAccountStore from '@/stores/accountStore'
import { Button } from '@mui/material'

type SiteNavigationProps = {
  handleCloseNavMenu: () => void
}

const SiteNavigation = (props: SiteNavigationProps) => {
  const { handleCloseNavMenu } = props
  const role: Role = useAccountStore((state) => state.role)
  const pages = useNavigationPages(role)

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
