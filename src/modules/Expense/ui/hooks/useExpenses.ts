import { useEffect, useState } from 'react'
import { type Expense } from '../../domain/Expense'
import { useGroupService } from '../../../../hooks/GroupServiceContext/useGroupService'

interface UseExpenses {
  isLoading: boolean
  expenses: Expense[]
  setExpenses: React.Dispatch<React.SetStateAction<Expense[]>>
}

export const useExpenses = (groupId: string): UseExpenses => {
  const groupService = useGroupService()
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
