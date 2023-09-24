import { Types } from 'mongoose'
import CompanyModel, {
  Company,
  CompanyId,
} from '../../mongodb/models/company.model.js'
import { Department } from '../../mongodb/models/department.model.js'
import { Profile } from '../../mongodb/models/profile.model.js'
import { utilService } from '../../utils/utils.js'
import logger from './../../service/logger.service.js'

async function createCompany(name: string) {
  const id = await generateCompanyId()

  const company = await CompanyModel.create({
    companyId: id,
    companyName: name,
  })

  logger.info(`companyService - company added: ${company}`)

  return company
}

async function isCompanyIdExists(company: string) {
  if (!utilService.convertToNumber(company)) return false

  const companyId = await CompanyModel.findOne({
    companyId: +company,
  })

  if (!companyId) return false

  return true
}

async function getBasicCompanyDetails(id: CompanyId) {
  const company = await CompanyModel.findOne({ id })
    .select('companyName companyId')
    .lean()
    .exec()

  logger.info(`companyService - company fetched ${company}`)

  return company
}

async function getBasicCompanyDetailsById(companyId: CompanyId) {
  const company = await CompanyModel.findOne({ companyId })
    .select('companyName companyId')
    .lean()
    .exec()

  logger.info(`companyService - company fetched ${company}`)

  return company
}

async function getCompany(id: CompanyId) {
  const company = await CompanyModel.findOne({ id }).lean().exec()

  logger.info(`companyService - company fetched ${company}`)

  return company
}

async function addDepartment(
  companyId: Types.ObjectId,
  departmentId: Types.ObjectId
): Promise<(Company & { _id: Types.ObjectId }) | null> {
  const company = await CompanyModel.findOneAndUpdate(
    { _id: companyId },
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
  id: CompanyId,
  employeeId: Types.ObjectId
): Promise<Company | null> {
  const company = await CompanyModel.findOneAndUpdate(
    { id },
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
  id: number,
  name: string
): Promise<Company | null> {
  const company = await CompanyModel.findOneAndUpdate(
    { id },
    { name },
    { new: true }
  )
    .populate<{ departments: Department[] }>('departments')
    .populate<{ employees: Profile[] }>('employees')
    .lean()
    .exec()

  logger.info(`companyService - company updated ${company}`)

  return company
}

async function deleteCompany(companyId: string): Promise<void> {
  await CompanyModel.deleteOne({ companyId }).exec()
}

export const companyService = {
  isCompanyIdExists,
  createCompany,
  addDepartment,
  getBasicCompanyDetails,
  getBasicCompanyDetailsById,
  getCompany,
  addEmployee,
  updateCompany,
  deleteCompany,
}

async function generateCompanyId(): Promise<CompanyId> {
  let id = utilService.getRandomInt(1000, 9999)

  const existingCode = await CompanyModel.findOne({
    companyId: id.toString(),
  })

  if (existingCode) {
    // Code already exists, generate a new one recursively
    return generateCompanyId()
  }

  return id.toString() as CompanyId
}
