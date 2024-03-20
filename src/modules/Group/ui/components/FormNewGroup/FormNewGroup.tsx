import { type FC } from 'react'
import { type SubmitHandler, useFieldArray, useForm } from 'react-hook-form'
import './FormNewGroup.css'
import { type Group } from '../../../domain/Group'
import Button from '../../../../../core/components/Button/Button'
import { generateID } from '../../../../../core/utils/generateId'
import { RemoveIcon } from '../../../../../core/components/icons/Remove'
import { InputText } from '../../../../../core/components/InputText/InputText'
import { zodResolver } from '@hookform/resolvers/zod'
import { NewGroupSchema, type NewGroupSchemaType } from '../../../domain/validators/newGroupSchema'

interface FormNewGroupProps {
  onSave: (group: Group) => void
  onCancel: () => void
}

const initialGroupData: NewGroupSchemaType = {
  name: '',
  description: '',
  participants: [{ name: '' }]
}

export const FormNewGroup: FC<FormNewGroupProps> = ({ onSave, onCancel }) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors }
  } = useForm<NewGroupSchemaType>({
    defaultValues: initialGroupData,
    resolver: zodResolver(NewGroupSchema)
  })

  const onSubmit: SubmitHandler<NewGroupSchemaType> = (data) => {
    const group: Group = {
      ...data,
      description: data.description ?? '',
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
            {...register('name')}
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
                {...register(`participants.${index}.name`)}
              />
              <Button type="button" onClick={() => { remove(index) }}>
                <RemoveIcon />
              </Button>
            </div>
          ))}
          <Button type="button" onClick={() => { append({ name: '' }) }}>
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
