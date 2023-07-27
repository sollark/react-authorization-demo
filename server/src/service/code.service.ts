import { Role } from '../mongodb/models/role.model.js'
import RoleCodeModel, { RoleCode } from '../mongodb/models/roleCode.model.js'
import { Workspace } from '../mongodb/models/workspace.model.js'
import { enCodedWorkspace } from '../mongodb/models/workspaceCode.model.js'

async function encodeWorkspace(
  workspaces: Workspace[]
): Promise<enCodedWorkspace[]> {
  const enCodedWorkspaces = await Promise.all(
    workspaces.map(async (workspace) => {
      const organization = workspace.organization
      const roles = await Promise.all(
        workspace.roles.map(async (role) => {
          const roleMap = await RoleCodeModel.findOne({ role })
          return roleMap ? (roleMap.code as RoleCode) : ''
        })
      )

      return {
        organization,
        roles: roles as RoleCode[],
      }
    })
  )

  return enCodedWorkspaces
}

async function decodeWorkspace(
  enCodedWorkspace: enCodedWorkspace[]
): Promise<Workspace[]> {
  const workspaces = await Promise.all(
    enCodedWorkspace.map(async (workspace) => {
      const organization = workspace.organization

      const roles = await Promise.all(
        workspace.roles.map(async (roleCode) => {
          const roleMap = await RoleCodeModel.findOne({ code: roleCode })
          return roleMap ? (roleMap.role as Role) : ''
        })
      )

      return {
        organization,
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
