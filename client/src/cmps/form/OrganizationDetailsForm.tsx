import { FC } from 'react'
import Input from './TextInput'

const OrganizationDetails: FC = () => {
  console.log('OrganizationDetails connected')

  return (
    <>
      <h2>OrganizationDetails</h2>
      <Input name='organization' label='Organization' type='text' />
    </>
  )
}

export default OrganizationDetails
