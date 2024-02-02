import { type Group } from '../domain/Group'
import { type GroupRepository } from '../domain/GroupRepository'

export class GroupService {
  constructor (private readonly groupRepository: GroupRepository) {}

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
}
