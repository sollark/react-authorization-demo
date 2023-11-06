import { CompanyNumberSchema } from '@/models/Company'
import { EmployeeNumberSchema } from '@/models/Employee'
import { accountService } from '@/service/account.service'
import { useNavigate } from '@tanstack/react-router'
import { FC } from 'react'
import { z } from 'zod'
import Form from './Form'
import SubmitButton from './buttons/SubmitButton'
import Input from './inputs/TextInput/TextInput'

type JoinCompanyForm = {
  companyNumber: string
  employeeNumber: string
}

const JoinCompanySchema = z
  .object({})
  .merge(CompanyNumberSchema)
  .merge(EmployeeNumberSchema)

const defaultValues = {
  companyNumber: '',
  employeeNumber: '',
}

const JoinCompanyForm: FC = () => {
  console.log('JoinCompanyForm connected')

  const navigate = useNavigate()

  async function submit(form: any) {
    console.log('JoinCompanyForm form submitted: ', form)

    const account = await accountService.joinCompany(
      form.companyNumber,
      form.employeeNumber
    )

    console.log('AccountForm, account: ', account)

    if (account?.isComplete) navigate({ to: '/' })
  }

  return (
    <Form
      schema={JoinCompanySchema}
      defaultValue={defaultValues}
      submit={submit}
      submitButton={<SubmitButton />}>
      <Input name='companyNumber' label='Company number' type='text' />
      <Input name='employeeNumber' label='Employee number' type='text' />
    </Form>
  )
}

export default JoinCompanyForm
