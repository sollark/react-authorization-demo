import { GridColDef, GridRowId, GridRowModel } from '@mui/x-data-grid'
import { FC } from 'react'
import employeeData from '../../assets/mock_data/employee.json'
import Table from './Table'

export type Person = {
  firstName: string
  lastName: string
  category: string
  status: string
}

const peopleDefaultValues: Person = {
  firstName: 'dd',
  lastName: 'dd',
  category: 'dd',
  status: 'dd',
}

function updatePerson(row: GridRowModel) {
  console.log('updatePerson', row)
}

function deletePerson(id: GridRowId) {
  console.log('deletePerson', id)
}

const peopleColumns: GridColDef[] = [
  { field: 'firstName', headerName: 'First name', width: 180, editable: true },
  { field: 'lastName', headerName: 'Last name', width: 180, editable: true },
  { field: 'status', headerName: 'Status', width: 180, editable: true },
  // {
  //   field: 'age',
  //   headerName: 'Age',
  //   type: 'number',
  //   width: 80,
  //   align: 'left',
  //   headerAlign: 'left',
  //   editable: true,
  // },
  // {
  //   field: 'joinDate',
  //   headerName: 'Join date',
  //   type: 'date',
  //   width: 180,
  //   editable: true,
  // },
  // {
  //   field: 'role',
  //   headerName: 'Department',
  //   width: 220,
  //   editable: true,
  //   type: 'singleSelect',
  //   valueOptions: ['Market', 'Finance', 'Development'],
  // },
]

const PeopleTable: FC = () => {
  return (
    <div>
      <h2>People Table</h2>
      <Table
        dataRows={employeeData}
        defaultValues={peopleDefaultValues}
        tableColumns={peopleColumns}
        updateRow={updatePerson}
        deleteRow={deletePerson}
      />
    </div>
  )
}

export default PeopleTable
