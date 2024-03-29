import { type Group } from './Group'

export interface GroupRepository {
  create: (group: Group) => Promise<Group>
  remove: (groupId: string) => Promise<void>
  edit: (group: Group) => Promise<Group>
  get: (groupId: string) => Promise<Group | null>
  getAll: () => Promise<Group[]>
  getGroupByName: (name: string) => Promise<Group | null>
}
