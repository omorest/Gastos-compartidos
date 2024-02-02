import { Link } from 'wouter'
import { ChevronRight } from '../icons/ChevronRight'
import './CardGroup.css'
import { type FC } from 'react'
import { type Group } from '../../Group/domain/Group'

interface CardGroupProps {
  group: Group
}

const CardGroup: FC<CardGroupProps> = ({ group }) => {
  const linkTo = `groupExpenses/${group?.id}`

  return (
    <Link href={linkTo}>
      <div className='card-group'>
        <div className='card-group-info'>
          <h2 className='card-group-info-name'>Bilbo</h2>
          <h5 className='card-group-info-description'>Viaje Bilbao</h5>
        </div>
        <div>
          <ChevronRight></ChevronRight>
        </div>
      </div>
    </Link>
  )
}

export default CardGroup
