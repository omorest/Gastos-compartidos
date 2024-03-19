import { type Query } from '../../../core/application/Query'
import { type Group } from '../domain/Group'
import { type GroupRepository } from '../domain/GroupRepository'

export class GetAllGroupsQuery implements Query<Group[]> {
  constructor (private readonly groupRepository: GroupRepository) {}

  async execute (): Promise<Group[]> {
    return await this.groupRepository.getAll()
  }
}
