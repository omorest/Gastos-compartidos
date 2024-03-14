import { type Expense } from '../domain/Expense'
import { type ExpenseRepository } from '../domain/ExpenseRepository'

export class CreateExpenseCommand {
  constructor (private readonly expenseRepository: ExpenseRepository) {}

  async execute (expense: Expense): Promise<Expense[]> {
    return await this.expenseRepository.create(expense)
  }
}
