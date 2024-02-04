import { type FC } from 'react'
import './InputText.css'

interface InputTextProps extends React.InputHTMLAttributes<HTMLInputElement> { }

export const InputText: FC<InputTextProps> = (props) => {
  return (
    <input type='text' {...props} />
  )
}
