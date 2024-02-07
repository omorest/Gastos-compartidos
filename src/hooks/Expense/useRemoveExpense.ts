import { useState } from 'react'
import { type GroupService } from '../../modules/Group/application/GroupService'
import { type Expense } from '../../modules/Expense/domain/Expense'

interface UseRemoveExpense {
  removeExpense: (expenseId: string) => void
  isLoading: boolean
}

export const useRemoveExpense = (groupService: GroupService, expenses: Expense[], updateExpenses: (expenses: Expense[]) => void): UseRemoveExpense => {
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const removeExpense = (expenseId: string): void => {
    setIsLoading(true)
    groupService.removeExpense(expenseId)
      .then(() => {
        updateExpenses(expenses.filter(expense => expense.id !== expenseId))
      })
      .catch((error) => {
        console.error(error)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  return { removeExpense, isLoading }
}
