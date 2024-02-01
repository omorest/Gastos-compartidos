import './App.css'
import Button from './components/Button/Button'
import CardGroup from './components/CardGroup/CardGroup'
import { CardList } from './components/CardList/CardList'

function App () {
  return (
    <>
      <h1>Gastos Compartidos</h1>
      <Button>Nuevo grupo</Button>
      <CardList>
        <CardGroup></CardGroup>
        <CardGroup></CardGroup>
        <CardGroup></CardGroup>
        <CardGroup></CardGroup>
        <CardGroup></CardGroup>
        <CardGroup></CardGroup>
        <CardGroup></CardGroup>
        <CardGroup></CardGroup>
        <CardGroup></CardGroup>
        <CardGroup></CardGroup>
      </CardList>
    </>
  )
}

export default App
