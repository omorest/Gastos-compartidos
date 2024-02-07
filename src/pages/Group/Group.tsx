import { Link, useParams } from 'wouter'
import './Group.css'
import Button from '../../components/atoms/Button/Button'
import { useState } from 'react'
import { ExpenseSection } from './components/ExpenseSection/ExpenseSection'
import { BalanceSection } from './components/BalanceSection/BalanceSection'
import { EditIcon } from '../../components/icons/EditIcon'
import { FormEditGroup } from '../../components/forms/FormEditGroup/FormEditGroup'
import { BackHomeIcon } from '../../components/icons/BackHomeIcon'
import { useGroup, useEditGroup } from '../../hooks/Group'

type SectionGroup = 'expenses' | 'balance'

const GroupPage = () => {
  const [sectionGroup, setSetsectionGroup] = useState<SectionGroup>('expenses')
  const params = useParams()
  const { data: group } = useGroup(params.id)
  const { editGroupMutation, isShowingFormEditGroup, setIsShowingFormEditGroup } = useEditGroup()

  const selectedSection = group && {
    expenses: <ExpenseSection group={group} />,
    balance: <BalanceSection group={group} />
  }

  if (group && isShowingFormEditGroup) {
    return <FormEditGroup
      group={group}
      onEditGroup={editGroupMutation.mutate}
      onCancel={() => { setIsShowingFormEditGroup(false) }}
    />
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
          <span onClick={() => { setIsShowingFormEditGroup(true) }}><EditIcon /></span>
        </div>
      </div>
      <div className='group-titles-section'>
        <Button onClick={() => { setSetsectionGroup('expenses') }}>Gastos</Button>
        <Button onClick={() => { setSetsectionGroup('balance') }}>Balance</Button>
      </div>
      <div>
        {selectedSection?.[sectionGroup]}
      </div>

    </div>
  )
}

export default GroupPage
