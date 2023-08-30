import { CompanySchema } from '@/models/Company'
import { UserDetailsSchema } from '@/models/Profile'
import { accountService } from '@/service/account.service'
import useUserStore from '@/stores/profileStore'
import { useNavigate } from '@tanstack/router'
import { FC, ReactElement } from 'react'
import { z } from 'zod'
import MultistepForm from '../MultistepForm'

interface Props {
  children: ReactElement[]
  [key: string]: any // allow any other prop that is not explicitly defined
}

const AccountSchema = z.object({}).merge(UserDetailsSchema).merge(CompanySchema)

const AccountForm: FC<Props> = (props: Props) => {
  const { children } = props
  const navigate = useNavigate()

  const user = useUserStore((state) => state.user)

  const defaultValues = {
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    company: '',
  }

  async function submit(form: any) {
    console.log('Account form submitted: ', form)

    let account = null
    // if company input is not a number, create a new company
    if (isNaN(form.company))
      account = await accountService.updateAccount(
        form.firstName,
        form.lastName,
        form.company
      )
    // else it is an existing company code
    else
      account = await accountService.updateAccount(
        form.firstName,
        form.lastName,
        undefined,
        form.company
      )

    console.log('Account form account: ', account)

    if (account?.isComplete) navigate({ to: '/' })
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
