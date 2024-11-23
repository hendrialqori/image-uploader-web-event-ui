import { StrictMode, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { Toaster } from 'sonner'
import AppRoute from './routes/app-route'
import * as Lazy from "#/components/ui/lazy"
import './index.css'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1
    }
  }
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Suspense fallback={<Lazy.Suspense />}>
      <QueryClientProvider client={queryClient}>
        <AppRoute />
        <Toaster richColors className="font-lilita-one" />
        <ReactQueryDevtools initialIsOpen={false} buttonPosition="bottom-right" />
      </QueryClientProvider>
    </Suspense>
  </StrictMode>,
)
