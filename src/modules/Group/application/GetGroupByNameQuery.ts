import { type Group } from '../domain/Group'
import { type GroupRepository } from '../domain/GroupRepository'
import { type Query } from '../../../core/application/Query'

export class GetGroupByNameQuery implements Query<Group | null, string> {
  constructor (private readonly repository: GroupRepository) {}

  async execute (name: string): Promise<Group | null> {
    return await this.repository.getGroupByName(name)
  }
}
