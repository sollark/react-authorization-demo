import { zodResolver } from '@hookform/resolvers/zod'
import { FC, ReactNode } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import SubmitButton from './SubmitButton'

interface Props {
  children: ReactNode
  submit: (data: any) => void
  schema: any
  defaultValues?: any
  buttonText?: string
  [key: string]: any // allow any other prop that is not explicitly defined
}

const Form: FC<Props> = (props: Props) => {
  const {
    children,
    schema,
    defaultValues,
    submit,
    buttonText = 'Submit',
    ...rest
  } = props

  const methods = useForm({
    resolver: zodResolver(schema),
    defaultValues,
    criteriaMode: 'all',
    mode: 'onBlur',
  })
  const { handleSubmit } = methods

  const onSubmit = (data: any) => {
    console.log('Form - onSubmit', data)
    submit(data)
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} {...rest}>
        {children}
        <SubmitButton>{buttonText}</SubmitButton>
      </form>
    </FormProvider>
  )
}

export default Form
