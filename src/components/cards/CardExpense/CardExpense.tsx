import { Link } from 'wouter'
import { type FC } from 'react'
import './CardGroup.css'
import { type Expense } from '../../../Expense/Domain/Expense'
import { formateDate } from '../../../utils/formatDate'

interface CardExpenseProps {
  expense: Expense
  onRemoveExpense: (expense: Expense) => Promise<void>
}

export const CardExpense: FC<CardExpenseProps> = ({ expense, onRemoveExpense }) => {
  return (
    <Link href={'#'}>
      <div className='card-expense'>
        <div className=''>
          <h3>{expense.name}</h3>
          <h4>Pagado por {expense.payer}</h4>
        </div>
        <div>
          <span>{expense.cost}</span>
          <span>{formateDate(expense.creationDate)}</span>
        </div>
      </div>
    </Link>
  )
}
