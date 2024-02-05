import { useState } from 'react'
import { GroupService } from '../../Group/application/GroupService'
import { type Group } from '../../Group/domain/Group'
import { createLocaStorageGroupRepository } from '../../Group/infrastructure/LocalStorageGroupRepository'
import Button from '../../components/atoms/Button/Button'
import CardGroup from '../../components/cards/CardGroup/CardGroup'
import { CardList } from '../../components/CardList/CardList'
import './Home.css'
import { FormNewGroup } from '../../components/forms/FormNewGroup/FormNewGroup'
import { generateID } from '../../utils/generateId'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

const repository = createLocaStorageGroupRepository()
const groupService = new GroupService(repository)

const Home = () => {
  const [isShowingCreateGroupForm, setIsShowingCreateGroupForm] = useState<boolean>(false)
  const queryClient = useQueryClient()

  // TODO: loadings and errors
  const { data: groups } = useQuery({
    queryKey: ['groups'],
    queryFn: async () => await groupService.getAll()
  })

  const createNewGroupMutation = useMutation({
    mutationFn: async (newGroup: Group) => await groupService.create({ ...newGroup, id: generateID() }),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['groups'] })
      setIsShowingCreateGroupForm(false)
    }
  })

  const removeGroupMutation = useMutation({
    mutationFn: async (group: Group) => { await groupService.remove(group.id) },
    onSuccess: async () => { await queryClient.invalidateQueries({ queryKey: ['groups'] }) }
  })

  if (isShowingCreateGroupForm) {
    return <FormNewGroup
      onSubmit={createNewGroupMutation.mutate}
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
          groups && groups.length > 0
            ? <CardList>
            {groups.map((group) => (
              <CardGroup group={group} onRemoveGroup={removeGroupMutation.mutate} key={group?.id}></CardGroup>
            ))}
          </CardList>
            : null
        }
    </main>
  )
}

export default Home
