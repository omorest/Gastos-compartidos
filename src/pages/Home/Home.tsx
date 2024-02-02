import { useEffect, useState } from 'react'
import { GroupService } from '../../Group/application/GroupService'
import { type Group } from '../../Group/domain/Group'
import { createLocaStorageGroupRepository } from '../../Group/infrastructure/LocalStorageGroupRepository'
import Button from '../../components/Button/Button'
import './Home.css'
import { CardList } from '../../components/CardList/CardList'
import CardGroup from '../../components/CardGroup/CardGroup'

const exampleGroup: Group = {
  id: '1',
  name: 'Grupo de Ejemplo',
  participants: [
    { id: 'u1', name: 'Usuario1' },
    { id: 'u2', name: 'Usuario2' }
  ],
  totalExpenses: 1000,
  creationDate: new Date()
}

const repository = createLocaStorageGroupRepository()
const groupService = new GroupService(repository)

const Home = () => {
  const [groups, setGroups] = useState<Group[]>([])

  useEffect(() => {
    groupService.getAll().then((groups) => {
      setGroups(groups)
      console.log(groups)
    }).catch((error) => {
      console.error(error)
    })
  }, [])

  const handleCreateNewGroup = async () => {
    const group = await groupService.create(exampleGroup)
    setGroups([group, ...groups])
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
      <div>
        {
          groups
            ? <CardList>
              {groups.map((group) => (
                <CardGroup group={group} key={group?.id}></CardGroup>
              ))}
            </CardList>
            : null
          }
        </div>
    </div>
  )
}

export default Home
