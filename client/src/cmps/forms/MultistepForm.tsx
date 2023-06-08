import { useMultistepForm } from '@/hooks/useMultistepForm'
import { FC, ReactElement } from 'react'
import { FormProvider, useForm } from 'react-hook-form'

interface Props {
  children: ReactElement[]
  submit: (data: any) => void
  nextButton: ReactElement
  backButton: ReactElement
  [key: string]: any // allow any other prop that is not explicitly defined
}

const MultistepForm: FC<Props> = (props: Props) => {
  console.log('MultistepForm connected')

  const { children, nextButton, backButton, submit } = props

  const methods = useForm({
    // resolver: zodResolver(schema),
    // defaultValues,
    criteriaMode: 'all',
    mode: 'onBlur',
    reValidateMode: 'onBlur',
  })

  const { step, steps, currentStep } = useMultistepForm([...children])

  return (
    <FormProvider {...methods}>
      {currentStep + 1} / {steps.length}
      {step}
      <div>
        {backButton}
        {nextButton}
      </div>
    </FormProvider>
  )
}

export default MultistepForm
