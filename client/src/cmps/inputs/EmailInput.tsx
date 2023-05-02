import Input from './Input'

interface Props {
  [key: string]: any // allow any other prop that is not explicitly defined
}

export default function EmailInput(props: Props) {
  const label = 'Email'
  const name = 'email'
  return <Input name={name} label={label} {...props} />
}
