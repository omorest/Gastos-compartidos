import { useEffect, useState } from 'react'
import { type Balance } from '../../modules/Group/application/GroupService'
import { useGroupService } from '../GroupServiceContext/useGroupService'
import { type Group } from '../../modules/Group/domain/Group'

interface UseBalanceResponse {
  balances: Balance[]
  setBalances: React.Dispatch<React.SetStateAction<Balance[]>>
}

export const useBalance = (group: Group): UseBalanceResponse => {
  const groupService = useGroupService()
  const [balances, setBalances] = useState<Balance[]>([])

  useEffect(() => {
    if (group) {
      groupService.getBalances(group)
        .then((res) => { setBalances(res as Balance[]) })
        .catch((e) => { console.error(e) })
    }
  }, [group?.id])

  return { balances, setBalances }
}
