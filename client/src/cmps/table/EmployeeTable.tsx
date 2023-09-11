import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'
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

const columnHelper = createColumnHelper<Employee>()
const tableColumns = [
  columnHelper.accessor('firstName', {
    header: () => 'First name',
    cell: (info) => info.renderValue(),
  }),
  columnHelper.accessor('lastName', {
    header: () => 'Last name',
    cell: (info) => info.renderValue(),
  }),
  columnHelper.accessor('company', {
    header: () => 'Company',
    cell: (info) => info.renderValue(),
  }),
  columnHelper.accessor('department', {
    header: () => 'Department',
    cell: (info) => info.renderValue(),
  }),
  columnHelper.accessor('position', {
    header: () => 'Position',
    cell: (info) => info.renderValue(),
  }),
  columnHelper.accessor('role', {
    header: () => 'Role',
    cell: (info) => info.renderValue(),
  }),
  columnHelper.accessor('status', {
    header: () => 'Status',
    cell: (info) => info.renderValue(),
  }),
]

/*
 {
    "firstName": "Jane",
    "lastName": "Smith",
    "company": "Acme Beverages",
    "department": "Marketing",
    "position": "Marketing Manager",
    "role": "User",
    "status": "active"
  },
*/
const EmployeeTable: FC = () => {
  const data: Employee[] = useMemo(() => employeeData, [])
  const columns = useMemo(() => tableColumns, [])

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <div>
      <h2>Employee Table</h2>
      <div className='p-2'>
        <table>
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
          <tfoot>
            {table.getFooterGroups().map((footerGroup) => (
              <tr key={footerGroup.id}>
                {footerGroup.headers.map((header) => (
                  <th key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.footer,
                          header.getContext()
                        )}
                  </th>
                ))}
              </tr>
            ))}
          </tfoot>
        </table>
        <div className='h-4' />
        {/* <button onClick={() => rerender()} className='border p-2'>
          Rerender
        </button> */}
      </div>
    </div>
  )
}

export default EmployeeTable
