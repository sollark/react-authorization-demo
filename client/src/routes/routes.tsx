import AccountDetailsPage from '@/pages/AccountDetailsPage'
import JoinCompanyPage from '@/pages/JoinCompanyPage'
import PeoplePage from '@/pages/PeoplePage'
import RootPage from '@/pages/RootPage'
import useAuthStore from '@/stores/authStore'
import { Box } from '@mui/material'
import { RootRoute, Route, lazyRouteComponent } from '@tanstack/react-router'
import CreateCompanyPage from '../pages/CreateCompanyPage'
import Home from '../pages/HomePage'
import AuthProtectedRoute from './AuthProtectedRoute'
import RoleProtectedRoute from './RoleProtectedRoute'
const CompanyPage = lazyRouteComponent(() => import('../pages/CompanyPage'))
const AccountPage = lazyRouteComponent(() => import('../pages/AccountPage'))
const AccountEditPage = lazyRouteComponent(
  () => import('../pages/AccountEditPage')
)
const CompanyAccessPage = lazyRouteComponent(
  () => import('../pages/CompanyAccessPage')
)
const SigninPage = lazyRouteComponent(() => import('../pages/SigninPage'))
const RegistrationPage = lazyRouteComponent(
  () => import('../pages/RegistrationPage')
)
const RolePage = lazyRouteComponent(() => import('../pages/RolePage'))
const UnauthorizedPage = lazyRouteComponent(
  () => import('../pages/UnauthorizedPage')
)
const MissingPage = lazyRouteComponent(() => import('../pages/MissingPage'))

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

export const joinCompanyRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/joinCompany',
  component: () => (
    <AuthProtectedRoute>
      <JoinCompanyPage />
    </AuthProtectedRoute>
  ),
})

export const createCompanyRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/createCompany',
  component: () => (
    <AuthProtectedRoute>
      <CreateCompanyPage />
    </AuthProtectedRoute>
  ),
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

export const companyAccessRoute = new Route({
  getParentRoute: () => accountRoute,
  path: '/join',
  component: () => (
    <AuthProtectedRoute>
      <CompanyAccessPage />
    </AuthProtectedRoute>
  ),
})

export const companyRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/company',
  component: () => (
    <AuthProtectedRoute>
      <CompanyPage />
    </AuthProtectedRoute>
  ),
})

export const peopleRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/people',
  component: () => (
    <AuthProtectedRoute>
      <PeoplePage />
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
    <RoleProtectedRoute allowed={['User', 'Manager', 'Supervisor', 'Admin']}>
      <Box
        sx={{
          m: 'auto',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          maxHeight: '100vh',
          maxWidth: ['100%', '100%', '100%', '75%', '75%'],
          backgroundColor: 'primary.light',
        }}>
        <h1>Employee page</h1>
      </Box>
    </RoleProtectedRoute>
  ),
})

export const managerRoute = new Route({
  getParentRoute: () => roleRoute,
  path: '/manager',
  component: () => (
    <RoleProtectedRoute allowed={['Manager', 'Supervisor', 'Admin']}>
      <Box
        sx={{
          m: 'auto',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          maxHeight: '100vh',
          maxWidth: ['100%', '100%', '100%', '75%', '75%'],
          backgroundColor: 'primary.light',
        }}>
        <h1>Manager page</h1>
      </Box>
    </RoleProtectedRoute>
  ),
})

export const supervisorRouter = new Route({
  getParentRoute: () => roleRoute,
  path: '/supervisor',
  component: () => (
    <RoleProtectedRoute allowed={['Supervisor', 'Admin']}>
      <Box
        sx={{
          m: 'auto',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          maxHeight: '100vh',
          maxWidth: ['100%', '100%', '100%', '75%', '75%'],
          backgroundColor: 'primary.light',
        }}>
        <h1>Supervisor page</h1>
      </Box>
    </RoleProtectedRoute>
  ),
})

export const adminRoute = new Route({
  getParentRoute: () => roleRoute,
  path: '/admin',
  component: () => (
    <RoleProtectedRoute allowed={['Admin']}>
      <Box
        sx={{
          m: 'auto',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          maxHeight: '100vh',
          maxWidth: ['100%', '100%', '100%', '75%', '75%'],
          backgroundColor: 'primary.light',
        }}>
        <h1>Admin page</h1>
      </Box>
    </RoleProtectedRoute>
  ),
})

export const missingRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '*',
  component: MissingPage,
})
