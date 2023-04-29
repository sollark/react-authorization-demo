import { RootRoute, Route, Router, RouterProvider } from '@tanstack/router'
import React from 'react'
import { config } from './config/config.js'
import Home from './pages/Home'
import Shift from './pages/Shift'

// Routes
let rootRoute = new RootRoute()
const homeRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/',
  component: Home,
})
const shiftRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/shift',
  component: Shift,
})

const routeTree = rootRoute.addChildren([homeRoute, shiftRoute])
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
