import { useMultistepForm } from '@/hooks/useMultistepForm'
import { zodResolver } from '@hookform/resolvers/zod'
import { FC, ReactElement } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { MultistepFormProvider } from './context/MultistepFormContext'
import BackButton from './buttons/BackButton'
import SubmitButton from './buttons/SubmitButton'
import NextButton from './buttons/NextButton'
import { isEmptyObject } from '@/service/utils.service'

interface Props {
  children: ReactElement[]
  schema: any
  defaultValues: any
  submit: (data: any) => void
  [key: string]: any // allow any other prop that is not explicitly defined
}

const MultistepForm: FC<Props> = (props: Props) => {
  console.log('MultistepForm connected')

  const { children, schema, defaultValues, submit, ...rest } = props

  const methods = useForm({
    resolver: zodResolver(schema),
    defaultValues,
    criteriaMode: 'all',
    mode: 'onBlur',
    reValidateMode: 'onBlur',
  })

  const {
    handleSubmit,
    formState: { errors },
  } = methods

  const onSubmit = (data: any) => {
    submit(data)
  }

  const { step, steps, back, next, currentStepIndex, isFirstStep, isLastStep } =
    useMultistepForm([...children])

  return (
    <FormProvider {...methods}>
      <MultistepFormProvider goToPreviousStep={back} goToNextStep={next}>
        <form onSubmit={handleSubmit(onSubmit)} {...rest}>
          {currentStepIndex + 1} / {steps.length}
          {step}
          <div>
            {isFirstStep ? null : <BackButton onClick={back} />}
            {isLastStep ? (
              <SubmitButton />
            ) : (
              <NextButton
                onClick={() => {
                  if (isEmptyObject(errors)) next()
                }}
              />
            )}
          </div>
        </form>
      </MultistepFormProvider>
    </FormProvider>
  )
}

export default MultistepForm
