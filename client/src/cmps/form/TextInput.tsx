import { ErrorMessage } from '@hookform/error-message'
import { TextField } from '@mui/material'
import { ChangeEvent, FC } from 'react'
import { useFormContext } from 'react-hook-form'
import ErrorMessageText from './ErrorMessageText'
import { errorTextStyle, textInputStyle } from './formStyle'

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
    register,
    setValue,
    getValues,
    formState: { errors },
  } = useFormContext()

  const formValues = getValues()

  //update the value in the form and validate it
  function onChange(e: ChangeEvent<HTMLInputElement>) {
    setValue(name, e.target.value, { shouldValidate: true })
  }

  return (
    <>
      <TextField
        {...register(name)}
        type={type}
        label={label}
        name={name}
        id={name}
        placeholder={label}
        value={formValues[name]}
        onChange={onChange}
        {...textInputStyle}
        {...rest}
      />

      <ErrorMessage
        errors={errors}
        name={name}
        render={({ message }) => (
          <ErrorMessageText errorTextStyle={errorTextStyle} message={message} />
        )}
      />
    </>
  )
}

export default Input
