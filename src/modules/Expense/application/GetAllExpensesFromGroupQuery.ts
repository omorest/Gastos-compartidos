import { type Query } from '../../../core/application/Query'
import { type Expense } from '../domain/Expense'
import { type SortExpensesByDate, type ExpenseRepository } from '../domain/ExpenseRepository'

export class GetAllExpensesFromGroupQuery implements Query<Expense[], string> {
  constructor (private readonly expenseRepository: ExpenseRepository) {}

  async execute (groupId: string, sort: SortExpensesByDate = 'desc'): Promise<Expense[]> {
    return await this.expenseRepository.getAllFromGroup(groupId, sort)
  }
}
