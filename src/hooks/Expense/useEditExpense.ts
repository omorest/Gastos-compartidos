import type React from 'react'
import { useState } from 'react'
import { type GroupService } from '../../modules/Group/application/GroupService'
import { type Expense } from '../../modules/Expense/domain/Expense'

interface UseEditExpense {
  isShowingFormToEditExpense: boolean
  setIsShowingFormToEditExpense: React.Dispatch<React.SetStateAction<boolean>>
  editExpense: (expense: Expense) => Promise<void>
}

export const useEditExpense = (
  groupService: GroupService,
  expenses: Expense[],
  updateExpenses: (expenses: Expense[]
  ) => void): UseEditExpense => {
  const [isShowingFormToEditExpense, setIsShowingFormToEditExpense] = useState<boolean>(false)

  const editExpense = async (expense: Expense): Promise<void> => {
    await groupService.editExpense(expense)
    updateExpenses([expense, ...expenses.filter(exp => exp.id !== expense.id)])
    setIsShowingFormToEditExpense(false)
  }

  return { isShowingFormToEditExpense, setIsShowingFormToEditExpense, editExpense }
}
