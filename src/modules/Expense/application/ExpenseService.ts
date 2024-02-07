import { type Expense } from '../domain/Expense'
import { type ExpenseRepository } from '../domain/ExpenseRepository'

export class ExpenseService {
  constructor (private readonly expenseRepository: ExpenseRepository) {}

  async create (expense: Expense): Promise<Expense> {
    return await this.expenseRepository.create(expense)
  }

  async remove (expenseId: string): Promise<void> {
    await this.expenseRepository.remove(expenseId)
  }

  async edit (expenseEdited: Expense): Promise<Expense> {
    return await this.expenseRepository.edit(expenseEdited)
  }
}
