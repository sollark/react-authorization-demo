import { Types } from 'mongoose'
import WorkspaceRefModel, {
  Workspace,
} from '../mongodb/models/workspace.model.js'

async function getWorkspaces(
  workspaceIds: Types.ObjectId[]
): Promise<Workspace[]> {
  const workspaces = await WorkspaceRefModel.find({
    _id: { $in: workspaceIds },
  })
    .populate('organization')
    .populate('userRoles')
    .exec()

  return workspaces
}

export const workspaceService = {
  getWorkspaces,
}
