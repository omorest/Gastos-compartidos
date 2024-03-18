import { useMutation, useQueryClient, type UseMutationResult } from '@tanstack/react-query'
import { type Group } from '../../domain/Group'
import { useCasesGroup } from './useCasesGroup'

export const useRemoveGroup = (): { removeGroupMutation: UseMutationResult<void, Error, Group, unknown> } => {
  const { removeGroupCommand } = useCasesGroup()
  const queryClient = useQueryClient()

  const removeGroupMutation = useMutation({
    mutationFn: async (group: Group) => { await removeGroupCommand.execute(group.id) },
    onSuccess: async () => { await queryClient.invalidateQueries({ queryKey: ['groups'] }) }
  })

  return { removeGroupMutation }
}
