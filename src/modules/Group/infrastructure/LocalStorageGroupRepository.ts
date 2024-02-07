import { type Group } from '../domain/Group'
import { type GroupRepository } from '../domain/GroupRepository'

export function createLocaStorageGroupRepository (): GroupRepository {
  return new LocalStorageGroupRepository()
}

// TODO: Improve error handling
export class LocalStorageGroupRepository implements GroupRepository {
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

  async edit (groupEdited: Group): Promise<Group> {
    const groups = await this.getAll()
    const originalGroupIndex = groups.findIndex((group) => group.id === groupEdited.id)
    if (originalGroupIndex === -1) {
      throw new Error('Group not found')
    }
    groups[originalGroupIndex] = { ...groupEdited }
    this.save(groups)
    return groupEdited
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
