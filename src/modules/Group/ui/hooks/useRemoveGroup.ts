import { useMutation, useQueryClient, type UseMutationResult } from '@tanstack/react-query'
import { type Group } from '../../domain/Group'
import { useGroupService } from '../../../../hooks/GroupServiceContext/useGroupService'

export const useRemoveGroup = (): { removeGroupMutation: UseMutationResult<void, Error, Group, unknown> } => {
  const groupService = useGroupService()
  const queryClient = useQueryClient()

  const removeGroupMutation = useMutation({
    mutationFn: async (group: Group) => { await groupService.remove(group.id) },
    onSuccess: async () => { await queryClient.invalidateQueries({ queryKey: ['groups'] }) }
  })

  return { removeGroupMutation }
}
