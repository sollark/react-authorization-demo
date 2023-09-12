import { Box } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import { FC, useMemo } from 'react'
import employeeData from '../../assets/mock_data/employee.json'

type Employee = {
  firstName: string
  lastName: string
  company: string
  department: string
  position: string
  role: string
  status: string
}

const tableColumns = [
  { field: 'firstName', headerName: 'First name' },
  { field: 'lastName', headerName: 'Last name' },
  { field: 'company', headerName: 'Company' },
  { field: 'department', headerName: 'Department' },
  { field: 'position', headerName: 'Position' },
  { field: 'role', headerName: 'Role' },
  { field: 'status', headerName: 'Status' },
]

const Table: FC = () => {
  const data: Employee[] = useMemo(() => employeeData, [])
  const columns = useMemo(() => tableColumns, [])
  return (
    <Box>
      <DataGrid
        columns={tableColumns}
        rows={data}
        getRowId={(row) => data.indexOf(row)}></DataGrid>
    </Box>
  )
}

export default Table
