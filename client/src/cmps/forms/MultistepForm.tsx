import { useMultistepForm } from '@/hooks/useMultistepForm'
import { zodResolver } from '@hookform/resolvers/zod'
import { FC, ReactElement } from 'react'
import { FormProvider, useForm } from 'react-hook-form'

interface Props {
  children: ReactElement[]
  schema: any
  submit: (data: any) => void
  nextButton: ReactElement
  backButton: ReactElement
  submitButton: ReactElement
  [key: string]: any // allow any other prop that is not explicitly defined
}

const MultistepForm: FC<Props> = (props: Props) => {
  console.log('MultistepForm connected')

  const {
    children,
    schema,
    nextButton,
    backButton,
    submitButton,
    submit,
    ...rest
  } = props

  const methods = useForm({
    // resolver: zodResolver(schema),
    // defaultValues,
    criteriaMode: 'all',
    mode: 'onBlur',
    reValidateMode: 'onBlur',
  })

  const { handleSubmit } = methods

  const onSubmit = (data: any) => {
    console.log('MultipleStep Form - onSubmit', data)
    // next()
    // submit(data)
  }

  const { step, steps, back, next, currentStepIndex, isFirstStep, isLastStep } =
    useMultistepForm([...children])

  console.log(nextButton)
  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} {...rest}>
        {currentStepIndex + 1} / {steps.length}
        {step}
        <div>
          {isFirstStep ? null : backButton}
          {isLastStep ? submitButton : nextButton}
        </div>
      </form>
    </FormProvider>
  )
}

export default MultistepForm
