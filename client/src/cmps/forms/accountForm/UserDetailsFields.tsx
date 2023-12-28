import { log } from '@/service/console.service'
import { FC } from 'react'
import Input from '../inputs/TextInput/TextInput'

const UserDetailsFields: FC = () => {
  log('UserDetailsFields connected')

  return (
    <>
      <h2>Profile</h2>
      <Input name='firstName' label='First name' type='text' />
      <Input name='lastName' label='Last name' type='text' />
      <Input name='ID' label='ID' type='text' />
      {/* <Input name='email' label='Email' type='email' /> */}
      {/* <Input name='phone' label='Phone' type='text' /> */}
    </>
  )
}

export default UserDetailsFields
