import { type Expense } from '../domain/Expense'
import { type SortExpensesByDate, type ExpenseRepository } from '../domain/ExpenseRepository'

export function createLocaStorageExpenseRepository (): ExpenseRepository {
  return new LocalStorageExpenseRepository()
}

export class LocalStorageExpenseRepository implements ExpenseRepository {
  save (expenses: Expense[]): void {
    localStorage.setItem('expenses', JSON.stringify(expenses))
  }

  async create (newExpense: Expense): Promise<Expense[]> {
    const expenses = await this.getAll()
    const expensesUpdated = [newExpense, ...expenses]
    const expensesSorted = this.sortExpensesByDate(expensesUpdated, 'desc')
    this.save(expensesSorted)
    return expensesSorted
  }

  async remove (expenseId: string): Promise<void> {
    const expenses = await this.getAll()
    const expensesWithoutSelected = expenses.filter((expense) => expense.id !== expenseId)
    this.save(expensesWithoutSelected)
  }

  async removeAllFromGroup (groupId: string): Promise<void> {
    const expenses = await this.getAll()
    const expensesWithoutSelected = expenses.filter((expense) => expense.groupId !== groupId)
    this.save(expensesWithoutSelected)
  }

  async edit (expenseEdited: Expense): Promise<Expense> {
    const expenses = await this.getAll()
    const originalExpenseIndex = expenses.findIndex((expense) => expense.id === expenseEdited.id)
    if (originalExpenseIndex === -1) {
      throw new Error('Expense not found')
    }
    expenses[originalExpenseIndex] = { ...expenseEdited }
    this.save(expenses)
    return expenseEdited
  }

  async getAllFromGroup (groupId: string, sort: SortExpensesByDate = 'desc'): Promise<Expense[]> {
    const expenses = await this.getAll()
    const expensesGroup = expenses.filter((expense) => expense.groupId === groupId)
    const expensesGroupSorted = this.sortExpensesByDate(expensesGroup, sort)
    return expensesGroupSorted
  }

  async getAll (): Promise<Expense[]> {
    const expenses: Expense[] = await JSON.parse(localStorage.getItem('expenses') ?? '[]')
    return expenses.map((expense) => ({
      ...expense,
      creationDate: new Date(expense.creationDate)
    }))
  }

  async getById (expenseId: string): Promise<Expense | undefined> {
    const expenses = await this.getAll()
    return expenses.find((expense) => expense.id === expenseId)
  }

  private sortExpensesByDate (expenses: Expense[], sort: SortExpensesByDate): Expense[] {
    return expenses.sort((a, b) => {
      if (sort === 'asc') {
        return new Date(a.creationDate).getTime() - new Date(b.creationDate).getTime()
      }
      return new Date(b.creationDate).getTime() - new Date(a.creationDate).getTime()
    })
  }
}
