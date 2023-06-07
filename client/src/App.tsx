import { Router, RouterProvider } from '@tanstack/router'
import React from 'react'
import { config } from './config/config'
import {
  accountRoute,
  adminRoute,
  authRoute,
  employeeRoute,
  guestRoute,
  homeRoute,
  managerRoute,
  missingRoute,
  registrationRoute,
  roleRoute,
  rootRoute,
  shiftRoute,
  signinRoute,
  superVisorRoute,
  unauthorizedRoute,
} from './routes/routes'

const routeTree = rootRoute.addChildren([
  homeRoute,
  authRoute.addChildren([signinRoute, registrationRoute, unauthorizedRoute]),
  accountRoute,
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
