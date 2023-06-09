import { Button } from '@mui/material'
import { FC, useContext } from 'react'
import {
  MultistepFormContext,
  MultistepFormContextValue,
} from '../context/MultistepFormContext'
import { buttonStyle } from '../style/formStyle'

interface Props {
  children?: any
}

const NextButton: FC<Props> = (props: Props) => {
  const { children } = props

  const { goToNextStep } = useContext(
    MultistepFormContext
  ) as MultistepFormContextValue

  return (
    <Button
      variant='contained'
      type='button'
      sx={buttonStyle}
      onClick={() => {
        goToNextStep()
      }}>
      {children ? children : 'Next'}
    </Button>
  )
}

export default NextButton
