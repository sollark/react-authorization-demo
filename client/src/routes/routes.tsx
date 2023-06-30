import { USER_ROLE } from '@/models/Role'
import AccountPage from '@/pages/AccountPage'
import RootPage from '@/pages/RootPage'
import { RootRoute, Route } from '@tanstack/router'
import Home from '../pages/HomePage'
import Missing from '../pages/MissingPage'
import Registration from '../pages/RegistrationPage'
import Role from '../pages/RolePage'
import Shift from '../pages/ShiftPage'
import Signin from '../pages/SigninPage'
import Unauthorized from '../pages/UnauthorizedPage'
import ProtectedRoute from './ProtectedRoute'

export const rootRoute = new RootRoute({
  component: RootPage,
})

export const homeRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/',
  component: () => (
    <ProtectedRoute
      allowed={[
        USER_ROLE.Employee,
        USER_ROLE.Manager,
        USER_ROLE.Supervisor,
        USER_ROLE.Admin,
      ]}>
      <Home />
    </ProtectedRoute>
  ),
})

export const signinRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/signin',
  component: Signin,
})
export const registrationRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/registration',
  component: Registration,
})
export const unauthorizedRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/unauthorized',
  component: Unauthorized,
})

export const accountRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/account',
  component: () => (
    <ProtectedRoute
      allowed={[
        USER_ROLE.Employee,
        USER_ROLE.Manager,
        USER_ROLE.Supervisor,
        USER_ROLE.Admin,
      ]}>
      <AccountPage />
    </ProtectedRoute>
  ),
})

export const shiftRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/shift',
  component: () => (
    <ProtectedRoute
      allowed={[
        USER_ROLE.Employee,
        USER_ROLE.Manager,
        USER_ROLE.Supervisor,
        USER_ROLE.Admin,
      ]}>
      <Shift />
    </ProtectedRoute>
  ),
})

export const roleRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/role',
  component: Role,
})
export const guestRoute = new Route({
  getParentRoute: () => roleRoute,
  path: '/guest',
  component: () => <div>Guest</div>,
})
export const employeeRoute = new Route({
  getParentRoute: () => roleRoute,
  path: '/employee',
  component: () => <div>Employee</div>,
})
export const managerRoute = new Route({
  getParentRoute: () => roleRoute,
  path: '/manager',
  component: () => <div>Manager</div>,
})
export const superVisorRoute = new Route({
  getParentRoute: () => roleRoute,
  path: '/supervisor',
  component: () => <div>Supervisor</div>,
})
export const adminRoute = new Route({
  getParentRoute: () => roleRoute,
  path: '/admin',
  component: () => <div>Admin</div>,
})
export const missingRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '*',
  component: Missing,
})
