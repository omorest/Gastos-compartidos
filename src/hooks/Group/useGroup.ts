import { type UseQueryResult, useQuery } from '@tanstack/react-query'
import { type Group } from '../../modules/Group/domain/Group'
import { useGroupService } from '../GroupServiceContext/useGroupService'

export const useGroup = (groupId: string | undefined): UseQueryResult<Group | null, Error> => {
  const groupService = useGroupService()
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