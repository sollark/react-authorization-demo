import { config } from '@/config/config'
import { Router } from '@tanstack/router'
import React from 'react'
import {
  accountDetailsRoute,
  accountEditRoute,
  accountRoute,
  adminRoute,
  employeeRoute,
  homeRoute,
  managerRoute,
  missingRoute,
  registrationRoute,
  roleRoute,
  rootRoute,
  signinRoute,
  superVisorRoute,
  unauthorizedRoute,
} from './routes'

declare module '@tanstack/router' {
  interface Register {
    router: typeof router
  }
}

// TanStack devtools
export const TanStackRouterDevtools =
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

const routeTree = rootRoute.addChildren([
  homeRoute,
  signinRoute,
  registrationRoute,
  accountRoute.addChildren([accountDetailsRoute, accountEditRoute]),
  roleRoute.addChildren([
    employeeRoute,
    managerRoute,
    superVisorRoute,
    adminRoute,
  ]),
  unauthorizedRoute,
  missingRoute,
])

export const router = new Router({ routeTree })
