import OrganizationModel, {
  Organization,
} from '../mongodb/models/organization.model.js'
import { Role } from '../mongodb/models/role.model.js'

import RoleCodeModel, { RoleCode } from '../mongodb/models/roleCode.model.js'
import { Workspace } from '../mongodb/models/workspace.model.js'
import { WorkspaceCode } from '../mongodb/models/workspaceCode.model.js'

async function encodeWorkspace(
  workspaces: Workspace[]
): Promise<WorkspaceCode[]> {
  const enCodedWorkspaces = await Promise.all(
    workspaces.map(async (workspace) => {
      const organizationCode = workspace.organization.organizationCode
      const roles = await Promise.all(
        workspace.roles.map(async (role) => {
          const roleMap = await RoleCodeModel.findOne({ role })
          return roleMap ? (roleMap.code as RoleCode) : ''
        })
      )

      return {
        organization: organizationCode,
        roles: roles as RoleCode[],
      }
    })
  )

  return enCodedWorkspaces
}

async function decodeWorkspace(codes: WorkspaceCode[]): Promise<Workspace[]> {
  const workspaces = await Promise.all(
    codes.map(async (code) => {
      const organization = await OrganizationModel.findOne({
        code: code.organization,
      })

      const roles = await Promise.all(
        code.roles.map(async (roleCode) => {
          const roleMap = await RoleCodeModel.findOne({ code: roleCode })
          return roleMap ? (roleMap.role as Role) : ''
        })
      )

      return {
        organization: organization as Organization,
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
