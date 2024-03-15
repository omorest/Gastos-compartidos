import { type FC, createContext } from 'react'
import { GroupService } from '../modules/Group/application/GroupService'
import { type UseCasesGroup, casesGroup, groupRepository } from '../modules/Group/dependencies'
import { type UseCasesExpense, useCasesExpense, expenseRepository } from '../modules/Expense/dependencies'

interface GroupServiceContextType {
  groupService: GroupService
  useCasesGroup: UseCasesGroup
  useCasesExpense: UseCasesExpense
}

export const GroupServiceContext = createContext<GroupServiceContextType | null>(null)

interface GroupServiceProviderProps {
  children: React.ReactNode
}

export const GroupServiceProvider: FC<GroupServiceProviderProps> = ({ children }) => {
  const groupService = new GroupService(groupRepository, expenseRepository)

  return (
    <GroupServiceContext.Provider value={{ groupService, useCasesGroup: casesGroup, useCasesExpense }}>
      {children}
    </GroupServiceContext.Provider>
  )
}
