import { type FC } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, type SubmitHandler } from 'react-hook-form'
import toast from 'react-hot-toast'
import Button from '../../../../../core/components/Button/Button'
import { InputText } from '../../../../../core/components/InputText/InputText'
import { Datetime } from '../../../../../core/datetime/Datetime'
import { type User } from '../../../../User/domain/User'
import { type Expense } from '../../../domain/Expense'
import { NewExpenseSchema, type NewExpenseSchemaType } from '../../schemas/NewExpenseSchema'
import './FormEditExpense.css'

interface FormEditExpenseProps {
  expense: Expense
  users: User[]
  onEditExpense: (expense: Expense) => Promise<void>
  onCancel: () => void
}

type NewExpenseSchemaTypeWithDateString = Omit<NewExpenseSchemaType, 'creationDate'> & {
  creationDate: string
}

const FormEditExpense: FC<FormEditExpenseProps> = ({ expense, users, onEditExpense, onCancel }) => {
  const { handleSubmit, register, formState: { errors } } = useForm<(NewExpenseSchemaTypeWithDateString)>({
    defaultValues: {
      title: expense.title,
      cost: expense.cost,
      creationDate: Datetime.formatForInput(expense.creationDate),
      payerId: expense.payerId
    },
    resolver: zodResolver(NewExpenseSchema)
  })

  const onSubmit: SubmitHandler<NewExpenseSchemaTypeWithDateString> = async (expenseEdited) => {
    await onEditExpense({
      ...expenseEdited,
      creationDate: new Date(expenseEdited.creationDate),
      id: expense.id,
      groupId: expense.groupId,
      paidBy: users.find((user) => user.id === expenseEdited.payerId)?.name ?? ''
    })
      .catch(() => toast.error('Error al editar el gasto'))
      .finally(() => toast.success('Gasto editado correctamente'))
  }

  return (
    <>
    <h4>Nuevo Gasto</h4>
    {/* TODO: fix problem with dates */}
    <form onSubmit={handleSubmit(onSubmit)} className='form-edit-expense'>
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
          {...register('cost', {
            required: 'Campo requerido',
            valueAsNumber: true
          })}
        />
        {errors.cost && <span>{errors.cost.message}</span>}
      </div>

      <div>
        <input
          type="date"
          {...register('creationDate', { valueAsDate: true })}
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
