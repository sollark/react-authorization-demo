import { CompanyNameSchema } from '@/models/Company'
import { ProfileSchema } from '@/models/Profile'
import { DepartmentNameSchema } from '@/models/Workplace'
import { accountService } from '@/service/account.service'
import useUserStore from '@/stores/userStore'
import useWorkplaceStore from '@/stores/workplaceStore'
import { useNavigate } from '@tanstack/router'
import { FC, ReactElement } from 'react'
import { z } from 'zod'
import MultistepForm from '../MultistepForm'

interface Props {
  children: ReactElement[]
  [key: string]: any // allow any other prop that is not explicitly defined
}

const AccountSchema = z
  .object({})
  .merge(ProfileSchema)
  .merge(CompanyNameSchema)
  .merge(DepartmentNameSchema)

const AccountForm: FC<Props> = (props: Props) => {
  const { children } = props
  const navigate = useNavigate()

  const profile = useUserStore((state) => state.profile)
  const workplace = useWorkplaceStore((state) => state.workplace)

  const defaultValues = {
    firstName: profile?.firstName || '',
    lastName: profile?.lastName || '',
    companyName: workplace?.company?.companyName || '',
    departmentName: workplace?.department?.departmentName || '',
  }

  async function submit(form: any) {
    console.log('Account form submitted: ', form)

    const account = await accountService.updateAccount(
      form.firstName,
      form.lastName,
      form.companyName,
      form.departmentName
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
