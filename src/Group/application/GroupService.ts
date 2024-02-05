import { type Expense } from '../../Expense/domain/Expense'
import { type ExpenseRepository } from '../../Expense/domain/ExpenseRepository'
import { type Group } from '../domain/Group'
import { type GroupRepository } from '../domain/GroupRepository'

export class GroupService implements GroupRepository {
  constructor (private readonly groupRepository: GroupRepository, private readonly expenseRepository: ExpenseRepository) {}

  async create (group: Group): Promise<Group> {
    return await this.groupRepository.create(group)
  }

  async remove (groupId: string): Promise<void> {
    await this.groupRepository.remove(groupId)
  }

  async edit (group: Group): Promise<Group> {
    return await this.groupRepository.edit(group)
  }

  async get (groupId: string): Promise<Group | null> {
    return await this.groupRepository.get(groupId)
  }

  async getAll (): Promise<Group[]> {
    return await this.groupRepository.getAll()
  }

  async addExpense (newExpense: Expense): Promise<Expense> {
    return await this.expenseRepository.create(newExpense)
  }

  async removeExpense (expenseId: string): Promise<void> {
    await this.expenseRepository.remove(expenseId)
  }

  async getExpensesFromGroup (groupId: string): Promise<Expense[]> {
    return await this.expenseRepository.getAllFromGroup(groupId)
  }
}
