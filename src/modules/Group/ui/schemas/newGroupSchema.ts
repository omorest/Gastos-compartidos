import { z } from 'zod'

export const NewGroupSchema = z.object({
  name: z.string().min(1, 'Este campo es requerido').max(50, 'Máximo 50 caracteres'),
  description: z.string().max(100, 'Máximo 50 caracteres').optional(),
  participants: z.array(
    z.object({
      name: z.string()
        .min(1, 'Este campo es requerido')
        .max(30, 'Máximo 30 caracteres'),
      id: z.string()
    })
  )
})

export type NewGroupSchemaType = z.infer<typeof NewGroupSchema>
