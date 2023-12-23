import RootPage from '@/pages/RootPage'
import { RootRoute, Route, lazyRouteComponent } from '@tanstack/react-router'
import Home from '../pages/HomePage'
import AuthProtectedRoute from './AuthProtectedRoute'
import VerifiedAccountProtectedRoute from './VerifiedAccountProtectedRoute'
const AccountDetailsPage = lazyRouteComponent(
  () => import('@/pages/AccountDetailsPage')
)
const AccountListPage = lazyRouteComponent(
  () => import('@/pages/AccountListPage')
)
const EmployeeListPage = lazyRouteComponent(
  () => import('@/pages/EmployeeListPage')
)
const CompanyPage = lazyRouteComponent(() => import('@/pages/CompanyPage'))
const AccountPage = lazyRouteComponent(() => import('@/pages/AccountPage'))
const AccountEditPage = lazyRouteComponent(
  () => import('@/pages/AccountEditPage')
)
const JoinCompanyPage = lazyRouteComponent(
  () => import('@/pages/JoinCompanyPage')
)
const SigninPage = lazyRouteComponent(() => import('@/pages/SigninPage'))
const RegistrationPage = lazyRouteComponent(
  () => import('@/pages/RegistrationPage')
)
const UnauthorizedPage = lazyRouteComponent(
  () => import('@/pages/UnauthorizedPage')
)
const MissingPage = lazyRouteComponent(() => import('@/pages/MissingPage'))

export const rootRoute = new RootRoute({
  component: RootPage,
  beforeLoad: () => {
    // useAuthStore.getState().getAccess()
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
  component: () => <AccountDetailsPage />,
})

export const accountEditRoute = new Route({
  getParentRoute: () => accountRoute,
  path: '/edit',
  component: () => <AccountEditPage />,
})

export const joinCompanyRoute = new Route({
  getParentRoute: () => accountRoute,
  path: '/join',
  component: () => <JoinCompanyPage />,
})

export const companyRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/company',
  component: () => (
    <AuthProtectedRoute>
      <VerifiedAccountProtectedRoute>
        <CompanyPage />
      </VerifiedAccountProtectedRoute>
    </AuthProtectedRoute>
  ),
})

export const employeeListRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/employeeList',
  component: () => (
    <AuthProtectedRoute>
      <VerifiedAccountProtectedRoute>
        <EmployeeListPage />
      </VerifiedAccountProtectedRoute>
    </AuthProtectedRoute>
  ),
})

export const accountListRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/accountList',
  component: () => (
    <AuthProtectedRoute>
      <VerifiedAccountProtectedRoute>
        <AccountListPage />
      </VerifiedAccountProtectedRoute>
    </AuthProtectedRoute>
  ),
})

export const missingRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '*',
  component: MissingPage,
})
