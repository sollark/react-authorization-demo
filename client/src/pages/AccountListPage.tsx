import EditableAccountTable from '@/cmps/tables/accountTable/EditableAccountTable'
import { Box } from '@mui/material'
import { FC } from 'react'

const AccountListPage: FC = () => {
  console.log(' AccountList connected')

  const Table = EditableAccountTable

  return (
    <Box
      sx={{
        p: 4,
      }}>
      <h1>Account page</h1>
      <Table />
    </Box>
  )
}

export default AccountListPage
