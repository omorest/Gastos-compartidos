import Button from '../../core/components/Button/Button'
import CardGroup from '../../modules/Group/ui/components/CardGroup/CardGroup'
import { CardList } from '../../core/components/CardList/CardList'
import './Home.css'
import { useGroups, useRemoveGroup } from '../../modules/Group/ui/hooks'
import { navigate } from 'wouter/use-location'

const Home = () => {
  const { data: groups } = useGroups()
  const { removeGroupMutation } = useRemoveGroup()

  return (
    <main className='home'>
      <div className='home-button-container'>
        <Button
          className='home-button-create-group'
          onClick={() => { navigate('/create-group') }}
        >
          Nuevo Grupo
        </Button>
      </div>
        {
          groups && groups.length > 0
            ? <CardList>
                {groups.map((group) => (
                  <CardGroup group={group} onRemoveGroup={removeGroupMutation.mutate} key={group?.id}></CardGroup>
                ))}
              </CardList>
            : <strong>Crea ya tu grupo con tus amigos para compartir gastos</strong>
        }
    </main>
  )
}

export default Home
