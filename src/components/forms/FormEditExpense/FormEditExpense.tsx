import React from 'react'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { type User } from '../../../modules/User/domain/User'
import { type Expense } from '../../../modules/Expense/domain/Expense'
import './FormEditExpense.css'
import { InputText } from '../../atoms/InputText/InputText'
import Button from '../../atoms/Button/Button'

interface FormEditExpenseProps {
  expense: Expense
  users: User[]
  onSaveExpense: (expense: Expense) => void
  onCancel: () => void
}

type ExpenseFormData = Pick<Expense, 'title' | 'cost' | 'creationDate' | 'payerId'>

const FormEditExpense: React.FC<FormEditExpenseProps> = ({ expense, users, onSaveExpense, onCancel }) => {
  const { handleSubmit, register } = useForm<ExpenseFormData>()

  const onSubmit: SubmitHandler<ExpenseFormData> = (expenseEdited) => {
    onSaveExpense({
      ...expenseEdited,
      id: expense.id,
      groupId: expense.groupId,
      paidBy: users.find((user) => user.id === expenseEdited.payerId)?.name ?? ''
    })
  }

  return (
    <>
    <h4>Nuevo Gasto</h4>
    <form onSubmit={handleSubmit(onSubmit)} className='form-edit-expense'>
      <div>
        <InputText
          placeholder='Título'
          {...register('title', { required: 'Campo requerido' })} value={expense.title}
        />
      </div>

      <div>
        <input
          type="number"
          step={'0.01'}
          placeholder='Cantidad'
          value={expense.cost}
          {...register('cost', { required: 'Campo requerido', valueAsNumber: true })}
        />
      </div>

      <div>
        {/* TODO: Value of Expense */}
        <input
          type="date"
          {...register('creationDate', { required: 'Campo requerido' })}
        />
      </div>

      <div className='form-edit-expense-input-date'>
        <label>Por quien fue pagado:</label>
        <select {...register('payerId')} className='form-edit-expense-input-date-select' value={expense.payerId}>
          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>
      </div>
      <div className='form-edit-expense-buttons'>
        <Button type="submit">Añadir Gasto</Button>
        <Button type="button" onClick={onCancel}>Cancelar</Button>
      </div>
    </form>
    </>
  )
}

export default FormEditExpense
