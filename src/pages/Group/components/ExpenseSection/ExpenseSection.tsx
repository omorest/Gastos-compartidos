import { type FC, useState, useEffect } from 'react'
import { CardList } from '../../../../components/CardList/CardList'
import Button from '../../../../components/atoms/Button/Button'
import FormNewExpense from '../../../../components/forms/FormNewExpense/FormNewExpense'
import { type Group } from '../../../../modules/Group/domain/Group'
import { type GroupService } from '../../../../modules/Group/application/GroupService'
import { type Expense } from '../../../../modules/Expense/domain/Expense'
import { CardExpense } from '../../../../components/cards/CardExpense/CardExpense'

import './ExpenseSection.css'
import { formatNumberCurrency } from '../../../../utils/formatNumberCurrency'
import { VerticalDots } from '../../../../components/icons/VerticalDots'
import { RemoveIcon } from '../../../../components/icons/Remove'
import { EditIcon } from '../../../../components/icons/EditIcon'

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

  const handleRemoveExpense = (expenseId: string) => {
    groupService.removeExpense(expenseId)
      .then(() => {
        setExpenses(expenses.filter(expense => expense.id !== expenseId))
      })
      .catch((error) => {
        console.error(error)
      })
  }

  const totalExpenseGroup = expenses.reduce((acc, expense) => acc + expense.cost, 0)

  if (isShowingFormToCreateExpense) {
    return <FormNewExpense
      groupId={group.id}
      users={group.participants}
      onSaveExpense={createNewExpense}
      onCancel={() => { setIsShowingFormToCreateExpense(false) }}
    />
  }

  return (
    <section className='expense-section'>
      <div className='expense-section-header'>
        <strong>Total: {formatNumberCurrency(totalExpenseGroup)}</strong>
        <Button onClick={() => { setIsShowingFormToCreateExpense(true) }}>Nuevo Gasto</Button>
      </div>
      <CardList>
        {
          expenses?.map((expense) =>
          <div key={expense.id} className='expense-section-list-row'>
            <CardExpense
              expense={expense}
            />
            <div className='expense-section-list-row-icons'>
              <span><EditIcon /></span>
              <span><RemoveIcon onClick={() => { handleRemoveExpense(expense.id) }}/></span>
            </div>
          </div>
          )
        }
      </CardList>
    </section>
  )
}
