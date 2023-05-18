import { FC } from 'react'
import Input from './inputs/TextInput'

const RegistrationForm: FC = () => {
  console.log('AccountForm connected')

  return (
    <>
      <h2>Registration</h2>
      <Input name='email' label='Email' type='email' />
      <Input name='password' label='Password' type='password' />
      <Input
        name={'confirmedPassword'}
        label={'Confirm password'}
        type='password'
      />
    </>
  )
}

export default RegistrationForm
