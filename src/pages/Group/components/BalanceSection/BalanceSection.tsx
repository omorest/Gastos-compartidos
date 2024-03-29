import { type FC } from 'react'
import { type Group } from '../../../../modules/Group/domain/Group'
import './BalanceSection.css'
import { CardBalance } from '../../../../core/components/CardBalance/CardBalance'
import { useBalance } from '../../../../modules/Group/ui/hooks/useBalance'

interface BalanceSectionProps {
  group: Group
}

export const BalanceSection: FC<BalanceSectionProps> = ({ group }) => {
  const { balances } = useBalance(group)

  return (
    <section className="balance-section">
      {
        balances.map((balance) => <CardBalance key={balance.participant} balance={balance} />)
      }
    </section>
  )
}
