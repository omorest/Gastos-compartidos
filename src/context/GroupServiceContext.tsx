import { type FC, createContext } from 'react'
import { GroupService } from '../modules/Group/application/GroupService'
import { createLocaStorageGroupRepository } from '../modules/Group/infrastructure/LocalStorageGroupRepository'
import { createLocaStorageExpenseRepository } from '../modules/Expense/infrastructure/LocalStorageExpenseRepository'

interface GroupServiceContextType {
  groupService: GroupService
}

export const GroupServiceContext = createContext<GroupServiceContextType | null>(null)

interface GroupServiceProviderProps {
  children: React.ReactNode
}

export const GroupServiceProvider: FC<GroupServiceProviderProps> = ({ children }) => {
  const groupRepository = createLocaStorageGroupRepository()
  const expenseRepository = createLocaStorageExpenseRepository()
  const groupService = new GroupService(groupRepository, expenseRepository)

  return (
    <GroupServiceContext.Provider value={{ groupService }}>
      {children}
    </GroupServiceContext.Provider>
  )
}
