import { Link } from 'wouter'
import { type FC } from 'react'
import { type Group } from '../../../modules/Group/domain/Group'
import { RemoveIcon } from '../../icons/Remove'
import './CardGroup.css'
import { UsersIcon } from '../../icons/UsersIcon'

interface CardGroupProps {
  group: Group
  // TODO: review type, promise or not?
  onRemoveGroup: (group: Group) => void
}

const CardGroup: FC<CardGroupProps> = ({ group, onRemoveGroup }) => {
  const linkTo = `group/${group?.id}`

  const handleRemoveGroup = (event: React.MouseEvent) => {
    event.stopPropagation()
    onRemoveGroup?.(group)
  }

  return (
    <Link href={linkTo} aria-label="Go to group page" data-testid="link-to-group">
      <div className='card-group' data-testid='card-group' >
        <div className='card-group-info'>
          <h2 className='card-group-info-name'>{group.name}</h2>
          <h5 className='card-group-info-description'>{group.description}</h5>
        </div>
        <div className='card-group-icons'>
          <span><strong data-testid={group.name + 'number-participants'}>{group.participants.length}</strong><UsersIcon /></span>
          <RemoveIcon onClick={handleRemoveGroup} data-testid="removeGroup"></RemoveIcon>
        </div>
      </div>
    </Link>
  )
}

export default CardGroup
