import { TextField } from '@mui/material'
import { FC } from 'react'

interface Props {
  name: string
  label: string
  [key: string]: any // allow any other prop that is not explicitly defined
}

const Input: FC<Props> = (props: Props) => {
  const { name, label, ...rest } = props
  return (
    <TextField
      label={label}
      type={name}
      name={name}
      id={name}
      placeholder={label}
      {...rest}
    />
  )
}

export default Input
