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
  onEditExpense: (expense: Expense) => void
  onCancel: () => void
}

type ExpenseFormData = Pick<Expense, 'title' | 'cost' | 'creationDate' | 'payerId'>

const FormEditExpense: React.FC<FormEditExpenseProps> = ({ expense, users, onEditExpense, onCancel }) => {
  const { handleSubmit, register, formState: { errors } } = useForm<ExpenseFormData>({
    defaultValues: {
      title: expense.title,
      cost: expense.cost,
      creationDate: expense.creationDate,
      payerId: expense.payerId
    }
  })

  const onSubmit: SubmitHandler<ExpenseFormData> = (expenseEdited) => {
    onEditExpense({
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
          {...register('title', { required: 'Campo requerido' })}
        />
        {errors.title && <span>{errors.title.message}</span>}
      </div>

      <div>
        <input
          type="number"
          step={'0.01'}
          placeholder='Cantidad'
          {...register('cost', { required: 'Campo requerido', valueAsNumber: true })}
        />
        {errors.cost && <span>{errors.cost.message}</span>}
      </div>

      <div>
        {/* TODO: Value Date of Expense */}
        <input
          type="date"
          {...register('creationDate', { required: 'Campo requerido' })}
        />
        {errors.creationDate && <span>{errors.creationDate.message}</span>}
      </div>

      <div className='form-edit-expense-input-date'>
        <label>Por quien fue pagado:</label>
        <select {...register('payerId')} className='form-edit-expense-input-date-select'>
          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>
        {errors.payerId && <span>{errors.payerId.message}</span>}

      </div>
      <div className='form-edit-expense-buttons'>
        <Button type="submit">Editar Gasto</Button>
        <Button type="button" onClick={onCancel}>Cancelar</Button>
      </div>
    </form>
    </>
  )
}

export default FormEditExpense
