import OrganizationModel, {
  Organization,
} from '../mongodb/models/organization.model.js'
import OrganizationCodeModel, {
  OrganizationCode,
} from '../mongodb/models/organizationCode.model.js'
import { utilService } from '../utils/utils.js'
import loggerService from './logger.service.js'

const addOrganization = async (name: string) => {
  const code = await generateOrganizationCode(name)

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

  const organizationCode = await OrganizationCodeModel.findOne({
    code: +organization,
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

const deleteOrganization = async (code: number): Promise<void> => {
  await OrganizationModel.deleteOne({ code })
}

export const organizationService = {
  isOrganizationCodeExists,
  addOrganization,
  getOrganization,
  updateOrganization,
  deleteOrganization,
}

async function generateOrganizationCode(
  organizationName: string
): Promise<OrganizationCode> {
  let code = utilService.getRandomInt(1000, 9999)

  const existingCode = await OrganizationCodeModel.findOne({ code })

  if (existingCode) {
    // Code already exists, generate a new one recursively
    return generateOrganizationCode(organizationName)
  }

  const organizationCodeMap = await OrganizationCodeModel.create({
    organizationName,
    organizationCode: code.toString(),
  })

  return code.toString() as OrganizationCode
}
