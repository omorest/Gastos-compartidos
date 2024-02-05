import { useParams } from 'wouter'
import { createLocaStorageGroupRepository } from '../../Group/infrastructure/LocalStorageGroupRepository'
import { GroupService } from '../../Group/application/GroupService'
import { useQuery } from '@tanstack/react-query'
import './Group.css'
import Button from '../../components/atoms/Button/Button'
import { useState } from 'react'
import { ExpenseSection } from './components/ExpenseSection'
import { BalanceSection } from './components/BalanceSection'
import { createLocaStorageExpenseRepository } from '../../Expense/infrastructure/LocalStorageExpenseRepository'

const groupRepository = createLocaStorageGroupRepository()
const expenseRepository = createLocaStorageExpenseRepository()
const groupService = new GroupService(groupRepository, expenseRepository)

type SectionGroup = 'expenses' | 'balance'

const GroupPage = () => {
  const [sectionGroup, setSetsectionGroup] = useState<SectionGroup>('expenses')
  const params = useParams()
  const { data: group } = useQuery({ queryKey: ['group'], queryFn: async () => await groupService.get(params.id!) })

  return (
    <div className='group'>
      <h2>{group?.name}</h2>
      <div className='group-titles-section'>
        <Button onClick={() => { setSetsectionGroup('expenses') }}>Gastos</Button>
        <Button onClick={() => { setSetsectionGroup('balance') }}>Balance</Button>
      </div>
      <div>
        {sectionGroup === 'expenses' && group ? <ExpenseSection group={group} groupService={groupService} /> : <BalanceSection group={group} groupService={groupService} />}
      </div>

    </div>
  )
}

export default GroupPage
