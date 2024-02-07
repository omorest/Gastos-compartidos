import { useEffect, useState } from 'react'
import { type GroupService } from '../../modules/Group/application/GroupService'
import { type Expense } from '../../modules/Expense/domain/Expense'

interface UseExpenses {
  isLoading: boolean
  expenses: Expense[]
  setExpenses: React.Dispatch<React.SetStateAction<Expense[]>>
}

export const useExpenses = (groupId: string, groupService: GroupService): UseExpenses => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [expenses, setExpenses] = useState<Expense[]>([])

  useEffect(() => {
    setIsLoading(true)
    groupService.getExpensesFromGroup(groupId)
      .then((expenses) => {
        setExpenses(expenses)
      })
      .catch((error) => {
        console.error(error)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [groupId])

  return { isLoading, expenses, setExpenses }
}
