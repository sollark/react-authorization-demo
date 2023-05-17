import { Button } from '@mui/material'
import { FC } from 'react'
import { buttonStyle } from '../formStyle'

interface Props {
  children?: any
}

const BackButton: FC<Props> = (props: Props) => {
  const { children } = props
  return (
    <Button variant='contained' type='submit' sx={buttonStyle}>
      {children ? children : 'Back'}
    </Button>
  )
}

export default BackButton
