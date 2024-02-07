import { type FC } from 'react'
import { type Balance } from '../../../modules/Group/application/GroupService'
import { DoubleArrowRight } from '../../icons/DoubleArrowRight'
import { formatNumberCurrency } from '../../../utils/formatNumberCurrency'

import './CardBalance.css'

interface BalanceProps {
  balance: Balance
}

export const CardBalance: FC<BalanceProps> = ({ balance }) => {
  // TODO: Calculate with service
  const totalExpenseParticipant = Math.round((balance.payments.reduce((acc, payment) => acc + payment.amount, 0) * 100)) / 100

  return (
    <div key={balance.participant} className="balance-section-participant">
      <div className='balance-section-participant-info'>
        <h3>{balance.participant}</h3>
        {/* TODO: show all participants with negativa and positive values */}
        <div className='balance-section-participant-info-total'>-{totalExpenseParticipant}</div>
      </div>
      <span className='balance-section-participant-icon'>
        <DoubleArrowRight />
      </span>
      <div className='balance-section-participant-payment'>
      {
        balance.payments.map((payment) => {
          return <div key={payment.to} >
            <strong>{payment.to} </strong> <span>{formatNumberCurrency(payment.amount)}</span>
          </div>
        })
      }
      </div>
    </div>
  )
}
