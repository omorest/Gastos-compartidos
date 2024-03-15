import { type UseMutationResult, useMutation, useQueryClient } from '@tanstack/react-query'
import { generateID } from '../../../../core/utils/generateId'
import { type Group } from '../../domain/Group'
import { useState } from 'react'
import { useCasesGroup } from './useCasesGroup'

interface UseCreateGroupResult {
  isShowingCreateGroupForm: boolean
  setIsShowingCreateGroupForm: React.Dispatch<React.SetStateAction<boolean>>
  createNewGroupMutation: UseMutationResult<Group, Error, Group, unknown>
}

export const useCreateGroup = (): UseCreateGroupResult => {
  const { createGroupCommand } = useCasesGroup()
  const [isShowingCreateGroupForm, setIsShowingCreateGroupForm] = useState<boolean>(false)
  const queryClient = useQueryClient()

  const createNewGroupMutation = useMutation({
    mutationFn: async (newGroup: Group) => await createGroupCommand.execute({ ...newGroup, id: generateID() }),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['groups'] })
      setIsShowingCreateGroupForm(false)
    }
  })

  return { isShowingCreateGroupForm, setIsShowingCreateGroupForm, createNewGroupMutation }
}
