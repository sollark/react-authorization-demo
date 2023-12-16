import { Types } from 'mongoose'
import EmployeeModel from '../mongodb/models/employee.model.js'
import { utilService } from '../utils/utils.js'

async function generateEmployeeNumber(
  companyId: Types.ObjectId
): Promise<string> {
  let number = utilService.getRandomInt(1000, 9999)

  const existingCode = await EmployeeModel.findOne({
    employeeNumber: number.toString(),
    companyId,
  })
  if (existingCode) return generateEmployeeNumber(companyId)

  return number.toString()
}

function isValidEmployeeNumber(employeeNumber: string): boolean {
  const regex = /^\d{4}$/
  return regex.test(employeeNumber)
}

export const employeeNumberService = {
  generateEmployeeNumber,
  isValidEmployeeNumber,
}
