import { employeeService } from '@/service/employee.service'
import { GridColDef } from '@mui/x-data-grid'
import { useQuery } from '@tanstack/react-query'
import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import Table from '../Table'

/*
 * AdvancedEmployeeTable has full info about employees
 * AdvancedEmployeeTable is not editable
 */

const AdvancedEmployeeTable: FC = () => {
  const { t } = useTranslation()
  const employeeColumns: GridColDef[] = [
    {
      field: 'firstName',
      headerName: t('profile.first_name'),
      flex: 1,
    },
    {
      field: 'lastName',
      headerName: t('profile.last_name'),
      flex: 1,
    },
    {
      field: 'ID',
      headerName: t('profile.id'),
      flex: 1,
    },
    {
      field: 'departmentName',
      headerName: t('department.department'),
      flex: 1,
    },
    {
      field: 'employeeNumber',
      headerName: t('employee.employee_number'),
      flex: 1,
    },
    {
      field: 'position',
      headerName: t('employee.position'),
      flex: 1,
    },
  ]

  const { isPending, isError, data, error } = useQuery({
    queryKey: ['employees'],
    queryFn: employeeService.getCompanyEmployeeAdvancedData,
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

  const employees = data
  const employeeData = employees?.map((employee) => {
    return {
      firstName: employee.profile.firstName,
      lastName: employee.profile.lastName,
      ID: employee.profile.ID,
      departmentName: employee.department.departmentName,
      employeeNumber: employee.employeeNumber,
      position: employee.position,
    }
  })

  return (
    <div>
      <h2>{t('employees_page.employee_table')}</h2>
      <Table
        basicProps={{ dataRows: employeeData, tableColumns: employeeColumns }}
      />
    </div>
  )
}

export default AdvancedEmployeeTable
