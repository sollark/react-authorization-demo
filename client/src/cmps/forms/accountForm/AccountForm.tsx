import { CompanySchema } from '@/models/Company'
import { ProfileDetailsSchema } from '@/models/Profile'
import { accountService } from '@/service/account.service'
import useUserStore from '@/stores/userStore'
import { useNavigate } from '@tanstack/router'
import { FC, ReactElement } from 'react'
import { z } from 'zod'
import MultistepForm from '../MultistepForm'
import useWorkplaceStore from '@/stores/workplaceStore'

interface Props {
  children: ReactElement[]
  [key: string]: any // allow any other prop that is not explicitly defined
}

const AccountSchema = z
  .object({})
  .merge(ProfileDetailsSchema)
  .merge(CompanySchema)

const AccountForm: FC<Props> = (props: Props) => {
  const { children } = props
  const navigate = useNavigate()

  const profile = useUserStore((state) => state.profile)
  const workplace = useWorkplaceStore((state) => state.workplace)

  const defaultValues = {
    firstName: profile?.firstName || '',
    lastName: profile?.lastName || '',
    company: workplace?.company.companyId || '',
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
