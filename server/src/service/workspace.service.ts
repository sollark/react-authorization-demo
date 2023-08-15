import { Types } from 'mongoose'
import BadRequestError from '../errors/BadRequestError.js'
import { OrganizationCode } from '../mongodb/models/organization.model.js'
import RoleModel, { Role, USER_ROLE } from '../mongodb/models/role.model.js'
import WorkspaceRefModel, {
  Workspace,
} from '../mongodb/models/workspace.model.js'
import loggerService from './logger.service.js'
import { organizationService } from './organization.service.js'

async function updateWorkspace(
  identifier: Types.ObjectId,
  updatedWorkspaceData: Partial<Workspace>
) {
  console.log(
    'workspace.service - updateWorkspace, identifier: ',
    identifier,
    'under construction'
  )
}

async function addWorkspace(
  identifier: Types.ObjectId,
  organizationId: Types.ObjectId,
  roles: Role[]
) {
  try {
    console.log('workspace.service - addWorkspace, roles: ', roles)
    // Convert role names to role ObjectIds
    const roleObjects = await RoleModel.find({ role: { $in: roles } }).lean()

    console.log('workspace.service - addWorkspace, roleObjects: ', roleObjects)

    // Extract the role ObjectIds from the found role documents
    const roleIds = roleObjects.map((role) => role._id)

    console.log('workspace.service - addWorkspace, roleIds: ', roleIds)

    // // Check if a matching workspace already exists
    // const existingWorkspace = await WorkspaceRefModel.findOne({
    //   identifier,
    //   organization: organizationId,
    //   roles: { $all: roleIds },
    // })
    //   .populate('organization')
    //   .populate('roles') // Populate the roles field
    //   .lean()
    //   .exec()

    // if (existingWorkspace) {
    //   loggerService.info(
    //     `workspace.service - existing workspace found: ${existingWorkspace}`
    //   )
    //   return existingWorkspace
    // }

    // Create a new workspace
    const workspaceRef = await WorkspaceRefModel.create({
      identifier,
      organization: organizationId,
      roles: roleIds,
    })

    const newWorkspace = await WorkspaceRefModel.findById(workspaceRef._id)
      .populate('organization')
      .populate('roles') // Populate the roles field
      .lean()
      .exec()

    loggerService.info(
      `workspace.service - new workspace added: ${JSON.stringify(
        newWorkspace,
        null,
        2 // Indentation level, adjust as needed
      )}`
    )

    return newWorkspace
  } catch (error) {
    console.error('Error adding workspace:', error)
    throw error // Rethrow the error to handle it in the caller function
  }
}

async function getWorkspace(organizationId: Types.ObjectId, roles: Role[]) {
  const workspace = await WorkspaceRefModel.findOne({
    organization: organizationId,
    roles: { $all: roles },
  })
    .populate('organization')
    .exec()

  return workspace
}

async function getWorkspaces(workspaceIds: Types.ObjectId[]) {
  const workspaces = await WorkspaceRefModel.find({
    _id: { $in: workspaceIds },
  })
    .populate('organization')
    .exec()

  return workspaces.map((workspace) => {
    return {
      ...workspace.toObject(),
      organization: workspace.organization,
    } as unknown as Workspace
  })
}

async function joinExistingOrganization(
  identifier: Types.ObjectId,
  organizationCode: OrganizationCode
) {
  const organization = await organizationService.getOrganization(
    organizationCode
  )

  if (!organization)
    throw new BadRequestError(
      'Organization not found',
      organizationCode.toString()
    )

  // at first sign in user gets employee role at chosen organization, later it can be changed by manager
  const workspace = await addWorkspace(identifier, organization._id, [
    USER_ROLE.Employee,
  ])

  return workspace
}

async function joinNewOrganization(identifier: Types.ObjectId, name: string) {
  // Create a new organization
  const organization = await organizationService.addOrganization(name)
  const workspace = await addWorkspace(identifier, organization._id, [
    USER_ROLE.Manager,
  ])

  return workspace
}

export const workspaceService = {
  addWorkspace,
  updateWorkspace,
  getWorkspace,
  getWorkspaces,
  joinExistingOrganization,
  joinNewOrganization,
}
