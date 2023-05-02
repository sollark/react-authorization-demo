import { Box, Button } from '@mui/material'
import React from 'react'
import EmailInput from './inputs/EmailInput'
import PasswordInput from './inputs/PasswordInput'
import { Link } from '@tanstack/router'

export default function Registration() {
  console.log('Registration connected')
  return (
    <Box component='article' sx={{ maxWidth: '25rem', mx: 'auto', p: '1rem' }}>
      {' '}
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
