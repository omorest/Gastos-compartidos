import { type Command } from '../../../core/application/Command'
import { type ExpenseRepository } from '../../Expense/domain/ExpenseRepository'
import { type GroupRepository } from '../domain/GroupRepository'

export class RemoveGroupCommand implements Command<string, void> {
  constructor (private readonly groupRepository: GroupRepository, private readonly expenseRepository: ExpenseRepository) {}

  async execute (groupId: string): Promise<void> {
    await this.groupRepository.remove(groupId)
    await this.expenseRepository.removeAllFromGroup(groupId)
  }
}
