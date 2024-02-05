import React from 'react'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { type User } from '../../../User/Domain/User'
import { formatDate } from '../../../utils/formatDate'
import { type Expense } from '../../../Expense/domain/Expense'
import { generateID } from '../../../utils/generateId'
import './FormNewExpense.css'
import { InputText } from '../../atoms/InputText/InputText'

interface FormNewExpenseProps {
  groupId: string
  users: User[]
  onSaveExpense: (expense: Expense) => void
}

type ExpenseFormData = Pick<Expense, 'title' | 'cost' | 'creationDate' | 'payerId'>

const FormNewExpense: React.FC<FormNewExpenseProps> = ({ groupId, users, onSaveExpense }) => {
  const { handleSubmit, register } = useForm<ExpenseFormData>()

  const onSubmit: SubmitHandler<ExpenseFormData> = (expense) => {
    onSaveExpense({
      ...expense,
      id: generateID(),
      groupId,
      paidBy: users.find((user) => user.id === expense.payerId)?.name ?? ''
    })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='form-new-expense'>
      <div>
        <InputText placeholder='Título' {...register('title', { required: 'Campo requerido' })} />
      </div>

      <div>
        <input type="number" placeholder='Cantidad' {...register('cost', { required: 'Campo requerido' })} />
      </div>

      <div>
        <input type="date" {...register('creationDate', { required: 'Campo requerido' })} defaultValue={formatDate(new Date())}/>
      </div>

      <div className='form-new-expense-input-date'>
        <label>Por quien fue pagado:</label>
        <select {...register('payerId')} className='form-new-expense-input-date-select'>
          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>
      </div>

      <button type="submit">Añadir Gasto</button>
    </form>
  )
}

export default FormNewExpense
