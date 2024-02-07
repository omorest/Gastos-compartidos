import { useState } from 'react'
import { type Expense } from '../../modules/Expense/domain/Expense'
import { type GroupService } from '../../modules/Group/application/GroupService'

interface UseCreateExpense {
  isShowingFormToCreateExpense: boolean
  setIsShowingFormToCreateExpense: React.Dispatch<React.SetStateAction<boolean>>
  createNewExpense: (newExpense: Expense) => Promise<void>
}

export const useCreateExpense = (groupService: GroupService, updateExpenses: (expenses: Expense[]) => void): UseCreateExpense => {
  const [isShowingFormToCreateExpense, setIsShowingFormToCreateExpense] = useState<boolean>(false)
  const createNewExpense = async (newExpense: Expense): Promise<void> => {
    const expenses = await groupService.addExpense(newExpense)
    updateExpenses(expenses)
    setIsShowingFormToCreateExpense(false)
  }

  return { isShowingFormToCreateExpense, setIsShowingFormToCreateExpense, createNewExpense }
}
