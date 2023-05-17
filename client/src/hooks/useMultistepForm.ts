import { ReactElement, useState } from 'react'

export function useMultistepForm(steps: ReactElement[]): {
  currentStep: number
  step: ReactElement
  next: () => void
  back: () => void
  goTo: (step: number) => void
} {
  const [currentStep, setCurrentStep] = useState(0)

  function next(): void {
    if (currentStep < steps.length - 1) setCurrentStep((prev) => prev + 1)
  }
  function back(): void {
    if (currentStep > 0) setCurrentStep((prev) => prev - 1)
  }
  function goTo(step: number): void {
    setCurrentStep(step)
  }
  return { currentStep, step: steps[currentStep], next, back, goTo }
}
