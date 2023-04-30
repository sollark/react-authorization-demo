import React from 'react'
import { config } from './config/config'
import { RootRoute, Route, Router, RouterProvider } from '@tanstack/router'
import Registration from './cmps/Registration'
import Signin from './cmps/SignIn'
import Auth from './pages/Auth'
import Home from './pages/Home'
import Role from './pages/Role'
import Shift from './pages/Shift'
import Unauthorized from './pages/Unauthorized'
import Missing from './pages/Missing'

// Routes, Home page
const homeRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/',
  component: Home,
})

// Routes, Auth page
const authRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/auth',
  component: Auth,
})
const signinRoute = new Route({
  getParentRoute: () => authRoute,
  path: '/signin',
  component: Signin,
})
const registrationRoute = new Route({
  getParentRoute: () => authRoute,
  path: '/registration',
  component: Registration,
})
const unauthorizedRoute = new Route({
  getParentRoute: () => authRoute,
  path: '/unauthorized',
  component: Unauthorized,
})

// Routes, Shift page
const shiftRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/shift',
  component: Shift,
})

// Routes, Role page
const roleRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/role',
  component: Role,
})
const guestRoute = new Route({
  getParentRoute: () => roleRoute,
  path: '/guest',
  component: () => <div>Guest</div>,
})
const employeeRoute = new Route({
  getParentRoute: () => roleRoute,
  path: '/employee',
  component: () => <div>Employee</div>,
})
const managerRoute = new Route({
  getParentRoute: () => roleRoute,
  path: '/manager',
  component: () => <div>Manager</div>,
})
const superVisorRoute = new Route({
  getParentRoute: () => roleRoute,
  path: '/supervisor',
  component: () => <div>Supervisor</div>,
})
const adminRoute = new Route({
  getParentRoute: () => roleRoute,
  path: '/admin',
  component: () => <div>Admin</div>,
})
const missingRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '*',
  component: Missing,
})

const rootRoute = new RootRoute()
// const rootRoute = new RootRoute({ component: Home })
const routeTree = rootRoute.addChildren([
  homeRoute,
  authRoute.addChildren([signinRoute, registrationRoute, unauthorizedRoute]),
  shiftRoute,
  roleRoute.addChildren([
    guestRoute,
    employeeRoute,
    managerRoute,
    superVisorRoute,
    adminRoute,
  ]),
  missingRoute,
])
const router = new Router({ routeTree })

// TanStack devtools
const TanStackRouterDevtools =
  config.env === 'production'
    ? () => null // Render nothing in production
    : React.lazy(() =>
        // Lazy load in development
        import('@tanstack/router-devtools').then((res) => ({
          default: res.TanStackRouterDevtools,
          // For Embedded Mode
          // default: res.TanStackRouterDevtoolsPanel
        }))
      )

declare module '@tanstack/router' {
  interface Register {
    router: typeof router
  }
}

function App() {
  return (
    <>
      <RouterProvider router={router} />
      <TanStackRouterDevtools router={router} />
    </>
  )
}

export default App
