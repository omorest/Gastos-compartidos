import React from 'react'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { type User } from '../../../modules/User/domain/User'
import { type Expense } from '../../../modules/Expense/domain/Expense'
import { generateID } from '../../../utils/generateId'
import './FormNewExpense.css'
import { InputText } from '../../atoms/InputText/InputText'
import Button from '../../atoms/Button/Button'

interface FormNewExpenseProps {
  groupId: string
  users: User[]
  onSaveExpense: (expense: Expense) => Promise<void>
  onCancel: () => void
}

type ExpenseFormData = Pick<Expense, 'title' | 'cost' | 'payerId'> & { creationDate: string }

const FormNewExpense: React.FC<FormNewExpenseProps> = ({ groupId, users, onSaveExpense, onCancel }) => {
  const { handleSubmit, register, formState: { errors } } = useForm<ExpenseFormData>()

  const onSubmit: SubmitHandler<ExpenseFormData> = async (expense) => {
    await onSaveExpense({
      ...expense,
      creationDate: new Date(expense.creationDate),
      id: generateID(),
      groupId,
      paidBy: users.find((user) => user.id === expense.payerId)?.name ?? ''
    })
  }

  return (
    <>
    <h4>Nuevo Gasto</h4>
    <form onSubmit={handleSubmit(onSubmit)} className='form-new-expense'>
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
          defaultValue={0}
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
          defaultValue={new Date().toISOString().split('T')[0]}
          max={new Date().toISOString().split('T')[0]}
          {...register('creationDate', { required: 'Campo requerido', valueAsDate: true })}
        />
        {errors.creationDate && <span>{errors.creationDate.message}</span>}
      </div>

      <div className='form-new-expense-input-date'>
        <label>Por quien fue pagado:</label>
        <select {...register('payerId')} name='selectPayer' className='form-new-expense-input-date-select' data-testid="select-payer">
          {users.map((user) => (
            <option key={user.id} value={user.id} data-testid={`option-${user.name}`}>
              {user.name}
            </option>
          ))}
        </select>
        {errors.payerId && <span>{errors.payerId.message}</span>}
      </div>
      <div className='form-new-expense-buttons'>
        <Button type="submit">Añadir Gasto</Button>
        <Button type="button" onClick={onCancel}>Cancelar</Button>
      </div>
    </form>
    </>
  )
}

export default FormNewExpense
