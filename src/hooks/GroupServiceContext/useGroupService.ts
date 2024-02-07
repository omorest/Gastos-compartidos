import { useContext } from 'react'
import { type GroupService } from '../../modules/Group/application/GroupService'
import { GroupServiceContext } from '../../context/GroupServiceContext'

export const useGroupService = (): GroupService => {
  const context = useContext(GroupServiceContext)
  if (!context) {
    throw new Error('useGroupService must be used within a GroupServiceProvider')
  }
  return context.groupService
}
