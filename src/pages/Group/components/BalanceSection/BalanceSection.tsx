import { useEffect, useState, type FC } from 'react'
import { type Balance } from '../../../../modules/Group/application/GroupService'
import { type Group } from '../../../../modules/Group/domain/Group'
import './BalanceSection.css'
import { CardBalance } from '../../../../components/cards/CardBalance/CardBalance'
import { useGroupService } from '../../../../hooks/GroupServiceContext/useGroupService'

interface BalanceSectionProps {
  group: Group
}

export const BalanceSection: FC<BalanceSectionProps> = ({ group }) => {
  const groupService = useGroupService()
  const [balances, setBalances] = useState<Balance[]>([])

  useEffect(() => {
    if (group) {
      groupService.calculateTransactions(group)
        .then((res) => { setBalances(res) })
        .catch((e) => { console.error(e) })
    }
  }, [group?.id])

  return (
    <section className="balance-section">
      {
        balances.map((balance) => <CardBalance key={balance.participant} balance={balance} />)
      }
    </section>
  )
}
