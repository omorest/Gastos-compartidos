import { useState } from 'react'
import { type Expense } from '../../domain/Expense'
import { useCasesExpenses } from './useCasesExpenses'

interface UseRemoveExpense {
  removeExpense: (expenseId: string) => void
  isLoading: boolean
}

export const useRemoveExpense = (expenses: Expense[], updateExpenses: (expenses: Expense[]) => void): UseRemoveExpense => {
  const { removeExpenseCommand } = useCasesExpenses()
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const removeExpense = (expenseId: string): void => {
    setIsLoading(true)
    removeExpenseCommand.execute(expenseId)
      .then(() => { updateExpenses(expenses.filter(expense => expense.id !== expenseId)) })
      .catch((error) => { console.error(error) })
      .finally(() => { setIsLoading(false) })
  }

  return { removeExpense, isLoading }
}
