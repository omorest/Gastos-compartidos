import { useMutation, useQueryClient, type UseMutationResult } from '@tanstack/react-query'
import { createLocaStorageExpenseRepository } from '../modules/Expense/infrastructure/LocalStorageExpenseRepository'
import { GroupService } from '../modules/Group/application/GroupService'
import { type Group } from '../modules/Group/domain/Group'
import { createLocaStorageGroupRepository } from '../modules/Group/infrastructure/LocalStorageGroupRepository'

const groupRepository = createLocaStorageGroupRepository()
const expenseRepository = createLocaStorageExpenseRepository()
const groupService = new GroupService(groupRepository, expenseRepository)

export const useRemoveGroup = (): { removeGroupMutation: UseMutationResult<void, Error, Group, unknown> } => {
  const queryClient = useQueryClient()

  const removeGroupMutation = useMutation({
    mutationFn: async (group: Group) => { await groupService.remove(group.id) },
    onSuccess: async () => { await queryClient.invalidateQueries({ queryKey: ['groups'] }) }
  })

  return { removeGroupMutation }
}
