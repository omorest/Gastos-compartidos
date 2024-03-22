import { type UseMutationResult, useMutation, useQueryClient } from '@tanstack/react-query'
import { type Group } from '../../domain/Group'
import { useCasesGroup } from './useCasesGroup'
import toast from 'react-hot-toast'
import { navigate } from 'wouter/use-location'

interface UseEditGroup {
  editGroupMutation: UseMutationResult<void, Error, Group, unknown>
}

export const useEditGroup = (groupId: string): UseEditGroup => {
  const { editGroupCommand } = useCasesGroup()
  const queryClient = useQueryClient()

  const editGroupMutation = useMutation({
    mutationFn: async (group: Group) => { await editGroupCommand.execute(group) },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['group'] })
      toast.success('Grupo editado correctamente')
      navigate(`/group/${groupId}`)
    },
    onError: (error) => {
      toast.error(error.message)
    }
  })

  return { editGroupMutation }
}
