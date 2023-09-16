import { config } from '@/config/config'
import { Router } from '@tanstack/router'
import React from 'react'
import {
  accountDetailsRoute,
  accountEditRoute,
  accountRoute,
  adminRoute,
  companyAccessRoute,
  companyRoute,
  employeeRoute,
  homeRoute,
  managerRoute,
  missingRoute,
  peopleRoute,
  registrationRoute,
  roleRoute,
  rootRoute,
  signinRoute,
  supervisorRouter,
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
  accountRoute.addChildren([
    accountDetailsRoute,
    accountEditRoute,
    companyAccessRoute,
  ]),
  companyRoute,
  peopleRoute,
  roleRoute.addChildren([
    employeeRoute,
    managerRoute,
    supervisorRouter,
    adminRoute,
  ]),
  unauthorizedRoute,
  missingRoute,
])

export const router = new Router({ routeTree })
