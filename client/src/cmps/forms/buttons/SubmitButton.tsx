import { Button } from '@mui/material'
import { FC } from 'react'
import { buttonStyle } from '../style/formStyle'

interface Props {
  children?: any
  onClick?: () => void
}

const SubmitButton: FC<Props> = (props: Props) => {
  const { children, onClick } = props
  return (
    <Button
      variant='contained'
      type='submit'
      sx={buttonStyle}
      // onClick={onClick}
    >
      {children ? children : 'Submit'}
    </Button>
  )
}

export default SubmitButton
