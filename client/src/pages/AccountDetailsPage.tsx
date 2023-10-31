import SecondaryButton from '@/cmps/button/SecondaryButton'
import useProfileStore from '@/stores/userStore'
import { useNavigate } from '@tanstack/react-router'

import useEmployeeStore from '@/stores/employeeStore'
import { FC } from 'react'
const AccountDetailsPage: FC = () => {
  console.log('AccountDetailsPage connected')

  const navigate = useNavigate({ from: '/account/edit' })

  const profile = useProfileStore((state) => state.profile)
  const employee = useEmployeeStore((state) => state.employee)

  return (
    <>
      <div>
        <h2>Profile</h2>
        First Name: {profile?.firstName}
        <br />
        Last Name: {profile?.lastName}
        <br />
        ID: {profile?.ID}
        <br />
        <h2>Workplace</h2>
        {employee && `Company: ${employee.company.companyName}`}
        <br />
        {employee && `Company code: ${employee.company.companyId}`}
        <br />
        {employee && `Employee number: ${employee.employeeId}`}
        <br />
      </div>
      {/* using href forces a page reload */}
      <SecondaryButton onClick={() => navigate({ to: '/account/edit' })}>
        Edit
      </SecondaryButton>
    </>
  )
}

export default AccountDetailsPage
