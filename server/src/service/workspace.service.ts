import { Types } from 'mongoose'
import { Role } from '../mongodb/models/role.model.js'
import WorkspaceRefModel, {
  Workspace,
} from '../mongodb/models/workspace.model.js'
import loggerService from './logger.service.js'
import { organizationService } from './organization.service.js'
import { OrganizationCode } from '../mongodb/models/organizationCode.model.js'
import BadRequestError from '../errors/BadRequestError.js'

async function updateWorkspace(updatedWorkspaceData: any) {}

async function addWorkspace(organizationId: Types.ObjectId, roles: Role[]) {
  // Check if a matching workspace already exists
  const existingWorkspace = await WorkspaceRefModel.findOne({
    organization: organizationId,
    roles: { $all: roles },
  })
    .populate('organization')
    .exec()

  if (existingWorkspace) {
    loggerService.info(
      `workspace.service - existing workspace found: ${existingWorkspace}`
    )
    return existingWorkspace
  }

  // Create a new workspace if no match is found
  const workspaceRef = await WorkspaceRefModel.create({
    organization: organizationId,
    roles,
  })

  const workspace = await WorkspaceRefModel.findById(workspaceRef._id)
    .populate('organization')
    .exec()

  loggerService.info(`workspace.service - new workspace added: ${workspace}`)

  return workspace
}

async function getWorkspace(organizationId: Types.ObjectId, roles: Role[]) {
  const workspace = await WorkspaceRefModel.findOne({
    organization: organizationId,
    roles: { $all: roles },
  })
    .populate('organization')
    .exec()

  return workspace
}

async function getWorkspaces(workspaceIds: Types.ObjectId[]) {
  const workspaces = await WorkspaceRefModel.find({
    _id: { $in: workspaceIds },
  })
    .populate('organization')
    .exec()

  return workspaces.map((workspace) => {
    return {
      ...workspace.toObject(),
      organization: workspace.organization,
    } as unknown as Workspace
  })
}

async function joinExistingOrganization(organizationCode: OrganizationCode) {
  const organization = await organizationService.getOrganization(
    organizationCode
  )

  if (!organization)
    throw new BadRequestError(
      'Organization not found',
      organizationCode.toString()
    )

  // at first sign in user gets employee role at chosen organization, later it can be changed by manager
  const workspace = await getWorkspace(organization._id, ['Employee'])
  if (workspace) return workspace

  // if user workspace is not exist, create it
  const newWorkspace = await addWorkspace(organization._id, ['Employee'])

  return newWorkspace
}

async function joinNewOrganization(name: string) {
  const organization = await organizationService.addOrganization(name)
  const workspace = await addWorkspace(organization._id, ['Manager'])

  return workspace
}

export const workspaceService = {
  addWorkspace,
  updateWorkspace,
  getWorkspace,
  getWorkspaces,
  joinExistingOrganization,
  joinNewOrganization,
}
