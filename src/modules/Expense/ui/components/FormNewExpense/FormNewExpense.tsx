import React from 'react'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { type User } from '../../../../User/domain/User'
import { type Expense } from '../../../domain/Expense'
import { generateID } from '../../../../../core/utils/generateId'
import './FormNewExpense.css'
import { InputText } from '../../../../../core/components/InputText/InputText'
import Button from '../../../../../core/components/Button/Button'
import { NewExpenseSchema, type NewExpenseSchemaType } from '../../schemas/NewExpenseSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { Datetime } from '../../../../../core/datetime/Datetime'

interface FormNewExpenseProps {
  groupId: string
  users: User[]
  onSaveExpense: (expense: Expense) => Promise<void>
  onCancel: () => void
}

const FormNewExpense: React.FC<FormNewExpenseProps> = ({ groupId, users, onSaveExpense, onCancel }) => {
  const { handleSubmit, register, formState: { errors } } = useForm<NewExpenseSchemaType>({
    resolver: zodResolver(NewExpenseSchema)
  })

  const onSubmit: SubmitHandler<NewExpenseSchemaType> = async (expense) => {
    await onSaveExpense({
      ...expense,
      creationDate: expense.creationDate,
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
          {...register('title')}
        />
        {errors.title && <span>{errors.title.message}</span>}
      </div>

      <div>
        <input
          type="number"
          step={'0.01'}
          placeholder='Cantidad'
          defaultValue={0}
          {...register('cost', { valueAsNumber: true })}
        />
        {errors.cost && <span>{errors.cost.message}</span>}
      </div>

      <div>
        <input
          type="date"
          defaultValue={Datetime.formatForInput(new Date())}
          {...register('creationDate', { valueAsDate: true })}
        />
        {errors.creationDate && <span>{errors.creationDate.message}</span>}
      </div>

      <div className='form-new-expense-input-date'>
        <label>Por quien fue pagado:</label>
        <select {...register('payerId')} className='form-new-expense-input-date-select' data-testid="select-payer" id='selectNewForm'>
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
