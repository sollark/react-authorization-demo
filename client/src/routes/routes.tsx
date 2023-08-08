import AccountDetailsPage from '@/pages/AccountDetailsPage'
import RootPage from '@/pages/RootPage'
import useAuthStore from '@/stores/authStore'
import { RootRoute, Route, lazy } from '@tanstack/router'
import Home from '../pages/HomePage'
import AuthProtectedRoute from './AuthProtectedRoute'
import RoleProtectedRoute from './RoleProtectedRoute'

const AccountPage = lazy(() => import('../pages/AccountPage'))
const AccountEditPage = lazy(() => import('../pages/AccountEditPage'))
const SigninPage = lazy(() => import('../pages/SigninPage'))
const RegistrationPage = lazy(() => import('../pages/RegistrationPage'))
const RolePage = lazy(() => import('../pages/RolePage'))
const UnauthorizedPage = lazy(() => import('../pages/UnauthorizedPage'))
const MissingPage = lazy(() => import('../pages/MissingPage'))

export const rootRoute = new RootRoute({
  component: RootPage,
  beforeLoad: async () => {
    await useAuthStore.getState().getAccess()
  },
})

export const homeRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/',

  component: () => (
    <AuthProtectedRoute>
      <Home />
    </AuthProtectedRoute>
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
    <AuthProtectedRoute>
      <AccountPage />
    </AuthProtectedRoute>
  ),
})

export const accountDetailsRoute = new Route({
  getParentRoute: () => accountRoute,
  path: '/details',
  component: () => (
    <AuthProtectedRoute>
      <AccountDetailsPage />
    </AuthProtectedRoute>
  ),
})

export const accountEditRoute = new Route({
  getParentRoute: () => accountRoute,
  path: '/edit',
  component: () => (
    <AuthProtectedRoute>
      <AccountEditPage />
    </AuthProtectedRoute>
  ),
})

export const roleRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/role',
  component: () => (
    <AuthProtectedRoute>
      <RolePage />
    </AuthProtectedRoute>
  ),
})

export const employeeRoute = new Route({
  getParentRoute: () => roleRoute,
  path: '/employee',
  component: () => (
    <RoleProtectedRoute
      allowed={['Employee', 'Manager', 'Supervisor', 'Admin']}>
      <div>
        <h1>Employee page</h1>
      </div>
    </RoleProtectedRoute>
  ),
})

export const managerRoute = new Route({
  getParentRoute: () => roleRoute,
  path: '/manager',
  component: () => (
    <RoleProtectedRoute allowed={['Manager', 'Supervisor', 'Admin']}>
      <div>
        <h1>Manager page</h1>
      </div>
    </RoleProtectedRoute>
  ),
})

export const superVisorRoute = new Route({
  getParentRoute: () => roleRoute,
  path: '/supervisor',
  component: () => (
    <RoleProtectedRoute allowed={['Supervisor', 'Admin']}>
      <div>
        <h1>Supervisor page</h1>
      </div>
    </RoleProtectedRoute>
  ),
})

export const adminRoute = new Route({
  getParentRoute: () => roleRoute,
  path: '/admin',
  component: () => (
    <RoleProtectedRoute allowed={['Admin']}>
      <div>
        <h1>Admin page</h1>
      </div>
    </RoleProtectedRoute>
  ),
})

export const missingRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '*',
  component: MissingPage,
})
