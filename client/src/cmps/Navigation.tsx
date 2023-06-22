import { Box } from '@mui/material'
import { Link } from '@tanstack/router'

const Navigation = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '1rem',
        height: '100%',
      }}>
      <Link to='/'>Home</Link>
      <Link to='/shift'>Shift</Link>
    </Box>
  )
}

export default Navigation
