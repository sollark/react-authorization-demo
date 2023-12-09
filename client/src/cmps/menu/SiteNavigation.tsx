import { Button } from '@mui/material'
import { pages } from './Pages'

type SiteNavigationProps = {
  handleCloseNavMenu: () => void
}

const SiteNavigation = (props: SiteNavigationProps) => {
  const { handleCloseNavMenu } = props

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
