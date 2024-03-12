import { useMemo, useState, type FC } from 'react'
import { CardList } from '../../../../components/CardList/CardList'
import Button from '../../../../components/atoms/Button/Button'
import { CardExpense } from '../../../../components/cards/CardExpense/CardExpense'
import FormNewExpense from '../../../../modules/Expense/ui/FormNewExpense/FormNewExpense'
import { type Expense } from '../../../../modules/Expense/domain/Expense'
import { type Group } from '../../../../modules/Group/domain/Group'

import FormEditExpense from '../../../../components/forms/FormEditExpense/FormEditExpense'
import { EditIcon } from '../../../../components/icons/EditIcon'
import { RemoveIcon } from '../../../../components/icons/Remove'
import { useCreateExpense, useEditExpense, useExpenses, useRemoveExpense } from '../../../../hooks/Expense'
import { formatNumberCurrency } from '../../../../utils/formatNumberCurrency'
import './ExpenseSection.css'

interface ExpenseSectionProps {
  group: Group
}

export const ExpenseSection: FC<ExpenseSectionProps> = ({ group }) => {
  const { expenses, setExpenses } = useExpenses(group.id)
  const [expenseEdited, setExpenseEdited] = useState<Expense>()
  const { createNewExpense, isShowingFormToCreateExpense, setIsShowingFormToCreateExpense } = useCreateExpense(setExpenses)
  const { removeExpense } = useRemoveExpense(expenses, setExpenses)
  const { editExpense, isShowingFormToEditExpense, setIsShowingFormToEditExpense } = useEditExpense(expenses, setExpenses)

  const totalExpenseGroup = useMemo(() => expenses.reduce((acc, expense) => acc + expense.cost, 0), [expenses])

  if (isShowingFormToCreateExpense) {
    return <FormNewExpense
      groupId={group.id}
      users={group.participants}
      onSaveExpense={createNewExpense}
      onCancel={() => { setIsShowingFormToCreateExpense(false) }}
    />
  }

  if (isShowingFormToEditExpense && expenseEdited) {
    return <FormEditExpense
      expense={expenseEdited}
      users={group.participants}
      onEditExpense={editExpense}
      onCancel={() => { setIsShowingFormToEditExpense(false) }}
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
              <span><EditIcon onClick={() => { setExpenseEdited(expense); setIsShowingFormToEditExpense(true) }}/></span>
              <span data-testid={`removeExpense-${expense.title}`}><RemoveIcon onClick={() => { removeExpense(expense.id) }}/></span>
            </div>
          </div>
          )
        }
      </CardList>
    </section>
  )
}
