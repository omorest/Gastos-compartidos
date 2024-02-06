import { type User } from '../../User/domain/User'

export interface Group {
  id: string
  name: string
  description: string
  participants: User[]
  totalExpenses: number
  creationDate: Date
}
