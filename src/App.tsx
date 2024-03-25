import './App.css'
import { Link, Route } from 'wouter'
import Home from './pages/Home/Home'
import GroupPage from './pages/Group/Group'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from 'react-hot-toast'
import CreateGroup from './pages/CreateGroup/CreateGroup'
import EditGroup from './pages/EditGroup/EditGroup'
import Balance from './pages/Balance/Balance'

const queryClient = new QueryClient()

function App () {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Link href='/'><h1>Gastos Compartidos</h1></Link>
        <Route path='/' component={Home} />
        <Route path='/create-group' component={CreateGroup} />
        <Route path='/group/:id' component={GroupPage} />
        <Route path='/group/:id/edit' component={EditGroup} />
        <Route path='/group/:id/balance' component={Balance} />
        <Toaster position='bottom-center' toastOptions={{ duration: 4000 }}></Toaster>
      </QueryClientProvider>
    </>
  )
}

export default App
