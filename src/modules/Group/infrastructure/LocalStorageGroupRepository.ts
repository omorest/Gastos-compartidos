import { type Group } from '../domain/Group'
import { type GroupRepository } from '../domain/GroupRepository'

export function createLocaStorageGroupRepository (): GroupRepository {
  return new LocalStorageGroupRepository()
}

export class LocalStorageGroupRepository implements GroupRepository {
  private save (groups: Group[]): void {
    localStorage.setItem('groups', JSON.stringify(groups))
  }

  async create (group: Group): Promise<Group> {
    try {
      const groups = await this.getAll()
      groups.unshift(group)
      this.save(groups)
      return group
    } catch (error) {
      throw new Error('Error creating group')
    }
  }

  async remove (groupId: string): Promise<void> {
    try {
      const groups = await this.getAll()
      const groupsWithoutSelected = groups.filter((group) => group.id !== groupId)
      this.save(groupsWithoutSelected)
    } catch (error) {
      throw new Error('Error removing group')
    }
  }

  async edit (groupEdited: Group): Promise<Group> {
    try {
      const groups = await this.getAll()
      const originalGroupIndex = groups.findIndex((group) => group.id === groupEdited.id)
      if (originalGroupIndex === -1) {
        throw new Error('Group not found')
      }
      groups[originalGroupIndex] = { ...groupEdited }
      this.save(groups)
      return groupEdited
    } catch (error) {
      throw new Error('Error editing group')
    }
  }

  async get (groupId: string): Promise<Group | null> {
    try {
      const groups = await this.getAll()
      const group = groups?.find((group) => group.id === groupId)
      return group ?? null
    } catch (error) {
      throw new Error('Error getting group')
    }
  }

  async getAll (): Promise<Group[]> {
    try {
      const groups = JSON.parse(localStorage.getItem('groups') ?? '[]')
      return groups
    } catch (error) {
      throw new Error('Error getting groups')
    }
  }
}
