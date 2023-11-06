import { Types } from 'mongoose'
import CompanyModel, { Company } from '../../mongodb/models/company.model.js'
import DepartmentModel, {
  Department,
} from '../../mongodb/models/department.model.js'
import EmployeeModel, { Employee } from '../../mongodb/models/employee.model.js'
import { utilService } from '../../utils/utils.js'
import logger from './../../service/logger.service.js'

async function createCompany(
  companyName: string
): Promise<(Company & { _id: Types.ObjectId }) | null> {
  const companyNumber = await generateCompanyNumber()

  const companyRef = await CompanyModel.create({
    companyName,
    companyNumber,
  })

  const company = await CompanyModel.findById(companyRef._id)
    .populate<{ departments: Department[] }>('departments')
    .populate<{ employees: Employee[] }>('employees')
    .lean()
    .exec()

  logger.info(
    `companyService - company is created:  ${JSON.stringify(
      company,
      null,
      2 // Indentation level, adjust as needed
    )}`
  )

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

async function getBasicCompanyDetails(companyNumber: string) {
  const company = await CompanyModel.findOne({ companyNumber })
    .select('companyName companyNumber')
    .lean()
    .exec()

  logger.info(
    `companyService - company fetched  ${JSON.stringify(
      company,
      null,
      2 // Indentation level, adjust as needed
    )}`
  )

  return company
}

async function getBasicCompanyDetailsById(id: Types.ObjectId) {
  const company = await CompanyModel.findById(id)
    .select('companyName CompanyNumber')
    .lean()
    .exec()

  logger.info(
    `companyService - company fetched  ${JSON.stringify(
      company,
      null,
      2 // Indentation level, adjust as needed
    )}`
  )

  return company
}

async function getCompany(id: Types.ObjectId) {
  const company = await CompanyModel.findById(id).lean().exec()

  logger.info(
    `companyService - company fetched  ${JSON.stringify(
      company,
      null,
      2 // Indentation level, adjust as needed
    )}`
  )

  return company
}

async function getCompanyDocByNumber(companyNumber: string) {
  const companyDoc = await CompanyModel.findOne({ companyNumber })

  return companyDoc
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
    .populate({ path: 'employees', model: 'Employee' })
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
    .populate<{ employees: Employee[] }>('employees')
    .lean()
    .exec()

  return department
}

async function addEmployee(
  companyId: Types.ObjectId,
  employeeId: Types.ObjectId
): Promise<(Company & { _id: Types.ObjectId }) | null> {
  const company = await CompanyModel.findByIdAndUpdate(
    companyId,
    { $push: { employees: employeeId } },
    { new: true }
  )
    .populate<{ departments: Department[] }>('departments')
    .populate<{ employees: Employee[] }>('employees')
    .lean()
    .exec()

  return company
}

async function getCompanyEmployeeDocByNumber(
  companyId: Types.ObjectId,
  employeeNumber: string
) {
  const company = await CompanyModel.findById(companyId)

  if (company) {
    const employeeIds = company.employees
    const employees = await EmployeeModel.find({ _id: { $in: employeeIds } })

    const matchingEmployee = employees.find(
      (employee) => employee.employeeNumber === employeeNumber
    )

    return matchingEmployee
  }

  return null // Return null if the company is not found
}

async function getCompanyEmployees(
  companyId: Types.ObjectId
): Promise<Employee[] | null> {
  const company = await CompanyModel.findById(companyId)
    .select('employees')
    .populate<{ employees: Employee[] }>({
      path: 'employees',
      select: '-company',
      populate: [
        { path: 'department', select: '-employees -company' },
        { path: 'profile' },
        { path: 'supervisor' },
        { path: 'subordinates' },
      ],
    })

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

  logger.info(
    `companyService - company updated  ${JSON.stringify(
      company,
      null,
      2 // Indentation level, adjust as needed
    )}`
  )

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
  getCompanyDocByNumber,
  getCompanyEmployeeDocByNumber,
  getCompanyEmployees,
  addEmployee,
  updateCompany,
  deleteCompany,
}

async function generateCompanyNumber(): Promise<string> {
  let id = utilService.getRandomInt(1000, 9999)

  const existingCode = await CompanyModel.findOne({
    companyNumber: id.toString(),
  })

  if (existingCode) {
    // Code already exists, generate a new one recursively
    return generateCompanyNumber()
  }

  return id.toString()
}
