import { navigate } from 'wouter/use-location'
import { FormEditGroup } from '../../modules/Group/ui/components/FormEditGroup/FormEditGroup'
import { useEditGroup, useGroup } from '../../modules/Group/ui/hooks'
import { useParams } from 'wouter'

const EditGroup = () => {
  const params = useParams()
  const { data: group } = useGroup(params.id)
  const { editGroupMutation } = useEditGroup(group?.id ?? '')

  if (!group) {
    return <p>No se puede acceder al grupo</p>
  }

  return <FormEditGroup
    group={group}
    onEditGroup={editGroupMutation.mutate}
    onCancel={() => { navigate(`/group/${group.id}`) }}
  />
}

export default EditGroup
