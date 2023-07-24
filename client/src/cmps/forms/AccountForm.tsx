import { OrganizationSchema } from '@/models/Organization'
import { UserDetailsSchema } from '@/models/User'
import { accountService } from '@/service/account.service'
import useUserStore from '@/stores/userStore'
import { useNavigate } from '@tanstack/router'
import { FC, ReactElement } from 'react'
import { z } from 'zod'
import MultistepForm from './MultistepForm'

interface Props {
  children: ReactElement[]
  [key: string]: any // allow any other prop that is not explicitly defined
}

const AccountSchema = z
  .object({})
  .merge(UserDetailsSchema)
  .merge(OrganizationSchema)

const AccountForm: FC<Props> = (props: Props) => {
  const { children } = props
  const navigate = useNavigate()

  const user = useUserStore((state) => state.user)
  // const organization = useOrganizationStore((state) => state.organization)

  const defaultValues = {
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    organization: '',
  }

  async function submit(form: any) {
    console.log('Account form submitted: ', form)

    let account = null
    // if organization input is not a number, create a new organization
    if (isNaN(form.organization))
      account = await accountService.updateAccount(
        form.firstName,
        form.lastName,
        form.organization
      )
    // else it is an existing organization code
    else
      account = await accountService.updateAccount(
        form.firstName,
        form.lastName,
        undefined,
        form.organization
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
