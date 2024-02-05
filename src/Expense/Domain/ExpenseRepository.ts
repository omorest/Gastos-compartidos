import { type Expense } from './Expense'

export interface ExpenseRepository {
  create: (newExpense: Expense) => Promise<Expense>
  remove: (expenseId: string) => Promise<void>
  edit: (expenseId: string, expenseEdited: Expense) => Promise<Expense>
  getAll: () => Promise<Expense[]>
  getAllFromGroup: (groupId: string) => Promise<Expense[]>
}
