import { Link } from '@tanstack/react-router'

export const pages = [
  { key: 'Home', link: <Link to='/'>Home</Link> },
  { key: 'Company', link: <Link to='/company'>Company</Link> },
  { key: 'Employees', link: <Link to='/employeeList'>Employees</Link> },
  { key: 'Accounts', link: <Link to='/accountList'>Accounts</Link> },
]
