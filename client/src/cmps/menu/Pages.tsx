import { Link } from '@tanstack/react-router'

export const userPages = [
  { key: 'Home', link: <Link to='/'>Home</Link> },
  { key: 'Company', link: <Link to='/company'>Company</Link> },
  { key: 'Employees', link: <Link to='/employeeList'>Employees</Link> },
]

export const adminPages = [
  { key: 'Home', link: <Link to='/'>Home</Link> },
  { key: 'Company', link: <Link to='/company'>Company</Link> },
  { key: 'Employees', link: <Link to='/employeeList'>Employees</Link> },
  { key: 'Accounts', link: <Link to='/accountList'>Accounts</Link> },
]
