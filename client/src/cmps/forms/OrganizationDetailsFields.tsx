import { FC } from 'react'
import Input from './inputs/TextInput/TextInput'

const OrganizationDetailsFields: FC = () => {
  console.log('OrganizationDetailsFields connected')

  return (
    <>
      <h2>Organization details</h2>
      <Input name='organization' label='Organization' type='text' />
    </>
  )
}

export default OrganizationDetailsFields
