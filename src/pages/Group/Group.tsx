import { Link, useParams } from 'wouter'
import './Group.css'
import Button from '../../core/components/Button/Button'
import { useState } from 'react'
import { ExpenseSection } from './components/ExpenseSection/ExpenseSection'
import { BalanceSection } from './components/BalanceSection/BalanceSection'
import { EditIcon } from '../../core/components/icons/EditIcon'
import { BackHomeIcon } from '../../core/components/icons/BackHomeIcon'
import { useGroup } from '../../modules/Group/ui/hooks'
import { UsersIcon } from '../../core/components/icons/UsersIcon'
import { navigate } from 'wouter/use-location'

type SectionGroup = 'expenses' | 'balance'

const GroupPage = () => {
  const params = useParams()
  const [sectionGroup, setSetsectionGroup] = useState<SectionGroup>('expenses')
  const { data: group } = useGroup(params.id)

  const selectedSection = group && {
    expenses: <ExpenseSection group={group} />,
    balance: <BalanceSection group={group} />
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
        <Button onClick={() => { setSetsectionGroup('expenses') }}>Gastos</Button>
        {/* <Button onClick={() => { setSetsectionGroup('balance') }}>Balance</Button> */}
        <Button onClick={() => { navigate(`/group/${group?.id}/balance`) }}>Balance</Button>
      </div>
      <div>
        {selectedSection?.[sectionGroup]}
      </div>

    </div>
  )
}

export default GroupPage
