import { Role } from '@/models/Account'
import useRoleStore from '@/stores/roleStore'
import { Box } from '@mui/material'
import { FC } from 'react'

// const TableViews = {
//   guest: BasicEmployeeTable,
//   user: BasicEmployeeTable,
//   supervisor: AdvancedEmployeeTable,
//   manager: EditableEmployeeTable,
//   admin: EditableEmployeeTable,
// }

const AccountListPage: FC = () => {
  console.log(' AccountList connected')

  const role: Role = useRoleStore((state) => state.role)
  //   const Table = TableViews[role]

  return (
    <Box
      sx={{
        p: 4,
      }}>
      <h1>Account page</h1>
      {/* <Table /> */}
    </Box>
  )
}

export default AccountListPage
