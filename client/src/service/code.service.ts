import { CODE_ROLE_MAP, ROLE_CODE_MAP, Role, RoleCode } from '@/models/Role'
import { EncodedWorkspace, Workspace } from '@/models/Workspace'

export function encodeWorkspace(workspaces: Workspace[]): EncodedWorkspace[] {
  const encodedWorkspaces: EncodedWorkspace[] = workspaces.map((workspace) => {
    const organization = workspace.organization
    const roles = workspace.roles.map((role) => {
      const roleCode = Object.entries(CODE_ROLE_MAP).find(
        ([code, r]) => r === role
      )?.[0]
      return roleCode as RoleCode
    })

    return {
      organization,
      roles,
    }
  })

  return encodedWorkspaces
}

export function decodeWorkspace(
  encodedWorkspaces: EncodedWorkspace[]
): Workspace[] {
  const workspaces: Workspace[] = encodedWorkspaces.map((encodedWorkspace) => {
    const organization = encodedWorkspace.organization
    const roles = encodedWorkspace.roles.map((roleCode) => {
      return CODE_ROLE_MAP[roleCode] || ''
    })

    return {
      organization,
      roles,
    }
  })

  return workspaces
}

export function decodeRoles(encodedRoles: RoleCode[]): Role[] {
  const decodedRoles: Role[] = encodedRoles.map((roleCode) => {
    return CODE_ROLE_MAP[roleCode] || ''
  })

  return decodedRoles
}

export function encodeRoles(decodedRoles: Role[]): RoleCode[] {
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
