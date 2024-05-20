import { type UseMutationResult, useMutation, useQueryClient } from '@tanstack/react-query'
import { generateID } from '../../../../core/utils/generateId'
import { type Group } from '../../domain/Group'
import { useCasesGroup } from './useCasesGroup'
import toast from 'react-hot-toast'
import { navigate } from 'wouter/use-location'

interface UseCreateGroupResult {
  createNewGroupMutation: UseMutationResult<Group, Error, Group, unknown>
}

export const useCreateGroup = (): UseCreateGroupResult => {
  const { createGroupCommand } = useCasesGroup()
  const queryClient = useQueryClient()

  const createNewGroupMutation = useMutation({
    mutationFn: async (newGroup: Group) => await createGroupCommand.execute({ ...newGroup, id: generateID() }),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['groups'] })
      toast.success('Grupo creado')
      navigate('/')
    },
    onError: (error) => {
      toast.error(error.message)
    }
  })

  return { createNewGroupMutation }
}
