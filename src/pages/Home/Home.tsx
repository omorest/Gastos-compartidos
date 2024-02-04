import { useEffect, useState } from 'react'
import { GroupService } from '../../Group/application/GroupService'
import { type Group } from '../../Group/domain/Group'
import { createLocaStorageGroupRepository } from '../../Group/infrastructure/LocalStorageGroupRepository'
import Button from '../../components/Button/Button'
import CardGroup from '../../components/CardGroup/CardGroup'
import { CardList } from '../../components/CardList/CardList'
import './Home.css'
import { FormNewGroup } from '../../components/forms/FormNewGroup/FormNewGroup'
import { generateID } from '../../utils/generateId'

const repository = createLocaStorageGroupRepository()
const groupService = new GroupService(repository)

const Home = () => {
  const [groups, setGroups] = useState<Group[]>([])
  const [isShowingCreateGroupForm, setIsShowingCreateGroupForm] = useState<boolean>(false)

  useEffect(() => {
    groupService.getAll()
      .then((groups) => {
        setGroups(groups)
      })
      .catch((error) => {
        console.error(error)
      })
  }, [])

  const handleCreateNewGroup = async (newGroup: Group) => {
    console.log(newGroup)
    await groupService.create({ ...newGroup, id: generateID() })
    setGroups([newGroup, ...groups])
    setIsShowingCreateGroupForm(false)
  }

  const handleRemoveGroup = async (group: Group): Promise<void> => {
    const groupsWithoutSelected = await groupService.remove(group.id)
    setGroups(groupsWithoutSelected)
  }

  if (isShowingCreateGroupForm) {
    return <FormNewGroup
      onSubmit={handleCreateNewGroup}
      onCancel={() => { setIsShowingCreateGroupForm(false) }}
    />
  }

  return (
    <main className='home'>
      <div className='home-button-container'>
        <Button
          className='home-button-create-group'
          onClick={() => { setIsShowingCreateGroupForm(true) }}
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
