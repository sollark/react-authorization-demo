import { useMultistepForm } from '@/hooks/useMultistepForm'
import { FC, ReactElement } from 'react'

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

  const { step, steps, currentStep } = useMultistepForm([...children])
  return (
    <>
      {currentStep + 1} / {steps.length}
      {step}
      <div>
        {backButton}
        {nextButton}
      </div>
    </>
  )
}

export default MultistepForm
