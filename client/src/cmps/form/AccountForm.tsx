import { FC } from 'react'
import Input from './TextInput'

const AccountForm: FC = () => {
  console.log('AccountForm connected')

  return (
    <>
      <h2>AccountForm</h2>
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

export default AccountForm
