import { z } from 'zod'
import { ValidatorsGroup } from '../../domain/validators/validators'

const { isAValidParticipantName, isValidDescriptionGroup, isValidNameGroup } = ValidatorsGroup

export const NewGroupSchema = z.object({
  name: z.string().refine(isValidNameGroup.validate, isValidNameGroup.errorMessage),
  description: z.string().refine(isValidDescriptionGroup.validate, isValidDescriptionGroup.errorMessage).optional(),
  participants: z.array(
    z.object({
      name: z.string().refine(isAValidParticipantName.validate, isAValidParticipantName.errorMessage),
      id: z.string()
    })
  )
})

export type NewGroupSchemaType = z.infer<typeof NewGroupSchema>
