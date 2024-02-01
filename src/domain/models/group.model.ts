import { type Friend } from './friend.model'

export interface Group {
  id: string
  name: string
  friends: Friend[]
  totalExpenses: number
}
