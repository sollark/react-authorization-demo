import { ReactElement, useState } from 'react'

export function useMultistepForm(steps: ReactElement[]): {
  currentStepIndex: number
  step: ReactElement
  steps: ReactElement[]
  next: () => void
  back: () => void
  goTo: (stepIndex: number) => void
} {
  const [currentStepIndex, setCurrentStepIndex] = useState(0)

  function next(): void {
    if (currentStepIndex < steps.length - 1)
      setCurrentStepIndex((prev) => prev + 1)
  }

  function back(): void {
    if (currentStepIndex > 0) setCurrentStepIndex((prev) => prev - 1)
  }

  function goTo(stepIndex: number): void {
    setCurrentStepIndex(stepIndex)
  }

  return {
    currentStepIndex,
    step: steps[currentStepIndex],
    steps,
    next,
    back,
    goTo,
  }
}
