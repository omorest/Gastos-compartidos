import { type Group } from '../domain/Group'
import { type GroupRepository } from '../domain/GroupRepository'

export class GetGroupByIdQuery {
  constructor (private readonly groupRepository: GroupRepository) {}

  async execute (groupId: string): Promise<Group | null> {
    return await this.groupRepository.get(groupId)
  }
}
