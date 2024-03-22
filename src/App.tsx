import './App.css'
import { Link, Route } from 'wouter'
import Home from './pages/Home/Home'
import GroupPage from './pages/Group/Group'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from 'react-hot-toast'
import CreateGroup from './pages/CreateGroup/CreateGroup'

const queryClient = new QueryClient()

function App () {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Link href='/'><h1>Gastos Compartidos</h1></Link>
        <Route path='/' component={Home} />
        <Route path='/group/:id' component={GroupPage} />
        <Route path='/create-group' component={CreateGroup} />
        <Toaster position='bottom-center' toastOptions={{ duration: 4000 }}></Toaster>
      </QueryClientProvider>
    </>
  )
}

export default App
