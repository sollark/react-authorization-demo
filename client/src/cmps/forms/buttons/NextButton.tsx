import { Button } from '@mui/material'
import { FC } from 'react'
import { buttonStyle } from '../style/formStyle'

interface Props {
  children?: any
  onClick: () => void
}

const NextButton: FC<Props> = (props: Props) => {
  const { children, onClick } = props

  return (
    <Button
      variant='contained'
      type='button'
      sx={buttonStyle}
      onClick={onClick}>
      {children ? children : 'Next'}
    </Button>
  )
}

export default NextButton
