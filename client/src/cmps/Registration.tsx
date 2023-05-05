import { Box } from '@mui/material'
import { Link } from '@tanstack/router'
import { FC } from 'react'
import Form from './form/Form'
import Input from './form/Input'

const Registration: FC = () => {
  console.log('Registration connected')

  function submit(form: Object) {
    console.log('Registration form submitted: ', form)
  }
  return (
    <Box component='article' sx={{ maxWidth: '25rem', mx: 'auto', p: '1rem' }}>
      <h1>Registration</h1>
      <Form submit={submit}>
        <Input name={'email'} label={'Email'} type='text' initialValue='' />
        <Input name={'password'} label={'Password'} initialValue='' />
        <Input
          name={'confirmedPassword'}
          label={'Confirm password'}
          initialValue=''
        />
      </Form>
      <p>
        Already have an account? <Link to='/auth/signin'>Sign in</Link>
      </p>
    </Box>
  )
}

export default Registration
