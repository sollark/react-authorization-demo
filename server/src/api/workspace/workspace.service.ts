import { Types } from 'mongoose'
import BadRequestError from '../../errors/BadRequestError.js'
import { Company, CompanyId } from '../../mongodb/models/company.model.js'
import DepartmentModel, {
  Department,
} from '../../mongodb/models/department.model.js'
import ProfileModel, { Profile } from '../../mongodb/models/profile.model.js'
import WorkplaceModel, {
  Workplace,
} from '../../mongodb/models/workplace.model.js'
import { getIdentifierFromALS } from '../../service/als.service.js'
import logger from '../../service/logger.service.js'
import { utilService } from '../../utils/utils.js'
import { accountService } from '../account/account.service.js'
import { companyService } from '../company/company.service.js'

export type EmployeeId = string

async function createWorkplace(
  employeeId: Types.ObjectId,
  companyId: Types.ObjectId,
  departmentId: Types.ObjectId
): Promise<Workplace | null> {
  const id = await generateEmployeeId()

  // Create a new workplace
  const workplaceRef = await WorkplaceModel.create({
    employee: employeeId,
    company: companyId,
    department: departmentId,
    employeeId: id,
  })

  if (!workplaceRef) {
    logger.warn(`workplaceService - cannot create workplace: ${employeeId}`)
    throw new BadRequestError('workplace creation failed')
  }

  const workplace = await WorkplaceModel.findById(workplaceRef._id)
    .populate<{ company: Company }>('company')
    .populate<{ department: Department }>('department')
    .populate<{ employee: Profile }>('employee')
    .populate<{ supervisor: Workplace }>('supervisor')
    .populate<{ subordinates: Workplace[] }>('subordinates')
    .lean()
    .exec()

  if (!workplace) {
    logger.warn(
      `workplaceService - workplace is not found: ${workplaceRef._id}`
    )
    throw new BadRequestError('workplace is not found')
  }

  logger.info(
    `workplaceService - new workplace added: ${JSON.stringify(
      workplace,
      null,
      2 // Indentation level, adjust as needed
    )}`
  )

  return workplace
}

async function getBasicWorkplaceDetails(
  workplaceId: Types.ObjectId
): Promise<Partial<Workplace> | null> {
  const workplace = await WorkplaceModel.findById(workplaceId)
    .select('company department position')
    .populate<{ company: Company }>('company')
    .populate<{ department: Department }>('department')
    .populate<{ employee: Profile }>('employee')
    .populate<{ supervisor: Workplace }>('supervisor')
    .populate<{ subordinates: Workplace[] }>('subordinates')
    .lean()
    .exec()

  return workplace
}

async function getWorkplace(
  companyId: Types.ObjectId
): Promise<Workplace | null> {
  const workplace = await WorkplaceModel.findOne({
    company: companyId,
  })
    .populate<{ company: Company }>('company')
    .populate<{ department: Department }>('department')
    .populate<{ employee: Profile }>('employee')
    .populate<{ supervisor: Workplace }>('supervisor')
    .populate<{ subordinates: Workplace[] }>('subordinates')
    .lean()
    .exec()

  return workplace
}

async function getAllEmployees(): Promise<Profile[] | undefined> {
  const identifier = getIdentifierFromALS()
  const account = await accountService.getAccount(identifier)
  const { workplace } = account
  if (!workplace) throw new BadRequestError('Workplace is not found')
  const { company } = workplace

  return company.employees
}

async function joinExistingCompany(
  identifier: Types.ObjectId,
  companyId: CompanyId,
  employeeId: EmployeeId
) {
  const company = await companyService.getBasicCompanyDetailsById(companyId)

  if (!company) throw new BadRequestError('Company is not found', companyId)

  const workplace = await WorkplaceModel.findOne({
    company: company?._id,
    employeeId,
  })
    .lean()
    .exec()

  if (!workplace) throw new BadRequestError('Workplace is not found', companyId)

  // add auth identifier to profile
  await ProfileModel.findOneAndUpdate(
    { _id: workplace.employee },
    { identifier },
    { new: true }
  ).exec()

  const updatedWorkplace = await getBasicWorkplaceDetails(workplace._id)

  return updatedWorkplace
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

  company = await companyService.addDepartment(company._id, department._id)

  if (!company) {
    logger.warn(
      `workplaceService -joinNewCompany: adding department failed: ${departmentName}`
    )
    throw new BadRequestError('Adding department to company failed')
  }

  const workplace = await createWorkplace(
    identifier,
    company._id,
    department._id
  )

  return workplace
}

async function setSupervisor(
  employeeId: Types.ObjectId,
  supervisorId: Types.ObjectId
): Promise<Workplace | null> {
  const employeeWorkplace = await WorkplaceModel.findOneAndUpdate(
    { employee: employeeId },
    { supervisor: supervisorId },
    { new: true }
  )
    .populate<{ company: Company }>('company')
    .populate<{ department: Department }>('department')
    .populate<{ employee: Profile }>('employee')
    .populate<{ supervisor: Workplace }>('supervisor')
    .populate<{ subordinates: Workplace[] }>('subordinates')
    .lean()
    .exec()

  const supervisorWorkplace = await WorkplaceModel.findOneAndUpdate(
    { employee: supervisorId },
    { $push: { subordinates: employeeId } },
    { new: true }
  ).exec()

  return employeeWorkplace
}

async function addSubordinate(
  employeeId: Types.ObjectId,
  subordinateId: Types.ObjectId
): Promise<Workplace | null> {
  const employeeWorkplace = await WorkplaceModel.findOneAndUpdate(
    { employee: employeeId },
    { $push: { subordinates: subordinateId } },
    { new: true }
  )
    .populate<{ company: Company }>('company')
    .populate<{ department: Department }>('department')
    .populate<{ employee: Profile }>('employee')
    .populate<{ supervisor: Workplace }>('supervisor')
    .populate<{ subordinates: Workplace[] }>('subordinates')
    .lean()
    .exec()

  const subordinateWorkplace = await WorkplaceModel.findOneAndUpdate(
    { employee: subordinateId },
    { supervisor: employeeId },
    { new: true }
  ).exec()

  return employeeWorkplace
}

async function updateWorkplace(
  employeeId: Types.ObjectId,
  updatedWorkplaceData: Partial<Workplace>
): Promise<Workplace | null> {
  const workplace = await WorkplaceModel.findOneAndUpdate(
    { employee: employeeId },
    updatedWorkplaceData,
    { new: true }
  )
    .populate<{ company: Company }>('company')
    .populate<{ department: Department }>('department')
    .populate<{ employee: Profile }>('employee')
    .populate<{ supervisor: Workplace }>('supervisor')
    .populate<{ subordinates: Workplace[] }>('subordinates')
    .lean()
    .exec()

  logger.info(`workplaceService - workplace updated ${workplace}`)

  return workplace
}

export const workplaceService = {
  createWorkplace,
  getBasicWorkplaceDetails,
  getAllEmployees,
  joinExistingCompany,
  joinNewCompany,
  setSupervisor,
  addSubordinate,
  updateWorkplace,
}

async function generateEmployeeId(): Promise<EmployeeId> {
  let id = utilService.getRandomInt(1000, 9999)

  const existingCode = await WorkplaceModel.findOne({
    employeeId: id.toString(),
  })

  if (existingCode) {
    // Code already exists, generate a new one recursively
    return generateEmployeeId()
  }

  return id.toString() as EmployeeId
}
