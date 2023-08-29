import { Types } from 'mongoose'
import BadRequestError from '../errors/BadRequestError.js'
import { CompanyCode } from '../mongodb/models/company.model.js'
import WorkspaceRefModel, {
  Workspace,
} from '../mongodb/models/workspace.model.js'
import { companyService } from './company.service.js'
import loggerService from './logger.service.js'

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

async function createWorkspace(
  identifier: Types.ObjectId,
  companyId: Types.ObjectId
) {
  try {
    // Create a new workspace
    const workspaceRef = await WorkspaceRefModel.create({
      identifier,
      company: companyId,
    })

    const newWorkspace = await WorkspaceRefModel.findById(workspaceRef._id)
      .populate('company')
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

async function getWorkspace(companyId: Types.ObjectId) {
  const workspace = await WorkspaceRefModel.findOne({
    company: companyId,
  })
    .populate('company')
    .exec()

  return workspace
}

async function getWorkspaces(workspaceIds: Types.ObjectId[]) {
  const workspaces = await WorkspaceRefModel.find({
    _id: { $in: workspaceIds },
  })
    .populate('company')
    .exec()

  return workspaces.map((workspace) => {
    return {
      ...workspace.toObject(),
      company: workspace.company,
    } as unknown as Workspace
  })
}

async function joinExistingCompany(
  identifier: Types.ObjectId,
  companyCode: CompanyCode
) {
  const company = await companyService.getCompany(companyCode)

  if (!company)
    throw new BadRequestError('Company not found', companyCode.toString())

  // at first sign in user gets employee role at chosen company, later it can be changed by manager
  const workspace = await createWorkspace(identifier, company._id)

  return workspace
}

async function joinNewCompany(identifier: Types.ObjectId, name: string) {
  // Create a new company
  const company = await companyService.createCompany(name)
  const workspace = await createWorkspace(identifier, company._id)

  return workspace
}

export const workspaceService = {
  createWorkspace,
  updateWorkspace,
  getWorkspace,
  getWorkspaces,
  joinExistingCompany,
  joinNewCompany,
}
