import { useEffect, useState, type FC } from 'react'
import { type Balance, type GroupService } from '../../../../modules/Group/application/GroupService'
import { type Group } from '../../../../modules/Group/domain/Group'
import './BalanceSection.css'
import { CardBalance } from '../../../../components/cards/CardBalance/CardBalance'

interface BalanceSectionProps {
  group: Group
  groupService: GroupService
}

export const BalanceSection: FC<BalanceSectionProps> = ({ group, groupService }) => {
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
