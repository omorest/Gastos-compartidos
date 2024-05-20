import { useMemo, useState, type FC } from 'react'
import { CardList } from '../../../../core/components/CardList/CardList'
import Button from '../../../../core/components/Button/Button'
import { CardExpense } from '../../../../modules/Expense/ui/components/CardExpense/CardExpense'
import FormNewExpense from '../../../../modules/Expense/ui/components/FormNewExpense/FormNewExpense'
import { type Expense } from '../../../../modules/Expense/domain/Expense'
import { type Group } from '../../../../modules/Group/domain/Group'

import FormEditExpense from '../../../../modules/Expense/ui/components/FormEditExpense/FormEditExpense'
import { EditIcon } from '../../../../core/components/icons/EditIcon'
import { RemoveIcon } from '../../../../core/components/icons/Remove'
import { useCreateExpense, useEditExpense, useExpenses, useRemoveExpense } from '../../../../modules/Expense/ui/hooks'
import './ExpenseSection.css'
import { Currency } from '../../../../core/currency/Currency'
import toast from 'react-hot-toast'

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

  const handleRemoveExpense = (expense: Expense) => {
    removeExpense(expense.id)
      .catch(() => { toast.error('Error al eliminar el gasto') })
      .finally(() => { toast.success('Gasto eliminado correctamente') })
  }

  return (
    <section className='expense-section'>
      <div className='expense-section-header'>
        <strong>Total: {Currency.format(totalExpenseGroup)}</strong>
        <Button onClick={() => { setIsShowingFormToCreateExpense(true) }}>Nuevo Gasto</Button>
      </div>
      <CardList>
        {expenses.length === 0 && <strong>Añade tu primer gasto compartido con tus amigos</strong>}
        {
          expenses?.map((expense) =>
            <div key={expense.id} className='expense-section-list-row'>
              <CardExpense
                expense={expense}
              />
              <div className='expense-section-list-row-icons'>
                <span><EditIcon onClick={() => { setExpenseEdited(expense); setIsShowingFormToEditExpense(true) }} /></span>
                <span data-testid={`removeExpense-${expense.title}`}><RemoveIcon onClick={() => { handleRemoveExpense(expense) }} /></span>
              </div>
            </div>
          )
        }
      </CardList>
    </section>
  )
}
