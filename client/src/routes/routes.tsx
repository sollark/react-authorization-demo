import AccountDetailsPage from '@/pages/AccountDetailsPage'
import RootPage from '@/pages/RootPage'
import useAuthStore from '@/stores/authStore'
import { RootRoute, Route, lazy, redirect } from '@tanstack/router'
import Home from '../pages/HomePage'
import AuthProtectedRoute from './AuthProtectedRoute'
import RoleProtectedRoute from './RoleProtectedRoute'
import useAccountStore from '@/stores/accountStore'

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
    <RoleProtectedRoute allowed={['Employee']}>
      <div>Employee page</div>
    </RoleProtectedRoute>
  ),
})

export const managerRoute = new Route({
  getParentRoute: () => roleRoute,
  path: '/manager',
  component: () => (
    <RoleProtectedRoute allowed={['Manager']}>
      <div>Manager page</div>
    </RoleProtectedRoute>
  ),
})

export const superVisorRoute = new Route({
  getParentRoute: () => roleRoute,
  path: '/supervisor',
  component: () => (
    <RoleProtectedRoute allowed={['Supervisor']}>
      <div>Supervisor page</div>
    </RoleProtectedRoute>
  ),
})

export const adminRoute = new Route({
  getParentRoute: () => roleRoute,
  path: '/admin',
  component: () => (
    <RoleProtectedRoute allowed={['Admin']}>
      <div>Admin page</div>
    </RoleProtectedRoute>
  ),
})

export const missingRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '*',
  component: MissingPage,
})
