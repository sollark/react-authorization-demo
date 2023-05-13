import { Button } from '@mui/material'
import { FC } from 'react'

interface Props {
  children?: any
}

const SubmitButton: FC<Props> = (props: Props) => {
  const { children } = props
  return (
    <Button variant='contained' type='submit' sx={{ marginTop: '1.5rem' }}>
      {children ? children : 'Submit'}
    </Button>
  )
}

export default SubmitButton
