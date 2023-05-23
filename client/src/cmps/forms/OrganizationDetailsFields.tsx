import { FC } from 'react'
import Input from './inputs/TextInput'

const OrganizationDetailsFields: FC = () => {
  console.log('OrganizationDetailsFields connected')

  return (
    <>
      <h2>Organization Details</h2>
      <Input name='organization' label='Organization' type='text' />
    </>
  )
}

export default OrganizationDetailsFields
