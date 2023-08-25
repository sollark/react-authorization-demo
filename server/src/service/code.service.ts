import { Role } from '../mongodb/models/role.model.js'
import RoleCodeModel, { RoleCode } from '../mongodb/models/roleCode.model.js'
import {
  EncodedWorkspace,
  Workspace,
} from '../mongodb/models/workspace.model.js'

async function encodeWorkspace(
  workspaces: Workspace[]
): Promise<EncodedWorkspace[]> {
  const enCodedWorkspaces = await Promise.all(
    workspaces.map(async (workspace) => {
      const company = workspace.company
      const roles = await Promise.all(
        workspace.roles.map(async (role) => {
          const roleMap = await RoleCodeModel.findOne({ role })
          return roleMap ? (roleMap.code as RoleCode) : ''
        })
      )

      return {
        company,
        roles: roles as RoleCode[],
      }
    })
  )

  return enCodedWorkspaces
}

async function decodeWorkspace(
  enCodedWorkspace: EncodedWorkspace[]
): Promise<Workspace[]> {
  const workspaces = await Promise.all(
    enCodedWorkspace.map(async (workspace) => {
      const company = workspace.company

      const roles = await Promise.all(
        workspace.roles.map(async (roleCode) => {
          const roleMap = await RoleCodeModel.findOne({ code: roleCode })
            .populate<{ role: Role }>({ path: 'role' })
            .lean()
            .exec()
          return roleMap ? roleMap.role : ''
        })
      )

      return {
        company,
        roles: roles as Role[],
      }
    })
  )

  return workspaces
}

export const codeService = {
  encodeWorkspace,
  decodeWorkspace,
}
