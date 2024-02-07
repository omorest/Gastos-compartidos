import { type UseQueryResult, useQuery } from '@tanstack/react-query'
import { createLocaStorageExpenseRepository } from '../../modules/Expense/infrastructure/LocalStorageExpenseRepository'
import { GroupService } from '../../modules/Group/application/GroupService'
import { createLocaStorageGroupRepository } from '../../modules/Group/infrastructure/LocalStorageGroupRepository'
import { type Group } from '../../modules/Group/domain/Group'

const groupRepository = createLocaStorageGroupRepository()
const expenseRepository = createLocaStorageExpenseRepository()
const groupService = new GroupService(groupRepository, expenseRepository)

export const useGroup = (groupId: string | undefined): UseQueryResult<Group | null, Error> => {
  const query = useQuery({
    queryKey: ['group'],
    queryFn: async () => {
      if (groupId) {
        return await groupService.get(groupId)
      } else {
        throw new Error('No group id')
      }
    }
  })
  return query
}
