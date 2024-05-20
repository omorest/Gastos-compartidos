import { type FC } from 'react'
import './LinkButton.css'

interface LinkButtonProps extends React.ComponentPropsWithoutRef<'a'> {}

const LinkButton: FC<LinkButtonProps> = (props) => {
  return (
    <a {...props} className='general-link-button'/>
  )
}

export default LinkButton
