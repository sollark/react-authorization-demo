import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined'
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined'
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined'
import { Box } from '@mui/material'
import {
  DataGrid,
  GridActionsCellItem,
  GridColDef,
  GridEventListener,
  GridRowEditStopReasons,
  GridRowId,
  GridRowModel,
  GridRowModes,
  GridRowModesModel,
  GridRowsProp,
  GridToolbarContainer,
  GridValidRowModel,
} from '@mui/x-data-grid'
import { nanoid } from 'nanoid'
import { FC, useState } from 'react'
import SecondaryButton from '../button/SecondaryButton'

type BasicTableProps = {
  dataRows: readonly GridValidRowModel[]
  tableColumns: GridColDef[]
}

type EditableTableProps = {
  defaultValues?: GridRowModel
  updateRow?: (row: GridRowModel) => Promise<boolean>
  deleteRow?: (row: GridRowModel) => Promise<boolean>
}

const EditableTable = (props: BasicTableProps & EditableTableProps) => {
  const { dataRows, defaultValues, tableColumns, updateRow, deleteRow } = props

  const actionColumn: GridColDef[] = [
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 100,
      cellClassName: 'actions',
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<SaveOutlinedIcon />}
              label='Save'
              sx={{
                color: 'primary.main',
              }}
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              icon={<CancelOutlinedIcon />}
              label='Cancel'
              className='textPrimary'
              onClick={handleCancelClick(id)}
              color='inherit'
            />,
          ]
        }

        return [
          <GridActionsCellItem
            icon={<EditOutlinedIcon />}
            label='Edit'
            className='textPrimary'
            onClick={handleEditClick(id)}
            color='inherit'
          />,
          <GridActionsCellItem
            icon={<DeleteOutlinedIcon />}
            label='Delete'
            onClick={handleDeleteClick(id)}
            color='inherit'
          />,
        ]
      },
    },
  ]

  const data = generateKeys(dataRows)
  const columns = [...tableColumns, ...actionColumn]

  const [rows, setRows] = useState(data)
  const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({})
  const [rowsPendingUpdates, setRowsPendingUpdates] = useState<GridRowModel[]>(
    []
  )

  const handleRowEditStop: GridEventListener<'rowEditStop'> = (
    params,
    event
  ) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true
    }
  }

  const handleEditClick = (id: GridRowId) => () => {
    setRowsPendingUpdates((prev) => [
      ...prev,
      rows.filter((row) => row.id === id),
    ])
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } })
  }

  const handleSaveClick = (id: GridRowId) => async () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } })
  }

  const handleDeleteClick = (id: GridRowId) => async () => {
    // return if deleteRow is not defined ( table is not editable)
    if (!deleteRow) return

    setRows(rows.filter((row) => row.id !== id))

    await deleteRow(rows.find((row) => row.id === id)!)
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

  const processRowUpdate = async (
    newRow: GridRowModel,
    oldRow: GridRowModel
  ) => {
    // return if updateRow is not defined ( table is not editable)
    if (!updateRow) return

    const updatedRow = { ...newRow, isNew: false }
    setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)))

    const isSuccess = await updateRow(newRow)

    if (!isSuccess && oldRow.isNew) {
      setRows(rows.filter((row) => row.id !== oldRow.id))
      return
    }

    if (!isSuccess && !oldRow.isNew) {
      setRows(rows.map((row) => (row.id === oldRow.id ? oldRow : row)))
      return oldRow
    }

    return updatedRow
  }

  const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
    setRowModesModel(newRowModesModel)
  }

  return (
    <DataGrid
      columns={columns}
      rows={rows}
      editMode='row'
      rowModesModel={rowModesModel}
      onRowModesModelChange={handleRowModesModelChange}
      onRowEditStop={handleRowEditStop}
      processRowUpdate={processRowUpdate}
      slots={{
        toolbar: EditToolbar,
      }}
      slotProps={{
        toolbar: { setRows, setRowModesModel, defaultValues },
      }}></DataGrid>
  )
}

const NotEditableTable = (props: BasicTableProps) => {
  const { dataRows, tableColumns } = props
  const data = generateKeys(dataRows)
  const columns = tableColumns
  const [rows, setRows] = useState(data)

  return <DataGrid columns={columns} rows={rows}></DataGrid>
}

// tool bar props(add record button)
type EditToolbarProps = {
  setRows: (newRows: (oldRows: GridRowsProp) => GridRowsProp) => void
  setRowModesModel: (
    newModel: (oldModel: GridRowModesModel) => GridRowModesModel
  ) => void
  defaultValues: GridRowModel
}
// tool bar (add record button)
function EditToolbar(props: EditToolbarProps) {
  const { setRows, setRowModesModel, defaultValues } = props

  const handleClick = () => {
    const id = nanoid()

    setRows((oldRows) => [{ id, ...defaultValues, isNew: true }, ...oldRows])
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [id]: { mode: GridRowModes.Edit },
    }))
  }

  return (
    <GridToolbarContainer>
      <SecondaryButton
        color='primary'
        startIcon={<AddCircleOutlineOutlinedIcon />}
        onClick={handleClick}>
        Add record
      </SecondaryButton>
    </GridToolbarContainer>
  )
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
