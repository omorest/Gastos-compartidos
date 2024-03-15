import { type Command } from '../../../core/application/Command'
import { type ExpenseRepository } from '../domain/ExpenseRepository'

export class RemoveExpenseCommand implements Command<string, void> {
  constructor (private readonly expenseRepository: ExpenseRepository) {}

  async execute (expenseId: string): Promise<void> {
    await this.expenseRepository.remove(expenseId)
  }
}
