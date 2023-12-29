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
import { Profile } from '../../mongodb/models/profile.model.js'
import { departmentService } from '../../service/department.service.js'
import logger from '../../service/logger.service.js'
import { utilService } from '../../utils/utils.js'
import { companyService } from '../company/company.service.js'

async function getAllEmployees(): Promise<
  (Employee & { _id: Types.ObjectId })[] | null
> {
  const employees = await EmployeeModel.find()
    .populate<{ company: Company }>('company')
    .populate<{ department: Department }>('department')
    .populate<{ profile: Profile }>('profile')
    .populate<{ supervisor: Employee }>('supervisor')
    .populate<{ subordinates: Employee[] }>('subordinates')
    .lean()
    .exec()

  if (!employees) {
    logger.warn(`employeeService - getAllEmployees, cannot get employees`)
  } else {
    logger.info(`employeeService - getAllEmployees, all employees fetched`)
  }

  return employees
}

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
    .populate<{ company: Company }>({
      path: 'company',
      select: 'companyName companyNumber',
    })
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

async function deleteEmployee(employeeId: Types.ObjectId) {
  console.log('employeeService - deleteEmployee, employeeId', employeeId)

  const employeeDoc = await EmployeeModel.findById(employeeId)
  if (!employeeDoc) throw new BadRequestError('Employee is not found')

  // remove employee from company
  const company = await companyService.getCompanyDoc(employeeDoc.company)

  if (!company) throw new BadRequestError('Company is not found')
  await companyService.removeEmployee(company._id, employeeId)

  // remove employee from department
  const department = await DepartmentModel.findById(employeeDoc.department)
  if (!department) throw new BadRequestError('Department is not found')
  await departmentService.removeEmployee(department._id, employeeId)

  // delete employee
  await EmployeeModel.findByIdAndDelete(employeeId)

  logger.info(`employeeService - employee deleted ${employeeId}`)
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
    .populate<{ profile: Profile }>('profile')
    .populate<{ supervisor: Employee }>('supervisor')
    .populate<{ subordinates: Employee[] }>('subordinates')
    .lean()
    .exec()

  if (!employee) {
    logger.warn(`employeeService - employee is not found: ${employeeId}`)
    throw new BadRequestError('employee is not found')
  }

  logger.info(`employeeService - employee updated ${employee?._id}`)

  return employee
}

async function getEmployeeDoc(
  companyNumber: string,
  employeeNumber: string
): Promise<(EmployeeDoc & { _id: Types.ObjectId }) | null> {
  const companyDoc = await companyService.getCompanyDocByNumber(companyNumber)
  if (!companyDoc)
    throw new BadRequestError('Company is not found', companyNumber)

  const employeeDoc = await EmployeeModel.findOne({
    company: companyDoc._id,
    employeeNumber,
  })
    .lean()
    .exec()

  logger.info(
    `employeeService - getEmployeeDoc, employeeDoc: ${JSON.stringify(
      employeeDoc,
      null,
      2 // Indentation level, adjust as needed
    )}`
  )

  return employeeDoc
}

async function getBasicEmployeeTableData(
  employeeIds: Types.ObjectId[]
): Promise<Partial<Employee & { _id: Types.ObjectId }>[] | null> {
  const employees = await EmployeeModel.find(
    { _id: { $in: employeeIds } },
    { company: 0, employeeStatus: 0, supervisor: 0, subordinates: 0 }
  )
    .populate<{ company: Company }>('company')
    .populate<{ department: Department }>({
      path: 'department',
      select: 'departmentName',
    })
    .populate<{ profile: Profile }>('profile')
    .populate<{ supervisor: Employee }>('supervisor')
    .populate<{ subordinates: Employee[] }>('subordinates')
    .lean()
    .exec()

  return employees
}

async function getAdvancedEmployeeTableData(
  employeeIds: Types.ObjectId[]
): Promise<Partial<Employee & { _id: Types.ObjectId }>[] | null> {
  const employees = await EmployeeModel.find(
    { _id: { $in: employeeIds } },
    { company: 0, supervisor: 0, subordinates: 0 }
  )
    .populate<{ company: Company }>('company')
    .populate<{ department: Department }>({
      path: 'department',
      select: 'departmentName',
    })
    .populate<{ profile: Profile }>('profile')
    .populate<{ supervisor: Employee }>('supervisor')
    .populate<{ subordinates: Employee[] }>('subordinates')
    .lean()
    .exec()

  return employees
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

async function changeDepartment(
  employeeId: Types.ObjectId,
  departmentId: Types.ObjectId
) {
  const employee = await EmployeeModel.findOneAndUpdate(
    { _id: employeeId },
    { department: departmentId },
    { new: true }
  )
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

export const employeeService = {
  getAllEmployees,
  createEmployee,
  deleteEmployee,
  updateEmployee,
  getEmployeeDoc,
  getBasicEmployeeTableData,
  getAdvancedEmployeeTableData,
  getProfileId,
  getCompanyId,
  changeDepartment,
  setSupervisor,
  addSubordinate,
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
