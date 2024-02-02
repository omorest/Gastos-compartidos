import { useEffect, useState } from 'react'
import { GroupService } from '../../Group/application/GroupService'
import { type Group } from '../../Group/domain/Group'
import { createLocaStorageGroupRepository } from '../../Group/infrastructure/LocalStorageGroupRepository'
import Button from '../../components/Button/Button'
import './Home.css'
import { CardList } from '../../components/CardList/CardList'
import CardGroup from '../../components/CardGroup/CardGroup'
import { generateID } from '../../utils/generateId'

const exampleGroup: Group = {
  id: generateID(),
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
    const group = await groupService.create({ ...exampleGroup, id: generateID() })
    setGroups([group, ...groups])
  }

  const handleRemoveGroup = async (group: Group): Promise<void> => {
    const groupsWithoutSelected = await groupService.remove(group.id)
    setGroups(groupsWithoutSelected)
  }
  console.log(groups)
  return (
    <main className='home'>
      <div className='home-button-container'>
        <Button
          className='home-button-create-group'
          onClick={handleCreateNewGroup}
        >
          Nuevo Grupo
        </Button>
      </div>
        {
          groups.length > 0
            ? <CardList>
            {groups.map((group) => (
              <CardGroup group={group} onRemoveGroup={handleRemoveGroup} key={group?.id}></CardGroup>
            ))}
          </CardList>
            : null
        }
    </main>
  )
}

export default Home
