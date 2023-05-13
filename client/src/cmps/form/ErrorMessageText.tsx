import { Typography } from '@mui/material'
import { FC } from 'react'

interface ErrorMessageTextProps {
  message: string
  errorTextStyle: any
}

const ErrorMessageText: FC<ErrorMessageTextProps> = ({
  message,
  errorTextStyle,
}) => {
  return (
    <Typography {...errorTextStyle} color='error'>
      {'* '}
      {message}
    </Typography>
  )
}

export default ErrorMessageText
