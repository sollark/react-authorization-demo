import { FC, ReactElement } from 'react'
import MultistepForm from './MultistepForm'
import BackButton from './buttons/BackButton'
import NextButton from './buttons/NextButton'

interface Props {
  children: ReactElement[]
  [key: string]: any // allow any other prop that is not explicitly defined
}

const AccountForm: FC<Props> = (props: Props) => {
  const { children } = props

  function submit(data: any) {
    console.log('AccountForm - onSubmit', data)
  }

  return (
    <MultistepForm
      nextButton={<NextButton />}
      backButton={<BackButton />}
      submit={submit}>
      {children}
    </MultistepForm>
  )
}

export default AccountForm
