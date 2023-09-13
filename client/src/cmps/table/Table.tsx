import { Box } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import { FC, useMemo } from 'react'

type TableProps = {
  dataRows: any
  tableColumns: any
}

const Table: FC<TableProps> = (props: TableProps) => {
  const { dataRows, tableColumns } = props

  const data = useMemo(() => dataRows, [])
  const columns = useMemo(() => tableColumns, [])
  return (
    <Box>
      <DataGrid
        columns={columns}
        rows={data}
        getRowId={(row) => data.indexOf(row)}></DataGrid>
    </Box>
  )
}

export default Table
