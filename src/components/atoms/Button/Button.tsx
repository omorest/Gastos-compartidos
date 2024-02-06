import { type FC } from 'react'
import './Button.css'

interface ButtonProps extends React.ComponentPropsWithoutRef<'button'> {}

const Button: FC<ButtonProps> = (props) => {
  return (
    <button {...props} className='general-button'/>
  )
}

export default Button
