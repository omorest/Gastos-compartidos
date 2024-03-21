import { type UseQueryResult, useQuery } from '@tanstack/react-query'
import { type Group } from '../../domain/Group'
import { useCasesGroup } from './useCasesGroup'
import { type ValidQueryKeys } from '../../../../types.queries'

export const useGroups = (): UseQueryResult<Group[], Error> => {
  const { getAllGroupsQuery } = useCasesGroup()
  const query = useQuery({
    queryKey: ['groups'] as ValidQueryKeys[],
    queryFn: async () => {
      const groups = await getAllGroupsQuery.execute()
      return groups
    }
  })

  return query
}
