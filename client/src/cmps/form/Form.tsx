import { zodResolver } from '@hookform/resolvers/zod'
import { FC, ReactElement, ReactNode } from 'react'
import { FormProvider, useForm } from 'react-hook-form'

interface Props {
  children: ReactElement
  submit: (data: any) => void
  schema: any
  defaultValues?: any
  submitButton?: ReactElement
  [key: string]: any // allow any other prop that is not explicitly defined
}

const Form: FC<Props> = (props: Props) => {
  console.log('Form connected')

  const { children, schema, defaultValues, submit, submitButton, ...rest } =
    props

  const methods = useForm({
    resolver: zodResolver(schema),
    defaultValues,
    criteriaMode: 'all',
    mode: 'onBlur',
    reValidateMode: 'onBlur',
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
        {submitButton ? submitButton : null}
      </form>
    </FormProvider>
  )
}

export default Form
