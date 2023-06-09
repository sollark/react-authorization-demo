import { Button } from '@mui/material'
import { FC } from 'react'
import { buttonStyle } from '../style/formStyle'

interface Props {
  children?: any
  onClick?: () => void
}

const BackButton: FC<Props> = (props: Props) => {
  const { children, onClick } = props
  return (
    <Button
      variant='contained'
      type='button'
      sx={buttonStyle}
      // onClick={onClick}
    >
      {children ? children : 'Back'}
    </Button>
  )
}

export default BackButton
