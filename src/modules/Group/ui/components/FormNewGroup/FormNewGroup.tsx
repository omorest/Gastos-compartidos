import { type FC } from 'react'
import { type SubmitHandler, useFieldArray, useForm } from 'react-hook-form'
import './FormNewGroup.css'
import { type Group } from '../../../domain/Group'
import Button from '../../../../../core/components/Button/Button'
import { generateID } from '../../../../../core/utils/generateId'
import { RemoveIcon } from '../../../../../core/components/icons/Remove'
import { InputText } from '../../../../../core/components/InputText/InputText'
interface FormNewGroupProps {
  onSave: (group: Group) => void
  onCancel: () => void
}

type FormData = Pick<Group, 'name' | 'description' | 'participants'>

const initialGroupData: FormData = {
  name: '',
  description: '',
  participants: [{ id: '', name: '' }]
}

export const FormNewGroup: FC<FormNewGroupProps> = ({ onSave, onCancel }) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors }
  } = useForm<FormData>({
    defaultValues: initialGroupData
  })

  const onSubmit: SubmitHandler<FormData> = (data) => {
    const group: Group = {
      ...data,
      id: generateID(),
      participants: data.participants.map((participant) => ({ ...participant, id: generateID() })),
      creationDate: new Date()
    }
    onSave(group)
  }

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'participants'
  })

  return (
    <div>
      <h3>Nuevo grupo</h3>
      <form onSubmit={handleSubmit(onSubmit)} className='form-new-group'>
        <div>
          <InputText
            placeholder='Título'
            {...register('name', { required: 'Este campo es requerido' })}
          />
          {errors.name && <span>{errors.name.message}</span>}
        </div>

        <div>
          <InputText placeholder='Descripción' {...register('description')}/>
          {errors.description && <span>{errors.description.message}</span>}
        </div>

        <div className='form-participants'>
          <strong>Participantes</strong>
          {fields.map((field, index) => (
            <div key={field.id} className='form-participant-input'>
              <InputText
                placeholder={`Nombre del participante ${index + 1}`}
                {...register(`participants.${index}.name`, {
                  required: 'Nombre es requerido'
                })}
              />
              <Button type="button" onClick={() => { remove(index) }}>
                <RemoveIcon />
              </Button>
            </div>
          ))}
          <Button type="button" onClick={() => { append({ id: '', name: '' }) }}>
            Añadir Participante
          </Button>
        </div>

        <div className='form-new-group-buttons'>
          <Button type="submit">Crear</Button>
          <Button type='button' onClick={onCancel}>Cancelar</Button>
        </div>
    </form>

    </div>
  )
}
