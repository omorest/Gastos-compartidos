import { type Expense } from '../domain/Expense'
import { type SortExpensesByDate, type ExpenseRepository } from '../domain/ExpenseRepository'

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

  async remove (expenseId: string): Promise<void> {
    const expenses = await this.getAll()
    const expensesWithoutSelected = expenses.filter((expense) => expense.id !== expenseId)
    this.save(expensesWithoutSelected)
  }

  // TODO: Finish this
  // async edit (expenseEdited: Expense): Promise<Expense> {
  //   const expenses = await this.getAll()
  //   const expense = expenses.find((expense) => expense.id === expenseEdited.id)
  //   return expense
  // }

  async getAllFromGroup (groupId: string, sort: SortExpensesByDate): Promise<Expense[]> {
    const expenses = await this.getAll()
    const expensesGroup = expenses.filter((expense) => expense.groupId === groupId)
    const expensesGroupSorted = expensesGroup.sort((a, b) => {
      if (sort === 'asc') {
        return new Date(a.creationDate).getTime() - new Date(b.creationDate).getTime()
      }
      return new Date(b.creationDate).getTime() - new Date(a.creationDate).getTime()
    })

    return expensesGroupSorted
  }

  async getAll (): Promise<Expense[]> {
    const expenses: Expense[] = JSON.parse(localStorage.getItem('expenses') ?? '[]')
    return expenses
  }
}
