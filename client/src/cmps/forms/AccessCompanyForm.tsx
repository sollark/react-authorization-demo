import { CompanyIdSchema } from '@/models/Company'
import { employeeIdSchema } from '@/models/Workplace'
import { FC } from 'react'
import { z } from 'zod'
import Form from './Form'
import SubmitButton from './buttons/SubmitButton'
import Input from './inputs/TextInput/TextInput'

type AccessCompanyForm = {
  companyId: string
  employeeId: string
}

const AccessCompanySchema = z
  .object({})
  .merge(employeeIdSchema)
  .merge(CompanyIdSchema)

const defaultValues = {
  companyId: '',
  employeeId: '',
}

const AccessCompanyForm: FC = () => {
  console.log('AccessCompanyForm connected')

  async function submit(form: AccessCompanyForm) {}

  return (
    <Form
      schema={AccessCompanySchema}
      defaultValue={defaultValues}
      submit={submit}
      submitButton={<SubmitButton />}>
      <Input name='companyId' label='Company id' type='text' />
      <Input name='employeeId' label='Employee id' type='text' />
    </Form>
  )
}

export default AccessCompanyForm
