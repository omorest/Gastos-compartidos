import './App.css'
import { Link, Route } from 'wouter'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from 'react-hot-toast'
import { ROUTES } from './routes'

const queryClient = new QueryClient()

function App () {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Link href='/'><h1>Gastos Compartidos</h1></Link>
        {
          ROUTES.map(({ path, component }) => (
            <Route key={path} path={path} component={component} />
          ))
        }
        <Toaster position='bottom-center' toastOptions={{ duration: 4000 }}></Toaster>
      </QueryClientProvider>
    </>
  )
}

export default App
