import { type Group } from './Group'

export interface GroupRepository {
  create: (group: Group) => Promise<Group>
  remove: (groupId: string) => Promise<Group[]>
  edit: (group: Group) => Promise<Group>
  get: (groupId: string) => Promise<Group | null>
  getAll: () => Promise<Group[]>
}
