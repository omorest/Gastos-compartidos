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
  onEditExpense: (expense: Expense) => Promise<void>
  onCancel: () => void
}

type ExpenseFormData = Pick<Expense, 'title' | 'cost' | 'payerId' > & { creationDate: string }

const FormEditExpense: React.FC<FormEditExpenseProps> = ({ expense, users, onEditExpense, onCancel }) => {
  const { handleSubmit, register, formState: { errors } } = useForm<ExpenseFormData>({
    defaultValues: {
      title: expense.title,
      cost: expense.cost,
      creationDate: expense.creationDate.toISOString().split('T')[0],
      payerId: expense.payerId
    }
  })

  const onSubmit: SubmitHandler<ExpenseFormData> = async (expenseEdited) => {
    await onEditExpense({
      ...expenseEdited,
      creationDate: expenseEdited.creationDate as unknown as Date,
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
          {...register('cost', {
            required: 'Campo requerido',
            valueAsNumber: true,
            min: { value: 0, message: 'El valor debe ser mayor a 0' }
          })}
        />
        {errors.cost && <span>{errors.cost.message}</span>}
      </div>

      <div>
        <input
          type="date"
          max={new Date().toISOString().split('T')[0]}
          {...register('creationDate', { required: 'Campo requerido', valueAsDate: true })}
        />
        {errors.creationDate && <span>{errors.creationDate.message}</span>}
      </div>

      <div className='form-edit-expense-input-date'>
        <label>Por quien fue pagado:</label>
        <select {...register('payerId')} name="selectPayer" className='form-edit-expense-input-date-select'>
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
