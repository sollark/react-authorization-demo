import { ErrorMessage } from '@hookform/error-message'
import { TextField } from '@mui/material'
import { ChangeEvent, FC } from 'react'
import { useFormContext } from 'react-hook-form'
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
    register,
    setValue,
    getValues,
    formState: { errors },
    trigger,
  } = useFormContext()

  const formValues = getValues()

  //update the value in the form and validate it
  function onChange(e: ChangeEvent<HTMLInputElement>) {
    setValue(name, e.target.value, { shouldValidate: false })
    trigger(name)
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
    </>
  )
}

export default Input
