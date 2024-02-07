import Button from '../../components/atoms/Button/Button'
import CardGroup from '../../components/cards/CardGroup/CardGroup'
import { CardList } from '../../components/CardList/CardList'
import './Home.css'
import { FormNewGroup } from '../../components/forms/FormNewGroup/FormNewGroup'
import { useGroups, useRemoveGroup, useCreateGroup } from '../../hooks/Group'

const Home = () => {
  const { data: groups } = useGroups()
  const { removeGroupMutation } = useRemoveGroup()
  const { isShowingCreateGroupForm, setIsShowingCreateGroupForm, createNewGroupMutation } = useCreateGroup()

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
