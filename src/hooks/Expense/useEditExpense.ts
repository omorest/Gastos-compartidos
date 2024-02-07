import type React from 'react'
import { useState } from 'react'
import { type Expense } from '../../modules/Expense/domain/Expense'
import { useGroupService } from '../GroupServiceContext/useGroupService'

interface UseEditExpense {
  isShowingFormToEditExpense: boolean
  setIsShowingFormToEditExpense: React.Dispatch<React.SetStateAction<boolean>>
  editExpense: (expense: Expense) => Promise<void>
}

export const useEditExpense = (
  expenses: Expense[],
  updateExpenses: (expenses: Expense[]
  ) => void): UseEditExpense => {
  const groupService = useGroupService()
  const [isShowingFormToEditExpense, setIsShowingFormToEditExpense] = useState<boolean>(false)

  const editExpense = async (expense: Expense): Promise<void> => {
    await groupService.editExpense(expense)
    updateExpenses([expense, ...expenses.filter(exp => exp.id !== expense.id)])
    setIsShowingFormToEditExpense(false)
  }

  return { isShowingFormToEditExpense, setIsShowingFormToEditExpense, editExpense }
}
