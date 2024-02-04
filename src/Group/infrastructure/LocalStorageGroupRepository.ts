import { type Group } from '../domain/Group'
import { type GroupRepository } from '../domain/GroupRepository'

export function createLocaStorageGroupRepository (): GroupRepository {
  return new LocalStorageGroupRepository()
}

// TODO: Improve error handling
export class LocalStorageGroupRepository {
  private save (groups: Group[]): void {
    localStorage.setItem('groups', JSON.stringify(groups))
  }

  async create (group: Group): Promise<Group> {
    const groups = await this.getAll()
    groups.unshift(group)
    this.save(groups)
    return group
  }

  async remove (groupId: string): Promise<void> {
    const groups = await this.getAll()
    const groupsWithoutSelected = groups.filter((group) => group.id !== groupId)
    this.save(groupsWithoutSelected)
  }

  async edit (group: Group): Promise<Group> {
    console.log('Edit group', group)
  }

  async get (groupId: string): Promise<Group | null> {
    const groups = await this.getAll()
    const group = groups?.find((group) => group.id === groupId)
    return group ?? null
  }

  async getAll (): Promise<Group[]> {
    const groups = JSON.parse(localStorage.getItem('groups') ?? '[]')
    return groups
  }
}
