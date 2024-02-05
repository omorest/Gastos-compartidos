import './InputText.css'

import { type FC, forwardRef, type InputHTMLAttributes } from 'react'

interface InputTextProps extends InputHTMLAttributes<HTMLInputElement> {}

export const InputText: FC<InputTextProps> = forwardRef<HTMLInputElement, InputTextProps>((props, ref) => {
  return (
    <input type='text' {...props} ref={ref} />
  )
})

InputText.displayName = 'InputText'
