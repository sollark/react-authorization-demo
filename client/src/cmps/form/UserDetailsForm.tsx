import { FC } from 'react'
import Input from './inputs/TextInput'

const UserDetailsForm: FC = () => {
  console.log('UserDetailsForm connected')

  return (
    <>
      <h2>UserDetails</h2>
      <Input name='firstName' label='First name' type='text' />
      <Input name='lastName' label='Last name' type='text' />
      <Input name='phone' label='Phone' type='text' />
    </>
  )
}

export default UserDetailsForm
