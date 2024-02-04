import { type User } from './User'

export interface Expense {
  payer: User
  amount: number
  description: string
  date: Date
}
