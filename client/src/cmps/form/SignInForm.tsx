import { FC } from 'react'
import Input from './inputs/TextInput'

const SignInForm: FC = () => {
  console.log('SignInForm connected')

  return (
    <>
      <h2>Sign In</h2>
      <Input name='email' label='Email' type='email' />
      <Input name='password' label='Password' type='password' />
    </>
  )
}

export default SignInForm
