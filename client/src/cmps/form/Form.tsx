import { Button } from '@mui/material'
import React, {
  ChangeEvent,
  FC,
  MouseEventHandler,
  ReactNode,
  useState,
} from 'react'

interface Props {
  children: ReactNode
  submit: (form: Object) => void
  [key: string]: any // allow any other prop that is not explicitly defined
}

export const FormContext = React.createContext({
  form: {},
  onFormChange: (event: ChangeEvent<HTMLInputElement>) => {},
})

const Form: FC<Props> = (props: Props) => {
  const { children, submit, ...rest } = props

  const [form, setForm] = useState({})

  const onFormChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target

    const updatedForm = {
      ...form,
      [name]: value,
    }
    setForm(updatedForm)

    console.log('Form changed: ', updatedForm)
  }

  const onSubmit: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.preventDefault()
    submit(form)
  }

  return (
    <form>
      <FormContext.Provider
        value={{
          form,
          onFormChange,
        }}>
        {children}
      </FormContext.Provider>
      <Button variant='contained' type='submit' onClick={onSubmit}>
        Registration
      </Button>
    </form>
  )
}

export default Form
