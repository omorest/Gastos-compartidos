import Button from '../../core/components/Button/Button'
import CardGroup from '../../modules/Group/ui/components/CardGroup/CardGroup'
import { CardList } from '../../core/components/CardList/CardList'
import './Home.css'
import { FormNewGroup } from '../../modules/Group/ui/components/FormNewGroup/FormNewGroup'
import { useGroups, useRemoveGroup, useCreateGroup } from '../../modules/Group/ui/hooks'

const Home = () => {
  const { data: groups } = useGroups()
  const { removeGroupMutation } = useRemoveGroup()
  const { isShowingCreateGroupForm, setIsShowingCreateGroupForm, createNewGroupMutation } = useCreateGroup()

  if (isShowingCreateGroupForm) {
    return <FormNewGroup
      onSave={createNewGroupMutation.mutate}
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
