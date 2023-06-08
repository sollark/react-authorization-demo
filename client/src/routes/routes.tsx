import { USER_ROLE } from '@/models/Role'
import AccountPage from '@/pages/AccountPage'
import { RootRoute, Route } from '@tanstack/router'
import Registration from '../cmps/Registration'
import Signin from '../cmps/SignIn'
import Auth from '../pages/Auth'
import Home from '../pages/Home'
import Missing from '../pages/Missing'
import Role from '../pages/Role'
import Shift from '../pages/Shift'
import Unauthorized from '../pages/Unauthorized'
import ProtectedRoute from './ProtectedRoute'

export const rootRoute = new RootRoute()

// Routes, Home page
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

// Routes, Auth page
export const authRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/auth',
  component: Auth,
})
export const signinRoute = new Route({
  getParentRoute: () => authRoute,
  path: '/signin',
  component: Signin,
})
export const registrationRoute = new Route({
  getParentRoute: () => authRoute,
  path: '/registration',
  component: Registration,
})
export const unauthorizedRoute = new Route({
  getParentRoute: () => authRoute,
  path: '/unauthorized',
  component: Unauthorized,
})

// Routes, Account page
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

// Routes, Shift page
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

// Routes, Role page
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
