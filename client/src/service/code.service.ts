import { CODE_ROLE_MAP, ROLE_CODE_MAP, RoleCode, RoleName } from '@/models/Role'
import { EncodedWorkspace, Workspace } from '@/models/Workspace'

export function encodeWorkspace(workspaces: Workspace[]): EncodedWorkspace[] {
  const encodedWorkspaces: EncodedWorkspace[] = workspaces.map((workspace) => {
    const company = workspace.company
    const roles = workspace.roles.map((role) => {
      const roleCode = Object.entries(CODE_ROLE_MAP).find(
        ([code, r]) => r === role
      )?.[0]
      return roleCode as RoleCode
    })

    return {
      company,
      roles,
    }
  })

  return encodedWorkspaces
}

export function decodeWorkspace(
  encodedWorkspaces: EncodedWorkspace[]
): Workspace[] {
  const workspaces: Workspace[] = encodedWorkspaces.map((encodedWorkspace) => {
    const company = encodedWorkspace.company
    const roles = encodedWorkspace.roles.map((roleCode) => {
      return CODE_ROLE_MAP[roleCode] || ''
    })

    return {
      company,
      roles,
    }
  })

  return workspaces
}

export function decodeRoles(encodedRoles: RoleCode[]): RoleName[] {
  const decodedRoles: RoleName[] = encodedRoles.map((roleCode) => {
    return CODE_ROLE_MAP[roleCode] || ''
  })

  return decodedRoles
}

export function encodeRoles(decodedRoles: RoleName[]): RoleCode[] {
  const encodedRoles: RoleCode[] = decodedRoles.map((role) => {
    return ROLE_CODE_MAP[role] || ''
  })

  return encodedRoles
}
export const codeService = {
  encodeWorkspace,
  decodeWorkspace,
  decodeRoles,
  encodeRoles,
}
