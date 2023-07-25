import RoleModel from './models/role.model.js'

// Function to populate roles in the database
async function populateRole() {
  console.log('Populating roles in the database...')

  try {
    // Clear existing roles (optional, depending on your requirements)
    await RoleModel.deleteMany({})

    // Define roles to be inserted into the database
    const rolesToInsert = [
      'Guest',
      'Employee',
      'Manager',
      'Supervisor',
      'Admin',
    ]

    // Insert the roles into the database
    const insertedRoles = await RoleModel.insertMany(
      rolesToInsert.map((role) => ({ role }))
    )

    console.log('Roles inserted:', insertedRoles)
  } catch (error) {
    console.error('Error populating roles:', error)
    throw error
  }
}

export default populateRole
