import { Types } from 'mongoose'
import CompanyModel, {
  Company,
  CompanyId,
} from '../../mongodb/models/company.model.js'
import DepartmentModel, {
  Department,
} from '../../mongodb/models/department.model.js'
import { Profile } from '../../mongodb/models/profile.model.js'
import { utilService } from '../../utils/utils.js'
import logger from './../../service/logger.service.js'

async function createCompany(companyName: string) {
  const companyId = await generateCompanyId()

  const newCompany = await CompanyModel.create({
    companyId,
    companyName,
  })

  logger.info(`companyService - company added: ${newCompany}`)

  return newCompany
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
  const company = await CompanyModel.findById(id).lean().exec()

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

async function getDepartment(
  companyId: Types.ObjectId,
  departmentName: string
): Promise<(Department & { _id: Types.ObjectId }) | null> {
  // TODO look through company's departments to find . Below code is not correct
  const department = await DepartmentModel.findOne({
    companyId,
    departmentName,
  })
    .populate<{ employees: Profile[] }>('employees')
    .lean()
    .exec()

  return department
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

async function getCompanyEmployees(
  companyId: Types.ObjectId
): Promise<Profile[] | null> {
  const company = await CompanyModel.findById(companyId)
    .select('employees')
    .populate<{ employees: Profile[] }>('employees')
    .lean()
    .exec()

  const employees = company?.employees

  return employees ? employees : null
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
  getCompanyEmployees,
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
