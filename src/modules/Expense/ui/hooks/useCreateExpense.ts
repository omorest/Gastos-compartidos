import { useState } from 'react'
import { type Expense } from '../../domain/Expense'
import { useGroupService } from '../../../../hooks/GroupServiceContext/useGroupService'

interface UseCreateExpense {
  isShowingFormToCreateExpense: boolean
  setIsShowingFormToCreateExpense: React.Dispatch<React.SetStateAction<boolean>>
  createNewExpense: (newExpense: Expense) => Promise<void>
}

export const useCreateExpense = (updateExpenses: (expenses: Expense[]) => void): UseCreateExpense => {
  const groupService = useGroupService()
  const [isShowingFormToCreateExpense, setIsShowingFormToCreateExpense] = useState<boolean>(false)
  const createNewExpense = async (newExpense: Expense): Promise<void> => {
    const expenses = await groupService.addExpense(newExpense)
    updateExpenses(expenses)
    setIsShowingFormToCreateExpense(false)
  }

  return { isShowingFormToCreateExpense, setIsShowingFormToCreateExpense, createNewExpense }
}
