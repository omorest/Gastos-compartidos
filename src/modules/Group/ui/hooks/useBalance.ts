import { useEffect, useState } from 'react'
import { type Balance } from '../../application/GroupService'
import { type Group } from '../../domain/Group'
import { BalanceService } from '../../domain/services/BalanceService'
import { useCasesExpenses } from '../../../Expense/ui/hooks'

interface UseBalanceResponse {
  balances: Balance[]
  setBalances: React.Dispatch<React.SetStateAction<Balance[]>>
}

export const useBalance = (group: Group): UseBalanceResponse => {
  const { getAllExpenseFromGroupQuery } = useCasesExpenses()
  const balanceService = new BalanceService()
  const [balances, setBalances] = useState<Balance[]>([])

  const calculateBalances = async (): Promise<Balance[]> => {
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
