import { Button } from '@mui/material'
import { FC } from 'react'
import { buttonStyle } from '../style/formStyle'

interface Props {
  children?: any
}

const NextButton: FC<Props> = (props: Props) => {
  const { children } = props
  return (
    <Button variant='contained' type='submit' sx={buttonStyle}>
      {children ? children : 'Next'}
    </Button>
  )
}

export default NextButton
