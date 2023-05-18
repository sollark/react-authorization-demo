import { FC } from 'react'
import Input from './inputs/TextInput'

const OrganizationDetailsForm: FC = () => {
  console.log('OrganizationDetails connected')

  return (
    <>
      <h2>OrganizationDetails</h2>
      <Input name='organization' label='Organization' type='text' />
    </>
  )
}

export default OrganizationDetailsForm
