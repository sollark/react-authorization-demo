import { FC, ReactElement } from 'react'
import MultistepForm from './MultistepForm'
import BackButton from './buttons/BackButton'
import NextButton from './buttons/NextButton'
import SubmitButton from './buttons/SubmitButton'
import { AccountSchema } from '@/models/Account'

interface Props {
  children: ReactElement[]
  [key: string]: any // allow any other prop that is not explicitly defined
}

const AccountForm: FC<Props> = (props: Props) => {
  const { children } = props

  const defaultValues = {
    firstName: '',
    lastName: '',
    organization: '',
  }

  async function submit(form: Object) {
    console.log('Account form submitted: ', form)
  }

  return (
    <MultistepForm
      schema={AccountSchema}
      defaultValues={defaultValues}
      backButton={<BackButton />}
      nextButton={<NextButton />}
      submitButton={<SubmitButton />}
      submit={submit}>
      {children}
    </MultistepForm>
  )
}

export default AccountForm
