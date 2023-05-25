import OrganizationModel from '../mongodb/models/organization.model.js'
import RoleMapModel, { USER_ROLE } from '../mongodb/models/roleCode.model.js'
import { Workspace, WorkspaceCode } from '../mongodb/models/workspace.model.js'

function castToCode(workspaces: Workspace[]): WorkspaceCode[] {
  const codes = workspaces.map((workspace) => {
    return {
      organization: workspace.organization.code,
      roles: workspace.roles.map((role) => USER_ROLE[role]),
    }
  })

  return codes
}

async function castToWorkspace(codes: WorkspaceCode[]): Promise<Workspace[]> {
  const workspaces = await Promise.all(
    codes.map(async (code) => {
      const organization = await OrganizationModel.findOne({
        code: code.organization,
      })

      const roles = await Promise.all(
        code.roles.map(async (role) => {
          const roleMap = await RoleMapModel.findOne({ code: role })
          return roleMap!.name
        })
      )

      return { organization, roles } as Workspace
    })
  )

  return workspaces
}

export const codeService = {
  castToCode,
  castToWorkspace,
}
