import './Balance.css'
import { useParams } from 'wouter'
import { useBalance, useGroup } from '../../modules/Group/ui/hooks'
import { CardBalance } from '../../core/components/CardBalance/CardBalance'

const Balance = () => {
  const params = useParams()
  const { data: group } = useGroup(params.id)
  const { balances } = useBalance(group)

  if (!group) {
    return null
  }

  return (
    <>
      <h2>Balances</h2>
      <section className="balance-section">
        {
          balances.map((balance) => <CardBalance key={balance.participant} balance={balance} />)
        }
      </section>
    </>
  )
}

export default Balance
