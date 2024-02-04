import { useParams } from 'wouter'
import { createLocaStorageGroupRepository } from '../../Group/infrastructure/LocalStorageGroupRepository'
import { GroupService } from '../../Group/application/GroupService'
import { useQuery } from '@tanstack/react-query'
import './Group.css'
import Button from '../../components/atoms/Button/Button'
import { useState } from 'react'
import { ExpenseSection } from './components/ExpenseSection'
import { BalanceSection } from './components/BalanceSection'

const repository = createLocaStorageGroupRepository()
const groupService = new GroupService(repository)

type SectionGroup = 'expenses' | 'balance'

const GroupPage = () => {
  const [sectionGroup, setSetsectionGroup] = useState<SectionGroup>('expenses')
  const params = useParams()
  const { data: group, isLoading, error } = useQuery({ queryKey: ['group'], queryFn: async () => await groupService.get(params.id!) })

  return (
    <div className='group'>
      <h2>{group?.name}</h2>
      <div className='group-titles-section'>
        <Button onClick={() => { setSetsectionGroup('expenses') }}>Gastos</Button>
        <Button onClick={() => { setSetsectionGroup('balance') }}>Balance</Button>
      </div>
      <div>
        {sectionGroup === 'expenses' ? <ExpenseSection /> : <BalanceSection />}
      </div>

    </div>
  )
}

export default GroupPage
