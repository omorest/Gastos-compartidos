import { useEffect, useState } from 'react'
import { type Group } from '../../domain/Group'
import { type Balance, CalculateBalanceGroup } from '../../domain/services/CalculateBalanceGroup'
import { useCasesExpenses } from '../../../Expense/ui/hooks'

interface UseBalanceResponse {
  balances: Balance[]
  setBalances: React.Dispatch<React.SetStateAction<Balance[]>>
}

export const useBalance = (group: Group | undefined | null): UseBalanceResponse => {
  const { getAllExpenseFromGroupQuery } = useCasesExpenses()
  const balanceService = new CalculateBalanceGroup()
  const [balances, setBalances] = useState<Balance[]>([])

  const calculateBalances = async (): Promise<Balance[]> => {
    if (!group) {
      return []
    }
    const expenses = await getAllExpenseFromGroupQuery.execute(group.id)
    return await balanceService.getBalances(group, expenses)
  }

  useEffect(() => {
    if (group) {
      calculateBalances()
        .then((balances) => { setBalances(balances) })
        .catch((error) => { console.error(error) })
    }
  }, [group?.id])

  return { balances, setBalances }
}
