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

const BackButton: FC<Props> = (props: Props) => {
  const { children } = props

  const { goToPreviousStep } = useContext(
    MultistepFormContext
  ) as MultistepFormContextValue

  return (
    <Button
      variant='contained'
      type='button'
      sx={buttonStyle}
      onClick={() => {
        goToPreviousStep()
      }}>
      {children ? children : 'Back'}
    </Button>
  )
}

export default BackButton
