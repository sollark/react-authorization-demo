import { Button } from '@mui/material'
import { Link } from '@tanstack/router'

const pages = [
  { key: 'Home', link: <Link to='/'>Home</Link> },
  { key: 'Role', link: <Link to='/role'>Role</Link> },
]

interface SiteNavigationProps {
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
          sx={{ my: 2, color: 'white', display: 'block' }}>
          {page.link}
        </Button>
      ))}
    </>
  )
}

export default SiteNavigation
