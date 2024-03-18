import type React from 'react'
import { useState } from 'react'
import { type Expense } from '../../domain/Expense'
import { useCasesExpenses } from './useCasesExpenses'

interface UseEditExpense {
  isShowingFormToEditExpense: boolean
  setIsShowingFormToEditExpense: React.Dispatch<React.SetStateAction<boolean>>
  editExpense: (expense: Expense) => Promise<void>
}

export const useEditExpense = (expenses: Expense[], updateExpenses: (expenses: Expense[]) => void): UseEditExpense => {
  const { editExpenseCommand } = useCasesExpenses()
  const [isShowingFormToEditExpense, setIsShowingFormToEditExpense] = useState<boolean>(false)

  const editExpense = async (expense: Expense): Promise<void> => {
    await editExpenseCommand.execute(expense)
    updateExpenses([expense, ...expenses.filter(exp => exp.id !== expense.id)])
    setIsShowingFormToEditExpense(false)
  }

  return { isShowingFormToEditExpense, setIsShowingFormToEditExpense, editExpense }
}
