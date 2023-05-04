import { TextField } from '@mui/material'
import { FC, useContext } from 'react'
import { FormContext } from './Form'

interface Props {
  name: string
  label: string
  [key: string]: any // allow any other prop that is not explicitly defined
}

const Input: FC<Props> = (props: Props) => {
  const { name, label, ...rest } = props

  const formContext = useContext(FormContext)
  const { form, handleFormChange } = formContext

  return (
    <TextField
      label={label}
      type={name}
      name={name}
      id={name}
      placeholder={label}
      {...rest}
      value={form[name as keyof typeof form]}
      onChange={handleFormChange}
    />
  )
}

export default Input
