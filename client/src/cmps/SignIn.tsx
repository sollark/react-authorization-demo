import { Box, Button, TextField } from '@mui/material'
import { Link } from '@tanstack/router'
import { FC } from 'react'
import Input from './form/Input'

const Signin: FC = () => {
  console.log('Signin connected')
  return (
    <Box component='article' sx={{ maxWidth: '25rem', mx: 'auto', p: '1rem' }}>
      <h1>Sign in</h1>
      <form>
        <Input fullWidth margin='normal' name={'email'} label={'Email'} />
        <Input fullWidth margin='normal' name={'password'} label={'Password'} />
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

export default Signin
