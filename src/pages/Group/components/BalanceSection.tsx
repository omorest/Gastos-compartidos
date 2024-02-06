import { type FC } from 'react'
import { type GroupService } from '../../../modules/Group/application/GroupService'
import { type Group } from '../../../modules/Group/domain/Group'
import './BalanceSection.css'

interface BalanceSectionProps {
  group: Group
  groupService: GroupService
}

export const BalanceSection: FC<BalanceSectionProps> = ({ group, groupService }) => {
  return (
    <section className="balance-section">
      <div className="balance-section-column">
        <span>Usuario</span>
        <div className='balance-section-list'>
          {
            group?.participants.map((participant) => (
              <span key={participant.id}>{participant.name}</span>
            ))
          }
        </div>
      </div>
      <div className="balance-section-column">
        <span>Balance</span>
        <div className='balance-section-list'>
          {
            group?.participants.map((participant) => (
              <span key={participant.id}>+12$</span>
            ))
          }
        </div>
      </div>

    </section>
  )
}
