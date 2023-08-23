import OrganizationModel, {
  Organization,
  OrganizationCode,
} from '../mongodb/models/organization.model.js'
import { utilService } from '../utils/utils.js'
import loggerService from './logger.service.js'

const createOrganization = async (name: string) => {
  const code = await generateOrganizationCode()

  const organization = await OrganizationModel.create({
    organizationCode: code,
    organizationName: name,
  })

  loggerService.info(
    `organization.service - organization added: ${organization}`
  )

  return organization
}

const isOrganizationCodeExists = async (organization: string) => {
  if (!utilService.convertToNumber(organization)) return false

  const organizationCode = await OrganizationModel.findOne({
    organizationCode: +organization,
  })

  if (!organizationCode) return false

  return true
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

const deleteOrganization = async (organizationCode: string): Promise<void> => {
  await OrganizationModel.deleteOne({ organizationCode })
}

export const organizationService = {
  isOrganizationCodeExists,
  createOrganization,
  getOrganization,
  updateOrganization,
  deleteOrganization,
}

async function generateOrganizationCode(): Promise<OrganizationCode> {
  let code = utilService.getRandomInt(1000, 9999)

  const existingCode = await OrganizationModel.findOne({
    organizationCode: code.toString(),
  })

  if (existingCode) {
    // Code already exists, generate a new one recursively
    return generateOrganizationCode()
  }

  return code.toString() as OrganizationCode
}
