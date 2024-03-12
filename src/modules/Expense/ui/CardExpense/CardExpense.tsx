import { type FC } from 'react'
import './CardExpense.css'
import { type Expense } from '../../domain/Expense'
import { formatNumberCurrency } from '../../../../core/utils/formatNumberCurrency'
import { formatDate } from '../../../../core/utils/formatDate'

interface CardExpenseProps {
  expense: Expense
}

export const CardExpense: FC<CardExpenseProps> = ({ expense }) => {
  return (
    <div className='card-expense'>
      <div className='card-expense-info'>
        <span className='card-expense-info-title'>{expense.title}</span>
        <span className='card-expense-info-paidby'>Pagado por {expense.paidBy}</span>
      </div>
      <div className='card-expense-values'>
        <span className='card-expense-values-cost'>{formatNumberCurrency(expense.cost)}</span>
        <span className='card-expense-values-date'>{formatDate(expense.creationDate)}</span>
      </div>
    </div>
  )
}
