import { type UseMutationResult, useMutation, useQueryClient } from '@tanstack/react-query'
import { type Group } from '../../modules/Group/domain/Group'
import { useState } from 'react'
import { useGroupService } from '../GroupServiceContext/useGroupService'

interface UseEditGroup {
  isShowingFormEditGroup: boolean
  setIsShowingFormEditGroup: React.Dispatch<React.SetStateAction<boolean>>
  editGroupMutation: UseMutationResult<void, Error, Group, unknown>
}

export const useEditGroup = (): UseEditGroup => {
  const groupService = useGroupService()
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
