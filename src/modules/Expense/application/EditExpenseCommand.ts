import { type Command } from '../../../core/application/Command'
import { type Expense } from '../domain/Expense'
import { type ExpenseRepository } from '../domain/ExpenseRepository'

export class EditExpenseCommand implements Command<Expense, Expense> {
  constructor (private readonly expenseRepository: ExpenseRepository) {}

  async execute (expenseEdited: Expense): Promise<Expense> {
    return await this.expenseRepository.edit(expenseEdited)
  }
}
