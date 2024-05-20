import './Balance.css'
import { useParams } from 'wouter'
import { useBalance, useGroup } from '../../modules/Group/ui/hooks'
import { CardBalance } from '../../core/components/CardBalance/CardBalance'
import { BackHomeIcon } from '../../core/components/icons/BackHomeIcon'

const Balance = () => {
  const params = useParams()
  const { data: group } = useGroup(params.id)
  const { balances } = useBalance(group)

  if (balances.length === 0) {
    return null
  }

  return (
    <>
      <h2>Balances</h2>
      <div style={{ textAlign: 'start' }}>
        <a href={`/group/${group?.id}`} >
          <BackHomeIcon></BackHomeIcon>
        </a>
      </div>
      <section className="balance-section">
        {
          balances.map((balance) => <CardBalance key={balance.participant} balance={balance} />)
        }
      </section>
    </>
  )
}

export default Balance
