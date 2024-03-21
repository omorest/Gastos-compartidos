import { type Command } from '../../../core/application/Command'
import { type ExpenseRepository } from '../../Expense/domain/ExpenseRepository'
import { type Group } from '../domain/Group'
import { type GroupRepository } from '../domain/GroupRepository'

export class EditGroupCommand implements Command<Group, Group> {
  constructor (private readonly groupRepository: GroupRepository, private readonly expenseRepository: ExpenseRepository) {}

  async execute (group: Group): Promise<Group> {
    const expensesFromGroup = await this.expenseRepository.getAllFromGroup(group.id, 'desc')
    const expensesEdited = expensesFromGroup.map(expense => {
      return {
        ...expense,
        participants: group.participants,
        paidBy: group.participants.find((p) => p.id === expense.payerId)?.name ?? ''
      }
    })
    this.expenseRepository.save(expensesEdited)
    return await this.groupRepository.edit(group)
  }
}
