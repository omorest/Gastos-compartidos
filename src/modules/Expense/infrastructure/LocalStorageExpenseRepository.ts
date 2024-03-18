import { type Expense } from '../domain/Expense'
import { type SortExpensesByDate, type ExpenseRepository } from '../domain/ExpenseRepository'

export function createLocaStorageExpenseRepository (): ExpenseRepository {
  return new LocalStorageExpenseRepository(localStorage)
}

export class LocalStorageExpenseRepository implements ExpenseRepository {
  constructor (private readonly storage: Storage) {}

  save (expenses: Expense[]): void {
    this.storage.setItem('expenses', JSON.stringify(expenses))
  }

  async create (newExpense: Expense): Promise<Expense[]> {
    try {
      const expenses = await this.getAll()
      const expensesUpdated = [newExpense, ...expenses]
      const expensesSorted = this.sortExpensesByDate(expensesUpdated, 'desc')
      this.save(expensesSorted)
      return expensesSorted
    } catch (error) {
      throw new Error('Error creating expense')
    }
  }

  async remove (expenseId: string): Promise<void> {
    try {
      const expenses = await this.getAll()
      const expensesWithoutSelected = expenses.filter((expense) => expense.id !== expenseId)
      this.save(expensesWithoutSelected)
    } catch (error) {
      throw new Error('Error removing expense')
    }
  }

  async removeAllFromGroup (groupId: string): Promise<void> {
    try {
      const expenses = await this.getAll()
      const expensesWithoutSelected = expenses.filter((expense) => expense.groupId !== groupId)
      this.save(expensesWithoutSelected)
    } catch (error) {
      throw new Error('Error removing expenses from group')
    }
  }

  async edit (expenseEdited: Expense): Promise<Expense> {
    try {
      const expenses = await this.getAll()
      const originalExpenseIndex = expenses.findIndex((expense) => expense.id === expenseEdited.id)
      if (originalExpenseIndex === -1) {
        throw new Error('Expense not found')
      }
      expenses[originalExpenseIndex] = { ...expenseEdited }
      this.save(expenses)
      return expenseEdited
    } catch (error) {
      throw new Error('Error editing expense')
    }
  }

  async getAllFromGroup (groupId: string, sort: SortExpensesByDate = 'desc'): Promise<Expense[]> {
    try {
      const expenses = await this.getAll()
      const expensesGroup = expenses.filter((expense) => expense.groupId === groupId)
      const expensesGroupSorted = this.sortExpensesByDate(expensesGroup, sort)
      return expensesGroupSorted
    } catch (error) {
      throw new Error('Error getting expenses from group')
    }
  }

  async getAll (): Promise<Expense[]> {
    try {
      const expenses: Expense[] = await JSON.parse(this.storage.getItem('expenses') ?? '[]')
      return expenses.map((expense) => ({
        ...expense,
        creationDate: new Date(expense.creationDate)
      }))
    } catch (error) {
      throw new Error('Error getting expenses')
    }
  }

  async getById (expenseId: string): Promise<Expense | undefined> {
    try {
      const expenses = await this.getAll()
      return expenses.find((expense) => expense.id === expenseId)
    } catch (error) {
      throw new Error('Error getting expense')
    }
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
