import { type FC } from 'react'
import { DoubleArrowRight } from '../icons/DoubleArrowRight'

import './CardBalance.css'
import { type Balance } from '../../../modules/Group/domain/services/BalanceService'
import { Currency } from '../../currency/Currency'

interface BalanceProps {
  balance: Balance
}

export const CardBalance: FC<BalanceProps> = ({ balance }) => {
  const totalExpenseParticipant = Math.round((balance.payments.reduce((acc, payment) => acc + payment.amount, 0) * 100)) / 100

  return (
    <div key={balance.participant} className="balance-section-participant">
      <div className='balance-section-participant-info'>
        <h3>{balance.participant}</h3>
        <div className='balance-section-participant-info-total'>-{Currency.format(totalExpenseParticipant)}</div>
      </div>
      <span className='balance-section-participant-icon'>
        <DoubleArrowRight />
      </span>
      <div className='balance-section-participant-payment'>
      {
        balance.payments.map((payment) => {
          return <div key={payment.to} >
            <strong>{payment.to} </strong> <span>{Currency.format(payment.amount)}</span>
          </div>
        })
      }
      </div>
    </div>
  )
}
