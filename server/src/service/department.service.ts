import DepartmentModel from '../mongodb/models/department.model.js'
import logger from './logger.service.js'

async function createDepartment(departmentName: string) {
  const newDepartment = DepartmentModel.create({
    departmentName,
    employees: [],
  })

  logger.info(`departmentService - department added: ${newDepartment}`)

  return newDepartment
}

export const departmentService = {
  createDepartment,
}
