import OrganizationModel from '../mongodb/models/organization.model.js'
import RoleMapModel, {
  Role,
  ROLE_CODE_MAPPING,
} from '../mongodb/models/role.model.js'
import { Workspace } from '../mongodb/models/workspace.model.js'
import { WorkspaceCode } from '../mongodb/models/workspaceCode.model.js'

function castToCode(workspaces: Workspace[]): WorkspaceCode[] {
  const codes = workspaces.map((workspace) => {
    return {
      organization: workspace.organization.organizationCode,
      roles: workspace.roles.map((role) => ROLE_CODE_MAPPING[role as Role]),
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
