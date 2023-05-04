import { Box, Button } from '@mui/material'
import { Link } from '@tanstack/router'
import { FC } from 'react'
import Input from './form/Input'

const Registration: FC = () => {
  console.log('Registration connected')
  return (
    <Box component='article' sx={{ maxWidth: '25rem', mx: 'auto', p: '1rem' }}>
      <h1>Registration</h1>
      <form>
        <Input fullWidth margin='normal' name={'email'} label={'Email'} />
        <Input fullWidth margin='normal' name={'password'} label={'Password'} />
        <Input
          fullWidth
          margin='normal'
          name={'password'}
          label={'Confirm password'}
        />
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
