import CompanyModel, {
  Company,
  CompanyCode,
} from '../mongodb/models/company.model.js'
import { Department } from '../mongodb/models/department.model.js'
import { Employee } from '../mongodb/models/employee.model.js'
import { utilService } from '../utils/utils.js'
import loggerService from './logger.service.js'

const createCompany = async (name: string) => {
  const code = await generateCompanyCode()

  const company = await CompanyModel.create({
    companyCode: code,
    companyName: name,
  })

  loggerService.info(`company.service - company added: ${company}`)

  return company
}

const isCompanyCodeExists = async (company: string) => {
  if (!utilService.convertToNumber(company)) return false

  const companyCode = await CompanyModel.findOne({
    companyCode: +company,
  })

  if (!companyCode) return false

  return true
}

const getCompany = async (code: CompanyCode) => {
  const company = await CompanyModel.findOne({ code })

  loggerService.info(`company.service - company fetched ${company}`)

  return company
}

const updateCompany = async (
  code: number,
  name: string
): Promise<Company | null> => {
  const company = await CompanyModel.findOneAndUpdate(
    { code },
    { name },
    { new: true }
  )
    .populate<{ departments: Department[] }>('departments')
    .populate<{ employees: Employee[] }>('employees')
    .lean()
    .exec()

  loggerService.info(`company.service - company updated ${company}`)

  return company
}

const deleteCompany = async (companyCode: string): Promise<void> => {
  await CompanyModel.deleteOne({ companyCode })
}

export const companyService = {
  isCompanyCodeExists,
  createCompany,
  getCompany,
  updateCompany,
  deleteCompany,
}

async function generateCompanyCode(): Promise<CompanyCode> {
  let code = utilService.getRandomInt(1000, 9999)

  const existingCode = await CompanyModel.findOne({
    companyCode: code.toString(),
  })

  if (existingCode) {
    // Code already exists, generate a new one recursively
    return generateCompanyCode()
  }

  return code.toString() as CompanyCode
}
