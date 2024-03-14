import { type Expense } from '../domain/Expense'
import { type SortExpensesByDate, type ExpenseRepository } from '../domain/ExpenseRepository'

export class GetAllExpensesFromGroupQuery {
  constructor (private readonly expenseRepository: ExpenseRepository) {}

  async execute (groupId: string, sort: SortExpensesByDate = 'desc'): Promise<Expense[]> {
    return await this.expenseRepository.getAllFromGroup(groupId, sort)
  }
}
