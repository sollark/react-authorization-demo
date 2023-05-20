import OrganizationModel, {
  Organization,
  OrganizationIdentifier,
} from '../mongodb/models/organization.model.js'
import loggerService from './logger.service.js'

const addOrganization = async (
  identifier: OrganizationIdentifier,
  name: string
): Promise<Organization> => {
  const organization = await OrganizationModel.create({
    identifier,
    name,
  })

  loggerService.info(
    `organization.service - organization added: ${organization}`
  )

  return organization
}

const getOrganization = async (
  identifier: OrganizationIdentifier
): Promise<Organization | null> => {
  const organization = await OrganizationModel.findOne({ identifier })

  loggerService.info(
    `organization.service - organization fetched ${organization}`
  )
  return organization
}

const updateOrganization = async (
  identifier: OrganizationIdentifier,
  name: string
): Promise<Organization | null> => {
  const organization = await OrganizationModel.findOneAndUpdate(
    { identifier },
    { name },
    { new: true }
  )

  loggerService.info(
    `organization.service - organization updated ${organization}`
  )

  return organization
}

const deleteOrganization = async (
  identifier: OrganizationIdentifier
): Promise<void> => {
  await OrganizationModel.deleteOne({ identifier })
}

export const organizationService = {
  addOrganization,
  getOrganization,
  updateOrganization,
  deleteOrganization,
}
