import { Button } from '@mui/material'
import { Link } from '@tanstack/react-router'

const pages = [
  { key: 'Home', link: <Link to='/'>Home</Link> },
  // { key: 'Role', link: <Link to='/role'>Role</Link> },
  { key: 'Company', link: <Link to='/company'>Company</Link> },
  { key: 'People', link: <Link to='/people'>People</Link> },
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
          sx={{ my: 2, color: 'primary.contrastText', display: 'block' }}>
          {page.link}
        </Button>
      ))}
    </>
  )
}

export default SiteNavigation
