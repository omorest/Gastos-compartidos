import { type UseQueryResult, useQuery } from '@tanstack/react-query'
import { type Group } from '../../domain/Group'
import { useCasesGroup } from './useCasesGroup'

export const useGroups = (): UseQueryResult<Group[], Error> => {
  const { getAllGroupsQuery } = useCasesGroup()
  const query = useQuery({
    queryKey: ['groups'],
    queryFn: async () => {
      const groups = await getAllGroupsQuery.execute()
      return groups
    }
  })

  return query
}
