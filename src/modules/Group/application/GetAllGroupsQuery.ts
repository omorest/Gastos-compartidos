import { type Group } from '../domain/Group'
import { type GroupRepository } from '../domain/GroupRepository'

export class GetAllGroupsQuery {
  constructor (private readonly groupRepository: GroupRepository) {}

  async execute (): Promise<Group[]> {
    return await this.groupRepository.getAll()
  }
}
