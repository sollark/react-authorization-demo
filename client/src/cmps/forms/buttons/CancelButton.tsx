import SecondaryButton from '@/cmps/button/SecondaryButton'
import { FC } from 'react'
import { buttonStyle } from '../style/formStyle'

interface Props {
  children?: any
  onClick: () => void
}

const CancelButton: FC<Props> = (props: Props) => {
  const { children, onClick } = props

  return (
    <SecondaryButton
      variant='contained'
      type='button'
      sx={buttonStyle}
      onClick={onClick}>
      {children ? children : 'Cancel'}
    </SecondaryButton>
  )
}

export default CancelButton
