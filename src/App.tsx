import './App.css'
import { Route } from 'wouter'
import Home from './pages/Home/Home'
import GroupPage from './pages/Group/Group'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

function App () {
  return (
    <>
    <QueryClientProvider client={queryClient}>
      <h1>Gastos Compartidos</h1>
      <Route path='/' component={Home} />
      <Route path='/group/:id' component={GroupPage} />
    </QueryClientProvider>
    </>
  )
}

export default App
