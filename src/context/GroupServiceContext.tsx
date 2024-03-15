import { type FC, createContext } from 'react'
import { GroupService } from '../modules/Group/application/GroupService'
import { createLocaStorageGroupRepository } from '../modules/Group/infrastructure/LocalStorageGroupRepository'
import { createLocaStorageExpenseRepository } from '../modules/Expense/infrastructure/LocalStorageExpenseRepository'
import { CreateGroupCommand } from '../modules/Group/application/CreateGroupCommand'
import { EditGroupCommand } from '../modules/Group/application/EditGroupCommand'
import { GetAllGroupsQuery } from '../modules/Group/application/GetAllGroupsQuery'
import { GetGroupByIdQuery } from '../modules/Group/application/GetGroupByIdQuery'
import { GetAllExpensesFromGroupQuery } from '../modules/Expense/application/GetAllExpensesFromGroupQuery'
import { RemoveExpenseCommand } from '../modules/Expense/application/RemoveExpenseCommand'
import { EditExpenseCommand } from '../modules/Expense/application/EditExpenseCommand'
import { CreateExpenseCommand } from '../modules/Expense/application/CreateExpenseCommand'

const groupRepository = createLocaStorageGroupRepository()
const expenseRepository = createLocaStorageExpenseRepository()

const useCasesGroup = {
  createGroupCommand: new CreateGroupCommand(groupRepository),
  editGroupCommand: new EditGroupCommand(groupRepository, expenseRepository),
  getAllGroupsQuery: new GetAllGroupsQuery(groupRepository),
  getGroupByIdQuery: new GetGroupByIdQuery(groupRepository)
}

const useCasesExpense = {
  createExpenseCommand: new CreateExpenseCommand(expenseRepository),
  editExpenseCommand: new EditExpenseCommand(expenseRepository),
  getAllExpenseFromGroupQuery: new GetAllExpensesFromGroupQuery(expenseRepository),
  removeExpenseCommand: new RemoveExpenseCommand(expenseRepository)
}

interface GroupServiceContextType {
  groupService: GroupService
  useCasesGroup: typeof useCasesGroup
  useCasesExpense: typeof useCasesExpense
}

export const GroupServiceContext = createContext<GroupServiceContextType | null>(null)

interface GroupServiceProviderProps {
  children: React.ReactNode
}

export const GroupServiceProvider: FC<GroupServiceProviderProps> = ({ children }) => {
  const groupService = new GroupService(groupRepository, expenseRepository)

  return (
    <GroupServiceContext.Provider value={{ groupService, useCasesGroup, useCasesExpense }}>
      {children}
    </GroupServiceContext.Provider>
  )
}
