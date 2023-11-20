import AdvancedEmployeeTable from '@/cmps/tables/emloyeeTable/AdvancedEmployeeTable'
import BasicEmployeeTable from '@/cmps/tables/emloyeeTable/BasicEmployeeTable'
import EditableEmployeeTable from '@/cmps/tables/emloyeeTable/EditableEmployeeTable'
import { Department } from '@/models/Department'
import { Role } from '@/models/Role'
import { companyService } from '@/service/company.service'
import useRoleStore from '@/stores/roleStore'
import { Box } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import { FC } from 'react'

const TableViews = {
  Guest: BasicEmployeeTable,
  User: BasicEmployeeTable,
  Supervisor: AdvancedEmployeeTable,
  Manager: EditableEmployeeTable,
  Admin: EditableEmployeeTable,
}

const fetchFunctions = {
  Guest: async () => null,
  User: async () => await companyService.getBasicCompanyData(),
  Supervisor: async () => await companyService.getBasicCompanyData(),
  Manager: async () => await companyService.getBasicCompanyData(),
  Admin: async () => await companyService.getBasicCompanyData(),
}

const EmployeePage: FC = () => {
  console.log(' Employee connected')

  const role: Role = useRoleStore((state) => state.role)
  console.log('role', role)

  const Table = TableViews[role] || BasicEmployeeTable

  console.log(fetchFunctions['User'])

  const { isPending, isError, data, error } = useQuery({
    queryKey: ['company'],
    queryFn: fetchFunctions[role],
  })

  if (isPending) {
    return <span>Loading...</span>
  }

  if (isError) {
    return <span>Error: {error.message}</span>
  }

  if (!data) {
    return <span>Empty data</span>
  }

  return (
    <Box
      sx={{
        p: 4,
      }}>
      <h1>Employee page</h1>
      {/* {JSON.stringify(data)} */}
      {data.companyName}
      <Table
        employees={data.employees}
        departmentOptions={
          data.departments.map(
            (department: Department) => department.departmentName
          ) || []
        }
      />
    </Box>
  )
}

export default EmployeePage
