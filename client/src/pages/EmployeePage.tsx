import AdvancedEmployeeTable from '@/cmps/tables/emloyeeTable/AdvancedEmployeeTable'
import BasicEmployeeTable from '@/cmps/tables/emloyeeTable/BasicEmployeeTable'
import EditableEmployeeTable from '@/cmps/tables/emloyeeTable/EditableEmployeeTable'
import { Role } from '@/models/Account'
import { Department } from '@/models/Department'
import { companyService } from '@/service/company.service'
import useRoleStore from '@/stores/roleStore'
import { Box } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import { FC } from 'react'

const TableViews = {
  guest: BasicEmployeeTable,
  user: BasicEmployeeTable,
  supervisor: AdvancedEmployeeTable,
  manager: EditableEmployeeTable,
  admin: EditableEmployeeTable,
}

const fetchFunctions = {
  guest: async () => null,
  user: async () => await companyService.getBasicCompanyData(),
  supervisor: async () => await companyService.getBasicCompanyData(),
  manager: async () => await companyService.getBasicCompanyData(),
  admin: async () => await companyService.getBasicCompanyData(),
}

const EmployeePage: FC = () => {
  console.log(' Employee connected')

  const role: Role = useRoleStore((state) => state.role)

  const Table = TableViews[role] || BasicEmployeeTable

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
