import { Box } from '@mui/material'
import { Link } from '@tanstack/router'
import { FC } from 'react'
import Form from './form/Form'
import Input from './form/TextInput'

const Signin: FC = () => {
  console.log('Signin connected')

  function submit(form: Object) {
    console.log('Signin form submitted: ', form)
  }

  return (
    <Box component='article' sx={{ maxWidth: '25rem', mx: 'auto', p: '1rem' }}>
      <h1>Sign in</h1>
      <Form submit={submit}>
        <Input name={'email'} label={'Email'} />
        <Input name={'password'} label={'Password'} />
      </Form>
      <p>
        Don't have an account? <Link to='/auth/registration'>Registration</Link>
      </p>
    </Box>
  )
}

export default Signin
