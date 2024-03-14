import { type ExpenseRepository } from '../domain/ExpenseRepository'

export class RemoveAllExpensesFromGroupCommand {
  constructor (private readonly expenseRepository: ExpenseRepository) {}

  async execute (groupId: string): Promise<void> {
    try {
      await this.expenseRepository.removeAllFromGroup(groupId)
    } catch (error) {
      throw new Error('Error al eliminar los gastos del grupo')
    }
  }
}
