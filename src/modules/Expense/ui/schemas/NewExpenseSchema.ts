import { z } from 'zod'
import { ValidatorsExpense } from '../../domain/validators/validators'

const { isValidCost, isValidCreationDate, isValidPayerId, isValidTitle } = ValidatorsExpense
export const NewExpenseSchema = z.object({
  title: z.string().refine(isValidTitle.validate, isValidTitle.errorMessage),
  cost: z.number().refine(isValidCost.validate, isValidCost.errorMessage),
  creationDate: z.date().refine(isValidCreationDate.validate, isValidCreationDate.errorMessage),
  payerId: z.string().refine(isValidPayerId.validate, isValidPayerId.errorMessage)
})

export type NewExpenseSchemaType = z.infer<typeof NewExpenseSchema>
