import { useState } from 'react'
import { type Expense } from '../../domain/Expense'
import { useCasesExpenses } from './useCasesExpenses'

interface UseCreateExpense {
  isShowingFormToCreateExpense: boolean
  setIsShowingFormToCreateExpense: React.Dispatch<React.SetStateAction<boolean>>
  createNewExpense: (newExpense: Expense) => Promise<void>
}

export const useCreateExpense = (updateExpenses: (expenses: Expense[]) => void): UseCreateExpense => {
  const { createExpenseCommand } = useCasesExpenses()
  const [isShowingFormToCreateExpense, setIsShowingFormToCreateExpense] = useState<boolean>(false)
  const createNewExpense = async (newExpense: Expense): Promise<void> => {
    const expenses = await createExpenseCommand.execute(newExpense)
    updateExpenses(expenses)
    setIsShowingFormToCreateExpense(false)
  }

  return { isShowingFormToCreateExpense, setIsShowingFormToCreateExpense, createNewExpense }
}
