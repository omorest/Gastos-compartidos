import { type UseQueryResult, useQuery } from '@tanstack/react-query'
import { createLocaStorageGroupRepository } from '../modules/Group/infrastructure/LocalStorageGroupRepository'
import { createLocaStorageExpenseRepository } from '../modules/Expense/infrastructure/LocalStorageExpenseRepository'
import { GroupService } from '../modules/Group/application/GroupService'
import { type Group } from '../modules/Group/domain/Group'

const groupRepository = createLocaStorageGroupRepository()
const expenseRepository = createLocaStorageExpenseRepository()
const groupService = new GroupService(groupRepository, expenseRepository)

export const useGroups = (): UseQueryResult<Group[], Error> => {
  const query = useQuery({
    queryKey: ['groups'],
    queryFn: async () => await groupService.getAll()
  })

  return query
}
