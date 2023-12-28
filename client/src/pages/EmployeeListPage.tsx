import AdvancedEmployeeTable from '@/cmps/tables/employeeTable/AdvancedEmployeeTable'
import BasicEmployeeTable from '@/cmps/tables/employeeTable/BasicEmployeeTable'
import EditableEmployeeTable from '@/cmps/tables/employeeTable/EditableEmployeeTable'
import { Role } from '@/models/Account'
import { log } from '@/service/console.service'
import useAccountStore from '@/stores/accountStore'
import { Box } from '@mui/material'
import { FC } from 'react'

const TableViews = {
  guest: BasicEmployeeTable,
  user: BasicEmployeeTable,
  supervisor: AdvancedEmployeeTable,
  manager: EditableEmployeeTable,
  admin: EditableEmployeeTable,
}

const EmployeeListPage: FC = () => {
  log(' EmployeeList connected')

  const role: Role = useAccountStore((state) => state.role)
  const Table = TableViews[role]

  return (
    <Box
      sx={{
        p: 4,
      }}>
      <h1>Employee page</h1>
      <Table />
    </Box>
  )
}

export default EmployeeListPage
