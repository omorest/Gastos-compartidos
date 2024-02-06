import { useParams } from 'wouter'
import { createLocaStorageGroupRepository } from '../../modules/Group/infrastructure/LocalStorageGroupRepository'
import { GroupService } from '../../modules/Group/application/GroupService'
import { useQuery } from '@tanstack/react-query'
import './Group.css'
import Button from '../../components/atoms/Button/Button'
import { useState } from 'react'
import { ExpenseSection } from './components/ExpenseSection/ExpenseSection'
import { BalanceSection } from './components/BalanceSection/BalanceSection'
import { createLocaStorageExpenseRepository } from '../../modules/Expense/infrastructure/LocalStorageExpenseRepository'

const groupRepository = createLocaStorageGroupRepository()
const expenseRepository = createLocaStorageExpenseRepository()
const groupService = new GroupService(groupRepository, expenseRepository)

type SectionGroup = 'expenses' | 'balance'

const GroupPage = () => {
  const [sectionGroup, setSetsectionGroup] = useState<SectionGroup>('expenses')
  const params = useParams()
  const { data: group } = useQuery({ queryKey: ['group'], queryFn: async () => await groupService.get(params.id!) })

  const selectedSection = group && {
    expenses: <ExpenseSection group={group} groupService={groupService} />,
    balance: <BalanceSection group={group} groupService={groupService} />
  }

  return (
    <div className='group'>
      <h2>{group?.name}</h2>
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
