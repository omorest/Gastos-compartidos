import { useEffect, useState } from 'react'
import { type Expense } from '../../domain/Expense'
import { useCasesExpenses } from './useCasesExpenses'

interface UseExpenses {
  isLoading: boolean
  expenses: Expense[]
  setExpenses: React.Dispatch<React.SetStateAction<Expense[]>>
}

export const useExpenses = (groupId: string): UseExpenses => {
  const { getAllExpenseFromGroupQuery } = useCasesExpenses()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [expenses, setExpenses] = useState<Expense[]>([])

  useEffect(() => {
    setIsLoading(true)
    getAllExpenseFromGroupQuery.execute(groupId)
      .then((expenses) => { setExpenses(expenses) })
      .catch((error) => { console.error(error) })
      .finally(() => { setIsLoading(false) })
  }, [groupId])

  return { isLoading, expenses, setExpenses }
}
