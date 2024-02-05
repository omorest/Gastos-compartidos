import { type Expense } from '../domain/Expense'
import { type ExpenseRepository } from '../domain/ExpenseRepository'

export function createLocaStorageExpenseRepository (): ExpenseRepository {
  return new LocalStorageExpenseRepository()
}

export class LocalStorageExpenseRepository implements ExpenseRepository {
  private save (expenses: Expense[]): void {
    localStorage.setItem('expenses', JSON.stringify(expenses))
  }

  async create (newExpense: Expense): Promise<Expense> {
    const expenses = await this.getAll()
    expenses.unshift(newExpense)
    this.save(expenses)
    return newExpense
  }

  async remove (groupId: string): Promise<void> {
    const expenses = await this.getAll()
    const expensesWithoutSelected = expenses.filter((expense) => expense.groupId !== groupId)
    this.save(expensesWithoutSelected)
  }

  // TODO: Finish this
  async edit (expenseId: string, expenseEdited: Expense): Promise<Expense> {
    const expenses = await this.getAll()
    const expense = expenses.find((expense) => expense.id === expenseId)
  }

  async getAllFromGroup (groupId: string): Promise<Expense[]> {
    const expenses = await this.getAll()
    return expenses.filter((expense) => expense.groupId === groupId)
  }

  async getAll (): Promise<Expense[]> {
    const expenses: Expense[] = JSON.parse(localStorage.getItem('expenses') ?? '[]')
    return expenses
  }
}
