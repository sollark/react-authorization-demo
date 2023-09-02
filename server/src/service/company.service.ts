import { Types } from 'mongoose'
import CompanyModel, {
  Company,
  CompanyCode,
} from '../mongodb/models/company.model.js'
import { Department } from '../mongodb/models/department.model.js'
import { Profile } from '../mongodb/models/profile.model.js'
import { utilService } from '../utils/utils.js'
import loggerService from './logger.service.js'

async function createCompany(name: string) {
  const code = await generateCompanyCode()

  const company = await CompanyModel.create({
    companyCode: code,
    companyName: name,
  })

  loggerService.info(`company.service - company added: ${company}`)

  return company
}

async function isCompanyCodeExists(company: string) {
  if (!utilService.convertToNumber(company)) return false

  const companyCode = await CompanyModel.findOne({
    companyCode: +company,
  })

  if (!companyCode) return false

  return true
}

async function getBasicCompanyDetails(code: CompanyCode) {
  const company = await CompanyModel.findOne({ code })
    .select('companyName companyCode')
    .lean()
    .exec()

  loggerService.info(`company.service - company fetched ${company}`)

  return company
}

async function getCompany(code: CompanyCode) {
  const company = await CompanyModel.findOne({ code }).lean().exec()

  loggerService.info(`company.service - company fetched ${company}`)

  return company
}

async function addDepartment(
  code: CompanyCode,
  departmentId: Types.ObjectId
): Promise<Company | null> {
  const company = await CompanyModel.findOneAndUpdate(
    { code },
    { $push: { departments: departmentId } },
    { new: true }
  )
    .populate<{ departments: Department[] }>('departments')
    .populate<{ employees: Profile[] }>('employees')
    .lean()
    .exec()

  return company
}

async function addEmployee(
  code: CompanyCode,
  employeeId: Types.ObjectId
): Promise<Company | null> {
  const company = await CompanyModel.findOneAndUpdate(
    { code },
    { $push: { employees: employeeId } },
    { new: true }
  )
    .populate<{ departments: Department[] }>('departments')
    .populate<{ employees: Profile[] }>('employees')
    .lean()
    .exec()

  return company
}

async function updateCompany(
  code: number,
  name: string
): Promise<Company | null> {
  const company = await CompanyModel.findOneAndUpdate(
    { code },
    { name },
    { new: true }
  )
    .populate<{ departments: Department[] }>('departments')
    .populate<{ employees: Profile[] }>('employees')
    .lean()
    .exec()

  loggerService.info(`company.service - company updated ${company}`)

  return company
}

async function deleteCompany(companyCode: string): Promise<void> {
  await CompanyModel.deleteOne({ companyCode }).exec()
}

export const companyService = {
  isCompanyCodeExists,
  createCompany,
  getBasicCompanyDetails,
  getCompany,
  addDepartment,
  addEmployee,
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
