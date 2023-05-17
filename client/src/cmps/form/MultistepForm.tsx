import { useMultistepForm } from '@/hooks/useMultistepForm'
import { ReactElement } from 'react'

interface MultistepFromProps {
  children: ReactElement[]
}

const MultistepForm = ({ children }: MultistepFromProps) => {
  console.log('MultistepForm connected')

  const { step, steps, currentStep } = useMultistepForm([...children])
  return (
    <>
      {currentStep + 1} / {steps.length}
      {step}
    </>
  )
}

export default MultistepForm
