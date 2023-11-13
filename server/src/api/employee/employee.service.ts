import { Types } from 'mongoose'
import BadRequestError from '../../errors/BadRequestError.js'
import { Company } from '../../mongodb/models/company.model.js'
import DepartmentModel, {
  Department,
} from '../../mongodb/models/department.model.js'
import EmployeeModel, {
  Employee,
  EmployeeDoc,
} from '../../mongodb/models/employee.model.js'
import ProfileModel, { Profile } from '../../mongodb/models/profile.model.js'
import logger from '../../service/logger.service.js'
import { utilService } from '../../utils/utils.js'
import { companyService } from '../company/company.service.js'

async function createEmployee(
  profileId: Types.ObjectId,
  companyId: Types.ObjectId,
  departmentId: Types.ObjectId,
  position: string
): Promise<(Employee & { _id: Types.ObjectId }) | null> {
  const employeeNumber = await generateEmployeeNumber()

  // Create a new employee
  const employeeDoc = await EmployeeModel.create({
    profile: profileId,
    company: companyId,
    department: departmentId,
    employeeNumber,
    position,
  })

  if (!employeeDoc) {
    logger.warn(`employeeService - cannot create employee`)
    throw new BadRequestError('Employee creation failed')
  }

  const employee = await EmployeeModel.findById(employeeDoc._id)
    .populate<{ company: Company }>('company')
    .populate<{ department: Department }>('department')
    .populate<{ profile: Profile }>('profile')
    .populate<{ supervisor: Employee }>('supervisor')
    .populate<{ subordinates: Employee[] }>('subordinates')
    .lean()
    .exec()

  if (!employee) {
    logger.warn(`employeeService - employee is not found: ${employeeDoc._id}`)
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

async function getBasicEmployeeData(
  employeeIds: Types.ObjectId[]
): Promise<Partial<Employee>[] | null> {
  const employees = await EmployeeModel.find({ _id: { $in: employeeIds } })
    .select('company department employeeNumber position profile')
    .populate<{ company: Company }>('company')
    .populate<{ department: Department }>('department')
    .populate<{ profile: Profile }>('profile')
    .lean()
    .exec()

  return null
}

async function getEmployee(
  companyNumber: Types.ObjectId
): Promise<Employee | null> {
  const employee = await EmployeeModel.findOne({
    company: companyNumber,
  })
    .populate<{ company: Company }>('company')
    .populate<{ department: Department }>('department')
    .populate<{ profile: Profile }>('profile')
    .populate<{ supervisor: Employee }>('supervisor')
    .populate<{ subordinates: Employee[] }>('subordinates')
    .lean()
    .exec()

  return employee
}

async function getEmployeeDocById(
  workplaceId: Types.ObjectId
): Promise<EmployeeDoc | null> {
  const employeeDoc = await EmployeeModel.findById(workplaceId).lean().exec()

  return employeeDoc
}

async function getProfileId(
  employeeId: Types.ObjectId
): Promise<Types.ObjectId | null> {
  const employee = await EmployeeModel.findById(employeeId)
    .select('profile')
    .lean()
    .exec()

  if (!employee || !employee.profile) return null

  return employee.profile
}

async function getCompanyId(
  employeeId: Types.ObjectId
): Promise<Types.ObjectId | null> {
  const employee = await EmployeeModel.findById(employeeId)
    .select('company')
    .lean()
    .exec()

  if (!employee || !employee.company) return null

  return employee.company
}

// TODO predicated (no use?)
async function joinExistingCompany(
  identifier: Types.ObjectId,
  companyNumber: string,
  employeeNumber: string
) {
  const companyDoc = await companyService.getCompanyDocByNumber(companyNumber)
  if (!companyDoc)
    throw new BadRequestError('Company is not found', companyNumber)

  const employee = await EmployeeModel.findOne({
    company: companyDoc._id,
    employeeNumber,
  })
    .lean()
    .exec()
  if (!employee)
    throw new BadRequestError('Employee is not found', companyNumber)

  // add auth identifier to profile
  await ProfileModel.findOneAndUpdate(
    { _id: employee.profile },
    { identifier },
    { new: true }
  ).exec()

  const updatedEmployee = await getBasicEmployeeData([employee._id])

  return updatedEmployee
}

async function joinNewCompany(
  identifier: Types.ObjectId,
  companyName: string,
  departmentName: string,
  position: string
) {
  let company = null
  company = await companyService.createCompany(companyName)

  let department = null
  department = await DepartmentModel.create({ departmentName })

  if (!company || !department)
    throw new BadRequestError('Creating department to company failed')

  company = await companyService.addDepartment(company._id, department._id)
  if (!company) throw new BadRequestError('Adding department to company failed')

  const employee = await createEmployee(
    identifier,
    company._id,
    department._id,
    position
  )

  return employee
}

async function setSupervisor(
  employeeNumber: Types.ObjectId,
  supervisorId: Types.ObjectId
): Promise<Employee | null> {
  const employeeEmployee = await EmployeeModel.findOneAndUpdate(
    { employee: employeeNumber },
    { supervisor: supervisorId },
    { new: true }
  )
    .populate<{ company: Company }>('company')
    .populate<{ department: Department }>('department')
    .populate<{ profile: Profile }>('profile')
    .populate<{ supervisor: Employee }>('supervisor')
    .populate<{ subordinates: Employee[] }>('subordinates')
    .lean()
    .exec()

  const supervisorEmployee = await EmployeeModel.findOneAndUpdate(
    { employee: supervisorId },
    { $push: { subordinates: employeeNumber } },
    { new: true }
  ).exec()

  return employeeEmployee
}

async function addSubordinate(
  employeeNumber: Types.ObjectId,
  subordinateId: Types.ObjectId
): Promise<Employee | null> {
  const employeeEmployee = await EmployeeModel.findOneAndUpdate(
    { employee: employeeNumber },
    { $push: { subordinates: subordinateId } },
    { new: true }
  )
    .populate<{ company: Company }>('company')
    .populate<{ department: Department }>('department')
    .populate<{ profile: Profile }>('profile')
    .populate<{ supervisor: Employee }>('supervisor')
    .populate<{ subordinates: Employee[] }>('subordinates')
    .lean()
    .exec()

  const subordinateEmployee = await EmployeeModel.findOneAndUpdate(
    { employee: subordinateId },
    { supervisor: employeeNumber },
    { new: true }
  ).exec()

  return employeeEmployee
}

async function updateEmployee(
  employeeNumber: Types.ObjectId,
  updatedEmployeeData: Partial<Employee>
): Promise<Employee | null> {
  const employee = await EmployeeModel.findOneAndUpdate(
    { employee: employeeNumber },
    updatedEmployeeData,
    { new: true }
  )
    .populate<{ company: Company }>('company')
    .populate<{ department: Department }>('department')
    .populate<{ profile: Profile }>('profile')
    .populate<{ supervisor: Employee }>('supervisor')
    .populate<{ subordinates: Employee[] }>('subordinates')
    .lean()
    .exec()

  logger.info(`employeeService - employee updated ${employee}`)

  return employee
}

export const employeeService = {
  createEmployee,
  getBasicEmployeeData,
  getEmployeeDocById,
  getProfileId,
  getCompanyId,
  joinExistingCompany,
  joinNewCompany,
  setSupervisor,
  addSubordinate,
  updateEmployee,
}

async function generateEmployeeNumber(): Promise<string> {
  let id = utilService.getRandomInt(1000, 9999)

  const existingCode = await EmployeeModel.findOne({
    employeeNumber: id.toString(),
  })

  if (existingCode) {
    // Code already exists, generate a new one recursively
    return generateEmployeeNumber()
  }

  return id.toString()
}
