import { type UseQueryResult, useQuery } from '@tanstack/react-query'
import { type Group } from '../../domain/Group'
import { useGroupService } from '../../../../hooks/GroupServiceContext/useGroupService'

export const useGroups = (): UseQueryResult<Group[], Error> => {
  console.log('holaa')
  const groupService = useGroupService()
  const query = useQuery({
    queryKey: ['groups'],
    queryFn: async () => {
      const groups = await groupService.getAll()
      console.log({ groups })
      return groups
    }
  })

  return query
}
