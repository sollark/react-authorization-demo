import { ErrorMessage } from '@hookform/error-message'
import { TextField } from '@mui/material'
import { FC } from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import { textInputStyle } from './formStyle'

interface Props {
  name: string
  type: string
  label: string
  [key: string]: any // allow any other prop that is not explicitly defined
}

const Input: FC<Props> = (props: Props) => {
  const { type, label, name, ...rest } = props

  //get methods from useFormContext
  const {
    formState: { errors },
    control,
  } = useFormContext()

  return (
    <>
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <TextField
            {...field}
            type={type}
            label={label}
            id={name}
            placeholder={label}
            error={!!errors[name]}
            helperText={
              <ErrorMessage
                name={name}
                message={('* ' + errors[name]?.message) as string}
              />
            }
            {...textInputStyle}
            {...rest}
          />
        )}
      />
    </>
  )
}

export default Input
