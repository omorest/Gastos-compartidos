import { type FC, useState, useEffect } from 'react'
import { CardList } from '../../../components/CardList/CardList'
import Button from '../../../components/atoms/Button/Button'
import FormNewExpense from '../../../components/forms/FormNewExpense/FormNewExpense'
import { type Group } from '../../../Group/domain/Group'
import { type GroupService } from '../../../Group/application/GroupService'
import { type Expense } from '../../../Expense/domain/Expense'
import { CardExpense } from '../../../components/cards/CardExpense/CardExpense'

interface ExpenseSectionProps {
  group: Group
  groupService: GroupService
}

export const ExpenseSection: FC<ExpenseSectionProps> = ({ group, groupService }) => {
  const [expenses, setExpenses] = useState<Expense[]>([])
  const [isShowingFormToCreateExpense, setIsShowingFormToCreateExpense] = useState<boolean>(false)

  useEffect(() => {
    groupService.getExpensesFromGroup(group.id)
      .then((expenses) => {
        setExpenses(expenses)
      })
      .catch((error) => {
        console.error(error)
      })
  }, [group.id])

  const createNewExpense = async (newExpense: Expense) => {
    await groupService.addExpense(newExpense)
    setExpenses([newExpense, ...expenses])
    setIsShowingFormToCreateExpense(false)
  }

  // const removeExpenseMutation = useMutation({
  //   mutationFn: async (expenseId: string) => { await groupService.removeExpense(expenseId) },
  //   onSuccess: async () => { await queryClient.invalidateQueries({ queryKey: ['expenses'] }) }
  // })

  if (isShowingFormToCreateExpense) {
    return <FormNewExpense
      groupId={group.id}
      users={group.participants}
      onSaveExpense={createNewExpense}
    />
  }

  return (
    <section>
      <Button onClick={() => { setIsShowingFormToCreateExpense(true) }}>Nuevo Gasto</Button>
      <CardList>
        {
          expenses?.map((expense) => <CardExpense
            expense={expense}
            key={expense.id}
            onRemoveExpense={() => { console.log('remove expense') } }
          />)
        }
      </CardList>
    </section>
  )
}
