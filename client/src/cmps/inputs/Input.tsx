import { TextField } from '@mui/material'

interface Props {
  name: string
  label: string
  [key: string]: any // allow any other prop that is not explicitly defined
}

export default function Input(props: Props) {
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
