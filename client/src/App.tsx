import { RouterProvider } from '@tanstack/router'
import { TanStackRouterDevtools, router } from './routes/router'

function App() {
  return (
    <>
      <RouterProvider router={router} />
      <TanStackRouterDevtools router={router} />
    </>
  )
}

export default App
