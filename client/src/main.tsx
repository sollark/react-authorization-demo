import { SnackbarProvider } from 'notistack'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import App from './App'

// All application has access to the same query client to share data
const queryClient = new QueryClient({
  defaultOptions: {
    // All queries will be refetched every 5 minutes
    //queries: { staleTime: 1000 * 60 * 5 },
  },
})

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <SnackbarProvider autoHideDuration={5000}>
        <App />
      </SnackbarProvider>
    </QueryClientProvider>
  </React.StrictMode>
)
