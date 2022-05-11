import React, { FC } from 'react'
import Router from './router'
import ErrorBoundary from '../components/hocs/error-boundary'
import { MediaStateProvider, NavStateProvider } from '@reapit/elements'
import '@reapit/elements/dist/index.css'

import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'

const newQueryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnMount: process.env.NODE_ENV === 'production',
      refetchOnWindowFocus: process.env.NODE_ENV === 'production',
      retry: process.env.NODE_ENV === 'production',
    },
  },
})

const App: FC = () => (
  <ErrorBoundary>
    <QueryClientProvider client={newQueryClient}>
      <NavStateProvider>
        <MediaStateProvider>
          <Router />
        </MediaStateProvider>
      </NavStateProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </ErrorBoundary>
)

export default App
