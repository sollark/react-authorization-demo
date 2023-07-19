import { USER_ROLE } from '@/models/Role'
import RootPage from '@/pages/RootPage'
import useAuthStore from '@/stores/authStore'
import { RootRoute, Route, lazy } from '@tanstack/router'
import Home from '../pages/HomePage'
import ProtectedRoute from './ProtectedRoute'

const AccountPage = lazy(() => import('../pages/AccountPage'))
const AccountEditPage = lazy(() => import('../pages/AccountEditPage'))
const SigninPage = lazy(() => import('../pages/SigninPage'))
const RegistrationPage = lazy(() => import('../pages/RegistrationPage'))
const RolePage = lazy(() => import('../pages/RolePage'))
const UnauthorizedPage = lazy(() => import('../pages/UnauthorizedPage'))
const MissingPage = lazy(() => import('../pages/MissingPage'))

export const rootRoute = new RootRoute({
  component: RootPage,
  async loader() {
    const getAccess = useAuthStore.getState().getAccess
    getAccess()
  },
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
  component: SigninPage,
})

export const registrationRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/registration',
  component: RegistrationPage,
})

export const unauthorizedRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/unauthorized',
  component: UnauthorizedPage,
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

export const accountEditRoute = new Route({
  getParentRoute: () => accountRoute,
  path: '/edit',
  component: () => (
    <ProtectedRoute
      allowed={[
        USER_ROLE.Employee,
        USER_ROLE.Manager,
        USER_ROLE.Supervisor,
        USER_ROLE.Admin,
      ]}>
      <AccountEditPage />
    </ProtectedRoute>
  ),
})

export const roleRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/role',
  component: RolePage,
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
  component: MissingPage,
})
