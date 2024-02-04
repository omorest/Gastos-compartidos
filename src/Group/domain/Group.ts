import { type Expense } from '../../Expense/Domain/Expense'
import { type User } from '../../User/Domain/User'

export interface Group {
  id: string
  name: string
  description: string
  participants: User[]
  expenses: Expense[]
  totalExpenses: number
  creationDate: Date
}
