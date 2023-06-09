import { FC } from 'react'
import Input from './inputs/TextInput'

const UserDetailsFields: FC = () => {
  console.log('UserDetailsFields connected')

  return (
    <>
      <h2>User details</h2>
      <Input name='firstName' label='First name' type='text' />
      <Input name='lastName' label='Last name' type='text' />
      <Input name='email' label='Email' type='email' />
      <Input name='phone' label='Phone' type='text' />
    </>
  )
}

export default UserDetailsFields
