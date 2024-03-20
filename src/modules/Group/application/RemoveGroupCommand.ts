import { type Command } from '../../../core/application/Command'
import { ErrorRemovingAllExpensesFromGroup } from '../../Expense/domain/errors/ErrorRemovingAllExpensesFromGroup'
import { type ExpenseRepository } from '../../Expense/domain/ExpenseRepository'
import { ErrorRemovingGroup } from '../domain/errors/ErrorRemovingGroup'
import { type GroupRepository } from '../domain/GroupRepository'

export class RemoveGroupCommand implements Command<string, void> {
  constructor (private readonly groupRepository: GroupRepository, private readonly expenseRepository: ExpenseRepository) {}

  async execute (groupId: string): Promise<void> {
    try {
      await this.groupRepository.remove(groupId)
      await this.expenseRepository.removeAllFromGroup(groupId)
    } catch (error) {
      if (error instanceof ErrorRemovingGroup) throw new ErrorRemovingGroup()
      if (error instanceof ErrorRemovingAllExpensesFromGroup) throw new ErrorRemovingAllExpensesFromGroup()
    }
  }
}
