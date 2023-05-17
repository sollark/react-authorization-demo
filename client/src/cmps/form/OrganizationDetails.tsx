import { FC } from 'react'

interface OrganizationDetailsForm {
  organizationName: string
}

const defaultValues = {
  organizationName: '',
}

const OrganizationDetails: FC = () => {
  console.log('OrganizationDetails connected')

  return <div>OrganizationDetails</div>
}
