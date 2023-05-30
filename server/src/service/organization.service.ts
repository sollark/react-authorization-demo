import OrganizationModel, {
  Organization,
} from '../mongodb/models/organization.model.js'
import { OrganizationCode } from '../mongodb/models/organizationCode.model.js'
import loggerService from './logger.service.js'

const addOrganization = async (
  code: number,
  name: string
): Promise<Organization> => {
  const organization = await OrganizationModel.create({
    code,
    name,
  })

  loggerService.info(
    `organization.service - organization added: ${organization}`
  )

  return organization
}

const getOrganization = async (code: OrganizationCode) => {
  const organization = await OrganizationModel.findOne({ code })

  loggerService.info(
    `organization.service - organization fetched ${organization}`
  )

  return organization
}

const updateOrganization = async (
  code: number,
  name: string
): Promise<Organization | null> => {
  const organization = await OrganizationModel.findOneAndUpdate(
    { code },
    { name },
    { new: true }
  )

  loggerService.info(
    `organization.service - organization updated ${organization}`
  )

  return organization
}

const deleteOrganization = async (code: number): Promise<void> => {
  await OrganizationModel.deleteOne({ code })
}

export const organizationService = {
  addOrganization,
  getOrganization,
  updateOrganization,
  deleteOrganization,
}
