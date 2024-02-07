import { type UseQueryResult, useQuery } from '@tanstack/react-query'
import { type Group } from '../../modules/Group/domain/Group'
import { useGroupService } from '../GroupServiceContext/useGroupService'

export const useGroups = (): UseQueryResult<Group[], Error> => {
  const groupService = useGroupService()
  const query = useQuery({
    queryKey: ['groups'],
    queryFn: async () => await groupService.getAll()
  })

  return query
}
