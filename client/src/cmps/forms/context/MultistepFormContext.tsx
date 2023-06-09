import React, { createContext, ReactNode } from 'react'

type MultistepFormContextProps = {
  children: ReactNode
  goToNextStep: () => void
  goToPreviousStep: () => void
  submitForm: () => void
}

export interface MultistepFormContextValue {
  children: ReactNode
  goToNextStep: () => void
  goToPreviousStep: () => void
  submitForm: () => void
}

export const MultistepFormContext = createContext<
  MultistepFormContextValue | undefined
>(undefined)

export const MultistepFormProvider = ({
  children,
  goToNextStep,
  goToPreviousStep,
  submitForm,
}: MultistepFormContextProps) => {
  const contextValue: MultistepFormContextValue = {
    children,
    goToNextStep,
    goToPreviousStep,
    submitForm,
  }

  return (
    <MultistepFormContext.Provider value={contextValue}>
      {children}
    </MultistepFormContext.Provider>
  )
}
