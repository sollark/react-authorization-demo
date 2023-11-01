import { Types } from 'mongoose'
import CompanyModel, {
  Company,
  CompanyId,
} from '../../mongodb/models/company.model.js'
import DepartmentModel, {
  Department,
} from '../../mongodb/models/department.model.js'
import { Employee } from '../../mongodb/models/employee.model.js'
import { Profile } from '../../mongodb/models/profile.model.js'
import { utilService } from '../../utils/utils.js'
import logger from './../../service/logger.service.js'

async function createCompany(
  companyName: string
): Promise<(Company & { _id: Types.ObjectId }) | null> {
  const companyId = await generateCompanyId()

  const companyRef = await CompanyModel.create({
    companyId,
    companyName,
  })

  const company = await CompanyModel.findOne({ _id: companyRef._id })
    .populate<{ departments: Department[] }>('departments')
    .populate<{ employees: Employee[] }>('employees')
    .lean()
    .exec()

  logger.info(`companyService - company is created: ${company}`)

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
    .populate<{ employees: Employee[] }>('employees')
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
  companyId: Types.ObjectId,
  employeeId: Types.ObjectId
): Promise<(Company & { _id: Types.ObjectId }) | null> {
  const company = await CompanyModel.findByIdAndUpdate(
    { companyId },
    { $push: { employees: employeeId } },
    { new: true }
  )
    .populate<{ departments: Department[] }>('departments')
    .populate<{ employees: Employee[] }>('employees')
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
    .populate<{ employees: Employee[] }>('employees')
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
