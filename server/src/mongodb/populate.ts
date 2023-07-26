import RoleModel, { Role, USER_ROLE } from './models/role.model.js'
import RoleCodeModel, { ROLE_CODE_MAP } from './models/roleCode.model.js'

// Function to populate roles in the database
async function populateRole() {
  console.log('Populating roles in the database...')

  try {
    // Clear existing roles (optional, depending on your requirements)
    await RoleModel.deleteMany({})

    // Define roles to be inserted into the database
    const rolesToInsert = Object.keys(USER_ROLE) as Role[]

    // Insert the roles into the database
    const insertedRoles = await RoleModel.insertMany(
      rolesToInsert.map((role) => ({ role }))
    )

    console.log('Role populated successfully.')
    // console.log('Roles inserted:', insertedRoles)
  } catch (error) {
    console.error('Error populating roles:', error)
    throw error
  }
}

async function populateRoleCode() {
  console.log('Populating role codes in the database...')

  try {
    // Clear existing role codes (optional, depending on your requirements)
    await RoleCodeModel.deleteMany({})

    // Get all roles from the RoleModel
    const roles = await RoleModel.find({})

    // Map each role to its corresponding role code and create RoleCode documents
    const roleCodeDocuments = roles.map((role) => {
      const roleCode = ROLE_CODE_MAP[role.role as Role]
      return {
        role: role._id, // Use the ObjectId of the role
        code: roleCode,
      }
    })

    // Insert the role codes into the database
    const insertedRoleCodes = await RoleCodeModel.insertMany(roleCodeDocuments)
    console.log('Role codes populated successfully.')
    // console.log('Role codes inserted:', insertedRoleCodes)
  } catch (error) {
    console.error('Error populating role codes:', error)
  }
}
export const populate = { populateRole, populateRoleCode }
