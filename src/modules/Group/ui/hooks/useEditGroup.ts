import { type UseMutationResult, useMutation, useQueryClient } from '@tanstack/react-query'
import { type Group } from '../../domain/Group'
import { useState } from 'react'
import { useCasesGroup } from './useCasesGroup'

interface UseEditGroup {
  isShowingFormEditGroup: boolean
  setIsShowingFormEditGroup: React.Dispatch<React.SetStateAction<boolean>>
  editGroupMutation: UseMutationResult<void, Error, Group, unknown>
}

export const useEditGroup = (): UseEditGroup => {
  const { editGroupCommand } = useCasesGroup()
  const queryClient = useQueryClient()
  const [isShowingFormEditGroup, setIsShowingFormEditGroup] = useState<boolean>(false)

  const editGroupMutation = useMutation({
    mutationFn: async (group: Group) => { await editGroupCommand.execute(group) },
    onSuccess: async () => {
      setIsShowingFormEditGroup(false)
      await queryClient.invalidateQueries({ queryKey: ['group'] })
    }
  })

  return { isShowingFormEditGroup, setIsShowingFormEditGroup, editGroupMutation }
}
