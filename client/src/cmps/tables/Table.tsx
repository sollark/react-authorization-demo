import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined'
import { Box, Button } from '@mui/material'
import {
  DataGrid,
  GridEventListener,
  GridRowEditStopReasons,
  GridRowId,
  GridRowModel,
  GridRowModes,
  GridRowModesModel,
  GridRowsProp,
  GridToolbarContainer,
} from '@mui/x-data-grid'
import { nanoid } from 'nanoid'
import { FC, useMemo, useState } from 'react'
import SecondaryButton from '../button/SecondaryButton'

type TableProps = {
  dataRows: GridRowsProp
  tableColumns: any
}

// tool bar
type EditToolbarProps = {
  setRows: (newRows: (oldRows: GridRowsProp) => GridRowsProp) => void
  setRowModesModel: (
    newModel: (oldModel: GridRowModesModel) => GridRowModesModel
  ) => void
}

function EditToolbar(props: EditToolbarProps) {
  const { setRows, setRowModesModel } = props

  const handleClick = () => {
    const id = nanoid()
    setRows((oldRows) => [...oldRows, { id, name: '', age: '', isNew: true }])
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [id]: { mode: GridRowModes.Edit, fieldToFocus: 'name' },
    }))
  }

  return (
    <GridToolbarContainer>
      <Button
        color='primary'
        startIcon={<AddCircleOutlineOutlinedIcon />}
        onClick={handleClick}>
        Add record
      </Button>
      <SecondaryButton
        color='primary'
        startIcon={<AddCircleOutlineOutlinedIcon />}
        onClick={handleClick}>
        Add record
      </SecondaryButton>
    </GridToolbarContainer>
  )
}

const Table: FC<TableProps> = (props: TableProps) => {
  const { dataRows, tableColumns } = props

  const data = useMemo(() => generateKeys(dataRows), [])
  const columns = useMemo(() => tableColumns, [])

  const [rows, setRows] = useState(data)
  const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({})

  const handleRowEditStop: GridEventListener<'rowEditStop'> = (
    params,
    event
  ) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true
    }
  }

  const handleEditClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } })
  }

  const handleSaveClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } })
  }

  const handleDeleteClick = (id: GridRowId) => () => {
    setRows(rows.filter((row) => row.id !== id))
  }

  const handleCancelClick = (id: GridRowId) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    })

    const editedRow = rows.find((row) => row.id === id)
    if (editedRow!.isNew) {
      setRows(rows.filter((row) => row.id !== id))
    }
  }

  const processRowUpdate = (newRow: GridRowModel) => {
    const updatedRow = { ...newRow, isNew: false }
    setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)))
    return updatedRow
  }

  const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
    setRowModesModel(newRowModesModel)
  }
  return (
    <Box>
      <DataGrid
        columns={columns}
        rows={data}
        editMode='row'
        getRowId={(row) => data.indexOf(row)}
        slots={{
          toolbar: EditToolbar,
        }}
        slotProps={{
          toolbar: { setRows, setRowModesModel },
        }}></DataGrid>
    </Box>
  )
}

export default Table

function generateKeys(rows: GridRowsProp): GridRowsProp {
  return rows.map((row) => ({ ...row, id: nanoid() }))
}
