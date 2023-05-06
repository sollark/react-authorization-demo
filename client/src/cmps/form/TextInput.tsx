import { TextField } from '@mui/material'
import { FC, useContext } from 'react'
import { FormContext } from './Form'
import { textInputStyle } from './textInputStyle'

interface Props {
  name: string
  label: string
  initialValue?: string
  [key: string]: any // allow any other prop that is not explicitly defined
}

const Input: FC<Props> = (props: Props) => {
  const { name, label, initialValue = '', ...rest } = props

  const formContext = useContext(FormContext)
  const { form, onFormChange } = formContext

  return (
    <TextField
      label={label}
      type={name}
      name={name}
      id={name}
      placeholder={label}
      {...rest}
      {...textInputStyle}
      value={form[name as keyof typeof form] || initialValue}
      onChange={onFormChange}
    />
  )
}

export default Input
