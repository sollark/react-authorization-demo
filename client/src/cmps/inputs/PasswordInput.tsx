import Input from '@/cmps/inputs/Input'

interface Props {
  [key: string]: any // allow any other prop that is not explicitly defined
}

export default function PasswordInput(props: Props) {
  const label = 'Password'
  const name = 'password'
  return <Input name={name} label={label} {...props} />
}
