import { type User } from '../../domain/models/User'

export interface Group {
  id: string
  name: string
  participants: User[]
  totalExpenses: number
  creationDate: Date
}
