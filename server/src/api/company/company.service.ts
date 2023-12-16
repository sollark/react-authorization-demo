import { Types } from 'mongoose'
import CompanyModel, { Company } from '../../mongodb/models/company.model.js'
import DepartmentModel, {
  Department,
} from '../../mongodb/models/department.model.js'
import EmployeeModel, { Employee } from '../../mongodb/models/employee.model.js'
import { companyNumberService } from '../../service/companyNumber.service.js'
import { utilService } from '../../utils/utils.js'
import logger from './../../service/logger.service.js'

async function createCompany(
  companyName: string
): Promise<(Company & { _id: Types.ObjectId }) | null> {
  const companyNumber = await companyNumberService.generateCompanyNumber()

  const companyDoc = await CompanyModel.create({
    companyName,
    companyNumber,
  })

  const company = await CompanyModel.findById(companyDoc._id)
    .populate<{ departments: Department[] }>('departments')
    .populate<{ employees: Employee[] }>('employees')
    .lean()
    .exec()

  logger.info(
    `companyService- createCompany, company is created ${company?._id}  ${company?.companyName}`
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

async function getBasicCompanyDetails(id: Types.ObjectId) {
  const company = await CompanyModel.findById(id)
    .select('companyName CompanyNumber')
    .lean()
    .exec()

  logger.info(
    `companyService- getBasicCompanyDetails, company is fetched ${company?._id}  ${company?.companyName}`
  )

  return company
}

async function getCompany(id: Types.ObjectId) {
  const company = await CompanyModel.findById(id)
    .populate<{ departments: Department[] }>('departments')
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
    .exec()

  logger.info(
    `companyService- getCompany, company is fetched ${company?._id}  ${company?.companyName}`
  )

  return company
}

async function getCompanyByNumber(
  companyNumber: string
): Promise<(Company & { _id: Types.ObjectId }) | null> {
  const company = await CompanyModel.findOne({ companyNumber })
    .populate<{ departments: Department[] }>('departments')
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
    .exec()

  logger.info(
    `companyService- getCompany, company is fetched ${company?._id}  ${company?.companyName}`
  )

  return company
}

async function getCompanyDoc(companyId: Types.ObjectId) {
  const companyDoc = await CompanyModel.findById(companyId)

  return companyDoc
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
    // returns new version of document, if false returns original version, before updates
    { new: true }
  )
    .populate<{ departments: Department[] }>('departments')
    .populate<{ employees: Employee[] }>('employees')
    .populate({ path: 'employees', model: 'Employee' })
    .lean()
    .exec()

  return company
}

async function getCompanyDepartmentDocByName(
  companyId: Types.ObjectId,
  departmentName: string
) {
  console.log('getCompanyDepartmentDocByName', companyId, departmentName)

  const departmentDoc = await DepartmentModel.findOne({
    company: companyId,
    departmentName,
  })

  return departmentDoc
}

async function addEmployee(
  companyId: Types.ObjectId,
  employeeId: Types.ObjectId
): Promise<(Company & { _id: Types.ObjectId }) | null> {
  const company = await CompanyModel.findByIdAndUpdate(
    companyId,
    { $push: { employees: employeeId } },
    // returns new version of document, if false returns original version, before updates
    { new: true }
  )
    .populate<{ departments: Department[] }>('departments')
    .populate<{ employees: Employee[] }>('employees')
    .lean()
    .exec()

  return company
}

async function removeEmployee(
  companyId: Types.ObjectId,
  employeeId: Types.ObjectId
) {
  const company = await CompanyModel.findByIdAndUpdate(
    companyId,
    { $pull: { employees: employeeId } },
    // returns new version of document, if false returns original version, before updates
    { new: true }
  )
}

// TODO when joining existing company, it is better to get an employee by employeeNumber and companyNumber
async function getCompanyEmployeeDocByNumber(
  companyId: Types.ObjectId,
  employeeNumber: string
) {
  const company = await CompanyModel.findById(companyId)

  if (!company) {
    logger.error(
      `companyService- getCompanyEmployeeDocByNumber, company is not found ${companyId}`
    )

    return null
  }

  const employeeIds = company.employees
  const employees = await EmployeeModel.find({ _id: { $in: employeeIds } })

  const matchingEmployee = employees.find(
    (employee) => employee.employeeNumber === employeeNumber
  )

  return matchingEmployee
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
    .exec()

  const employees = company?.employees

  return employees ? employees : null
}

async function getCompanyEmployeeIds(
  companyId: Types.ObjectId
): Promise<Types.ObjectId[] | null> {
  const company = await CompanyModel.findById(companyId).select('employees')
  const employeeIds = company?.employees

  return employeeIds ? employeeIds : null
}

async function updateCompany(
  id: number,
  name: string
): Promise<Company | null> {
  const company = await CompanyModel.findOneAndUpdate(
    { id },
    { name },
    // returns new version of document, if false returns original version, before updates
    { new: true }
  )
    .populate<{ departments: Department[] }>('departments')
    .populate<{ employees: Employee[] }>('employees')
    .lean()
    .exec()

  logger.info(
    `companyService- updateCompany, company is updated ${company?._id}  ${company?.companyName}`
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
  getCompanyDepartmentDocByName,
  getBasicCompanyDetails,
  getCompany,
  getCompanyByNumber,
  getCompanyDoc,
  getCompanyDocByNumber,
  getCompanyEmployeeDocByNumber,
  getCompanyEmployees,
  getCompanyEmployeeIds,
  addEmployee,
  removeEmployee,
  updateCompany,
  deleteCompany,
}
