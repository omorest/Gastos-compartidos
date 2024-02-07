import { Link } from 'wouter'
import { type FC } from 'react'
import './CardExpense.css'
import { type Expense } from '../../../modules/Expense/domain/Expense'
import { formatNumberCurrency } from '../../../utils/formatNumberCurrency'

interface CardExpenseProps {
  expense: Expense
}

export const CardExpense: FC<CardExpenseProps> = ({ expense }) => {
  return (
    <Link href={'#'}>
      <div className='card-expense'>
        <div className='card-expense-info'>
          <span className='card-expense-info-title'>{expense.title}</span>
          <span className='card-expense-info-paidby'>Pagado por {expense.paidBy}</span>
        </div>
        <div className='card-expense-values'>
          <span className='card-expense-values-cost'>{formatNumberCurrency(expense.cost)}</span>
          {/* TODO: review type creationDate */}
          <span className='card-expense-values-date'>{expense.creationDate.toString()}</span>
        </div>
      </div>
    </Link>
  )
}
