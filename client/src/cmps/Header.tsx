import { FC } from 'react'
import Logo from './Logo'
import Navigation from './Navigation'
import { Box } from '@mui/material'

const Header: FC = () => {
  console.log('Header connected')

  return (
    <header className='app-header'>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          height: '100%',
        }}>
        <Logo />
        <Navigation />
      </Box>
    </header>
  )
}

export default Header
