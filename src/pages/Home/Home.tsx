import Button from '../../components/Button/Button'
import './Home.css'

const Home = () => {
  const handleCreateNewGroup = () => {
    console.log('Create new group')
  }

  return (
    <div className='home'>
      <div className='home-button-container'>
        <Button
          className='home-button-create-group'
          onClick={handleCreateNewGroup}
        >
          Nuevo Grupo
        </Button>
      </div>
    </div>
  )
}

export default Home
