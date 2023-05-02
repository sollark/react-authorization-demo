import { Box, Button, TextField } from '@mui/material'
import { Link } from '@tanstack/router'

export default function Signin() {
  console.log('Signin connected')
  return (
    <Box component='article' sx={{ maxWidth: '25rem', mx: 'auto', p: '1rem' }}>
      <h1>Sign in</h1>
      <form>
        <TextField
          fullWidth
          margin='normal'
          label='Email'
          type='email'
          name='email'
          id='email'
          placeholder='Email'
        />

        <TextField
          fullWidth
          margin='normal'
          label='Password'
          type='password'
          name='password'
          id='password'
          placeholder='Password'
        />
        <Button variant='contained' type='submit'>
          Sign in
        </Button>
      </form>
      <p>
        Don't have an account? <Link to='/auth/registration'>Registration</Link>
      </p>
    </Box>
  )
}
