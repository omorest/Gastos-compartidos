import { type Command } from '../../../core/application/Command'
import { GroupAlreadyExistError } from '../domain/errors/GroupAlreadyExistError'
import { type Group } from '../domain/Group'
import { type GroupRepository } from '../domain/GroupRepository'
import { type GetGroupByNameQuery } from './GetGroupByNameQuery'

export class CreateGroupCommand implements Command<Group, Group> {
  constructor (private readonly groupRepository: GroupRepository, private readonly getGroupByNameQuery: GetGroupByNameQuery) {}

  async execute (group: Group): Promise<Group> {
    const groupFound = await this.getGroupByNameQuery.execute(group?.name)
    if (groupFound) {
      throw new GroupAlreadyExistError()
    }
    return await this.groupRepository.create(group)
  }
}
