import React, { ChangeEvent, FC, ReactNode, useState } from 'react'

interface Props {
  children: ReactNode
  [key: string]: any // allow any other prop that is not explicitly defined
}

export const FormContext = React.createContext({
  form: {},
  handleFormChange: (event: ChangeEvent<HTMLInputElement>) => {},
})

const Form: FC<Props> = (props: Props) => {
  const { children, submit = () => {}, ...rest } = props

  const [form, setForm] = useState({})

  const handleFormChange = (event: ChangeEvent<HTMLInputElement>) => {
    // Get the name of the field that caused this change event
    // Get the new value of this field
    const { name, value } = event.target

    // Assign new value to the appropriate form field
    const updatedForm = {
      ...form,
      [name]: value,
    }

    console.log('Form changed: ', updatedForm)

    // Update state
    setForm(updatedForm)
  }

  return (
    <form>
      <FormContext.Provider
        value={{
          form,
          handleFormChange,
        }}>
        {children}
      </FormContext.Provider>
    </form>
  )
}

export default Form
