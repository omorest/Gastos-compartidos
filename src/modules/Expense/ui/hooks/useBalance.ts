import { useEffect, useState } from 'react'
import { type Balance } from '../../../Group/application/GroupService'
import { useGroupService } from '../../../../hooks/GroupServiceContext/useGroupService'
import { type Group } from '../../../Group/domain/Group'

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
        .then((res) => { setBalances(res) })
        .catch((e) => { console.error(e) })
    }
  }, [group?.id])

  return { balances, setBalances }
}
