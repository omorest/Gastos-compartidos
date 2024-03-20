import { z } from 'zod'

export const NewExpenseSchema = z.object({
  title: z.string().min(1, 'Campo requerido'),
  cost: z.number().min(0.01, 'El valor debe ser mayor a 0').default(0),
  creationDate: z.date()
    .max(new Date(), 'La fecha no puede ser posterior a hoy')
    .default(() => new Date()),
  payerId: z.string().min(1, 'Campo requerido')
})

export type NewExpenseSchemaType = z.infer<typeof NewExpenseSchema>
