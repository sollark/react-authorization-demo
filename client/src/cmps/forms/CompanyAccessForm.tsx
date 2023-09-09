import { CompanySchema } from '@/models/Company'
import { WorkplaceSchema } from '@/models/Workplace'
import { FC } from 'react'
import { z } from 'zod'
import Form from './Form'
import SubmitButton from './buttons/SubmitButton'
import Input from './inputs/TextInput/TextInput'

type CompanyAccessForm = {
  companyId: string
  employeeId: string
}

const CompanyAccessSchema = z
  .object({})
  .merge(CompanySchema)
  .merge(WorkplaceSchema)

const defaultValues = {
  companyId: '',
  employeeId: '',
}

const CompanyAccessForm: FC = () => {
  console.log('CompanyAccessForm connected')

  async function submit(form: CompanyAccessForm) {}

  return (
    <Form
      schema={CompanyAccessSchema}
      defaultValue={defaultValues}
      submit={submit}
      submitButton={<SubmitButton />}>
      <Input name='companyId' label='Company id' type='text' />
      <Input name='employeeId' label='Employee id' type='text' />
    </Form>
  )
}

export default CompanyAccessForm
