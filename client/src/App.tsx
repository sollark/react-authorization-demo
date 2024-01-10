import { RouterProvider } from '@tanstack/react-router'
import { router } from './routes/router'
import { log } from './service/console.service'

function App() {
  log('App connected')

  return (
    <>
      <RouterProvider router={router} />
      {/* <TanStackRouterDevtools router={router} /> */}
    </>
  )
}

export default App
