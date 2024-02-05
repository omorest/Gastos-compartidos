import { type FC, useState } from 'react'
import { CardList } from '../../../components/CardList/CardList'
import Button from '../../../components/atoms/Button/Button'
import FormNewExpense from '../../../components/forms/FormNewExpense'
import { type Group } from '../../../Group/domain/Group'
import { type GroupService } from '../../../Group/application/GroupService'
import { type Expense } from '../../../Expense/domain/Expense'
import { useQuery } from '@tanstack/react-query'
import { CardExpense } from '../../../components/cards/CardExpense/CardExpense'

interface ExpenseSectionProps {
  group: Group
  groupService: GroupService
}

export const ExpenseSection: FC<ExpenseSectionProps> = ({ group, groupService }) => {
  const [isShowingFormToCreateExpense, setIsShowingFormToCreateExpense] = useState<boolean>(false)
  const { data: expenses } = useQuery({ queryKey: ['expenses'], queryFn: async () => await groupService.getExpensesFromGroup(group.id) })

  const handleSaveExpense = async (newExpense: Expense) => {
    await groupService.addExpense(newExpense)
    setIsShowingFormToCreateExpense(false)
  }

  if (isShowingFormToCreateExpense) {
    return <FormNewExpense
      groupId={group.id}
      users={group.participants}
      onSaveExpense={handleSaveExpense}/>
  }

  return (
    <div>
      <Button onClick={() => { setIsShowingFormToCreateExpense(true) }}>Nuevo Gasto</Button>
      <CardList>
        {
          expenses?.map((expense) => <CardExpense expense={expense} key={expense.id} onRemoveExpense={async () => { console.log('remove') }}/>)
        }
      </CardList>
    </div>
  )
}
