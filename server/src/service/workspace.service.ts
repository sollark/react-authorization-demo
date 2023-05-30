import { Types } from 'mongoose'
import WorkspaceRefModel, {
  Workspace,
} from '../mongodb/models/workspace.model.js'
import { Role } from '../mongodb/models/role.model.js'
import loggerService from './logger.service.js'

async function addWorkspace(
  organization: Types.ObjectId,
  roles: Role[]
): Promise<Workspace | null> {
  const workspaceRef = await WorkspaceRefModel.create({
    name,
    organization,
    roles,
  })

  const workspace = await WorkspaceRefModel.findById(workspaceRef._id)
    .populate('organization')
    .exec()

  loggerService.info(`account.service - account added: ${workspace}`)

  return workspace as Workspace | null
}

async function getWorkspace(
  organizationId: Types.ObjectId,
  roles: Role[]
): Promise<Workspace | null> {
  const workspace = await WorkspaceRefModel.findOne({
    organizationRef: organizationId,
    roles: { $all: roles },
  })
    .populate('organizationRef')
    .exec()

  return workspace as Workspace | null
}

export const workspaceService = {
  addWorkspace,
  getWorkspace,
}
