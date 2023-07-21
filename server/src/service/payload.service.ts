import { RoleCode } from '../mongodb/models/roleCode.model.js'
import { Workspace } from '../mongodb/models/workspace.model.js'
import { WorkspaceCode } from '../mongodb/models/workspaceCode.model.js'
import { codeService } from './code.service.js'

async function generateTokenPayload(workspaces: Workspace[]): Promise<string> {
  if (workspaces.length === 0) {
    return '0000'
  }

  const workspacesCodes = await codeService.incodeWorkspace(workspaces)
  const payloadParts: string[] = []

  for (const workspace of workspacesCodes) {
    const workspacePayload = `${workspace.organization}-${workspace.roles.join(
      '-'
    )}`
    payloadParts.push(workspacePayload)
  }

  const tokenPayload = payloadParts.join(',')
  return tokenPayload
}

async function decodeTokenPayload(tokenPayload: string) {
  const workspacePayloads = tokenPayload.split(',')
  const workspacesCode: WorkspaceCode[] = []

  for (var i = 0; i < workspacePayloads.length; i++) {
    var workspacePayload = workspacePayloads[i]
    var parts = workspacePayload.split('-')
    var organizationCode = parts[0]
    var roleCodes = parts.slice(1)

    const workspace: WorkspaceCode = {
      organization: organizationCode,
      roles: roleCodes as RoleCode[],
    }

    workspacesCode.push(workspace)
  }

  const workspaces: Workspace[] = await codeService.decodeWorkspace(
    workspacesCode
  )

  return workspaces
}

export const payloadService = {
  generateTokenPayload,
  decodeTokenPayload,
}

/* Example usage

var tokenPayload = "1234-5678-9012,5678-3456";
var decodedWorkspaces = decodeTokenPayload(tokenPayload);

decodedWorkspaces.forEach(function(workspace) {
  console.log("Organization Code:", workspace.organizationCode);
  console.log("Role Codes:", workspace.roleCodes);
});

*/
