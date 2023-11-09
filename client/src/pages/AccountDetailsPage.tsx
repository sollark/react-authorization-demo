import useEmployeeStore from '@/stores/employeeStore'
import useProfileStore from '@/stores/userStore'
import { useNavigate } from '@tanstack/react-router'

import { FC } from 'react'
const AccountDetailsPage: FC = () => {
  console.log('AccountDetailsPage connected')

  const navigate = useNavigate({ from: '/account/edit' })
  const profile = useProfileStore((state) => state.profile)
  const employee = useEmployeeStore((state) => state.employee)

  return (
    <div>
      <h2>Profile</h2>
      First Name: {profile?.firstName}
      <br />
      Last Name: {profile?.lastName}
      <br />
      ID: {profile?.ID}
      <br />
      <h2>Work details</h2>
      {employee && `Company: ${employee.company.companyName}`}
      <br />
      {employee && `Department: ${employee.department.departmentName}`}
      <br />
      {employee && `Position: ${employee.position}`}
      <br />
      {employee && `Employee number: ${employee.employeeNumber}`}
      <br />
      {/* using href forces a page reload */}
      {/* <SecondaryButton onClick={() => navigate({ to: '/account/edit' })}>
        Edit
      </SecondaryButton> */}
    </div>
  )
}

export default AccountDetailsPage
