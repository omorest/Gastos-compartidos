import './App.css'
import { Route } from 'wouter'
import Home from './pages/Home/Home'

function App () {
  return (
    <>
      <h1>Gastos Compartidos</h1>
      <Route path='/' component={Home} />
    </>
  )
}

export default App
