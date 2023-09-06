import { Types } from 'mongoose'
import BadRequestError from '../errors/BadRequestError.js'
import { Company, CompanyCode } from '../mongodb/models/company.model.js'
import { Department } from '../mongodb/models/department.model.js'
import { Profile } from '../mongodb/models/profile.model.js'
import WorkplaceModel, { Workplace } from '../mongodb/models/workplace.model.js'
import { companyService } from './company.service.js'
import logger from './logger.service.js'

async function createWorkplace(
  employeeId: Types.ObjectId,
  companyId: Types.ObjectId
): Promise<Workplace | null> {
  // Create a new workplace
  const workplaceRef = await WorkplaceModel.create({
    employee: employeeId,
    company: companyId,
  })

  if (!workplaceRef) {
    logger.warn(`workplaceService - cannot create workplace: ${employeeId}`)
    throw new BadRequestError('workplace creation failed')
  }

  console.log('22222', workplaceRef)
  const workplace = await WorkplaceModel.findById(workplaceRef._id)
    .populate<{ company: Company }>('company')
    .populate<{ department: Department }>('department')
    .populate<{ employee: Profile }>('employee')
    .populate<{ supervisor: Workplace }>('supervisor')
    .populate<{ subordinates: Workplace[] }>('subordinates')
    .lean()
    .exec()

  console.log('333333')

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

async function joinExistingCompany(
  identifier: Types.ObjectId,
  companyCode: CompanyCode
) {
  const company = await companyService.getCompany(companyCode)

  if (!company)
    throw new BadRequestError('Company not found', companyCode.toString())

  // at first sign in user gets employee role at chosen company, later it can be changed by manager
  const workplace = await createWorkplace(identifier, company._id)

  return workplace
}

async function joinNewCompany(identifier: Types.ObjectId, name: string) {
  // Create a new company
  const company = await companyService.createCompany(name)
  const workplace = await createWorkplace(identifier, company._id)

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
  identifier: Types.ObjectId,
  updatedWorkplaceData: Partial<Workplace>
) {
  console.log(
    'workplace.service - updateWorkplace, identifier: ',
    identifier,
    'under construction'
  )
}
export const workplaceService = {
  createWorkplace,
  getBasicWorkplaceDetails,
  getWorkplace,
  joinExistingCompany,
  joinNewCompany,
  setSupervisor,
  addSubordinate,
  updateWorkplace,
}
