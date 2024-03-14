import { type Expense } from '../domain/Expense'
import { type ExpenseRepository } from '../domain/ExpenseRepository'

export class EditExpenseCommand {
  constructor (private readonly expenseRepository: ExpenseRepository) {}

  async execute (expenseEdited: Expense): Promise<Expense> {
    return await this.expenseRepository.edit(expenseEdited)
  }
}
