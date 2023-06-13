import { Types } from 'mongoose'
import WorkspaceRefModel, {
  Workspace,
} from '../mongodb/models/workspace.model.js'
import { Role } from '../mongodb/models/role.model.js'
import loggerService from './logger.service.js'

async function addWorkspace(organization: Types.ObjectId, roles: Role[]) {
  const workspaceRef = await WorkspaceRefModel.create({
    name,
    organization,
    roles,
  })

  const workspace = await WorkspaceRefModel.findById(workspaceRef._id)
    .populate('organization')
    .exec()

  loggerService.info(`account.service - account added: ${workspace}`)

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
  getWorkspace,
  getWorkspaces,
}
