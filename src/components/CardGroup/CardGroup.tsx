import { Link } from 'wouter'
import { ChevronRight } from '../icons/ChevronRight'
import { type FC } from 'react'
import { type Group } from '../../Group/domain/Group'
import { RemoveIcon } from '../icons/Remove'
import './CardGroup.css'

interface CardGroupProps {
  group: Group
  onRemoveGroup: (group: Group) => Promise<void>
}

const CardGroup: FC<CardGroupProps> = ({ group, onRemoveGroup }) => {
  const linkTo = `groupExpenses/${group?.id}`

  const handleRemoveGroup = async (event: React.MouseEvent) => {
    event.stopPropagation()
    await onRemoveGroup?.(group)
  }

  return (
    <Link href={linkTo}>
      <div className='card-group'>
        <div className='card-group-info'>
          <h2 className='card-group-info-name'>{group.name}</h2>
          <h5 className='card-group-info-description'>{group.description}</h5>
        </div>
        <div className='card-group-icons'>
          <ChevronRight></ChevronRight>
          <RemoveIcon onClick={handleRemoveGroup}></RemoveIcon>
        </div>
      </div>
    </Link>
  )
}

export default CardGroup
