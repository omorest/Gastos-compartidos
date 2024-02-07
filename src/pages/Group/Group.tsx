import { Link, useParams } from 'wouter'
import { createLocaStorageGroupRepository } from '../../modules/Group/infrastructure/LocalStorageGroupRepository'
import { GroupService } from '../../modules/Group/application/GroupService'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import './Group.css'
import Button from '../../components/atoms/Button/Button'
import { useState } from 'react'
import { ExpenseSection } from './components/ExpenseSection/ExpenseSection'
import { BalanceSection } from './components/BalanceSection/BalanceSection'
import { createLocaStorageExpenseRepository } from '../../modules/Expense/infrastructure/LocalStorageExpenseRepository'
import { EditIcon } from '../../components/icons/EditIcon'
import { FormEditGroup } from '../../components/forms/FormEditGroup/FormEditGroup'
import { type Group } from '../../modules/Group/domain/Group'
import { BackIcon } from '../../components/icons/backIcon'

const groupRepository = createLocaStorageGroupRepository()
const expenseRepository = createLocaStorageExpenseRepository()
const groupService = new GroupService(groupRepository, expenseRepository)

type SectionGroup = 'expenses' | 'balance'

const GroupPage = () => {
  const [sectionGroup, setSetsectionGroup] = useState<SectionGroup>('expenses')
  const [isShowingFormEditGroup, setIsShowingFormEditGroup] = useState<boolean>(false)
  const params = useParams()
  const queryClient = useQueryClient()
  const { data: group } = useQuery({ queryKey: ['group'], queryFn: async () => await groupService.get(params.id!) })

  const editGroupMutation = useMutation({
    mutationFn: async (group: Group) => { await groupService.edit(group) },
    onSuccess: async () => {
      setIsShowingFormEditGroup(false)
      await queryClient.invalidateQueries({ queryKey: ['group'] })
    }
  })

  const selectedSection = group && {
    expenses: <ExpenseSection group={group} groupService={groupService} />,
    balance: <BalanceSection group={group} groupService={groupService} />
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
            <BackIcon />
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
