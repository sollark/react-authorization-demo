import { Types } from 'mongoose'
import BadRequestError from '../errors/BadRequestError.js'
import { Company, CompanyCode } from '../mongodb/models/company.model.js'
import { Department } from '../mongodb/models/department.model.js'
import { Profile } from '../mongodb/models/profile.model.js'
import {
  Workspace,
  default as WorkspaceModel,
  default as WorkspaceRefModel,
} from '../mongodb/models/workspace.model.js'
import { companyService } from './company.service.js'
import logger from './logger.service.js'

async function createWorkspace(
  employeeId: Types.ObjectId,
  companyId: Types.ObjectId
): Promise<Workspace | null> {
  // Create a new workspace
  const workspaceRef = await WorkspaceRefModel.create({
    employee: employeeId,
    company: companyId,
  })

  if (!workspaceRef) {
    logger.warn(`workspaceService - cannot create workspace: ${employeeId}`)
    throw new BadRequestError('Workspace creation failed')
  }

  const workspace = await WorkspaceRefModel.findById(workspaceRef._id)
    .populate<{ company: Company }>('company')
    .populate<{ department: Department }>('department')
    .populate<{ employee: Profile }>('employee')
    .populate<{ supervisor: Profile }>('supervisor')
    .populate<{ subordinates: Profile[] }>('subordinates')
    .lean()
    .exec()

  if (!workspace) {
    logger.warn(
      `workspaceService - workspace is not found: ${workspaceRef._id}`
    )
    throw new BadRequestError('Workspace is not found')
  }

  logger.info(
    `workspace.service - new workspace added: ${JSON.stringify(
      workspace,
      null,
      2 // Indentation level, adjust as needed
    )}`
  )

  return workspace
}

async function getBasicWorkspaceDetails(
  workspaceId: Types.ObjectId
): Promise<Partial<Workspace> | null> {
  const workspace = await WorkspaceModel.findById(workspaceId)
    .select('company department position')
    .populate<{ company: Company }>('company')
    .populate<{ department: Department }>('department')
    .populate<{ employee: Profile }>('employee')
    .populate<{ supervisor: Profile }>('supervisor')
    .populate<{ subordinates: Profile[] }>('subordinates')
    .lean()
    .exec()

  return workspace
}

async function getWorkspace(
  companyId: Types.ObjectId
): Promise<Workspace | null> {
  const workspace = await WorkspaceRefModel.findOne({
    company: companyId,
  })
    .populate<{ company: Company }>('company')
    .populate<{ department: Department }>('department')
    .populate<{ employee: Profile }>('employee')
    .populate<{ supervisor: Profile }>('supervisor')
    .populate<{ subordinates: Profile[] }>('subordinates')
    .lean()
    .exec()

  return workspace
}

async function joinExistingCompany(
  identifier: Types.ObjectId,
  companyCode: CompanyCode
) {
  const company = await companyService.getCompany(companyCode)

  if (!company)
    throw new BadRequestError('Company not found', companyCode.toString())

  // at first sign in user gets employee role at chosen company, later it can be changed by manager
  const workspace = await createWorkspace(identifier, company._id)

  return workspace
}

async function joinNewCompany(identifier: Types.ObjectId, name: string) {
  // Create a new company
  const company = await companyService.createCompany(name)
  const workspace = await createWorkspace(identifier, company._id)

  return workspace
}

async function setSupervisor(
  employeeId: Types.ObjectId,
  supervisorId: Types.ObjectId
): Promise<Workspace | null> {
  const employeeWorkspace = await WorkspaceModel.findOneAndUpdate(
    { employee: employeeId },
    { supervisor: supervisorId },
    { new: true }
  )
    .populate<{ company: Company }>('company')
    .populate<{ department: Department }>('department')
    .populate<{ employee: Profile }>('employee')
    .populate<{ supervisor: Profile }>('supervisor')
    .populate<{ subordinates: Profile[] }>('subordinates')
    .lean()
    .exec()

  const supervisorWorkspace = await WorkspaceModel.findOneAndUpdate(
    { employee: supervisorId },
    { $push: { subordinates: employeeId } },
    { new: true }
  ).exec()

  return employeeWorkspace
}

async function addSubordinate(
  employeeId: Types.ObjectId,
  subordinateId: Types.ObjectId
): Promise<Workspace | null> {
  const employeeWorkspace = await WorkspaceModel.findOneAndUpdate(
    { employee: employeeId },
    { $push: { subordinates: subordinateId } },
    { new: true }
  )
    .populate<{ company: Company }>('company')
    .populate<{ department: Department }>('department')
    .populate<{ employee: Profile }>('employee')
    .populate<{ supervisor: Profile }>('supervisor')
    .populate<{ subordinates: Profile[] }>('subordinates')
    .lean()
    .exec()

  const subordinateWorkspace = await WorkspaceModel.findOneAndUpdate(
    { employee: subordinateId },
    { supervisor: employeeId },
    { new: true }
  ).exec()

  return employeeWorkspace
}

async function updateWorkspace(
  identifier: Types.ObjectId,
  updatedWorkspaceData: Partial<Workspace>
) {
  console.log(
    'workspace.service - updateWorkspace, identifier: ',
    identifier,
    'under construction'
  )
}
export const workspaceService = {
  createWorkspace,
  getBasicWorkspaceDetails,
  getWorkspace,
  joinExistingCompany,
  joinNewCompany,
  setSupervisor,
  addSubordinate,
  updateWorkspace,
}
