import { Link, useParams } from 'wouter'
import './Group.css'
import { EditIcon } from '../../core/components/icons/EditIcon'
import { BackHomeIcon } from '../../core/components/icons/BackHomeIcon'
import { useGroup } from '../../modules/Group/ui/hooks'
import { UsersIcon } from '../../core/components/icons/UsersIcon'
import { navigate } from 'wouter/use-location'
import LinkButton from '../../core/components/LinkButton/LinkButton'
import { ExpenseSection } from './components/ExpenseSection/ExpenseSection'

const GroupPage = () => {
  const params = useParams()
  const { data: group } = useGroup(params.id)

  if (!group) {
    return null
  }

  return (
    <div className='group'>
      <div className='group-header'>
        <Link href='/'>
          <div className="group-header-back">
            <BackHomeIcon />
          </div>
        </Link>
        <div className='group-header-name'>
          <h2>{group?.name}</h2>
          <span onClick={() => { navigate(`/group/${group?.id}/edit`) }}><EditIcon /></span>
        </div>
        <div className='group-header-users'>
          <span><strong>{group?.participants.length}</strong> <UsersIcon /></span>
        </div>
      </div>
      <div className='group-titles-section'>
        <LinkButton href={`/group/${group?.id}/balance`}>Balance</LinkButton>
      </div>
      <div>
        <ExpenseSection group={group ?? {}} />
      </div>
    </div>
  )
}

export default GroupPage
