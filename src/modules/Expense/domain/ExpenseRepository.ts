import { type Expense } from './Expense'

export type SortExpensesByDate = 'asc' | 'desc'

export interface ExpenseRepository {
  save: (expenses: Expense[]) => void
  create: (newExpense: Expense) => Promise<Expense[]>
  remove: (expenseId: string) => Promise<void>
  removeAllFromGroup: (groupID: string) => Promise<void>
  edit: (expenseEdited: Expense) => Promise<Expense>
  getAll: () => Promise<Expense[]>
  getAllFromGroup: (groupId: string, sort: SortExpensesByDate) => Promise<Expense[]>
}
