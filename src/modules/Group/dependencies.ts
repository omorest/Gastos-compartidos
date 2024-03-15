import { expenseRepository } from '../Expense/dependencies'
import { CreateGroupCommand } from './application/CreateGroupCommand'
import { EditGroupCommand } from './application/EditGroupCommand'
import { GetAllGroupsQuery } from './application/GetAllGroupsQuery'
import { GetGroupByIdQuery } from './application/GetGroupByIdQuery'
import { type GroupRepository } from './domain/GroupRepository'
import { createLocaStorageGroupRepository } from './infrastructure/LocalStorageGroupRepository'

export const groupRepository: GroupRepository = createLocaStorageGroupRepository()
// TODO: remove this repository

export const casesGroup = {
  createGroupCommand: new CreateGroupCommand(groupRepository),
  editGroupCommand: new EditGroupCommand(groupRepository, expenseRepository),
  getAllGroupsQuery: new GetAllGroupsQuery(groupRepository),
  getGroupByIdQuery: new GetGroupByIdQuery(groupRepository)
}

export type UseCasesGroup = typeof casesGroup
