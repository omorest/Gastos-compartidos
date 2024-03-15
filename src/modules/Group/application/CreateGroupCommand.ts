import { type Command } from '../../../core/application/Command'
import { type Group } from '../domain/Group'
import { type GroupRepository } from '../domain/GroupRepository'

export class CreateGroupCommand implements Command<Group, Group> {
  constructor (private readonly groupRepository: GroupRepository) {}

  async execute (group: Group): Promise<Group> {
    return await this.groupRepository.create(group)
  }
}
