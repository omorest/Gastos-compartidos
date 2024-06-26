import { zodResolver } from '@hookform/resolvers/zod'
import { type FC } from 'react'
import { type SubmitHandler, useFieldArray, useForm } from 'react-hook-form'
import Button from '../../../../../core/components/Button/Button'
import { RemoveIcon } from '../../../../../core/components/icons/Remove'
import { InputText } from '../../../../../core/components/InputText/InputText'
import { generateID } from '../../../../../core/utils/generateId'
import { type Group } from '../../../domain/Group'
import { NewGroupSchema, type NewGroupSchemaType } from '../../schemas/newGroupSchema'
import './FormEditGroup.css'

interface FormEditGroupProps {
  group: Group
  onEditGroup: (group: Group) => void
  onCancel: () => void
}

export const FormEditGroup: FC<FormEditGroupProps> = ({ group, onEditGroup, onCancel }) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors }
  } = useForm<NewGroupSchemaType>({
    defaultValues: {
      name: group.name || '',
      description: group.description || '',
      participants: group.participants || [{ id: '', name: '' }]
    },
    resolver: zodResolver(NewGroupSchema)
  })

  const onSubmit: SubmitHandler<NewGroupSchemaType> = (data) => {
    onEditGroup({
      ...data,
      description: data.description ?? '',
      id: group.id,
      participants: data.participants.map((participant) => ({ ...participant, id: participant.id || generateID() })),
      creationDate: group.creationDate
    })
  }

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'participants'
  })

  return (
    <div>
      <h3>Editar grupo</h3>
      <form onSubmit={handleSubmit(onSubmit)} className='form-new-group'>
        <div>
          <InputText
            placeholder='Título'
            defaultValue={group.name}
            {...register('name', { required: 'Este campo es requerido' })}
          />
          {errors.name && <span>{errors.name.message}</span>}
        </div>

        <div>
          <InputText
            placeholder='Descripción'
            defaultValue={group.description}
            {...register('description')}
          />
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
          <Button type="submit">Editar</Button>
          <Button type='button' onClick={onCancel}>Cancelar</Button>
        </div>
    </form>

    </div>
  )
}
