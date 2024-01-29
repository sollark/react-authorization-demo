import { Types } from 'mongoose'
import BadRequestError from '../errors/BadRequestError.js'
import DepartmentModel, {
  Department,
} from '../mongodb/models/department.model.js'
import { Employee } from '../mongodb/models/employee.model.js'
import logger from './logger.service.js'

async function createDepartment(
  companyId: Types.ObjectId,
  departmentName: string
): Promise<(Department & { _id: Types.ObjectId }) | null> {
  const newDepartment = await DepartmentModel.create({
    departmentName,
    company: companyId,
    employees: [],
  })

  const department = await DepartmentModel.findById(newDepartment._id)
    .populate<{ company: Types.ObjectId }>('company')
    .populate<{ employees: Employee[] }>('employees')
    .lean()
    .exec()

  logger.info(
    `departmentService  - createDepartment, department:  ${department?.departmentName}`
  )

  return department
}

async function updateDepartment(
  departmentId: Types.ObjectId,
  updatedDepartmentData: Partial<Department>
): Promise<(Department & { _id: Types.ObjectId }) | null> {
  const department = await DepartmentModel.findByIdAndUpdate(
    departmentId,
    updatedDepartmentData,
    // returns new version of document, if false returns original version, before updates
    { new: true }
  )
    .populate<{ company: Types.ObjectId }>('company')
    .populate<{ employees: Employee[] }>('employees')
    .lean()
    .exec()

  if (!department) {
    logger.warn(
      `departmentService- updateDepartment, failed to update department: ${departmentId}`
    )
    throw new BadRequestError('Department is not found')
  }

  logger.info(
    `departmentService- updateDepartment, departmentId: ${department.departmentName}`
  )

  return department
}

async function addEmployee(
  departmentId: Types.ObjectId,
  employeeId: Types.ObjectId
): Promise<(Department & { _id: Types.ObjectId }) | null> {
  const department = await DepartmentModel.findByIdAndUpdate(
    departmentId,
    {
      $push: { employees: employeeId },
    },
    // returns new version of document, if false returns original version, before updates
    { new: true }
  )
    .populate<{ employees: Employee[] }>('employees')
    .lean()
    .exec()

  if (!department) {
    logger.warn(
      `departmentService- addEmployee, department is not found: ${departmentId}`
    )
    throw new BadRequestError('Department is not found')
  }

  logger.info(
    `departmentService- addEmployee, department :  ${department.departmentName}`
  )

  return department
}

async function removeEmployee(
  departmentId: Types.ObjectId,
  employeeId: Types.ObjectId
) {
  const department = await DepartmentModel.findByIdAndUpdate(
    departmentId,
    {
      $pull: { employees: employeeId },
    },
    // returns new version of document, if false returns original version, before updates
    { new: true }
  )
}

async function getDepartmentDBId(
  departmentName: string
): Promise<Types.ObjectId> {
  const department = await DepartmentModel.findOne({ departmentName })
  if (!department) {
    logger.warn(
      `departmentService- getDepartmentDBId, department is not found: ${departmentName}`
    )
    throw new BadRequestError('Department is not found')
  }

  return department._id
}

export const departmentService = {
  createDepartment,
  updateDepartment,
  addEmployee,
  removeEmployee,
  getDepartmentDBId,
}

// logger.info(
//   `departmentService - department added:  ${JSON.stringify(
//     department,
//     null,
//     2 // Indentation level, adjust as needed
//   )}`
// )
