import { ACCOUNT_STATUS, Role, Status, USER_ROLE } from '@/models/Account'
import { employeeService } from '@/service/employee.service'
import { adaptTableRowToObject } from '@/service/utils.service'
import useEmployeeStore from '@/stores/employeeStore'
import {
  GridColDef,
  GridRowModel,
  GridValueOptionsParams,
} from '@mui/x-data-grid'
import { useQuery } from '@tanstack/react-query'
import { FC } from 'react'
import Table from '../Table'

type AccountTableColumns = {
  firstName: string
  lastName: string
  ID: string
  employeeNumber: string
  role: string
  status: string
}

let roles: (params: GridValueOptionsParams<any>) => string[]
let statuses: (params: GridValueOptionsParams<any>) => string[]

const accountColumns: GridColDef[] = [
  { field: 'firstName', headerName: 'First name', editable: false, flex: 1 },
  { field: 'lastName', headerName: 'Last name', editable: false, flex: 1 },
  { field: 'ID', headerName: 'ID', editable: false, flex: 1 },
  {
    field: 'employeeNumber',
    headerName: 'Employee number',
    editable: false,
    flex: 1,
  },
  {
    field: 'role',
    headerName: 'Role',
    editable: true,
    flex: 1,
    type: 'singleSelect',
    valueOptions: (params) => roles(params),
  },
  {
    field: 'status',
    headerName: 'Status',
    editable: true,
    flex: 1,
    type: 'singleSelect',
    valueOptions: (params) => statuses(params),
  },
]

function updateEmployeeAccount() {
  return async (row: GridRowModel): Promise<boolean> => {
    const rowData = adaptTableRowToObject<AccountTableColumns>(row)
    const { employeeNumber, role, status } = rowData

    const response = await employeeService.updateEmployeeAccount(
      employeeNumber,
      role as Role,
      status as Status
    )

    // TODO return false if error in response
    return true
  }
}

const EditableAccountTable: FC = () => {
  const company = useEmployeeStore((state) => state.employee?.company)
  if (!company) return <span>Error: Company is not found in the store</span>

  const { isPending, isError, data, error } = useQuery({
    queryKey: ['accounts'],
    queryFn: employeeService.getEmployeeAccountData,
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

  const accounts = data

  const roleOptions = Object.values(USER_ROLE)
  const statusOptions = Object.values(ACCOUNT_STATUS)
  roles = setOptions(roleOptions)
  statuses = setOptions(statusOptions)

  const accountData = accounts?.map((account) => {
    return {
      firstName: account.profile?.firstName,
      lastName: account.profile?.lastName,
      ID: account.profile?.ID,
      employeeNumber: account.employee?.employeeNumber,
      role: account.role,
      status: account.status,
    }
  })

  console.log('accountData from api', accountData)

  const updateAccount = updateEmployeeAccount()

  return (
    <div>
      <h2>Employee Table</h2>
      <Table
        basicProps={{ dataRows: accountData, tableColumns: accountColumns }}
        specialProps={{
          updateRow: updateAccount,
          config: { showAddButton: false, showDeleteButton: false },
        }}
        editable
      />
    </div>
  )
}

export default EditableAccountTable

function setOptions(types: string[]) {
  return function (params: GridValueOptionsParams<any>) {
    const options: string[] = []
    types?.map((type) => options.push(type))
    return options
  }
}
