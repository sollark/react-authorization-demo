import { AccountSchema } from '@/models/Account'
import { accountService } from '@/service/account.service'
import { FC, ReactElement } from 'react'
import MultistepForm from './MultistepForm'
import { useNavigate } from '@tanstack/router'

interface Props {
  children: ReactElement[]
  [key: string]: any // allow any other prop that is not explicitly defined
}

const AccountForm: FC<Props> = (props: Props) => {
  const { children } = props
  const navigate = useNavigate()

  const defaultValues = {
    firstName: '',
    lastName: '',
    organization: '',
  }

  async function submit(form: any) {
    console.log('Account form submitted: ', form)

    let response = null
    // if organization is not a number, it means it is a new organization name
    if (isNaN(form.organization))
      response = await accountService.update(
        form.firstName,
        form.lastName,
        form.organization
      )
    // else it is an existing organization code
    else
      response = await accountService.update(
        form.firstName,
        form.lastName,
        undefined,
        form.organization
      )

    console.log('Account form response: ', response)

    const { account } = response as any

    if (account.isComplete) navigate({ to: '/' })
  }

  return (
    <MultistepForm
      schema={AccountSchema}
      defaultValues={defaultValues}
      submit={submit}>
      {children}
    </MultistepForm>
  )
}

export default AccountForm
