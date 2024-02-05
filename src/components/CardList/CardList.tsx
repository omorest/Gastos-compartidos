import { type FC } from 'react'
import './CardList.css'

interface CardListProps {
  children: React.ReactNode
}

export const CardList: FC<CardListProps> = ({ children }) => {
  return (
    <div className='card-list'>
      {children}
    </div>
  )
}
