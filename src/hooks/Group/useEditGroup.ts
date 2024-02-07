import { type UseMutationResult, useMutation, useQueryClient } from '@tanstack/react-query'
import { type Group } from '../../modules/Group/domain/Group'
import { createLocaStorageExpenseRepository } from '../../modules/Expense/infrastructure/LocalStorageExpenseRepository'
import { GroupService } from '../../modules/Group/application/GroupService'
import { createLocaStorageGroupRepository } from '../../modules/Group/infrastructure/LocalStorageGroupRepository'
import { useState } from 'react'

const groupRepository = createLocaStorageGroupRepository()
const expenseRepository = createLocaStorageExpenseRepository()
const groupService = new GroupService(groupRepository, expenseRepository)

interface UseEditGroup {
  isShowingFormEditGroup: boolean
  setIsShowingFormEditGroup: React.Dispatch<React.SetStateAction<boolean>>
  editGroupMutation: UseMutationResult<void, Error, Group, unknown>
}

export const useEditGroup = (): UseEditGroup => {
  const queryClient = useQueryClient()
  const [isShowingFormEditGroup, setIsShowingFormEditGroup] = useState<boolean>(false)

  const editGroupMutation = useMutation({
    mutationFn: async (group: Group) => { await groupService.edit(group) },
    onSuccess: async () => {
      setIsShowingFormEditGroup(false)
      await queryClient.invalidateQueries({ queryKey: ['group'] })
    }
  })

  return { isShowingFormEditGroup, setIsShowingFormEditGroup, editGroupMutation }
}
