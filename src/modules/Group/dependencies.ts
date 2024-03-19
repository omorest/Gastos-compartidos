import { expenseRepository } from '../Expense/dependencies'
import { CreateGroupCommand } from './application/CreateGroupCommand'
import { EditGroupCommand } from './application/EditGroupCommand'
import { GetAllGroupsQuery } from './application/GetAllGroupsQuery'
import { GetGroupByIdQuery } from './application/GetGroupByIdQuery'
import { GetGroupByNameQuery } from './application/GetGroupByNameQuery'
import { RemoveGroupCommand } from './application/RemoveGroupCommand'
import { type GroupRepository } from './domain/GroupRepository'
import { createLocaStorageGroupRepository } from './infrastructure/LocalStorageGroupRepository'

export const groupRepository: GroupRepository = createLocaStorageGroupRepository()

export const casesGroup = {
  createGroupCommand: new CreateGroupCommand(groupRepository, new GetGroupByNameQuery(groupRepository)),
  editGroupCommand: new EditGroupCommand(groupRepository, expenseRepository),
  removeGroupCommand: new RemoveGroupCommand(groupRepository, expenseRepository),
  getAllGroupsQuery: new GetAllGroupsQuery(groupRepository),
  getGroupByIdQuery: new GetGroupByIdQuery(groupRepository),
  getGroupByNameQuery: new GetGroupByNameQuery(groupRepository)
}

export type UseCasesGroup = typeof casesGroup
