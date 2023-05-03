import EmailInput from '@/cmps/inputs/EmailInput'
import PasswordInput from '@/cmps/inputs/PasswordInput'
import { Box, Button } from '@mui/material'
import { Link } from '@tanstack/router'
import { FC } from 'react'

const Registration: FC = () => {
  console.log('Registration connected')
  return (
    <Box component='article' sx={{ maxWidth: '25rem', mx: 'auto', p: '1rem' }}>
      <h1>Registration</h1>
      <form>
        <EmailInput fullWidth margin='normal' />
        <PasswordInput fullWidth margin='normal' />
        <PasswordInput fullWidth margin='normal' />
        <Button variant='contained' type='submit'>
          Registration
        </Button>
      </form>
      <p>
        Already have an account? <Link to='/auth/signin'>Sign in</Link>
      </p>
    </Box>
  )
}

export default Registration
