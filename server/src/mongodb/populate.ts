import { authService } from '../api/auth/auth.service.js'
import { companyService } from '../service/company.service.js'
import RoleModel, { Role, USER_ROLE } from './models/role.model.js'

// Function to populate roles in the database
async function populateRole() {
  console.log('Populating roles in the database...')

  try {
    const existingRoles = await RoleModel.find({})
    if (existingRoles.length !== 0) {
      console.log('Roles already populated.')
      return
    }

    // Define roles to be inserted into the database
    const rolesToInsert = Object.values(USER_ROLE) as Role[]

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

async function populateTestData() {
  console.log('Populating users in the database...')

  authService.registration({
    email: 'employee',
    password: 'employee',
  })
  console.log('Populating test company in the database...')

  const company = companyService.createCompany('TestCompany')

  // const workplaces = workplaceService.createWorkplace()
}

export const populate = { populateRole }
