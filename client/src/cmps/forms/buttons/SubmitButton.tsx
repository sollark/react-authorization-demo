import AccentButton from '@/cmps/button/AccentButton'
import { FC } from 'react'
import { buttonStyle } from '../style/formStyle'

interface Props {
  children?: any
}

const SubmitButton: FC<Props> = (props: Props) => {
  const { children } = props

  return (
    <AccentButton variant='contained' type='submit' sx={buttonStyle}>
      {children ? children : 'Submit'}
    </AccentButton>
  )
}

export default SubmitButton
