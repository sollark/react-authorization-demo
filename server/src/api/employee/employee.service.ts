import { Types } from 'mongoose'
import BadRequestError from '../../errors/BadRequestError.js'
import { Company, CompanyId } from '../../mongodb/models/company.model.js'
import DepartmentModel, {
  Department,
} from '../../mongodb/models/department.model.js'
import EmployeeModel, {
  Employee,
  EmployeeRef,
} from '../../mongodb/models/employee.model.js'
import ProfileModel, { Profile } from '../../mongodb/models/profile.model.js'
import logger from '../../service/logger.service.js'
import { utilService } from '../../utils/utils.js'
import { companyService } from '../company/company.service.js'

export type EmployeeId = string

async function createEmployee(
  profileId: Types.ObjectId,
  companyId: Types.ObjectId,
  departmentId: Types.ObjectId
): Promise<Employee | null> {
  const employeeNumber = await generateEmployeeNumber()

  // Create a new employee
  const employeeRef = await EmployeeModel.create({
    profile: profileId,
    company: companyId,
    department: departmentId,
    employeeNumber,
  })

  if (!employeeRef) {
    logger.warn(`employeeService - cannot create employee`)
    throw new BadRequestError('Employee creation failed')
  }

  const employee = await EmployeeModel.findById(employeeRef._id)
    .populate<{ company: Company }>('company')
    .populate<{ department: Department }>('department')
    .populate<{ profile: Profile }>('employee')
    .populate<{ supervisor: Employee }>('supervisor')
    .populate<{ subordinates: Employee[] }>('subordinates')
    .lean()
    .exec()

  if (!employee) {
    logger.warn(`employeeService - employee is not found: ${employeeRef._id}`)
    throw new BadRequestError('employee is not found')
  }

  logger.info(
    `employeeService - new employee added: ${JSON.stringify(
      employee,
      null,
      2 // Indentation level, adjust as needed
    )}`
  )

  return employee
}

async function getBasicEmployeeDetails(
  workplaceId: Types.ObjectId
): Promise<Partial<Employee> | null> {
  const employee = await EmployeeModel.findById(workplaceId)
    .select('company department position')
    .populate<{ company: Company }>('company')
    .populate<{ department: Department }>('department')
    .populate<{ profile: Profile }>('employee')
    .populate<{ supervisor: Employee }>('supervisor')
    .populate<{ subordinates: Employee[] }>('subordinates')
    .lean()
    .exec()

  return employee
}

async function getEmployee(
  companyId: Types.ObjectId
): Promise<Employee | null> {
  const employee = await EmployeeModel.findOne({
    company: companyId,
  })
    .populate<{ company: Company }>('company')
    .populate<{ department: Department }>('department')
    .populate<{ profile: Profile }>('employee')
    .populate<{ supervisor: Employee }>('supervisor')
    .populate<{ subordinates: Employee[] }>('subordinates')
    .lean()
    .exec()

  return employee
}

async function getEmployeeRefById(
  workplaceId: Types.ObjectId
): Promise<EmployeeRef | null> {
  const employeeRef = await EmployeeModel.findById(workplaceId).lean().exec()

  return employeeRef
}

async function joinExistingCompany(
  identifier: Types.ObjectId,
  companyId: CompanyId,
  employeeId: EmployeeId
) {
  const company = await companyService.getBasicCompanyDetailsById(companyId)

  if (!company) throw new BadRequestError('Company is not found', companyId)

  const employee = await EmployeeModel.findOne({
    company: company?._id,
    employeeId,
  })
    .lean()
    .exec()

  if (!employee) throw new BadRequestError('Employee is not found', companyId)

  // add auth identifier to profile
  await ProfileModel.findOneAndUpdate(
    { _id: employee.profile },
    { identifier },
    { new: true }
  ).exec()

  const updatedEmployee = await getBasicEmployeeDetails(employee._id)

  return updatedEmployee
}

async function joinNewCompany(
  identifier: Types.ObjectId,
  companyName: string,
  departmentName: string
) {
  let company = null
  company = await companyService.createCompany(companyName)

  let department = null
  department = await DepartmentModel.create({ departmentName })

  if (!company || !department)
    throw new BadRequestError('Creating department to company failed')

  company = await companyService.addDepartment(company._id, department._id)
  if (!company) throw new BadRequestError('Adding department to company failed')

  const employee = await createEmployee(identifier, company._id, department._id)

  return employee
}

async function setSupervisor(
  employeeId: Types.ObjectId,
  supervisorId: Types.ObjectId
): Promise<Employee | null> {
  const employeeEmployee = await EmployeeModel.findOneAndUpdate(
    { employee: employeeId },
    { supervisor: supervisorId },
    { new: true }
  )
    .populate<{ company: Company }>('company')
    .populate<{ department: Department }>('department')
    .populate<{ profile: Profile }>('employee')
    .populate<{ supervisor: Employee }>('supervisor')
    .populate<{ subordinates: Employee[] }>('subordinates')
    .lean()
    .exec()

  const supervisorEmployee = await EmployeeModel.findOneAndUpdate(
    { employee: supervisorId },
    { $push: { subordinates: employeeId } },
    { new: true }
  ).exec()

  return employeeEmployee
}

async function addSubordinate(
  employeeId: Types.ObjectId,
  subordinateId: Types.ObjectId
): Promise<Employee | null> {
  const employeeEmployee = await EmployeeModel.findOneAndUpdate(
    { employee: employeeId },
    { $push: { subordinates: subordinateId } },
    { new: true }
  )
    .populate<{ company: Company }>('company')
    .populate<{ department: Department }>('department')
    .populate<{ profile: Profile }>('employee')
    .populate<{ supervisor: Employee }>('supervisor')
    .populate<{ subordinates: Employee[] }>('subordinates')
    .lean()
    .exec()

  const subordinateEmployee = await EmployeeModel.findOneAndUpdate(
    { employee: subordinateId },
    { supervisor: employeeId },
    { new: true }
  ).exec()

  return employeeEmployee
}

async function updateEmployee(
  employeeId: Types.ObjectId,
  updatedEmployeeData: Partial<Employee>
): Promise<Employee | null> {
  const employee = await EmployeeModel.findOneAndUpdate(
    { employee: employeeId },
    updatedEmployeeData,
    { new: true }
  )
    .populate<{ company: Company }>('company')
    .populate<{ department: Department }>('department')
    .populate<{ profile: Profile }>('employee')
    .populate<{ supervisor: Employee }>('supervisor')
    .populate<{ subordinates: Employee[] }>('subordinates')
    .lean()
    .exec()

  logger.info(`employeeService - employee updated ${employee}`)

  return employee
}

export const employeeService = {
  createEmployee,
  getBasicEmployeeDetails,
  getEmployeeRefById,
  joinExistingCompany,
  joinNewCompany,
  setSupervisor,
  addSubordinate,
  updateEmployee,
}

async function generateEmployeeNumber(): Promise<EmployeeId> {
  let id = utilService.getRandomInt(1000, 9999)

  const existingCode = await EmployeeModel.findOne({
    employeeId: id.toString(),
  })

  if (existingCode) {
    // Code already exists, generate a new one recursively
    return generateEmployeeNumber()
  }

  return id.toString() as EmployeeId
}