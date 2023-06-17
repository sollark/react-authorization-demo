import { Types } from 'mongoose'
import { Role } from '../mongodb/models/role.model.js'
import WorkspaceRefModel, {
  Workspace,
} from '../mongodb/models/workspace.model.js'
import loggerService from './logger.service.js'

async function updateWorkspace(updatedWorkspaceData: any) {
  // const organization = await organizationService.getOrganization(organization)
  // if (utilService.isNumeric(organization) && !isOrganizationCodeExists)
  //   throw new BadRequestError('Organization not found', organization.toString())
  // let workspace = null
  // if (utilService.isNumeric(organization))
  //   workspace = await joinExistingOrganization(+organization)
  // if (!utilService.isNumeric(organization))
  //   workspace = await joinNewOrganization(organization)
  // if (!workspace)
  //   throw new BadRequestError('Organization not found', organization.toString())
  // const updatedAccount = await accountService.addWorkspace(
  //   identifier,
  //   workspace?._id
  // )
}

async function addWorkspace(organizationId: Types.ObjectId, roles: Role[]) {
  const workspaceRef = await WorkspaceRefModel.create({
    organizationId,
    roles,
  })

  const workspace = await WorkspaceRefModel.findById(workspaceRef._id)
    .populate('organization')
    .exec()

  loggerService.info(`workspace.service - workspace added: ${workspace}`)

  return workspace
}

async function getWorkspace(organizationId: Types.ObjectId, roles: Role[]) {
  const workspace = await WorkspaceRefModel.findOne({
    organizationRef: organizationId,
    roles: { $all: roles },
  })
    .populate('organizationRef')
    .exec()

  return workspace
}

async function getWorkspaces(workspaceIds: Types.ObjectId[]) {
  const workspaces = await WorkspaceRefModel.find({
    _id: { $in: workspaceIds },
  })
    .populate('organizationRef')
    .exec()

  return workspaces.map((workspace) => {
    return {
      ...workspace.toObject(),
      organization: workspace.organizationRef, // Rename organizationRef to organization
    } as unknown as Workspace
  })
}

export const workspaceService = {
  addWorkspace,
  updateWorkspace,
  getWorkspace,
  getWorkspaces,
}
