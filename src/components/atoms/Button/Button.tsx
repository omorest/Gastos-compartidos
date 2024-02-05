import { type FC } from 'react'

interface ButtonProps extends React.ComponentPropsWithoutRef<'button'> {}

const Button: FC<ButtonProps> = (props) => {
  return (
    <button {...props} />
  )
}

export default Button
