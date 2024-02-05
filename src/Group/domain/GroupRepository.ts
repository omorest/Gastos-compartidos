// import { type Expense } from '../../Expense/domain/Expense'
import { type Group } from './Group'

export interface GroupRepository {
  create: (group: Group) => Promise<Group>
  remove: (groupId: string) => Promise<void>
  // edit: (group: Group) => Promise<Group>
  get: (groupId: string) => Promise<Group | null>
  getAll: () => Promise<Group[]>
  // addExpense: (newExpense: Expense) => Promise<Expense>
  // removeExpense: (expenseId: string) => Promise<void>
}
