import { ChevronRight } from '../icons/ChevronRight'
import './CardGroup.css'

const CardGroup = () => {
  return (
    <div className='card-group'>
      <div className='card-group-info'>
        <h2 className='card-group-info-name'>Bilbo</h2>
        <h5 className='card-group-info-description'>Viaje Bilbao</h5>
      </div>
      <div>
        <ChevronRight></ChevronRight>
      </div>
    </div>
  )
}

export default CardGroup
