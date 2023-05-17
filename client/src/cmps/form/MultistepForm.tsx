import { useMultistepForm } from '@/hooks/useMultistepForm'
import { FC, ReactElement } from 'react'

interface Props {
  children: ReactElement[]
  submit: (data: any) => void
  nextButton: ReactElement
  prevButton: ReactElement
  // schema: any
  // defaultValues?: any
  buttonText?: string
  [key: string]: any // allow any other prop that is not explicitly defined
}

const MultistepForm: FC<Props> = (props: Props) => {
  console.log('MultistepForm connected')

  const {
    children,
    // schema,
    // defaultValues,
    nextButton,
    prevButton,
    submit,
    buttonText = 'Submit',
  } = props

  const { step, steps, currentStep } = useMultistepForm([...children])
  return (
    <>
      {currentStep + 1} / {steps.length}
      {step}
      <div>
        {/* <button onClick={step.prev}>Prev</button>
        <button onClick={step.next}>Next</button> */}
        {nextButton}
        {prevButton}
      </div>
    </>
  )
}

export default MultistepForm
