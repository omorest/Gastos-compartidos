import { useEffect, useState, type FC } from 'react'
import { type Balance, type GroupService } from '../../../../modules/Group/application/GroupService'
import { type Group } from '../../../../modules/Group/domain/Group'
import './BalanceSection.css'
import { formatNumberCurrency } from '../../../../utils/formatNumberCurrency'
import { DoubleArrowRight } from '../../../../components/icons/DoubleArrowRight'

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

  console.log(balances)
  return (
    <section className="balance-section">

      {
        balances.map((b) => {
          return (
            <div key={b.participant} className="balance-section-participant">
              <h3>{b.participant}</h3>
              <span className='balance-section-participant-icon'>
                <DoubleArrowRight />
              </span>
              <div className='balance-section-participant-payment'>
              {
                b.payments.map((payment) => {
                  return <div key={payment.to} >
                    <strong>{payment.to} </strong> <span>{formatNumberCurrency(payment.amount)}</span>
                  </div>
                })
              }
              </div>
            </div>
          )
        })
      }
    </section>
  )
}
