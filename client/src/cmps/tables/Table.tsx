import { Box } from '@mui/material'
import {
  DataGrid,
  GridColDef,
  GridRowModel,
  GridRowsProp,
  GridValidRowModel,
} from '@mui/x-data-grid'
import { nanoid } from 'nanoid'
import { FC, useState } from 'react'
import EditableTable from './EditableTable'

type BasicTableProps = {
  dataRows: readonly GridValidRowModel[]
  tableColumns: GridColDef[]
}

type EditableTableProps = {
  getDefaultValues?: () => GridRowModel
  updateRow?: (row: GridRowModel) => Promise<boolean>
  deleteRow?: (row: GridRowModel) => Promise<boolean>
  config?: TableConfig
}

type TableConfig = {
  showAddButton?: boolean
  showDeleteButton?: boolean
}

const NotEditableTable = (props: BasicTableProps) => {
  const { dataRows, tableColumns } = props
  const data = generateKeys(dataRows)
  const columns = tableColumns
  const [rows, setRows] = useState(data)

  return <DataGrid columns={columns} rows={rows}></DataGrid>
}

type TableProps = {
  editable?: boolean
  basicProps: BasicTableProps
  specialProps?: EditableTableProps
}

const Table: FC<TableProps> = ({
  editable,
  basicProps,
  specialProps,
}: TableProps) => {
  console.log('Table connected')

  const TableComponent = editable ? EditableTable : NotEditableTable

  return (
    <Box>
      <TableComponent {...basicProps} {...(editable ? specialProps : {})} />
    </Box>
  )
}

export default Table

function generateKeys(rows: GridRowsProp): GridRowsProp {
  return rows.map((row) => ({ ...row, id: nanoid() }))
}
