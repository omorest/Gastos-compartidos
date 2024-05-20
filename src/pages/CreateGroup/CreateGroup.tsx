import { navigate } from 'wouter/use-location'
import { FormNewGroup } from '../../modules/Group/ui/components/FormNewGroup/FormNewGroup'
import { useCreateGroup } from '../../modules/Group/ui/hooks'

const CreateGroup = () => {
  const { createNewGroupMutation } = useCreateGroup()
  return <FormNewGroup
    onSave={createNewGroupMutation.mutate}
    onCancel={() => { navigate('/') }}
  />
}

export default CreateGroup
