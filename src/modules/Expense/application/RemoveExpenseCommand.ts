import { type ExpenseRepository } from '../domain/ExpenseRepository'

export class RemoveExpenseCommand {
  constructor (private readonly expenseRepository: ExpenseRepository) {}

  async execute (expenseId: string): Promise<void> {
    await this.expenseRepository.remove(expenseId)
  }
}
