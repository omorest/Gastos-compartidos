import { type UseQueryResult, useQuery } from '@tanstack/react-query'
import { type Group } from '../../domain/Group'
import { useCasesGroup } from './useCasesGroup'
import { type ValidQueryKeys } from '../../../../types.queries'

export const useGroup = (groupId: string | undefined): UseQueryResult<Group | null, Error> => {
  const { getGroupByIdQuery } = useCasesGroup()

  const query = useQuery({
    queryKey: ['group'] as ValidQueryKeys[],
    queryFn: async () => {
      if (groupId) {
        return await getGroupByIdQuery.execute(groupId)
      } else {
        throw new Error('No group id')
      }
    }
  })
  return query
}
