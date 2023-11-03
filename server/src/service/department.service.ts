import { Types } from 'mongoose'
import BadRequestError from '../errors/BadRequestError.js'
import DepartmentModel from '../mongodb/models/department.model.js'
import logger from './logger.service.js'

async function createDepartment(departmentName: string) {
  const newDepartment = DepartmentModel.create({
    departmentName,
    employees: [],
  })

  logger.info(
    `departmentService - department added:  ${JSON.stringify(
      newDepartment,
      null,
      2 // Indentation level, adjust as needed
    )}`
  )

  return newDepartment
}

async function getDepartmentDBId(
  departmentName: string
): Promise<Types.ObjectId> {
  const department = await DepartmentModel.findOne({ departmentName })
  if (!department) {
    logger.warn(
      `departmentService - department is not found: ${departmentName}`
    )
    throw new BadRequestError('Department is not found')
  }

  return department._id
}

export const departmentService = {
  createDepartment,
  getDepartmentDBId,
}
